export const CHANGELOG_FPS = 30;
export const INTRO_DURATION = 120;
export const FEATURE_DURATION = 150;
export const OUTRO_DURATION = 100;

export function changelogDurationInFrames(slideCount: number): number {
  return INTRO_DURATION + slideCount * FEATURE_DURATION + OUTRO_DURATION;
}
