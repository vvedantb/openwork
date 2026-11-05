import { Bullets, ContentSlide, b, gap } from "../components/slideKit";

const LOGOS = [
  {
    src: "/media/slides/future-of-databases/slide05-3.webp",
    alt: "Trading app screenshot on a phone",
  },
  {
    src: "/media/slides/future-of-databases/slide05-1.webp",
    alt: "Figma logo",
  },
  {
    src: "/media/slides/future-of-databases/slide05-2.webp",
    alt: "Google Docs logo",
  },
];

export function Slide05WebSockets() {
  return (
    <ContentSlide title="Benefit 1 – Live updates" tag="DEV TEAM’S PERSPECTIVE">
      <div className="flex min-h-0 flex-1 gap-10">
        <div className="flex-1">
          <Bullets
            lines={[
              b("These live updates are done through a WebSocket connection"),
              b(
                "e.g. Trading apps, Google Docs, Figma, anything involving live interactivity use WebSockets to be live",
              ),
              gap,
              b(
                "Would need to implement WebSockets manually (if Convex isn’t used), which is complex",
              ),
              gap,
              b(
                "Convex provides this functionality out of the box and is always enabled by default",
                true,
              ),
              gap,
              b("Care package finder issue*"),
            ]}
          />
        </div>
        <div className="flex w-24 flex-col items-center gap-6 pt-2">
          {LOGOS.map((logo) => (
            <img
              key={logo.src}
              src={logo.src}
              alt={logo.alt}
              className="h-20 w-20 object-contain"
            />
          ))}
        </div>
      </div>
    </ContentSlide>
  );
}
