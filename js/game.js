// 시니어 맞춤형 틀린그림찾기 앱 - 핵심 게임 엔진 (game.js)

class GameController {
  constructor() {
    // 게임 상태 변수
    this.currentStageIndex = 0;
    this.userName = "어르신";
    this.userHonorific = "어머님";
    this.foundCount = 0;
    this.activeLevel = null;
    this.isMuted = false;
    
    // 격려 메시지 랜덤 추출용 풀
    this.encouragements = [
      "최고예요! 역시 눈썰미가 살아있으십니다!",
      "기가 막히게 찾아내셨네요! 참 잘하셨어요!",
      "어머나, 눈이 정말 밝으십니다! 멋져요!",
      "맞아요, 바로 그곳이에요! 정말 대단하세요!",
      "순식간에 찾아내셨네요! 젊은이들보다 빠르십니다!",
      "정답입니다! 돋보기 없이도 참 잘 찾으세요!"
    ];

    // 축하 꽃가루(Confetti) 애니메이션 설정
    this.confettiCanvas = null;
    this.confettiCtx = null;
    this.confettiParticles = [];
    this.confettiActive = false;
    this.confettiTimer = null;
  }

  // 앱 로드 시 최초 초기화
  init() {
    this.confettiCanvas = document.getElementById("confetti-canvas");
    if (this.confettiCanvas) {
      this.confettiCtx = this.confettiCanvas.getContext("2d");
      window.addEventListener("resize", () => this.resizeConfettiCanvas());
      this.resizeConfettiCanvas();
    }

    // 로컬스토리지에서 기존 게임 기록 복원 시도
    this.loadStateFromStorage();
    
    // 이벤트 리스너 등록
    this.registerEvents();
  }

