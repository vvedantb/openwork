import { Bullets, ContentSlide, b, sub } from "../components/slideKit";

export function Slide12MultiCloud() {
  return (
    <ContentSlide title="Multi-cloud is not the solution">
      <Bullets
        size="sm"
        lines={[
          b("Alternatives to multi-cloud"),
          b("Increases resilience to a cloud vendor outage but"),
          sub(
            "increases operational complexity → slower feature deployment → increased human error",
          ),
          b("Double the infra, double the configs, double the monitoring"),
          b("More room for failure making you less  reliable"),
          b("Additional cost for running and maintenance"),
          b(
            "This approach reduces velocity and doesn’t solve the CDN centralisation issue",
          ),
        ]}
      />
    </ContentSlide>
  );
}
