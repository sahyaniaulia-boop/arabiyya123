import { useRef, useState } from "react";
export default function AudioButton({src,text}:{src?:string;text:string}) {
 const ref=useRef<HTMLAudioElement>(null); const [playing,setPlaying]=useState(false); const [note,setNote]=useState("");
 async function play(){
  setNote(""); const audio=ref.current;
  if(audio && src){try{audio.currentTime=0;await audio.play();setPlaying(true);return;}catch{setNote("Rekaman MP3 belum tersedia. Browser akan mencoba suara Arab pada perangkat.");}}
  if("speechSynthesis" in window){window.speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.lang="ar-SA";u.rate=.82;u.onstart=()=>setPlaying(true);u.onend=()=>setPlaying(false);u.onerror=()=>{setPlaying(false);setNote("Suara bahasa Arab tidak tersedia pada perangkat ini.");};window.speechSynthesis.speak(u);}else setNote("Browser tidak mendukung audio.");
 }
 function stop(){ref.current?.pause();if("speechSynthesis"in window)window.speechSynthesis.cancel();setPlaying(false);}
 return <div className="flex flex-col items-center gap-1"><audio ref={ref} src={src} preload="none" onEnded={()=>setPlaying(false)}/><button className="audio-btn" onClick={playing?stop:play} aria-label="Putar pelafalan">{playing?"■":"▶"}</button><span className="text-xs font-bold text-[#164e42]">{playing?"Memutar":"Dengarkan"}</span>{note&&<span className="max-w-[230px] text-center text-[10px] text-amber-700">{note}</span>}</div>;
}