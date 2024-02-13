import { CheckCollideWithShadow, RandomPlacement } from "../effects";

const SECONDS_TO_RESET = 3;

export class ShadowController {
  collider?: CheckCollideWithShadow;
  hiddenFound: Boolean = false;
  count = 0;
  interval?: NodeJS.Timer;

  constructor(
    hiddenElement: HTMLElement,
    textForShadowsElements: NodeListOf<HTMLHeadingElement>,
    shadowsElements: NodeListOf<HTMLHeadingElement>
  ) {
    const collider = new CheckCollideWithShadow(hiddenElement, shadowsElements);
    if (collider.collideElement) {
      collider.collideElement.whenCollideStartFn = () => {
        if (!this.hiddenFound) {
          this.hiddenFound = true;
          this.applyFoundStyle();
          this.interval = setInterval(() => {
            this.resetText();
            if (this.count === SECONDS_TO_RESET) {
              this.count = 0;
              this.hiddenFound = false;
              this.applyHiddenStyle();
              new RandomPlacement(hiddenElement, textForShadowsElements);
              clearInterval(this.interval);
            } else {
              this.addCountText();
              this.count++;
            }
          }, 1000);
        }
      };
      collider.collideElement.whenCollideStopFn = this.applyHiddenStyle;
    }
    this.collider = collider;
  }

  resetText() {
    if (!this.collider) return
    
    const innerHTML = this.collider.collideElement.domNode.innerHTML;
    this.collider.collideElement.domNode.innerHTML = innerHTML.replace(
      / \([0-9]+s\)/,
      ""
    );
  }

  addCountText() {
    if (!this.collider) return
    
    this.collider.collideElement.domNode.innerHTML += ` (${
      SECONDS_TO_RESET - this.count
    }s)`;
  }

  applyHiddenStyle() {
    if (!this.collider) return
    
    if (!this.hiddenFound) {
      this.collider.collideElement.style.backgroundColor = "transparent";
    }
  }

  applyFoundStyle() {
    if (!this.collider) return
    
    if (this.hiddenFound) {
      this.collider.collideElement.style.backgroundColor = "white";
    }
  }
}
