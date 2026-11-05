import { Figure } from "./slideKit";

interface Side {
  src: string;
  alt: string;
}

interface BeforeAfterProps {
  before: Side;
  after: Side;
}

/** Two diagrams labelled BEFORE / AFTER with the source deck's "VS" badge between. */
export function BeforeAfter({ before, after }: BeforeAfterProps) {
  return (
    <div className="flex min-h-0 flex-1 items-stretch gap-6">
      <Figure {...before} caption="BEFORE" className="flex-1" />
      <img
        src="/media/slides/future-of-databases/slide06-3.webp"
        alt="VS"
        className="w-14 self-center object-contain"
      />
      <Figure {...after} caption="AFTER" className="flex-1" />
    </div>
  );
}
