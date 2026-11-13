import pickle,collections,sys,json
m=pickle.load(open(sys.argv[1],'rb'));N=m['nodeChanges']
g=lambda x:f"{x['sessionID']}:{x['localID']}"
by={g(n['guid']):n for n in N}
par=lambda n: by.get(g(n['parentIndex']['guid'])) if n.get('parentIndex') else None
def page(n):
    while n and n.get('type')!='CANVAS': n=par(n)
    return n.get('name','?') if n else '?'
sets=[n for n in N if n.get('isStateGroup')]
kids=collections.Counter(g(n['parentIndex']['guid']) for n in N if n.get('type')=='SYMBOL' and n.get('parentIndex'))
rows=[]
for s in sets:
    props=[(p.get('property'),[v if isinstance(v,str) else v.get('value') for v in p.get('values',[])]) for p in s.get('stateGroupPropertyValueOrders',[])]
    cp=[d.get('name') for d in s.get('componentPropDefs',[])] 
    rows.append((page(s),s.get('name'),kids[g(s['guid'])],props,cp,s.get('isSoftDeleted',False)))
rows.sort()
for r in rows:
    if r[5]: continue
    print(f"{r[0]} | {r[1]} | {r[2]} var | "+'; '.join(f"{p}={'/'.join(map(str,v))}" for p,v in r[3])+(" | props: "+', '.join(map(str,r[4])) if r[4] else ''))
# standalone symbols (not in sets) per page
solo=collections.Counter(page(n) for n in N if n.get('type')=='SYMBOL' and not (par(n) or {}).get('isStateGroup'))
print(solo.most_common(70))
