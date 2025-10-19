const candles = document.querySelectorAll('.candle');

navigator.mediaDevices.getUserMedia({ audio: true })
  .then(stream => {
    const audioContext = new AudioContext();
    const source = audioContext.createMediaStreamSource(stream);
    const analyser = audioContext.createAnalyser();
    source.connect(analyser);
    analyser.fftSize = 256;
    const dataArray = new Uint8Array(analyser.frequencyBinCount);

    function detectBlow() {
      analyser.getByteFrequencyData(dataArray);
      let sum = dataArray.reduce((a,b) => a+b, 0);
      if(sum > 1000){  // blow threshold
        candles.forEach(candle => candle.style.boxShadow = 'none');
      } else {
        candles.forEach(candle => candle.style.boxShadow = '0 0 10px #fff');
      }
      requestAnimationFrame(detectBlow);
    }

    detectBlow();
  })
  .catch(err => console.log('Microphone access denied', err));
