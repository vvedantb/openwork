import { Bullets, ContentSlide, Figure, plain } from "../components/slideKit";

export function Slide08Downdetector() {
  return (
    <ContentSlide title="Why did this outage have such a big impact?">
      <Bullets lines={[plain("DOWNDETECTOR WAS DOWN ITSELF…")]} />
      <div className="mt-8 flex min-h-0 flex-1 gap-6">
        <Figure
          src="/media/slides/cloudflare-outage/slide08-1.webp"
          alt="Downdetector dashboard showing reports over time"
          className="flex-1"
        />
        <Figure
          src="/media/slides/cloudflare-outage/slide08-2.webp"
          alt="“Is DownDetector down?” — a small independent status checker reporting DownDetector up from London, Auckland and New York"
          className="flex-1"
        />
      </div>
    </ContentSlide>
  );
}