  // -------------------------------------------------------------
  // 1. 이벤트 리스너 등록 및 UI 흐름
  // -------------------------------------------------------------
  registerEvents() {
    // [홈] 호칭 선택 버튼 클릭
    document.querySelectorAll(".honorific-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        document.querySelectorAll(".honorific-btn").forEach(b => b.classList.remove("selected"));
        e.currentTarget.classList.add("selected");
        this.userHonorific = e.currentTarget.dataset.value;
        this.playSoftTick();
      });
    });

    // [홈] 이름 입력 칸 포커싱 시 음성 가이드
    const nameInput = document.getElementById("user-name-input");
    if (nameInput) {
      nameInput.addEventListener("focus", () => {
        this.speak("성함을 알려주시면 더 다정하게 불러 드릴게요.");
      });
      nameInput.addEventListener("change", (e) => {
        let name = e.target.value.trim();
        if (name) {
          this.userName = name;
          // 이름이 입력되면 '님' 호칭으로 기본 전환 또는 유지
          const honorificBtn = document.querySelector(".honorific-btn[data-value='님']");
          if (honorificBtn) {
            document.querySelectorAll(".honorific-btn").forEach(b => b.classList.remove("selected"));
            honorificBtn.classList.add("selected");
            this.userHonorific = "님";
          }
        }
      });
    }

    // [홈] 대형 시작 버튼 클릭
    const startBtn = document.getElementById("start-game-btn");
    if (startBtn) {
      startBtn.addEventListener("click", () => {
        const inputVal = document.getElementById("user-name-input").value.trim();
        if (inputVal) {
          this.userName = inputVal;
        } else {
          // 이름 비어있을 시 호칭에 따른 기본값 세팅
          if (this.userHonorific === "어머님") this.userName = "어머님";
          else if (this.userHonorific === "아버님") this.userName = "아버님";
          else this.userName = "어르신";
        }
        
        // 오디오 시스템 첫 구동 인터랙션 트리거
        window.gameAudio.init();
        window.gameAudio.resumeContext();
        window.gameAudio.startBGM();

        this.saveStateToStorage();
        this.startStage(this.currentStageIndex);
      });
    }

    // [게임판] 처음으로(홈) 버튼 클릭
    document.getElementById("nav-home-btn").addEventListener("click", () => {
      this.playSoftTick();
      this.showScreen("home-screen");
      window.gameAudio.stopBGM();
    });

    // [게임판] 소리 켜기/끄기 토글 버튼 클릭
    const soundBtn = document.getElementById("nav-sound-btn");
    soundBtn.addEventListener("click", () => {
      this.isMuted = window.gameAudio.toggleMute();
      this.updateSoundButtonUI();
    });

    // [게임판] 돋보기 힌트 버튼 클릭 (횟수 제한 없이 즐겁게 제공)
    document.getElementById("nav-hint-btn").addEventListener("click", () => {
      this.triggerHint();
    });

    // [게임판] 터치 영역 클릭 판정 바인딩 (좌/우 또는 상/하 두 쪽 모두에 바인딩)
    const originalWrapper = document.getElementById("original-wrapper");
    const alteredWrapper = document.getElementById("altered-wrapper");
    
    originalWrapper.addEventListener("click", (e) => this.handleImageClick(e, originalWrapper));
    alteredWrapper.addEventListener("click", (e) => this.handleImageClick(e, alteredWrapper));

    // [축하] 다음 단계 가기 버튼
    document.getElementById("success-next-btn").addEventListener("click", () => {
      this.stopConfetti();
      this.currentStageIndex++;
      if (this.currentStageIndex < window.gameLevels.length) {
        this.startStage(this.currentStageIndex);
      } else {
        // 모든 스테이지 클리어
        this.handleAllClear();
      }
    });

    // [축하] 처음으로 가기 버튼
    document.getElementById("success-home-btn").addEventListener("click", () => {
      this.stopConfetti();
      this.currentStageIndex = 0;
      this.saveStateToStorage();
      this.showScreen("home-screen");
      window.gameAudio.stopBGM();
    });
  }

  // -------------------------------------------------------------
  // 2. 화면 전환 및 데이터 로드 로직
  // -------------------------------------------------------------
  showScreen(screenId) {
    document.querySelectorAll(".screen").forEach(screen => {
      screen.classList.remove("active");
    });
    const target = document.getElementById(screenId);
    if (target) {
      target.classList.add("active");
    }
  }

  // 특정 스테이지 플레이 로드
  startStage(stageIdx) {
    this.currentStageIndex = stageIdx;
    this.activeLevel = window.gameLevels[stageIdx];
    this.foundCount = 0;
    
    // 레벨의 진행도 플래그 초기화
    this.activeLevel.differences.forEach(d => d.found = false);

    // UI 레이아웃 준비
    document.getElementById("stage-title-indicator").innerText = this.activeLevel.title;
    document.getElementById("original-wrapper").innerHTML = this.activeLevel.svgOriginal + '<div class="click-overlay"></div>';
    document.getElementById("altered-wrapper").innerHTML = this.activeLevel.svgAltered + '<div class="click-overlay"></div>';
    
    this.updateProgressUI();
    this.showScreen("game-screen");

    // 배경음 시작 상태 체크
    window.gameAudio.startBGM();

    // 친근한 격려 TTS 스피치
    const diffCountText = this.activeLevel.differences.length === 3 ? "세 군데" : (this.activeLevel.differences.length === 4 ? "네 군데" : "다섯 군데");
    const introSpeech = `${this.userName} ${this.userHonorific}, ${this.activeLevel.title} 그림이에요. 눈을 크게 뜨고 서로 다른 ${diffCountText}를 찾아보세요!`;
    this.speak(introSpeech);
  }

  // -------------------------------------------------------------
  // 3. 넉넉하고 정밀한 좌표 판정 시스템
  // -------------------------------------------------------------
  handleImageClick(event, container) {
    // 전체 터치 영역 크기 구하기
    const rect = container.getBoundingClientRect();
    
    // 클릭된 정확한 상대 좌표 계산 (offsetX/offsetY는 경계요소 겹침 시 흔들리므로 클라이언트 축 기준으로 안전 연산)
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;
    
    // 0 ~ 100 사이의 퍼센트 단위 상대 비율 구하기
    const pctX = (clickX / rect.width) * 100;
    const pctY = (clickY / rect.height) * 100;

    let matched = false;

    // 틀린 부분 목록 중 아직 못 찾은 대상과 비교
    for (let diff of this.activeLevel.differences) {
      if (diff.found) continue;

      // 두 지점 사이의 유클리드 거리 계산
      const distance = Math.sqrt(Math.pow(pctX - diff.x, 2) + Math.pow(pctY - diff.y, 2));

      // 시니어 보정: 정의된 radius(보통 8~10%) 범위 이내 터치 시 정답 인정
      if (distance <= diff.radius) {
        diff.found = true;
        this.foundCount++;
        matched = true;

        // 원본과 대조군 양측 모두에 '큼직하고 예쁜' 동그라미 표식 배치
        this.placeFoundMarker(diff.x, diff.y, diff.radius);
        
        // 정답 효과음 재생
        window.gameAudio.playSuccess();

        // 어르신 대만족 칭찬 멘트 TTS
        const ranEnc = this.encouragements[Math.floor(Math.random() * this.encouragements.length)];
        this.speak(ranEnc);
        this.updateProgressUI();

        // 스테이지에 속한 모든 틀린 곳을 찾았을 때
        if (this.foundCount === this.activeLevel.differences.length) {
          setTimeout(() => this.handleStageClear(), 1500);
        }
        break;
      }
    }

    // 만약 잘못 눌렀을 때 (스트레스 최소화)
    if (!matched) {
      // 엉뚱한 동그라미를 그리는 대신, 부드러운 저음 피드백만 출력
      window.gameAudio.playMiss();
    }
  }

  // 양쪽 그림의 정확한 동일 자리에 커다란 녹색 동그라미 설치
  placeFoundMarker(xPercent, yPercent, radiusPercent) {
    const originalWrapper = document.getElementById("original-wrapper");
    const alteredWrapper = document.getElementById("altered-wrapper");
    
    const wrappers = [originalWrapper, alteredWrapper];
    
    wrappers.forEach(wrap => {
      const marker = document.createElement("div");
      marker.className = "found-marker";
      
      // 퍼센트 기준으로 동적 크기 및 포지션 부여
      marker.style.left = `${xPercent}%`;
      marker.style.top = `${yPercent}%`;
      marker.style.width = `${radiusPercent * 2}%`;
      marker.style.height = `${radiusPercent * 2 * 1.33}%`; // 4:3 뷰포트 왜곡 보정
      
      wrap.appendChild(marker);
    });
  }

  // -------------------------------------------------------------
  // 4. 돋보기 힌트 연출 (깜빡임으로 명확하게 짚어주기)
  // -------------------------------------------------------------
  triggerHint() {
    // 아직 못 찾은 첫 번째 차이점을 수색
    const unfound = this.activeLevel.differences.find(d => !d.found);
    if (!unfound) return;

    window.gameAudio.playHint();
    
    const originalWrapper = document.getElementById("original-wrapper");
    const alteredWrapper = document.getElementById("altered-wrapper");
    const wrappers = [originalWrapper, alteredWrapper];
    
    const hintDivs = [];

    // 양쪽 화면 모두에 깜빡이는 파선 가이드 생성
    wrappers.forEach(wrap => {
      const hint = document.createElement("div");
      hint.className = "hint-marker";
      hint.style.left = `${unfound.x}%`;
      hint.style.top = `${unfound.y}%`;
      hint.style.width = `${unfound.radius * 2.8}%`; // 터치 타겟보다 더 크게 반짝여서 찾기 쉽게 유도
      hint.style.height = `${unfound.radius * 2.8 * 1.33}%`;
      
      wrap.appendChild(hint);
      hintDivs.push(hint);
    });

    this.speak("이곳 주변을 유심히 살펴보세요!");

    // 4.5초 후 자연스럽게 유도 표시 제거
    setTimeout(() => {
      hintDivs.forEach(hd => {
        if (hd.parentNode) {
          hd.parentNode.removeChild(hd);
        }
      });
    }, 4500);
  }

  // -------------------------------------------------------------
  // 5. 진행도 관리 및 축하 연출
  // -------------------------------------------------------------
  updateProgressUI() {
    const total = this.activeLevel.differences.length;
    const progressFill = document.getElementById("progress-fill");
    const progressText = document.getElementById("progress-text");
    const progressLabel = document.getElementById("progress-label");
    const encouragementText = document.getElementById("progress-encouragement");

    const pct = (this.foundCount / total) * 100;
    progressFill.style.width = `${pct}%`;
    
    progressText.innerHTML = `${this.userName} ${this.userHonorific}, 전체 <span style="color:#D44D25; font-size:32px;">${total}개</span> 중 <span style="color:#1F6B52; font-size:32px;">${this.foundCount}개</span>를 찾으셨어요!`;
    progressLabel.innerText = `${pct.toFixed(0)}%`;

    // 남은 개수별 우정 어린 한글 메시지 갱신
    const remaining = total - this.foundCount;
    if (remaining === 0) {
      encouragementText.innerText = "훌륭합니다! 모두 다 찾아내셨어요!";
    } else {
      encouragementText.innerText = `${remaining}개 남았습니다. 천천히 찾아보세요.`;
    }
  }

  // 스테이지 클리어 처리
  handleStageClear() {
    window.gameAudio.stopBGM();
    window.gameAudio.playStageClear();

    // 로컬스토리지에 진행 사항 저장
    this.saveProgressState(this.currentStageIndex);

    // 성공 모달 화면 텍스트 설정
    const successTitle = document.getElementById("success-title");
    const successMsg = document.getElementById("success-message");
    
    successTitle.innerText = `${this.userName} ${this.userHonorific}, 대단해요!`;
    
    const stageNum = this.currentStageIndex + 1;
    successMsg.innerHTML = `벌써 <strong>${stageNum}단계</strong>를 무사히 완수하셨습니다.<br>뇌 세포가 아주 기뻐하고 있어요!`;

    // TTS 음성 축하 메지
    const winSpeech = `${this.userName} ${this.userHonorific}! 벌써 ${stageNum}단계를 다 찾아내셨네요. ${this.activeLevel.winSpeech} 다음 단계도 같이 하실까요?`;
    this.speak(winSpeech);

    this.showScreen("success-screen");
    
    // 찬란한 폭죽 애니메이션 실행
    this.startConfetti();
  }

  // 모든 5개 스테이지 완전 정복 처리
  handleAllClear() {
    window.gameAudio.stopBGM();
    window.gameAudio.playStageClear();

    // 처음부터 다시 할 수 있도록 진행 정보 초기화
    this.currentStageIndex = 0;
    this.saveProgressState(-1); // 초기화

    const successTitle = document.getElementById("success-title");
    const successMsg = document.getElementById("success-message");
    const nextBtn = document.getElementById("success-next-btn");
    
    successTitle.innerText = `축하드립니다! 대만세!`;
    successMsg.innerHTML = `<strong>모든 단계(1~5단계)를 완벽하게 졸업하셨습니다!</strong><br>${this.userName} ${this.userHonorific}은 아주 건강하고 맑은 뇌를 증명하셨습니다!`;

    const finalSpeech = `와! 정말 대단하십니다! 모든 단계를 완벽하게 통과하셨어요! 당신의 훌륭한 눈미와 인지 능력에 큰 박수를 보냅니다! 항상 건강하고 행복하세요!`;
    this.speak(finalSpeech);

    // 다음 단계 버튼을 비활성화하거나 처음으로 가기 버튼만 남김
    nextBtn.style.display = "none";
    
    this.showScreen("success-screen");
    this.startConfetti();
  }

  // -------------------------------------------------------------
  // 6. 음성 합성 격려 엔진 (TTS - Web Speech API)
  // -------------------------------------------------------------
  speak(text) {
    if (this.isMuted) return; // 음소거 상태일 때는 음성 안내도 송출하지 않음
    
    if ("speechSynthesis" in window) {
      // 기존 낭독 중이던 목소리 강제 정지하여 음 겹침 방지
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "ko-KR"; // 한국어 설정
      utterance.rate = 0.82;     // 시니어 맞춤: 일반 발화 속도보다 살짝 느리고 나긋나긋하게 (0.82배속)
      utterance.pitch = 1.05;    // 따뜻하고 맑은 톤을 위해 미세하게 피치 상향
      
      // 한국어 자연스러운 여성 목소리 감색 매칭
      const voices = window.speechSynthesis.getVoices();
      const koVoice = voices.find(v => v.lang.includes("ko") || v.name.includes("Korean"));
      if (koVoice) {
        utterance.voice = koVoice;
      }
      
      window.speechSynthesis.speak(utterance);
    }
  }

  // -------------------------------------------------------------
  // 7. 로컬스토리지 진도 보존 및 이어하기 팝업 처리
  // -------------------------------------------------------------
  saveStateToStorage() {
    localStorage.setItem("senior_game_username", this.userName);
    localStorage.setItem("senior_game_honorific", this.userHonorific);
  }

  saveProgressState(completedIdx) {
    localStorage.setItem("senior_game_completed_index", completedIdx);
  }

  loadStateFromStorage() {
    const savedName = localStorage.getItem("senior_game_username");
    const savedHonorific = localStorage.getItem("senior_game_honorific");
    const savedIdx = localStorage.getItem("senior_game_completed_index");

    if (savedName) this.userName = savedName;
    if (savedHonorific) this.userHonorific = savedHonorific;

    // 만약 완료한 레벨이 0번(1단계) 이상이고 4번(5단계 미만) 이하라면, 이어하기 배너 띄우기
    const parsedIdx = parseInt(savedIdx, 10);
    if (!isNaN(parsedIdx) && parsedIdx >= 0 && parsedIdx < window.gameLevels.length - 1) {
      const nextStageNum = parsedIdx + 2; // (인덱스 + 1이 현재 완료단계, 이어서 할 건 인덱스 + 2)
      
      const resumeBanner = document.getElementById("resume-banner-panel");
      const resumeText = document.getElementById("resume-banner-text");
      
      if (resumeBanner && resumeText) {
        resumeText.innerHTML = `<strong>${this.userName} ${this.userHonorific}!</strong><br>지난번에 <span style="color:#1F6B52;">${parsedIdx + 1}단계</span>까지 완료하셨네요! 이어서 <strong>${nextStageNum}단계</strong>를 바로 하시겠어요?`;
        resumeBanner.style.display = "block";

        // 입력 폼에 기존 이름 세팅
        document.getElementById("user-name-input").value = this.userName;
        
        // 호칭 버튼 자동 활성화
        document.querySelectorAll(".honorific-btn").forEach(btn => {
          if (btn.dataset.value === this.userHonorific) {
            btn.classList.add("selected");
          } else {
            btn.classList.remove("selected");
          }
        });

        // 이어하기 클릭 리스너
        document.getElementById("resume-confirm-btn").onclick = () => {
          this.playSoftTick();
          window.gameAudio.init();
          window.gameAudio.resumeContext();
          window.gameAudio.startBGM();
          
          this.startStage(parsedIdx + 1);
          resumeBanner.style.display = "none";
        };

        // 처음부터 다시 하기 클릭 리스너
        document.getElementById("resume-new-btn").onclick = () => {
          this.playSoftTick();
          localStorage.removeItem("senior_game_completed_index");
          resumeBanner.style.display = "none";
          this.speak("좋습니다. 처음부터 새로운 기분으로 시작해 보아요!");
        };
      }
    }
  }

  // -------------------------------------------------------------
  // 8. 서브 기능 및 이펙트 (폭죽 Confetti, 사운드 UI, 터치음)
  // -------------------------------------------------------------
  playSoftTick() {
    // 틱 소리용 Web Audio
    if (window.gameAudio && !this.isMuted) {
      window.gameAudio.init();
      window.gameAudio.playTone(380, "sine", 0.06);
    }
  }

  updateSoundButtonUI() {
    const soundBtn = document.getElementById("nav-sound-btn");
    if (this.isMuted) {
      soundBtn.innerHTML = "🔇 소리 끔";
      soundBtn.classList.add("muted");
      if ("speechSynthesis" in window) {
        window.speechSynthesis.cancel(); // 낭독 음성도 즉시 중단
      }
    } else {
      soundBtn.innerHTML = "🔊 소리 켬";
      soundBtn.classList.remove("muted");
      this.speak("소리가 켜졌습니다. 반갑습니다!");
    }
  }

  resizeConfettiCanvas() {
    if (this.confettiCanvas) {
      this.confettiCanvas.width = window.innerWidth;
      this.confettiCanvas.height = window.innerHeight;
    }
  }

  startConfetti() {
    this.confettiActive = true;
    this.confettiParticles = [];
    this.resizeConfettiCanvas();

    // 꽃가루 색상 다발 (화사한 오색 테마)
    const colors = ["#FFC107", "#E040FB", "#00E676", "#FF5252", "#29B6F6", "#FF9100", "#FF1744"];

    // 120개의 풍성한 꽃가루 생성
    for (let i = 0; i < 120; i++) {
      this.confettiParticles.push({
        x: Math.random() * this.confettiCanvas.width,
        y: Math.random() * this.confettiCanvas.height - this.confettiCanvas.height,
        r: Math.random() * 8 + 6, // 큼직한 가시성 높은 알갱이 크기
        d: Math.random() * this.confettiCanvas.height,
        color: colors[Math.floor(Math.random() * colors.length)],
        tilt: Math.random() * 10 - 5,
        tiltAngleIncremental: Math.random() * 0.07 + 0.02,
        tiltAngle: 0,
        speed: Math.random() * 3 + 2
      });
    }

    const drawConfetti = () => {
      if (!this.confettiActive) return;
      
      this.confettiCtx.clearRect(0, 0, this.confettiCanvas.width, this.confettiCanvas.height);
      
      this.confettiParticles.forEach((p, idx) => {
        p.tiltAngle += p.tiltAngleIncremental;
        p.y += p.speed;
        p.x += Math.sin(p.tiltAngle) * 0.5;
        p.tilt = Math.sin(p.tiltAngle - idx/3) * 15;

        this.confettiCtx.beginPath();
        this.confettiCtx.lineWidth = p.r;
        this.confettiCtx.strokeStyle = p.color;
        this.confettiCtx.moveTo(p.x + p.tilt + p.r / 2, p.y);
        this.confettiCtx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 2);
        this.confettiCtx.stroke();

        // 바닥을 통과하면 다시 위로 올려 순환 재생
        if (p.y > this.confettiCanvas.height) {
          this.confettiParticles[idx] = {
            ...p,
            x: Math.random() * this.confettiCanvas.width,
            y: -20,
            speed: Math.random() * 3 + 2
          };
        }
      });

      this.confettiTimer = requestAnimationFrame(drawConfetti);
    };

    drawConfetti();
  }

  stopConfetti() {
    this.confettiActive = false;
    if (this.confettiTimer) {
      cancelAnimationFrame(this.confettiTimer);
      this.confettiTimer = null;
    }
    if (this.confettiCtx) {
      this.confettiCtx.clearRect(0, 0, this.confettiCanvas.width, this.confettiCanvas.height);
    }
  }
}

// 브라우저 전역 노출
const gameController = new GameController();
window.gameController = gameController;

// 브라우저 DOM 완료 시 구동 개시
document.addEventListener("DOMContentLoaded", () => {
  // TTS 음성 리스트 미리 캐싱
  if ("speechSynthesis" in window) {
    window.speechSynthesis.getVoices();
  }
  window.gameController.init();
});
