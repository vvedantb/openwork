import { Bullets, ContentSlide, Figure, b, sub } from "../components/slideKit";

export function Slide17OutageHistory() {
  return (
    <ContentSlide title="Outage history">
      <div className="flex min-h-0 flex-1 gap-10">
        <div className="flex-1">
          <Bullets
            size="sm"
            lines={[
              b("Only 4 outages in the past 5 years"),
              b("Past 5 years:"),
              sub("Jul 2019: 30 mins outage (99.99% uptime)"),
              sub("Jul 2020: 30 mins outage (99.99% uptime)"),
              sub("Jun 2025: 2h 30m outage"),
              sub("Nov 2025: Several hours (99.9% uptime)"),
              b("Uptime percentage is still 99.9%"),
              b(
                "Is it worth the extra maintenance to hit >99.9% uptime? Is it even possible to beat? No.",
              ),
            ]}
          />
        </div>
        <Figure
          src="/media/slides/cloudflare-outage/slide17-1.webp"
          alt="Table of availability percentages, from 90% (one nine) to 99.99999% (seven nines), with the downtime each allows per year, month and week"
          className="w-[440px]"
        />
      </div>
    </ContentSlide>
  );
}
