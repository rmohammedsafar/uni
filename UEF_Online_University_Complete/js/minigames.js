/**
 * Mini-Games Engine for Infinity Shapes
 * Interactive mini-games embedded inside story progression: Star Catcher, Shape Key Matcher, Rainbow Painter.
 */

import { soundManager } from './audio.js';

export class MiniGameEngine {
  constructor(canvasElement, onCompleteCallback) {
    this.canvas = canvasElement;
    this.ctx = canvasElement.getContext('2d');
    this.onComplete = onCompleteCallback;
    
    this.activeGameType = null;
    this.isRunning = false;
    this.score = 0;
    this.targetScore = 5;
    this.timer = 15;
    this.timerInterval = null;
    this.animFrame = null;

    // Star Catcher State
    this.playerX = 250;
    this.stars = [];

    // Shape Matcher State
    this.targetShape = 'square';
    this.options = [];

    // Rainbow Painter State
    this.waypoints = [];
    this.currentWaypoint = 0;

    this.bindEvents();
  }

  bindEvents() {
    // Mouse / Touch Controls for Star Catcher & Painter
    const handleMove = (e) => {
      if (!this.isRunning) return;
      const rect = this.canvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const x = (clientX - rect.left) * (this.canvas.width / rect.width);

      if (this.activeGameType === 'star_catcher') {
        this.playerX = Math.max(40, Math.min(this.canvas.width - 40, x));
      } else if (this.activeGameType === 'rainbow_painter') {
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        const y = (clientY - rect.top) * (this.canvas.height / rect.height);
        this.checkPainterHit(x, y);
      }
    };

    const handleClick = (e) => {
      if (!this.isRunning || this.activeGameType !== 'shape_match') return;
      const rect = this.canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) * (this.canvas.width / rect.width);
      const y = (e.clientY - rect.top) * (this.canvas.height / rect.height);
      this.checkShapeMatchHit(x, y);
    };

