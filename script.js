const candles = document.querySelectorAll('.candle');

// Microphone blow detection
navigator.mediaDevices.getUserMedia({ audio: true })
.then(stream => {
    const audioCtx = new AudioContext();
    const source = audioCtx.createMediaStreamSource(stream);
    const analyser = audioCtx.createAnalyser();
    source.connect(analyser);
    analyser.fftSize = 256;
    const dataArray = new Uint8Array(analyser.frequencyBinCount);

    function detectBlow() {
        analyser.getByteFrequencyData(dataArray);
        let sum = dataArray.reduce((a,b)=>a+b,0);
        if(sum > 1000){
            candles.forEach(c=>c.style.boxShadow='none');
            triggerConfetti();
        } else {
            candles.forEach(c=>c.style.boxShadow='0 0 15px #fff');
        }
        requestAnimationFrame(detectBlow);
    }
    detectBlow();
})
.catch(err=>console.log('Mic access denied', err));

// Confetti effect
const canvas = document.getElementById('confetti');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let confettiParticles = [];

function triggerConfetti(){
    for(let i=0;i<120;i++){
        confettiParticles.push({
            x: Math.random()*canvas.width,
            y: Math.random()*canvas.height/2,
            r: Math.random()*6+2,
            d: Math.random()*10+5,
            color: `hsl(${Math.random()*360}, 100%, 70%)`,
            tilt: Math.random()*10-10
        });
    }
}

function drawConfetti(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    confettiParticles.forEach((p,i)=>{
        ctx.beginPath();
        ctx.fillStyle = p.color;
        ctx.moveTo(p.x+p.tilt, p.y);
        ctx.lineTo(p.x+p.tilt+p.r/2, p.y+p.r);
        ctx.lineTo(p.x+p.tilt-p.r/2, p.y+p.r);
        ctx.fill();
        p.y += 2;
        if(p.y>canvas.height){ confettiParticles.splice(i,1); }
    });
    requestAnimationFrame(drawConfetti);
}
drawConfetti();

// Sparkle effect for cake layers
function createSparkle(canvasId){
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    let sparkles = [];
    for(let i=0;i<50;i++){
        sparkles.push({
            x: Math.random()*canvas.width,
            y: Math.random()*canvas.height,
            r: Math.random()*2+1,
            dx: (Math.random()-0.5)/2,
            dy: (Math.random()-0.5)/2,
            alpha: Math.random()
        });
    }

    function draw(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        sparkles.forEach(s=>{
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.r, 0, Math.PI*2);
            ctx.fillStyle = `rgba(255,255,255,${s.alpha})`;
            ctx.fill();
            s.x += s.dx;
            s.y += s.dy;
            s.alpha += (Math.random()-0.5)*0.05;
            if(s.alpha<0) s.alpha=0;
            if(s.alpha>1) s.alpha=1;
        });
        requestAnimationFrame(draw);
    }
    draw();
}

// Add sparkles to all layers
createSparkle('sparkle1');
createSparkle('sparkle2');
createSparkle('sparkle3');

