import { SLIDES } from "@/slides/cloudflare-outage/slides";
import type { SpeakerNotesResult } from "@/slides/types";

/**
 * Presenter script — one entry per slide `id` in `slides/index.ts`, copied
 * verbatim from the source PowerPoint's speaker notes ("" where it had none).
 * Rendered with `whitespace-pre-wrap` in presenter view.
 */
const SPEAKER_NOTES: Record<string, string> = {
  "01": `So yeah, today I’ll be going over the Cloudflare outage that happened 2 weeks ago, talk about what happened, and explore its impact and go over some mitigation strategies`,
  "02": `So, to understand what caused the outage, we need to first go through what Cloudflare is and what it does

Cloudflare is an internet platform that sits in front of millions on websites

It provides multiple services to these websites such as

Performance improvements through its CDN, caching, and routing services
Security services through DDoS protection service
and Network management options through its automatic load balancing services

All of these services are packaged into one platform which is why so many companies use Cloudflare for everything (for images, API requests, and authentication)


Now before I say what happened, let’s talk about what did not happen,`,
  "03": `Now before I say what happened, let’s talk about what did not happen, 

Cos if you were on social media after the outage, you may have seen some tweets from engagement farmers that sharks ate the undersea cables

Or that devs pushed AI generated code and broke down the services, you know always blaming us for everything

Which none of them are true btw`,
  "04": `So what actually happened to have caused such a massive outage for everyone

Well, they made a permission change in one of their database systems which unexpectedly created duplicate entries in their feature file, which is what they use to protect websites from bots. 

It usually contains around 60 features, but this bug made it store over 200,

And that file grew to a massive size, and that had an impact on their routing service, which reads this file but has a limit of how big the file size can be, which is set at 200 features. 

This feature file needs to be constantly updated, it can’t just be a set of rules that stays constant, it gets always updated and refreshed every 5 or so minutes.

But because it was too big, the service couldn’t handle such a large size and just crashed, which had a massive impact on their core CDN services`,
  "05": `Now what actually is a CDN?

A CDN is basically a network of servers spread around the world that deliver content from the location closest to the user. 

So instead of every user requesting data from a single origin server — which would be slow — the CDN caches things like images, videos, scripts, and even full HTML pages at different global areas

So when people say ‘this website uses Cloudflare’ or ‘this site is on a CDN,’ they’re talking about this global infrastructure handling most of the work.

It’s one of the core pieces that makes the Internet feel so fast, even when the actual server might be on the other side of the world.`,
  "06": `Now why are CDNs used, like what is the result of using them?

So the main reason they exist is to make websites and apps load faster. 

Instead of every user hitting the main server — which might be on a completely different continent — they connect to a cached copy that’s physically closer to them. That reduces latency, speeds up page loads, and makes things like images and videos feel instant.

If an app is hosted in the UK, any non-UK users accessing the app without a CDN will have slower user experience

With a CDN they would instead connect to a server closest to them, e.g. to a US server for US users.


The other big advantage is load distribution. If you have millions of users, sending all of them to one origin server just isn’t realistic. A CDN spreads that traffic across many areas, so the origin server isn’t overwhelmed. 

It essentially scales the network without you needing to run hundreds of servers yourself.

So overall, CDNs improve speed, reliability, and the ability to handle large amounts of traffic — which is why so many websites rely on them today.`,
  "07": `So why did this outage have such a big impact?

Cloudflare’s impact is huge simply because of how widely it’s used.

They’ve got around 40 million customers, and they power roughly 80% of CDN websites and 20% of all websites on the entire internet.

With that level of adoption, their network is everywhere, across every region, every industry, every type of service.

Because of that global scale, when a core Cloudflare service fails, it can’t be neatly contained. It affects multiple regions at once, and thousands of apps suddenly lose a critical part of their infrastructure.

That’s why the outage mattered so much, when a provider this large has an issue, it doesn’t just take down one company, it affects a huge portion of the internet simultaneously. 

And during the rollback, even more pressure hit their systems as traffic flooded back in, which extends the impact of the outage.

And that’s the real issue here: centralisation.

When one provider dominates the whole space, any failure they have just hits everyone at the same time. Doesn’t matter if your app is the most secure — if Cloudflare’s front door to your app breaks down, no one’s getting inside.

So yeah, the takeaway is basically:
We’ve centralised a large amount of the internet into one company.

And when that one company goes down, a huge chunk of the internet goes down too.

It’s efficient when things work, but the blast radius becomes enormous when something goes wrong.`,
  "08": `The impact of this outage was so bad, even down detector went down because their infrastructure depended on Cloudflare as well

So people jokingly vibe coded an alternative downdetector just to check whether this was down too which I thought was funny`,
  "09": `So the big question — why is everything so centralised around Cloudflare in the first place?

Well, it’s because they’ve poured large amounts of money into building data centres and edge servers everywhere. Smaller providers just can’t compete with that level of global coverage. 

Cloudflare can afford to run this huge network, and because it’s so big, the cost per customer drops. That’s why they can offer good performance for super cheap or even for free.

This creates a proper network-effect feedback loop.

Cloudflare gets big through its investments → prices drop → more customers join → it gets even bigger → and the cycle keeps feeding itself.

Once you hit that level, it’s basically “why would anyone go anywhere else?”

Cos it’s just easier, cheaper, safer, and faster to let Cloudflare handle this stuff rather than trying to do it all yourself.

Running your own CDN, DDoS protection, DNS, traffic routing, all that… it’s not realistic unless you’re Amazon or Meta. For normal companies, it’s simpler to just use Cloudflare.

So that’s how we ended up here — not because people want centralisation, but because Cloudflare just makes everything convenient and affordable compared to the alternatives.`,
  "10": `So the main problem with all this centralisation is the blast radius.

When one provider has this much of the internet running through it, an outage doesn’t just hit a few random sites — it hits everyone at the same time. 

One issue at Cloudflare basically creates a chain reaction across thousands of services instantly.

And it’s not just about the CDN being down or things loading slowly.

People forget Cloudflare isn’t only used for speed — it’s also doing security, bot filtering, authentication, access control, all that stuff.

So when those features break, it’s not like there is reduced performance, it’s more so that the entire service is down.

And that’s the real consequence of centralisation: One provider an issue, and suddenly everyone else suffers as consequence.`,
  "11": `So yeah, the reality is… you can’t fully prevent outages like this.

When a provider as big as Cloudflare goes down, nobody is gonna be fully immune. But there are ways to reduce how painful it is.

First thing: use cached data wherever possible.

During the outage, some apps were still partly usable because they could fall back to whatever data they already had cached locally. 

Like X — you couldn’t load new tweets, but the app itself didn’t fully die. Your UI still worked, your old feed was still there. That’s the kind of fallback that you want.

Next: multi-cloud or at least multi-provider thinking.

You don't need full multi-cloud (that’s overkill for most teams and introduces other issues), but having alternatives ready even if they’re only used during emergencies. 

Stuff like:
secondary DNS provider
backup CDN for assets likes images
ability to bypass Cloudflare temporarily and hit your main server directly

It’s not about running two full infrastructures — it’s just giving yourself escape routes when you need them.

And honestly, that’s the main takeaway: You can’t stop global outages, but you can design your app so it doesn’t just instantly fall over the second someone else has an issue.`,
  "12": `So a lot of people hear about outages like this and instantly say that we need to have multi-cloud.

But honestly… multi-cloud is not the magic fix people think it is.

Yeah, in theory it makes you more resilient to one cloud vendor going down.

But the trade-off is huge. You now have:

double the infrastructure
double the configs
double the monitoring
and double the chance for someone to misconfigure something and cause another outage

All that complexity slows you down massively.

Your team ships features slower, deployments become way more painful, and because there’s more moving parts, there’s more room for human error — which ironically makes you less reliable.

It also costs a lot more, because you’re now running and maintaining two of everything for “just in case.”

So yeah — multi-cloud sounds interesting, but realistically it kills your velocity and doesn’t solve the actual centralisation issue we’re talking about.`,
  "13": `Now I mentioned not introducing more moving parts, but this doesn’t apply to everything, sometimes its better to outsource parts of your system, so for things like authentication we are now using WorkOS for this.

Reality is we need to have some reliance on third party services, and this is cos they have more time and ability to maintain that particular feature and fix it quickly if there any issues compared to us

We do authentication because we have to, but we aren’t experts in it, so it’s better to outsource this to a provider whose core job specialises and revolves around authentication whilst we work on the rest of the system

But the consequence of this is that if they have an outage, then so do you, so the chance of an outage has just increased.

So yeah, main takeaway from this is that you don’t want to outsource everything, but you also don’t want to do everything yourself. 

Need to find the right balance between the two, which depends on what area this is for, but I think should be based on the surface area and effort. So larger the work involved and the more effort is it to maintain something, then the more return you get by outsourcing it to that provider, so it makes sense for those sorts of cases.`,
  "14": `So for us, the main issue during the outage was that postcode search stopped working. It’s a good example of how even a small dependency failing can disrupt core user flows.

This comes back to blast radius. 

When the affected area is small, it’s actually manageable — we can just add backups or fallbacks without much maintenance. 

For something like postcode lookup, the fix is easy:  we can use an alternative API or have a secondary provider ready to take over if the primary one goes down.

But as the blast radius grows, the operational cost grows with it. 

Adding backups for every single external dependency becomes unrealistic, which is why we need to be selective of where we have these backups.

So for CarePulse, the approach could be: Identify small but critical features (like postcode search), and then add simple, low-effort fallbacks for those.

Not every feature needs full redundancy, but the core user paths should have a backup plan.`,
  "15": `So even though Cloudflare offers hosting options, we use Vercel because the two platforms have different focuses.

Cloudflare is generally used for DNS, security, and global-scale traffic, which makes a lot of sense when you’re serving users worldwide.

But for us, our core user base is mainly in the UK, so a lot of the extra features Cloudflare provides aren’t really needed.

Vercel, on the other hand, is focused on developer experience — fast preview deployments, built-in functions, and a workflow that fits with our tech stack, so yeah, we’re using vercel bc its fits and is optimised for what we use.

The two aren’t mutually exclusive though, you can run a site on Vercel and still use Cloudflare for DNS or security. 

Everything you do or want on cloudflare you can do the exact same on Vercel now and vice versa, it’s just for the services we rely on, Vercel already meets our requirements`,
  "16": `So when we talk about political responses to outages like these, one of the ideas that always comes up is forcing more fragmentation — basically pushing for more providers to enter the space so things aren’t so centralised.

But the reality is: fragmentation usually hurts the end user.

If we split everything across lots of smaller providers, we’d see lower availability, more downtime, and weaker performance overall. 

The only reason the internet is as reliable as it is today is because a few major companies invest heavily into their global infrastructure.

That level of reliability simply isn’t achievable by dozens of smaller, isolated providers.

So while centralisation has clear downsides — like what we just experienced — the alternative isn’t automatically better. You’d end up with more inconsistent performance, more outages, and a worse experience for users.

It’s basically a tradeoff: We get stability and performance because large companies operate at scale, but that also means when one of them fails, the impact is wider. Finding the right balance is the main challenge.`,
  "17": `Now, when you actually look at Cloudflare’s outage history, the numbers are surprisingly low.

Across the last five years, there have only been four major outages. Two were around 30 minutes, and the more recent ones were longer — but even then, their overall uptime still sits around 99.9%.

For a service operating at Cloudflare’s scale, that level of reliability is extremely high. 

And this is important when thinking about mitigation and backups: is it realistically possible to push beyond 99.9% uptime without massive complexity and cost? 

In most cases, the answer is no.

To get above that, you’d need backup systems in place and a multi-vendor setup—both which just introduce new failure points and slow down development. 

And even with all that, you might not actually improve reliability because you’re adding more moving parts.

So the question becomes:
Is the extra maintenance and operational overhead worth it just to try to beat 99.9% uptime?
For most companies, including us, the answer is simply no. At some point, the tradeoff stops making sense.`,
  "18": `So yeah that’s pretty much it

Any questions`,
  "19": "",
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
