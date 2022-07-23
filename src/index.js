import { ApplyShadow, CheckCollideWithShadow, RandomPlacement } from "./effects";
import { hiddenNodeId, shadowNodesClass } from "./constants";
import css from "./main.css";

window.onload = () => {
  new RandomPlacement(hiddenNodeId);
  const el = new CheckCollideWithShadow(hiddenNodeId, shadowNodesClass);
  el.whenCollideFn = () => {
    el.style.backgroundColor = "red";
  };
  new ApplyShadow(shadowNodesClass);
};
