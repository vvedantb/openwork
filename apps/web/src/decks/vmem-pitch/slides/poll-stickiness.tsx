import { SlidePoll } from "../components/SlidePoll";
import { POLL_STICKINESS } from "../components/pollDefs";

export function SlidePollStickiness() {
  return <SlidePoll {...POLL_STICKINESS} kicker="Quick poll" />;
}
