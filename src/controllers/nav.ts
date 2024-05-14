export class NavController {
  hash: string = "";

  constructor(public navElements: NodeListOf<Element>) {
    window.addEventListener("hashchange", this.updateNavbar.bind(this));

    window.addEventListener("onunload", this.dispose);

    this.updateNavbar();
  }

  dispose() {
    window.removeEventListener("hashchange", this.updateNavbar.bind(this));
  }

  updateNavbar() {
    if (Boolean(location.hash) && this.hash === location.hash) return;

    this.hash = location.hash;
    this.navElements.forEach((element) => {
      let anchor = element as HTMLAnchorElement;
      if (anchor.href.includes(this.hash)) {
        anchor.className = anchor.className.replace(" hidden", "");
      } else {
        if (!anchor.className.includes(" hidden")) {
          anchor.className += " hidden";
        }
      }
    });
  }
}
