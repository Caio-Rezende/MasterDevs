export abstract class InputListener {
  abstract doMotion(moveBy: Move2D): void;
}

export class Move2D {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

const DEFAULT_MULTIPLIER = 5;
const ALT_KEY_MULTIPLIER = 20;

export class InputController {
  multiplier = DEFAULT_MULTIPLIER;
  moveBy = new Move2D(0, 0);
  keyListeners: InputListener[] = [];
  mouseListeners: InputListener[] = [];

  constructor() {
    window.addEventListener("keydown", this.listenForKeyInput.bind(this));
    window.addEventListener("mousemove", this.listenForMouseInput.bind(this));

    window.addEventListener("unload", () => {
      window.removeEventListener("keydown", this.listenForKeyInput.bind(this));
      window.removeEventListener(
        "mousemove",
        this.listenForMouseInput.bind(this)
      );
    });
  }

  addKeyListener(a: InputListener) {
    this.keyListeners.push(a);
  }

  addMouseListener(a: InputListener) {
    this.mouseListeners.push(a);
  }

  applyMotionToListeners() {
    const { x, y } = this.moveBy;

    this.keyListeners.forEach((listener) => {
      listener.doMotion(new Move2D(x * this.multiplier, y * this.multiplier));
    });

    this.moveBy = new Move2D(0, 0);
  }

  listenForMouseInput(ev: MouseEvent) {
    this.mouseListeners.forEach((listener) =>
      listener.doMotion(new Move2D(ev.x, ev.y))
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
