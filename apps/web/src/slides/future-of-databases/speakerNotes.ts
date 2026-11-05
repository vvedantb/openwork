import { SLIDES } from "@/slides/future-of-databases/slides";
import type { SpeakerNotesResult } from "@/slides/types";

/**
 * Presenter script — one entry per slide `id` in `slides/index.ts`, copied
 * verbatim from the source PowerPoint's speaker notes ("" where it had none).
 * Rendered with `whitespace-pre-wrap` in presenter view.
 */
const SPEAKER_NOTES: Record<string, string> = {
  "01": `So yeah, today I’ll be going over a new database service called Convex  that the dev team has switched to in some newer projects already like the cost model, the direct awards, and the nursing home care package finder

==========`,
  "02": `So I’ll go over the reasons why exactly we’re switching– like its benefits and compare this to what we were using before. 

Then a few minor drawbacks, some which are solvable, 

And then go over components that Convex has built that makes adding AI features to any app easier

And finally show how the primitives that Convex is built  upon  makes coding with AI assistants like Cursor or Claude Code much much safer on our side.`,
  "03": `So yeah first benefit of Convex is its live updates, reactivity feature

Which basically means that whenever you view a page, you are always going to be seeing the latest changes made to it, you don’t need to refresh the page to see updates, as the data on the page will automatically be updated to show the latest value.

A basic example of this in action is in an announcements section, if user A creates and publishes an announcement to all the users and user B is already on the announcements page, User B would need to refresh the page to view that latest announcement.

However, with Convex, as all data you view on a page is always up to date, the second that announcement is posted, you will see your screen update to view that latest announcement without refreshing.

This is more of a nice to have feature on the user-side but it can prevent issues in other scenarios where a user might have a tab open for too long and then act on that outdated data.`,
  "04": `Another benefit to having live updates comes on our side – as devs we would have to handle this manually by adding code to handle those updates, so that other components on the page get refreshed so you see the latest value.

But this only gets applied to user A, if user B still has their tab open with that same page, they will still be viewing that outdated data, so that’s an issue that remained unresolvable.

And as you can see on the graph, it can be handled, but it can only be fixed for the user posting those announcements, and the more places that a user has the action to update the status of something, the more places we need to add these manual checks to refresh the component.

And as the number of update areas increase, the amount of effort we need to put it to make sure that data is consistent with what the latest value is supposed to be, increases too.

Another example of where this would be useful is viewing stats on dashboard pages. So, the second the status of a value, the progress of an application, or any other property of the application state is updated, everyone on that page will see those latest changes.`,
  "05": `So these live updates are powered by a WebSocket connection, and you may have seen this in action already in other places like trading apps, google docs, figma.

Anything that involves live interactivity probably uses a WebSocket connection to make it live, which is what Convex also uses.

WebSockets can be implemented without Convex, so the teams at those companies shown above have implemented it themselves, but it’s usually more complicated than just manually resolving the data inconsistencies I talked about earlier, which is why we’ve stuck with that approach. 


But implementing it ourselves isn’t an easy task, it’s quite complex and would mean we would need to spend extra time setting it up and testing if the connection even works, which is why isn’t not common for them to be used, they are usually reserved if the service requires the user to always view live data.

But with Convex, we don’t need to worry about that at all, all of this live interactivity is provided out of the box for us, it’s enabled by default, so we don’t need to worry about implementing WebSockets nor do we need to worry about data being inconsistent either.  So it fixes both issues in one for us.

One recent example of this being an issue is the care package finder, which I think Krzys you can probably share how using Convex would have solved the issues in there?`,
  "06": `Second huge advantage of using Convex for us is preview deployments

Previously, as you can see on the graph on the left, any time any dev made a change to the database, we would need to have it applied on staging so it becomes ready for review.

This meant that conflicts could occur between our changes if we edit the same data, and that would require manual intervention to fix those conflicts.

But Convex offers preview databases to us, so we get given our own database, on the cloud, that we can make changes to, 

Which means that our changes are isolated and independent of each other - there is no impact on staging or any other developers database when making changes`,
  "07": `So third advantage is basically the second but more so on our side, so for devs.

So before we only had 2 databases: a production one, that the live website uses, and staging.

As there weren’t any preview deployment prior to using Convex, all changes needed to happen on staging, 

This meant that for the 3 of us, after making the change locally, we needed it to apply to the preview environment

Which means messaging krzys asking to do that on staging, then waiting for that change to be applied on the staging database, and then finally waiting for the deployment to finish building, before it is available for testing or review.

And if we needed to make it live, we would basically need to repeat this entire process.

So the main blocking steps in the before diagram is applying all the database migrations which Krzys handles.

But with Convex now, anytime we make a change, in fact the second I type something, it automatically applies the change to my preview database and the second I am done with implementing a feature, it is ready for review. No more waiting on migrations or for extra builds to be completed.

And same for making this change live, all that we would need to do is run one command, and it instantly get deployed to production.

So, on the left those migration steps block a review from happening after a developer is done with implementing a feature, which could take a few hours, and now on the right there are 0 blocking steps.`,
  "08": `Now, the fourth advantage, is mainly for Krzys here.

If you noticed in the previous slide, there was a step called “Handle migration conflicts”, now I simplified it as just one step in the image, cos Krzys was the person that handled this for us, but if I zoom in, it’s really an entire sub process of its own.

So basically, how it worked before, was that if George and I both had changes in our own environments, then we both required a migration done on staging to apply our changes there to get it ready for review.

However, both changes can’t just be applied in case there are conflicts, which happens if we both edit the same file and make different changes, so this needs to be handled.

So, there’s 2 ways of handling this, 

First is by ordering us based on priority, so asking the 3 questions:

Who needs their changes reviewed first?
Which launch has more importance?
What impact will our changes have on other preview environments, like on Krzys or Jaykes environments.

After getting the answers to those questions, then only can we apply the migrations in order of how quickly it needs to be made live essentially.

So, for all of our changes, the process involves applying the migration to staging, the preview environment then becomes ready for review as it’s connected to staging. 
Then once it’s been tested, we can merge into staging, then apply the same migration to production.
Then merge staging into production and then repeat this entire process for the next dev in the queue.`,
  "09": `The second method of handling this conflict is do just do it all in one go, so we combine the changes made by each dev into one big change, then repeat the same process as before.

This is usually done for smaller changes where you can easily combine everyone’s changes into one, but for larger features or projects it gets harder to review and manage, so it’s usually reserved for quick small changes that need deploying, so this is what we use in most scenarios.`,
  "10": `But now like I mentioned with Convex, this process pretty much gets cut in half, during the review stage there won’t be any migration conflicts as we have our own preview databases now, a conflict may only appear when we need to push our changes to production, but again like I mentioned before, it’s much easier to manage now, and is like a 10 second process, so even that won’t take long.

There were also more issues with how this was done before, where if a migration fails or is applied incorrectly, then the entire database could require resetting and then reseeding, which would take extra hours to do.

And if a migration needs to be reverted, that would take up additional time too.

Convex also prevents these failures from occurring by preventing the migration from happening, it gives us an error into what the exact issue is and how to solve it, so we can fix it on our end before it ever reaches staging.

Another issue is the dependency on Krzys to manage these migrations for us. With Convex tho, like I mentioned, as we have our own database, we don’t need to approach Krzys anymore to do this for us. 

So, if Krzys is away then we can manage these migrations ourselves now, it’s a decentralised process now.`,
  "11": `So yeah, this meme pretty much captures how it was before, for migrations specifically,

If users wanted a new feature, then we need to implement that feature, 
which the business teams then needs to review, 
but devs need that migration so that feature can be reviewed, 
and then Krzys needed to manage those migration conflicts so we can say to you that it’s ready for review.`,
  "12": `So the main benefit from these past 4 slides, is that the process from feature completion on our side to feature review on your side is now zero, no more blocking steps.

So yeah Convex is a game changer for us on this, it has simplified this entire process into just one command for us.`,
  "13": `Final main advantage that Convex provides, is its speed and responsiveness.

Convex automatically caches any actions the user makes, so the next time you visit a page it should be even faster than the first time.

This may not be visible right now since Convex only supports US regions, but once EU regions are added in it should be even faster than it already is.

Convex also has another caching option that is a bit more expensive but can be used on some pages still, and it makes it lightly speed levels fast, when I used it, it was no different than using an app locally, everything just loaded instantly

So, when we use this, you won’t see a loading ui indicator as frequently as you may now, or for a shorter duration, pages should become snappier, as the page would only be in the loading state for milliseconds.

And comparing to Supabase, which is what are using right now, most of the performance and sluggishness was cos of that, so you won’t even need to ask us if we have moved to Convex, you will feel how fast it is and know yourselves`,
  "14": `Now for the cons

First drawback is the business viability

It’s only 4 years old, it’s a startup and a new player in the database providing industry

They have made their system open source, so even if something does happen to Convex in the future, we can just self host it

But that would mean no new feature from Convex if they shutdown and we do self host, so eventually we would need to migrate away to another database provider

And that migration would take quite a bit of time since Convex is not like other database services which is what makes it so unique, so it would just take us more time basically, not an easy process.

But Convex has been growing quickly so we aren’t expecting this to be an issue, just a slight concern for us since they are new.

Oh and they also have a components library that I’ll talk about in a bit, but another concern is vendor lock in, since all our code will be structured with Convex, so migrating away will take time in refactoring all our changes.

Could be easier with AI, but who knows, hopefully we never have to.

But yeah, this isn’t unique to Convex, any service or provider we use comes with this drawback, that’s just the nature of using external services, you need to pay the price if want to migrate away, like with v2 to v3 for example.`,
  "15": `Next con is IT policies that some companies have that may not have been updated or reviewed yet

Basically, Convex uses WebSocket connections to connect to the database, which is what powers it to be live, reactive, realtime.

However, in the past, like 10-15 years ago, WebSockets could be unencrypted, so standard IT policy back then was to block all WebSocket connections on devices just to be extra safe.

But WebSockets have changed now, encryption is used by default, but some teams may still have that policy in place, which means they could be affected from using a website that uses Convex or Websockets in general if the policy is to outright ban them.

For most people this won’t be an issue, it would only have an impact on a small % of users stuck on legacy environments.

But yeah, an alternative viewpoint to this is should we even be treating this as a concern? If we worry about this, then should we also worry about supporting Internet Explorer users that have not migrated away to  Chrome or another browser? 

Microsoft doesn’t provide support for that browser anymore or those users, so I would say that’s the approach we should take too.`,
  "16": `Third con is that a page may become too reactive, if it is overloaded with new updates.

So an example of this would be a dashboard page with filters or sort by methods.

If we apply a filter to that page, and this dashboard contains data that gets updated frequently, like if 50 users update the vacancy of a home, then in the filtered view,  those cards would be jumping all over the place, since their value is getting updated in real-time and evaluated against the filter, which may cause it to be removed from the filter or new entries may pop up in the filtered view.

But yeah this is an issue only for pages that have data that is being updated frequently, so could be a potential issue for the AQP list when a filter is applied. 

But, we can fix this by just NOT making the page reactive, but then we lose out on the realtime benefit, but yeah this is a case by case issue, we would need to test it out first to see if it’s really an issue before just removing that benefit for that page.`,
  "17": `A fourth and final con, don’t worry only 4 minor minor cons, imagine if half the presentations was filled with cons that would not be a good look.

Con is that it doesn’t run SQL, which it what makes Convex a non traditional database in the sense that it uses a document-record store, which just means we can’t run SQL queries on it.

And this can be an issue for data exports, as I think there’s currently a code editor on there that allows you to run those queries to export specific data. But yeah I think Krzys maybe you could add a bit more to that on what the issue is`,
  "18": `Now onto the AI features.

So Convex has a components system, that is basically a set of libraries that the Convex team has built for us to implement any specific features or integrations to make it work with Convex easier.

There are a ton of components, but these 2 are the main ones that I can see us using in the future at some point, which is the Agents component and a RAG component.

This agents component allows us to create custom agents for any specific task, so this could be used for the Chatbot in the Resource Centre if the user wants to ask questions about the documents, we just install the component, quickly set it up, and connect it to the chatbot and should be ready to go.

And RAG which is Retrieval Augemented Generation which you can just think of as a really advanced searching system, that could be used in the search bar in the direct awards to search through the details of any application in natural language, or for the search bar in the resource centre too.

So yeah, these components make it much simpler for us to implement these features compared to doing it manually, actually wish Convex made these components a year ago would’ve come in clutch for the RC but it iz what it iz

But yeah slight con of this just going back to the vendor lock in, is that if we ever need to migrate away from Convex, we would need to implement these features manually, which would take some extra time and make migrating harder.`,
  "19": `Now moving onto using Convex with AI, so past section was on how we can build AI features with Convex, now we’re onto how to build stuff out with AI, so coding with AI

Luckily for us, the Convex team has a convex rules document that contains examples and documentation on how to write code for Convex.

And while this specific document is unique to Convex, there is also a general trends where websites have a /llms.txt page that contains documentation in plain text so the AI can search it up on web and this makes it easier to read since it’s all plaintext with no images.

So we have both options now, can ask it to search the docs, and with Convex rules it should make writing code even easier as we can feed it into the LLM as context and this should give us better results when working with AI.


But yeah this isn’t super important for us, nor was it even a consideration, Convex has already made things a lot simpler for us already so this is just an additional bonus for us when using AI to get better results.`,
  "20": `=====================

Now an even larger benefit of using AI to write Convex code is that it is built on primitives that naturally makes it the best to use with AI.

So on the left side we can see how before a lot of thing were handled by devs and could be done with AI too, but there’s just too many things you need to keep track of, you can’t completely trust AI to implement it perfectly let alone implement it at all. 

It would also make reviewing AI generated code harder, as not only do we need to ensure it’s implemented correctly, we would also need to review the side-effects from the generated code, like the realtime stuff, consistency, and if it’s performant or not.


But on the right side, a lot of these issues have now been taken care of for us within Convex itself. 
They take care of all the stuff in red for us and have ensured that it is as performant as it can be, 

so as a developer, it allows us to trust AI a bit more, rather than it just completing writing raw code, as Convex has this safety layer that prevents AI from interacting with the db on a lower level.

This makes it perfect when working with AI, as I don’t need to ask it to check for side effects, check for this, make sure this doesn’t happen etc.

I can just tell it to implement x y z and I can just review if it has implemented the feature properly, Convex handles and takes care of the rest, which saves us a ton of time not only for implementing but reviewing, testing, and fixing bugs too.

Also, due to Convex’s abstractions, it also reduces the number of lines of code that you need to write to get the same result. So this makes it easier not only for us, but for AI to understand the codebase and implement features too.`,
  "21": `Convex also has a LLM leaderboard, which is the only service I have seen that has this, which just shows they’re committed to building a platform designed for us to work together with AI.

Basically, they have an entire set of prebuilt tests that they run for each model that takes into account those 4 factors

So Correctness here is does the AI follow a specification that we provide to it

Efficiency is where it checks how performant the generated code is, like does it follow best practices etc.

Understanding is how well does it understand the codebase and add new functionality

And Instruction following is its ability to follow complex, multi-step instructions.

Actually it’s funny you can see 3.5 tops the board over here, but yeah these gets updated often, so you sometimes 3.7 comes on top, or sonnet 4.

I’ve personally found using different models for the same task gives me the best result, so I use Opus 4.1 for planning then Sonnet 4 for actually implementing the instructions since that’s what both models are better at, 

but yeah it’s good that Convex provides this as a guide for us devs to know which model works best with what technology.`,
  "22": `So yeah, just to reiterate the big plus point for everyone, is that Convex has been the only platform so far that allows us to fully focus on building features and getting those features live once built out, 

without having to spend extra time on our side worrying about potential side effects, data inconsistencies, migrations, or other common database issues.

Like I mentioned at the start of this presentation, we are already using Convex in the Cost Model, the Direct Awards, and potentially for the Nursing Home Care Package finder, and eventually the rest of CarePulse will be on Convex too, just need to focus on these 3 first before we do, but that is the future plan.

So yeah, that’s pretty much it, any questions?`,
};

export function getSpeakerNotes(slideNumber: number): SpeakerNotesResult {
  const entry = SLIDES[slideNumber - 1];
  if (!entry) {
    return { slideId: "", slideTitle: "", notes: "" };
  }
  return {
    slideId: entry.id,
    slideTitle: entry.title,
    notes: SPEAKER_NOTES[entry.id] ?? "",
  };
}
