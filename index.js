async function songs() {
    try {
        let url = await fetch('songs/songs.json');
        let response = await url.json();
        console.log("Fetched Songs:", response);
        return response;
    } catch (error) {
        console.error("Error fetching songs:", error);
        return [];
    }
}

async function main() {
    let songList = await songs();
    if (!songList || songList.length === 0) {
        console.error("No songs found!");
        return;
    }

    // Set the first song
    currentSong.src = "/songs/" + songList[0];
    document.querySelector("#songinfo").innerHTML = `<span>${songList[0]}</span>`;
    document.querySelector("#songduration").innerHTML = `
        <h5>00:00/${formatTime(currentSong.duration || 0)}</h5>`;

    // Populate song list
    let songslistElement = document.querySelector(".songslist");
    songslistElement.innerHTML = ""; // Clear any existing items

    for (let song of songList) {
        songslistElement.innerHTML += `
            <li style="display: flex; margin:10px; gap: 1em; justify-content: space-around; align-items: center; border: 1px solid white; border-radius: 6px; padding: 1.5%; background-color: hsl(0, 0%, 13%); min-height: 50px;">
                <img src="music.png" class="invert logo" alt="">
                <div class="flex">
                    <span class="hover">${song}</span>
                    <span class="hover">artist</span>
                </div>
                <div class="playnow cursor" style="display: flex; gap: 3px; align-items: center;">
                    <h4 style="font-size:15px;">Play Now</h4>
                </div>
            </li>`;
    }

    // Add click event listeners
    Array.from(songslistElement.getElementsByTagName("li")).forEach((item) => {
        item.addEventListener("click", () => {
            let songName = item.querySelector(".flex span").textContent.trim();
            playMusic(songName);
        });
    });
}

main();
