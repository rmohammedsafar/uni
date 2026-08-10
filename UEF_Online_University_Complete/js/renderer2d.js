/**
 * 2D Canvas Renderer for Infinity Shapes
 * Renders animated 2D shape heroes, companions, background realms, and particle systems.
 */

export class Renderer2D {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.width = canvas.width;
    this.height = canvas.height;
    
    this.particles = [];
    this.stars = [];
    this.clouds = [];
    this.animTime = 0;
    this.isAnimRunning = false;
    
    this.heroConfig = {
      shape: 'square',
      color: '#ff4785',
      accessory: 'crown',
      expression: 'happy'
    };

    this.companionConfig = {
      shape: 'star',
      color: '#ffb703',
      expression: 'cheerful'
    };

    this.currentRealm = 'forest'; // forest, galaxy, castle, cloud
    
    this.initBackgroundElements();
    this.resizeCanvas();
  }

  resizeCanvas() {
    const dpr = window.devicePixelRatio || 1;
    const rect = this.canvas.getBoundingClientRect();
    if (rect.width && rect.height) {
      this.canvas.width = rect.width * dpr;
      this.canvas.height = rect.height * dpr;
      this.ctx.scale(dpr, dpr);
      this.width = rect.width;
      this.height = rect.height;
    }
  }

  initBackgroundElements() {
    // Generate twinkling background stars
    this.stars = [];
    for (let i = 0; i < 40; i++) {
      this.stars.push({
        x: Math.random() * 800,
        y: Math.random() * 500,
        size: Math.random() * 3 + 1,
        alpha: Math.random(),
        speed: Math.random() * 0.02 + 0.005
      });
    }

    // Generate floating clouds
    this.clouds = [];
    for (let i = 0; i < 5; i++) {
      this.clouds.push({
        x: Math.random() * 800,
        y: Math.random() * 150 + 20,
        speed: Math.random() * 0.3 + 0.1,
        scale: Math.random() * 0.5 + 0.8
      });
    }
  }

  setHeroConfig(config) {
    this.heroConfig = { ...this.heroConfig, ...config };
  }

  setCompanionConfig(config) {
    this.companionConfig = { ...this.companionConfig, ...config };
  }

  setRealm(realm) {
    this.currentRealm = realm;
  }

  startAnimationLoop() {
    if (this.isAnimRunning) return;
    this.isAnimRunning = true;
    
    const loop = () => {
      if (!this.isAnimRunning) return;
      this.animTime += 0.03;
      this.updateParticles();
      this.render();
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }

  stopAnimationLoop() {
    this.isAnimRunning = false;
  }

  addSparkleParticles(x, y, count = 12) {
    const colors = ['#00f0ff', '#ff4785', '#ffb703', '#9d4edd', '#06d6a0'];
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 3 + 1;
      this.particles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: Math.random() * 6 + 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 1.0,
        decay: Math.random() * 0.03 + 0.015
      });
    }
  }

  updateParticles() {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.life -= p.decay;
      if (p.life <= 0) {
        this.particles.splice(i, 1);
      }
    }

    // Update cloud positions
    this.clouds.forEach(c => {
      c.x += c.speed;
      if (c.x > this.width + 100) c.x = -100;
    });

    // Update stars
    this.stars.forEach(s => {
      s.alpha += s.speed;
      if (s.alpha > 1 || s.alpha < 0.2) s.speed = -s.speed;
    });
  }

  render() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    
    // 1. Draw Realm Background
    this.drawRealmBackground();

    // 2. Draw Ground / Platform
    this.drawGround();

    // 3. Draw Companion Character
    const companionX = this.width * 0.3;
    const companionY = this.height * 0.65 + Math.sin(this.animTime * 2.5) * 6;
    this.drawShapeCharacter(companionX, companionY, 50, this.companionConfig);

    // 4. Draw Hero Character
    const heroX = this.width * 0.65;
    const heroJump = Math.abs(Math.sin(this.animTime * 3)) * 12;
    const heroY = this.height * 0.62 - heroJump;
    this.drawShapeCharacter(heroX, heroY, 70, this.heroConfig, true);

    // 5. Draw Particles
    this.drawParticles();
  }

  drawRealmBackground() {
    const ctx = this.ctx;
    let grad;

    switch (this.currentRealm) {
      case 'galaxy':
        grad = ctx.createLinearGradient(0, 0, 0, this.height);
        grad.addColorStop(0, '#090a1f');
        grad.addColorStop(1, '#27104e');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, this.width, this.height);

        // Draw twinkling stars
        this.stars.forEach(s => {
          ctx.fillStyle = `rgba(255, 255, 255, ${s.alpha})`;
          ctx.beginPath();
          ctx.arc(s.x % this.width, s.y % this.height, s.size, 0, Math.PI * 2);
          ctx.fill();
        });
        break;

      case 'castle':
        grad = ctx.createLinearGradient(0, 0, 0, this.height);
        grad.addColorStop(0, '#1a103c');
        grad.addColorStop(1, '#3b1c66');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, this.width, this.height);
        break;

      case 'cloud':
        grad = ctx.createLinearGradient(0, 0, 0, this.height);
        grad.addColorStop(0, '#102d54');
        grad.addColorStop(1, '#2a629a');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, this.width, this.height);

        // Render floating clouds
        this.clouds.forEach(c => {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
          ctx.beginPath();
          ctx.arc(c.x, c.y, 30 * c.scale, 0, Math.PI * 2);
          ctx.arc(c.x + 25 * c.scale, c.y - 10 * c.scale, 35 * c.scale, 0, Math.PI * 2);
          ctx.arc(c.x + 55 * c.scale, c.y, 30 * c.scale, 0, Math.PI * 2);
          ctx.fill();
        });
        break;

      case 'forest':
      default:
        grad = ctx.createLinearGradient(0, 0, 0, this.height);
        grad.addColorStop(0, '#0f2027');
        grad.addColorStop(1, '#203a43');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, this.width, this.height);

        // Draw glowing background trees/shapes
        ctx.fillStyle = 'rgba(6, 214, 160, 0.15)';
        for (let i = 0; i < 6; i++) {
          const x = i * 140 + 20;
          ctx.beginPath();
          ctx.moveTo(x, this.height * 0.7);
          ctx.lineTo(x + 50, this.height * 0.35);
          ctx.lineTo(x + 100, this.height * 0.7);
          ctx.closePath();
          ctx.fill();
        }
        break;
    }
  }

  drawGround() {
    const ctx = this.ctx;
    ctx.fillStyle = 'rgba(26, 29, 66, 0.85)';
    ctx.beginPath();
    ctx.ellipse(this.width / 2, this.height * 0.85, this.width * 0.6, 60, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.4)';
    ctx.lineWidth = 3;
    ctx.stroke();
  }

  drawShapeCharacter(x, y, size, config, isMain = false) {
    const ctx = this.ctx;
    ctx.save();
    ctx.translate(x, y);

    // Subtle squish animation
    const squish = Math.sin(this.animTime * 4) * 0.05;
    ctx.scale(1 + squish, 1 - squish);

    ctx.fillStyle = config.color || '#ff4785';
    ctx.shadowColor = config.color || '#ff4785';
    ctx.shadowBlur = isMain ? 15 : 8;

    const shape = config.shape || 'square';
    
    // Draw Base Geometry
    ctx.beginPath();
    if (shape === 'circle') {
      ctx.arc(0, 0, size / 2, 0, Math.PI * 2);
    } else if (shape === 'triangle') {
      ctx.moveTo(0, -size / 1.8);
      ctx.lineTo(-size / 1.8, size / 1.8);
      ctx.lineTo(size / 1.8, size / 1.8);
      ctx.closePath();
    } else if (shape === 'star') {
      this.drawStarPath(ctx, 0, 0, 5, size / 2, size / 4);
    } else if (shape === 'blob') {
      this.drawBlobPath(ctx, 0, 0, size / 2);
    } else { // Square / Rounded Rect
      const half = size / 2;
      const radius = 12;
      ctx.roundRect(-half, -half, size, size, radius);
    }
    ctx.fill();

    ctx.shadowBlur = 0; // Reset shadow for face details

    // Draw Face Details (Eyes & Smile)
    this.drawFace(ctx, size, config.expression);

    // Draw Accessory (Hat/Crown/Magic Wand)
    if (config.accessory && config.accessory !== 'none') {
      this.drawAccessory(ctx, size, config.accessory);
    }

    ctx.restore();
  }

  drawStarPath(ctx, cx, cy, spikes, outerRadius, innerRadius) {
    let rot = Math.PI / 2 * 3;
    let x = cx;
    let y = cy;
    let step = Math.PI / spikes;

    ctx.moveTo(cx, cy - outerRadius);
    for (let i = 0; i < spikes; i++) {
      x = cx + Math.cos(rot) * outerRadius;
      y = cy + Math.sin(rot) * outerRadius;
      ctx.lineTo(x, y);
      rot += step;

      x = cx + Math.cos(rot) * innerRadius;
      y = cy + Math.sin(rot) * innerRadius;
      ctx.lineTo(x, y);
      rot += step;
    }
    ctx.lineTo(cx, cy - outerRadius);
    ctx.closePath();
  }

  drawBlobPath(ctx, cx, cy, radius) {
    const pulse = Math.sin(this.animTime * 3) * 4;
    ctx.arc(cx, cy, radius + pulse, 0, Math.PI * 2);
  }

  drawFace(ctx, size, expression) {
    const eyeOffset = size * 0.18;
    const eyeY = -size * 0.08;
    const eyeSize = size * 0.09;

    // Blinking logic
    const isBlinking = Math.floor(this.animTime * 2) % 4 === 0 && Math.sin(this.animTime * 10) > 0.8;

    ctx.fillStyle = '#ffffff';

    // Left Eye
    ctx.beginPath();
    if (isBlinking) {
      ctx.rect(-eyeOffset - eyeSize, eyeY, eyeSize * 2, 2);
    } else {
      ctx.arc(-eyeOffset, eyeY, eyeSize, 0, Math.PI * 2);
    }
    ctx.fill();

    // Right Eye
    ctx.beginPath();
    if (isBlinking) {
      ctx.rect(eyeOffset - eyeSize, eyeY, eyeSize * 2, 2);
    } else {
      ctx.arc(eyeOffset, eyeY, eyeSize, 0, Math.PI * 2);
    }
    ctx.fill();

    // Pupils
    if (!isBlinking) {
      ctx.fillStyle = '#10122e';
      ctx.beginPath();
      ctx.arc(-eyeOffset + 1, eyeY, eyeSize * 0.5, 0, Math.PI * 2);
      ctx.arc(eyeOffset + 1, eyeY, eyeSize * 0.5, 0, Math.PI * 2);
      ctx.fill();
    }

    // Cute Cheeks
    ctx.fillStyle = 'rgba(255, 105, 180, 0.5)';
    ctx.beginPath();
    ctx.arc(-eyeOffset - 3, eyeY + 10, eyeSize * 0.8, 0, Math.PI * 2);
    ctx.arc(eyeOffset + 3, eyeY + 10, eyeSize * 0.8, 0, Math.PI * 2);
    ctx.fill();

    // Happy Mouth
    ctx.strokeStyle = '#10122e';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(0, eyeY + 8, size * 0.14, 0.1 * Math.PI, 0.9 * Math.PI);
    ctx.stroke();
  }

  drawAccessory(ctx, size, accessory) {
    ctx.save();
    if (accessory === 'crown') {
      ctx.fillStyle = '#ffb703';
      ctx.beginPath();
      ctx.moveTo(-size * 0.25, -size * 0.45);
      ctx.lineTo(-size * 0.25, -size * 0.7);
      ctx.lineTo(-size * 0.1, -size * 0.55);
      ctx.lineTo(0, -size * 0.75);
      ctx.lineTo(size * 0.1, -size * 0.55);
      ctx.lineTo(size * 0.25, -size * 0.7);
      ctx.lineTo(size * 0.25, -size * 0.45);
      ctx.closePath();
      ctx.fill();
    } else if (accessory === 'wizard') {
      ctx.fillStyle = '#9d4edd';
      ctx.beginPath();
      ctx.moveTo(-size * 0.35, -size * 0.45);
      ctx.lineTo(0, -size * 0.9);
      ctx.lineTo(size * 0.35, -size * 0.45);
      ctx.closePath();
      ctx.fill();
    } else if (accessory === 'glasses') {
      ctx.strokeStyle = '#00f0ff';
      ctx.lineWidth = 3;
      ctx.strokeRect(-size * 0.35, -size * 0.2, size * 0.3, size * 0.2);
      ctx.strokeRect(0.05 * size, -size * 0.2, size * 0.3, size * 0.2);
    }
    ctx.restore();
  }

  drawParticles() {
    const ctx = this.ctx;
    this.particles.forEach(p => {
      ctx.fillStyle = p.color;
      ctx.globalAlpha = Math.max(0, p.life);
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1.0;
  }
}
