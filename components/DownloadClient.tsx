"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button, ButtonLink } from "./ui/Button";
import { PRODUCT } from "@/lib/constants";

type TokenResponse = {
  token: string;
  fileName: string;
  size: string;
  version: string;
  expiresInSeconds: number;
};

type Status = "loading" | "pending" | "ready" | "started" | "expired" | "error";

export function DownloadClient() {
  const params = useSearchParams();
  const ref = params.get("ref") ?? "";
  const demo = params.get("demo") === "1";

  const [status, setStatus] = useState<Status>("loading");
  const [data, setData] = useState<TokenResponse | null>(null);
  const [message, setMessage] = useState<string>("");
  const [seconds, setSeconds] = useState(0);
  const pollCount = useRef(0);

  const requestToken = useCallback(async () => {
    if (!ref) {
      setStatus("error");
      setMessage("No purchase reference was provided.");
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api/download/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ref, demo }),
      });
      const json = await res.json();

      if (res.ok) {
        setData(json);
        setSeconds(json.expiresInSeconds ?? 600);
        setStatus("ready");
        return;
      }
      if (res.status === 402) {
        // Payment not confirmed yet — poll a few times before giving up.
        if (pollCount.current < 8) {
          pollCount.current += 1;
          setStatus("pending");
          setTimeout(requestToken, 4000);
        } else {
          setStatus("pending");
          setMessage(
            "We haven't received payment confirmation yet. If you completed payment, give it a moment and refresh — or contact support.",
          );
        }
        return;
      }
      setStatus("error");
      setMessage(json.error ?? "Something went wrong preparing your download.");
    } catch {
      setStatus("error");
      setMessage("Network error. Please check your connection and try again.");
    }
  }, [ref, demo]);

  useEffect(() => {
    requestToken();
  }, [requestToken]);

  // Countdown while a token is live.
  useEffect(() => {
    if (status !== "ready" || seconds <= 0) return;
    const id = setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) {
          clearInterval(id);
          setStatus("expired");
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [status, seconds]);

  const mins = Math.floor(seconds / 60);
  const secs = String(seconds % 60).padStart(2, "0");

  return (
    <div className="shell flex min-h-[70vh] flex-col items-center justify-center py-20">
      <div className="vision-frame glass w-full max-w-lg rounded-3xl p-8 text-center sm:p-10">
        {demo && (
          <div className="mb-6 rounded-lg border border-accent/30 bg-accent/[0.06] px-3 py-2 text-xs text-accent-cyan">
            Demo mode — this preview skips real payment so you can see the download flow.
          </div>
        )}

        {(status === "loading" || status === "pending") && (
          <>
            <Spinner />
            <h1 className="mt-6 text-2xl font-semibold tracking-tight">
              {status === "loading" ? "Preparing your download…" : "Confirming your payment…"}
            </h1>
            <p className="mt-3 text-sm text-ink-secondary">
              {message ||
                "This only takes a moment. Please keep this page open."}
            </p>
            {status === "pending" && message && (
              <div className="mt-6">
                <Button variant="secondary" onClick={requestToken}>
                  Refresh
                </Button>
              </div>
            )}
          </>
        )}

        {status === "ready" && data && (
          <>
            <SuccessMark />
            <h1 className="mt-6 text-2xl font-semibold tracking-tight">
              Your download is ready.
            </h1>
            <p className="mt-2 text-sm text-ink-secondary">
              Thank you for your purchase. Your secure link is active for{" "}
              <span className="font-mono text-accent-cyan">
                {mins}:{secs}
              </span>
              .
            </p>

            <dl className="mx-auto mt-6 grid max-w-xs grid-cols-2 gap-3 text-left text-sm">
              <Meta label="Product" value={PRODUCT.name} />
              <Meta label="Version" value={data.version} />
              <Meta label="File" value={data.fileName} />
              <Meta label="Size" value={data.size} />
            </dl>

            <div className="mt-8">
              <a
                href={`/api/download/file?token=${encodeURIComponent(data.token)}`}
                download
                onClick={() => setStatus("started")}
                className="inline-flex h-[52px] w-full select-none items-center justify-center gap-2 rounded-xl px-7 text-[15px] font-medium text-bg-base accent-gradient shadow-glow transition-all duration-200 ease-premium hover:scale-[1.02] hover:brightness-110 active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
              >
                Download for Windows 10/11
              </a>
            </div>
            <p className="mt-3 text-xs text-ink-muted">
              This link is single-use and expires shortly. Keep the downloaded ZIP
              somewhere safe.
            </p>
          </>
        )}

        {status === "started" && (
          <>
            <SuccessMark />
            <h1 className="mt-6 text-2xl font-semibold tracking-tight">
              Your download has started.
            </h1>
            <p className="mt-3 text-sm text-ink-secondary">
              Check your browser&rsquo;s downloads for{" "}
              <span className="font-mono">{PRODUCT.downloadFileName}</span>. Next,
              follow the installation guide to set everything up.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <ButtonLink href="/docs/installation" size="lg">
                Open installation guide
              </ButtonLink>
              <Button
                variant="secondary"
                size="lg"
                onClick={() => {
                  pollCount.current = 0;
                  requestToken();
                }}
              >
                Download didn&rsquo;t start?
              </Button>
            </div>
          </>
        )}

        {status === "expired" && (
          <>
            <WarnMark />
            <h1 className="mt-6 text-2xl font-semibold tracking-tight">
              This link has expired.
            </h1>
            <p className="mt-3 text-sm text-ink-secondary">
              For security, download links are short-lived. If your purchase is
              valid, you can generate a fresh one.
            </p>
            <div className="mt-7">
              <Button
                size="lg"
                onClick={() => {
                  pollCount.current = 0;
                  requestToken();
                }}
              >
                Generate a new link
              </Button>
            </div>
          </>
        )}

        {status === "error" && (
          <>
            <WarnMark />
            <h1 className="mt-6 text-2xl font-semibold tracking-tight">
              We hit a snag.
            </h1>
            <p className="mt-3 text-sm text-ink-secondary">{message}</p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button variant="secondary" size="lg" onClick={requestToken}>
                Try again
              </Button>
              <ButtonLink href="/contact" size="lg">
                Contact support
              </ButtonLink>
            </div>
          </>
        )}
      </div>

      <p className="mt-6 max-w-md text-center text-xs text-ink-muted">
        Trouble downloading? Email{" "}
        <a className="text-accent-cyan" href={`mailto:${PRODUCT.supportEmail}`}>
          {PRODUCT.supportEmail}
        </a>{" "}
        or call{" "}
        <a className="text-accent-cyan" href={`tel:${PRODUCT.supportPhoneTel}`}>
          {PRODUCT.supportPhoneDisplay}
        </a>
        .
      </p>
    </div>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-white/[0.06] bg-bg-base/50 px-3 py-2">
      <dt className="text-[10px] uppercase tracking-wider text-ink-muted">{label}</dt>
      <dd className="mt-0.5 break-all font-mono text-xs text-ink-primary">{value}</dd>
    </div>
  );
}

function Spinner() {
  return (
    <div className="mx-auto h-12 w-12 animate-spin rounded-full border-2 border-white/10 border-t-accent" />
  );
}

function SuccessMark() {
  return (
    <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-state-success/15 text-state-success">
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

function WarnMark() {
  return (
    <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-state-warning/15 text-state-warning">
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M12 9v4m0 4h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}
