import { BlogEntry } from "../models";

export class BlogController {
  constructor(public entries: BlogEntry[], public blogRoot: HTMLElement) {
    this.createEntries();
  }

  createEntries() {
    const sampleDiv = this.blogRoot.children.item(0);
    if (!sampleDiv) return;

    for (let index in this.entries) {
      let entry = this.entries[index];
      let entryEl = sampleDiv.cloneNode(true) as HTMLDivElement;
      entryEl.className = entryEl.className.replace("hidden", "");
      this.blogRoot.append(entryEl);

      const dateEl = this.getElement<HTMLSpanElement>(entryEl, "span");
      dateEl.innerText = new Date(entry.date).toLocaleDateString();

      const titleEl = this.getElement<HTMLHeadingElement>(entryEl, "h2");
      titleEl.innerText = entry.title;

      entry.text.forEach((paragraph, i) => {
        const paragraphEl = this.getElement<HTMLSpanElement>(
          entryEl,
          "p",
          i > 0
        );
        paragraphEl.innerText = paragraph;
      });
    }
  }

  getElement<T extends Element>(
    root: HTMLElement,
    query: string,
    clone = false
  ): T {
    let el = root.querySelector(query);
    if (!el) {
      el = document.createElement(query);
      root.append(el);
    } else if (clone) {
      el = el.cloneNode(false) as T;
      root.append(el);
    }
    return el as T;
  }
}
