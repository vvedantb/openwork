import {
  Bullets,
  ContentSlide,
  Figure,
  b,
  gap,
  sub,
} from "../components/slideKit";

export function Slide06WhyCdns() {
  return (
    <ContentSlide title="Why are CDNs used?">
      <div className="flex min-h-0 flex-1 gap-10">
        <div className="flex-1">
          <Bullets
            size="sm"
            lines={[
              b(
                <span className="inline-flex items-center gap-3">
                  Faster load times
                  <img
                    src="/media/slides/cloudflare-outage/slide06-1.gif"
                    alt="Loading spinner"
                    className="h-9 w-9"
                  />
                </span>,
              ),
              sub(
                "Instead of connecting to the main server, you connect to a copy of a server that is geographically located closer to you",
              ),
              sub(
                "Connecting to the website, loading content, viewing images/videos all become faster",
              ),
              gap,
              b("Load distribution"),
              sub(
                "For an app with millions of users, this distributes the load from one server to however many copy servers there are",
              ),
            ]}
          />
        </div>
        <Figure
          src="/media/slides/cloudflare-outage/slide06-2.webp"
          alt="Diagram: clients connect to a load balancer, which spreads traffic across three backend servers"
          className="w-[360px] justify-end"
        />
      </div>
    </ContentSlide>
  );
}
