import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type MouseEvent as ReactMouseEvent,
} from "react";
import { createPortal } from "react-dom";
import "../styles/dndx-mini-launch-popup.css";

type PopupMode = "always" | "daily" | "once";
type ActiveTab = "quickpay" | "mainnet";

type DNDXMiniLaunchPopupProps = {
  mode?: PopupMode;
  waitlistHref?: string;
  quickPayHref?: string;
  termsHref?: string;
  mainnetHref?: string;
  internshipHref?: string;
  onComplete?: () => void;
  allowOnInitialLoad?: boolean;
  introReady?: boolean;
};

type LaunchCopy = {
  eyebrow: string;
  title: string;
  description: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
  points: string[];
};

const STORAGE_KEY = "dndx_mini_launch_popup_v5";
const ONE_DAY_MS = 24 * 60 * 60 * 1000;

function shouldShow(mode: PopupMode) {
  if (typeof window === "undefined") return false;

  const params = new URLSearchParams(window.location.search);

  if (params.get("announce") === "1") return true;
  if (mode === "always") return true;

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);

    if (!stored) return true;
    if (mode === "once") return false;

    const parsed = JSON.parse(stored) as { lastSeen?: number };

    if (!parsed.lastSeen) return true;

    return Date.now() - parsed.lastSeen > ONE_DAY_MS;
  } catch {
    return true;
  }
}

