import { Bullets, ContentSlide, Figure, b } from "../components/slideKit";

export function Slide05WhatIsACdn() {
  return (
    <ContentSlide title="What is a CDN?">
      <Bullets
        lines={[
          b("Content Delivery Network"),
          b(
            "A collection of servers spread across the world whose main job is to deliver stuff (images, videos, scripts, HTML, etc) from the server closest to the user",
          ),
        ]}
      />
      <Figure
        src="/media/slides/cloudflare-outage/slide05-1.webp"
        alt="World map of a content delivery network: an original server sends content to edge servers on each continent, which serve nearby users"
        className="mt-6 flex-1 items-end"
      />
    </ContentSlide>
  );
}
