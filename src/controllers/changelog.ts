import { ChangelogEntry } from "../models";

export class ChangelogController {
  constructor(
    public entries: ChangelogEntry[],
    public changelogRoot: HTMLElement
  ) {
    this.createEntries();
  }

  createEntries() {
    this.changelogRoot.innerText += this.entries.join("\n");
  }
}
