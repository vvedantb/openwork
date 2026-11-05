import type { SlideEntry } from "@/slides/types";
import { Slide01Title } from "./01-title";
import { Slide02WhatCloudflareDoes } from "./02-what-cloudflare-does";
import { Slide03WhatDidNotHappen } from "./03-what-did-not-happen";
import { Slide04WhatHappened } from "./04-what-happened";
import { Slide05WhatIsACdn } from "./05-what-is-a-cdn";
import { Slide06WhyCdns } from "./06-why-cdns";
import { Slide07BigImpact } from "./07-big-impact";
import { Slide08Downdetector } from "./08-downdetector";
import { Slide09WhyCentralised } from "./09-why-centralised";
import { Slide10Consequences } from "./10-consequences";
import { Slide11Mitigation } from "./11-mitigation";
import { Slide12MultiCloud } from "./12-multi-cloud";
import { Slide13Outsourcing } from "./13-outsourcing";
import { Slide14CarePulseImpact } from "./14-carepulse-impact";
import { Slide15CloudflareVsVercel } from "./15-cloudflare-vs-vercel";
import { Slide16PoliticalImpact } from "./16-political-impact";
import { Slide17OutageHistory } from "./17-outage-history";
import { Slide18Questions } from "./18-questions";
import { Slide19Contents } from "./19-contents";

export const SLIDES: SlideEntry[] = [
  {
    id: "01",
    title: "Cloudflare outage — Exploring the impact and mitigation strategies",
    theme: "dark",
    Component: Slide01Title,
    steps: 0,
  },
  {
    id: "02",
    title: "What does Cloudflare do?",
    theme: "light",
    Component: Slide02WhatCloudflareDoes,
    steps: 0,
  },
  {
    id: "03",
    title: "What did NOT happen ?",
    theme: "light",
    Component: Slide03WhatDidNotHappen,
    steps: 0,
  },
  {
    id: "04",
    title: "What actually happened?",
    theme: "light",
    Component: Slide04WhatHappened,
    steps: 0,
  },
  {
    id: "05",
    title: "What is a CDN?",
    theme: "light",
    Component: Slide05WhatIsACdn,
    steps: 0,
  },
  {
    id: "06",
    title: "Why are CDNs used?",
    theme: "light",
    Component: Slide06WhyCdns,
    steps: 0,
  },
  {
    id: "07",
    title: "Why did this outage have such a big impact?",
    theme: "light",
    Component: Slide07BigImpact,
    steps: 0,
  },
  {
    id: "08",
    title: "Why did this outage have such a big impact?",
    theme: "light",
    Component: Slide08Downdetector,
    steps: 0,
  },
  {
    id: "09",
    title: "Why is it so centralised?",
    theme: "light",
    Component: Slide09WhyCentralised,
    steps: 0,
  },
  {
    id: "10",
    title: "Consequences of centralisation",
    theme: "light",
    Component: Slide10Consequences,
    steps: 0,
  },
  {
    id: "11",
    title: "Impact mitigation - what can someone do?",
    theme: "light",
    Component: Slide11Mitigation,
    steps: 0,
  },
  {
    id: "12",
    title: "Multi-cloud is not the solution",
    theme: "light",
    Component: Slide12MultiCloud,
    steps: 0,
  },
  {
    id: "13",
    title: "Finding the balance of outsourcing work",
    theme: "light",
    Component: Slide13Outsourcing,
    steps: 0,
  },
  {
    id: "14",
    title: "Impact on CarePulse - what can we do?",
    theme: "light",
    Component: Slide14CarePulseImpact,
    steps: 0,
  },
  {
    id: "15",
    title: "Cloudflare vs Vercel",
    theme: "light",
    Component: Slide15CloudflareVsVercel,
    steps: 0,
  },
  {
    id: "16",
    title: "Political impact",
    theme: "light",
    Component: Slide16PoliticalImpact,
    steps: 0,
  },
  {
    id: "17",
    title: "Outage history",
    theme: "light",
    Component: Slide17OutageHistory,
    steps: 0,
  },
  {
    id: "18",
    title: "Questions",
    theme: "light",
    Component: Slide18Questions,
    steps: 0,
  },
  {
    id: "19",
    title: "Contents",
    theme: "light",
    Component: Slide19Contents,
    steps: 0,
  },
];
