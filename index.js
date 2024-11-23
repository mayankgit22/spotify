console.log("hello")
let currentSong = new Audio();
const btns=document.querySelectorAll(".playbtn");
function formatTime(seconds) {
  // Ensure the input is a non-negative integer
  // if (seconds < 0 || !Number.isInteger(seconds)) {
  //     throw new Error("Input should be a non-negative integer.");
  // }

  // Calculate minutes and seconds
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  // Format minutes and seconds to always show two digits
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(remainingSeconds).padStart(2, '0');

  return `${formattedMinutes}:${formattedSeconds}`;
}

// Example usage
// console.log(formatTime(75)); // Output: "01:15"
// console.log(formatTime(9));  // Output: "00:09"
// console.log(formatTime(0));  // Output: "00:00"


const play=document.getElementById("play");

const prev=document.getElementById("prev");
const next=document.getElementById("next");
async function songs(){
   try{ let url = await fetch('./songs/songs.json');
  let response= await url.json();
    return response;
  console.log(response);}
    catch (error) {
        console.error("Error fetching songs:", error);
        return [];
    }
let div=document.createElement("div");
div.innerHTML=response;
// let tds=document.getElementsByTagName("directory")
let songs=[];
let songName=div.getElementsByTagName("a");
// console.log(songName)
// songName.forEach(song => {
//     songs.push(song.textContent.trim());
    
// });
for(let i=0;i<songName.length;i++){
    const element=songName[i];
    if(element.href.endsWith(".mp3"))
        songs.push(element.href.split("/songs/")[1].replaceAll("%20"," "))
}
return (songs)

}
let duration1=0;
currentSong.addEventListener("loadeddata",()=>{
   duration1 =(currentSong.duration);
// let x=audio.currentTime
// console.log(x)
  console.log(duration1)
})
const playMusic =(e,pause=false)=>{
currentSong.src = "https://mayankgit22.github.io/spotify/songs/" + encodeURIComponent(e);

   if(!pause){

     currentSong.play();
      play.src="pause1.svg"
   }
 document.querySelector("#songinfo").innerHTML=`<span>${e}</span>`;
    document.querySelector("#songduration").innerHTML=`<h5>${formatTime(currentSong.currentTime)}/${formatTime(currentSong.duration)}</h5>`;


} 
play.addEventListener("click",()=>{

  if(currentSong.paused){

    currentSong.play();
    play.src="pause1.svg"
  }
  else{
    currentSong.pause();
    play.src="play.svg";
  }
})
next.addEventListener("click",(e)=>{
  currentSong.src = "/songs/"+ e;
 currentSong.play();

})


async function main(){
  // let currentSong=new Audio();
    let song= await songs();
   // Set the first song as the current song source
    currentSong.src = "https://mayankgit22.github.io/spotify/songs/" + encodeURIComponent(song[0]);
   document.querySelector("#songinfo").innerHTML = `<span>${song[0]}</span>`;
   document.querySelector("#songduration").innerHTML = `<h5>00:00/${formatTime(currentSong.duration || 0)}</h5>`;
    playMusic(song[0]);
    // console.log(song);
    let songslist =document.querySelector(".songslist");
    for(let s of song){
    currentSong.src=s[0];
    //   let name= song[s];

      songslist.innerHTML=songslist.innerHTML+`<li style="display: flex;
      margin:10px;
    gap: 1em;
    justify-content: space-around;
    align-items: center;
    
    border: 1px solid white;
    border-radius: 6px ;
    padding: 1.5%;
    /* cursor: pointer; */
    background-color:hsl(0, 0%, 13%);
min-height:50px;
/* list-style: none; */
/* font-size: 2em; */
list-style-type: decimal;
/* color: red; */
">
        <img src="music.png"  class="invert logo" alt="">
                        
                        <div class="flex" cl><span class="hover">${s}

                        </span>
                    <span class="hover">artist</span></div>
                      
                        <div class="playnow cursor" style="display: flex; gap: 3px; align-items: center; "><h4 style="font-size:15px;">Play Now</h4>
                            <svg id="playlibrary" xmlns="http://www.w3.org/2000/svg" class="invert" viewBox="0 0 24 24" width="24" height="24" color="#000000" fill="none">
                                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5" />
                                <path d="M9.5 11.1998V12.8002C9.5 14.3195 9.5 15.0791 9.95576 15.3862C10.4115 15.6932 11.0348 15.3535 12.2815 14.6741L13.7497 13.8738C15.2499 13.0562 16 12.6474 16 12C16 11.3526 15.2499 10.9438 13.7497 10.1262L12.2815 9.32594C11.0348 8.6465 10.4115 8.30678 9.95576 8.61382C9.5 8.92086 9.5 9.6805 9.5 11.1998Z" fill="currentColor" />
                            </svg></div></li>`;

   
    }
 
    
 Array.from(document.querySelector(".songslist").getElementsByTagName("li")).forEach(t => {
  t.addEventListener("click" ,element=>{

    let e= t.querySelector(".flex").firstElementChild.innerHTML.trim();
    // console.log(e)
    playMusic(e);
     
  })
  currentSong.addEventListener("timeupdate",()=>{
    document.getElementById("seekcircle").style.left=(currentSong.currentTime/currentSong.duration)*99+"%";

    document.querySelector("#songduration").innerHTML=`<h5>${formatTime(currentSong.currentTime)}/${formatTime(currentSong.duration)}</h5>`;
  })
 
  document.querySelector("#seekbar").addEventListener("click",(e)=>{
    let percent=(e.offsetX/e.target.getBoundingClientRect().width)*100;
    document.getElementById("seekcircle").style.left=percent+"%";
    currentSong.currentTime=((currentSong.duration)*percent)/100;
  })
 })




 
    
}
main();
