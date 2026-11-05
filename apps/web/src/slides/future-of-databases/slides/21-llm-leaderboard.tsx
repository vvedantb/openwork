import { Bullets, ContentSlide, Figure, b, sub } from "../components/slideKit";

export function Slide21LlmLeaderboard() {
  return (
    <ContentSlide title="Using Convex with AI – LLM leaderboard">
      <Bullets
        size="sm"
        lines={[
          b(
            "Convex is the only provider that has this – their commitment to AI",
          ),
          b("Models are tested and ranked on 4 factors:"),
          sub("Correctness, Efficiency, Understanding, Instruction following"),
        ]}
      />
      <Figure
        src="/media/slides/future-of-databases/slide21-1.webp"
        alt="Convex LLM leaderboard table ranking models by correctness, efficiency, understanding and instruction following"
        className="mt-6 flex-1"
      />
    </ContentSlide>
  );
}
