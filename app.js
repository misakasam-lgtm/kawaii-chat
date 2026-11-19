/**
 * 萌系股票动画模拟器 - Kawaii Stock Simulator (app.js)
 * 特色：贝塞尔曲线灵动绘图、弹跳粒子特效、数字物理跳动、Web Audio萌系合成音效、点位全自由配置
 * 严格遵循要求：无人物角色，纯可爱萌物/星芒/几何
 */

// ==========================================
// 1. 萌宠头像 SVG 预设库 (严格无人物)
// ==========================================
const PRESET_AVATARS = [
  {
    id: 'cat',
    name: '软萌猫咪',
    svg: `<svg viewBox="0 0 64 64" class="preset-avatar-svg">
      <circle cx="32" cy="32" r="30" fill="#ffe4ec"/>
      <path d="M14 26 L22 10 L30 24 Z" fill="#ff8da1"/>
      <path d="M50 26 L42 10 L34 24 Z" fill="#ff8da1"/>
      <path d="M17 24 L22 14 L27 23 Z" fill="#fff0f5"/>
      <path d="M47 24 L42 14 L37 23 Z" fill="#fff0f5"/>
      <ellipse cx="32" cy="38" rx="22" ry="18" fill="#ffffff"/>
      <circle cx="24" cy="35" r="3.5" fill="#3a3238"/>
      <circle cx="40" cy="35" r="3.5" fill="#3a3238"/>
      <circle cx="25" cy="33.5" r="1.2" fill="#ffffff"/>
      <circle cx="41" cy="33.5" r="1.2" fill="#ffffff"/>
      <ellipse cx="32" cy="40" rx="3" ry="2" fill="#ff708f"/>
      <path d="M29 42 Q32 45 35 42" stroke="#3a3238" stroke-width="1.8" fill="none" stroke-linecap="round"/>
      <ellipse cx="18" cy="38" rx="3.5" ry="2" fill="#ffb4c6" opacity="0.8"/>
      <ellipse cx="46" cy="38" rx="3.5" ry="2" fill="#ffb4c6" opacity="0.8"/>
    </svg>`
  },
  {
    id: 'bunny',
    name: '甜甜兔兔',
    svg: `<svg viewBox="0 0 64 64" class="preset-avatar-svg">
      <circle cx="32" cy="32" r="30" fill="#fdf2f8"/>
      <ellipse cx="23" cy="16" rx="6" ry="14" fill="#ffffff" stroke="#fbcfe8" stroke-width="1.5"/>
      <ellipse cx="41" cy="16" rx="6" ry="14" fill="#ffffff" stroke="#fbcfe8" stroke-width="1.5"/>
      <ellipse cx="23" cy="16" rx="3.5" ry="9" fill="#f472b6"/>
      <ellipse cx="41" cy="16" rx="3.5" ry="9" fill="#f472b6"/>
      <circle cx="32" cy="38" r="20" fill="#ffffff"/>
      <circle cx="24" cy="36" r="3" fill="#374151"/>
      <circle cx="40" cy="36" r="3" fill="#374151"/>
      <circle cx="25" cy="35" r="1" fill="#ffffff"/>
      <circle cx="41" cy="35" r="1" fill="#ffffff"/>
      <polygon points="32,41 29,39 35,39" fill="#fb7185"/>
      <path d="M30 42 Q32 45 34 42" stroke="#374151" stroke-width="1.5" fill="none"/>
      <circle cx="19" cy="40" r="3" fill="#fbcfe8"/>
      <circle cx="45" cy="40" r="3" fill="#fbcfe8"/>
    </svg>`
  },
  {
    id: 'shiba',
    name: '欢喜小柴',
    svg: `<svg viewBox="0 0 64 64" class="preset-avatar-svg">
      <circle cx="32" cy="32" r="30" fill="#fef3c7"/>
      <polygon points="12,24 22,8 28,24" fill="#d97706"/>
      <polygon points="52,24 42,8 36,24" fill="#d97706"/>
      <circle cx="32" cy="36" r="21" fill="#f59e0b"/>
      <ellipse cx="32" cy="42" rx="16" ry="12" fill="#ffffff"/>
      <circle cx="23" cy="33" r="3" fill="#1f2937"/>
      <circle cx="41" cy="33" r="3" fill="#1f2937"/>
      <ellipse cx="23" cy="27" rx="3" ry="1.5" fill="#ffffff"/>
      <ellipse cx="41" cy="27" rx="3" ry="1.5" fill="#ffffff"/>
      <ellipse cx="32" cy="39" rx="3.5" ry="2.5" fill="#1f2937"/>
      <path d="M29 42 Q32 45 35 42" stroke="#1f2937" stroke-width="1.8" fill="none"/>
      <circle cx="17" cy="39" r="3" fill="#fbbf24" opacity="0.6"/>
      <circle cx="47" cy="39" r="3" fill="#fbbf24" opacity="0.6"/>
    </svg>`
  },
  {
    id: 'panda',
    name: '憨憨熊猫',
    svg: `<svg viewBox="0 0 64 64" class="preset-avatar-svg">
      <circle cx="32" cy="32" r="30" fill="#e0f2fe"/>
      <circle cx="16" cy="18" r="8" fill="#1f2937"/>
      <circle cx="48" cy="18" r="8" fill="#1f2937"/>
      <circle cx="32" cy="36" r="21" fill="#ffffff"/>
      <ellipse cx="23" cy="34" rx="5" ry="6" fill="#1f2937" transform="rotate(-15 23 34)"/>
      <ellipse cx="41" cy="34" rx="5" ry="6" fill="#1f2937" transform="rotate(15 41 34)"/>
      <circle cx="24" cy="33" r="1.8" fill="#ffffff"/>
      <circle cx="40" cy="33" r="1.8" fill="#ffffff"/>
      <ellipse cx="32" cy="41" rx="3" ry="2" fill="#1f2937"/>
      <path d="M30 43 Q32 45 34 43" stroke="#1f2937" stroke-width="1.5" fill="none"/>
      <circle cx="17" cy="42" r="3" fill="#fca5a5" opacity="0.7"/>
      <circle cx="47" cy="42" r="3" fill="#fca5a5" opacity="0.7"/>
    </svg>`
  },
  {
    id: 'hamster',
    name: '圆滚仓鼠',
    svg: `<svg viewBox="0 0 64 64" class="preset-avatar-svg">
      <circle cx="32" cy="32" r="30" fill="#fae8ff"/>
      <circle cx="16" cy="20" r="7" fill="#fcd34d"/>
      <circle cx="48" cy="20" r="7" fill="#fcd34d"/>
      <circle cx="16" cy="20" r="4" fill="#f472b6"/>
      <circle cx="48" cy="20" r="4" fill="#f472b6"/>
      <circle cx="32" cy="37" r="20" fill="#fbbf24"/>
      <ellipse cx="32" cy="42" rx="14" ry="11" fill="#ffffff"/>
      <circle cx="23" cy="34" r="3" fill="#1f2937"/>
      <circle cx="41" cy="34" r="3" fill="#1f2937"/>
      <circle cx="24" cy="33" r="1" fill="#ffffff"/>
      <circle cx="42" cy="33" r="1" fill="#ffffff"/>
      <polygon points="32,39 30,37 34,37" fill="#f472b6"/>
      <circle cx="15" cy="40" r="4" fill="#fda4af"/>
      <circle cx="49" cy="40" r="4" fill="#fda4af"/>
    </svg>`
  },
  {
    id: 'chick',
    name: '萌萌小鸡',
    svg: `<svg viewBox="0 0 64 64" class="preset-avatar-svg">
      <circle cx="32" cy="32" r="30" fill="#fef9c3"/>
      <path d="M32 10 Q35 6 36 12" stroke="#f59e0b" stroke-width="2.5" fill="none"/>
      <circle cx="32" cy="35" r="20" fill="#fef08a"/>
      <circle cx="23" cy="33" r="3" fill="#1f2937"/>
      <circle cx="41" cy="33" r="3" fill="#1f2937"/>
      <polygon points="32,40 27,36 37,36" fill="#f97316"/>
      <ellipse cx="16" cy="37" rx="3.5" ry="2.5" fill="#fca5a5"/>
      <ellipse cx="48" cy="37" rx="3.5" ry="2.5" fill="#fca5a5"/>
      <path d="M12 37 Q10 39 12 41" stroke="#eab308" stroke-width="2" fill="none"/>
      <path d="M52 37 Q54 39 52 41" stroke="#eab308" stroke-width="2" fill="none"/>
    </svg>`
  },
  {
    id: 'piggy',
    name: '福气招财猪',
    svg: `<svg viewBox="0 0 64 64" class="preset-avatar-svg">
      <circle cx="32" cy="32" r="30" fill="#ffe4e6"/>
      <polygon points="14,24 20,10 26,22" fill="#fb7185"/>
      <polygon points="50,24 44,10 38,22" fill="#fb7185"/>
      <circle cx="32" cy="36" r="21" fill="#fda4af"/>
      <circle cx="23" cy="31" r="3" fill="#1f2937"/>
      <circle cx="41" cy="31" r="3" fill="#1f2937"/>
      <ellipse cx="32" cy="41" rx="8" ry="5.5" fill="#f43f5e"/>
      <circle cx="29" cy="41" r="1.8" fill="#ffffff"/>
      <circle cx="35" cy="41" r="1.8" fill="#ffffff"/>
      <circle cx="16" cy="38" r="3" fill="#ffccd5"/>
      <circle cx="48" cy="38" r="3" fill="#ffccd5"/>
    </svg>`
  },
  {
    id: 'bear',
    name: '治愈小熊',
    svg: `<svg viewBox="0 0 64 64" class="preset-avatar-svg">
      <circle cx="32" cy="32" r="30" fill="#f5ebe0"/>
      <circle cx="16" cy="18" r="8" fill="#d5bdaf"/>
      <circle cx="48" cy="18" r="8" fill="#d5bdaf"/>
      <circle cx="16" cy="18" r="4.5" fill="#e3d5ca"/>
      <circle cx="48" cy="18" r="4.5" fill="#e3d5ca"/>
      <circle cx="32" cy="37" r="20" fill="#d5bdaf"/>
      <ellipse cx="32" cy="41" rx="9" ry="7" fill="#f5ebe0"/>
      <circle cx="24" cy="33" r="2.8" fill="#4a3e3d"/>
      <circle cx="40" cy="33" r="2.8" fill="#4a3e3d"/>
      <ellipse cx="32" cy="39" rx="3" ry="2" fill="#4a3e3d"/>
      <path d="M30 42 Q32 44 34 42" stroke="#4a3e3d" stroke-width="1.4" fill="none"/>
      <circle cx="17" cy="39" r="2.8" fill="#e7c6b9"/>
      <circle cx="47" cy="39" r="2.8" fill="#e7c6b9"/>
    </svg>`
  }
];

