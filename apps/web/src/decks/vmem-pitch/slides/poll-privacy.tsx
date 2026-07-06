import { SlidePoll } from "../components/SlidePoll";
import { POLL_PRIVACY } from "../components/pollDefs";

export function SlidePollPrivacy() {
  return <SlidePoll {...POLL_PRIVACY} kicker="Quick poll" />;
}
