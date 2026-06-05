/**
 * Share pipeline. Both the invite button and the rally button open a share
 * dialog (rendered once by <ShareDialog/>) with pre-composed copy + a personal
 * link, offering text / email / X / copy — plus the OS share sheet (which routes
 * to Instagram stories, Snap, Messages, etc. on mobile).
 */

export type ShareContent = { text: string; url: string };

function refUrl() {
  if (typeof window === "undefined") return "";
  const ref = window.localStorage.getItem("unraveled_ref") || "";
  return `${window.location.origin}/${ref ? `?ref=${ref}` : ""}`;
}

export function openShare(text: string, url: string) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent<ShareContent>("unraveled:share", { detail: { text, url } })
  );
}

export function sendInvite() {
  openShare(
    "I'm getting early access to Unraveled — a new way to level up every relationship. Come in with me:",
    refUrl()
  );
}

export function rallyFriends() {
  openShare(
    "Help me crack Unraveled's code to unlock the launch — sign up and take a shot with me:",
    refUrl()
  );
}
