import { ContentSlide, Figure } from "../components/slideKit";

export function Slide11MigrationsMeme() {
  return (
    <ContentSlide title="Database migrations">
      <div className="flex min-h-0 flex-1 justify-center gap-16">
        <Figure
          src="/media/slides/future-of-databases/slide11-1.webp"
          alt="Meme: Krzys held up by devs, devs by the business team, the business team by users"
          caption="HOW IT WAS BEFORE"
          className="w-[440px]"
        />
        <Figure
          src="/media/slides/future-of-databases/slide11-2.webp"
          alt="Meme: the same scene with the roles swapped, so Krzys is now the one at the end of the chain"
          caption="HOW IT IS NOW"
          className="w-[440px]"
        />
      </div>
    </ContentSlide>
  );
}