// ==========================================
// 2. 预设走势剧本库
// ==========================================
const PRESETS = {
  bull: {
    initial: 10000,
    points: [
      { label: '09:30 开盘', delta: 0 },
      { label: '10:00 试盘', delta: 500 },
      { label: '11:00 主力进场', delta: 1200 },
      { label: '13:30 突破前高', delta: 800 },
      { label: '14:30 抢筹涨停', delta: 1800 },
      { label: '15:00 封死收盘', delta: 1200 }
    ]
  },
  coaster: {
    initial: 10000,
    points: [
      { label: '09:30 开盘', delta: 0 },
      { label: '10:15 冲高猛进', delta: 1600 },
      { label: '11:30 跳水惊魂', delta: -2200 },
      { label: '13:45 探底回升', delta: 900 },
      { label: '14:30 暴力拉升', delta: 2400 },
      { label: '15:00 翘尾收官', delta: 700 }
    ]
  },
  rebound: {
    initial: 10000,
    points: [
      { label: '09:30 低开震荡', delta: 0 },
      { label: '10:00 恐慌杀跌', delta: -1200 },
      { label: '11:00 绝望深渊', delta: -1500 },
      { label: '13:00 救市春风', delta: 1800 },
      { label: '14:00 强劲V反', delta: 2100 },
      { label: '15:00 逆风翻盘', delta: 1600 }
    ]
  },
  steady: {
    initial: 10000,
    points: [
      { label: '09:30 平稳开局', delta: 0 },
      { label: '10:30 稳扎稳打', delta: 300 },
      { label: '11:30 积小胜', delta: 450 },
      { label: '13:30 步步为营', delta: 600 },
      { label: '14:30 持续增厚', delta: 500 },
      { label: '15:00 喜迎收米', delta: 650 }
    ]
  },
  random: {
    initial: 10000,
    generate() {
      const labels = ['09:30 开盘', '10:15 早盘', '11:15 午前', '13:30 午后', '14:20 决战', '15:00 收盘'];
      return labels.map((lbl, idx) => {
        if (idx === 0) return { label: lbl, delta: 0 };
        const randDelta = Math.round((Math.random() * 2400 - 900) / 50) * 50;
        return { label: lbl, delta: randDelta };
      });
    }
  }
};

// ==========================================
// 3. 萌系 Web Audio 合成器 (8-Bit / Kawaii Bell)
// ==========================================
class KawaiiSoundEngine {
  constructor() {
    this.audioCtx = null;
    this.enabled = true;
  }

