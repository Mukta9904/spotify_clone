
let songs
let currFolder
let cardNo
// get the songs name from href
async function getSong(folder) {
  currFolder = folder
  let a = await fetch(`http://127.0.0.1:3000/SpotifyClone/songs/${folder}`);
  // let a = await fetch(`/songs/${folder}`);
  let response = await a.text();
  let div = document.createElement("div");
  div.innerHTML = response;
  let as = div.getElementsByTagName("a");
  let songs = [];
  for (let index = 0; index < as.length; index++) {
    const element = as[index];
    if (element.href.endsWith(".mp3")) {
      songs.push(element.href.split(`${folder}/`)[1]);
    }
  }
  return songs;
}
// function displayArtistName(filePath) {
  
//   jsmediatags.read(filePath, {
//     onSuccess: function(tag) {
//       // Access the artist name from the tags
//       var artist = tag.tags.artist;
//       // Display the artist name in the console or on the webpage
//       console.log(artist);
//       // For example, if you have an element with id 'artist-name'
//       document.getElementById('artist-name').textContent = artist;
//     },
//     onError: function(error) {
//       console.log('Error reading tags: ', error.type, error.info);
//     }
//   });
// }
// displayArtistName("C:\Users\Mukta\OneDrive\Documents\Web Development\SpotifyClone\songs\Hindi\Halki Halki Si.mp3");
// play the clicked song
let currSong = new Audio()
async function playSong(track, pause = false) {
  // currSong.src = `/songs/${currFolder}/`+track+".mp3"  
  currSong.src = `/SpotifyClone/songs/${currFolder}/`+track+".mp3" 
  if(!pause){
    await currSong.play()
    play.src = "img/pause.svg"
  }
  else{
    play.src = "img/play.svg"
  }
  document.querySelector(".songName").innerHTML = track.replaceAll("%20"," ")
  document.querySelector(".songTime").innerHTML = "00:00 / 00:00"
}
function secondsToMinutes(seconds) {
  if (typeof seconds !== 'number' || isNaN(seconds)) {
    return "00:00";
  }

  // Round down to the nearest whole number to discard milliseconds
  seconds = Math.floor(seconds);
  
  let minutes = Math.floor(seconds / 60).toString().padStart(2, '0');
  let remainingSeconds = (seconds % 60).toString().padStart(2, '0');

  return minutes + ':' + remainingSeconds;
}
async function main() {

  function createCard(fName, picture , h2, para ){
    document.querySelector(".cardContainer").innerHTML = document.querySelector(".cardContainer").innerHTML + 
    `<div class="card">
    <img src="${picture}" alt="cover pic">
    <div class="play1" data-fileName ="${fName}">
        <svg  width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 20V4L19 12L5 20Z" stroke="#141B34" fill="#000" stroke-width="1.5" stroke-linejoin="round" />
          </svg>
    </div>
    <h2>${h2}</h2>
    <p>${para}</p>
    </div>`
}
 createCard("Hindi","img/hindi.png", "Hindi Songs", "Amaging hindi songs")
 createCard("Bengali","img/bengali.png", "Bengali Songs", "Listen to your heart's contempt")
 // add event on the play1


 document.querySelectorAll('.play1').forEach((element) => {
  // Add a click event listener to each element
  element.addEventListener('click', async () => {
    // Retrieve the 'filename' data attribute from the clicked element
    let folder = element.dataset.filename;
    currFolder = folder
    // Call the getSong function with the folder as an argument
    songs = await getSong(folder)
    playSong(songs[0].split(".mp3")[0], true)
  let songsUL = document
    .querySelector(".songList")
    .getElementsByTagName("ul")[0];
    songsUL.innerHTML = ""
  for (const song of songs) {
    songsUL.innerHTML =
      songsUL.innerHTML + ` <li><div class="music">
            <img class="invert" src="img/music.svg" alt="musicLogo">
        </div>
        <div class="info">
            <div>${song.replaceAll("%20", " ").split(".mp3")[0]} </div>
            <div>Arijit Singh</div>
        </div>
        <div class="play">
            <span>Paly now</span>
            <img class="invert" src="img/play.svg" alt="play">
        </div></li>`;
  }
  // add listner to the songList
  Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e=>{
    e.addEventListener("click", () =>{
     playSong(e.querySelector(".info").firstElementChild.innerHTML.trimEnd())
     document.querySelector(".circle").style.left = "0%"
    })
})
// previous.addEventListener("click",()=>{
//   let song = currSong.src.split(`${currFolder}/`)[1];
//   let index
//   songs.forEach((e,i)=>{
//     if(e == song){
//       index = i
//     }
//   })
//   if(index != 0){
//      playSong(songs[index-1].split(".mp3")[0])
//   }
//   else{
//     playSong(songs[index].split(".mp3")[0])
//   }
//  })
//  // add event listner to  next button

//  next.addEventListener("click",()=>{
//   let song = currSong.src.split(`${currFolder}/`)[1];
//   let index
//   songs.forEach((e,i)=>{
//     if(e == song){
//       index = i
//     }
//   })
//   if(index != songs.length-1) {
//     console.log(songs[index + 1]);
//     (async function (){
//      await playSong(songs[index+1].split(".mp3")[0])
//     })
//   }
//  })
  });
});
  // get list of the songs
  songs = await getSong("Hindi")
  currFolder = "Hindi"
    playSong(songs[0].split(".mp3")[0], true)
  let songsUL = document
    .querySelector(".songList")
    .getElementsByTagName("ul")[0];
  for (const song of songs) {

    songsUL.innerHTML =
      songsUL.innerHTML + ` <li><div class="music">
            <img class="invert" src="img/music.svg" alt="musicLogo">
        </div>
        <div class="info">
            <div>${song.replaceAll("%20", " ").split(".mp3")[0]} </div>
            <div>Arijit Singh</div>
        </div>
        <div class="play">
            <span>Paly now</span>
            <img class="invert" src="img/play.svg" alt="play">
        </div></li>`;
  }
  // add listner to the songList
  Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e=>{
    e.addEventListener("click", () =>{
     playSong(e.querySelector(".info").firstElementChild.innerHTML.trimEnd())
     document.querySelector(".circle").style.left = "0%"
    })
})
previous.addEventListener("click",()=>{
  let song = currSong.src.split(`/${currFolder}/`)[1];
  let index
  songs.forEach((e,i)=>{
    if(e == song){
      index = i
    }
  })
  if(index != 0){
    playSong(songs[index-1].split(".mp3")[0])
  }
  else{
    playSong(songs[index].split(".mp3")[0])
  }
 })
 // add event listner to  next button

 next.addEventListener("click",()=>{
  let song = currSong.src.split(`${currFolder}/`)[1];
  let index
  songs.forEach((e,i)=>{
    if(e == song){
      index = i
    }
  })
  if(index != songs.length-1) {
    console.log(songs[index + 1]);
    (async function (){
     await playSong(songs[index+1].split(".mp3")[0])
    })()
  }
 })
  // audio.addEventListener("loadeddata", () => {
  //   let duration = audio.duration;
  //   // The duration variable now holds the duration (in seconds) of the audio clip
  //   console.log(duration);
  // });

  // pause and play
 play.addEventListener("click",()=>{
            if(currSong.paused){
              currSong.play()
              play.src = "img/pause.svg"
            }
            else{
              currSong.pause()
              play.src = "img/play.svg"
            }
  })

  // listen for timer update
  currSong.addEventListener("timeupdate" , ()=>{
    document.querySelector(".songTime").innerHTML = secondsToMinutes(currSong.currentTime) + " / " + secondsToMinutes(currSong.duration)

    document.querySelector(".circle").style.left = (currSong.currentTime/currSong.duration) * 100 + "%"
  })
  
  // add event on seekbar
  document.querySelector(".seekbar").addEventListener("click",(e)=>{
    let percent = (e.offsetX /e.target.getBoundingClientRect().width) * 100
    document.querySelector(".circle").style.left = percent + "%"
    currSong.currentTime = currSong.duration * (percent/100)
  })
  // add event to the hamburger
  document.querySelector(".hamburger").addEventListener("click",()=>{
   document.querySelector(".left").style.left = "0%"
  
  })
  document.querySelector(".close").addEventListener("click",()=>{
   document.querySelector(".left").style.left = "-500%"
   })
   // add event listner to prev button
   
   // add listner to volume
   document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change", (e)=>{
    console.log("Setting volume to ", e.target.value)
    currSong.volume = e.target.value / 100
   })
   
// let da = document.getElementsByClassName("play1")
//    da.addEventListener("click",(e)=>{
//     console.log(e.dataset.fileName);
//  })
}
main();
