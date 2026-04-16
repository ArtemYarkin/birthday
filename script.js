// 1. Массив с фотографиями (ЗАМЕНИТЕ НА СВОИ!)
const photos = [
    { src: "images/1.jpg", caption: "Наше первое совместное фото 📸" },
    { src: "images/2.jpg", caption: "Смеёмся до упаду 😂" },
    { src: "images/3.jpg", caption: "Ты и я — лучшая команда 💪" },
    { src: "images/4.jpg", caption: "Этот день мы запомним навсегда ❤️" },
    { src: "images/5.jpg", caption: "С днём рождения, моя радость! 🎂" }
];

// Заполняем галерею
const gallery = document.getElementById('gallery');
photos.forEach((photo, index) => {
    const card = document.createElement('div');
    card.className = 'photo-card';
    card.style.animationDelay = `${index * 0.1}s`;
    
    card.innerHTML = `
        <img src="${photo.src}" alt="${photo.caption}" loading="lazy">
        <div class="photo-caption">${photo.caption}</div>
    `;
    
    // Эффект клика — конфетти
    card.addEventListener('click', () => {
        startConfetti();
        setTimeout(stopConfetti, 1500);
        
        // Всплывающее поздравление
        const message = ['🎈 Ура!', '🎉 С днём рождения!', '💖 Ты супер!', '🥳 Обнимаю!'];
        const randomMsg = message[Math.floor(Math.random() * message.length)];
        const popup = document.createElement('div');
        popup.textContent = randomMsg;
        popup.style.position = 'fixed';
        popup.style.left = `${Math.random() * 80 + 10}%`;
        popup.style.top = `${Math.random() * 60 + 20}%`;
        popup.style.background = '#ffeb3b';
        popup.style.color = '#333';
        popup.style.padding = '10px 20px';
        popup.style.borderRadius = '40px';
        popup.style.fontWeight = 'bold';
        popup.style.zIndex = '1000';
        popup.style.animation = 'fadeInUp 0.3s ease';
        document.body.appendChild(popup);
        setTimeout(() => popup.remove(), 1000);
    });
    
    gallery.appendChild(card);
});

// Музыка
const audio = document.getElementById('birthdaySong');
const musicBtn = document.getElementById('musicToggle');
let isPlaying = false;

musicBtn.addEventListener('click', () => {
    if (isPlaying) {
        audio.pause();
        musicBtn.innerHTML = '🔇 Включить музыку';
    } else {
        audio.play().catch(e => console.log('Автовоспроизведение заблокировано браузером, нажмите ещё раз'));
        musicBtn.innerHTML = '🎵 Выключить музыку';
    }
    isPlaying = !isPlaying;
});

// Конфетти (простейший вариант без библиотеки)
let confettiActive = false;
let confettiInterval;

function startConfetti() {
    if (confettiActive) return;
    confettiActive = true;
    const canvas = document.getElementById('confettiCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    let particles = [];
    for (let i = 0; i < 100; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            size: Math.random() * 6 + 2,
            color: `hsl(${Math.random() * 360}, 100%, 60%)`,
            speed: Math.random() * 3 + 2,
            angle: Math.random() * Math.PI * 2
        });
    }
    
    function draw() {
        if (!confettiActive) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let p of particles) {
            ctx.fillStyle = p.color;
            ctx.fillRect(p.x, p.y, p.size, p.size * 0.6);
            p.y += p.speed;
            p.x += Math.sin(p.angle) * 1.5;
            if (p.y > canvas.height) {
                p.y = -10;
                p.x = Math.random() * canvas.width;
            }
        }
        requestAnimationFrame(draw);
    }
    draw();
    setTimeout(() => { confettiActive = false; ctx.clearRect(0, 0, canvas.width, canvas.height); }, 2000);
}

function stopConfetti() {
    confettiActive = false;
}

// Кнопка копирования ссылки
const copyBtn = document.getElementById('copyLinkBtn');
const copyMsg = document.getElementById('copyMessage');

copyBtn.addEventListener('click', () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl).then(() => {
        copyMsg.textContent = '✅ Ссылка скопирована! Отправь подруге :)';
        setTimeout(() => { copyMsg.textContent = ''; }, 2000);
    }).catch(() => {
        copyMsg.textContent = '❌ Не удалось скопировать';
    });
});

// Автоматическое поздравление при загрузке
window.addEventListener('load', () => {
    setTimeout(() => {
        if (confirm('🎁 Привет! Нажми "ОК", чтобы увидеть поздравление-сюрприз')) {
            startConfetti();
            setTimeout(() => alert('💖 С днём рождения, моя дорогая! 💖'), 500);
        }
    }, 500);
});