import type { SlideEntry } from "@/slides/types";
import { Slide01Title } from "./01-title";
import { Slide02Contents } from "./02-contents";
import { Slide03Defining } from "./03-defining";
import { Slide04WhatIs } from "./04-what-is";
import { Slide05Components } from "./05-components";
import { Slide06Diagram } from "./06-diagram";
import { Slide07DiagramExample } from "./07-diagram-example";
import { Slide08StateManagement } from "./08-state-management";
import { Slide09TypesOfState } from "./09-types-of-state";
import { Slide10TypesOfStateDiagram } from "./10-types-of-state-diagram";
import { Slide11XState } from "./11-xstate";
import { Slide12NhImplementation } from "./12-nh-implementation";
import { Slide13DcImplementation } from "./13-dc-implementation";
import { Slide14BenefitsState } from "./14-benefits-state";
import { Slide15BenefitsAtomic } from "./15-benefits-atomic";
import { Slide16BenefitsReliable } from "./16-benefits-reliable";
import { Slide17ConsRace } from "./17-cons-race";
import { Slide18ConsIllegal } from "./18-cons-illegal";
import { Slide19Summary } from "./19-summary";
import { Slide20SummaryQuiz } from "./20-summary-quiz";
import { Slide21SupaTracker } from "./21-supa-tracker";

export const SLIDES: SlideEntry[] = [
  {
    id: "01",
    title: "Using state machines for the NH cost calculator",
    theme: "dark",
    Component: Slide01Title,
    steps: 0,
  },
  {
    id: "02",
    title: "Contents",
    theme: "light",
    Component: Slide02Contents,
    steps: 0,
  },
  {
    id: "03",
    title: "1. Defining state and machine",
    theme: "light",
    Component: Slide03Defining,
    steps: 0,
  },
  {
    id: "04",
    title: "2.1 What is a state machine?",
    theme: "light",
    Component: Slide04WhatIs,
    steps: 0,
  },
  {
    id: "05",
    title: "2.2 Key components of a state machine",
    theme: "light",
    Component: Slide05Components,
    steps: 0,
  },
  {
    id: "06",
    title: "3.1 State machine diagram",
    theme: "light",
    Component: Slide06Diagram,
    steps: 0,
  },
  {
    id: "07",
    title: "3.2 State machine diagram example",
    theme: "light",
    Component: Slide07DiagramExample,
    steps: 0,
  },
  {
    id: "08",
    title: "4. State management",
    theme: "light",
    Component: Slide08StateManagement,
    steps: 0,
  },
  {
    id: "09",
    title: "5. Types of state",
    theme: "light",
    Component: Slide09TypesOfState,
    steps: 0,
  },
  {
    id: "10",
    title: "5. Types of state",
    theme: "light",
    Component: Slide10TypesOfStateDiagram,
    steps: 0,
  },
  {
    id: "11",
    title: "6. Introducing XState",
    theme: "light",
    Component: Slide11XState,
    steps: 0,
  },
  {
    id: "12",
    title: "Nursing homes implementation",
    theme: "light",
    Component: Slide12NhImplementation,
    steps: 0,
  },
  {
    id: "13",
    title: "Domcare implementation",
    theme: "light",
    Component: Slide13DcImplementation,
    steps: 0,
  },
  {
    id: "14",
    title: "Benefits of NH implementation vs DC",
    theme: "light",
    Component: Slide14BenefitsState,
    steps: 0,
  },
  {
    id: "15",
    title: "Benefits of NH implementation vs DC",
    theme: "light",
    Component: Slide15BenefitsAtomic,
    steps: 0,
  },
  {
    id: "16",
    title: "Benefits of NH implementation vs DC",
    theme: "light",
    Component: Slide16BenefitsReliable,
    steps: 0,
  },
  {
    id: "17",
    title: "Cons of DC implementation vs NH",
    theme: "light",
    Component: Slide17ConsRace,
    steps: 0,
  },
  {
    id: "18",
    title: "Cons of DC implementation vs NH",
    theme: "light",
    Component: Slide18ConsIllegal,
    steps: 0,
  },
  {
    id: "19",
    title: "Summary",
    theme: "light",
    Component: Slide19Summary,
    steps: 0,
  },
  {
    id: "20",
    title: "Summary",
    theme: "light",
    Component: Slide20SummaryQuiz,
    steps: 0,
  },
  {
    id: "21",
    title: "SUPA tracker",
    theme: "light",
    Component: Slide21SupaTracker,
    steps: 0,
  },
];
