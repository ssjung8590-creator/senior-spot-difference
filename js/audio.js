// 시니어 맞춤형 틀린그림찾기 앱 - Web Audio API 오디오 엔진 (audio.js)
// 컨셉: 무겁고 로딩이 느린 MP3 파일 없이, 브라우저 순수 기술로 가야금/실로폰 느낌의 맑은 소리를 합성 재생합니다.

class AudioEngine {
  constructor() {
    this.ctx = null;
    this.bgmVolumeNode = null;
    this.sfxVolumeNode = null;
    
    // BGM 상태 관리
    this.bgmPlaying = false;
    this.bgmSequencerId = null;
    this.isMuted = false;
    
    // 한국 전통 국악 5음계 (궁, 상, 각, 치, 우) 기반의 맑은 주파수 테이블 (평조 5음계: C, D, F, G, A 계열)
    // 4옥타브 ~ 5옥타브 가야금 음역대
    this.scale = {
      C4: 261.63, D4: 293.66, F4: 349.23, G4: 392.00, A4: 440.00,
      C5: 523.25, D5: 587.33, F5: 698.46, G5: 783.99, A5: 880.00,
      C6: 1046.50, D6: 1174.66, F6: 1396.91, G6: 1567.98, A6: 1760.00
    };
    
    // 전통 선율의 잔잔한 BGM 노트 배열 (G4 ~ A5 음역대)
    this.bgmMelody = [
      "G4", "A4", "C5", "D5", "F5", "D5", "C5", "A4",
      "C5", "D5", "F5", "G5", "A5", "G5", "F5", "D5",
      "A4", "C5", "D5", "A4", "G4", "F4", "G4", "A4",
      "C5", "F5", "D5", "G5", "F5", "D5", "C5", "G4"
    ];
    this.bgmIndex = 0;
  }

