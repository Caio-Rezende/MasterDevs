import {
  ApplyShadow,
  CheckCollideWithShadow,
  RandomPlacement,
} from "./effects";
import { hiddenNodeId, shadowNodesClass } from "./constants";
import { InputController, MoveInScreenListener } from "./controllers";

window.onload = () => {
  const hiddenElement = document.getElementById(hiddenNodeId);
  const shadowElements = document.querySelectorAll<HTMLElement>(
    `.${shadowNodesClass}`
  );

  if (!hiddenElement || shadowElements.length === 0) {
    throw new Error("EntitiesNotFound");
  }

  new RandomPlacement(hiddenElement, shadowElements);

  const collider = new CheckCollideWithShadow(hiddenElement, shadowElements);
  if (collider.element) {
    collider.element.whenCollideStartFn = () => {
      collider.element.style.backgroundColor = "white";
    };
    collider.element.whenCollideStopFn = () => {
      collider.element.style.backgroundColor = "transparent";
    };
  }
  new ApplyShadow(shadowElements);

  const inputController = new InputController();
  inputController.addListener(new MoveInScreenListener(hiddenElement));
  inputController.addListener(collider);
};
