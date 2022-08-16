export class NavController {
  container: Element;

  constructor(navbar: Element) {
    this.container = navbar;
    window.addEventListener("hashchange", this.updateNavbar.bind(this));

    window.addEventListener("unload", this.dispose);

    this.updateNavbar();
  }

  dispose() {
    window.removeEventListener("hashchange", this.updateNavbar.bind(this));
  }

  updateNavbar() {
    const hash = location.hash;
    for (let index in this.container.children) {
      let child = this.container.children[index] as HTMLAnchorElement;
      if (child.href.includes(hash)) {
        child.className += " hidden";
      } else {
        child.className = child.className.replace(" hidden", "");
      }
    }
  }
}
