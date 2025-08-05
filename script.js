class CountdownTimer {
  constructor(endTime, onTick, onEnd) {
    this.endTime = new Date(endTime).getTime();
    this.onTick = onTick;
    this.onEnd = onEnd;
    this.interval = null;
  }

  start() {
    this.update();
    this.interval = setInterval(() => this.update(), 1000);
  }

  stop() {
    clearInterval(this.interval);
  }

  update() {
    const now = new Date().getTime();
    const distance = this.endTime - now;

    if (distance <= 0) {
      this.stop();
      this.onTick(this.formatTime(0));
      if (this.onEnd) this.onEnd();
    } else {
      this.onTick(this.formatTime(distance));
    }
  }

  formatTime(ms) {
    const seconds = Math.floor(ms / 1000) % 60;
    const minutes = Math.floor(ms / (1000 * 60)) % 60;
    const hours = Math.floor(ms / (1000 * 60 * 60)) % 24;
    const days = Math.floor(ms / (1000 * 60 * 60 * 24));
    return { days, hours, minutes, seconds };
  }
}

const countdownDisplay = {
  days: document.getElementById("days"),
  hours: document.getElementById("hours"),
  minutes: document.getElementById("minutes"),
  seconds: document.getElementById("seconds"),
};

const timer = new CountdownTimer(
  "2025-12-31T23:59:59",
  (time) => {
    countdownDisplay.days.textContent = time.days;
    countdownDisplay.hours.textContent = time.hours;
    countdownDisplay.minutes.textContent = time.minutes;
    countdownDisplay.seconds.textContent = time.seconds;
  },
  () => {
    alert("Selamat Tahun Baru! 🎆");
  }
);

timer.start();
