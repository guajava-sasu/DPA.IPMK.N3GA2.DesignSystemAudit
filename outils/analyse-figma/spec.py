import pickle,sys,collections
m=pickle.load(open(sys.argv[1],'rb'));N=m['nodeChanges']
g=lambda x:f"{x['sessionID']}:{x['localID']}"
by={g(n['guid']):n for n in N}
kids=collections.defaultdict(list)
for n in N:
    if n.get('parentIndex'): kids[g(n['parentIndex']['guid'])].append(n)
for k in kids: kids[k].sort(key=lambda n:n['parentIndex'].get('position',''))
vn=lambda a: by[g(a['guid'])]['name'] if a.get('guid') and g(a['guid']) in by else '?'
styles={g(n['guid']):n['name'] for n in N if n.get('styleType')}
def paint(ps):
    out=[]
    for p in ps or []:
        if not p.get('visible',True): continue
        cv=p.get('colorVar',{}).get('value',{}).get('alias')
        c=p.get('color'); op=p.get('opacity',1)
        hx='#%02X%02X%02X'%tuple(round(c[k]*255) for k in 'rgb') if c else p.get('type')
        out.append((vn(cv) if cv else hx)+(f"@{op:.2f}" if op<0.999 else ''))
    return ','.join(out)
def vars_(n):
    d={}
    for e in n.get('variableConsumptionMap',{}).get('entries',[]):
        a=e['variableData'].get('value',{}).get('alias')
        if a: d[e['variableField']]=vn(a)
    return d
def desc(n,depth=0):
    o=[]
    v=vars_(n); t=n.get('type')
    bits=[t[:4],repr(n.get('name',''))[:30]]
    if n.get('size'): bits.append(f"{n['size']['x']:g}x{n['size']['y']:g}")
    if v.get('HEIGHT'): bits.append('h='+v['HEIGHT'])
    r=n.get('cornerRadius') or n.get('rectangleTopLeftCornerRadius')
    if r: bits.append(f"r={r:g}"+(f"({v.get('RECTANGLE_TOP_LEFT_CORNER_RADIUS') or v.get('CORNER_RADIUS','')})"))
    if n.get('stackMode'): bits.append(f"{n['stackMode'][0]} pad={n.get('stackHorizontalPadding',0):g}/{n.get('stackVerticalPadding',0):g} gap={n.get('stackSpacing',0):g}")
    f=paint(n.get('fillPaints'))
    if f and t!='TEXT': bits.append('fill='+f)
    s=paint(n.get('strokePaints'))
    if s: bits.append(f"stroke={s} w={n.get('strokeWeight',0):g}"+(f" {n.get('strokeAlign')}" if n.get('strokeAlign')!='INSIDE' else ''))
    if t=='TEXT':
        st=n.get('styleIdForText',{}).get('guid'); bits.append('style='+(styles.get(g(st),'?') if st else f"{n.get('fontName',{}).get('style')} {n.get('fontSize')}"))
        bits.append('color='+f)
        tx=(n.get('textData') or {}).get('characters','')[:20]; bits.append(repr(tx))
    if n.get('effects'): bits.append('effects='+str(len(n['effects'])))
    if n.get('visible') is False: bits.append('HIDDEN')
    o.append('  '*depth+' '.join(bits))
    if t not in ('INSTANCE','TEXT','VECTOR') and depth<4:
        for c in kids[g(n['guid'])]: o+=desc(c,depth+1)
    return o
name=sys.argv[2]; filt=sys.argv[3] if len(sys.argv)>3 else ''
sets=[n for n in N if n.get('isStateGroup') and n.get('name')==name and not n.get('isSoftDeleted')]
for s in sets:
    for v in kids[g(s['guid'])]:
        if all(f in v['name'] for f in filt.split('&') if f):
            print('\n'.join(desc(v))); print()
