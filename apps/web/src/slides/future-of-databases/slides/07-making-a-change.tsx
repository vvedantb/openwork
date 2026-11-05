import { BeforeAfter } from "../components/BeforeAfter";
import { ContentSlide } from "../components/slideKit";

export function Slide07MakingAChange() {
  return (
    <ContentSlide
      title="Benefit 3 – Making a change to the database"
      tag="DEV TEAM’S PERSPECTIVE"
    >
      <BeforeAfter
        before={{
          src: "/media/slides/future-of-databases/slide07-3.webp",
          alt: "Flowchart: make a change, ask Krzys to run a migration, handle conflicts, wait for the build, then ready for review — repeated to go live; these steps block review and can take hours",
        }}
        after={{
          src: "/media/slides/future-of-databases/slide07-2.webp",
          alt: "Flowchart: make a change, changes applied automatically, ready for review, deploy to prod in one command — no blocking steps",
        }}
      />
    </ContentSlide>
  );
}
