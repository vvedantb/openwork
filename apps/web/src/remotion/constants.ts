export const SLIDE_FPS = 30;
export const SLIDE_DURATION_IN_FRAMES = 90;

export function deckDurationInFrames(slideCount: number): number {
  return Math.max(slideCount, 1) * SLIDE_DURATION_IN_FRAMES;
}
