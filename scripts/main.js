const background_media = [
    {
        video: "https://files.catbox.moe/tuq2jr.mp4",
        audio: "https://files.catbox.moe/knqq1z.mp3"
    },
    {
        video: "https://files.catbox.moe/9go72x.mp4",
        audio: "https://files.catbox.moe/lxdn0d.mp3"
    }
];

const random_media = background_media[Math.floor(Math.random() * background_media.length)];

const text = "click_to_enter( true );";
const text_element = document.getElementById('overlay-text');
let current_text = '';
let is_deleting = false;
let char_index = 0;

const typing_speed = {
    min: 60,
    max: 100
};

const deleting_speed = {
    min: 30,
    max: 60
};

const pause_time = 1500;

const title_phrases = [
    "im",
    "undetectable",
    "on",
    "easy-anti-cheat"
];

let title_index = 0;
let is_title_deleting = false;
let has_clicked_enter = false;

function get_random_delay(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function type_title() {
    document.title = title_phrases[title_index];
    title_index = (title_index + 1) % title_phrases.length;
    setTimeout(type_title, 1000); 
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

    const function_name = current_text.split('(')[0];
    const rest = current_text.substring(function_name.length);
    const has_true = rest.includes('true');
    const parentheses = rest.split('true')[0];
    const true_text = has_true ? 'true' : '';
    const closing = rest.substring(parentheses.length + (has_true ? 4 : 0));
    
    text_element.innerHTML = `<span style="color: rgba(222,121,154,255); text-shadow: 0 0 5px rgba(222,121,154,0.5);">${function_name}</span><span style="color: rgba(154,173,177,255);">${parentheses}</span><span style="color: rgba(125,138,232,255); text-shadow: 0 0 8px rgba(125,138,232,0.7);">${true_text}</span><span style="color: rgba(154,173,177,255);">${closing}</span><span class="cursor"></span>`;
}

function handle_overlay_click() {
    const overlay = document.getElementById('overlay');
    const video = document.getElementById('video-background');
    const audio = document.getElementById('background-audio');

    overlay.classList.add('hidden');
    video.classList.add('visible');
    video.play();
    audio.play();
    has_clicked_enter = true;
}

document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('video-background');
    const audio = document.getElementById('background-audio');
    
    video.src = random_media.video;
    audio.src = random_media.audio;
    
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

function sync_media() {
    const video = document.getElementById('video-background');
    const audio = document.getElementById('background-audio');
    
    if (Math.abs(video.currentTime - audio.currentTime) > 0.1) {
        audio.currentTime = video.currentTime;
    }
}

setInterval(sync_media, 100);

function play_media() {
    const video = document.getElementById('video-background');
    const audio = document.getElementById('background-audio');
    
    audio.currentTime = video.currentTime;
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
    } else if (has_clicked_enter) {
        play_media();
    }
});

window.addEventListener('beforeunload', pause_media);
