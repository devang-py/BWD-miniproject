// Basic audio playback script for the fixed player

const audio = document.getElementById('audio-player');
const playBtn = document.getElementById('play-btn');
const progressBar = document.getElementById('progress-bar');
const progressFilled = document.getElementById('progress-filled');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');

// icons (use play image plus an alternate image for pause)
const playIcon = 'play_musicbar.png';
const pauseIcon = 'player_icon3.png'; // using the third player icon as a pause indicator

// format seconds to m:ss
function formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
}

// update duration once metadata is loaded
audio.addEventListener('loadedmetadata', () => {
    durationEl.textContent = formatTime(audio.duration);
});

// update progress bar and current time during playback
audio.addEventListener('timeupdate', () => {
    if (audio.duration) {
        const percent = (audio.currentTime / audio.duration) * 100;
        progressFilled.style.width = percent + '%';
        currentTimeEl.textContent = formatTime(audio.currentTime);
    }
});

// handle play/pause toggle
playBtn.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        playBtn.src = pauseIcon;
    } else {
        audio.pause();
        playBtn.src = playIcon;
    }
});

// seek when user clicks on the progress bar
progressBar.addEventListener('click', e => {
    const rect = progressBar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = clickX / rect.width;
    if (!isNaN(ratio) && audio.duration) {
        audio.currentTime = ratio * audio.duration;
    }
});

// reset when audio ends
audio.addEventListener('ended', () => {
    audio.currentTime = 0;
    audio.pause();
    playBtn.src = playIcon;
});
