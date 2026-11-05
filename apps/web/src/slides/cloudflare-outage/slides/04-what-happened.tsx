import { Bullets, ContentSlide, b } from "../components/slideKit";

export function Slide04WhatHappened() {
  return (
    <ContentSlide title="What actually happened?">
      <Bullets
        lines={[
          b("Permission change were made to their database system"),
          b(
            "This created duplicate entries in their feature file, and this file size grew massively",
          ),
          b(
            "Feature file is used to protect websites from bots, usually contains 60 features, but bug made it store 200+ features",
          ),
          b(
            "Their routing service reads this file, but has a limit of how big the file can be - limit is 200 features, causing the service to crash as it was unable to handle the file",
          ),
          b("Major impact on core CDN services"),
        ]}
      />
    </ContentSlide>
  );
}
