import { Bullets, ContentSlide, b, sub } from "../components/slideKit";

export function Slide02WhatCloudflareDoes() {
  return (
    <ContentSlide title="What does Cloudflare do?">
      <Bullets
        size="sm"
        lines={[
          b(
            "Cloudflare is an internet platform that sits in front of millions of websites",
          ),
          b("It provides the following:"),
          sub("Performance → CDN, caching, routing", true),
          sub("Security → DDoS protection"),
          sub("Network services → Load balancing"),
          sub("Edge compute"),
          sub("All into one platform"),
          b(
            "Many companies use Cloudflare for everything (assets, API requests, DNS rules, authentication)",
          ),
        ]}
      />
    </ContentSlide>
  );
}
