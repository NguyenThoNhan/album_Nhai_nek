new Vue({
    el: "#app",
    data() {
      return {
        isOpenedTop: true,
        items: [
          {
            img1: "https://s.net.vn/g9yK",
            img2: "https://s.net.vn/nw99",
            img3: "https://s.net.vn/wo7C",
            title: "CUTE",
            isOpen: false,
          },
          {
            img1: "https://s.net.vn/20nf",
            img2: "https://s.net.vn/PtYK",
            img3: "https://s.net.vn/iBX9",
            title: "PRETTY",
            isOpen: false,
          },
          {
            img1: "https://s.net.vn/mpsS",
            img2: "https://s.net.vn/jlNM",
            img3: "http://surl.li/ydochs",
            title: "BEAUTIFUL",
            isOpen: false,
          },
          {
            img1: "imgaes/img1.jpg",
            img2: "https://s.net.vn/xYC9",
            img3: "https://s.net.vn/46is",
            title: "LOVELY",
            isOpen: false,
          },
          {
            img1: "imgaes/img4.jpg",
            img2: "imgaes/img3.jpg",
            img3: "https://i.pinimg.com/736x/fa/39/eb/fa39eb88592bf16aebab746f88068ac7.jpg",
            title: "MeoMeo",
            isOpen: false,
          },
        ],
      };
    },
    methods: {
      topOpen() {
        this.isOpenedTop = !this.isOpenedTop;
      },
  
      open(idx, isOpen) {
        if (this.isOpenedTop) {
          this.items[idx].isOpen = !isOpen;
        }
      },
  
      reset() {
        this.items.forEach((item) => (item.isOpen = false));
        this.isOpenedTop = false;
      },
    },
  });


  // Danh sách bài hát
let trackList = [
    { name: "Only", artist: "Lee Hi", path: "./music/only.mp3" },
    { name: "Day & Night", artist: "Jung Seung Hwan", path: "./music/day and night.mp3" },
    { name: "Love of my Life", artist: "Reyne", path: "./music/love of my life.mp3" },
    { name: "The Only One", artist: "Reyne", path: "./music/the only one.mp3" },
];

// Lấy các phần tử từ DOM
let musicPlayer = document.querySelector(".music-container");
let togglePlayer = document.querySelector(".toggle-player");

let trackName = document.querySelector(".trackname");
let trackArtist = document.querySelector(".trackartist");
let playPauseBtn = document.querySelector(".playpause-track");
let nextBtn = document.querySelector(".next-track");
let prevBtn = document.querySelector(".prev-track");
let soundBars = document.querySelector(".sound-bars");

// Phần tử hiển thị thời gian
let currentTimeElement = document.createElement('span');
let durationTimeElement = document.createElement('span');
document.querySelector('.player').appendChild(currentTimeElement);
document.querySelector('.player').appendChild(durationTimeElement);

// Trạng thái trình phát nhạc
let trackIndex = 0;
let isPlaying = false;
let currentTrack = document.createElement("audio");

// Tải bài hát
function loadTrack(trackIndex) {
    currentTrack.src = trackList[trackIndex].path;
    trackName.textContent = trackList[trackIndex].name;
    trackArtist.textContent = trackList[trackIndex].artist;
    currentTrack.load();
    
    // Khi bài hát đã tải xong, cập nhật thời lượng
    currentTrack.addEventListener("loadedmetadata", () => {
        durationTimeElement.textContent = formatTime(currentTrack.duration);
    });
    
    currentTrack.addEventListener("ended", nextTrack);
}

// Định dạng thời gian (phút:giây)
function formatTime(seconds) {
    let minutes = Math.floor(seconds / 60);
    let secs = Math.floor(seconds % 60);
    if (secs < 10) secs = "0" + secs;
    return minutes + ":" + secs;
}

// Cập nhật thời gian phát hiện tại
function updateCurrentTime() {
    currentTimeElement.textContent = formatTime(currentTrack.currentTime);
}

// Phát bài hát
function playTrack() {
    currentTrack.play();
    isPlaying = true;
    playPauseBtn.innerHTML = '<img class="w-8" src="icons/pause.svg">';
    soundBarsLottie.play();
}

// Dừng bài hát
function pauseTrack() {
    currentTrack.pause();
    isPlaying = false;
    playPauseBtn.innerHTML = '<img class="w-8" src="icons/play.svg">';
    soundBarsLottie.stop();
}

// Chuyển bài tiếp theo
function nextTrack() {
    if (trackIndex < trackList.length - 1) {
        trackIndex += 1;
    } else {
        trackIndex = 0;
    }
    loadTrack(trackIndex);
    playTrack();
}

// Chuyển bài trước đó
function prevTrack() {
    if (trackIndex > 0) {
        trackIndex -= 1;
    } else {
        trackIndex = trackList.length - 1;
    }
    loadTrack(trackIndex);
    playTrack();
}

// Bật tắt phát/dừng bài hát
function playPauseTrack() {
    if (isPlaying) {
        pauseTrack();
    } else {
        playTrack();
    }
}

// Lắng nghe sự kiện cập nhật thời gian phát
currentTrack.addEventListener("timeupdate", updateCurrentTime);

// Gọi hàm khi các nút được nhấn
playPauseBtn.addEventListener("click", playPauseTrack);
nextBtn.addEventListener("click", nextTrack);
prevBtn.addEventListener("click", prevTrack);

// Tải bài hát đầu tiên
loadTrack(trackIndex);

// Hoạt hình thanh âm thanh
let soundBarsLottie = bodymovin.loadAnimation({
    container: soundBars,
    renderer: "svg",
    loop: true,
    autoPLay: false,
    path: "https://lottie.host/9ec12a7e-e429-453a-9f22-a2af1dcb4dca/2zeuy4rwtP.json",
});
