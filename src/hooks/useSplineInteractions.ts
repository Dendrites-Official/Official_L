// src/hooks/useSplineInteractions.ts
import { useEffect, RefObject } from "react";

export function useSplineInteractions(
  ref: RefObject<HTMLElement | null>,
  options?: { disableContextMenu?: boolean }
) {
  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const handleContextMenu = (e: MouseEvent) => {
      if (options?.disableContextMenu !== false) {
        e.preventDefault();
      }
    };

    root.addEventListener("contextmenu", handleContextMenu);

    return () => {
      root.removeEventListener("contextmenu", handleContextMenu);
    };
  }, [ref, options?.disableContextMenu]);
}
