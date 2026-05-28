import * as React from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
	const getSnapshot = React.useCallback(() => {
		return typeof window === "undefined"
			? false
			: window.innerWidth < MOBILE_BREAKPOINT;
	}, []);

	const subscribe = React.useCallback((callback: () => void) => {
		if (typeof window === "undefined") return () => {};
		const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
		mql.addEventListener("change", callback);
		return () => mql.removeEventListener("change", callback);
	}, []);

	return React.useSyncExternalStore(subscribe, getSnapshot, () => false);
}
