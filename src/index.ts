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
    collider.element.whenCollideStartFn = () => {
      collider.element.style.backgroundColor = "white";
    };
    collider.element.whenCollideStopFn = () => {
      collider.element.style.backgroundColor = "transparent";
    };
  }
  new ApplyShadow(shadowNodesClass);
};
