// 시니어 맞춤형 틀린그림찾기 앱 - 스테이지 데이터 모듈 (levels.js)

const gameLevels = [
  {
    stage: 1,
    title: "1단계: 정겨운 시골 집",
    description: "지붕 위의 굴뚝 연기, 사과나무의 탐스러운 사과들을 천천히 살펴보세요.",
    encouragement: "어머님, 아버님! 벌써 첫 번째 방을 찾으실 준비가 되었네요. 천천히 구경하며 찾아보세요!",
    winSpeech: "우와! 정말 대단하십니다! 눈썰미가 젊은이 못지않게 아주 젊고 훌륭하세요!",
    // 4:3 비율의 SVG 뷰박스 (0 0 400 300)
    svgOriginal: `
      <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
        <!-- 하늘과 잔디 언덕 배경 -->
        <defs>
          <linearGradient id="skyGrad1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#87CEEB"/>
            <stop offset="100%" stop-color="#E0F7FA"/>
          </linearGradient>
          <linearGradient id="roofGrad1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#FFF176"/>
            <stop offset="100%" stop-color="#FBC02D"/>
          </linearGradient>
        </defs>
        
        <!-- 하늘 -->
        <rect width="400" height="300" fill="url(#skyGrad1)"/>
        
        <!-- 따뜻한 노란 태양 -->
        <circle cx="60" cy="60" r="30" fill="#FF8F00"/>
        <circle cx="60" cy="60" r="24" fill="#FFC107"/>
        
        <!-- 구름 -->
        <path d="M 320,60 A 20,20 0 0,1 350,50 A 25,25 0 0,1 380,65 A 15,15 0 0,1 360,80 L 310,80 A 15,15 0 0,1 320,60 Z" fill="#FFFFFF" opacity="0.9"/>
        
        <!-- 저 멀리 산 -->
        <path d="M -20,240 L 100,160 L 220,240 Z" fill="#81C784" opacity="0.7"/>
        <path d="M 120,240 L 250,140 L 380,240 Z" fill="#66BB6A" opacity="0.6"/>
        
        <!-- 푸른 잔디밭 -->
        <path d="M -10,210 Q 150,170 410,210 L 410,310 L -10,310 Z" fill="#4CAF50"/>
        
        <!-- 초가집 몸체 -->
        <rect x="70" y="160" width="130" height="70" fill="#D7CCC8" stroke="#3E2723" stroke-width="4"/>
        
        <!-- 초가지붕 -->
        <path d="M 50,165 L 135,110 L 220,165 Z" fill="url(#roofGrad1)" stroke="#3E2723" stroke-width="5" stroke-linejoin="round"/>
        
        <!-- 굴뚝 -->
        <rect x="180" y="130" width="18" height="30" fill="#78909C" stroke="#3E2723" stroke-width="3"/>
        
        <!-- 굴뚝 연기 (틀린 곳 1) -->
        <g id="smoke-group">
          <circle cx="189" cy="115" r="10" fill="#B0BEC5" opacity="0.8"/>
          <circle cx="197" cy="98" r="14" fill="#CFD8DC" opacity="0.7"/>
          <circle cx="210" cy="80" r="18" fill="#ECEFF1" opacity="0.6"/>
        </g>
        
        <!-- 격자창문 -->
        <rect x="90" y="175" width="35" height="30" fill="#E0F7FA" stroke="#3E2723" stroke-width="3"/>
        <line x1="107.5" y1="175" x2="107.5" y2="205" stroke="#3E2723" stroke-width="2"/>
        <line x1="90" y1="190" x2="125" y2="190" stroke="#3E2723" stroke-width="2"/>
        
        <!-- 툇마루 문 -->
        <rect x="145" y="170" width="40" height="60" fill="#A1887F" stroke="#3E2723" stroke-width="3"/>
        <!-- 문손잡이 (틀린 곳 3) -->
        <circle id="door-knob" cx="152" cy="200" r="5" fill="#3E2723"/>
        
        <!-- 탐스러운 사과나무 -->
        <path d="M 290,230 L 290,160" stroke="#5D4037" stroke-width="12" stroke-linecap="round"/>
        <circle cx="290" cy="140" r="45" fill="#2E7D32" stroke="#1B5E20" stroke-width="4"/>
        <circle cx="270" cy="125" r="20" fill="#388E3C" opacity="0.9"/>
        <circle cx="310" cy="145" r="25" fill="#388E3C" opacity="0.9"/>
        
        <!-- 빨간 사과들 -->
        <circle cx="265" cy="135" r="8" fill="#D32F2F"/> <!-- 사과 1 -->
        <circle cx="305" cy="125" r="8" fill="#D32F2F"/> <!-- 사과 2 -->
        
        <!-- 틀린 곳 2 (사과 3) -->
        <circle id="apple-3" cx="288" cy="155" r="8" fill="#D32F2F"/>
      </svg>
    `,
    svgAltered: `
      <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
        <!-- 하늘과 잔디 언덕 배경 -->
        <defs>
          <linearGradient id="skyGrad1-alt" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#87CEEB"/>
            <stop offset="100%" stop-color="#E0F7FA"/>
          </linearGradient>
          <linearGradient id="roofGrad1-alt" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#FFF176"/>
            <stop offset="100%" stop-color="#FBC02D"/>
          </linearGradient>
        </defs>
        
        <!-- 하늘 -->
        <rect width="400" height="300" fill="url(#skyGrad1-alt)"/>
        
        <!-- 따뜻한 노란 태양 -->
        <circle cx="60" cy="60" r="30" fill="#FF8F00"/>
        <circle cx="60" cy="60" r="24" fill="#FFC107"/>
        
        <!-- 구름 -->
        <path d="M 320,60 A 20,20 0 0,1 350,50 A 25,25 0 0,1 380,65 A 15,15 0 0,1 360,80 L 310,80 A 15,15 0 0,1 320,60 Z" fill="#FFFFFF" opacity="0.9"/>
        
        <!-- 저 멀리 산 -->
        <path d="M -20,240 L 100,160 L 220,240 Z" fill="#81C784" opacity="0.7"/>
        <path d="M 120,240 L 250,140 L 380,240 Z" fill="#66BB6A" opacity="0.6"/>
        
        <!-- 푸른 잔디밭 -->
        <path d="M -10,210 Q 150,170 410,210 L 410,310 L -10,310 Z" fill="#4CAF50"/>
        
        <!-- 초가집 몸체 -->
        <rect x="70" y="160" width="130" height="70" fill="#D7CCC8" stroke="#3E2723" stroke-width="4"/>
        
        <!-- 초가지붕 -->
        <path d="M 50,165 L 135,110 L 220,165 Z" fill="url(#roofGrad1-alt)" stroke="#3E2723" stroke-width="5" stroke-linejoin="round"/>
        
        <!-- 굴뚝 -->
        <rect x="180" y="130" width="18" height="30" fill="#78909C" stroke="#3E2723" stroke-width="3"/>
        
        <!-- [틀린곳 1] 연기 제거됨 -->
        
        <!-- 격자창문 -->
        <rect x="90" y="175" width="35" height="30" fill="#E0F7FA" stroke="#3E2723" stroke-width="3"/>
        <line x1="107.5" y1="175" x2="107.5" y2="205" stroke="#3E2723" stroke-width="2"/>
        <line x1="90" y1="190" x2="125" y2="190" stroke="#3E2723" stroke-width="2"/>
        
        <!-- 툇마루 문 -->
        <rect x="145" y="170" width="40" height="60" fill="#A1887F" stroke="#3E2723" stroke-width="3"/>
        <!-- [틀린곳 3] 문손잡이 제거됨 -->
        
        <!-- 탐스러운 사과나무 -->
        <path d="M 290,230 L 290,160" stroke="#5D4037" stroke-width="12" stroke-linecap="round"/>
        <circle cx="290" cy="140" r="45" fill="#2E7D32" stroke="#1B5E20" stroke-width="4"/>
        <circle cx="270" cy="125" r="20" fill="#388E3C" opacity="0.9"/>
        <circle cx="310" cy="145" r="25" fill="#388E3C" opacity="0.9"/>
        
        <!-- 빨간 사과들 -->
        <circle cx="265" cy="135" r="8" fill="#D32F2F"/>
        <circle cx="305" cy="125" r="8" fill="#D32F2F"/>
        
        <!-- [틀린곳 2] 사과 3 제거됨 -->
      </svg>
    `,
    // x, y는 0~100 사이 백분율 좌표, radius 역시 백분율 기준 오차 범위 (시니어를 위해 매우 넓게 설정: 7~10)
    differences: [
      {
        id: "s1-smoke",
        name: "굴뚝 연기",
        x: 50.0, // (199 / 400) * 100
        y: 33.0, // (100 / 300) * 100
        radius: 9.0,
        found: false
      },
      {
        id: "s1-apple",
        name: "사과나무의 사과",
        x: 72.0, // (288 / 400) * 100
        y: 52.0, // (155 / 300) * 100
        radius: 8.5,
        found: false
      },
      {
        id: "s1-knob",
        name: "초가집 문손잡이",
        x: 38.0, // (152 / 400) * 100
        y: 67.0, // (200 / 300) * 100
        radius: 8.0,
        found: false
      }
    ]
  },
  {
    stage: 2,
    title: "2단계: 할머니의 꽃밭",
    description: "보라색 꽃병 속에 핀 다양한 꽃들과, 하늘을 나는 예쁜 나비를 관찰해보세요.",
    encouragement: "참 잘하셨어요! 이번에는 어여쁜 꽃들이 가득한 할머니의 화단으로 가보실까요?",
    winSpeech: "정말 눈이 맑고 젊으시네요! 예쁜 꽃들 사이의 차이를 척척 찾아내셨어요!",
    svgOriginal: `
      <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="skyGrad2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#E8F5E9"/>
            <stop offset="100%" stop-color="#C8E6C9"/>
          </linearGradient>
          <linearGradient id="potGrad2" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="#7E57C2"/>
            <stop offset="100%" stop-color="#9575CD"/>
          </linearGradient>
        </defs>
        
        <!-- 연두빛 편안한 정원 배경 -->
        <rect width="400" height="300" fill="url(#skyGrad2)"/>
        
        <!-- 뒤쪽 울타리 -->
        <g stroke="#8D6E63" stroke-width="4" fill="#D7CCC8">
          <rect x="20" y="80" width="16" height="150" rx="4"/>
          <rect x="70" y="80" width="16" height="150" rx="4"/>
          <rect x="120" y="80" width="16" height="150" rx="4"/>
          <rect x="170" y="80" width="16" height="150" rx="4"/>
          <rect x="220" y="80" width="16" height="150" rx="4"/>
          <rect x="270" y="80" width="16" height="150" rx="4"/>
          <rect x="320" y="80" width="16" height="150" rx="4"/>
          <rect x="370" y="80" width="16" height="150" rx="4"/>
          <!-- 가로대 -->
          <rect x="10" y="110" width="380" height="15"/>
          <rect x="10" y="190" width="380" height="15"/>
        </g>
        
        <!-- 흙더미 -->
        <ellipse cx="200" cy="250" rx="150" ry="25" fill="#5D4037"/>
        
        <!-- 꽃 1: 해바라기 (왼쪽) -->
        <path d="M 120,240 Q 110,180 120,130" stroke="#4CAF50" stroke-width="6" fill="none"/>
        <g id="sunflower-head">
          <!-- 잎사귀 -->
          <path d="M 115,190 Q 90,180 100,170 Q 115,180 117,190 Z" fill="#2E7D32" stroke="#1B5E20" stroke-width="2"/>
          <!-- 꽃잎들 -->
          <circle cx="120" cy="130" r="32" fill="#FFC107"/>
          <path d="M 120,90 L 120,170 M 80,130 L 160,130 M 92,102 L 148,158 M 92,158 L 148,102" stroke="#FFA000" stroke-width="8"/>
          <circle cx="120" cy="130" r="28" fill="#FFEB3B"/>
          <!-- 씨앗 부분 -->
          <circle cx="120" cy="130" r="16" fill="#5D4037"/>
        </g>
        
        <!-- 꽃 2: 튤립 (오른쪽) -->
        <path d="M 280,240 Q 290,180 270,130" stroke="#4CAF50" stroke-width="6" fill="none"/>
        <!-- 잎사귀 1 (틀린 곳 3 - 오른쪽 튤립 잎) -->
        <path id="tulip-leaf-1" d="M 283,200 Q 310,195 300,180 Q 285,190 280,200 Z" fill="#2E7D32" stroke="#1B5E20" stroke-width="2"/>
        <!-- 잎사귀 2 -->
        <path d="M 276,170 Q 250,165 260,150 Q 275,160 273,170 Z" fill="#2E7D32" stroke="#1B5E20" stroke-width="2"/>
        
        <g id="tulip-head">
          <path d="M 250,120 C 250,140 290,140 290,120 C 290,105 280,100 270,110 C 260,100 250,105 250,120 Z" fill="#0288D1" stroke="#01579B" stroke-width="3"/>
          <path d="M 260,120 C 260,130 280,130 280,120 L 270,100 Z" fill="#29B6F6"/>
        </g>
        
        <!-- 꽃 3: 분홍 코스모스 (중앙) -->
        <path d="M 200,240 L 200,100" stroke="#4CAF50" stroke-width="6"/>
        <g id="cosmos-head">
          <!-- 잎사귀 -->
          <path d="M 200,160 Q 225,150 215,140 Q 200,150 200,160 Z" fill="#2E7D32" stroke="#1B5E20" stroke-width="2"/>
          
          <!-- 코스모스 8개 꽃잎 -->
          <g fill="#EC407A" stroke="#C2185B" stroke-width="2">
            <ellipse cx="200" cy="80" rx="10" ry="22"/>
            <ellipse cx="200" cy="120" rx="10" ry="22"/>
            <ellipse cx="180" cy="100" rx="22" ry="10"/>
            <ellipse cx="220" cy="100" rx="22" ry="10"/>
            <g transform="rotate(45, 200, 100)">
              <ellipse cx="200" cy="80" rx="10" ry="22"/>
              <ellipse cx="200" cy="120" rx="10" ry="22"/>
              <ellipse cx="180" cy="100" rx="22" ry="10"/>
              <ellipse cx="220" cy="100" rx="22" ry="10"/>
            </g>
          </g>
          <circle cx="200" cy="100" r="12" fill="#FFEE58" stroke="#FDD835" stroke-width="2"/>
        </g>
        
        <!-- 화분 -->
        <path d="M 140,230 L 260,230 L 240,285 L 160,285 Z" fill="url(#potGrad2)" stroke="#3E2723" stroke-width="4" stroke-linejoin="round"/>
        <!-- 화분의 빨간 하트 문양 (틀린 곳 2) -->
        <path id="pot-heart" d="M 200,250 C 195,242 185,242 185,250 C 185,258 200,268 200,268 C 200,268 215,258 215,250 C 215,242 205,242 200,250 Z" fill="#E53935"/>
        
        <!-- 날아다니는 나비 (틀린 곳 1) -->
        <g id="butterfly" transform="translate(60, 40)">
          <!-- 더듬이 -->
          <path d="M 0,0 Q -10,-15 -8,-25 M 0,0 Q 10,-15 8,-25" stroke="#3E2723" stroke-width="2" fill="none"/>
          <!-- 날개 -->
          <path d="M 0,0 C -25,-25 -40,5 -10,5 Z" fill="#FF7043" stroke="#D84315" stroke-width="2"/>
          <path d="M 0,0 C 25,-25 40,5 10,5 Z" fill="#FF7043" stroke="#D84315" stroke-width="2"/>
          <path d="M 0,0 C -20,20 -30,5 -8,5 Z" fill="#FF9100" stroke="#D84315" stroke-width="1.5"/>
          <path d="M 0,0 C 20,20 30,5 8,5 Z" fill="#FF9100" stroke="#D84315" stroke-width="1.5"/>
          <!-- 몸통 -->
          <ellipse cx="0" cy="0" rx="4" ry="12" fill="#3E2723"/>
        </g>
      </svg>
    `,
    svgAltered: `
      <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="skyGrad2-alt" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#E8F5E9"/>
            <stop offset="100%" stop-color="#C8E6C9"/>
          </linearGradient>
          <linearGradient id="potGrad2-alt" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stop-color="#7E57C2"/>
            <stop offset="100%" stop-color="#9575CD"/>
          </linearGradient>
        </defs>
        
        <!-- 연두빛 편안한 정원 배경 -->
        <rect width="400" height="300" fill="url(#skyGrad2-alt)"/>
        
        <!-- 뒤쪽 울타리 -->
        <g stroke="#8D6E63" stroke-width="4" fill="#D7CCC8">
          <rect x="20" y="80" width="16" height="150" rx="4"/>
          <rect x="70" y="80" width="16" height="150" rx="4"/>
          <rect x="120" y="80" width="16" height="150" rx="4"/>
          <rect x="170" y="80" width="16" height="150" rx="4"/>
          <rect x="220" y="80" width="16" height="150" rx="4"/>
          <rect x="270" y="80" width="16" height="150" rx="4"/>
          <rect x="320" y="80" width="16" height="150" rx="4"/>
          <rect x="370" y="80" width="16" height="150" rx="4"/>
          <!-- 가로대 -->
          <rect x="10" y="110" width="380" height="15"/>
          <rect x="10" y="190" width="380" height="15"/>
        </g>
        
        <!-- 흙더미 -->
        <ellipse cx="200" cy="250" rx="150" ry="25" fill="#5D4037"/>
        
        <!-- 꽃 1: 해바라기 (왼쪽) -->
        <path d="M 120,240 Q 110,180 120,130" stroke="#4CAF50" stroke-width="6" fill="none"/>
        <g id="sunflower-head">
          <!-- 잎사귀 -->
          <path d="M 115,190 Q 90,180 100,170 Q 115,180 117,190 Z" fill="#2E7D32" stroke="#1B5E20" stroke-width="2"/>
          <!-- 꽃잎들 -->
          <circle cx="120" cy="130" r="32" fill="#FFC107"/>
          <path d="M 120,90 L 120,170 M 80,130 L 160,130 M 92,102 L 148,158 M 92,158 L 148,102" stroke="#FFA000" stroke-width="8"/>
          <circle cx="120" cy="130" r="28" fill="#FFEB3B"/>
          <!-- 씨앗 부분 -->
          <circle cx="120" cy="130" r="16" fill="#5D4037"/>
        </g>
        
        <!-- 꽃 2: 튤립 (오른쪽) -->
        <path d="M 280,240 Q 290,180 270,130" stroke="#4CAF50" stroke-width="6" fill="none"/>
        <!-- [틀린곳 3] 튤립의 한쪽 잎사귀 제거됨 (오른쪽 하단 잎 삭제) -->
        
        <!-- 잎사귀 2 -->
        <path d="M 276,170 Q 250,165 260,150 Q 275,160 273,170 Z" fill="#2E7D32" stroke="#1B5E20" stroke-width="2"/>
        
        <g id="tulip-head">
          <path d="M 250,120 C 250,140 290,140 290,120 C 290,105 280,100 270,110 C 260,100 250,105 250,120 Z" fill="#0288D1" stroke="#01579B" stroke-width="3"/>
          <path d="M 260,120 C 260,130 280,130 280,120 L 270,100 Z" fill="#29B6F6"/>
        </g>
        
        <!-- 꽃 3: 분홍 코스모스 (중앙) -->
        <path d="M 200,240 L 200,100" stroke="#4CAF50" stroke-width="6"/>
        <g id="cosmos-head">
          <!-- 잎사귀 -->
          <path d="M 200,160 Q 225,150 215,140 Q 200,150 200,160 Z" fill="#2E7D32" stroke="#1B5E20" stroke-width="2"/>
          
          <!-- 코스모스 꽃잎들 -->
          <g fill="#EC407A" stroke="#C2185B" stroke-width="2">
            <ellipse cx="200" cy="80" rx="10" ry="22"/>
            <ellipse cx="200" cy="120" rx="10" ry="22"/>
            <ellipse cx="180" cy="100" rx="22" ry="10"/>
            <ellipse cx="220" cy="100" rx="22" ry="10"/>
            <g transform="rotate(45, 200, 100)">
              <ellipse cx="200" cy="80" rx="10" ry="22"/>
              <ellipse cx="200" cy="120" rx="10" ry="22"/>
              <ellipse cx="180" cy="100" rx="22" ry="10"/>
              <ellipse cx="220" cy="100" rx="22" ry="10"/>
            </g>
          </g>
          <circle cx="200" cy="100" r="12" fill="#FFEE58" stroke="#FDD835" stroke-width="2"/>
        </g>
        
        <!-- 화분 -->
        <path d="M 140,230 L 260,230 L 240,285 L 160,285 Z" fill="url(#potGrad2-alt)" stroke="#3E2723" stroke-width="4" stroke-linejoin="round"/>
        <!-- [틀린곳 2] 화분의 빨간 하트 제거됨 -->
        
        <!-- [틀린곳 1] 날아다니는 나비 통째로 제거됨 -->
      </svg>
    `,
    differences: [
      {
        id: "s2-butterfly",
        name: "하늘의 주황 나비",
        x: 15.0, // (60 / 400) * 100 (나비 중심은 60, 40 부근)
        y: 13.0,
        radius: 9.5,
        found: false
      },
      {
        id: "s2-heart",
        name: "화분 속 빨간 하트",
        x: 50.0, // (200 / 400) * 100
        y: 84.5, // (254 / 300) * 100
        radius: 8.5,
        found: false
      },
      {
        id: "s2-leaf",
        name: "오른쪽 꽃(튤립)의 잎사귀",
        x: 73.0, // (292 / 400) * 100
        y: 63.0, // (190 / 300) * 100
        radius: 8.0,
        found: false
      }
    ]
  },
  {
    stage: 3,
    title: "3단계: 복을 담은 복주머니",
    description: "오색 빛깔 고운 주머니, 가운데 황금 글씨, 그리고 바닥에 떨어진 보물들을 잘 살피세요.",
    encouragement: "멋집니다! 이번엔 어르신들께 복을 가득 가져다줄 '전통 복주머니' 도안입니다. 복을 듬뿍 찾아보세요!",
    winSpeech: "복을 듬뿍 다 찾아내셨네요! 어르신의 앞날에 늘 건강과 행복이 가득하실 겁니다!",
    svgOriginal: `
      <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="silkBg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#FFEBEE"/>
            <stop offset="100%" stop-color="#FFCDD2"/>
          </linearGradient>
          <linearGradient id="goldCoin" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#FFEE58"/>
            <stop offset="100%" stop-color="#F57F17"/>
          </linearGradient>
        </defs>
        
        <!-- 부드러운 분홍 비단 배경 -->
        <rect width="400" height="300" fill="url(#silkBg)"/>
        
        <!-- 은은한 한문 무늬 백그라운드 데코 -->
        <text x="50" y="80" font-family="serif" font-size="60" fill="#EF9A9A" opacity="0.15">喜</text>
        <text x="310" y="80" font-family="serif" font-size="60" fill="#EF9A9A" opacity="0.15">壽</text>
        <text x="50" y="250" font-family="serif" font-size="60" fill="#EF9A9A" opacity="0.15">康</text>
        <text x="310" y="250" font-family="serif" font-size="60" fill="#EF9A9A" opacity="0.15">寧</text>
        
        <!-- 전통 매듭 고리 (상단 뒷배경) -->
        <path d="M 200,60 L 200,10" stroke="#B71C1C" stroke-width="6" fill="none" stroke-linecap="round"/>
        <circle cx="200" cy="35" r="10" fill="none" stroke="#B71C1C" stroke-width="5"/>
        
        <!-- 복주머니 주름 및 매듭 끈 -->
        <g stroke="#3E2723" stroke-width="3">
          <!-- 왼쪽 묶음 끈 -->
          <path d="M 170,110 Q 130,100 120,120 Q 110,135 130,135 Q 170,135 170,110 Z" fill="#D84315"/>
          <!-- 오른쪽 묶음 끈 -->
          <path d="M 230,110 Q 270,100 280,120 Q 290,135 270,135 Q 230,135 230,110 Z" fill="#D84315"/>
          
          <!-- 왼쪽 매듭 끝에 매달린 구슬 (틀린 곳 4) -->
          <circle id="knot-bead" cx="120" cy="120" r="7" fill="#00E676" stroke="#1B5E20" stroke-width="2"/>
        </g>
        
        <!-- 복주머니 몸통 -->
        <g stroke="#3E2723" stroke-width="4" stroke-linejoin="round">
          <!-- 오색 줄무늬 채우기 (클립패스를 활용하면 좋으나 단순 셰이프로 구현) -->
          <!-- 주머니 몸체 실루엣: 아래는 뚱뚱하고 위는 묶인 주머니 모양 -->
          <path d="M 160,110 C 130,110 110,150 110,210 C 110,260 140,270 200,270 C 260,270 290,260 290,210 C 290,150 270,110 240,110 Z" fill="#D84315"/>
          
          <!-- 오색 세로 줄무늬 장식 -->
          <path d="M 130,150 C 130,200 145,255 160,266 C 150,260 140,250 135,230 Z" fill="#FFEB3B"/> <!-- 노랑 -->
          <path d="M 160,128 C 155,180 175,255 190,269 C 175,265 160,250 150,210 Z" fill="#4CAF50"/> <!-- 초록 -->
          <path d="M 240,128 C 245,180 225,255 210,269 C 225,265 240,250 250,210 Z" fill="#2196F3"/> <!-- 파랑 -->
          <path d="M 270,150 C 270,200 255,255 240,266 C 250,260 260,250 265,230 Z" fill="#E040FB"/> <!-- 보라 -->
        </g>
        
        <!-- 복주머니 목부분 주름 날개 -->
        <path d="M 160,110 C 150,90 170,80 180,95 C 190,80 210,80 220,95 C 230,80 250,90 240,110 Z" fill="#FFEB3B" stroke="#3E2723" stroke-width="3"/>
        
        <!-- 중앙 흰색 원판 데코 -->
        <circle cx="200" cy="195" r="34" fill="#FFFFFF" stroke="#3E2723" stroke-width="3"/>
        
        <!-- [틀린 곳 1] 가운데 황금 '福' 자 한문 -->
        <text id="gold-bok-text" x="200" y="210" font-family="serif" font-weight="900" font-size="42" fill="#FFC107" stroke="#FF8F00" stroke-width="2" text-anchor="middle">福</text>
        
        <!-- 아래쪽 늘어지는 전통 노리개 매듭 수술 (세 가닥) -->
        <g stroke="#3E2723" stroke-width="3">
          <!-- 매듭 중심판 -->
          <rect x="188" y="268" width="24" height="12" rx="4" fill="#FFC107"/>
          
          <!-- 수술 1 (왼쪽) -->
          <path d="M 193,280 L 193,298" stroke="#D84315" stroke-width="5" stroke-linecap="round"/>
          
          <!-- 수술 2 (오른쪽 - 틀린 곳 2: 2가닥으로 소멸될 부분) -->
          <path id="tassel-right" d="M 207,280 L 207,298" stroke="#D84315" stroke-width="5" stroke-linecap="round"/>
          
          <!-- 수술 3 (가운데) -->
          <path d="M 200,280 L 200,299" stroke="#FFEB3B" stroke-width="5" stroke-linecap="round"/>
        </g>
        
        <!-- 바닥에 떨어진 행운의 엽전 (틀린 곳 3 - 오른쪽 엽전 하나가 없어짐) -->
        <!-- 왼쪽 엽전 -->
        <g transform="translate(90, 245)">
          <circle cx="0" cy="0" r="14" fill="url(#goldCoin)" stroke="#FF8F00" stroke-width="2.5"/>
          <rect x="-4" y="-4" width="8" height="8" fill="#FFCDD2" stroke="#FF8F00" stroke-width="2"/>
        </g>
        
        <!-- 오른쪽 엽전 (틀린 곳 3) -->
        <g id="right-coin" transform="translate(305, 245)">
          <circle cx="0" cy="0" r="14" fill="url(#goldCoin)" stroke="#FF8F00" stroke-width="2.5"/>
          <rect x="-4" y="-4" width="8" height="8" fill="#FFCDD2" stroke="#FF8F00" stroke-width="2"/>
        </g>
      </svg>
    `,
    svgAltered: `
      <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="silkBg-alt" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#FFEBEE"/>
            <stop offset="100%" stop-color="#FFCDD2"/>
          </linearGradient>
          <linearGradient id="goldCoin-alt" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#FFEE58"/>
            <stop offset="100%" stop-color="#F57F17"/>
          </linearGradient>
        </defs>
        
        <!-- 부드러운 분홍 비단 배경 -->
        <rect width="400" height="300" fill="url(#silkBg-alt)"/>
        
        <!-- 은은한 한문 무늬 백그라운드 데코 -->
        <text x="50" y="80" font-family="serif" font-size="60" fill="#EF9A9A" opacity="0.15">喜</text>
        <text x="310" y="80" font-family="serif" font-size="60" fill="#EF9A9A" opacity="0.15">壽</text>
        <text x="50" y="250" font-family="serif" font-size="60" fill="#EF9A9A" opacity="0.15">康</text>
        <text x="310" y="250" font-family="serif" font-size="60" fill="#EF9A9A" opacity="0.15">寧</text>
        
        <!-- 전통 매듭 고리 -->
        <path d="M 200,60 L 200,10" stroke="#B71C1C" stroke-width="6" fill="none" stroke-linecap="round"/>
        <circle cx="200" cy="35" r="10" fill="none" stroke="#B71C1C" stroke-width="5"/>
        
        <!-- 복주머니 주름 및 매듭 끈 -->
        <g stroke="#3E2723" stroke-width="3">
          <!-- 왼쪽 묶음 끈 -->
          <path d="M 170,110 Q 130,100 120,120 Q 110,135 130,135 Q 170,135 170,110 Z" fill="#D84315"/>
          <!-- 오른쪽 묶음 끈 -->
          <path d="M 230,110 Q 270,100 280,120 Q 290,135 270,135 Q 230,135 230,110 Z" fill="#D84315"/>
          
          <!-- [틀린곳 4] 왼쪽 매듭 끝에 매달린 구슬 제거됨 -->
        </g>
        
        <!-- 복주머니 몸통 -->
        <g stroke="#3E2723" stroke-width="4" stroke-linejoin="round">
          <path d="M 160,110 C 130,110 110,150 110,210 C 110,260 140,270 200,270 C 260,270 290,260 290,210 C 290,150 270,110 240,110 Z" fill="#D84315"/>
          
          <!-- 오색 세로 줄무늬 장식 -->
          <path d="M 130,150 C 130,200 145,255 160,266 C 150,260 140,250 135,230 Z" fill="#FFEB3B"/>
          <path d="M 160,128 C 155,180 175,255 190,269 C 175,265 160,250 150,210 Z" fill="#4CAF50"/>
          <path d="M 240,128 C 245,180 225,255 210,269 C 225,265 240,250 250,210 Z" fill="#2196F3"/>
          <path d="M 270,150 C 270,200 255,255 240,266 C 250,260 260,250 265,230 Z" fill="#E040FB"/>
        </g>
        
        <!-- 복주머니 목부분 주름 날개 -->
        <path d="M 160,110 C 150,90 170,80 180,95 C 190,80 210,80 220,95 C 230,80 250,90 240,110 Z" fill="#FFEB3B" stroke="#3E2723" stroke-width="3"/>
        
        <!-- 중앙 흰색 원판 데코 -->
        <circle cx="200" cy="195" r="34" fill="#FFFFFF" stroke="#3E2723" stroke-width="3"/>
        
        <!-- [틀린곳 1] 가운데 황금 '福' 자 한글자 완전히 숨겨짐 (공백 처리) -->
        
        <!-- 아래쪽 늘어지는 전통 노리개 매듭 수술 (오른쪽 가닥 제거하여 2가닥만 남음) -->
        <g stroke="#3E2723" stroke-width="3">
          <rect x="188" y="268" width="24" height="12" rx="4" fill="#FFC107"/>
          
          <!-- 수술 1 (왼쪽) -->
          <path d="M 193,280 L 193,298" stroke="#D84315" stroke-width="5" stroke-linecap="round"/>
          
          <!-- [틀린곳 2] 수술 2(오른쪽 가닥) 제거됨 -->
          
          <!-- 수술 3 (가운데) -->
          <path d="M 200,280 L 200,299" stroke="#FFEB3B" stroke-width="5" stroke-linecap="round"/>
        </g>
        
        <!-- 바닥에 떨어진 행운의 엽전 (오른쪽 엽전이 제거됨) -->
        <g transform="translate(90, 245)">
          <circle cx="0" cy="0" r="14" fill="url(#goldCoin-alt)" stroke="#FF8F00" stroke-width="2.5"/>
          <rect x="-4" y="-4" width="8" height="8" fill="#FFCDD2" stroke="#FF8F00" stroke-width="2"/>
        </g>
        
        <!-- [틀린곳 3] 오른쪽 엽전 뭉치 통째로 삭제됨 -->
      </svg>
    `,
    differences: [
      {
        id: "s3-boktext",
        name: "주머니 가운데 한자 '복(福)'",
        x: 50.0, // (200 / 400) * 100
        y: 65.0, // (195 / 300) * 100
        radius: 9.0,
        found: false
      },
      {
        id: "s3-tassel",
        name: "노리개의 오른쪽 붉은 수술",
        x: 52.0, // (207 / 400) * 100
        y: 96.0, // (289 / 300) * 100
        radius: 8.0,
        found: false
      },
      {
        id: "s3-coin",
        name: "바닥 오른쪽의 노란 엽전",
        x: 76.0, // (305 / 400) * 100
        y: 82.0, // (245 / 300) * 100
        radius: 8.5,
        found: false
      },
      {
        id: "s3-bead",
        name: "왼쪽 묶음끈의 초록 구슬",
        x: 30.0, // (120 / 400) * 100
        y: 40.0, // (120 / 300) * 100
        radius: 8.0,
        found: false
      }
    ]
  },
  {
    stage: 4,
    title: "4단계: 따뜻한 옛날 아랫목",
    description: "뜨끈뜨끈 솜이불, 숭늉 끓는 주전자와 소반, 곤히 자는 고양이를 찾아보세요.",
    encouragement: "어머님, 아버님! 벌써 4단계네요! 겨울날 뜨끈한 아랫목 추억을 떠올리며 찾아볼까요?",
    winSpeech: "정말 감탄이 나옵니다! 그 옛날 아랫목처럼 가슴이 뭉클하고 따뜻해지는 실력이십니다!",
    svgOriginal: `
      <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="wallGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#EFEBE9"/>
            <stop offset="100%" stop-color="#D7CCC8"/>
          </linearGradient>
          <linearGradient id="floorGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#FFE082"/>
            <stop offset="100%" stop-color="#FFB300"/>
          </linearGradient>
        </defs>
        
        <!-- 한옥 방 벽면 -->
        <rect width="400" height="150" fill="url(#wallGrad)"/>
        <!-- 한옥 바닥 (황토 장판) -->
        <rect y="150" width="400" height="150" fill="url(#floorGrad)"/>
        
        <!-- 벽과 바닥 경계선 (나무 걸레받이) -->
        <rect y="142" width="400" height="8" fill="#5D4037"/>
        
        <!-- 벽면의 나무 기둥 데코 -->
        <rect x="40" y="0" width="20" height="142" fill="#5D4037" opacity="0.6"/>
        <rect x="340" y="0" width="20" height="142" fill="#5D4037" opacity="0.6"/>
        <rect x="0" y="20" width="400" height="12" fill="#5D4037" opacity="0.6"/>
        
        <!-- 벽면에 걸린 동양화 족자 -->
        <rect x="80" y="30" width="55" height="90" fill="#FFF8E1" stroke="#3E2723" stroke-width="3"/>
        <line x1="80" y1="120" x2="135" y2="120" stroke="#3E2723" stroke-width="5"/>
        <path d="M 90,100 C 100,70 110,80 120,60" stroke="#4E342E" stroke-width="2" fill="none"/>
        <circle cx="105" cy="55" r="4" fill="#C62828"/> <!-- 매화 원 포인트 -->
        <circle cx="115" cy="62" r="3" fill="#C62828"/>
        
        <!-- 한글 전통 반닫이 나무 궤짝 (구석 가구) -->
        <rect x="290" y="90" width="95" height="95" fill="#4E342E" stroke="#271714" stroke-width="4"/>
        <rect x="290" y="90" width="95" height="8" fill="#3E2723"/>
        <!-- 장식용 놋쇠 나비 쇠붙이 -->
        <path d="M 330,130 C 330,120 345,120 347,137 C 345,154 330,154 330,144 Z" fill="#CFD8DC" opacity="0.1"/>
        <circle cx="337" cy="137" r="10" fill="#FFD54F" stroke="#FFB300" stroke-width="2"/>
        <circle cx="337" cy="137" r="4" fill="#4E342E"/>
        
        <!-- 따뜻한 옛날 솜이불 (알록달록 국화/꽃무늬) -->
        <path d="M -20,300 C 20,230 100,200 170,200 C 210,200 240,240 240,300 Z" fill="#D32F2F" stroke="#3E2723" stroke-width="4"/>
        <!-- 이불 깃(동정) 흰 덮개 -->
        <path d="M 12,250 C 40,215 90,201 130,201 C 150,201 165,212 175,230 L 140,265 Z" fill="#FFFFFF" stroke="#3E2723" stroke-width="3"/>
        
        <!-- [틀린 곳 3] 이불 위의 노란 꽃 문양 (Altered에서는 꽃문양이 사라져 빨간 민무늬가 됨) -->
        <g id="quilt-flowers">
          <!-- 꽃 1 -->
          <path d="M 90,240 Q 80,225 90,220 Q 100,225 90,240 Z M 90,240 Q 105,235 110,245 Q 100,250 90,240 Z" fill="#FFCA28"/>
          <circle cx="95" cy="235" r="4" fill="#FF8F00"/>
          <!-- 꽃 2 -->
          <path d="M 140,270 Q 130,255 140,250 Q 150,255 140,270 Z" fill="#FFCA28"/>
          <circle cx="140" cy="260" r="4" fill="#FF8F00"/>
        </g>
        
        <!-- 따끈따끈 소반 (나무 밥상) -->
        <g stroke="#3E2723" stroke-width="3.5" stroke-linejoin="round">
          <!-- 밥상판 -->
          <ellipse cx="230" cy="195" rx="55" ry="14" fill="#5D4037"/>
          <ellipse cx="230" cy="192" rx="55" ry="12" fill="#8D6E63"/>
          
          <!-- 밥상 다리들 (오리지널은 4개 다리가 확실히 보임) -->
          <!-- 왼쪽 뒷다리 -->
          <path d="M 185,198 L 180,230" stroke-linecap="round"/>
          <!-- 오른쪽 뒷다리 -->
          <path d="M 275,198 L 280,230" stroke-linecap="round"/>
          <!-- 왼쪽 앞다리 -->
          <path d="M 195,202 L 190,242 L 202,242" fill="none" stroke-width="4.5" stroke-linecap="round"/>
          
          <!-- [틀린 곳 4] 오른쪽 앞다리 (Altered에서는 이 다리가 통째로 없음) -->
          <path id="table-leg-right-front" d="M 265,202 L 270,242 L 258,242" fill="none" stroke-width="4.5" stroke-linecap="round"/>
        </g>
        
        <!-- 양은 주전자 (소반 위에 얹힘) -->
        <g stroke="#3E2723" stroke-width="3">
          <!-- 주전자 몸통 -->
          <path d="M 210,185 C 210,165 245,165 245,185 Z" fill="#FFE082"/>
          <!-- 뚜껑 -->
          <ellipse cx="227.5" cy="165" rx="12" ry="4" fill="#FFCA28"/>
          <circle cx="227.5" cy="161" r="3.5" fill="#FF8F00"/>
          <!-- 손잡이 -->
          <path d="M 212,170 C 210,140 245,140 243,170" fill="none" stroke-width="4"/>
          <!-- 주둥이 -->
          <path d="M 210,180 L 195,168 L 197,163 L 212,175 Z" fill="#FFE082"/>
          
          <!-- [틀린 곳 1] 주전자 주둥이에서 나오는 모락모락 온기 김 3줄 -->
          <g id="steam-lines">
            <path d="M 193,158 Q 188,145 195,135" fill="none" stroke="#B0BEC5" stroke-width="3" stroke-linecap="round"/>
            <path d="M 187,162 Q 180,150 188,140" fill="none" stroke="#B0BEC5" stroke-width="2.5" stroke-linecap="round"/>
            <path d="M 199,155 Q 195,148 200,142" fill="none" stroke="#B0BEC5" stroke-width="2" stroke-linecap="round"/>
          </g>
        </g>
        
        <!-- 소반 밑에서 곤히 자고 있는 아기 삼색 고양이 -->
        <g id="sleeping-cat" transform="translate(230, 235)">
          <!-- 고양이 꼬리 (틀린 곳 2 - Altered에서는 꼬리가 없어짐) -->
          <path id="cat-tail" d="M 35,5 Q 45,-15 32,-25 Q 22,-20 30,-5" fill="#E65100" stroke="#3E2723" stroke-width="2"/>
          
          <!-- 고양이 몸체 (둥글게 만 모양) -->
          <ellipse cx="10" cy="5" rx="28" ry="18" fill="#FFFFFF" stroke="#3E2723" stroke-width="3"/>
          <path d="M -10,0 C -5,-10 10,-10 15,2 Q 3,12 -10,0" fill="#E65100"/> <!-- 삼색 점 1 (주황) -->
          <path d="M 15,-5 C 20,-12 30,-5 25,6" fill="#3E2723"/> <!-- 삼색 점 2 (검정) -->
          
          <!-- 고양이 머리 -->
          <circle cx="-12" cy="0" r="14" fill="#FFFFFF" stroke="#3E2723" stroke-width="3"/>
          <path d="M -23,-5 L -26,-15 L -16,-10 Z" fill="#E65100" stroke="#3E2723" stroke-width="2"/> <!-- 귀 1 -->
          <path d="M -6,-5 L -3,-15 L -9,-10 Z" fill="#FFFFFF" stroke="#3E2723" stroke-width="2"/> <!-- 귀 2 -->
          
          <!-- 감은 두 눈 -->
          <path d="M -20,2 Q -17,5 -15,2" fill="none" stroke="#3E2723" stroke-width="2" stroke-linecap="round"/>
          <path d="M -11,2 Q -8,5 -6,2" fill="none" stroke="#3E2723" stroke-width="2" stroke-linecap="round"/>
          <!-- 코 -->
          <polygon points="-14,4 -12,4 -13,6" fill="#FF8A80"/>
        </g>
      </svg>
    `,
    svgAltered: `
      <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="wallGrad-alt" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#EFEBE9"/>
            <stop offset="100%" stop-color="#D7CCC8"/>
          </linearGradient>
          <linearGradient id="floorGrad-alt" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#FFE082"/>
            <stop offset="100%" stop-color="#FFB300"/>
          </linearGradient>
        </defs>
        
        <!-- 한옥 방 벽면 -->
        <rect width="400" height="150" fill="url(#wallGrad-alt)"/>
        <!-- 한옥 바닥 (황토 장판) -->
        <rect y="150" width="400" height="150" fill="url(#floorGrad-alt)"/>
        
        <!-- 벽과 바닥 경계선 (나무 걸레받이) -->
        <rect y="142" width="400" height="8" fill="#5D4037"/>
        
        <!-- 벽면의 나무 기둥 데코 -->
        <rect x="40" y="0" width="20" height="142" fill="#5D4037" opacity="0.6"/>
        <rect x="340" y="0" width="20" height="142" fill="#5D4037" opacity="0.6"/>
        <rect x="0" y="20" width="400" height="12" fill="#5D4037" opacity="0.6"/>
        
        <!-- 벽면에 걸린 동양화 족자 -->
        <rect x="80" y="30" width="55" height="90" fill="#FFF8E1" stroke="#3E2723" stroke-width="3"/>
        <line x1="80" y1="120" x2="135" y2="120" stroke="#3E2723" stroke-width="5"/>
        <path d="M 90,100 C 100,70 110,80 120,60" stroke="#4E342E" stroke-width="2" fill="none"/>
        <circle cx="105" cy="55" r="4" fill="#C62828"/>
        <circle cx="115" cy="62" r="3" fill="#C62828"/>
        
        <!-- 한글 전통 반닫이 나무 궤짝 -->
        <rect x="290" y="90" width="95" height="95" fill="#4E342E" stroke="#271714" stroke-width="4"/>
        <rect x="290" y="90" width="95" height="8" fill="#3E2723"/>
        <circle cx="337" cy="137" r="10" fill="#FFD54F" stroke="#FFB300" stroke-width="2"/>
        <circle cx="337" cy="137" r="4" fill="#4E342E"/>
        
        <!-- 따뜻한 옛날 솜이불 (알록달록 국화/꽃무늬) -->
        <path d="M -20,300 C 20,230 100,200 170,200 C 210,200 240,240 240,300 Z" fill="#D32F2F" stroke="#3E2723" stroke-width="4"/>
        <!-- 이불 깃(동정) 흰 덮개 -->
        <path d="M 12,250 C 40,215 90,201 130,201 C 150,201 165,212 175,230 L 140,265 Z" fill="#FFFFFF" stroke="#3E2723" stroke-width="3"/>
        
        <!-- [틀린 곳 3] 이불 위의 꽃 문양들이 완전히 제거되어 빨간 민이불이 됨 -->
        
        <!-- 따끈따끈 소반 -->
        <g stroke="#3E2723" stroke-width="3.5" stroke-linejoin="round">
          <!-- 밥상판 -->
          <ellipse cx="230" cy="195" rx="55" ry="14" fill="#5D4037"/>
          <ellipse cx="230" cy="192" rx="55" ry="12" fill="#8D6E63"/>
          
          <!-- 밥상 다리들 -->
          <!-- 왼쪽 뒷다리 -->
          <path d="M 185,198 L 180,230" stroke-linecap="round"/>
          <!-- 오른쪽 뒷다리 -->
          <path d="M 275,198 L 280,230" stroke-linecap="round"/>
          <!-- 왼쪽 앞다리 -->
          <path d="M 195,202 L 190,242 L 202,242" fill="none" stroke-width="4.5" stroke-linecap="round"/>
          
          <!-- [틀린 곳 4] 오른쪽 앞다리가 통째로 소멸됨 -->
        </g>
        
        <!-- 양은 주전자 (소반 위에 얹힘) -->
        <g stroke="#3E2723" stroke-width="3">
          <!-- 주전자 몸통 -->
          <path d="M 210,185 C 210,165 245,165 245,185 Z" fill="#FFE082"/>
          <!-- 뚜껑 -->
          <ellipse cx="227.5" cy="165" rx="12" ry="4" fill="#FFCA28"/>
          <circle cx="227.5" cy="161" r="3.5" fill="#FF8F00"/>
          <!-- 손잡이 -->
          <path d="M 212,170 C 210,140 245,140 243,170" fill="none" stroke-width="4"/>
          <!-- 주둥이 -->
          <path d="M 210,180 L 195,168 L 197,163 L 212,175 Z" fill="#FFE082"/>
          
          <!-- [틀린 곳 1] 모락모락 김 3줄 완전히 제거됨 -->
        </g>
        
        <!-- 소반 밑에서 곤히 자고 있는 아기 삼색 고양이 -->
        <g id="sleeping-cat" transform="translate(230, 235)">
          <!-- [틀린 곳 2] 고양이 꼬리 완전히 지워짐 -->
          
          <!-- 고양이 몸체 -->
          <ellipse cx="10" cy="5" rx="28" ry="18" fill="#FFFFFF" stroke="#3E2723" stroke-width="3"/>
          <path d="M -10,0 C -5,-10 10,-10 15,2 Q 3,12 -10,0" fill="#E65100"/>
          <path d="M 15,-5 C 20,-12 30,-5 25,6" fill="#3E2723"/>
          
          <!-- 고양이 머리 -->
          <circle cx="-12" cy="0" r="14" fill="#FFFFFF" stroke="#3E2723" stroke-width="3"/>
          <path d="M -23,-5 L -26,-15 L -16,-10 Z" fill="#E65100" stroke="#3E2723" stroke-width="2"/>
          <path d="M -6,-5 L -3,-15 L -9,-10 Z" fill="#FFFFFF" stroke="#3E2723" stroke-width="2"/>
          
          <!-- 감은 두 눈 -->
          <path d="M -20,2 Q -17,5 -15,2" fill="none" stroke="#3E2723" stroke-width="2" stroke-linecap="round"/>
          <path d="M -11,2 Q -8,5 -6,2" fill="none" stroke="#3E2723" stroke-width="2" stroke-linecap="round"/>
          <!-- 코 -->
          <polygon points="-14,4 -12,4 -13,6" fill="#FF8A80"/>
        </g>
      </svg>
    `,
    differences: [
      {
        id: "s4-steam",
        name: "주전자의 뜨거운 김",
        x: 48.0, // (192 / 400) * 100
        y: 49.0, // (148 / 300) * 100
        radius: 8.5,
        found: false
      },
      {
        id: "s4-tail",
        name: "잠자는 고양이의 꼬리",
        x: 66.0, // ((230 + 34) / 400) * 100
        y: 72.0, // ((235 - 18) / 300) * 100
        radius: 8.0,
        found: false
      },
      {
        id: "s4-quiltpattern",
        name: "빨간 솜이불의 노란 꽃무늬",
        x: 28.0, // (112 / 400) * 100
        y: 82.0, // (246 / 300) * 100
        radius: 9.5,
        found: false
      },
      {
        id: "s4-tableleg",
        name: "나무 밥상의 오른쪽 앞다리",
        x: 66.0, // (264 / 400) * 100
        y: 74.0, // (222 / 300) * 100
        radius: 8.0,
        found: false
      }
    ]
  },
  {
    stage: 5,
    title: "5단계: 아름다운 나라꽃 무궁화",
    description: "한지 위에 핀 탐스러운 무궁화, 작은 꽃봉오리와 잎사귀 위 귀여운 벌레를 관찰해보세요.",
    encouragement: "대망의 마지막 5단계입니다! 우리 나라꽃 무궁화를 보시며 5개의 틀린 곳을 찾아보세요. 화이팅!",
    winSpeech: "축하드립니다! 5단계를 모두 정복하셨습니다! 어르신은 십 년은 더 젊고 영리한 뇌를 가지셨어요!",
    svgOriginal: `
      <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="hanjiPaper" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#FFFDE7"/>
            <stop offset="100%" stop-color="#F5F5DC"/>
          </radialGradient>
          <linearGradient id="roseGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#FFF0F5"/>
            <stop offset="100%" stop-color="#FFC0CB"/>
          </linearGradient>
        </defs>
        
        <!-- 고급 한지 무늬 배경 -->
        <rect width="400" height="300" fill="url(#hanjiPaper)"/>
        
        <!-- 한지 텍스처 느낌의 데코 라인들 -->
        <path d="M 0,10 L 400,250 M 50,300 L 380,0" stroke="#D7CCC8" stroke-width="0.7" opacity="0.3"/>
        
        <!-- 우아한 붓글씨 풍 나뭇가지 -->
        <path d="M 50,220 C 120,210 180,150 280,170 C 310,175 350,150 380,110" fill="none" stroke="#3E2723" stroke-width="8" stroke-linecap="round"/>
        <!-- 곁가지 -->
        <path d="M 180,180 C 190,140 210,110 230,90" fill="none" stroke="#3E2723" stroke-width="5" stroke-linecap="round"/>
        
        <!-- [틀린 곳 5] 가지 아래 돋아난 아주 작은 잔잎 (Altered에서는 소멸) -->
        <path id="branch-tiny-leaf" d="M 130,210 Q 115,230 135,235 Z" fill="#2E7D32" stroke="#1B5E20" stroke-width="1.5"/>
        
        <!-- 무궁화 잎사귀들 -->
        <!-- 잎 1 -->
        <path d="M 90,215 Q 70,180 95,170 Q 110,195 90,215 Z" fill="#388E3C" stroke="#1B5E20" stroke-width="2"/>
        <!-- 잎 2 (물방울이 맺힌 잎) -->
        <path d="M 230,175 Q 260,195 240,215 Q 220,200 230,175 Z" fill="#2E7D32" stroke="#1B5E20" stroke-width="2"/>
        
        <!-- [틀린 곳 4] 잎 2 위의 맑은 아침 이슬 물방울 (Altered에서는 소멸) -->
        <circle id="leaf-dewdrop" cx="240" cy="195" r="5" fill="#E0F7FA" opacity="0.8" stroke="#00838F" stroke-width="1"/>
        
        <!-- 잎 3 (무당벌레가 앉은 잎) -->
        <path d="M 290,165 Q 330,190 320,150 Q 290,140 290,165 Z" fill="#2E7D32" stroke="#1B5E20" stroke-width="2"/>
        
        <!-- [틀린 곳 1] 잎 3 위의 빨간 무당벌레 (Altered에서는 소멸) -->
        <g id="ladybug" transform="translate(308, 160)">
          <!-- 다리들 -->
          <line x1="-8" y1="-2" x2="8" y2="2" stroke="#000" stroke-width="1.5"/>
          <line x1="-8" y1="2" x2="8" y2="-2" stroke="#000" stroke-width="1.5"/>
          <!-- 몸체 -->
          <circle cx="0" cy="0" r="7" fill="#D32F2F" stroke="#000" stroke-width="1.5"/>
          <!-- 등 줄무늬 및 점들 -->
          <line x1="0" y1="-7" x2="0" y2="7" stroke="#000" stroke-width="1.5"/>
          <circle cx="-3" cy="-2" r="1.5" fill="#000"/>
          <circle cx="3" cy="2" r="1.5" fill="#000"/>
          <circle cx="-3" cy="3" r="1.5" fill="#000"/>
          <circle cx="3" cy="-3" r="1.5" fill="#000"/>
          <!-- 머리 -->
          <circle cx="5" cy="-5" r="3.5" fill="#000"/>
        </g>
        
        <!-- 무궁화 1: 활짝 핀 큰 꽃 (왼쪽 상단) -->
        <g id="hibiscus-big" transform="translate(160, 110)">
          <!-- 5개 분홍 꽃잎 -->
          <g stroke="#C2185B" stroke-width="2">
            <path d="M 0,0 C -35,-45 -65,-5 0,0 Z" fill="url(#roseGrad)"/>
            <path d="M 0,0 C -45,25 -5,55 0,0 Z" fill="url(#roseGrad)"/>
            <path d="M 0,0 C 25,45 55,5 0,0 Z" fill="url(#roseGrad)"/>
            <path d="M 0,0 C 45,-25 5,-55 0,0 Z" fill="url(#roseGrad)"/>
            <path d="M 0,0 C -15,-55 35,-50 0,0 Z" fill="url(#roseGrad)"/>
          </g>
          <!-- 붉은 단심 (가운데 진한 붉은색 영역) -->
          <circle cx="0" cy="0" r="15" fill="#C2185B" opacity="0.9"/>
          <path d="M 0,0 C -5,-5 -8,-1 0,0 M 0,0 C 5,5 8,1 0,0" stroke="#880E4F" stroke-width="3"/>
          
          <!-- 길게 뻗은 연노란 암술대 및 노란 꽃가루들 (틀린 곳 3 - 꽃가루 수술 끝 가루들이 소멸함) -->
          <line x1="0" y1="0" x2="20" y2="-22" stroke="#FFF9C4" stroke-width="5" stroke-linecap="round"/>
          
          <!-- 수술 끝 노란 꽃가루들 -->
          <g id="stamen-pollen">
            <circle cx="21" cy="-24" r="3.5" fill="#FDD835" stroke="#F57F17" stroke-width="1"/>
            <circle cx="15" cy="-21" r="2.5" fill="#FDD835"/>
            <circle cx="23" cy="-17" r="2.5" fill="#FDD835"/>
          </g>
        </g>
        
        <!-- 무궁화 2: 약간 비스듬한 중간 꽃 (오른쪽 상단) -->
        <g id="hibiscus-mid" transform="translate(290, 80)">
          <g stroke="#C2185B" stroke-width="2">
            <path d="M 0,0 C -25,-30 -45,-3 0,0 Z" fill="url(#roseGrad)"/>
            <path d="M 0,0 C -30,20 -3,40 0,0 Z" fill="url(#roseGrad)"/>
            <path d="M 0,0 C 20,30 40,3 0,0 Z" fill="url(#roseGrad)"/>
            <path d="M 0,0 C 30,-20 3,-40 0,0 Z" fill="url(#roseGrad)"/>
            <path d="M 0,0 C -10,-40 25,-35 0,0 Z" fill="url(#roseGrad)"/>
          </g>
          <circle cx="0" cy="0" r="11" fill="#C2185B" opacity="0.9"/>
          <!-- 꽃가루 암술 -->
          <line x1="0" y1="0" x2="12" y2="-12" stroke="#FFF9C4" stroke-width="3"/>
          <circle cx="13" cy="-14" r="2" fill="#FDD835"/>
        </g>
        
        <!-- [틀린 곳 2] 아직 피지 않은 이슬 머금은 보라빛 꽃봉오리 (Altered에서는 소멸) -->
        <g id="flower-bud" transform="translate(225, 75)">
          <path d="M 0,25 Q -10,12 0,0 Q 10,12 0,25 Z" fill="#BA68C8" stroke="#4A148C" stroke-width="2.5"/>
          <path d="M -5,28 Q -8,18 0,16 Q 8,18 5,28 Z" fill="#2E7D32" stroke="#1B5E20" stroke-width="1.5"/>
          <!-- 봉오리 대 -->
          <path d="M 0,27 L 3,38" stroke="#3E2723" stroke-width="3"/>
        </g>
      </svg>
    `,
    svgAltered: `
      <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="hanjiPaper-alt" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#FFFDE7"/>
            <stop offset="100%" stop-color="#F5F5DC"/>
          </radialGradient>
          <linearGradient id="roseGrad-alt" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#FFF0F5"/>
            <stop offset="100%" stop-color="#FFC0CB"/>
          </linearGradient>
        </defs>
        
        <!-- 고급 한지 무늬 배경 -->
        <rect width="400" height="300" fill="url(#hanjiPaper-alt)"/>
        
        <!-- 한지 텍스처 느낌의 데코 라인들 -->
        <path d="M 0,10 L 400,250 M 50,300 L 380,0" stroke="#D7CCC8" stroke-width="0.7" opacity="0.3"/>
        
        <!-- 우아한 붓글씨 풍 나뭇가지 -->
        <path d="M 50,220 C 120,210 180,150 280,170 C 310,175 350,150 380,110" fill="none" stroke="#3E2723" stroke-width="8" stroke-linecap="round"/>
        <!-- 곁가지 -->
        <path d="M 180,180 C 190,140 210,110 230,90" fill="none" stroke="#3E2723" stroke-width="5" stroke-linecap="round"/>
        
        <!-- [틀린곳 5] 가지 아래 돋아난 아주 작은 잔잎 삭제됨 -->
        
        <!-- 무궁화 잎사귀들 -->
        <!-- 잎 1 -->
        <path d="M 90,215 Q 70,180 95,170 Q 110,195 90,215 Z" fill="#388E3C" stroke="#1B5E20" stroke-width="2"/>
        <!-- 잎 2 -->
        <path d="M 230,175 Q 260,195 240,215 Q 220,200 230,175 Z" fill="#2E7D32" stroke="#1B5E20" stroke-width="2"/>
        
        <!-- [틀린곳 4] 잎 2 위의 맑은 이슬 물방울 제거됨 -->
        
        <!-- 잎 3 -->
        <path d="M 290,165 Q 330,190 320,150 Q 290,140 290,165 Z" fill="#2E7D32" stroke="#1B5E20" stroke-width="2"/>
        
        <!-- [틀린곳 1] 빨간 무당벌레 완전히 제거됨 -->
        
        <!-- 무궁화 1: 활짝 핀 큰 꽃 (왼쪽 상단) -->
        <g id="hibiscus-big" transform="translate(160, 110)">
          <!-- 5개 분홍 꽃잎 -->
          <g stroke="#C2185B" stroke-width="2">
            <path d="M 0,0 C -35,-45 -65,-5 0,0 Z" fill="url(#roseGrad-alt)"/>
            <path d="M 0,0 C -45,25 -5,55 0,0 Z" fill="url(#roseGrad-alt)"/>
            <path d="M 0,0 C 25,45 55,5 0,0 Z" fill="url(#roseGrad-alt)"/>
            <path d="M 0,0 C 45,-25 5,-55 0,0 Z" fill="url(#roseGrad-alt)"/>
            <path d="M 0,0 C -15,-55 35,-50 0,0 Z" fill="url(#roseGrad-alt)"/>
          </g>
          <!-- 붉은 단심 -->
          <circle cx="0" cy="0" r="15" fill="#C2185B" opacity="0.9"/>
          <path d="M 0,0 C -5,-5 -8,-1 0,0 M 0,0 C 5,5 8,1 0,0" stroke="#880E4F" stroke-width="3"/>
          
          <!-- 길게 뻗은 연노란 암술대 (끝의 노란 가루들 수술 뭉치는 제거됨) -->
          <line x1="0" y1="0" x2="20" y2="-22" stroke="#FFF9C4" stroke-width="5" stroke-linecap="round"/>
          
          <!-- [틀린곳 3] 수술 끝 노란 꽃가루들 제거됨 -->
        </g>
        
        <!-- 무궁화 2: 중간 꽃 -->
        <g id="hibiscus-mid" transform="translate(290, 80)">
          <g stroke="#C2185B" stroke-width="2">
            <path d="M 0,0 C -25,-30 -45,-3 0,0 Z" fill="url(#roseGrad-alt)"/>
            <path d="M 0,0 C -30,20 -3,40 0,0 Z" fill="url(#roseGrad-alt)"/>
            <path d="M 0,0 C 20,30 40,3 0,0 Z" fill="url(#roseGrad-alt)"/>
            <path d="M 0,0 C 30,-20 3,-40 0,0 Z" fill="url(#roseGrad-alt)"/>
            <path d="M 0,0 C -10,-40 25,-35 0,0 Z" fill="url(#roseGrad-alt)"/>
          </g>
          <circle cx="0" cy="0" r="11" fill="#C2185B" opacity="0.9"/>
          <!-- 꽃가루 암술 -->
          <line x1="0" y1="0" x2="12" y2="-12" stroke="#FFF9C4" stroke-width="3"/>
          <circle cx="13" cy="-14" r="2" fill="#FDD835"/>
        </g>
        
        <!-- [틀린곳 2] 보라빛 꽃봉오리 전체 소멸됨 -->
      </svg>
    `,
    differences: [
      {
        id: "s5-bug",
        name: "초록 잎새 위 빨간 무당벌레",
        x: 77.0, // (308 / 400) * 100
        y: 53.0, // (160 / 300) * 100
        radius: 8.5,
        found: false
      },
      {
        id: "s5-bud",
        name: "가지 뒤쪽 보라색 꽃봉오리",
        x: 56.0, // (225 / 400) * 100
        y: 29.0, // (87 / 300) * 100
        radius: 9.0,
        found: false
      },
      {
        id: "s5-pollen",
        name: "큰 무궁화 수술 끝의 노란 꽃가루",
        x: 45.0, // ((160 + 20) / 400) * 100
        y: 29.0, // ((110 - 22) / 300) * 100
        radius: 8.5,
        found: false
      },
      {
        id: "s5-dewdrop",
        name: "가운데 잎새 위 맑은 물방울",
        x: 60.0, // (240 / 400) * 100
        y: 65.0, // (195 / 300) * 100
        radius: 8.0,
        found: false
      },
      {
        id: "s5-tinyleaf",
        name: "굵은 나뭇가지 밑의 아기 잎사귀",
        x: 32.5, // (130 / 400) * 100
        y: 74.0, // (222 / 300) * 100
        radius: 8.0,
        found: false
      }
    ]
  }
];

// 다른 모듈에서 임포트 가능하도록 브라우저 전역에 노출 또는 모듈식 내보내기 지원
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { gameLevels };
} else {
  window.gameLevels = gameLevels;
}
