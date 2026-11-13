# Variables, styles de texte et ombres du .fig décodé -> jetons au format DTCG (W3C Design Tokens)
import json,sys,pickle
v=json.load(open(sys.argv[1])); m=pickle.load(open(sys.argv[2],'rb'))
def put(root,path,leaf):
    d=root
    for p in path[:-1]: d=d.setdefault(p,{})
    d[path[-1]]=leaf
out={'$description':'Extrait de « AMF Design System [v2.0].fig » (export Figma du 2026-11-12T08:13Z). Généré, ne pas modifier à la main.'}
coll={'AMF Primitives':'primitives','AMF Semantic':'semantic','AMF Dimensions':'dimensions'}
for cname,key in coll.items():
    c=v[cname]; root=out  # collections à la racine : les noms ne se recouvrent pas, les alias {A.B} restent résolubles
    for name,d in c['variables'].items():
        if d['deleted']: continue
        vals=d['values']; first=list(vals.values())[0]
        def conv(x): return x.replace('/','.') if isinstance(x,str) and x.startswith('{') else (f"{x:g}px" if isinstance(x,float) else x)
        leaf={'$type':'color' if d['type']=='COLOR' else 'dimension','$value':conv(first)}
        if len(set(map(str,vals.values())))>1: leaf['$extensions']={'figma.modes':{k:conv(x) for k,x in vals.items()}}
        put(root,name.split('/'),leaf)
N=m['nodeChanges']; typo=out.setdefault('typography',{}); sh=out.setdefault('shadow',{})
for n in N:
    if n.get('styleType')=='TEXT' and not n.get('isSoftDeleted'):
        nm=n['name']
        if nm.startswith('v-'): continue
        f=n.get('fontName',{}); lh=n.get('lineHeight',{}); ls=n.get('letterSpacing',{})
        w={'Regular':400,'Medium':500,'Bold':700,'Italic':400,'Light':300}.get(f.get('style'),400)
        typo[nm]={'$type':'typography','$value':{'fontFamily':f.get('family'),'fontWeight':w,'fontSize':f"{n.get('fontSize'):g}px",'lineHeight':f"{lh.get('value'):g}px" if lh.get('units')=='PIXELS' else lh.get('value'),'letterSpacing':f"{ls.get('value',0):.2g}px" if ls.get('units')=='PIXELS' else f"{ls.get('value',0):g}%"}}
        if n.get('textCase')=='UPPER': typo[nm]['$extensions']={'textTransform':'uppercase'}
    if n.get('styleType')=='EFFECT' and n['name'].startswith('Dropshadow') and not n.get('isSoftDeleted'):
        e=n['effects'][0]; c=e['color']
        col='#%02X%02X%02X%02X'%(round(c['r']*255),round(c['g']*255),round(c['b']*255),round(c['a']*255))
        sh.setdefault(n['name'],{'$type':'shadow','$value':{'color':col,'offsetX':f"{e['offset']['x']:g}px",'offsetY':f"{e['offset']['y']:g}px",'blur':f"{e['radius']:g}px",'spread':f"{e.get('spread',0):g}px"}}) if n['name'] not in sh else None
json.dump(out,open(sys.argv[3],'w'),ensure_ascii=False,indent=2)
print(sum(1 for _ in json.dumps(out)), list(out))
