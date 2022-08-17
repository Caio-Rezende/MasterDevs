export class NavController {
  navElements: NodeListOf<Element>;

  constructor(navElements: NodeListOf<Element>) {
    this.navElements = navElements;
    window.addEventListener("hashchange", this.updateNavbar.bind(this));

    window.addEventListener("unload", this.dispose);

    this.updateNavbar();
  }

  dispose() {
    window.removeEventListener("hashchange", this.updateNavbar.bind(this));
  }

  updateNavbar() {
    const hash = location.hash;
    for (let index in this.navElements) {
      let element = this.navElements[index] as HTMLAnchorElement;
      if (element.href.includes(hash)) {
        element.className += " hidden";
      } else {
        element.className = element.className.replace(" hidden", "");
      }
    }
  }
}
