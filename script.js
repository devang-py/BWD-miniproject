// Basic audio playback script for the fixed player

const audio = document.getElementById('audio-player');
const playBtn = document.getElementById('play-btn');
const progressBar = document.getElementById('progress-bar');
const progressFilled = document.getElementById('progress-filled');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');

// track display elements
const trackTitleEl = document.querySelector('.track-title');
const trackArtistEl = document.querySelector('.track-artist');

// set default info immediately (shape of you is the default source)
trackTitleEl.textContent = 'Shape of You';
trackArtistEl.textContent = 'Unknown';

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

// when a card is clicked, update the player
function handleCardClick(e) {
    const card = e.currentTarget;
    const src = card.getAttribute('data-src');
    const title = card.getAttribute('data-title');
    if (src) {
        audio.src = src;
        trackTitleEl.textContent = title || 'Song Title';
        trackArtistEl.textContent = 'Unknown';
        audio.play();
        playBtn.src = pauseIcon;
        // reset progress display
        currentTimeEl.textContent = '0:00';
        progressFilled.style.width = '0%';
    }
}

document.querySelectorAll('.card').forEach(c => c.addEventListener('click', handleCardClick));

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
