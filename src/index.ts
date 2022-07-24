import {
  ApplyShadow,
  CheckCollideWithShadow,
  RandomPlacement,
} from "./effects";
import { hiddenNodeId, shadowNodesClass } from "./constants";

window.onload = () => {
  new RandomPlacement(hiddenNodeId);
  const collider = new CheckCollideWithShadow(hiddenNodeId, shadowNodesClass);
  if (collider.element) {
    collider.element.whenCollideFn = () => {
      if (collider.element) {
        collider.element.style.backgroundColor = "red";
      }
    };
  }
  new ApplyShadow(shadowNodesClass);
};
