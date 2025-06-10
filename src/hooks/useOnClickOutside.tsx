"use client";

import { RefObject, useEffect } from "react";

export function useOnClickOutside(
    ref: RefObject<HTMLDivElement | null>,
    handler: (event: MouseEvent | TouchEvent) => void
) {
    useEffect(() => {
        const listener = (event: MouseEvent | TouchEvent) => {
            if (!ref.current || ref.current.contains(event.target as Node)) {
                return;
            }
            handler(event);
        };

        if (typeof window !== "undefined") {
            window.addEventListener("mousedown", listener);
            window.addEventListener("touchstart", listener);
        }

        return () => {
            if (typeof window !== "undefined") {
                window.removeEventListener("mousedown", listener);
                window.removeEventListener("touchstart", listener);
            }
        };
    }, [ref, handler]);
}