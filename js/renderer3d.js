/**
 * 3D Open-World Animal Simulator Engine
 * Powered by Three.js
 * Features:
 * - 3D Sunlit Park with Grass Terrain, Trees, Agility Hurdles & Central Fountain
 * - Bouncing 3D Tennis Ball Fetching Physics
 * - Expanding 3D Sound-Wave Ring Particles on Barking / Meowing
 * - Hurdle Jump Scoring & Collision Detection
 * - 3D Quadruped Running & Backflip Trick Physics
 * - WASD & Touch D-Pad Controls with Third-Person Chase Camera
 */

import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';
import { soundManager } from './audio.js';

export class Renderer3D {
  constructor(containerElement, isPreview = false) {
    this.container = containerElement;
    this.isPreview = isPreview;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    this.container.appendChild(this.renderer.domElement);

    // Physics Clock & Time
    this.clock = new THREE.Clock();
    this.animTime = 0;
    this.isRunning = false;

    // Movement & Jump State
    this.keyState = { forward: false, backward: false, left: false, right: false };
    this.playerPosition = new THREE.Vector3(0, 0, 0);
    this.playerRotation = 0;
    this.moveSpeed = 0.25;
    this.turnSpeed = 0.06;

    this.playerY = 0;
    this.playerVy = 0;
    this.isGrounded = true;

    // Trick Backflip Physics
    this.isFlipping = false;
    this.flipAngle = 0;

    // Scores
    this.ballsFetched = 0;
    this.hurdleJumps = 0;
    this.bonesCollected = 0;

    // Tennis Ball Physics
    this.tennisBall = null;
    this.ballPosition = new THREE.Vector3(0, 0, 0);
    this.ballVelocity = new THREE.Vector3(0, 0, 0);
    this.isBallActive = false;

    // Hurdles List
    this.hurdles = [];
    this.clearedHurdles = new Set();

    // 3D Groups
    this.heroGroup = new THREE.Group();
    this.environmentGroup = new THREE.Group();
    this.effectsGroup = new THREE.Group();

    this.scene.add(this.heroGroup);
    this.scene.add(this.environmentGroup);
    this.scene.add(this.effectsGroup);

    this.heroConfig = { category: 'animals', type: 'puppy', color: '#d4a373', accessory: 'crown' };

    this.initLighting();
    this.initCameraPosition();
    this.bindControls();
    this.resize();

    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    const width = this.container.clientWidth || 400;
    const height = this.container.clientHeight || 300;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  initLighting() {
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x223311, 1.0);
    this.scene.add(hemiLight);

    const sunLight = new THREE.DirectionalLight(0xffb703, 1.5);
    sunLight.position.set(30, 50, 20);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 1024;
    sunLight.shadow.mapSize.height = 1024;
    this.scene.add(sunLight);
  }

  initCameraPosition() {
    if (this.isPreview) {
      this.camera.position.set(0, 4, 12);
      this.camera.lookAt(0, 2, 0);
    } else {
      this.camera.position.set(0, 8, 22);
      this.camera.lookAt(0, 3, 0);
    }
  }

  bindControls() {
    if (this.isPreview) return;

    window.addEventListener('keydown', (e) => {
      if (e.key === 'w' || e.key === 'W' || e.key === 'ArrowUp') this.keyState.forward = true;
      if (e.key === 's' || e.key === 'S' || e.key === 'ArrowDown') this.keyState.backward = true;
      if (e.key === 'a' || e.key === 'A' || e.key === 'ArrowLeft') this.keyState.left = true;
      if (e.key === 'd' || e.key === 'D' || e.key === 'ArrowRight') this.keyState.right = true;
      if (e.key === ' ' || e.key === 'Spacebar') this.jump();
      if (e.key === 'b' || e.key === 'B') this.bark();
      if (e.key === 'f' || e.key === 'F') this.throwTennisBall();
      if (e.key === 't' || e.key === 'T') this.doTrick();
    });

    window.addEventListener('keyup', (e) => {
      if (e.key === 'w' || e.key === 'W' || e.key === 'ArrowUp') this.keyState.forward = false;
      if (e.key === 's' || e.key === 'S' || e.key === 'ArrowDown') this.keyState.backward = false;
      if (e.key === 'a' || e.key === 'A' || e.key === 'ArrowLeft') this.keyState.left = false;
      if (e.key === 'd' || e.key === 'D' || e.key === 'ArrowRight') this.keyState.right = false;
    });
  }

