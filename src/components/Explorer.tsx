import {useMemo,useState} from "react";
import words from "../data/vocabulary.json";
import cats from "../data/categories.json";
import AudioButton from "./AudioButton";
export default function Explorer({initial="all"}:{initial?:string}){
 const [q,setQ]=useState("");const [cat,setCat]=useState(initial);
 const result=useMemo(()=>words.filter(w=>(cat==="all"||w.category===cat)&&(!q||[w.arabic,w.translation,w.transliteration].some(s=>s.toLowerCase().includes(q.toLowerCase())))),[q,cat]);
 return <div>
 <div className="grid gap-3 md:grid-cols-[1fr_250px]"><input className="input" placeholder="Cari kata Arab, arti, atau transliterasi..." value={q} onChange={e=>setQ(e.target.value)}/><select className="input" value={cat} onChange={e=>setCat(e.target.value)}><option value="all">Semua kategori</option>{cats.map(c=><option value={c.slug}>{c.name}</option>)}</select></div>
 <div className="mt-4 flex flex-wrap gap-2">{cats.map(c=><button onClick={()=>setCat(c.slug)} className={`rounded-full px-4 py-2 text-xs font-bold ${cat===c.slug?"bg-[#164e42] text-white":"bg-white text-[#63736a] border border-[#e5ebe4]"}`}>{c.name}</button>)}<button onClick={()=>setCat("all")} className={`rounded-full px-4 py-2 text-xs font-bold ${cat==="all"?"bg-[#164e42] text-white":"bg-white text-[#63736a] border"}`}>Semua</button></div>
 <p className="my-5 text-sm muted">{result.length} kosakata ditemukan</p>
 <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{result.map(w=><article className="card overflow-hidden" key={w.id}>
 <a href={`/vocabulary/${w.slug}/`}><img src={w.image} alt={`Ilustrasi ${w.translation}`} className="h-40 w-full object-cover"/><div className="p-4 text-center"><div className="arabic text-3xl">{w.arabic}</div><div className="mt-1 font-bold text-[#164e42]">{w.translation}</div><div className="mt-1 text-xs muted">{w.transliteration}</div></div></a>
 <div className="flex items-center justify-between border-t border-[#edf0eb] px-4 py-3"><a className="text-xs font-bold text-[#164e42]" href={`/vocabulary/${w.slug}/`}>Pelajari →</a><AudioButton text={w.arabic}/></div></article>)}</div>
 {result.length===0&&<div className="card p-10 text-center"><b>Kosakata tidak ditemukan</b><p className="mt-2 text-sm muted">Coba kata kunci lain.</p></div>}
 </div>;
}