  // 사용자 인터랙션 직후 오디오 컨텍스트 초기화 (브라우저 자동재생 차단 방지)
  init() {
    if (this.ctx) return;
    
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
      
      // 메인 볼륨 컨트롤 노드 생성
      this.bgmVolumeNode = this.ctx.createGain();
      this.sfxVolumeNode = this.ctx.createGain();
      
      this.bgmVolumeNode.gain.setValueAtTime(0.08, this.ctx.currentTime); // 배경음은 아주 잔잔하게 (8%)
      this.sfxVolumeNode.gain.setValueAtTime(0.35, this.ctx.currentTime); // 효과음은 명확하게 (35%)
      
      this.bgmVolumeNode.connect(this.ctx.destination);
      this.sfxVolumeNode.connect(this.ctx.destination);
    } catch (e) {
      console.warn("이 브라우저는 Web Audio API를 지원하지 않습니다.", e);
    }
  }

  // 오디오 컨텍스트 재개
  resumeContext() {
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  // -------------------------------------------------------------
  // 1. 소리 합성기 (가야금 & 맑은 실로폰 톤 합성)
  // -------------------------------------------------------------
  playTone(freq, type = "sine", duration = 1.0, isBgm = false) {
    if (!this.ctx || this.isMuted) return;
    this.resumeContext();

    const osc = this.ctx.createOscillator();
    const gainNode = this.ctx.createGain();
    
    osc.type = type;
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

    // 전통 현악기(가야금) 특유의 살짝 뜯는 소리를 만들기 위한 엔벨로프
    // 빠른 공격(Attack), 완만한 쇠퇴(Decay) 및 긴 꼬리(Release)
    const now = this.ctx.currentTime;
    gainNode.gain.setValueAtTime(0, now);
    
    if (type === "triangle") {
      // 가야금/가볍고 따뜻한 뜯는 톤
      gainNode.gain.linearRampToValueAtTime(0.7, now + 0.03); // 빠른 어택
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + duration); // 완만한 쇠퇴
    } else if (type === "sine") {
      // 맑은 물방울/실로폰 톤
      gainNode.gain.linearRampToValueAtTime(0.8, now + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + duration);
    } else {
      // 기타 노이즈/이펙트용
      gainNode.gain.linearRampToValueAtTime(0.5, now + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + duration);
    }

    osc.connect(gainNode);
    
    // BGM 볼륨인지 SFX 볼륨인지에 따라 노드 연결 분기
    if (isBgm) {
      gainNode.connect(this.bgmVolumeNode);
    } else {
      gainNode.connect(this.sfxVolumeNode);
    }

    osc.start(now);
    osc.stop(now + duration);
  }

  // -------------------------------------------------------------
  // 2. 개별 효과음 재생 로직 (맑은 동그라미 성공음, 은은한 클릭음)
  // -------------------------------------------------------------
  
  // 성공 효과음 (맑고 투명한 종소리가 3연음으로 위로 솟아오름 - 대만족감 유도)
  playSuccess() {
    this.init();
    if (!this.ctx || this.isMuted) return;
    
    const now = this.ctx.currentTime;
    const notes = ["C5", "F5", "C6"];
    
    notes.forEach((note, index) => {
      setTimeout(() => {
        const freq = this.scale[note];
        this.playTone(freq, "sine", 1.2, false);
      }, index * 120); // 120ms 간격으로 경쾌한 연음 연주
    });
  }

  // 오클릭 실패 효과음 (스트레스 없는 극도로 부드러운 저음의 '통' 소리)
  playMiss() {
    this.init();
    if (!this.ctx || this.isMuted) return;
    // 아주 낮은 130Hz 주파수의 부드러운 삼각파음으로 경고가 아닌 단순 촉각적 피드백 제공
    this.playTone(130, "triangle", 0.18, false);
  }

  // 힌트 재생 소리 (신비로운 바람 종소리 연출)
  playHint() {
    this.init();
    if (!this.ctx || this.isMuted) return;
    
    const notes = ["C6", "A5", "F5", "D5"];
    notes.forEach((note, index) => {
      setTimeout(() => {
        const freq = this.scale[note];
        this.playTone(freq, "sine", 0.8, false);
      }, index * 90);
    });
  }

  // 스테이지 완전 클리어 축하 팡파르 (다채로운 전통 5음계 멜로디의 하모니)
  playStageClear() {
    this.init();
    if (!this.ctx || this.isMuted) return;

    const clearMelody = [
      { note: "C5", delay: 0 },
      { note: "F5", delay: 100 },
      { note: "A5", delay: 200 },
      { note: "C6", delay: 300 },
      { note: "D6", delay: 450 },
      { note: "F6", delay: 600 },
      { note: "G6", delay: 750 },
      { note: "A6", delay: 900 }
    ];

    clearMelody.forEach(item => {
      setTimeout(() => {
        const freq = this.scale[item.note];
        this.playTone(freq, "sine", 1.5, false);
      }, item.delay);
    });
  }

  // -------------------------------------------------------------
  // 3. 은은한 가야금풍 배경 음악 (BGM) 자동 시퀀서
  // -------------------------------------------------------------
  startBGM() {
    this.init();
    if (!this.ctx || this.bgmPlaying || this.isMuted) return;
    
    this.bgmPlaying = true;
    this.resumeContext();

    const playNextBgmNote = () => {
      if (!this.bgmPlaying) return;
      
      const noteName = this.bgmMelody[this.bgmIndex];
      const freq = this.scale[noteName];
      
      // 가야금 특유의 부드럽고 따뜻한 뜯는 소리를 위해 'triangle(삼각파)' 사용
      this.playTone(freq, "triangle", 1.8, true);
      
      // 배경음 가야금 농현(비브라토)을 살려주기 위해 다음 노트 간격 조절 (박자감: 0.9초)
      this.bgmIndex = (this.bgmIndex + 1) % this.bgmMelody.length;
      
      // 900ms 마다 한 음씩 고즈넉하게 연주
      this.bgmSequencerId = setTimeout(playNextBgmNote, 900);
    };

    playNextBgmNote();
  }

  stopBGM() {
    this.bgmPlaying = false;
    if (this.bgmSequencerId) {
      clearTimeout(this.bgmSequencerId);
      this.bgmSequencerId = null;
    }
  }

  // 소리 전체 음소거 전환
  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.stopBGM();
    } else {
      this.startBGM();
    }
    return this.isMuted;
  }
}

// 싱글톤 패턴으로 공유 인스턴스 전역 노출
const gameAudio = new AudioEngine();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { gameAudio };
} else {
  window.gameAudio = gameAudio;
}
