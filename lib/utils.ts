import { EMOTION_CONFIG } from './constants';

/**
 * 프론트엔드 1~10 수치를 DB 저장용 0~100 수치로 변환
 */
export const normalizeIntensity = (val: number): number => {
  const { MIN_INPUT, MAX_INPUT, MIN_NORM, MAX_NORM } = EMOTION_CONFIG.SCALE;
  // (val - 1) / (10 - 1) * 100
  return Math.round(((val - MIN_INPUT) / (MAX_INPUT - MIN_INPUT)) * (MAX_NORM - MIN_NORM));
};

/**
 * 0~100 수치를 다시 UI 표시용 1~10으로 변환 (필요 시)
 */
export const denormalizeIntensity = (val: number): number => {
  const { MIN_INPUT, MAX_INPUT, MIN_NORM, MAX_NORM } = EMOTION_CONFIG.SCALE;
  return Math.round(((val - MIN_NORM) / (MAX_NORM - MIN_NORM)) * (MAX_INPUT - MIN_INPUT) + MIN_INPUT);
};

/**
 * Delta 값에 따른 현재 상태(Status) 판별
 */
export const getStatusByDelta = (delta: number): 'stable' | 'caution' | 'crisis' => {
  const { CAUTION, CRISIS } = EMOTION_CONFIG.THRESHOLDS;
  if (delta >= CRISIS) return 'crisis';
  if (delta >= CAUTION) return 'caution';
  return 'stable';
};