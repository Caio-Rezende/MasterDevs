export class NavController {
  constructor(public navElements: NodeListOf<Element>) {
    window.addEventListener("hashchange", this.updateNavbar.bind(this));

    window.addEventListener("unload", this.dispose);

    this.updateNavbar();
  }

  dispose() {
    window.removeEventListener("hashchange", this.updateNavbar.bind(this));
  }

  updateNavbar() {
    const hash = location.hash;
    this.navElements.forEach((element) => {
      let anchor = element as HTMLAnchorElement;
      if (anchor.href.includes(hash)) {
        anchor.className = anchor.className.replace(" hidden", "");
      } else {
        if (!anchor.className.includes(" hidden")) {
          anchor.className += " hidden";
        }
      }
    });
  }
}