  setHeroConfig(config) {
    this.heroConfig = { ...this.heroConfig, ...config };
    this.buildHeroMesh();
  }

  startAnimationLoop() {
    if (this.isRunning) return;
    this.isRunning = true;
    const loop = () => {
      if (!this.isRunning) return;
      const delta = this.clock.getDelta();
      this.animTime += delta * 4;
      this.updateSimulatorPhysics();
      this.renderer.render(this.scene, this.camera);
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }

  stopAnimationLoop() {
    this.isRunning = false;
  }

  // -------------------------------------------------------------
  // SIMULATION ACTIONS: BARK, FETCH BALL, TRICKS, JUMP
  // -------------------------------------------------------------

  bark() {
    const type = this.heroConfig.type || 'puppy';
    if (type === 'puppy') soundManager.playDogBark();
    else if (type === 'cat') soundManager.playCatMeow();
    else if (type === 'lion') soundManager.playLionRoar();
    else if (type === 'elephant') soundManager.playElephantTrumpet();
    else soundManager.playPop();

    // Spawn 3D Sound Wave Ring Particles
    this.addSoundWaveRing();
  }

  jump() {
    if (this.isGrounded) {
      this.playerVy = 0.42;
      this.isGrounded = false;
      soundManager.playBounce();
    }
  }

  doTrick() {
    if (!this.isFlipping) {
      this.isFlipping = true;
      this.flipAngle = 0;
      this.playerVy = 0.48;
      this.isGrounded = false;
      soundManager.playVictory();
      this.addSparkleBurst(this.playerPosition.x, 3, this.playerPosition.z, 30);
    }
  }

  throwTennisBall() {
    soundManager.playBounce();
    if (!this.tennisBall) {
      const ballGeo = new THREE.SphereGeometry(0.5, 16, 16);
      const ballMat = new THREE.MeshStandardMaterial({ color: 0xccff00, roughness: 0.3 });
      this.tennisBall = new THREE.Mesh(ballGeo, ballMat);
      this.tennisBall.castShadow = true;
      this.scene.add(this.tennisBall);
    }

    // Launch ball forward from animal
    this.ballPosition.set(
      this.playerPosition.x + Math.sin(this.playerRotation) * 2,
      2.5,
      this.playerPosition.z + Math.cos(this.playerRotation) * 2
    );

    this.ballVelocity.set(
      Math.sin(this.playerRotation) * 0.7,
      0.45,
      Math.cos(this.playerRotation) * 0.7
    );

    this.tennisBall.position.copy(this.ballPosition);
    this.isBallActive = true;
  }

  addSoundWaveRing() {
    const ringGeo = new THREE.RingGeometry(0.5, 0.8, 32);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.9
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2;
    ring.position.set(this.playerPosition.x, 2.5, this.playerPosition.z);
    this.effectsGroup.add(ring);

    const expandLoop = () => {
      ring.scale.addScalar(0.2);
      ringMat.opacity -= 0.04;
      if (ringMat.opacity <= 0) {
        this.effectsGroup.remove(ring);
      } else {
        requestAnimationFrame(expandLoop);
      }
    };
    requestAnimationFrame(expandLoop);
  }

  addSparkleBurst(x, y, z, count = 20) {
    const colors = [0x00f0ff, 0xff4785, 0xffb703, 0x9d4edd];
    const geo = new THREE.SphereGeometry(0.2, 8, 8);

    for (let i = 0; i < count; i++) {
      const mat = new THREE.MeshBasicMaterial({ color: colors[i % colors.length] });
      const p = new THREE.Mesh(geo, mat);
      p.position.set(x, y, z);
      
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 0.3 + 0.1;
      p.userData = {
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed + 0.2,
        vz: (Math.random() - 0.5) * speed,
        life: 1.0
      };
      this.effectsGroup.add(p);

      const fadeLoop = () => {
        p.position.x += p.userData.vx;
        p.position.y += p.userData.vy;
        p.position.z += p.userData.vz;
        p.userData.vy -= 0.015;
        p.userData.life -= 0.03;

        if (p.userData.life <= 0) {
          this.effectsGroup.remove(p);
        } else {
          requestAnimationFrame(fadeLoop);
        }
      };
      requestAnimationFrame(fadeLoop);
    }
  }

  // -------------------------------------------------------------
  // 3D ANIMAL MESH BUILDER
  // -------------------------------------------------------------

  buildHeroMesh() {
    while (this.heroGroup.children.length > 0) {
      this.heroGroup.remove(this.heroGroup.children[0]);
    }

    const root = new THREE.Group();
    const colorHex = parseInt((this.heroConfig.color || '#d4a373').replace('#', '0x'));
    const material = new THREE.MeshStandardMaterial({ color: colorHex, roughness: 0.35 });

    // Body
    const body = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 1.4, 3.0, 16), material);
    body.rotation.x = Math.PI / 2;
    body.position.set(0, 2.0, 0);
    body.name = 'body';
    root.add(body);

