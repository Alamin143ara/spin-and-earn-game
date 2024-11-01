const canvas = document.getElementById("wheelCanvas");
const ctx = canvas.getContext("2d");

let isSpinning = false;
let totalPoints = 0;
const segments = ["10 Points", "20 Points", "30 Points", "50 Points", "100 Points"];
const colors = ["#FFC107", "#FF5722", "#4CAF50", "#2196F3", "#9C27B0"];
let currentAngle = 0;

// Function to draw the wheel
function drawWheel() {
    const segmentAngle = (2 * Math.PI) / segments.length;
    for (let i = 0; i < segments.length; i++) {
        ctx.beginPath();
        ctx.fillStyle = colors[i];
        ctx.moveTo(200, 200);
        ctx.arc(200, 200, 200, currentAngle, currentAngle + segmentAngle);
        ctx.lineTo(200, 200);
        ctx.fill();
        ctx.stroke();

        ctx.save();
        ctx.translate(200, 200);
        ctx.rotate(currentAngle + segmentAngle / 2);
        ctx.fillStyle = "#fff";
        ctx.font = "20px Arial";
        ctx.fillText(segments[i], 90, 10);
        ctx.restore();

        currentAngle += segmentAngle;
    }
}
drawWheel();

// Function to spin the wheel
function spinWheel() {
    if (isSpinning) return;
    isSpinning = true;

    let spinAngle = Math.random() * 2000 + 2000;
    let spinTime = 0;
    const spinTimeTotal = 4000;

    function rotate() {
        if (spinTime >= spinTimeTotal) {
            isSpinning = false;
            determineReward();
            return;
        }
        spinTime += 20;
        const angle = (spinAngle * (spinTimeTotal - spinTime)) / spinTimeTotal;
        currentAngle += angle / 200;
        drawWheel();
        requestAnimationFrame(rotate);
    }
    rotate();
}

// Function to determine the reward
function determineReward() {
    const angle = (currentAngle % (2 * Math.PI)) / (2 * Math.PI);
    const winningIndex = Math.floor(segments.length * angle);
    const rewardText = segments[winningIndex];
    document.getElementById("result").innerText = `You won ${rewardText}!`;

    const rewardPoints = parseInt(rewardText);
    totalPoints += rewardPoints;
    document.getElementById("points").innerText = `Total Points: ${totalPoints}`;

    // Show ad after each spin
    showAd();
}

// Function to show AdsGram ad
function showAd() {
    document.getElementById("ad-container").innerHTML = "<p>Loading ad...</p>";
    // Add AdsGram ad code here
    // Example: AdsGram.showAd({ elementId: 'ad-container' });

    setTimeout(() => {
        document.getElementById("ad-container").innerHTML = "<p>Thank you for watching the ad!</p>";
    }, 3000); // Ad display duration
}

      // AdsGram ad code
AdsGram.showAd({ elementId: '4875' });

}

  // const AdController = window.Adsgram.init({ blockId: "4875" });
