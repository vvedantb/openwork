import { Composition, Folder } from "remotion";
import type { CalculateMetadataFunction } from "remotion";
import { SLIDE_HEIGHT, SLIDE_WIDTH } from "@/types";
import {
  deckDurationInFrames,
  SLIDE_DURATION_IN_FRAMES,
  SLIDE_FPS,
} from "./constants";
import { DeckComposition, type DeckCompositionProps } from "./DeckComposition";
import {
  DEFAULT_DECK_PROPS,
  DEFAULT_SLIDE_PROPS,
} from "./default-props";
import {
  SlideComposition,
  type SlideCompositionProps,
} from "./SlideComposition";

const deckCalculateMetadata: CalculateMetadataFunction<DeckCompositionProps> = ({
  props,
}) => ({
  durationInFrames: deckDurationInFrames(props.slides.length),
});

export function RemotionRoot() {
  return (
    <>
      <Folder name="Folio">
        <Composition
          id="Slide"
          component={SlideComposition}
          durationInFrames={SLIDE_DURATION_IN_FRAMES}
          fps={SLIDE_FPS}
          width={SLIDE_WIDTH}
          height={SLIDE_HEIGHT}
          defaultProps={DEFAULT_SLIDE_PROPS satisfies SlideCompositionProps}
        />
        <Composition
          id="Deck"
          component={DeckComposition}
          durationInFrames={deckDurationInFrames(DEFAULT_DECK_PROPS.slides.length)}
          fps={SLIDE_FPS}
          width={SLIDE_WIDTH}
          height={SLIDE_HEIGHT}
          defaultProps={DEFAULT_DECK_PROPS satisfies DeckCompositionProps}
          calculateMetadata={deckCalculateMetadata}
        />
      </Folder>
    </>
  );
}
