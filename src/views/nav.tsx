import React, { useEffect, useRef } from "react";
import { NavController } from "../controllers";
import { MenuItem } from "./components/menuItem";

export function NavView() {
  const navRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (navRef?.current) {
      const navElements = navRef.current.querySelectorAll("a");
      new NavController(navElements!);
    }
  }, [navRef, navRef?.current]);

  return (
    <nav
      className="text-yellow-600 p-4 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 xl:grid-cols-1 gap-4 text-xl xl:text-2xl group"
      ref={navRef}
    >
      <span className="p-3 group-hover:hidden text-center xl:hidden bg-black">
        menu
      </span>
      <MenuItem anchor="intro" />
      <MenuItem anchor="playground" />
      <MenuItem anchor="blog" />
      <MenuItem anchor="version" />
      <MenuItem anchor="home" />
      <span className="p-3 hidden xl:block group-hover:hidden text-center bg-black">
        menu
      </span>
    </nav>
  );
}
