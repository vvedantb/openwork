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
import { Slide10ComponentTree } from "./10-component-tree";
import { Slide11XState } from "./11-xstate";
import { Slide12ExampleMachine } from "./12-example-machine";
import { Slide13FreeForm } from "./13-free-form";
import { Slide14BenefitsCentralised } from "./14-benefits-centralised";
import { Slide15BenefitsReliable } from "./15-benefits-reliable";
import { Slide16FreeFormRisks } from "./16-free-form-risks";
import { Slide17Summary } from "./17-summary";
import { Slide18RecapQuiz } from "./18-recap-quiz";

export const SLIDES: SlideEntry[] = [
  {
    id: "01",
    title: "State machines with XState",
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
    title: "5. Types of state: component tree",
    theme: "light",
    Component: Slide10ComponentTree,
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
    title: "7. Worked example: a cart machine",
    theme: "light",
    Component: Slide12ExampleMachine,
    steps: 0,
  },
  {
    id: "13",
    title: "8. The same cart, free-form",
    theme: "light",
    Component: Slide13FreeForm,
    steps: 0,
  },
  {
    id: "14",
    title: "State machine approach: benefits",
    theme: "light",
    Component: Slide14BenefitsCentralised,
    steps: 0,
  },
  {
    id: "15",
    title: "State machine approach: benefits",
    theme: "light",
    Component: Slide15BenefitsReliable,
    steps: 0,
  },
  {
    id: "16",
    title: "Free-form approach: risks",
    theme: "light",
    Component: Slide16FreeFormRisks,
    steps: 0,
  },
  {
    id: "17",
    title: "Summary",
    theme: "light",
    Component: Slide17Summary,
    steps: 0,
  },
  {
    id: "18",
    title: "Recap",
    theme: "light",
    Component: Slide18RecapQuiz,
    steps: 0,
  },
];
