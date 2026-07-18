---
title: "Move Your Contacts and Calendar (Where the Seams Show)"
description: "Copying them was the easy part. Rewiring your phone is the real job — and this is the one page where I tell you it's fine to keep Google on purpose."
order: 8
tier: "tier-1"
cta:
  label: "Run the rest through the two questions"
  href: "/cheap-vs-load-bearing"
  note: "the framework that makes the next decision for you"
---

If you followed [Move Your Inbox](/move-your-inbox), your contacts and calendar are already sitting in Proton. Easy Switch copied them over in the same pass as your mail. So why is there a whole page for this?

Because copying them was the easy part, and it isn't the part that matters.

Your inbox is a place you visit. Your address book and your calendar are *plumbing.* They're wired into your phone's dialer, your car, your watch, the invites your coworkers send, and the little box that tells you who's calling before you pick up. Moving the data takes an afternoon. Rewiring the plumbing is the actual job.

And this is the one page on this site where I'm going to tell you that you might reasonably look at all this and decide not to. Let me show you why, and then you can decide.

## First, the part I have to be straight with you about

Here's something most "de-Google your life" guides skip, and it's the single most important fact on this page:

**Proton doesn't sync contacts or calendars into your phone's built-in apps.** Not on iPhone, not on Android. There's no CalDAV or CardDAV support — those are the standard protocols your phone speaks — and syncing contacts to your device address book is still on Proton's someday list, not shipped.

In practice that means:

- **Your Proton calendar lives in the Proton Calendar app.** Not your iPhone's Calendar. Not your Android calendar widget. Not CarPlay. Not "hey Siri, what's on my calendar."
- **Your Proton contacts live in the Proton Mail app.** Your phone's dialer doesn't know about them. Someone rings and you get a bare phone number instead of a name.

That's not Proton being lazy. It's the direct cost of the thing you're buying: their servers genuinely can't read your calendar or your contacts, and those old sync protocols assume a server that *can.* You can't have both. Fine trade — but you need to know about it *before* you pull your contacts out of Google, not the first time your phone rings and you don't know who it is.

## So run it through the two questions

You know the drill by now — [cheap to leave, or load-bearing?](/cheap-vs-load-bearing) Contacts and calendar land in different places for different people, so sort them separately.

### Your calendar

**If your calendar is basically yours** — appointments, the dentist, a couple of shared things with your spouse — then it's cheap to leave. The Proton Calendar app is genuinely good. Put it on your phone, use it, done. Having your calendar in its own app instead of stitched into everything is a mild adjustment for about a week.

**If your calendar is load-bearing**, you'll know because it's doing work outside its own app: work invites that have to land where your employer can see them, CarPlay on your commute, a shared family calendar four people depend on, a scheduling link clients book into. Proton Calendar will fight you on all of that. Two honest options:

- **Use a calendar host that speaks the standard protocols.** Fastmail, mailbox.org, and Posteo all support CalDAV, which means they sync into your phone's real calendar app like Google did. You've still left Google. You just picked a landlord who plays nicer with your phone.
- **Keep Google Calendar. On purpose.** Yes, really. Keep reading.

### Your contacts

For contacts there's one question that decides everything: **do you care whether your phone shows a name when it rings?**

Almost everyone does. So:

- **On an iPhone, the simple answer is iCloud.** Your contacts move off Google, they sync into the dialer, everything just works. You have — accurately — swapped Google for Apple. That's not a cop-out. Go back and read [the three landlords](/the-three-landlords): Apple's grip on you is a different shape, and if you've decided you'd rather be there with your eyes open, that's a real decision and it counts.
- **On Android, this is genuinely harder,** because the address book is Google's home field. Your realistic choices are a CardDAV provider (same list as above) synced with a helper app, or keeping contacts in Google deliberately and containing it.
- **Or keep two address books.** Proton Contacts for mail, your phone's own contacts for calling. It sounds inelegant. A lot of thoughtful people quietly do exactly this and never think about it again.

## Okay — the actual moving part

Whatever you decided above, do this first.

### Get your data out of Google

Do this even if you're keeping Google. Especially then.

**Contacts:** go to `contacts.google.com`, find **Export** in the left sidebar, and choose **vCard** if you're headed anywhere Apple, or **Google CSV** if you're just making a backup. Save the file somewhere real — not your Downloads folder.

**Calendar:** go to `calendar.google.com` → **Settings** → **Import & export** → **Export**. You'll get a `.zip` with one `.ics` file per calendar.

That's your parachute. Everything after this is reversible because you have those two files. Having your own copy of your own contacts isn't a de-Googling step, it's just *owning your stuff* — you should have done it years ago and so should I.

### Point your phone at the new place

This is the step that actually matters, and it's the one people skip.

**On iPhone:** Settings → Contacts → **Default Account**, and Settings → Calendar → **Default Calendar**. That setting decides where *new* entries go.

**On Android:** it moves around depending on who made your phone, but you're looking for the default account for new contacts in the Contacts app's settings, and the Google account's sync toggles under Accounts.

Miss this and here's what happens: you dutifully import everything somewhere new, feel great about it, and then quietly keep saving every new contact straight back into Google for the next five years. The import is not the move. **The default is the move.** That's the whole thesis of this site showing up in a settings menu.

### Dedupe, because you will have duplicates

Between the Easy Switch import and whatever was already on your phone, you're going to end up with two of some people. Both iPhone and Google Contacts have a merge-duplicates tool. Run it once, accept that it'll miss a couple, move on. Nobody's address book has ever been clean.

### Turn off Google's sync *last*

Same rule as not deleting Gmail in week one. Let the new setup run for a week first. Make some calls, accept some invites, add a contact, see that it lands in the right place. *Then* go turn off contacts and calendar sync for the Google account on your phone.

If you turn Google's sync off first and something didn't come across, you'll find out about it in the worst possible way — at the moment you needed it.

## The part nobody warns you about: other people

Your inbox is yours. Your calendar isn't, entirely.

**Invitations still go to your old address.** Someone in your life will keep sending invites to your Gmail for years. The forwarding you set up in the inbox guide catches these, which is one more reason to leave it running.

**Shared calendars don't move because you moved.** If your family runs on a shared Google calendar, you leaving doesn't relocate it — it just removes you from it. You can subscribe to it read-only from elsewhere, or you can be the one who keeps a foot in Google so the household keeps working. Neither of those is failure.

A calendar is a social object. You don't get to unilaterally migrate something four other people are standing on, and it's worth being honest with yourself about that before you start.

---

## What you actually did

You made your own copy of your own contacts and calendar. You decided — actually decided, with the tradeoff in front of you — where new ones should go. You pointed your phone at that place. And you found the one spot where the tools aren't quite there yet and made a deliberate call about it instead of finding out by accident.

If you finished this page and your conclusion was *"I'm moving my calendar and keeping Google contacts because my phone needs to tell me who's calling"* — good. That's not settling. That is precisely, exactly the point. You know what Google is holding, you know why you're letting them, and you have the export file that means you could leave next Tuesday if you changed your mind.

Cheap stuff, gone. Load-bearing stuff, kept on purpose, with your eyes open.

That's the whole game, and you just played it on the hardest hole.
