body {
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #000;
  font-family: 'Arial', sans-serif;
  overflow: hidden;
}

.scene {
  position: relative;
  text-align: center;
}

.cake-plate {
  width: 300px;
  height: 20px;
  background: #555;
  border-radius: 50%;
  margin: 0 auto;
  position: relative;
  top: 20px;
}

.cake {
  position: relative;
  margin: 0 auto;
}

.layer {
  width: 200px;
  height: 50px;
  margin: 0 auto;
  border-radius: 50px 50px 20px 20px;
  background: linear-gradient(to right, #1E3A8A, #3B82F6);
  box-shadow: 0 5px 15px rgba(0,0,0,0.5);
  position: relative;
}

.layer1 { top: 0; z-index: 3; }
.layer2 { top: -20px; z-index: 2; width: 180px; }
.layer3 { top: -40px; z-index: 1; width: 160px; }

.candle {
  width: 10px;
  height: 40px;
  background: white;
  position: absolute;
  top: -50px;
  left: calc(50% - 5px);
  border-radius: 3px;
  box-shadow: 0 0 10px #fff;
}

#candle1 { left: 60px; }
#candle2 { left: 95px; }
#candle3 { left: 130px; }

.candle::after {
  content: '';
  width: 6px;
  height: 15px;
  background: linear-gradient(to top, #00f, #fff);
  position: absolute;
  top: -15px;
  left: 2px;
  border-radius: 50%;
  animation: flicker 0.5s infinite;
}

@keyframes flicker {
  0%, 100% { opacity: 1; transform: translateY(0); }
  50% { opacity: 0.6; transform: translateY(-2px); }
}

.message {
  color: #fff;
  font-size: 28px;
  margin-top: 20px;
  text-shadow: 0 0 10px #3B82F6;
}

