export const EMOTION_CONFIG = {
  // Intensity 관련 스케일 설정
  SCALE: {
    MIN_INPUT: 1,
    MAX_INPUT: 10,
    MIN_NORM: 0,
    MAX_NORM: 100,
  },
  
  // 상태 결정을 위한 임계치 (Delta 값 기준)
  THRESHOLDS: {
    CAUTION: 1.5, // 주의 단계 진입
    CRISIS: 2.5,  // 위기(결제 유도) 단계 진입
  },

  // 분석 기간 설정
  PERIODS: {
    SHORT_TERM_DAYS: 7,
    LONG_TERM_DAYS: 30,
  },

  // AI 분석 실패 시 Fallback 데이터
  FALLBACK: {
    MIX: [
      { key: 'neutral', label: '평온', rate: 100 }
    ],
    DESCRIPTION: "마음의 초점을 맞추는 중입니다.\n잠시 후 다시 기록해 주세요.",
    SONG: "Silent Night - Nature Sound"
  }
};

export const PRICING = {
  REPORT_FEE: 900,
  CURRENCY: 'KRW',
};