    // Head
    const headPivot = new THREE.Group();
    headPivot.position.set(0, 3.4, 1.2);
    headPivot.name = 'headPivot';

    const head = new THREE.Mesh(new THREE.SphereGeometry(1.1, 16, 16), material);
    const snout = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.6, 1.0), material);
    snout.position.set(0, -0.2, 0.8);
    const nose = new THREE.Mesh(new THREE.SphereGeometry(0.2, 8, 8), new THREE.MeshBasicMaterial({ color: 0x10122e }));
    nose.position.set(0, 0.1, 1.3);

    headPivot.add(head);
    headPivot.add(snout);
    headPivot.add(nose);

    // Floppy Ears
    const earGeo = new THREE.BoxGeometry(0.4, 1.2, 0.3);
    const earL = new THREE.Mesh(earGeo, material);
    earL.position.set(1.1, 0.2, -0.2);
    earL.rotation.z = -0.3;
    const earR = new THREE.Mesh(earGeo, material);
    earR.position.set(-1.1, 0.2, -0.2);
    earR.rotation.z = 0.3;

    headPivot.add(earL);
    headPivot.add(earR);
    root.add(headPivot);

    // 4 Quadruped Legs
    const legGeo = new THREE.CylinderGeometry(0.32, 0.25, 1.6, 8);
    const legPositions = [
      { name: 'legFL', x: 0.9, y: 0.8, z: 1.0 },
      { name: 'legFR', x: -0.9, y: 0.8, z: 1.0 },
      { name: 'legBL', x: 0.9, y: 0.8, z: -1.0 },
      { name: 'legBR', x: -0.9, y: 0.8, z: -1.0 }
    ];

    legPositions.forEach(pos => {
      const legPivot = new THREE.Group();
      legPivot.position.set(pos.x, pos.y, pos.z);
      legPivot.name = pos.name;

      const leg = new THREE.Mesh(legGeo, material);
      leg.position.y = -0.8;
      legPivot.add(leg);
      root.add(legPivot);
    });

    // Wagging Tail
    const tailPivot = new THREE.Group();
    tailPivot.position.set(0, 2.2, -1.5);
    tailPivot.name = 'tail';
    const tail = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.08, 1.8, 8), material);
    tail.rotation.x = -Math.PI / 4;
    tail.position.z = -0.7;
    tailPivot.add(tail);
    root.add(tailPivot);

    // Crown / Accessory
    if (this.heroConfig.accessory === 'crown') {
      const crown = new THREE.Mesh(
        new THREE.CylinderGeometry(0.8, 0.5, 0.8, 6),
        new THREE.MeshStandardMaterial({ color: 0xffb703, metalness: 0.8 })
      );
      crown.position.set(0, 1.4, 0);
      headPivot.add(crown);
    }

    root.traverse(child => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    this.heroGroup.add(root);
    this.heroMeshGroup = root;
  }

  // -------------------------------------------------------------
  // SIMULATOR PHYSICS & GAME LOOP
  // -------------------------------------------------------------

  updateSimulatorPhysics() {
    const time = this.animTime;

    if (!this.isPreview && this.heroMeshGroup) {
      // WASD Directional Movement
      let isMoving = false;
      if (this.keyState.left) { this.playerRotation += this.turnSpeed; isMoving = true; }
      if (this.keyState.right) { this.playerRotation -= this.turnSpeed; isMoving = true; }

      const moveVec = new THREE.Vector3(0, 0, 0);
      if (this.keyState.forward) {
        moveVec.z = Math.cos(this.playerRotation) * this.moveSpeed;
        moveVec.x = Math.sin(this.playerRotation) * this.moveSpeed;
        isMoving = true;
      }
      if (this.keyState.backward) {
        moveVec.z = -Math.cos(this.playerRotation) * (this.moveSpeed * 0.6);
        moveVec.x = -Math.sin(this.playerRotation) * (this.moveSpeed * 0.6);
        isMoving = true;
      }

      this.playerPosition.add(moveVec);
      if (this.playerPosition.length() > 22) this.playerPosition.setLength(22);

      // Jump & Gravity
      if (!this.isGrounded) {
        this.playerY += this.playerVy;
        this.playerVy -= 0.02; // gravity
        if (this.playerY <= 0) {
          this.playerY = 0;
          this.playerVy = 0;
          this.isGrounded = true;
        }
      }

      // Backflip trick rotation
      if (this.isFlipping) {
        this.flipAngle += 0.35;
        this.heroMeshGroup.rotation.x = this.flipAngle;
        if (this.flipAngle >= Math.PI * 2) {
          this.flipAngle = 0;
          this.heroMeshGroup.rotation.x = 0;
          this.isFlipping = false;
        }
      }

      this.heroMeshGroup.position.set(this.playerPosition.x, this.playerY, this.playerPosition.z);
      this.heroMeshGroup.rotation.y = this.playerRotation;

      // 4-Legged Gait
      const legFL = this.heroMeshGroup.getObjectByName('legFL');
      const legFR = this.heroMeshGroup.getObjectByName('legFR');
      const legBL = this.heroMeshGroup.getObjectByName('legBL');
      const legBR = this.heroMeshGroup.getObjectByName('legBR');
      const tail = this.heroMeshGroup.getObjectByName('tail');

      if (isMoving) {
        const gait = Math.sin(time * 6) * 0.8;
        if (legFL) legFL.rotation.x = gait;
        if (legBR) legBR.rotation.x = gait;
        if (legFR) legFR.rotation.x = -gait;
        if (legBL) legBL.rotation.x = -gait;
      } else {
        if (legFL) legFL.rotation.x = 0;
        if (legFR) legFR.rotation.x = 0;
        if (legBL) legBL.rotation.x = 0;
        if (legBR) legBR.rotation.x = 0;
      }

      if (tail) tail.rotation.y = Math.sin(time * 6) * 0.7;

      // Bouncing Tennis Ball Physics
      if (this.isBallActive && this.tennisBall) {
        this.ballPosition.add(this.ballVelocity);
        this.ballVelocity.y -= 0.02; // gravity

        // Bounce ground collision
        if (this.ballPosition.y <= 0.5) {
          this.ballPosition.y = 0.5;
          this.ballVelocity.y = -this.ballVelocity.y * 0.65; // bounce damping
          this.ballVelocity.x *= 0.85;
          this.ballVelocity.z *= 0.85;
        }

        this.tennisBall.position.copy(this.ballPosition);

        // Fetch Ball Pickup Collision
        if (this.playerPosition.distanceTo(this.ballPosition) < 2.5) {
          this.isBallActive = false;
          this.scene.remove(this.tennisBall);
          this.tennisBall = null;
          this.ballsFetched++;
          soundManager.playSparkle();
          if (window.app && window.app.updateSimulatorHUD) {
            window.app.updateSimulatorHUD(this.ballsFetched, this.hurdleJumps);
          }
        }
      }

      // Check Agility Hurdle Clears
      this.hurdles.forEach((hurdle, idx) => {
        if (!this.clearedHurdles.has(idx)) {
          const dist = this.playerPosition.distanceTo(hurdle.position);
          if (dist < 2.0 && this.playerY > 1.2) {
            this.clearedHurdles.add(idx);
            this.hurdleJumps++;
            soundManager.playSparkle();
            if (window.app && window.app.updateSimulatorHUD) {
              window.app.updateSimulatorHUD(this.ballsFetched, this.hurdleJumps);
            }
          }
        }
      });

      // Camera Follow
      const camTarget = new THREE.Vector3(
        this.playerPosition.x - Math.sin(this.playerRotation) * 13,
        this.playerY + 7,
        this.playerPosition.z - Math.cos(this.playerRotation) * 13
      );
      this.camera.position.lerp(camTarget, 0.1);
      this.camera.lookAt(this.playerPosition.x, this.playerY + 2, this.playerPosition.z);
    }
  }

  // -------------------------------------------------------------
  // 3D PARK ENVIRONMENT (Grassy Park, Agility Hurdles, Trees, Fountain)
  // -------------------------------------------------------------

  build3DEnvironment() {
    while (this.environmentGroup.children.length > 0) {
      this.environmentGroup.remove(this.environmentGroup.children[0]);
    }
    this.hurdles = [];
    this.clearedHurdles.clear();

    // 1. Grassy Park Ground
    const groundGeo = new THREE.CylinderGeometry(24, 24, 1, 32);
    const groundMat = new THREE.MeshStandardMaterial({ color: 0x38b000, roughness: 0.7 });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.position.y = -0.5;
    ground.receiveShadow = true;
    this.environmentGroup.add(ground);

    // 2. Agility Hurdles (Wooden Hurdles)
    const hurdleMat = new THREE.MeshStandardMaterial({ color: 0xffb703 });
    for (let i = 0; i < 4; i++) {
      const hurdleGroup = new THREE.Group();
      const postL = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 2.4, 8), hurdleMat);
      postL.position.set(-1.5, 1.2, 0);
      const postR = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 2.4, 8), hurdleMat);
      postR.position.set(1.5, 1.2, 0);

      const bar = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 3.2, 8), hurdleMat);
      bar.rotation.z = Math.PI / 2;
      bar.position.set(0, 1.8, 0);

      hurdleGroup.add(postL);
      hurdleGroup.add(postR);
      hurdleGroup.add(bar);

      const angle = (i / 4) * Math.PI * 2;
      hurdleGroup.position.set(Math.cos(angle) * 10, 0, Math.sin(angle) * 10);
      hurdleGroup.rotation.y = -angle;

      this.environmentGroup.add(hurdleGroup);
      this.hurdles.push(hurdleGroup);
    }

    // 3. Central Park Fountain
    const fountainMat = new THREE.MeshStandardMaterial({ color: 0x9d4edd, metalness: 0.3 });
    const fountainBase = new THREE.Mesh(new THREE.CylinderGeometry(4, 4, 1.2, 16), fountainMat);
    fountainBase.position.set(0, 0.6, 0);
    this.environmentGroup.add(fountainBase);

    // 4. Park Trees
    for (let i = 0; i < 8; i++) {
      const treeGroup = new THREE.Group();
      const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.6, 3, 8), new THREE.MeshStandardMaterial({ color: 0x4a2c11 }));
      trunk.position.y = 1.5;
      const foliage = new THREE.Mesh(new THREE.ConeGeometry(2.2, 4.5, 6), new THREE.MeshStandardMaterial({ color: 0x007f5f }));
      foliage.position.y = 4.8;
      treeGroup.add(trunk);
      treeGroup.add(foliage);

      const angle = (i / 8) * Math.PI * 2 + 0.3;
      treeGroup.position.set(Math.cos(angle) * 18, 0, Math.sin(angle) * 18);
      this.environmentGroup.add(treeGroup);
    }
  }
}
