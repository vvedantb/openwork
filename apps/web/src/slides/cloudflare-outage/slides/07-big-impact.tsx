import { Bullets, ContentSlide, Figure, b, gap } from "../components/slideKit";

export function Slide07BigImpact() {
  return (
    <ContentSlide title="Why did this outage have such a big impact?">
      <div className="flex min-h-0 flex-1 gap-8">
        <div className="flex-1">
          <Bullets
            size="sm"
            lines={[
              b(
                "Cloudflare has a massive market share with around 40 million customers",
              ),
              b(
                "Used on 80% of CDN-websites, and 20% of all active websites in total",
              ),
              b(
                "Their network isn’t small, they operate globally, so core service failures cannot be isolated",
              ),
              gap,
              b(
                "Why does this matter? A provider with high adoption means failures will hit lots of services simultaneously",
              ),
              b(
                "When Cloudflare started rolling back the change, there was increased traffic rushing back onto the system",
              ),
              gap,
              b(
                "Huge centralisation → One bug can break a massive chunk of the Internet",
              ),
            ]}
          />
        </div>
        <div className="flex min-h-0 w-[300px] flex-col gap-4">
          <Figure
            src="/media/slides/cloudflare-outage/slide07-1.webp"
            alt="Pie chart of CDN-website market share: Cloudflare 81.4%, Amazon Cloudfront 6.3%, Fastly 3.6%, Akamai 3.2%, Other 5.5%"
            caption="CDN-website market share"
            captionTop
            className="flex-1"
          />
          <Figure
            src="/media/slides/cloudflare-outage/slide07-2.webp"
            alt="Pie chart of global active website market share: Cloudflare 20.4%, Amazon CloudFront 1.6%, Fastly 0.9%, Akamai 0.8%, regular websites 76.3%"
            caption="Global active website market share"
            captionTop
            className="flex-1"
          />
        </div>
      </div>
    </ContentSlide>
  );
}
