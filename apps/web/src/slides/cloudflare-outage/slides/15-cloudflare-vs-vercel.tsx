import {
  Bullets,
  ContentSlide,
  Figure,
  b,
  gap,
  plain,
} from "../components/slideKit";

export function Slide15CloudflareVsVercel() {
  return (
    <ContentSlide title="Cloudflare vs Vercel">
      <div className="flex min-h-0 flex-1 gap-10">
        <div className="flex-1">
          <Bullets
            lines={[
              plain(
                "CarePulse is hosted on Vercel, but Cloudflare also offers hosting options, so how come we don’t use Cloudflare?",
              ),
              gap,
              b("Cloudflare targets DNS and security"),
              b("Vercel targets dev experience and fast preview deployments"),
              gap,
              b(
                "Both offer similar services, and can use both at the same time, but for us Vercel is the preferred option based on our tech stack",
              ),
            ]}
          />
        </div>
        <Figure
          src="/media/slides/cloudflare-outage/slide15-1.webp"
          alt="Post by Guillermo Rauch (@rauchg), 18 Nov 2025: “That must have been a nasty useEffect”"
          className="w-[300px] justify-start"
        />
      </div>
    </ContentSlide>
  );
}
