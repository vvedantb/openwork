import { cronJobs } from "convex/server";
import { internal } from "./_generated/api";

const crons = cronJobs();

crons.cron(
  "prune presentation sessions",
  "0 5 * * *",
  internal.presentations.pruneStaleInternal,
  {},
);

export default crons;
