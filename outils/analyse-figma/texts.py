import pickle,collections,sys
m=pickle.load(open(sys.argv[1],'rb'));N=m['nodeChanges']
g=lambda x:f"{x['sessionID']}:{x['localID']}"
kids=collections.defaultdict(list)
for n in N:
    pi=n.get('parentIndex')
    if pi: kids[g(pi['guid'])].append(n)
for k in kids: kids[k].sort(key=lambda n:n['parentIndex'].get('position',''))
def walk(n,out):
    if n.get('type')=='TEXT':
        t=(n.get('textData') or {}).get('characters','')
        if t.strip(): out.append(t.strip())
    for c in kids[g(n['guid'])]: walk(c,out)
targets=sys.argv[2:]
for n in N:
    if n.get('type') in ('CANVAS',) and n.get('name','').strip() in targets:
        out=[]; walk(n,out)
        seen=set(); res=[]
        for t in out:
            if t not in seen: seen.add(t); res.append(t)
        print('#####',n['name'],len(res)); print('\n'.join(x.replace('\n',' / ') for x in res))
