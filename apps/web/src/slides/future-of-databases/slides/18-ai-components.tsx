import { Bullets, ContentSlide, b, sub } from "../components/slideKit";

export function Slide18AiComponents() {
  return (
    <ContentSlide title="AI Features - Components">
      <Bullets
        lines={[
          b("AI components that Convex providers"),
          sub("Agents component"),
          sub("RAG component"),
          b("Agents -> Chatbot in the Resource Centre where we"),
          b("Longer term benefit when use case is found"),
          b(
            "Makes implementation simpler vs without Convex (would need to do manually)",
          ),
          b(
            "Con: Greater vendor lock in vs custom implementation, would make migrating away harder",
          ),
        ]}
      />
    </ContentSlide>
  );
}
