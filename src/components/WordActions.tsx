import {useEffect,useState} from "react";
export default function WordActions({id}:{id:string}){const [fav,setFav]=useState(false);const [learned,setLearned]=useState(false);
 useEffect(()=>{setFav(JSON.parse(localStorage.getItem("arabiyyaFavorites")||"[]").includes(id));setLearned(JSON.parse(localStorage.getItem("arabiyyaLearned")||"[]").includes(id));},[id]);
 function toggle(key:string,val:boolean,set:(v:boolean)=>void){const arr:string[]=JSON.parse(localStorage.getItem(key)||"[]");const next=val?arr.filter(x=>x!==id):[...arr,id];localStorage.setItem(key,JSON.stringify(next));set(!val);}
 return <div className="flex flex-wrap justify-center gap-3"><button className="btn-secondary" onClick={()=>toggle("arabiyyaFavorites",fav,setFav)}>{fav?"♥ Tersimpan":"♡ Simpan favorit"}</button><button className="btn-primary" onClick={()=>toggle("arabiyyaLearned",learned,setLearned)}>{learned?"✓ Sudah dipelajari":"Tandai dipelajari"}</button></div>;
}