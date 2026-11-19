/**
 * 萌系聊天动画模拟器 - Kawaii Chat Simulator (chat-app.js)
 * 特色：角色与头像永久自动绑定、灵动弹跳气泡动画、表情包连发、向下平滑自动滚动、2s倒计时录屏
 * 严格无人物角色，纯萌物动物与可爱表情
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
    </svg>`
  },
  {
    id: 'piggy',
    name: '招财小猪',
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
    </svg>`
  },
  {
    id: 'bear',
    name: '治愈小熊',
    svg: `<svg viewBox="0 0 64 64" class="preset-avatar-svg">
      <circle cx="32" cy="32" r="30" fill="#f5ebe0"/>
      <circle cx="16" cy="18" r="8" fill="#d5bdaf"/>
      <circle cx="48" cy="18" r="8" fill="#d5bdaf"/>
      <circle cx="32" cy="37" r="20" fill="#d5bdaf"/>
      <ellipse cx="32" cy="41" rx="9" ry="7" fill="#f5ebe0"/>
      <circle cx="24" cy="33" r="2.8" fill="#4a3e3d"/>
      <circle cx="40" cy="33" r="2.8" fill="#4a3e3d"/>
      <ellipse cx="32" cy="39" rx="3" ry="2" fill="#4a3e3d"/>
    </svg>`
  }
];

// ==========================================
// 2. 可爱萌宠表情包库 (纯可爱萌宠与动画特效)
// ==========================================
const PRESET_STICKERS = [
  {
    id: 'heart_cat',
    name: '喵咪比心',
    svg: `<svg viewBox="0 0 100 100" class="sticker-svg-preview">
      <circle cx="50" cy="55" r="32" fill="#ffe4ec" stroke="#ff758c" stroke-width="3"/>
      <polygon points="26,35 34,18 45,32" fill="#ff758c"/>
      <polygon points="74,35 66,18 55,32" fill="#ff758c"/>
      <circle cx="40" cy="52" r="3.5" fill="#3a2835"/>
      <circle cx="60" cy="52" r="3.5" fill="#3a2835"/>
      <ellipse cx="50" cy="60" rx="3.5" ry="2.5" fill="#ff4081"/>
      <path d="M46 62 Q50 66 54 62" stroke="#3a2835" stroke-width="2" fill="none"/>
      <!-- 大心心 -->
      <path d="M50 32 C50 20, 28 20, 28 36 C28 48, 50 64, 50 64 C50 64, 72 48, 72 36 C72 20, 50 20, 50 32 Z" fill="#ff3366" stroke="#ffffff" stroke-width="2"/>
      <text x="50" y="44" text-anchor="middle" font-size="12" fill="#ffffff" font-weight="bold">LOVE</text>
    </svg>`
  },
  {
    id: 'shiba_thumbs',
    name: '柴柴点赞',
    svg: `<svg viewBox="0 0 100 100" class="sticker-svg-preview">
      <circle cx="50" cy="50" r="34" fill="#f59e0b" stroke="#d97706" stroke-width="3"/>
      <polygon points="22,30 32,12 40,28" fill="#d97706"/>
      <polygon points="78,30 68,12 60,28" fill="#d97706"/>
      <ellipse cx="50" cy="58" rx="20" ry="14" fill="#ffffff"/>
      <circle cx="38" cy="46" r="3.5" fill="#1f2937"/>
      <circle cx="62" cy="46" r="3.5" fill="#1f2937"/>
      <ellipse cx="50" cy="52" rx="4" ry="2.8" fill="#1f2937"/>
      <path d="M46 56 Q50 61 54 56" stroke="#1f2937" stroke-width="2" fill="none"/>
      <!-- 点赞大拇指 -->
      <g transform="translate(62, 52) scale(0.9)">
        <circle cx="16" cy="16" r="16" fill="#10b981" stroke="#ffffff" stroke-width="2"/>
        <text x="16" y="22" text-anchor="middle" font-size="18">👍</text>
      </g>
    </svg>`
  },
  {
    id: 'bunny_cry',
    name: '兔兔泪目',
    svg: `<svg viewBox="0 0 100 100" class="sticker-svg-preview">
      <circle cx="50" cy="58" r="30" fill="#ffffff" stroke="#f472b6" stroke-width="3"/>
      <ellipse cx="38" cy="24" rx="8" ry="20" fill="#ffffff" stroke="#f472b6" stroke-width="3"/>
      <ellipse cx="62" cy="24" rx="8" ry="20" fill="#ffffff" stroke="#f472b6" stroke-width="3"/>
      <ellipse cx="38" cy="24" rx="4" ry="14" fill="#fbcfe8"/>
      <ellipse cx="62" cy="24" rx="4" ry="14" fill="#fbcfe8"/>
      <circle cx="40" cy="55" r="4.5" fill="#1e293b"/>
      <circle cx="60" cy="55" r="4.5" fill="#1e293b"/>
      <!-- 泪泉喷涌 -->
      <path d="M36 58 Q30 75 34 85" stroke="#38bdf8" stroke-width="4" fill="none" stroke-linecap="round"/>
      <path d="M64 58 Q70 75 66 85" stroke="#38bdf8" stroke-width="4" fill="none" stroke-linecap="round"/>
      <polygon points="50,62 47,59 53,59" fill="#f43f5e"/>
    </svg>`
  },
  {
    id: 'rich_piggy',
    name: '暴富发财',
    svg: `<svg viewBox="0 0 100 100" class="sticker-svg-preview">
      <circle cx="50" cy="52" r="32" fill="#fda4af" stroke="#f43f5e" stroke-width="3"/>
      <polygon points="26,30 32,15 42,28" fill="#f43f5e"/>
      <polygon points="74,30 68,15 58,28" fill="#f43f5e"/>
      <ellipse cx="50" cy="58" rx="10" ry="7" fill="#f43f5e"/>
      <circle cx="46" cy="58" r="2" fill="#fff"/>
      <circle cx="54" cy="58" r="2" fill="#fff"/>
      <circle cx="38" cy="46" r="3.5" fill="#1f2937"/>
      <circle cx="62" cy="46" r="3.5" fill="#1f2937"/>
      <!-- 金币雨 -->
      <circle cx="20" cy="25" r="9" fill="#fbbf24" stroke="#d97706" stroke-width="2"/>
      <text x="20" y="29" text-anchor="middle" font-size="10" font-weight="bold" fill="#78350f">¥</text>
      <circle cx="80" cy="25" r="9" fill="#fbbf24" stroke="#d97706" stroke-width="2"/>
      <text x="80" y="29" text-anchor="middle" font-size="10" font-weight="bold" fill="#78350f">¥</text>
      <text x="50" y="88" text-anchor="middle" font-size="14" font-weight="bold" fill="#f43f5e">💰 暴富 💰</text>
    </svg>`
  },
  {
    id: 'boba_panda',
    name: '奶茶续命',
    svg: `<svg viewBox="0 0 100 100" class="sticker-svg-preview">
      <circle cx="28" cy="30" r="11" fill="#1f2937"/>
      <circle cx="72" cy="30" r="11" fill="#1f2937"/>
      <circle cx="50" cy="50" r="32" fill="#ffffff" stroke="#1f2937" stroke-width="3"/>
      <ellipse cx="38" cy="48" rx="6" ry="7" fill="#1f2937" transform="rotate(-15 38 48)"/>
      <ellipse cx="62" cy="48" rx="6" ry="7" fill="#1f2937" transform="rotate(15 62 48)"/>
      <circle cx="40" cy="46" r="2" fill="#fff"/>
      <circle cx="60" cy="46" r="2" fill="#fff"/>
      <!-- 奶茶杯 -->
      <polygon points="42,58 44,82 56,82 58,58" fill="#fed7aa" stroke="#78350f" stroke-width="2"/>
      <line x1="50" y1="52" x2="50" y2="76" stroke="#ef4444" stroke-width="2.5"/>
      <text x="50" y="96" text-anchor="middle" font-size="11" font-weight="bold" fill="#78350f">🧋 吨吨吨</text>
    </svg>`
  },
  {
    id: 'hamster_food',
    name: '吃饱饱啦',
    svg: `<svg viewBox="0 0 100 100" class="sticker-svg-preview">
      <circle cx="50" cy="54" r="32" fill="#fbbf24" stroke="#d97706" stroke-width="3"/>
      <ellipse cx="50" cy="62" rx="20" ry="16" fill="#ffffff"/>
      <circle cx="36" cy="48" r="3.5" fill="#1f2937"/>
      <circle cx="64" cy="48" r="3.5" fill="#1f2937"/>
      <ellipse cx="26" cy="58" rx="7" ry="5" fill="#fca5a5" opacity="0.8"/>
      <ellipse cx="74" cy="58" rx="7" ry="5" fill="#fca5a5" opacity="0.8"/>
      <!-- 瓜子/西瓜 -->
      <polygon points="50,56 42,72 58,72" fill="#ef4444" stroke="#1f2937" stroke-width="1.5"/>
      <circle cx="50" cy="65" r="1.5" fill="#1f2937"/>
      <text x="50" y="94" text-anchor="middle" font-size="12" font-weight="bold" fill="#d97706">✨ 幸福干饭 ✨</text>
    </svg>`
  },
  {
    id: 'party_popper',
    name: '开香槟喽',
    svg: `<svg viewBox="0 0 100 100" class="sticker-svg-preview">
      <circle cx="50" cy="50" r="32" fill="#fdf4ff" stroke="#c084fc" stroke-width="3"/>
      <text x="50" y="58" text-anchor="middle" font-size="38">🎉</text>
      <text x="50" y="88" text-anchor="middle" font-size="13" font-weight="bold" fill="#a855f7">芜湖起飞 🚀</text>
    </svg>`
  },
  {
    id: 'sleep_zzz',
    name: '晚安睡啦',
    svg: `<svg viewBox="0 0 100 100" class="sticker-svg-preview">
      <circle cx="50" cy="52" r="32" fill="#f5ebe0" stroke="#8d6e63" stroke-width="3"/>
      <circle cx="26" cy="30" r="9" fill="#8d6e63"/>
      <circle cx="74" cy="30" r="9" fill="#8d6e63"/>
      <path d="M34 50 Q40 56 46 50" stroke="#4a3e3d" stroke-width="2.5" fill="none"/>
      <path d="M54 50 Q60 56 66 50" stroke="#4a3e3d" stroke-width="2.5" fill="none"/>
      <ellipse cx="50" cy="58" rx="4" ry="2.5" fill="#4a3e3d"/>
      <text x="68" y="32" font-size="16" font-weight="bold" fill="#8d6e63">Zzz</text>
      <text x="50" y="92" text-anchor="middle" font-size="12" font-weight="bold" fill="#8d6e63">🌙 好梦晚安</text>
    </svg>`
  }
];

// ==========================================
// 3. 预设聊天剧本库
// ==========================================
const PRESET_SCRIPTS = {
  supper: {
    title: '🍗 今晚吃什么大讨论 (3)',
    status: '在线 · 美食侦探分队',
    characters: [
      { id: 'cat', name: '咪咪队长 🐾', avatar: { type: 'preset', id: 'cat' }, side: 'left', theme: 'pink' },
      { id: 'dog', name: '柴柴侦探 🐶', avatar: { type: 'preset', id: 'shiba' }, side: 'right', theme: 'green' },
      { id: 'bunny', name: '软软兔 🐰', avatar: { type: 'preset', id: 'bunny' }, side: 'left', theme: 'purple' }
    ],
    messages: [
      { charId: 'cat', type: 'text', content: '呼叫全员！今晚夜宵吃炸鸡还是麻辣烫？🍗', delay: 1100 },
      { charId: 'dog', type: 'text', content: '必须是蜜汁脆皮大炸鸡！我都流口水了~ 🤤', delay: 1000 },
      { charId: 'dog', type: 'sticker', stickerId: 'shiba_thumbs', delay: 1200 },
      { charId: 'bunny', type: 'text', content: '附议炸鸡！再加一杯微糖芋圆奶茶！🧋✨', delay: 1100 },
      { charId: 'cat', type: 'sticker', stickerId: 'boba_panda', delay: 1000 },
      { charId: 'cat', type: 'text', content: '好耶！火速下单，半小时后客厅集合干饭！🎉', delay: 1200 },
      { charId: 'dog', type: 'sticker', stickerId: 'hamster_food', delay: 1200 }
    ]
  },
  rich: {
    title: '💰 暴富理财梦想群 (3)',
    status: '在线 · 准备提新车啦',
    characters: [
      { id: 'cat', name: '喵总 🐾', avatar: { type: 'preset', id: 'cat' }, side: 'left', theme: 'yellow' },
      { id: 'dog', name: '柴总 🐶', avatar: { type: 'preset', id: 'shiba' }, side: 'right', theme: 'green' },
      { id: 'pig', name: '福气小猪 🐷', avatar: { type: 'preset', id: 'piggy' }, side: 'left', theme: 'pink' }
    ],
    messages: [
      { charId: 'dog', type: 'text', content: '家人们！今天我的股票直接连板涨停翻倍了！！🚀🚀', delay: 1100 },
      { charId: 'dog', type: 'sticker', stickerId: 'party_popper', delay: 1200 },
      { charId: 'cat', type: 'text', content: '哇塞牛气冲天！暴富后的第一件事打算干啥？🤩', delay: 1000 },
      { charId: 'dog', type: 'text', content: '先给你们每人买一整箱进口罐头和小零食！🎁', delay: 1100 },
      { charId: 'pig', type: 'sticker', stickerId: 'rich_piggy', delay: 1100 },
      { charId: 'pig', type: 'text', content: '跟着柴总有肉吃！柴总大气！财运常在发大财！✨', delay: 1200 },
      { charId: 'cat', type: 'sticker', stickerId: 'heart_cat', delay: 1100 }
    ]
  },
  weekend: {
    title: '🏕️ 周末露营小分队 (3)',
    status: '在线 · 阳光明媚出发',
    characters: [
      { id: 'bunny', name: '兔兔导游 🐰', avatar: { type: 'preset', id: 'bunny' }, side: 'left', theme: 'purple' },
      { id: 'dog', name: '柴柴后勤 🐶', avatar: { type: 'preset', id: 'shiba' }, side: 'right', theme: 'green' },
      { id: 'cat', name: '咪咪大厨 🐾', avatar: { type: 'preset', id: 'cat' }, side: 'left', theme: 'pink' }
    ],
    messages: [
      { charId: 'bunny', type: 'text', content: '周末天气超好！大草坪露营装备准备好了吗？⛺️', delay: 1100 },
      { charId: 'dog', type: 'text', content: '帐篷、野餐垫、飞盘和蓝牙音响已全部装车！🚙', delay: 1100 },
      { charId: 'cat', type: 'text', content: '我带了自制三明治、草莓小蛋糕还有冰镇柠檬茶！🍓🍰', delay: 1200 },
      { charId: 'bunny', type: 'sticker', stickerId: 'heart_cat', delay: 1100 },
      { charId: 'dog', type: 'text', content: '太棒了，周六早上九点准时出发，冲鸭！☀️', delay: 1100 },
      { charId: 'dog', type: 'sticker', stickerId: 'shiba_thumbs', delay: 1100 }
    ]
  },
  comfort: {
    title: '🌸 温暖治愈小树洞',
    status: '在线 · 倾听你的心声',
    characters: [
      { id: 'cat', name: '小猫咪 🐾', avatar: { type: 'preset', id: 'cat' }, side: 'left', theme: 'pink' },
      { id: 'bear', name: '温柔熊熊 🐻', avatar: { type: 'preset', id: 'bear' }, side: 'right', theme: 'yellow' }
    ],
    messages: [
      { charId: 'cat', type: 'text', content: '熊熊，今天感觉有点累累的... 🌧️', delay: 1100 },
      { charId: 'cat', type: 'sticker', stickerId: 'bunny_cry', delay: 1200 },
      { charId: 'bear', type: 'text', content: '抱抱你呀小猫咪！辛苦啦，给你的心充充电~ 💖', delay: 1100 },
      { charId: 'bear', type: 'text', content: '今晚泡个热水澡，喝杯暖牛奶，好好睡个甜甜的觉！🥛', delay: 1200 },
      { charId: 'bear', type: 'sticker', stickerId: 'sleep_zzz', delay: 1100 },
      { charId: 'cat', type: 'text', content: '嗯嗯！被治愈到了，谢谢熊熊，晚安安！✨', delay: 1100 },
      { charId: 'cat', type: 'sticker', stickerId: 'heart_cat', delay: 1100 }
    ]
  }
};

// ==========================================
// 4. 萌系 Web Audio 合成器 (气泡弹跳音效)
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

  // 消息气泡弹出微水滴音
  playBubblePop(freq = 640) {
    if (!this.enabled) return;
    this.init();
    if (!this.audioCtx) return;

    try {
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.type = 'sine';

      const now = this.audioCtx.currentTime;
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.8, now + 0.08);

      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start(now);
      osc.stop(now + 0.08);
    } catch (e) {}
  }

  // 表情包欢快琶音
  playStickerChime() {
    if (!this.enabled) return;
    this.init();
    if (!this.audioCtx) return;

    try {
      const notes = [659.25, 830.61, 987.77]; // E5, G#5, B5 亮丽大三和弦
      const now = this.audioCtx.currentTime;

      notes.forEach((freq, idx) => {
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();
        osc.type = 'triangle';

        const startTime = now + idx * 0.05;
        osc.frequency.setValueAtTime(freq, startTime);
        gain.gain.setValueAtTime(0.12, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.2);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.2);
      });
    } catch (e) {}
  }

  playPop(freq = 520) {
    this.playBubblePop(freq);
  }
}

// ==========================================
// 5. 核心：聊天模拟器应用程序控制器
// ==========================================
class KawaiiChatApp {
  constructor() {
    this.characters = [];
    this.messages = [];
    this.currentPlayIndex = 0;
    this.isPlaying = false;
    this.isPaused = false;
    this.playbackTimer = null;
    this.countdownTimer = null;
    this.speedMultiplier = 1.0;

    // 当前正在更换头像的角色 ID
    this.editingAvatarCharId = null;
    // 当前正在选择表情包的消息 ID
    this.editingStickerMsgId = null;

    this.sound = new KawaiiSoundEngine();

    this.cacheElements();
    this.bindEvents();
    this.initClock();

    // 默认载入夜宵讨论剧本
    this.loadPreset('supper');
    this.renderAvatarModal();
    this.renderStickerModal();
  }

  cacheElements() {
    // 手机屏幕内
    this.statusClock = document.getElementById('statusClock');
    this.screenChatTitle = document.getElementById('screenChatTitle');
    this.screenChatBadge = document.getElementById('screenChatBadge');
    this.screenChatStatus = document.getElementById('screenChatStatus');
    this.chatMessagesContainer = document.getElementById('chatMessagesContainer');
    this.chatMessagesList = document.getElementById('chatMessagesList');
    this.typingBubbleWrap = document.getElementById('typingBubbleWrap');
    this.typingAvatar = document.getElementById('typingAvatar');
    this.countdownOverlay = document.getElementById('countdownOverlay');
    this.countdownNum = document.getElementById('countdownNum');

    // 录屏工具栏
    this.chromaOptions = document.getElementById('chromaOptions');
    this.noShadowToggle = document.getElementById('noShadowToggle');
    this.focusModeBtn = document.getElementById('focusModeBtn');
    this.exitFocusBtn = document.getElementById('exitFocusBtn');

    // 控制面板
    this.chatTitleInput = document.getElementById('chatTitleInput');
    this.chatStatusInput = document.getElementById('chatStatusInput');
    this.chatSpeedSelect = document.getElementById('chatSpeedSelect');
    this.countdownDurationSelect = document.getElementById('countdownDurationSelect');
    this.toggleAudioBtn = document.getElementById('toggleAudioBtn');
    this.audioIcon = document.getElementById('audioIcon');
    this.audioText = document.getElementById('audioText');
    this.resetChatBtn = document.getElementById('resetChatBtn');

    // 角色管理
    this.charactersGrid = document.getElementById('charactersGrid');
    this.btnAddCharacter = document.getElementById('btnAddCharacter');

    // 消息列表
    this.messagesTableBody = document.getElementById('messagesTableBody');
    this.messagesCountTag = document.getElementById('messagesCountTag');
    this.btnAddTextMsgBtn = document.getElementById('btnAddTextMsgBtn');
    this.btnAddStickerMsgBtn = document.getElementById('btnAddStickerMsgBtn');

    // 播放按钮
    this.btnPlayChat = document.getElementById('btnPlayChat');
    this.btnPauseChat = document.getElementById('btnPauseChat');
    this.btnStepChat = document.getElementById('btnStepChat');
    this.statusPulseDot = document.getElementById('statusPulseDot');
    this.playStatusText = document.getElementById('playStatusText');
    this.playBtnIcon = document.getElementById('playBtnIcon');
    this.playBtnText = document.getElementById('playBtnText');

    // 模态弹窗与文件上传
    this.avatarModal = document.getElementById('avatarModal');
    this.closeAvatarModalBtn = document.getElementById('closeAvatarModalBtn');
    this.presetAvatarGrid = document.getElementById('presetAvatarGrid');
    this.characterAvatarFileInput = document.getElementById('characterAvatarFileInput');
    this.btnTriggerUploadAvatar = document.getElementById('btnTriggerUploadAvatar');

    this.stickerModal = document.getElementById('stickerModal');
    this.closeStickerModalBtn = document.getElementById('closeStickerModalBtn');
    this.stickersGrid = document.getElementById('stickersGrid');
    this.customStickerFileInput = document.getElementById('customStickerFileInput');
    this.btnTriggerUploadSticker = document.getElementById('btnTriggerUploadSticker');
  }

  bindEvents() {
    // 1. 顶部聊天标题与状态实时同步
    this.chatTitleInput.addEventListener('input', (e) => {
      this.screenChatTitle.textContent = e.target.value.trim() || '萌萌聊天室';
    });

    this.chatStatusInput.addEventListener('input', (e) => {
      this.screenChatStatus.textContent = e.target.value.trim() || '在线';
    });

    // 2. 播放速度
    this.chatSpeedSelect.addEventListener('change', (e) => {
      const baseMs = parseInt(e.target.value, 10);
      this.speedMultiplier = 1200 / baseMs;
    });

    // 3. 剧本预设切换
    document.querySelectorAll('.preset-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        document.querySelectorAll('.preset-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        const key = chip.getAttribute('data-preset');
        this.loadPreset(key);
        this.sound.playPop(700);
      });
    });

    // 4. 添加新角色
    this.btnAddCharacter.addEventListener('click', () => {
      this.addNewCharacter();
      this.sound.playPop(620);
    });

    // 5. 添加文字消息与表情包
    this.btnAddTextMsgBtn.addEventListener('click', () => {
      this.addNewMessage('text');
      this.sound.playPop(600);
    });

    this.btnAddStickerMsgBtn.addEventListener('click', () => {
      this.addNewMessage('sticker');
      this.sound.playPop(600);
    });

    // 6. 播放、暂停、单步与重置
    this.btnPlayChat.addEventListener('click', () => {
      if (this.isPlaying && !this.isPaused) {
        this.startPlay(true);
      } else if (this.isPaused) {
        this.resumePlay();
      } else {
        this.startPlay(true);
      }
    });

    this.btnPauseChat.addEventListener('click', () => {
      this.togglePause();
    });

    this.btnStepChat.addEventListener('click', () => {
      this.stepForward();
      this.sound.playPop(550);
    });

    this.resetChatBtn.addEventListener('click', () => {
      this.resetChat();
      this.sound.playPop(480);
    });

    // 7. 音效开关
    this.toggleAudioBtn.addEventListener('click', () => {
      this.sound.enabled = !this.sound.enabled;
      if (this.sound.enabled) {
        this.sound.init();
        this.sound.playStickerChime();
        this.audioIcon.textContent = '🔔';
        this.audioText.textContent = '萌音开';
      } else {
        this.audioIcon.textContent = '🔕';
        this.audioText.textContent = '萌音关';
      }
    });

    // 8. 录屏色度抠图背景
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

    if (this.noShadowToggle) {
      this.noShadowToggle.addEventListener('change', (e) => {
        if (e.target.checked) document.body.classList.add('no-shadow');
        else document.body.classList.remove('no-shadow');
      });
    }

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

    // 9. 头像模态框关闭与文件上传
    this.closeAvatarModalBtn.addEventListener('click', () => this.closeAvatarModal());
    this.avatarModal.addEventListener('click', (e) => {
      if (e.target === this.avatarModal) this.closeAvatarModal();
    });

    this.btnTriggerUploadAvatar.addEventListener('click', () => {
      this.characterAvatarFileInput.click();
    });

    this.characterAvatarFileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file && this.editingAvatarCharId) {
        const reader = new FileReader();
        reader.onload = (event) => {
          this.setCharacterAvatar(this.editingAvatarCharId, {
            type: 'custom',
            src: event.target.result
          });
          this.closeAvatarModal();
          this.sound.playStickerChime();
        };
        reader.readAsDataURL(file);
      }
    });

    // 10. 表情包模态框关闭与文件上传
    this.closeStickerModalBtn.addEventListener('click', () => this.closeStickerModal());
    this.stickerModal.addEventListener('click', (e) => {
      if (e.target === this.stickerModal) this.closeStickerModal();
    });

    this.btnTriggerUploadSticker.addEventListener('click', () => {
      this.customStickerFileInput.click();
    });

    this.customStickerFileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file && this.editingStickerMsgId !== null) {
        const reader = new FileReader();
        reader.onload = (event) => {
          this.setMessageSticker(this.editingStickerMsgId, {
            type: 'custom',
            src: event.target.result,
            name: file.name.split('.')[0] || '自定义表情'
          });
          this.closeStickerModal();
          this.sound.playStickerChime();
        };
        reader.readAsDataURL(file);
      }
    });
  }

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

  // 纯色背景应用
  applyChromaBackground(color) {
    document.body.classList.remove('chroma-green', 'chroma-blue', 'chroma-magenta', 'chroma-black', 'chroma-white', 'chroma-active');
    if (color === 'cute') return;
    document.body.classList.add(`chroma-${color}`, 'chroma-active');
  }

  // 载入预设聊天剧本
  loadPreset(key) {
    this.resetPlaybackState();
    const config = PRESET_SCRIPTS[key];
    if (!config) return;

    this.screenChatTitle.textContent = config.title;
    this.chatTitleInput.value = config.title;
    this.screenChatStatus.textContent = config.status;
    this.chatStatusInput.value = config.status;

    // 深度拷贝角色列表与消息列表
    this.characters = JSON.parse(JSON.stringify(config.characters));
    this.messages = JSON.parse(JSON.stringify(config.messages)).map((m, idx) => ({
      ...m,
      id: `msg_${Date.now()}_${idx}`
    }));

    this.renderCharactersGrid();
    this.renderMessagesTable();
    this.resetChat();
  }

  // ==========================================
  // 6. 核心：角色管理与头像永久自动绑定
  // ==========================================
  renderCharactersGrid() {
    this.charactersGrid.innerHTML = '';

    this.characters.forEach((char) => {
      const card = document.createElement('div');
      card.className = 'character-card';
      card.id = `charCard_${char.id}`;

      // 头像展示（预设SVG或用户自定义上传的图片）
      let avatarHtml = '';
      if (char.avatar.type === 'custom' && char.avatar.src) {
        avatarHtml = `<img src="${char.avatar.src}" class="slot-img" alt="${char.name}">`;
      } else {
        const preset = PRESET_AVATARS.find(a => a.id === char.avatar.id) || PRESET_AVATARS[0];
        avatarHtml = preset.svg;
      }

      card.innerHTML = `
        <div class="char-avatar-slot" title="点击更换头像 (永久绑定此角色)" data-char-id="${char.id}">
          ${avatarHtml}
          <span class="slot-badge">✏️</span>
        </div>
        <div class="char-meta-col">
          <input type="text" class="char-name-input" value="${char.name}" data-char-id="${char.id}" placeholder="角色昵称" maxlength="12">
          <div class="char-options-row">
            <select class="char-side-select" data-char-id="${char.id}" title="消息显示在左侧还是右侧">
              <option value="left" ${char.side === 'left' ? 'selected' : ''}>左侧 (对方)</option>
              <option value="right" ${char.side === 'right' ? 'selected' : ''}>右侧 (自己)</option>
            </select>
            <select class="char-color-select" data-char-id="${char.id}" title="气泡色彩风格">
              <option value="pink" ${char.theme === 'pink' ? 'selected' : ''}>🌸 樱粉</option>
              <option value="green" ${char.theme === 'green' ? 'selected' : ''}>🍃 薄荷</option>
              <option value="yellow" ${char.theme === 'yellow' ? 'selected' : ''}>☀️ 暖黄</option>
              <option value="purple" ${char.theme === 'purple' ? 'selected' : ''}>🍇 浅紫</option>
              <option value="blue" ${char.theme === 'blue' ? 'selected' : ''}>🌊 晴蓝</option>
              <option value="white" ${char.theme === 'white' ? 'selected' : ''}>🥛 奶白</option>
            </select>
            ${this.characters.length > 2 ? `<button type="button" class="char-del-btn" data-char-id="${char.id}" title="删除角色">🗑️</button>` : ''}
          </div>
        </div>
      `;

      this.charactersGrid.appendChild(card);
    });

    // 绑定角色卡片交互事件
    this.charactersGrid.querySelectorAll('.char-avatar-slot').forEach(slot => {
      slot.addEventListener('click', (e) => {
        const charId = slot.getAttribute('data-char-id');
        this.openAvatarModal(charId);
        this.sound.playPop(600);
      });
    });

    this.charactersGrid.querySelectorAll('.char-name-input').forEach(input => {
      input.addEventListener('change', (e) => {
        const charId = input.getAttribute('data-char-id');
        const char = this.characters.find(c => c.id === charId);
        if (char) {
          char.name = e.target.value.trim() || '无名小萌宠';
          // 自动同步更新消息列表中的角色下拉项与手机屏幕内气泡
          this.updateAllMessagesCharacterBinding();
        }
      });
    });

    this.charactersGrid.querySelectorAll('.char-side-select').forEach(select => {
      select.addEventListener('change', (e) => {
        const charId = select.getAttribute('data-char-id');
        const char = this.characters.find(c => c.id === charId);
        if (char) {
          char.side = e.target.value;
          this.updateAllMessagesCharacterBinding();
        }
      });
    });

    this.charactersGrid.querySelectorAll('.char-color-select').forEach(select => {
      select.addEventListener('change', (e) => {
        const charId = select.getAttribute('data-char-id');
        const char = this.characters.find(c => c.id === charId);
        if (char) {
          char.theme = e.target.value;
          this.updateAllMessagesCharacterBinding();
        }
      });
    });

    this.charactersGrid.querySelectorAll('.char-del-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const charId = btn.getAttribute('data-char-id');
        this.deleteCharacter(charId);
        this.sound.playPop(420);
      });
    });
  }

  addNewCharacter() {
    const idx = this.characters.length + 1;
    const presets = PRESET_AVATARS;
    const defaultAvatar = presets[(idx - 1) % presets.length];
    const newChar = {
      id: `char_${Date.now()}`,
      name: `${defaultAvatar.name} #${idx}`,
      avatar: { type: 'preset', id: defaultAvatar.id },
      side: idx % 2 === 0 ? 'right' : 'left',
      theme: ['pink', 'green', 'yellow', 'purple', 'blue'][idx % 5]
    };
    this.characters.push(newChar);
    this.renderCharactersGrid();
    this.renderMessagesTable();
  }

  deleteCharacter(charId) {
    if (this.characters.length <= 2) return;
    this.characters = this.characters.filter(c => c.id !== charId);
    // 如果有消息引用了被删除角色，重定向到第一个角色
    const fallbackId = this.characters[0].id;
    this.messages.forEach(m => {
      if (m.charId === charId) m.charId = fallbackId;
    });
    this.renderCharactersGrid();
    this.renderMessagesTable();
  }

  // 角色头像、昵称或颜色修改后，所有绑定该角色的消息全自动同步
  updateAllMessagesCharacterBinding() {
    this.renderMessagesTable();
    // 如果屏幕上有已渲染的气泡，同步更新头像与昵称
    this.syncRenderedBubbles();
  }

  setCharacterAvatar(charId, avatarObj) {
    const char = this.characters.find(c => c.id === charId);
    if (!char) return;
    char.avatar = avatarObj;
    this.renderCharactersGrid();
    this.updateAllMessagesCharacterBinding();
  }

  // ==========================================
  // 7. 聊天消息列表管理 (文本与表情包)
  // ==========================================
  renderMessagesTable() {
    this.messagesTableBody.innerHTML = '';
    this.messagesCountTag.textContent = `共 ${this.messages.length} 条消息`;

    this.messages.forEach((msg, idx) => {
      const tr = document.createElement('tr');
      tr.id = `msgTableRow_${msg.id}`;
      if (idx === this.currentPlayIndex && this.isPlaying) {
        tr.classList.add('active-playback-row');
      }

      // 角色下拉选择框选项（自动绑定该角色头像和颜色）
      const charOptionsHtml = this.characters.map(c => `
        <option value="${c.id}" ${c.id === msg.charId ? 'selected' : ''}>
          ${c.name} (${c.side === 'left' ? '左' : '右'})
        </option>
      `).join('');

      // 内容单元格：文本输入框 或 表情包选择按钮
      let contentHtml = '';
      if (msg.type === 'sticker') {
        let stickerPreview = '';
        if (msg.stickerObj) {
          if (msg.stickerObj.type === 'custom') {
            stickerPreview = `<img src="${msg.stickerObj.src}" class="table-sticker-thumb" alt="表情"> <span>${msg.stickerObj.name || '本地表情'}</span>`;
          } else {
            const presetSticker = PRESET_STICKERS.find(s => s.id === msg.stickerObj.id) || PRESET_STICKERS[0];
            stickerPreview = `${presetSticker.svg} <span>${presetSticker.name}</span>`;
          }
        } else {
          const defaultSticker = PRESET_STICKERS.find(s => s.id === msg.stickerId) || PRESET_STICKERS[0];
          stickerPreview = `${defaultSticker.svg} <span>${defaultSticker.name}</span>`;
        }
        contentHtml = `
          <button type="button" class="table-sticker-btn" data-msg-id="${msg.id}" title="点击更换表情包">
            ${stickerPreview}
            <span style="font-size:11px; color:#ff477e;">(点我换)</span>
          </button>
        `;
      } else {
        contentHtml = `
          <input type="text" class="table-text-input" value="${this.escapeHtml(msg.content || '')}" data-msg-id="${msg.id}" placeholder="输入消息文本内容..." maxlength="120">
        `;
      }

      tr.innerHTML = `
        <td><span class="msg-index-badge">${idx + 1}</span></td>
        <td>
          <select class="table-char-select" data-msg-id="${msg.id}">
            ${charOptionsHtml}
          </select>
        </td>
        <td>
          <span class="msg-type-pill ${msg.type}">
            ${msg.type === 'sticker' ? '🎨 表情' : '💬 文字'}
          </span>
        </td>
        <td>${contentHtml}</td>
        <td>
          <input type="number" class="table-delay-input" value="${msg.delay || 1200}" step="100" min="200" max="8000" data-msg-id="${msg.id}" title="显示此条消息前的等待时长(ms)">
        </td>
        <td>
          <div class="table-actions-cell">
            <button type="button" class="row-action-btn move-up-btn" data-idx="${idx}" title="上移">⬆️</button>
            <button type="button" class="row-action-btn move-down-btn" data-idx="${idx}" title="下移">⬇️</button>
            <button type="button" class="row-action-btn delete-msg-btn" data-idx="${idx}" title="删除">🗑️</button>
          </div>
        </td>
      `;

      this.messagesTableBody.appendChild(tr);
    });

    // 绑定表格内部输入事件
    this.messagesTableBody.querySelectorAll('.table-char-select').forEach(select => {
      select.addEventListener('change', (e) => {
        const msgId = select.getAttribute('data-msg-id');
        const msg = this.messages.find(m => m.id === msgId);
        if (msg) {
          msg.charId = e.target.value;
          this.sound.playPop(500);
        }
      });
    });

    this.messagesTableBody.querySelectorAll('.table-text-input').forEach(input => {
      input.addEventListener('input', (e) => {
        const msgId = input.getAttribute('data-msg-id');
        const msg = this.messages.find(m => m.id === msgId);
        if (msg) msg.content = e.target.value;
      });
    });

    this.messagesTableBody.querySelectorAll('.table-sticker-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const msgId = btn.getAttribute('data-msg-id');
        this.openStickerModal(msgId);
        this.sound.playPop(580);
      });
    });

    this.messagesTableBody.querySelectorAll('.table-delay-input').forEach(input => {
      input.addEventListener('change', (e) => {
        const msgId = input.getAttribute('data-msg-id');
        const msg = this.messages.find(m => m.id === msgId);
        if (msg) msg.delay = Math.max(200, parseInt(e.target.value, 10) || 1000);
      });
    });

    this.messagesTableBody.querySelectorAll('.move-up-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-idx'), 10);
        if (idx > 0) {
          const temp = this.messages[idx];
          this.messages[idx] = this.messages[idx - 1];
          this.messages[idx - 1] = temp;
          this.renderMessagesTable();
          this.sound.playPop(480);
        }
      });
    });

    this.messagesTableBody.querySelectorAll('.move-down-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-idx'), 10);
        if (idx < this.messages.length - 1) {
          const temp = this.messages[idx];
          this.messages[idx] = this.messages[idx + 1];
          this.messages[idx + 1] = temp;
          this.renderMessagesTable();
          this.sound.playPop(480);
        }
      });
    });

    this.messagesTableBody.querySelectorAll('.delete-msg-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-idx'), 10);
        if (this.messages.length > 1) {
          this.messages.splice(idx, 1);
          this.renderMessagesTable();
          this.sound.playPop(420);
        }
      });
    });
  }

  addNewMessage(type = 'text') {
    const defaultChar = this.characters[this.messages.length % this.characters.length] || this.characters[0];
    const newMsg = {
      id: `msg_${Date.now()}`,
      charId: defaultChar.id,
      type: type,
      content: type === 'text' ? '今天也要开开心心哦！🌸✨' : '',
      stickerId: type === 'sticker' ? 'heart_cat' : null,
      delay: 1100
    };
    this.messages.push(newMsg);
    this.renderMessagesTable();
  }

  setMessageSticker(msgId, stickerObj) {
    const msg = this.messages.find(m => m.id === msgId);
    if (!msg) return;
    msg.stickerObj = stickerObj;
    this.renderMessagesTable();
  }

  // ==========================================
  // 8. 核心：从起点到终点的平滑灵动动画播放引擎
  // ==========================================
  startPlay(fromBeginning = true) {
    if (this.messages.length === 0) return;

    if (this.countdownTimer) {
      clearInterval(this.countdownTimer);
      this.countdownTimer = null;
    }

    if (fromBeginning) {
      this.resetPlaybackState();
      this.currentPlayIndex = 0;
      this.chatMessagesList.innerHTML = '';
      this.highlightActiveTableRow(0);
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
    if (this.countdownOverlay) this.countdownOverlay.style.display = 'flex';
    if (this.countdownNum) this.countdownNum.textContent = remaining;

    this.playStatusText.textContent = `🎬 倒计时 ${remaining} 秒后开聊（画面已自动对齐手机）...`;
    this.playBtnText.textContent = `⏳ 倒计时 ${remaining}s...`;
    this.btnPlayChat.disabled = true;
    this.sound.playPop(520);

    this.countdownTimer = setInterval(() => {
      remaining--;
      if (remaining > 0) {
        if (this.countdownNum) this.countdownNum.textContent = remaining;
        this.playStatusText.textContent = `🎬 倒计时 ${remaining} 秒后开聊...`;
        this.playBtnText.textContent = `⏳ 倒计时 ${remaining}s...`;
        this.sound.playPop(520);
      } else if (remaining === 0) {
        if (this.countdownNum) this.countdownNum.textContent = 'GO! ✨';
        this.sound.playStickerChime();
        setTimeout(() => {
          clearInterval(this.countdownTimer);
          this.countdownTimer = null;
          if (this.countdownOverlay) this.countdownOverlay.style.display = 'none';
          this.btnPlayChat.disabled = false;
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
    this.playStatusText.textContent = '萌萌聊天记录正在灵动播放中... 💬✨';

    this.scheduleNextMessage();
  }

  scheduleNextMessage() {
    if (!this.isPlaying || this.isPaused) return;

    if (this.currentPlayIndex >= this.messages.length) {
      this.finishPlayback();
      return;
    }

    const msg = this.messages[this.currentPlayIndex];
    const char = this.characters.find(c => c.id === msg.charId) || this.characters[0];

    // 如果是左侧角色，先模拟显示短暂的“对方正在输入...”气泡
    const showTyping = char.side === 'left';
    const typingDuration = showTyping ? 450 : 50;

    if (showTyping) {
      this.showTypingIndicator(char);
    }

    this.playbackTimer = setTimeout(() => {
      if (!this.isPlaying || this.isPaused) return;
      this.hideTypingIndicator();

      // 真正弹出消息气泡
      this.renderBubbleToScreen(msg, char);
      this.highlightActiveTableRow(this.currentPlayIndex);

      // 播放音效
      if (msg.type === 'sticker') {
        this.sound.playStickerChime();
      } else {
        this.sound.playBubblePop(660);
      }

      this.currentPlayIndex++;

      // 计算本条消息展示后的停顿时间
      const delay = Math.max(300, (msg.delay || 1200) / this.speedMultiplier);

      this.playbackTimer = setTimeout(() => {
        this.scheduleNextMessage();
      }, delay);
    }, typingDuration);
  }

  showTypingIndicator(char) {
    if (!this.typingBubbleWrap) return;
    let avatarHtml = '';
    if (char.avatar.type === 'custom' && char.avatar.src) {
      avatarHtml = `<img src="${char.avatar.src}" style="width:100%;height:100%;border-radius:50%;object-fit:cover;">`;
    } else {
      const preset = PRESET_AVATARS.find(a => a.id === char.avatar.id) || PRESET_AVATARS[0];
      avatarHtml = preset.svg;
    }
    this.typingAvatar.innerHTML = avatarHtml;
    this.typingBubbleWrap.style.display = 'flex';
    this.scrollToChatBottom();
  }

  hideTypingIndicator() {
    if (this.typingBubbleWrap) this.typingBubbleWrap.style.display = 'none';
  }

  // 向手机屏幕内插入一条带弹跳动画的消息
  renderBubbleToScreen(msg, char) {
    const row = document.createElement('div');
    row.className = `chat-msg-row ${char.side}`;
    row.dataset.msgId = msg.id;

    // 头像
    let avatarInner = '';
    if (char.avatar.type === 'custom' && char.avatar.src) {
      avatarInner = `<img src="${char.avatar.src}" class="msg-avatar-img" alt="${char.name}">`;
    } else {
      const preset = PRESET_AVATARS.find(a => a.id === char.avatar.id) || PRESET_AVATARS[0];
      avatarInner = preset.svg;
    }

    // 气泡内容
    let bubbleContentHtml = '';
    if (msg.type === 'sticker') {
      if (msg.stickerObj) {
        if (msg.stickerObj.type === 'custom') {
          bubbleContentHtml = `<img src="${msg.stickerObj.src}" class="msg-sticker-img" alt="表情">`;
        } else {
          const presetSticker = PRESET_STICKERS.find(s => s.id === msg.stickerObj.id) || PRESET_STICKERS[0];
          bubbleContentHtml = `<div class="msg-sticker-svg-wrap">${presetSticker.svg}</div>`;
        }
      } else {
        const defaultSticker = PRESET_STICKERS.find(s => s.id === msg.stickerId) || PRESET_STICKERS[0];
        bubbleContentHtml = `<div class="msg-sticker-svg-wrap">${defaultSticker.svg}</div>`;
      }
    } else {
      bubbleContentHtml = this.escapeHtml(msg.content);
    }

    row.innerHTML = `
      <div class="msg-avatar-wrap">
        ${avatarInner}
      </div>
      <div class="msg-content-col">
        <span class="msg-sender-name">${char.name}</span>
        <div class="msg-bubble ${msg.type === 'sticker' ? 'is-sticker' : `bubble-theme-${char.theme}`}">
          ${bubbleContentHtml}
        </div>
      </div>
    `;

    this.chatMessagesList.appendChild(row);

    // 关键体验：在手机屏幕内部向下平滑滚动，绝不移动整个网页窗口！
    this.scrollToChatBottom();
  }

  scrollToChatBottom() {
    if (this.chatMessagesContainer) {
      this.chatMessagesContainer.scrollTo({
        top: this.chatMessagesContainer.scrollHeight,
        behavior: 'smooth'
      });
    }
  }

  syncRenderedBubbles() {
    this.chatMessagesList.querySelectorAll('.chat-msg-row').forEach(row => {
      const msgId = row.dataset.msgId;
      const msg = this.messages.find(m => m.id === msgId);
      if (!msg) return;
      const char = this.characters.find(c => c.id === msg.charId);
      if (!char) return;

      row.className = `chat-msg-row ${char.side}`;
      const nameEl = row.querySelector('.msg-sender-name');
      if (nameEl) nameEl.textContent = char.name;

      const avatarWrap = row.querySelector('.msg-avatar-wrap');
      if (avatarWrap) {
        if (char.avatar.type === 'custom' && char.avatar.src) {
          avatarWrap.innerHTML = `<img src="${char.avatar.src}" class="msg-avatar-img" alt="${char.name}">`;
        } else {
          const preset = PRESET_AVATARS.find(a => a.id === char.avatar.id) || PRESET_AVATARS[0];
          avatarWrap.innerHTML = preset.svg;
        }
      }

      const bubble = row.querySelector('.msg-bubble');
      if (bubble && msg.type !== 'sticker') {
        bubble.className = `msg-bubble bubble-theme-${char.theme}`;
      }
    });
  }

  // 高亮表格当前消息行（仅在表格自身容器内轻量微调，绝不调用 window 级 scrollIntoView）
  highlightActiveTableRow(idx) {
    document.querySelectorAll('.cute-table tr').forEach(r => r.classList.remove('active-playback-row'));
    if (idx < this.messages.length) {
      const msg = this.messages[idx];
      const tr = document.getElementById(`msgTableRow_${msg.id}`);
      if (tr) {
        tr.classList.add('active-playback-row');
        const container = document.querySelector('.messages-table-container');
        if (container) {
          const trTop = tr.offsetTop - container.offsetTop;
          container.scrollTo({ top: trTop - 40, behavior: 'smooth' });
        }
      }
    }
  }

  stepForward() {
    if (this.currentPlayIndex < this.messages.length) {
      const msg = this.messages[this.currentPlayIndex];
      const char = this.characters.find(c => c.id === msg.charId) || this.characters[0];
      this.renderBubbleToScreen(msg, char);
      this.highlightActiveTableRow(this.currentPlayIndex);

      if (msg.type === 'sticker') this.sound.playStickerChime();
      else this.sound.playBubblePop(660);

      this.currentPlayIndex++;
    }
  }

  togglePause() {
    if (!this.isPlaying) return;
    this.isPaused = !this.isPaused;
    this.updatePlayUiState();
    if (this.isPaused) {
      if (this.playbackTimer) clearTimeout(this.playbackTimer);
      this.playStatusText.textContent = '聊天播放已暂停，点击「继续」或「下一条」';
      this.statusPulseDot.classList.remove('playing');
    } else {
      this.playStatusText.textContent = '萌萌聊天记录正在灵动播放中... 💬✨';
      this.statusPulseDot.classList.add('playing');
      this.scheduleNextMessage();
    }
  }

  resumePlay() {
    this.isPaused = false;
    this.isPlaying = true;
    this.updatePlayUiState();
    this.statusPulseDot.classList.add('playing');
    this.playStatusText.textContent = '萌萌聊天记录正在灵动播放中... 💬✨';
    this.scheduleNextMessage();
  }

  finishPlayback() {
    this.isPlaying = false;
    this.isPaused = false;
    this.updatePlayUiState();
    this.statusPulseDot.classList.remove('playing');
    this.playStatusText.textContent = '🎉 聊天动画播放完毕！可随时重新播放或修改剧本';
    this.sound.playStickerChime();
  }

  resetPlaybackState() {
    this.isPlaying = false;
    this.isPaused = false;
    if (this.countdownTimer) {
      clearInterval(this.countdownTimer);
      this.countdownTimer = null;
    }
    if (this.countdownOverlay) this.countdownOverlay.style.display = 'none';
    if (this.playbackTimer) clearTimeout(this.playbackTimer);
    if (this.btnPlayChat) this.btnPlayChat.disabled = false;
    this.hideTypingIndicator();
    this.updatePlayUiState();
  }

  resetChat() {
    this.resetPlaybackState();
    this.currentPlayIndex = 0;
    this.chatMessagesList.innerHTML = '';
    this.highlightActiveTableRow(0);
    this.statusPulseDot.classList.remove('playing');
    this.playStatusText.textContent = '已清空手机聊天屏幕，点击「开始播放聊天动画」';
  }

  updatePlayUiState() {
    if (this.isPlaying && !this.isPaused) {
      this.playBtnIcon.textContent = '🔄';
      this.playBtnText.textContent = '重新播放';
      this.btnPauseChat.disabled = false;
      this.btnPauseChat.textContent = '⏸️ 暂停';
    } else if (this.isPaused) {
      this.playBtnIcon.textContent = '▶';
      this.playBtnText.textContent = '继续播放';
      this.btnPauseChat.disabled = false;
      this.btnPauseChat.textContent = '▶️ 继续';
    } else {
      this.playBtnIcon.textContent = '▶';
      this.playBtnText.textContent = '开始播放聊天动画';
      this.btnPauseChat.disabled = true;
      this.btnPauseChat.textContent = '⏸️ 暂停';
    }
  }

  // ==========================================
  // 9. 模态弹窗系统：角色头像选择 & 表情包选择
  // ==========================================
  renderAvatarModal() {
    this.presetAvatarGrid.innerHTML = '';
    PRESET_AVATARS.forEach((av) => {
      const item = document.createElement('div');
      item.className = 'preset-avatar-item';
      item.innerHTML = `
        ${av.svg}
        <span class="preset-avatar-name">${av.name}</span>
      `;
      item.addEventListener('click', () => {
        if (this.editingAvatarCharId) {
          this.setCharacterAvatar(this.editingAvatarCharId, {
            type: 'preset',
            id: av.id
          });
          this.closeAvatarModal();
          this.sound.playPop(680);
        }
      });
      this.presetAvatarGrid.appendChild(item);
    });
  }

  openAvatarModal(charId) {
    this.editingAvatarCharId = charId;
    this.avatarModal.style.display = 'flex';
  }

  closeAvatarModal() {
    this.avatarModal.style.display = 'none';
    this.editingAvatarCharId = null;
  }

  renderStickerModal() {
    this.stickersGrid.innerHTML = '';
    PRESET_STICKERS.forEach((stk) => {
      const item = document.createElement('div');
      item.className = 'sticker-item';
      item.innerHTML = `
        ${stk.svg}
        <span class="sticker-name">${stk.name}</span>
      `;
      item.addEventListener('click', () => {
        if (this.editingStickerMsgId !== null) {
          this.setMessageSticker(this.editingStickerMsgId, {
            type: 'preset',
            id: stk.id,
            name: stk.name
          });
          this.closeStickerModal();
          this.sound.playStickerChime();
        }
      });
      this.stickersGrid.appendChild(item);
    });
  }

  openStickerModal(msgId) {
    this.editingStickerMsgId = msgId;
    this.stickerModal.style.display = 'flex';
  }

  closeStickerModal() {
    this.stickerModal.style.display = 'none';
    this.editingStickerMsgId = null;
  }

  escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
}

// 页面加载完成后启动
document.addEventListener('DOMContentLoaded', () => {
  window.chatApp = new KawaiiChatApp();
});
