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
const INPUT_INTERVAL_BROADCAST = 300;

export class InputController {
  multiplier = DEFAULT_MULTIPLIER;
  moveBy = new Move2D(0, 0);
  listeners: InputListener[] = [];

  constructor() {
    window.addEventListener("keydown", this.listenForMotionInput.bind(this));
    setInterval(
      this.applyMotionToListeners.bind(this),
      INPUT_INTERVAL_BROADCAST
    );
    window.addEventListener("unload", () => {
      window.removeEventListener(
        "keydown",
        this.listenForMotionInput.bind(this)
      );
    });
  }

  addListener(a: InputListener) {
    this.listeners.push(a);
  }

  applyMotionToListeners() {
    const { x, y } = this.moveBy;

    this.listeners.forEach((listener) => {
      listener.doMotion(new Move2D(x * this.multiplier, y * this.multiplier));
    });
    
    this.moveBy = new Move2D(0, 0);
  }

  listenForMotionInput(ev: KeyboardEvent) {
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
  }
}
