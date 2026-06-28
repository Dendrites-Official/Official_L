import {
  useCallback,
  useEffect,
  useState,
  type MouseEvent as ReactMouseEvent,
} from "react";
import { createPortal } from "react-dom";
import "../styles/dndx-mini-launch-popup.css";

type PopupMode = "always" | "daily" | "once";

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

const STORAGE_KEY = "dndx_mini_launch_popup_v6";
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
  onComplete,
  allowOnInitialLoad = false,
  introReady = true,
}: DNDXMiniLaunchPopupProps) {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);

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

  const stopModalEvent = (event: ReactMouseEvent<HTMLElement>) => {
    event.stopPropagation();
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

        <header className="dxMiniLaunch__header">
          <p className="dxMiniLaunch__kicker">Launch Update</p>
          <h2 id="dxMiniLaunchTitle">Announcement</h2>
        </header>

        <div className="dxMiniLaunch__content">
          <p id="dxMiniLaunchDescription" className="dxMiniLaunch__intro">
            Dendrites is moving into the next rollout phase.
          </p>

          <div className="dxMiniLaunch__points" aria-label="Announcement details">
            <div className="dxMiniLaunch__point">
              <span aria-hidden="true" />
              <p>1,000,000 transactions free</p>
            </div>

            <div className="dxMiniLaunch__point">
              <span aria-hidden="true" />
              <p>Testnets are live</p>
            </div>

            <div className="dxMiniLaunch__point">
              <span aria-hidden="true" />
              <p>Presale coming soon...</p>
            </div>

            <div className="dxMiniLaunch__point">
              <span aria-hidden="true" />
              <p>Mainnets releasing soon in July. Stay tuned.</p>
            </div>
          </div>
        </div>

        <p className="dxMiniLaunch__note">More updates coming soon.</p>
      </article>
    </section>,
    document.body
  );
}