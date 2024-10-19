const startButton = document.getElementById('startButton');
const loveMessage = document.getElementById('loveMessage');
const canvas = document.getElementById('heartCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let hearts = [];

// Hiệu ứng trái tim rơi
function createHeart() {
  const heart = {
    x: Math.random() * canvas.width,
    y: 0,
    size: Math.random() * 30 + 10,
    speed: Math.random() * 2 + 1,
    color: `hsl(${Math.random() * 360}, 100%, 75%)`,
  };
  hearts.push(heart);
}

function drawHeart(heart) {
  ctx.fillStyle = heart.color;
  ctx.beginPath();
  ctx.moveTo(heart.x, heart.y);
  ctx.bezierCurveTo(
    heart.x - heart.size / 2, heart.y - heart.size / 2,
    heart.x - heart.size, heart.y + heart.size / 3,
    heart.x, heart.y + heart.size
  );
  ctx.bezierCurveTo(
    heart.x + heart.size, heart.y + heart.size / 3,
    heart.x + heart.size / 2, heart.y - heart.size / 2,
    heart.x, heart.y
  );
  ctx.fill();
}

function updateHearts() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  hearts.forEach((heart, index) => {
    heart.y += heart.speed;
    if (heart.y > canvas.height) {
      hearts.splice(index, 1);
    } else {
      drawHeart(heart);
    }
  });
  requestAnimationFrame(updateHearts);
}

// Khi nhấn vào nút
startButton.addEventListener('click', () => {
  // Ẩn nút
  startButton.classList.add('hidden');
  
  // Hiển thị lời chúc và thú cưng
  loveMessage.classList.remove('hidden');
  
  // Bắt đầu hiệu ứng trái tim rơi
  setInterval(createHeart, 300);
  updateHearts();
});
