import { BlogEntry } from "../models";

export class BlogController {
  constructor(public entries: BlogEntry[], public blogRoot: HTMLElement) {
    this.createEntries();
  }

  createEntries() {
    const templateDiv = (
      this.blogRoot.children.item(0) as HTMLTemplateElement
    )?.content.querySelector("div");
    if (!templateDiv) return;

    for (let index in this.entries) {
      let entry = this.entries[index];
      let entryEl = templateDiv.cloneNode(true) as HTMLDivElement;
      this.blogRoot.append(entryEl);

      const dateEl = this.getElement<HTMLSpanElement>(entryEl, "span");
      dateEl.innerText = new Date(entry.date).toLocaleDateString();

      const titleEl = this.getElement<HTMLHeadingElement>(entryEl, "h2");
      titleEl.innerText = entry.title;

      const detailsEl = this.getElement<HTMLSpanElement>(entryEl, "details");
      entry.text.forEach((paragraph, i) => {
        const paragraphEl = this.getElement<HTMLSpanElement>(
          detailsEl,
          i > 0 ? "p" : "summary",
          i > 1
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
