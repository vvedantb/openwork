import { ContentSlide, Figure } from "../components/slideKit";

export function Slide03WhatDidNotHappen() {
  return (
    <ContentSlide title="What did NOT happen ?">
      <div className="flex min-h-0 flex-1 gap-10">
        <div className="flex min-h-0 flex-1 flex-col">
          <p className="mb-4 text-2xl text-foreground">
            Sharks did NOT eat the undersea cables
          </p>
          <Figure
            src="/media/slides/cloudflare-outage/slide03-1.webp"
            alt="News footage of a shark swimming past an undersea cable"
            className="flex-1"
          />
        </div>
        <div className="flex min-h-0 flex-1 flex-col">
          <p className="mb-4 text-2xl text-foreground">
            Devs did NOT push AI generated code to prod
          </p>
          <Figure
            src="/media/slides/cloudflare-outage/slide03-2.webp"
            alt="Meme: developer and AI generating code pushing to prod, then all services down"
            className="flex-1"
          />
        </div>
      </div>
    </ContentSlide>
  );
}
