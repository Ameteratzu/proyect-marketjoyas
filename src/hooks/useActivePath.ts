import { useMemo } from "react";

export function useActivePath(pathname: string, href: string) {
  return useMemo(
    function () {
      if (!href || href === "/") return pathname === "/";
      return pathname.startsWith(href);
    },
    [pathname, href]
  );
}
