import React, { useEffect, useRef } from "react";
import { NavController } from "../controllers";

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
      className="text-yellow-600 p-4 grid grid-cols-2 sm:grid-cols-6 xl:grid-cols-1 gap-4 text-xl xl:text-2xl group"
      ref={navRef}
    >
      <span className="p-3 group-hover:hidden text-center xl:hidden bg-black">
        menu
      </span>
      <a
        href="#intro"
        className="p-3 border border-dashed hover:border-solid border-yellow-400 text-center hidden group-hover:block bg-black"
      >
        intro
      </a>
      <a
        href="#playground"
        className="p-3 border border-dashed hover:border-solid border-yellow-400 text-center hidden group-hover:block bg-black"
      >
        playground
      </a>
      <a
        href="#blog"
        className="p-3 border border-dashed hover:border-solid border-yellow-400 text-center hidden group-hover:block bg-black"
      >
        blog
      </a>
      <a
        href="#version"
        className="p-3 border border-dashed hover:border-solid border-yellow-400 text-center hidden group-hover:block bg-black"
      >
        version
      </a>
      <a
        href="#home"
        className="p-3 border border-dashed hover:border-solid border-yellow-400 text-center hidden group-hover:block bg-black"
      >
        home
      </a>
      <span className="p-3 hidden xl:block group-hover:hidden text-center bg-black">
        menu
      </span>
    </nav>
  );
}
