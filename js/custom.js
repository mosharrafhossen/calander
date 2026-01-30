
/* 🌍 Language Data */
const LANG = {
  en:{
    months:["January","February","March","April","May","June","July","August","September","October","November","December"],
    days:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],
    today:"Today",
    aria:"Calendar"
  },
  bn:{
    months:["জানুয়ারী","ফেব্রুয়ারী","মার্চ","এপ্রিল","মে","জুন","জুলাই","আগস্ট","সেপ্টেম্বর","অক্টোবর","নভেম্বর","ডিসেম্বর"],
    days:["সোম","মঙ্গল","বুধ","বৃহঃ","শুক্র","শনি","রবি"],
    today:"আজ",
    aria:"ক্যালেন্ডার"
  }
};

let currentLang="en";

let now=new Date();
let y=now.getFullYear();
let m=now.getMonth();

const title=document.getElementById("title");
const grid=document.getElementById("grid");
const weekdaysEl=document.getElementById("weekdays");
const todayBtn=document.getElementById("todayBtn");
const langBtn=document.getElementById("langBtn");
const calendar=document.querySelector(".calendar");

function renderWeekdays(){
  weekdaysEl.innerHTML="";
  LANG[currentLang].days.forEach(d=>{
    const div=document.createElement("div");
    div.textContent=d;
    weekdaysEl.appendChild(div);
  });
}

function render(){
  grid.innerHTML="";
  title.textContent=`${LANG[currentLang].months[m]} ${y}`;
  todayBtn.textContent=LANG[currentLang].today;
  calendar.setAttribute("aria-label",LANG[currentLang].aria);

  let first=new Date(y,m,1).getDay();
  let start=first===0?6:first-1;
  let days=new Date(y,m+1,0).getDate();

  for(let i=0;i<start;i++)
    grid.appendChild(empty());

  for(let d=1;d<=days;d++){
    let date=new Date(y,m,d);
    let div=document.createElement("div");
    div.className="day";
    if(date.getDay()==0 || date.getDay()==6) div.classList.add("weekend");
    if(d===now.getDate() && m===now.getMonth() && y===now.getFullYear())
      div.classList.add("today");
    div.textContent=d;
    grid.appendChild(div);
  }
}

function empty(){
  let e=document.createElement("div");
  e.className="day empty";
  return e;
}

/* Controls */
document.getElementById("prev").onclick=()=>{
  m--; if(m<0){m=11;y--;} render();
};

document.getElementById("next").onclick=()=>{
  m++; if(m>11){m=0;y++;} render();
};

todayBtn.onclick=()=>{
  now=new Date(); y=now.getFullYear(); m=now.getMonth(); render();
};

langBtn.onclick=()=>{
  currentLang = currentLang==="en" ? "bn" : "en";
  langBtn.textContent = currentLang==="en" ? "BN" : "EN";
  renderWeekdays();
  render();
};

/* Init */
renderWeekdays();
render();