    this.canvas.addEventListener('mousemove', handleMove);
    this.canvas.addEventListener('touchmove', handleMove);
    this.canvas.addEventListener('click', handleClick);
    this.canvas.addEventListener('touchstart', handleClick);
  }

  startMiniGame(gameType, heroConfig) {
    this.activeGameType = gameType;
    this.heroConfig = heroConfig;
    this.isRunning = true;
    this.score = 0;
    this.timer = 15;

    // Resize inner resolution
    this.canvas.width = 600;
    this.canvas.height = 320;

    if (gameType === 'star_catcher') {
      this.targetScore = 6;
      this.stars = [];
      this.playerX = this.canvas.width / 2;
    } else if (gameType === 'shape_match') {
      this.targetScore = 3;
      this.generateShapeMatchRound();
    } else if (gameType === 'rainbow_painter') {
      this.targetScore = 5;
      this.generateRainbowWaypoints();
    }

    // Timer countdown
    if (this.timerInterval) clearInterval(this.timerInterval);
    this.timerInterval = setInterval(() => {
      if (!this.isRunning) return;
      this.timer--;
      if (this.timer <= 0) {
        this.finishMiniGame(true); // Complete even if time runs out to stay happy for kids!
      }
    }, 1000);

    this.gameLoop();
  }

  generateShapeMatchRound() {
    const shapes = ['square', 'circle', 'triangle', 'star'];
    this.targetShape = shapes[Math.floor(Math.random() * shapes.length)];
    
    // Pick 3 option cards
    this.options = [
      { shape: this.targetShape, x: 100, y: 180, size: 80 },
      { shape: shapes.find(s => s !== this.targetShape), x: 260, y: 180, size: 80 },
      { shape: shapes.filter(s => s !== this.targetShape)[1] || 'circle', x: 420, y: 180, size: 80 }
    ].sort(() => Math.random() - 0.5);

    // Re-assign X positions after shuffle
    this.options.forEach((opt, idx) => {
      opt.x = 120 + idx * 170;
    });
  }

  generateRainbowWaypoints() {
    this.waypoints = [];
    for (let i = 0; i < 5; i++) {
      this.waypoints.push({
        x: 80 + i * 110,
        y: 160 + Math.sin(i * 1.2) * 50,
        hit: false
      });
    }
    this.currentWaypoint = 0;
  }

  gameLoop() {
    if (!this.isRunning) return;
    this.update();
    this.render();
    this.animFrame = requestAnimationFrame(() => this.gameLoop());
  }

  update() {
    const ctx = this.ctx;

    if (this.activeGameType === 'star_catcher') {
      // Spawn falling stars
      if (Math.random() < 0.05 && this.stars.length < 5) {
        this.stars.push({
          x: Math.random() * (this.canvas.width - 40) + 20,
          y: -20,
          speed: Math.random() * 2 + 2.5
        });
      }

      // Move stars & collision check
      for (let i = this.stars.length - 1; i >= 0; i--) {
        const s = this.stars[i];
        s.y += s.speed;

        // Catch check
        if (s.y >= this.canvas.height - 70 && Math.abs(s.x - this.playerX) < 45) {
          this.stars.splice(i, 1);
          this.score++;
          soundManager.playSparkle();
          if (this.score >= this.targetScore) {
            this.finishMiniGame(true);
            return;
          }
        } else if (s.y > this.canvas.height + 20) {
          this.stars.splice(i, 1);
        }
      }
    }
  }

  checkShapeMatchHit(x, y) {
    this.options.forEach(opt => {
      if (Math.abs(x - opt.x) < 45 && Math.abs(y - opt.y) < 45) {
        if (opt.shape === this.targetShape) {
          this.score++;
          soundManager.playSparkle();
          if (this.score >= this.targetScore) {
            this.finishMiniGame(true);
          } else {
            this.generateShapeMatchRound();
          }
        } else {
          soundManager.playPop();
        }
      }
    });
  }

  checkPainterHit(x, y) {
    const wp = this.waypoints[this.currentWaypoint];
    if (wp && !wp.hit && Math.abs(x - wp.x) < 40 && Math.abs(y - wp.y) < 40) {
      wp.hit = true;
      this.currentWaypoint++;
      this.score++;
      soundManager.playSparkle();
      if (this.score >= this.targetScore) {
        this.finishMiniGame(true);
      }
    }
  }

  render() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Background
    ctx.fillStyle = '#080918';
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    if (this.activeGameType === 'star_catcher') {
      // Draw falling stars
      ctx.fillStyle = '#ffb703';
      ctx.shadowColor = '#ffb703';
      ctx.shadowBlur = 10;
      this.stars.forEach(s => {
        ctx.beginPath();
        ctx.arc(s.x, s.y, 14, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.shadowBlur = 0;

      // Draw Hero basket/character at bottom
      ctx.fillStyle = this.heroConfig.color || '#ff4785';
      ctx.beginPath();
      ctx.roundRect(this.playerX - 35, this.canvas.height - 65, 70, 50, 10);
      ctx.fill();

    } else if (this.activeGameType === 'shape_match') {
      // Prompt Target
      ctx.fillStyle = '#00f0ff';
      ctx.font = '700 22px Fredoka, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`Tap the matching shape: ${this.targetShape.toUpperCase()}!`, this.canvas.width / 2, 60);

      // Render Option Cards
      this.options.forEach(opt => {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.strokeStyle = '#9d4edd';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.roundRect(opt.x - 50, opt.y - 50, 100, 100, 16);
        ctx.fill();
        ctx.stroke();

        // Draw shape icon inside card
        ctx.fillStyle = '#ff4785';
        ctx.beginPath();
        if (opt.shape === 'circle') ctx.arc(opt.x, opt.y, 25, 0, Math.PI * 2);
        else if (opt.shape === 'triangle') {
          ctx.moveTo(opt.x, opt.y - 25);
          ctx.lineTo(opt.x - 25, opt.y + 25);
          ctx.lineTo(opt.x + 25, opt.y + 25);
          ctx.closePath();
        } else {
          ctx.roundRect(opt.x - 25, opt.y - 25, 50, 50, 8);
        }
        ctx.fill();
      });

    } else if (this.activeGameType === 'rainbow_painter') {
      ctx.fillStyle = '#ffb703';
      ctx.font = '700 22px Fredoka, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Drag your wand to light up the Rainbow Bridge!', this.canvas.width / 2, 50);

      // Draw Rainbow line path
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.3)';
      ctx.lineWidth = 12;
      ctx.beginPath();
      this.waypoints.forEach((wp, idx) => {
        if (idx === 0) ctx.moveTo(wp.x, wp.y);
        else ctx.lineTo(wp.x, wp.y);
      });
      ctx.stroke();

      // Render Waypoints
      this.waypoints.forEach((wp, idx) => {
        ctx.fillStyle = wp.hit ? '#06d6a0' : '#ff4785';
        ctx.shadowColor = ctx.fillStyle;
        ctx.shadowBlur = wp.hit ? 15 : 5;
        ctx.beginPath();
        ctx.arc(wp.x, wp.y, wp.hit ? 22 : 16, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.shadowBlur = 0;
    }
  }

  finishMiniGame(success = true) {
    this.isRunning = false;
    if (this.timerInterval) clearInterval(this.timerInterval);
    if (this.animFrame) cancelAnimationFrame(this.animFrame);

    soundManager.playVictory();
    if (this.onComplete) {
      this.onComplete(success);
    }
  }
}
