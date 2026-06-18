// ===== INDEX PAGE =====
const nameForm = document.getElementById('nameForm');
if (nameForm) {
    nameForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const sender = document.getElementById('senderInput').value.trim();
        const recipient = document.getElementById('recipientInput').value.trim();
        if (sender && recipient) {
            window.location.href = `card.html?sender=${encodeURIComponent(sender)}&recipient=${encodeURIComponent(recipient)}`;
        }
    });

    createBalloons();
    createStars();
    createConfetti();
}

// ===== CARD PAGE =====
if (document.getElementById('ageForm')) {
    createStars();
    createBalloons();
    createConfetti();
    createHearts();
    createPetals();
    createCandles();

    // Photo upload (required)
    const photoInput = document.getElementById('photoInput');
    const photoUploadLabel = document.getElementById('photoUploadLabel');
    const photoUploadText = document.getElementById('photoUploadText');
    const photoPreviewWrap = document.getElementById('photoPreviewWrap');
    const photoPreview = document.getElementById('photoPreview');
    const photoRemove = document.getElementById('photoRemove');
    const openCardBtn = document.querySelector('#ageForm .btn');
    let uploadedPhotoUrl = null;

    if (openCardBtn) openCardBtn.disabled = true;

    if (photoInput) {
        photoInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = (ev) => {
                uploadedPhotoUrl = ev.target.result;
                photoPreview.src = uploadedPhotoUrl;
                photoPreviewWrap.classList.add('show');
                photoUploadText.textContent = file.name;
                photoUploadLabel.classList.add('has-file');
                openCardBtn.disabled = false;
            };
            reader.readAsDataURL(file);
        });

        photoRemove.addEventListener('click', () => {
            uploadedPhotoUrl = null;
            photoInput.value = '';
            photoPreviewWrap.classList.remove('show');
            photoUploadText.textContent = 'Choose photo...';
            photoUploadLabel.classList.remove('has-file');
            openCardBtn.disabled = true;
        });
    }

    window.showCard = function () {
        const age = document.getElementById('ageInput').value;
        if (!age || age < 1) return;
        if (!uploadedPhotoUrl) return;

        const params = new URLSearchParams(window.location.search);
        const recipient = params.get('recipient') || 'Friend';
        const sender = params.get('sender') || 'Reeof Abahussain';

        document.getElementById('nameDisplay').textContent = recipient;
        document.getElementById('ageDisplay').textContent = age;
        document.getElementById('userPhoto').src = uploadedPhotoUrl;
        document.getElementById('fromDisplay').textContent = sender;

        document.getElementById('ageForm').classList.add('hidden');
        document.getElementById('cardContent').classList.remove('hidden');

        playAudio();
        startMusicNotes();
    };
}

function createStars() {
    const shapes = ['✦', '✧', '⋆', '✶', '✵', '◇', '○', '✿'];
    const starColors = ['#f9a8d4', '#93c5fd', '#86efac', '#fde68a', '#c4b5fd', '#fca5a5'];
    for (let i = 0; i < 50; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        star.textContent = shapes[Math.floor(Math.random() * shapes.length)];
        star.style.left = Math.random() * 100 + 'vw';
        star.style.top = Math.random() * 100 + 'vh';
        star.style.fontSize = (Math.random() * 4 + 6) + 'px';
        star.style.color = starColors[Math.floor(Math.random() * starColors.length)];
        star.style.animationDuration = (Math.random() * 2 + 1.5) + 's';
        star.style.animationDelay = (Math.random() * 4) + 's';
        document.body.appendChild(star);
    }
}

function createBalloons() {
    const container = document.getElementById('balloonsContainer');
    if (!container) return;

    const balloons = [
        { color: '#fbcfe8', glow: 'rgba(251, 207, 232, 0.5)' },
        { color: '#fce7f3', glow: 'rgba(252, 231, 243, 0.5)' },
        { color: '#e9d5ff', glow: 'rgba(233, 213, 255, 0.5)' },
        { color: '#ddd6fe', glow: 'rgba(221, 214, 254, 0.5)' },
        { color: '#e0f7ff', glow: 'rgba(224, 247, 255, 0.6)' },
        { color: '#f0faff', glow: 'rgba(240, 250, 255, 0.6)' },
        { color: '#f3f4f6', glow: 'rgba(243, 244, 246, 0.5)' },
        { color: '#fef3c7', glow: 'rgba(254, 243, 199, 0.5)' },
        { color: '#fde68a', glow: 'rgba(253, 230, 138, 0.5)' }
    ];

    for (let i = 0; i < 12; i++) {
        const balloon = document.createElement('div');
        const pick = balloons[Math.floor(Math.random() * balloons.length)];
        balloon.classList.add('balloon');
        balloon.style.backgroundColor = pick.color;
        balloon.style.left = (Math.random() * 90 + 5) + '%';
        balloon.style.animationDuration = (Math.random() * 5 + 7) + 's';
        balloon.style.animationDelay = (Math.random() * 5) + 's';
        balloon.style.boxShadow = `0 0 20px ${pick.glow}, inset -6px -8px 14px rgba(255,255,255,0.55)`;
        container.appendChild(balloon);
    }

    for (let i = 0; i < 5; i++) {
        const balloon = document.createElement('div');
        const pick = balloons[Math.floor(Math.random() * balloons.length)];
        balloon.classList.add('balloon');
        balloon.style.backgroundColor = pick.color;
        balloon.style.left = (Math.random() * 20) + '%';
        balloon.style.animationDuration = (Math.random() * 5 + 7) + 's';
        balloon.style.animationDelay = (Math.random() * 5) + 's';
        balloon.style.boxShadow = `0 0 20px ${pick.glow}, inset -6px -8px 14px rgba(255,255,255,0.55)`;
        container.appendChild(balloon);
    }
}

