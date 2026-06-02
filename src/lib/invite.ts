/**
 * Opens a pre-filled invite. On mobile the native share sheet lets the member
 * fire off a text or email in one tap; on desktop we fall back to an email
 * draft. Personalizes with the member's referral code when one is stored.
 */
export async function sendInvite() {
  if (typeof window === "undefined") return;
  const ref = window.localStorage.getItem("unraveled_ref") || "";
  const url = `${window.location.origin}/${ref ? `?ref=${ref}` : ""}`;
  const text =
    "I'm getting early access to Unraveled — a new way to level up every relationship. Come in with me:";
  if (navigator.share) {
    try {
      await navigator.share({ title: "Unraveled", text, url });
      return;
    } catch (e) {
      if (e instanceof DOMException && e.name === "AbortError") return;
    }
  }
  window.location.href = `mailto:?subject=${encodeURIComponent(
    "Come into Unraveled with me"
  )}&body=${encodeURIComponent(`${text}\n\n${url}`)}`;
}
