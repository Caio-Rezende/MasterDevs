import { useState } from "react";
import { MenuItem } from "./components/menuItem";
import { useLocation } from "./hooks";

export function NavView() {
    const locationHash = useLocation();
    const [display, setDisplay] = useState(false);

    const stopDisplay = () => setDisplay(!display);

    const displayMenuOption = !Boolean(locationHash) && !display;

    return (
        <nav
            className="text-yellow-600 p-4 grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 xl:grid-cols-1 gap-4 text-xl xl:text-2xl bg-transparent"
            onMouseOver={() => setDisplay(true)}
            onMouseOut={stopDisplay}
            style={{backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)'}}
        >
            {displayMenuOption && (
                <span className="p-3 text-center xl:hidden">menu</span>
            )}
            <MenuItem anchor="intro" onClick={stopDisplay} display={display} />
            <MenuItem
                anchor="playground"
                onClick={stopDisplay}
                display={display}
            />
            <MenuItem anchor="blog" onClick={stopDisplay} display={display} />
            <MenuItem
                anchor="version"
                onClick={stopDisplay}
                display={display}
            />
            <MenuItem anchor="home" onClick={stopDisplay} display={display} />
            {displayMenuOption && (
                <span className="p-3 hidden xl:block text-center">menu</span>
            )}
        </nav>
    );
}
