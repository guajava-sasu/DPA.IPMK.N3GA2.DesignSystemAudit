import struct, zlib, sys, pickle
import zstandard

class R:
    def __init__(s,b): s.b=b; s.p=0
    def byte(s): v=s.b[s.p]; s.p+=1; return v
    def vu(s):
        r=0; sh=0
        while True:
            c=s.b[s.p]; s.p+=1; r|=(c&127)<<sh; sh+=7
            if c<128 or sh>=35: return r
    def vu64(s):
        r=0; sh=0
        while True:
            c=s.b[s.p]; s.p+=1; r|=(c&127)<<sh; sh+=7
            if c<128 or sh>=70: return r
    def vi(s):
        v=s.vu(); return (~(v>>1)) if v&1 else (v>>1)
    def f(s):
        first=s.b[s.p]
        if first==0: s.p+=1; return 0.0
        bits=struct.unpack('<I',s.b[s.p:s.p+4])[0]; s.p+=4
        bits=((bits<<23)|(bits>>9))&0xffffffff
        return struct.unpack('<f',struct.pack('<I',bits))[0]
    def s_(s):
        e=s.b.index(0,s.p); v=s.b[s.p:e].decode('utf8','replace'); s.p=e+1; return v

def schema(b):
    r=R(b); defs=[]
    for _ in range(r.vu()):
        name=r.s_(); kind=r.byte(); fields=[]
        for _ in range(r.vu()):
            fn=r.s_(); t=r.vi(); arr=r.byte(); val=r.vu(); fields.append((fn,t,arr,val))
        defs.append((name,kind,fields))
    return defs

def decode(defs,b,root='Message'):
    idx={d[0]:i for i,d in enumerate(defs)}
    r=R(b)
    def val(t):
        if t==-1: return bool(r.byte())
        if t==-2: return r.byte()
        if t==-3: return r.vi()
        if t==-4: return r.vu()
        if t==-5: return r.f()
        if t==-6: return r.s_()
        if t==-7:
            v=r.vu64(); return (~(v>>1)) if v&1 else (v>>1)
        if t==-8: return r.vu64()
        return obj(t)
    def obj(i):
        name,kind,fields=defs[i]
        if kind==0:
            v=r.vu()
            for fn,_,_,fv in fields:
                if fv==v: return fn
            return v
        out={}
        if kind==1:
            for fn,t,arr,_ in fields:
                out[fn]=[val(t) for _ in range(r.vu())] if arr else val(t)
            return out
        byid={fv:(fn,t,arr) for fn,t,arr,fv in fields}
        while True:
            fid=r.vu()
            if fid==0: return out
            fn,t,arr=byid[fid]
            out[fn]=[val(t) for _ in range(r.vu())] if arr else val(t)
    return obj(idx[root])

if __name__=='__main__':
    d=open(sys.argv[1],'rb').read(); p=12; ch=[]
    while p<len(d):
        n=struct.unpack('<I',d[p:p+4])[0]; ch.append(d[p+4:p+4+n]); p+=4+n
    sb=zlib.decompress(ch[0],-15)
    mb=ch[1]
    mb=zstandard.ZstdDecompressor().decompress(mb,max_output_size=500_000_000) if mb[:4]==b'\x28\xb5\x2f\xfd' else zlib.decompress(mb,-15)
    defs=schema(sb); msg=decode(defs,mb)
    pickle.dump(msg,open(sys.argv[2],'wb'))
    print(len(defs),'defs', msg.keys(), len(msg.get('nodeChanges',[])),'nodes')
