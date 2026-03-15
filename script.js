const photoList = ["d.jpg", "1773573887613.jpg", "1773573884038.jpg", "1773573881975.jpg", "1773573879293.jpg", "final.jpg"];
let tapCount = 20;
const music = document.getElementById('bdayMusic');

function typeWriter(elementId, text, speed = 100) {
    let i = 0;
    const element = document.getElementById(elementId);
    element.innerHTML = "";
    return new Promise(resolve => {
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else {
                resolve();
            }
        }
        type();
    });
}

window.onload = () => {
    initGame();
};

async function initGame() {
    const btn = document.getElementById('targetBtn');
    btn.style.display = 'block';
    btn.style.left = '50%';
    btn.style.top = '75%';
    btn.style.transform = 'translate(-50%, -50%)';
    
    await typeWriter('intro-title', 'HBD! ^⁠_⁠^');
    typeWriter('status-text', 'Unlock the magic (20 taps)', 50);
}

function moveButton() {
    const btn = document.getElementById('targetBtn');
    const margin = 100; 
    const maxX = window.innerWidth - btn.offsetWidth - margin;
    const maxY = window.innerHeight - btn.offsetHeight - margin;
    const newX = Math.max(margin, Math.random() * maxX);
    const newY = Math.max(margin, Math.random() * maxY);
    
    btn.style.left = newX + 'px';
    btn.style.top = newY + 'px';
    btn.style.transform = "translate(0, 0) scale(1)"; 
}

function handleTap() {
    if (tapCount === 20) music.play().catch(e => console.log("Music interaction required"));

    tapCount--;
    const status = document.getElementById('status-text');
    if (tapCount > 0) {
        status.innerText = `Almost there... ${tapCount}`;
        moveButton();
    } else {
        startFlashSequence();
    }
}

function startFlashSequence() {
    const btn = document.getElementById('targetBtn');
    const mainImg = document.getElementById('final-photo');
    btn.style.display = 'none';
    document.getElementById('setup-content').style.display = 'none';
    document.getElementById('birthday-content').style.display = 'block';

    let flashCycles = 0;
    const totalFlashes = 18; 
    const flashInterval = setInterval(() => {
        mainImg.src = photoList[flashCycles % photoList.length];
        flashCycles++;
        if (flashCycles >= totalFlashes) {
            clearInterval(flashInterval);
            mainImg.src = photoList[photoList.length - 1];
            startCelebration();
        }
    }, 150); 
}

async function startCelebration() {
    await typeWriter('final-hbd', 'Happy Birthday', 100);
    await typeWriter('final-name', 'DHANABELLS', 150);
    await typeWriter('birthday-message', 'wala lang, tanda mo na sis HAHAHAH', 50);
    
    document.getElementById('retryBtn').style.display = 'inline-block';

    for(let i=0; i<100; i++) setTimeout(createConfetti, i * 20);
    for(let i=0; i<60; i++) setTimeout(createFloatingElement, i * 150);
}

function restartGame() {
    tapCount = 20;
    document.getElementById('birthday-content').style.display = 'none';
    document.getElementById('setup-content').style.display = 'block';
    document.getElementById('retryBtn').style.display = 'none';
    initGame();
}

function createConfetti() {
    const confetti = document.createElement('div');
    const colors = ['#a0d8ff', '#82ccff', '#ffffff', '#4682b4'];
    confetti.className = 'confetti';
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
    document.body.appendChild(confetti);
    setTimeout(() => confetti.remove(), 5000);
}

function createFloatingElement() {
    const isPhoto = Math.random() > 0.5;
    const el = isPhoto ? document.createElement('img') : document.createElement('div');
    if (isPhoto) {
        el.src = photoList[Math.floor(Math.random() * photoList.length)];
        el.style.width = (Math.random() * 50 + 70) + 'px';
        el.style.height = el.style.width;
        el.style.borderRadius = '20px';
        el.style.border = '2px solid rgba(255,255,255,0.8)';
        el.style.objectFit = 'cover';
    } else {
        const items = ["💙", "^⁠_⁠^", "🌷", "🦋", "🌸"];
        el.innerText = items[Math.floor(Math.random() * items.length)];
        el.style.fontSize = (Math.random() * 20 + 20) + 'px';
    }
    el.className = 'floating-element';
    el.style.left = Math.random() * 95 + 'vw';
    el.style.bottom = '-100px';
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 5500);
}
