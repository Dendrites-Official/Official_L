// src/hooks/useSplineInteractions.ts
import { useEffect } from "react";
export function useSplineInteractions(ref, options) {
    useEffect(() => {
        const root = ref.current;
        if (!root)
            return;
        const handleContextMenu = (e) => {
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