export default function DNDXMiniLaunchPopup({
  mode = "daily",
  waitlistHref = "https://waitlist.dendrites.ai/",
  quickPayHref = "/quickpay",
  termsHref = "/terms",
  mainnetHref = "https://dendrites.xyz",
  internshipHref = "/internships",
  onComplete,
  allowOnInitialLoad = false,
  introReady = true,
}: DNDXMiniLaunchPopupProps) {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<ActiveTab>("quickpay");
  const [agreed, setAgreed] = useState(false);
  const [termsNudge, setTermsNudge] = useState(false);

  const nudgeTimerRef = useRef<number | null>(null);

  const activeCopy = useMemo<LaunchCopy>(() => {
    if (activeTab === "quickpay") {
      return {
        eyebrow: "QuickPay",
        title: "A cleaner way to send crypto payments.",
        description:
          "See the fee before you sign. Send with a clearer route. Keep a receipt after the payment.",
        primaryLabel: "Open QuickPay",
        primaryHref: quickPayHref,
        secondaryLabel: "Join waitlist",
        secondaryHref: waitlistHref,
        points: [
          "Simple payment flow",
          "Clear fee preview",
          "Receipt after payment",
        ],
      };
    }

    return {
      eyebrow: "DNDX",
      title: "Dendrites is preparing for mainnet.",
      description:
        "We are building payment rails for safer crypto transactions, cleaner receipts, and better payment proof.",
      primaryLabel: "Visit Dendrites",
      primaryHref: mainnetHref,
      secondaryLabel: "Build with us",
      secondaryHref: internshipHref,
      points: [
        "Payments with proof",
        "Receipts users can understand",
        "Infrastructure for real commerce",
      ],
    };
  }, [activeTab, internshipHref, mainnetHref, quickPayHref, waitlistHref]);

  const markSeen = useCallback(() => {
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ lastSeen: Date.now() })
      );
    } catch {
      // Ignore storage errors.
    }
  }, []);

  const closePopup = useCallback(() => {
    markSeen();
    setOpen(false);
    onComplete?.();
  }, [markSeen, onComplete]);

  const nudgeTerms = useCallback(() => {
    if (nudgeTimerRef.current) {
      window.clearTimeout(nudgeTimerRef.current);
    }

    setTermsNudge(true);

    nudgeTimerRef.current = window.setTimeout(() => {
      setTermsNudge(false);
      nudgeTimerRef.current = null;
    }, 620);
  }, []);

  useEffect(() => {
    setMounted(true);

    const params = new URLSearchParams(window.location.search);
    const forcedOpen = params.get("announce") === "1";

    if (forcedOpen) {
      setOpen(true);
      return;
    }

    setOpen(Boolean(introReady && allowOnInitialLoad && shouldShow(mode)));
  }, [mode, introReady, allowOnInitialLoad]);

  useEffect(() => {
    if (!open) return;

    const previousBodyOverflow = document.body.style.overflow;

    document.documentElement.classList.add("dxMiniLaunchActive");
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closePopup();
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.documentElement.classList.remove("dxMiniLaunchActive");
      document.body.style.overflow = previousBodyOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, closePopup]);

  useEffect(() => {
    const eventName = "dndx:open-mini-launch";
    const handleOpenRequest = () => setOpen(true);

    window.addEventListener(eventName, handleOpenRequest as EventListener);

    (window as typeof window & { dndxOpenMiniLaunch?: () => void }).dndxOpenMiniLaunch =
      () => window.dispatchEvent(new CustomEvent(eventName));

    return () => {
      window.removeEventListener(eventName, handleOpenRequest as EventListener);

      try {
        delete (window as typeof window & { dndxOpenMiniLaunch?: () => void })
          .dndxOpenMiniLaunch;
      } catch {
        // Ignore locked browser environments.
      }
    };
  }, []);

  useEffect(() => {
    return () => {
      if (nudgeTimerRef.current) {
        window.clearTimeout(nudgeTimerRef.current);
      }
    };
  }, []);

  const stopModalEvent = (event: ReactMouseEvent<HTMLElement>) => {
    event.stopPropagation();
  };

  const handleTabClick = (
    event: ReactMouseEvent<HTMLButtonElement>,
    nextTab: ActiveTab
  ) => {
    event.stopPropagation();
    setActiveTab(nextTab);
  };

  const handleGatedLink = (event: ReactMouseEvent<HTMLAnchorElement>) => {
    event.stopPropagation();

    if (!agreed) {
      event.preventDefault();
      nudgeTerms();
      return;
    }

    markSeen();
    onComplete?.();
  };

  if (!mounted || !open) return null;

  return createPortal(
    <section
      className="dxMiniLaunch"
      role="dialog"
      aria-modal="true"
      aria-labelledby="dxMiniLaunchTitle"
      aria-describedby="dxMiniLaunchDescription"
      onClick={(event) => event.stopPropagation()}
    >
      <div className="dxMiniLaunch__shade" aria-hidden="true" />

      <article
        className="dxMiniLaunch__card"
        onPointerDown={stopModalEvent}
        onMouseDown={stopModalEvent}
        onClick={stopModalEvent}
      >
        <button
          type="button"
          className="dxMiniLaunch__close"
          aria-label="Close announcement"
          onClick={(event) => {
            event.stopPropagation();
            closePopup();
          }}
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </button>

        <div className="dxMiniLaunch__brand">
          {/* <span className="dxMiniLaunch__brandMark" aria-hidden="true">
            DNDX
          </span> */}

          <div>
            <strong>Announcement</strong> 
            <small>Launch update</small>
          </div>
        </div>

        <div
          className="dxMiniLaunch__tabs"
          role="tablist"
          aria-label="DNDX launch options"
        >
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "quickpay"}
            className={`dxMiniLaunch__tab ${
              activeTab === "quickpay" ? "is-active" : ""
            }`}
            onClick={(event) => handleTabClick(event, "quickpay")}
          >
            QuickPay
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "mainnet"}
            className={`dxMiniLaunch__tab ${
              activeTab === "mainnet" ? "is-active" : ""
            }`}
            onClick={(event) => handleTabClick(event, "mainnet")}
          >
            Mainnet
          </button>
        </div>

        <div className="dxMiniLaunch__content" key={activeTab}>
          <div className="dxMiniLaunch__eyebrow">
            <span>{activeCopy.eyebrow}</span>
            <i aria-hidden="true" />
          </div>

          <h2 id="dxMiniLaunchTitle">{activeCopy.title}</h2>

          <p id="dxMiniLaunchDescription">{activeCopy.description}</p>

          <div className="dxMiniLaunch__points">
            {activeCopy.points.map((point) => (
              <div className="dxMiniLaunch__point" key={point}>
                <span aria-hidden="true" />
                <p>{point}</p>
              </div>
            ))}
          </div>
        </div>

        <div
          className={`dxMiniLaunch__terms ${termsNudge ? "is-nudging" : ""}`}
          onPointerDown={stopModalEvent}
          onMouseDown={stopModalEvent}
          onClick={stopModalEvent}
        >
          <input
            id="dxMiniLaunchTerms"
            type="checkbox"
            checked={agreed}
            onChange={(event) => setAgreed(event.target.checked)}
          />

          <div className="dxMiniLaunch__termsCopy">
            <label htmlFor="dxMiniLaunchTerms">
              I understand launch access and supported routes may change during rollout.
            </label>

            <a
              href={termsHref}
              target="_blank"
              rel="noreferrer"
              onClick={(event) => event.stopPropagation()}
            >
              Terms
            </a>
          </div>
        </div>

        <div className="dxMiniLaunch__actions">
          <a
            href={activeCopy.primaryHref}
            className={`dxMiniLaunch__primary ${!agreed ? "is-disabled" : ""}`}
            aria-disabled={!agreed}
            onClick={handleGatedLink}
          >
            {activeCopy.primaryLabel}
            <span aria-hidden="true">→</span>
          </a>

          <a
            href={activeCopy.secondaryHref}
            className={`dxMiniLaunch__secondary ${!agreed ? "is-disabled" : ""}`}
            aria-disabled={!agreed}
            onClick={handleGatedLink}
          >
            {activeCopy.secondaryLabel}
          </a>
        </div>

        <p className="dxMiniLaunch__note">
          Limited rollout. Terms apply.
        </p>
      </article>
    </section>,
    document.body
  );
}