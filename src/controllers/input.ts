export abstract class InputListener {
  abstract doMotion(moveBy: Move2D): void;
}

export class Move2D {
  constructor(public x: number, public y: number) {}
}

const DEFAULT_MULTIPLIER = 5;
const ALT_KEY_MULTIPLIER = 20;

export class InputController {
  multiplier = DEFAULT_MULTIPLIER;
  moveBy = new Move2D(0, 0);
  keyListeners: InputListener[] = [];
  moveListeners: InputListener[] = [];

  constructor() {
    window.addEventListener("keydown", this.listenForKeyInput.bind(this));
    window.addEventListener("mousemove", this.listenForMouseMove.bind(this));
    window.addEventListener("touchmove", this.listenForTouchMove.bind(this));

    window.addEventListener("onunload", this.dispose);
  }

  dispose() {
    window.removeEventListener("keydown", this.listenForKeyInput.bind(this));
    window.removeEventListener("mousemove", this.listenForMouseMove.bind(this));
  }

  addKeyListener(a: InputListener) {
    this.keyListeners.push(a);
  }

  addMouseListener(a: InputListener) {
    this.moveListeners.push(a);
  }

  applyMotionToListeners() {
    const { x, y } = this.moveBy;

    this.keyListeners.forEach((listener) => {
      listener.doMotion(new Move2D(x * this.multiplier, y * this.multiplier));
    });

    this.moveBy = new Move2D(0, 0);
  }

  listenForMouseMove(ev: MouseEvent) {
    this.moveListeners.forEach((listener) =>
      listener.doMotion(new Move2D(ev.clientX, ev.clientY))
    );
  }
  listenForTouchMove(ev: TouchEvent) {
    this.moveListeners.forEach((listener) =>
      listener.doMotion(
        new Move2D(ev.touches[0].clientX, ev.touches[0].clientY)
      )
    );
  }

  listenForKeyInput(ev: KeyboardEvent) {
    this.multiplier = ev.altKey ? ALT_KEY_MULTIPLIER : DEFAULT_MULTIPLIER;

    switch (ev.key) {
      case "ArrowUp":
      case "W":
        this.moveBy.y++;
        break;
      case "ArrowDown":
      case "S":
        this.moveBy.y--;
        break;
      case "ArrowRight":
      case "D":
        this.moveBy.x++;
        break;
      case "ArrowLeft":
      case "A":
        this.moveBy.x--;
        break;
    }

    this.applyMotionToListeners();
  }
}