  init() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioCtx = new AudioContext();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  playPop(freq = 520, duration = 0.08) {
    if (!this.enabled) return;
    this.init();
    if (!this.audioCtx) return;

    try {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = 'sine';
      
      const now = this.audioCtx.currentTime;
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.6, now + duration);

      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now);
      osc.stop(now + duration);
    } catch (e) {
      // AudioContext could fail on restricted browsers
    }
  }

  playGainChime() {
    if (!this.enabled) return;
    this.init();
    if (!this.audioCtx) return;

    try {
      const notes = [587.33, 739.99, 880, 1174.66]; // D5, F#5, A5, D6 欢快大三和弦琶音
      const now = this.audioCtx.currentTime;

      notes.forEach((freq, idx) => {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.type = 'triangle';

        const startTime = now + idx * 0.06;
        const noteDuration = 0.22;

        osc.frequency.setValueAtTime(freq, startTime);
        gain.gain.setValueAtTime(0.12, startTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + noteDuration);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);

        osc.start(startTime);
        osc.stop(startTime + noteDuration);
      });
    } catch (e) {}
  }

  playDropChime() {
    if (!this.enabled) return;
    this.init();
    if (!this.audioCtx) return;

    try {
      const notes = [659.25, 587.33, 493.88]; // E5, D5, B4 萌感水滴滑音
      const now = this.audioCtx.currentTime;

      notes.forEach((freq, idx) => {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.type = 'sine';

        const startTime = now + idx * 0.07;
        const noteDuration = 0.25;

        osc.frequency.setValueAtTime(freq, startTime);
        osc.frequency.exponentialRampToValueAtTime(freq * 0.85, startTime + noteDuration);

        gain.gain.setValueAtTime(0.12, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + noteDuration);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);

        osc.start(startTime);
        osc.stop(startTime + noteDuration);
      });
    } catch (e) {}
  }
}

// ==========================================
// 4. 应用程序核心主控制器
// ==========================================
class StockSimulatorApp {
  constructor() {
    // 基础数据状态
    this.initialCapital = 10000;
    this.points = [];
    this.calculatedPoints = []; // 包含当前本金、累计盈亏等
    
    // 动画播放状态
    this.currentIndex = 0;
    this.isPlaying = false;
    this.isPaused = false;
    this.playbackTimer = null;
    this.stepDuration = 1200; // ms per point transition
    this.animFrameId = null;
    this.countdownTimer = null;

    // 音效引擎
    this.sound = new KawaiiSoundEngine();

    // DOM 元素缓存
    this.cacheElements();

    // 默认应用绿幕背景（便于色度抠图录屏）与无阴影
    this.applyChromaBackground('green');
    if (this.noShadowToggle && this.noShadowToggle.checked) {
      document.body.classList.add('no-shadow');
    }

    // 初始化预设走势
    this.loadPreset('bull');

    // 绑定各类交互事件
    this.bindEvents();

    // 初始化时钟和渲染
    this.initClock();
    this.renderAvatarModal();
  }

  cacheElements() {
    // 手机屏幕内元素
    this.screenCurrentPrice = document.getElementById('screenCurrentPrice');
    this.screenChangeTag = document.getElementById('screenChangeTag');
    this.moodIcon = document.getElementById('moodIcon');
    this.moodText = document.getElementById('moodText');
    this.trendMoodBadge = document.getElementById('trendMoodBadge');
    this.accountBalance = document.getElementById('accountBalance');
    this.accountPnl = document.getElementById('accountPnl');
    this.accountPnlRate = document.getElementById('accountPnlRate');
    this.balanceWrap = document.getElementById('balanceWrap');
    this.pnlWrap = document.getElementById('pnlWrap');
    this.avatarContainer = document.getElementById('avatarContainer');
    this.avatarImage = document.getElementById('avatarImage');
    this.avatarSvgWrap = document.getElementById('avatarSvgWrap');
    this.avatarRing = document.getElementById('avatarRing');
    this.chartSvg = document.getElementById('stockChartSvg');
    this.clipRect = document.getElementById('clipRect');
    this.chartLinePath = document.getElementById('chartLinePath');
    this.chartAreaPath = document.getElementById('chartAreaPath');
    this.chartPointsGroup = document.getElementById('chartPointsGroup');
    this.chartCursor = document.getElementById('chartCursor');
    this.cursorHalo = document.getElementById('cursorHalo');
    this.cursorDot = document.getElementById('cursorDot');
    this.cursorStar = document.getElementById('cursorStar');
    this.chartTimeline = document.getElementById('chartTimeline');
    this.particlesLayer = document.getElementById('particlesLayer');
    this.statusClock = document.getElementById('statusClock');
    this.btnBuy = document.getElementById('btnBuy');
    this.btnSell = document.getElementById('btnSell');

    // 底部控制面板元素
    this.initialCapitalInput = document.getElementById('initialCapitalInput');
    this.calcFinalCapital = document.getElementById('calcFinalCapital');
    this.calcFinalDiff = document.getElementById('calcFinalDiff');
    this.animSpeedSelect = document.getElementById('animSpeedSelect');
    this.pointsCountTag = document.getElementById('pointsCountTag');
    this.pointsTableBody = document.getElementById('pointsTableBody');
    this.addPointBtn = document.getElementById('addPointBtn');
    this.btnPlayAnimation = document.getElementById('btnPlayAnimation');
    this.btnPauseAnimation = document.getElementById('btnPauseAnimation');
    this.btnStepAnimation = document.getElementById('btnStepAnimation');
    this.resetAnimBtn = document.getElementById('resetAnimBtn');
    this.toggleAudioBtn = document.getElementById('toggleAudioBtn');
    this.audioIcon = document.getElementById('audioIcon');
    this.audioText = document.getElementById('audioText');
    this.statusPulseDot = document.getElementById('statusPulseDot');
    this.playStatusText = document.getElementById('playStatusText');
    this.playBtnIcon = document.getElementById('playBtnIcon');
    this.playBtnText = document.getElementById('playBtnText');

    // 录屏抠图与倒计时控件元素
    this.countdownOverlay = document.getElementById('countdownOverlay');
    this.countdownNum = document.getElementById('countdownNum');
    this.countdownDurationSelect = document.getElementById('countdownDurationSelect');
    this.noShadowToggle = document.getElementById('noShadowToggle');
    this.focusModeBtn = document.getElementById('focusModeBtn');
    this.exitFocusBtn = document.getElementById('exitFocusBtn');
    this.chromaOptions = document.getElementById('chromaOptions');

    // 头像选择弹窗元素
    this.avatarModal = document.getElementById('avatarModal');
    this.closeAvatarModalBtn = document.getElementById('closeAvatarModalBtn');
    this.presetAvatarGrid = document.getElementById('presetAvatarGrid');
    this.btnTriggerUpload = document.getElementById('btnTriggerUpload');
    this.avatarFileInput = document.getElementById('avatarFileInput');
  }

