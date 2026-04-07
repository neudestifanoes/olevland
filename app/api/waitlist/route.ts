import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  if (!email || typeof email !== "string") {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  // ── Loops (recommended for dev-focused audiences) ──────────────────────────
  // Set LOOPS_API_KEY and LOOPS_MAILING_LIST_ID in Vercel env vars
  const loopsKey = process.env.LOOPS_API_KEY;
  const loopsListId = process.env.LOOPS_MAILING_LIST_ID;

  if (loopsKey) {
    const res = await fetch("https://app.loops.so/api/v1/contacts/create", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${loopsKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        source: "landing-waitlist",
        mailingLists: loopsListId ? { [loopsListId]: true } : undefined,
      }),
    });
    if (!res.ok) {
      return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
    }
    return NextResponse.json({ ok: true });
  }

  // ── Fallback: log to console (no key set yet) ──────────────────────────────
  console.log("[waitlist]", email);
  return NextResponse.json({ ok: true });
}
