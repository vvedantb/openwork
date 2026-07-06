import { Composition, Folder } from "remotion";
import type { CalculateMetadataFunction } from "remotion";
import { SLIDE_HEIGHT, SLIDE_WIDTH } from "@/types";
import {
  ChangelogComposition,
  type ChangelogCompositionProps,
} from "./changelog/ChangelogComposition";
import {
  changelogDurationInFrames,
  CHANGELOG_FPS,
} from "./changelog/constants";
import { DEFAULT_CHANGELOG_PROPS } from "./changelog/default-props";

const changelogCalculateMetadata: CalculateMetadataFunction<
  ChangelogCompositionProps
> = ({ props }) => ({
  durationInFrames: changelogDurationInFrames(props.slides.length),
});

export function RemotionRoot() {
  return (
    <Folder name="Changelogs">
      <Composition
        id="VmemChangelog"
        component={ChangelogComposition}
        durationInFrames={changelogDurationInFrames(
          DEFAULT_CHANGELOG_PROPS.slides.length,
        )}
        fps={CHANGELOG_FPS}
        width={SLIDE_WIDTH}
        height={SLIDE_HEIGHT}
        defaultProps={
          DEFAULT_CHANGELOG_PROPS satisfies ChangelogCompositionProps
        }
        calculateMetadata={changelogCalculateMetadata}
      />
    </Folder>
  );
}
