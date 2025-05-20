const text = "click to enter...";
const text_element = document.getElementById('overlay-text');
let current_text = '';
let is_deleting = false;
let char_index = 0;

const typing_speed = {
    min: 50,
    max: 100
};
const deleting_speed = {
    min: 30,
    max: 60
};
const pause_time = 1500;

const title_text = "im undetectable";
let title_index = 0;

function get_random_delay(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function type_title() {
    if (title_index < title_text.length) {
        document.title = title_text.substring(0, title_index + 1);
        title_index++;
        setTimeout(type_title, get_random_delay(typing_speed.min, typing_speed.max));
    } else {
        title_index = 0;
        setTimeout(type_title, pause_time);
    }
}

function type_text() {
    if (!is_deleting && char_index < text.length) {
        current_text = text.substring(0, char_index + 1);
        char_index++;
        setTimeout(type_text, get_random_delay(typing_speed.min, typing_speed.max));
    } else if (is_deleting && char_index > 0) {
        current_text = text.substring(0, char_index - 1);
        char_index--;
        setTimeout(type_text, get_random_delay(deleting_speed.min, deleting_speed.max));
    } else {
        is_deleting = !is_deleting;
        if (!is_deleting) {
            char_index = 0;
        }
        setTimeout(type_text, is_deleting ? pause_time : get_random_delay(typing_speed.min, typing_speed.max));
    }

    text_element.innerHTML = current_text + '<span class="cursor"></span>';
}

function handle_overlay_click() {
    const overlay = document.getElementById('overlay');
    const video = document.getElementById('video-background');
    const audio = document.getElementById('background-audio');

    overlay.classList.add('hidden');
    video.play();
    audio.play();
}

document.addEventListener('DOMContentLoaded', () => {
    type_text();
    type_title();
    document.getElementById('overlay').addEventListener('click', handle_overlay_click);
});

const video = document.getElementById('video-background');
const audio = document.getElementById('background-audio');
const volume_slider = document.querySelector('.volume-slider');
const volume_icon = document.querySelector('.volume-control i');

function pause_media() {
    video.pause();
    audio.pause();
}

function play_media() {
    video.play();
    audio.play();
}

volume_slider.addEventListener('input', (e) => {
    const volume = e.target.value / 100;
    video.volume = volume;
    audio.volume = volume;
    
    if (volume === 0) {
        volume_icon.className = 'fas fa-volume-mute';
    } else if (volume < 0.5) {
        volume_icon.className = 'fas fa-volume-down';
    } else {
        volume_icon.className = 'fas fa-volume-up';
    }
});

document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        pause_media();
    } else {
        play_media();
    }
});

window.addEventListener('beforeunload', pause_media);