function createHearts() {
    const colors = ['#f9a8d4', '#fbcfe8', '#e8b4b8', '#f5d3d3', '#fce7f3'];
    for (let i = 0; i < 14; i++) {
        const heart = document.createElement('div');
        heart.classList.add('floating-heart');
        heart.textContent = '♡';
        heart.style.left = (Math.random() * 95) + 'vw';
        heart.style.color = colors[Math.floor(Math.random() * colors.length)];
        heart.style.fontSize = (Math.random() * 4 + 10) + 'px';
        heart.style.animationDuration = (Math.random() * 8 + 10) + 's';
        heart.style.animationDelay = (Math.random() * 8) + 's';
        document.body.appendChild(heart);
    }
}

function createCandles() {
    const candleEmojis = ['🕯️', '✨'];
    for (let i = 0; i < 20; i++) {
        const candle = document.createElement('div');
        candle.classList.add('floating-candle');
        candle.textContent = candleEmojis[Math.floor(Math.random() * candleEmojis.length)];
        candle.style.left = (Math.random() * 95) + 'vw';
        candle.style.fontSize = (Math.random() * 4 + 10) + 'px';
        candle.style.animationDuration = (Math.random() * 8 + 12) + 's';
        candle.style.animationDelay = (Math.random() * 10) + 's';
        document.body.appendChild(candle);
    }
}

function createPetals() {
    const petalChars = ['❀', '✿', '❁', '✾'];
    const colors = ['#fbcfe8', '#f9a8d4', '#fce7f3', '#fde2e4', '#e8b4b8'];
    for (let i = 0; i < 18; i++) {
        const petal = document.createElement('div');
        petal.classList.add('petal-falling');
        petal.textContent = petalChars[Math.floor(Math.random() * petalChars.length)];
        petal.style.left = (Math.random() * 100) + 'vw';
        petal.style.color = colors[Math.floor(Math.random() * colors.length)];
        petal.style.fontSize = (Math.random() * 4 + 9) + 'px';
        petal.style.animationDuration = (Math.random() * 8 + 10) + 's';
        petal.style.animationDelay = (Math.random() * 10) + 's';
        document.body.appendChild(petal);
    }
}

function createConfetti() {
    const colors = ['#f9a8d4', '#93c5fd', '#86efac', '#fde68a', '#c4b5fd', '#fca5a5'];
    for (let i = 0; i < 20; i++) {
        const piece = document.createElement('div');
        piece.classList.add('confetti-piece');
        piece.style.left = Math.random() * 100 + 'vw';
        piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        piece.style.animationDuration = (Math.random() * 3 + 4) + 's';
        piece.style.animationDelay = (Math.random() * 6) + 's';
        piece.style.width = (Math.random() * 7 + 5) + 'px';
        piece.style.height = (Math.random() * 7 + 5) + 'px';
        if (Math.random() > 0.5) piece.style.borderRadius = '50%';
        document.body.appendChild(piece);
    }
}

function playAudio() {
    const src = 'music.mp3/AbdulMajeedAbdullah Ghano Lehabebe عبد المجيد عبد الله - غنوا لحبيبي.mp4';
    const audio = new Audio(src);
    audio.loop = true;
    audio.volume = 0.6;
    audio.play().catch(() => {});
}

function startMusicNotes() {
    const noteSymbols = ['♪', '♫', '♬', '🎵', '🎶'];
    setInterval(() => {
        const note = document.createElement('div');
        note.classList.add('music-note');
        note.textContent = noteSymbols[Math.floor(Math.random() * noteSymbols.length)];
        note.style.left = (Math.random() * 80 + 10) + 'vw';
        note.style.bottom = '20px';
        note.style.color = '#FFD700';
        note.style.animationDuration = (Math.random() * 2 + 2) + 's';
        document.body.appendChild(note);
        setTimeout(() => note.remove(), 4000);
    }, 800);
}