  bindEvents() {
    // 1. 初始本金变更
    this.initialCapitalInput.addEventListener('input', (e) => {
      const val = parseFloat(e.target.value);
      this.initialCapital = isNaN(val) || val <= 0 ? 1000 : val;
      this.recalculateAll();
      this.renderPointsTable();
      this.renderInitialScreenState();
    });

    // 2. 播放速度改变
    this.animSpeedSelect.addEventListener('change', (e) => {
      this.stepDuration = parseInt(e.target.value, 10);
    });

    // 3. 添加新点位
    this.addPointBtn.addEventListener('click', () => {
      this.addNewPoint();
      this.sound.playPop(620);
    });

    // 4. 预设走势剧本点击
    document.querySelectorAll('.preset-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        document.querySelectorAll('.preset-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        const presetKey = chip.getAttribute('data-preset');
        this.loadPreset(presetKey);
        this.sound.playPop(700);
      });
    });

    // 5. 播放控制按钮
    this.btnPlayAnimation.addEventListener('click', () => {
      if (this.isPlaying && !this.isPaused) {
        // 重播
        this.startPlay(true);
      } else if (this.isPaused) {
        this.resumePlay();
      } else {
        this.startPlay(true);
      }
    });

    this.btnPauseAnimation.addEventListener('click', () => {
      this.togglePause();
    });

    this.btnStepAnimation.addEventListener('click', () => {
      this.stepForward();
      this.sound.playPop(550);
    });

    this.resetAnimBtn.addEventListener('click', () => {
      this.resetToStart();
      this.sound.playPop(480);
    });

    // 6. 萌音开关联动
    this.toggleAudioBtn.addEventListener('click', () => {
      this.sound.enabled = !this.sound.enabled;
      if (this.sound.enabled) {
        this.sound.init();
        this.sound.playGainChime();
        this.audioIcon.textContent = '🔔';
        this.audioText.textContent = '萌音开';
      } else {
        this.audioIcon.textContent = '🔕';
        this.audioText.textContent = '萌音关';
      }
    });

    // 7. 买入/卖出 按钮互动特效
    this.btnBuy.addEventListener('click', () => {
      this.sound.playGainChime();
      this.triggerButtonJelly(this.btnBuy);
      this.spawnParticle(100, 100, '#ff477e', '🍀 加仓买入!');
    });

    this.btnSell.addEventListener('click', () => {
      this.sound.playDropChime();
      this.triggerButtonJelly(this.btnSell);
      this.spawnParticle(240, 100, '#3b82f6', '💎 获利卖出!');
    });

    // 8. 头像更换模态框事件
    this.avatarContainer.addEventListener('click', () => {
      this.openAvatarModal();
      this.sound.playPop(600);
    });

    this.closeAvatarModalBtn.addEventListener('click', () => {
      this.closeAvatarModal();
    });

    this.avatarModal.addEventListener('click', (e) => {
      if (e.target === this.avatarModal) this.closeAvatarModal();
    });

    this.btnTriggerUpload.addEventListener('click', () => {
      this.avatarFileInput.click();
    });

    this.avatarFileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          this.setCustomAvatarImage(event.target.result);
          this.closeAvatarModal();
          this.sound.playGainChime();
        };
        reader.readAsDataURL(file);
      }
    });

    // 9. 录屏色度抠图背景切换
    if (this.chromaOptions) {
      this.chromaOptions.querySelectorAll('.chroma-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          this.chromaOptions.querySelectorAll('.chroma-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          const color = btn.getAttribute('data-color');
          this.applyChromaBackground(color);
          this.sound.playPop(520);
        });
      });
    }

    // 10. 去除阴影开关
    if (this.noShadowToggle) {
      this.noShadowToggle.addEventListener('change', (e) => {
        if (e.target.checked) {
          document.body.classList.add('no-shadow');
        } else {
          document.body.classList.remove('no-shadow');
        }
      });
    }

    // 11. 沉浸录屏视角切换与退出
    if (this.focusModeBtn) {
      this.focusModeBtn.addEventListener('click', () => {
        document.body.classList.add('focus-mode');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        this.sound.playPop(600);
      });
    }

    if (this.exitFocusBtn) {
      this.exitFocusBtn.addEventListener('click', () => {
        document.body.classList.remove('focus-mode');
        this.sound.playPop(520);
      });
    }

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && document.body.classList.contains('focus-mode')) {
        document.body.classList.remove('focus-mode');
        this.sound.playPop(520);
      }
    });
  }

  // 应用色度抠图纯色背景
  applyChromaBackground(color) {
    document.body.classList.remove('chroma-green', 'chroma-blue', 'chroma-magenta', 'chroma-black', 'chroma-white', 'chroma-active');
    if (color === 'cute') {
      // 原版梦幻萌系渐变
      return;
    }
    document.body.classList.add(`chroma-${color}`, 'chroma-active');
  }

  // 时钟更新
  initClock() {
    const updateTime = () => {
      const now = new Date();
      const hrs = String(now.getHours()).padStart(2, '0');
      const mins = String(now.getMinutes()).padStart(2, '0');
      if (this.statusClock) this.statusClock.textContent = `${hrs}:${mins}`;
    };
    updateTime();
    setInterval(updateTime, 30000);
  }

  // 载入预设剧本
  loadPreset(key) {
    this.resetPlaybackState();
    const config = PRESETS[key];
    if (!config) return;

    if (config.generate) {
      this.points = config.generate();
    } else {
      this.points = JSON.parse(JSON.stringify(config.points));
      if (config.initial) {
        this.initialCapital = config.initial;
        this.initialCapitalInput.value = this.initialCapital;
      }
    }

    this.recalculateAll();
    this.renderPointsTable();
    this.renderInitialScreenState();
  }

  // 重新计算每一个点的累计盈亏和本金
  recalculateAll() {
    let current = this.initialCapital;
    this.calculatedPoints = [];

    this.points.forEach((pt, idx) => {
      const delta = parseFloat(pt.delta) || 0;
      if (idx === 0) {
        // 第0个点作为基准开盘点
        current = this.initialCapital;
      } else {
        current += delta;
      }
      const cumulativePnl = current - this.initialCapital;
      const rate = this.initialCapital > 0 ? (cumulativePnl / this.initialCapital) * 100 : 0;

      this.calculatedPoints.push({
        label: pt.label || `节点 ${idx + 1}`,
        delta: delta,
        currentCapital: current,
        cumulativePnl: cumulativePnl,
        rate: rate
      });
    });

    // 更新底部自动计算卡片
    const lastPoint = this.calculatedPoints[this.calculatedPoints.length - 1];
    if (lastPoint) {
      this.calcFinalCapital.textContent = this.formatMoney(lastPoint.currentCapital);
      const isUp = lastPoint.cumulativePnl >= 0;
      const sign = isUp ? '+' : '';
      this.calcFinalDiff.textContent = `${sign}¥${this.formatMoney(lastPoint.cumulativePnl)} (${sign}${lastPoint.rate.toFixed(1)}%)`;
      this.calcFinalDiff.className = `calc-diff ${isUp ? 'up' : 'down'}`;
    }

    this.pointsCountTag.textContent = `共 ${this.calculatedPoints.length} 个节点`;
  }

  // 渲染走势点位表格
  renderPointsTable() {
    this.pointsTableBody.innerHTML = '';

    this.calculatedPoints.forEach((pt, idx) => {
      const tr = document.createElement('tr');
      tr.id = `pointRow-${idx}`;
      if (idx === this.currentIndex) {
        tr.classList.add('active-playback-row');
      }

      const isUp = pt.cumulativePnl >= 0;
      const pnlSign = pt.cumulativePnl >= 0 ? '+' : '';
      const deltaSign = pt.delta > 0 ? '+' : '';

      tr.innerHTML = `
        <td><span class="point-index-badge">${idx + 1}</span></td>
        <td>
          <input type="text" class="table-input point-label-input" value="${pt.label}" data-idx="${idx}">
        </td>
        <td>
          ${idx === 0 ? '<span style="color:#b0a3b5; font-size:12px;">基准开盘 (0)</span>' : `
            <input type="number" class="table-input point-delta-input" value="${pt.delta}" step="100" data-idx="${idx}">
          `}
        </td>
        <td style="font-weight:700; color:#2b1f2e;">
          ¥${this.formatMoney(pt.currentCapital)}
        </td>
        <td>
          <span style="font-weight:700; color: ${isUp ? 'var(--profit-up)' : 'var(--profit-down)'}">
            ${pnlSign}¥${this.formatMoney(pt.cumulativePnl)} (${pnlSign}${pt.rate.toFixed(1)}%)
          </span>
        </td>
        <td>
          ${idx === 0 ? '' : `<button type="button" class="row-action-btn delete-point-btn" data-idx="${idx}" title="删除此节点">🗑️</button>`}
        </td>
      `;

      this.pointsTableBody.appendChild(tr);
    });

    // 绑定表格内行输入事件
    this.pointsTableBody.querySelectorAll('.point-label-input').forEach(input => {
      input.addEventListener('change', (e) => {
        const idx = parseInt(e.target.dataset.idx, 10);
        this.points[idx].label = e.target.value.trim() || `节点 ${idx + 1}`;
        this.recalculateAll();
        this.renderTimelineLabels();
      });
    });

    this.pointsTableBody.querySelectorAll('.point-delta-input').forEach(input => {
      input.addEventListener('input', (e) => {
        const idx = parseInt(e.target.dataset.idx, 10);
        const val = parseFloat(e.target.value) || 0;
        this.points[idx].delta = val;
        this.recalculateAll();
        this.updateTableCalculatedCells();
        if (!this.isPlaying) {
          this.renderChartProgress(this.currentIndex);
        }
      });
    });

    this.pointsTableBody.querySelectorAll('.delete-point-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(e.target.dataset.idx, 10);
        this.deletePoint(idx);
        this.sound.playPop(420);
      });
    });

    this.renderTimelineLabels();
  }

  // 快速更新表格中计算列，避免全量重新创建输入框失焦
  updateTableCalculatedCells() {
    this.calculatedPoints.forEach((pt, idx) => {
      const tr = document.getElementById(`pointRow-${idx}`);
      if (!tr) return;
      const tdCap = tr.children[3];
      const tdPnl = tr.children[4];
      const isUp = pt.cumulativePnl >= 0;
      const pnlSign = pt.cumulativePnl >= 0 ? '+' : '';

      if (tdCap) tdCap.innerHTML = `¥${this.formatMoney(pt.currentCapital)}`;
      if (tdPnl) {
        tdPnl.innerHTML = `
          <span style="font-weight:700; color: ${isUp ? 'var(--profit-up)' : 'var(--profit-down)'}">
            ${pnlSign}¥${this.formatMoney(pt.cumulativePnl)} (${pnlSign}${pt.rate.toFixed(1)}%)
          </span>
        `;
      }
    });

    // 同步底部预期总额
    const lastPoint = this.calculatedPoints[this.calculatedPoints.length - 1];
    if (lastPoint) {
      this.calcFinalCapital.textContent = this.formatMoney(lastPoint.currentCapital);
      const isUp = lastPoint.cumulativePnl >= 0;
      const sign = isUp ? '+' : '';
      this.calcFinalDiff.textContent = `${sign}¥${this.formatMoney(lastPoint.cumulativePnl)} (${sign}${lastPoint.rate.toFixed(1)}%)`;
      this.calcFinalDiff.className = `calc-diff ${isUp ? 'up' : 'down'}`;
    }
  }

  addNewPoint() {
    const idx = this.points.length;
    const defaultLabels = ['10:00 加速', '11:15 蓄势', '13:30 突破', '14:15 决胜', '14:45 冲刺', '15:00 收官'];
    const label = defaultLabels[idx % defaultLabels.length] || `节点 ${idx + 1}`;
    const randDelta = (Math.round((Math.random() * 2000 - 600) / 100) * 100) || 500;

    this.points.push({ label, delta: randDelta });
    this.recalculateAll();
    this.renderPointsTable();
    if (!this.isPlaying) {
      this.renderChartProgress(this.currentIndex);
    }
  }

  deletePoint(idx) {
    if (idx <= 0 || this.points.length <= 2) return;
    this.points.splice(idx, 1);
    this.recalculateAll();
    this.renderPointsTable();
    if (this.currentIndex >= this.points.length) {
      this.currentIndex = this.points.length - 1;
    }
    this.renderChartProgress(this.currentIndex);
  }

  // 渲染初始屏幕数据状态
  renderInitialScreenState() {
    this.currentIndex = 0;
    this.updateScreenData(0, false);
    this.renderChartProgress(0);
    this.highlightActiveRow(0);
  }

  // 渲染折线图底部时间轴刻度
  renderTimelineLabels() {
    this.chartTimeline.innerHTML = '';
    const total = this.calculatedPoints.length;
    if (total === 0) return;

    // 显示前中后最多4-5个标签
    const indices = [];
    if (total <= 4) {
      for (let i = 0; i < total; i++) indices.push(i);
    } else {
      indices.push(0);
      const mid = Math.floor(total / 2);
      indices.push(mid);
      indices.push(total - 1);
    }

    indices.forEach(i => {
      const span = document.createElement('span');
      span.textContent = this.calculatedPoints[i].label.split(' ')[0];
      this.chartTimeline.appendChild(span);
    });
  }

  // 计算图表坐标体系
  getCoordinates() {
    const total = this.calculatedPoints.length;
    if (total === 0) return [];

    const width = 340;
    const height = 190;
    const padX = 22;
    const padTop = 26;
    const padBottom = 26;

    // 找到所有点中的资本最小值和最大值
    let minVal = Infinity;
    let maxVal = -Infinity;

    this.calculatedPoints.forEach(p => {
      if (p.currentCapital < minVal) minVal = p.currentCapital;
      if (p.currentCapital > maxVal) maxVal = p.currentCapital;
    });

    // 留有上下余量，防止贴边
    const range = Math.max(maxVal - minVal, 500);
    const yMin = minVal - range * 0.15;
    const yMax = maxVal + range * 0.15;

    const coords = [];
    const stepX = total > 1 ? (width - padX * 2) / (total - 1) : 0;

    this.calculatedPoints.forEach((p, idx) => {
      const x = padX + idx * stepX;
      const normalizedY = (p.currentCapital - yMin) / (yMax - yMin);
      // SVG Y 坐标反向（上方为0）
      const y = height - padBottom - normalizedY * (height - padTop - padBottom);
      coords.push({ x, y, data: p });
    });

    return coords;
  }

  // 生成圆润可爱的平滑贝塞尔曲线 SVG Path
  generateSmoothPath(coords) {
    if (coords.length === 0) return '';
    if (coords.length === 1) return `M ${coords[0].x} ${coords[0].y}`;

    let path = `M ${coords[0].x} ${coords[0].y}`;
    for (let i = 0; i < coords.length - 1; i++) {
      const p0 = coords[i === 0 ? i : i - 1];
      const p1 = coords[i];
      const p2 = coords[i + 1];
      const p3 = coords[i + 2] || p2;

      // Catmull-Rom to Cubic Bezier 转换算法，实现最圆润自然的萌系走势
      const tension = 0.45;
      const cp1x = p1.x + (p2.x - p0.x) * tension;
      const cp1y = p1.y + (p2.y - p0.y) * tension;
      const cp2x = p2.x - (p3.x - p1.x) * tension;
      const cp2y = p2.y - (p3.y - p1.y) * tension;

      path += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
    }
    return path;
  }

  // 渲染特定步数进度时的折线与点位
  renderChartProgress(targetIndex) {
    const allCoords = this.getCoordinates();
    if (allCoords.length === 0) return;

    const activeCoords = allCoords.slice(0, targetIndex + 1);
    const linePathD = this.generateSmoothPath(activeCoords);
    this.chartLinePath.setAttribute('d', linePathD);

    // 阴影面积闭合
    if (activeCoords.length > 0) {
      const firstX = activeCoords[0].x;
      const lastX = activeCoords[activeCoords.length - 1].x;
      const areaPathD = `${linePathD} L ${lastX} 190 L ${firstX} 190 Z`;
      this.chartAreaPath.setAttribute('d', areaPathD);
      if (this.clipRect) {
        this.clipRect.setAttribute('width', lastX);
      }
    } else {
      this.chartAreaPath.setAttribute('d', '');
    }

    // 渲染节点小圆圈
    this.chartPointsGroup.innerHTML = '';
    activeCoords.forEach((pt, idx) => {
      const isLast = idx === activeCoords.length - 1;
      const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
      g.classList.add('chart-point-node');

      const isUp = pt.data.delta >= 0;
      const fillColor = isUp ? '#ff4081' : '#10b981';

      if (isLast) {
        // 最后一个点有外发光动画
        const pulse = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        pulse.setAttribute('cx', pt.x);
        pulse.setAttribute('cy', pt.y);
        pulse.setAttribute('r', '8');
        pulse.setAttribute('fill', fillColor);
        pulse.setAttribute('opacity', '0.4');
        pulse.classList.add('chart-point-pulse');
        g.appendChild(pulse);
      }

      const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      circle.setAttribute('cx', pt.x);
      circle.setAttribute('cy', pt.y);
      circle.setAttribute('r', isLast ? '5.5' : '4');
      circle.setAttribute('fill', '#ffffff');
      circle.setAttribute('stroke', fillColor);
      circle.setAttribute('stroke-width', '2.5');

      g.appendChild(circle);
      this.chartPointsGroup.appendChild(g);
    });

    // 定位光标位置
    if (activeCoords.length > 0) {
      const currentPt = activeCoords[activeCoords.length - 1];
      this.chartCursor.style.display = 'block';
      this.chartCursor.setAttribute('transform', `translate(${currentPt.x}, ${currentPt.y})`);
    } else {
      this.chartCursor.style.display = 'none';
    }
  }

  // 更新手机屏幕上的所有数据展示与动画弹跳
  updateScreenData(index, triggerBounce = true) {
    const data = this.calculatedPoints[index];
    if (!data) return;

    const isUp = data.cumulativePnl >= 0;
    const sign = isUp ? '+' : '';
    const diffSign = data.delta > 0 ? '+' : '';

    // 价格与涨跌幅
    this.screenCurrentPrice.textContent = this.formatMoney(data.currentCapital);
    this.screenChangeTag.textContent = `${sign}${data.rate.toFixed(2)}%`;
    this.screenChangeTag.className = `change-tag ${isUp ? 'up' : 'down'}`;

    // 情绪徽章更新
    if (data.rate >= 15) {
      this.moodIcon.textContent = '🚀';
      this.moodText.textContent = '火箭暴涨';
    } else if (data.rate > 0) {
      this.moodIcon.textContent = '🌸';
      this.moodText.textContent = '小幅飘红';
    } else if (data.rate === 0) {
      this.moodIcon.textContent = '🌱';
      this.moodText.textContent = '蓄势待发';
    } else if (data.rate >= -10) {
      this.moodIcon.textContent = '🥑';
      this.moodText.textContent = '回踩洗盘';
    } else {
      this.moodIcon.textContent = '🌧️';
      this.moodText.textContent = '耐心抄底';
    }

    // 账户金额与累计盈亏
    this.accountBalance.textContent = this.formatMoney(data.currentCapital);
    this.accountPnl.textContent = `${sign}${this.formatMoney(data.cumulativePnl)}`;
    this.accountPnl.className = `pnl-val bouncy-number ${isUp ? 'up' : 'down'}`;
    this.accountPnlRate.textContent = `${sign}${data.rate.toFixed(2)}%`;
    this.accountPnlRate.className = `pnl-rate-pill ${isUp ? 'up' : 'down'}`;

    // 触发灵动弹跳动画 (Bouncy Numbers & Avatar)
    if (triggerBounce) {
      this.triggerNumberBounces(data.delta >= 0);
      this.triggerAvatarJump();

      // 如果有买卖信号联动按钮微动
      if (data.delta > 0) {
        this.triggerButtonJelly(this.btnBuy);
      } else if (data.delta < 0) {
        this.triggerButtonJelly(this.btnSell);
      }
    }
  }

  // 灵动弹跳数字 CSS 特效
  triggerNumberBounces(isUp) {
    const animClass = isUp ? 'number-bounce-up' : 'number-bounce-down';

    [this.accountBalance, this.accountPnl, this.screenCurrentPrice].forEach(el => {
      el.classList.remove('number-bounce-up', 'number-bounce-down');
      // 强制重绘
      void el.offsetWidth;
      el.classList.add(animClass);
    });
  }

  // 头像灵动弹跳
  triggerAvatarJump() {
    this.avatarRing.classList.remove('avatar-jump');
    void this.avatarRing.offsetWidth;
    this.avatarRing.classList.add('avatar-jump');
  }

  // 按钮果冻回弹
  triggerButtonJelly(btn) {
    btn.classList.remove('jelly-wobble');
    void btn.offsetWidth;
    btn.classList.add('jelly-wobble');
  }

  // 粒子爆发生效 (到达新点位或点击买卖时)
  spawnParticleBurst(x, y, isUp) {
    const emojis = isUp ? ['✨', '✦', '★', '🌸', '💖', '💰'] : ['💧', '✦', '🍃', '🥑', '✨'];
    const count = 7;

    for (let i = 0; i < count; i++) {
      const p = document.createElement('span');
      p.className = 'particle';
      p.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      p.style.left = `${x}px`;
      p.style.top = `${y}px`;
      p.style.fontSize = `${Math.random() * 8 + 12}px`;
      p.style.color = isUp ? '#ff4081' : '#10b981';

      const angle = (Math.PI * 2 / count) * i + (Math.random() - 0.5) * 0.4;
      const distance = Math.random() * 32 + 20;
      const tx = Math.cos(angle) * distance;
      const ty = Math.sin(angle) * distance;

      p.style.setProperty('--tx', `${tx}px`);
      p.style.setProperty('--ty', `${ty}px`);

      this.particlesLayer.appendChild(p);

      setTimeout(() => {
        p.remove();
      }, 850);
    }
  }

  spawnParticle(x, y, color, text) {
    const tag = document.createElement('div');
    tag.style.position = 'absolute';
    tag.style.left = `${x}px`;
    tag.style.top = `${y}px`;
    tag.style.pointerEvents = 'none';
    tag.style.fontSize = '12px';
    tag.style.fontWeight = '700';
    tag.style.color = color;
    tag.style.background = '#ffffff';
    tag.style.padding = '3px 8px';
    tag.style.borderRadius = '10px';
    tag.style.boxShadow = '0 4px 10px rgba(0,0,0,0.15)';
    tag.style.zIndex = '20';
    tag.style.animation = 'floatBadge 0.9s ease-out forwards';
    tag.textContent = text;

    document.getElementById('phoneScreen').appendChild(tag);
    setTimeout(() => tag.remove(), 900);
  }

  // 高亮当前播放所在点位的表格行
  highlightActiveRow(idx) {
    document.querySelectorAll('.cute-table tr').forEach(r => r.classList.remove('active-playback-row'));
    const tr = document.getElementById(`pointRow-${idx}`);
    if (tr) {
      tr.classList.add('active-playback-row');
      // 仅在表格容器内部轻量滚动，绝不调用 window 级别的 scrollIntoView，避免网页向下滑动破坏录屏
      const container = document.querySelector('.points-table-container');
      if (container) {
        const trTop = tr.offsetTop - container.offsetTop;
        container.scrollTo({ top: trTop - 40, behavior: 'smooth' });
      }
    }
  }

  // ==========================================
  // 5. 核心：从起点到终点的平滑灵动动画播放引擎
  // ==========================================
  startPlay(fromBeginning = true) {
    if (this.calculatedPoints.length < 2) return;

    if (this.countdownTimer) {
      clearInterval(this.countdownTimer);
      this.countdownTimer = null;
    }

    if (fromBeginning) {
      this.resetPlaybackState();
      this.currentIndex = 0;
      this.renderChartProgress(0);
      this.updateScreenData(0, false);
      this.highlightActiveRow(0);
    }

    // 核心体验：自动平滑滚动回手机顶端，对齐画面，方便录屏
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const countdownSec = this.countdownDurationSelect ? parseInt(this.countdownDurationSelect.value, 10) : 2;

    if (countdownSec > 0) {
      this.runCountdown(countdownSec, () => {
        this.startPlayImmediate();
      });
    } else {
      this.startPlayImmediate();
    }
  }

  runCountdown(seconds, onFinish) {
    let remaining = seconds;
    if (this.countdownOverlay) {
      this.countdownOverlay.style.display = 'flex';
    }
    if (this.countdownNum) {
      this.countdownNum.textContent = remaining;
    }
    this.playStatusText.textContent = `🎬 倒计时 ${remaining} 秒后开始播放（画面已自动对齐手机）...`;
    this.playBtnText.textContent = `⏳ 倒计时 ${remaining}s...`;
    this.btnPlayAnimation.disabled = true;
    this.sound.playPop(520);

    this.countdownTimer = setInterval(() => {
      remaining--;
      if (remaining > 0) {
        if (this.countdownNum) this.countdownNum.textContent = remaining;
        this.playStatusText.textContent = `🎬 倒计时 ${remaining} 秒后开始播放...`;
        this.playBtnText.textContent = `⏳ 倒计时 ${remaining}s...`;
        this.sound.playPop(520);
      } else if (remaining === 0) {
        if (this.countdownNum) this.countdownNum.textContent = 'GO! ✨';
        this.sound.playGainChime();
        setTimeout(() => {
          clearInterval(this.countdownTimer);
          this.countdownTimer = null;
          if (this.countdownOverlay) this.countdownOverlay.style.display = 'none';
          this.btnPlayAnimation.disabled = false;
          if (onFinish) onFinish();
        }, 380);
      }
    }, 1000);
  }

  startPlayImmediate() {
    this.isPlaying = true;
    this.isPaused = false;
    this.updatePlayUiState();

    this.statusPulseDot.classList.add('playing');
    this.playStatusText.textContent = '萌萌走势动画正在灵动播放中... ✨';

    // 开始逐步步进
    this.scheduleNextStep();
  }

  scheduleNextStep() {
    if (!this.isPlaying || this.isPaused) return;

    if (this.currentIndex >= this.calculatedPoints.length - 1) {
      // 播放到最后一点，完成
      this.finishPlayback();
      return;
    }

    const fromIdx = this.currentIndex;
    const toIdx = this.currentIndex + 1;

    // 运行平滑绘制过渡
    this.animateTransitionBetweenPoints(fromIdx, toIdx, () => {
      this.currentIndex = toIdx;
      this.highlightActiveRow(toIdx);
      
      // 播放对应的音效与粒子
      const delta = this.calculatedPoints[toIdx].delta;
      const isUp = delta >= 0;
      if (delta > 0) {
        this.sound.playGainChime();
      } else if (delta < 0) {
        this.sound.playDropChime();
      } else {
        this.sound.playPop(520);
      }

      // 到达坐标产生粒子爆破
      const coords = this.getCoordinates();
      if (coords[toIdx]) {
        this.spawnParticleBurst(coords[toIdx].x, coords[toIdx].y, isUp);
      }

      // 稍作停顿以展现可爱的数字弹跳，然后继续下一个点
      if (this.isPlaying && !this.isPaused) {
        this.playbackTimer = setTimeout(() => {
          this.scheduleNextStep();
        }, Math.max(300, this.stepDuration * 0.4));
      }
    });
  }

  // 两个相邻点之间的折线平滑伸展与数字渐进动画
  animateTransitionBetweenPoints(fromIdx, toIdx, onComplete) {
    const allCoords = this.getCoordinates();
    const startCoord = allCoords[fromIdx];
    const endCoord = allCoords[toIdx];

    const fullCoords = allCoords.slice(0, toIdx + 1);
    const lineD = this.generateSmoothPath(fullCoords);
    this.chartLinePath.setAttribute('d', lineD);

    const firstX = fullCoords[0].x;
    const lastX = fullCoords[fullCoords.length - 1].x;
    const areaD = `${lineD} L ${lastX} 190 L ${firstX} 190 Z`;
    this.chartAreaPath.setAttribute('d', areaD);

    const startCap = this.calculatedPoints[fromIdx].currentCapital;
    const endCap = this.calculatedPoints[toIdx].currentCapital;

    const startTime = performance.now();
    const duration = this.stepDuration;

    // 触发数字弹跳准备
    const isUp = endCap >= startCap;
    this.triggerNumberBounces(isUp);
    this.triggerAvatarJump();

    const animateFrame = (currentTime) => {
      if (!this.isPlaying) return; // 已重置或停止

      if (this.isPaused) {
        // 暂停时挂起重试
        this.animFrameId = requestAnimationFrame(animateFrame);
        return;
      }

      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // 萌系缓动函数 (Elastic/Smooth Out)
      const ease = this.easeOutCubic(progress);

      // 当前插值坐标
      const curX = startCoord.x + (endCoord.x - startCoord.x) * ease;
      const curY = startCoord.y + (endCoord.y - startCoord.y) * ease;
      const curCap = startCap + (endCap - startCap) * ease;

      // 灵动裁剪与光标推进
      if (this.clipRect) {
        this.clipRect.setAttribute('width', curX);
      }

      // 实时移动光标
      this.chartCursor.style.display = 'block';
      this.chartCursor.setAttribute('transform', `translate(${curX}, ${curY})`);

      // 实时更新金额数字
      this.screenCurrentPrice.textContent = this.formatMoney(curCap);
      this.accountBalance.textContent = this.formatMoney(curCap);

      const currentPnl = curCap - this.initialCapital;
      const currentRate = this.initialCapital > 0 ? (currentPnl / this.initialCapital) * 100 : 0;
      const sign = currentPnl >= 0 ? '+' : '';

      this.accountPnl.textContent = `${sign}${this.formatMoney(currentPnl)}`;
      this.accountPnlRate.textContent = `${sign}${currentRate.toFixed(2)}%`;
      this.screenChangeTag.textContent = `${sign}${currentRate.toFixed(2)}%`;

      if (progress < 1) {
        this.animFrameId = requestAnimationFrame(animateFrame);
      } else {
        // 到达目标点
        if (this.clipRect) {
          this.clipRect.setAttribute('width', endCoord.x);
        }
        this.updateScreenData(toIdx, true);
        this.renderChartProgress(toIdx);
        if (onComplete) onComplete();
      }
    };

    this.animFrameId = requestAnimationFrame(animateFrame);
  }

  // 缓动曲线
  easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  // 单步前进
  stepForward() {
    if (this.currentIndex < this.calculatedPoints.length - 1) {
      this.currentIndex++;
      this.updateScreenData(this.currentIndex, true);
      this.renderChartProgress(this.currentIndex);
      this.highlightActiveRow(this.currentIndex);

      const coords = this.getCoordinates();
      const isUp = this.calculatedPoints[this.currentIndex].delta >= 0;
      if (coords[this.currentIndex]) {
        this.spawnParticleBurst(coords[this.currentIndex].x, coords[this.currentIndex].y, isUp);
      }
      if (isUp) this.sound.playGainChime();
      else this.sound.playDropChime();
    }
  }

  // 暂停/继续
  togglePause() {
    if (!this.isPlaying) return;
    this.isPaused = !this.isPaused;
    this.updatePlayUiState();
    if (this.isPaused) {
      this.playStatusText.textContent = '动画已暂停，点击「继续」或「下一步」';
      this.statusPulseDot.classList.remove('playing');
    } else {
      this.playStatusText.textContent = '萌萌走势动画正在灵动播放中... ✨';
      this.statusPulseDot.classList.add('playing');
      this.scheduleNextStep();
    }
  }

  resumePlay() {
    this.isPaused = false;
    this.isPlaying = true;
    this.updatePlayUiState();
    this.statusPulseDot.classList.add('playing');
    this.playStatusText.textContent = '萌萌走势动画正在灵动播放中... ✨';
    this.scheduleNextStep();
  }

  finishPlayback() {
    this.isPlaying = false;
    this.isPaused = false;
    this.updatePlayUiState();
    this.statusPulseDot.classList.remove('playing');
    this.playStatusText.textContent = '🎉 动画播放完毕！可随时重新播放或调整参数';
    this.sound.playGainChime();

    // 庆祝大撒花粒子
    const coords = this.getCoordinates();
    const last = coords[coords.length - 1];
    if (last) {
      this.spawnParticleBurst(last.x, last.y, true);
      setTimeout(() => this.spawnParticleBurst(last.x, last.y, true), 300);
    }
  }

  resetPlaybackState() {
    this.isPlaying = false;
    this.isPaused = false;
    if (this.countdownTimer) {
      clearInterval(this.countdownTimer);
      this.countdownTimer = null;
    }
    if (this.countdownOverlay) {
      this.countdownOverlay.style.display = 'none';
    }
    if (this.btnPlayAnimation) {
      this.btnPlayAnimation.disabled = false;
    }
    if (this.playbackTimer) clearTimeout(this.playbackTimer);
    if (this.animFrameId) cancelAnimationFrame(this.animFrameId);
    this.updatePlayUiState();
  }

  resetToStart() {
    this.resetPlaybackState();
    this.renderInitialScreenState();
    this.statusPulseDot.classList.remove('playing');
    this.playStatusText.textContent = '已重置到初始本金状态，点击「开始播放」';
  }

  updatePlayUiState() {
    if (this.isPlaying && !this.isPaused) {
      this.playBtnIcon.textContent = '🔄';
      this.playBtnText.textContent = '重新播放';
      this.btnPauseAnimation.disabled = false;
      this.btnPauseAnimation.textContent = '⏸️ 暂停';
    } else if (this.isPaused) {
      this.playBtnIcon.textContent = '▶';
      this.playBtnText.textContent = '继续播放';
      this.btnPauseAnimation.disabled = false;
      this.btnPauseAnimation.textContent = '▶️ 继续';
    } else {
      this.playBtnIcon.textContent = '▶';
      this.playBtnText.textContent = '开始播放动画';
      this.btnPauseAnimation.disabled = true;
      this.btnPauseAnimation.textContent = '⏸️ 暂停';
    }
  }

  // ==========================================
  // 6. 自定义萌宠头像选择与上传功能
  // ==========================================
  renderAvatarModal() {
    this.presetAvatarGrid.innerHTML = '';
    PRESET_AVATARS.forEach((av, idx) => {
      const item = document.createElement('div');
      item.className = `preset-avatar-item ${idx === 0 ? 'selected' : ''}`;
      item.innerHTML = `
        ${av.svg}
        <span class="preset-avatar-name">${av.name}</span>
      `;
      item.addEventListener('click', () => {
        document.querySelectorAll('.preset-avatar-item').forEach(i => i.classList.remove('selected'));
        item.classList.add('selected');
        this.setPresetAvatar(av);
        this.closeAvatarModal();
        this.sound.playPop(680);
      });
      this.presetAvatarGrid.appendChild(item);
    });
  }

  setPresetAvatar(av) {
    this.avatarImage.style.display = 'none';
    this.avatarSvgWrap.style.display = 'flex';
    this.avatarSvgWrap.innerHTML = av.svg;
    this.triggerAvatarJump();
  }

  setCustomAvatarImage(src) {
    this.avatarSvgWrap.style.display = 'none';
    this.avatarImage.style.display = 'block';
    this.avatarImage.src = src;
    this.triggerAvatarJump();
  }

  openAvatarModal() {
    this.avatarModal.style.display = 'flex';
  }

  closeAvatarModal() {
    this.avatarModal.style.display = 'none';
  }

  // 格式化金额 (千分位展示两位小数)
  formatMoney(num) {
    if (isNaN(num)) return '0.00';
    return Number(num).toLocaleString('zh-CN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }
}

// 页面加载完成后启动
document.addEventListener('DOMContentLoaded', () => {
  window.app = new StockSimulatorApp();
});
