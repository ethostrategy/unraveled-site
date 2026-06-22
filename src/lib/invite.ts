/**
 * Share pipeline. Both the invite button and the rally button open a share
 * dialog (rendered once by <ShareDialog/>) with pre-composed copy + a personal
 * link, offering text / email / X / copy — plus the OS share sheet (which routes
 * to Instagram stories, Snap, Messages, etc. on mobile).
 */

export type ShareContent = { title: string; text: string; url: string };

function refUrl() {
  if (typeof window === "undefined") return "";
  const ref = window.localStorage.getItem("unraveled_ref") || "";
  return `${window.location.origin}/${ref ? `?ref=${ref}` : ""}`;
}

export function openShare(title: string, text: string, url: string) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent<ShareContent>("unraveled:share", {
      detail: { title, text, url },
    })
  );
}

export function sendInvite() {
  openShare(
    "Send an invite",
    "Player 2 needed. Join Unraveled with me!",
    refUrl()
  );
}

export function rallyFriends() {
  openShare(
    "Ask for help",
    "Help me solve a riddle to unlock the next Unraveled launch!",
    refUrl()
  );
}

// Shared from the SOLVED state — brag + pull people into the next launch.
export function shareSolved() {
  openShare(
    "Tell your people",
    "I just solved Unraveled's riddle! Come solve it too and help unlock the next launch:",
    refUrl()
  );
}
