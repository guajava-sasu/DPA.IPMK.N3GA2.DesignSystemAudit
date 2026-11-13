import pickle,json,sys,collections
m=pickle.load(open(sys.argv[1],'rb'));N=m['nodeChanges']
g=lambda x:f"{x['sessionID']}:{x['localID']}"
sets={g(n['guid']):n for n in N if n.get('type')=='VARIABLE_SET'}
sets['EXT']={'name':'(bibliothèque externe)','variableSetModes':[]}
sid_of=lambda v: g(v['variableSetID']['guid']) if 'guid' in v['variableSetID'] else 'EXT'
vars_={g(n['guid']):n for n in N if n.get('type')=='VARIABLE'}
def hexc(c):
    h='#%02X%02X%02X'%tuple(round(c[k]*255) for k in 'rgb')
    return h if c['a']>=0.999 else h+'%02X'%round(c['a']*255)
def val(vd):
    v=vd.get('value',{})
    if 'alias' in v:
        a=v['alias']; gg=a.get('guid')
        if gg and g(gg) in vars_: return '{'+vars_[g(gg)]['name']+'}'
        ak=a.get('assetRef',{}).get('key')
        for vv in vars_.values():
            if ak and vv.get('key')==ak: return '{'+vv['name']+'}'
        return '{alias '+json.dumps(a,default=str)[:80]+'}'
    if 'colorValue' in v: return hexc(v['colorValue'])
    for k in ('floatValue','textValue','boolValue'):
        if k in v: return v[k]
    return json.dumps(v,default=str)[:80]
out=collections.OrderedDict()
for sid,s in sets.items():
    modes={g(md['id']):md['name'] for md in s.get('variableSetModes',[])}
    sv=[v for v in vars_.values() if sid_of(v)==sid]
    print(f"\n### {s['name']}  modes={list(modes.values())} vars={len(sv)} deleted={s.get('isSoftDeleted',False)}")
    d=out.setdefault(s['name'],{'modes':list(modes.values()),'deleted':s.get('isSoftDeleted',False),'variables':{}})
    for v in sorted(sv,key=lambda v:v.get('sortPosition','')):
        vals={modes.get(g(e['modeID']),g(e['modeID'])):val(e['variableData']) for e in v.get('variableDataValues',{}).get('entries',[])}
        d['variables'][v['name']]={'type':v.get('variableResolvedType'),'values':vals,'deleted':v.get('isSoftDeleted',False),'scopes':v.get('variableScopes'),'description':v.get('description')}
        if not s.get('isSoftDeleted'): print(' ',v['name'],v.get('variableResolvedType'),vals,'DEL' if v.get('isSoftDeleted') else '')
json.dump(out,open(sys.argv[2],'w'),ensure_ascii=False,indent=1)
