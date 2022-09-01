import {
  ApplyShadow,
  CheckCollideWithShadow,
  RandomPlacement,
} from "./effects";
import { blogRootId, hiddenNodeId, shadowNodesClass } from "./constants";
import {
  InputController,
  MoveInScreenListener,
  NavController,
} from "./controllers";
import { BlogController } from "./controllers/blog";
import blog from "./feeds/blog.json";

window.onload = () => {
  const navElements = document.querySelectorAll("nav a");
  const blogRoot = document.getElementById(blogRootId);
  const hiddenElement = document.getElementById(hiddenNodeId);
  const shadowElements = document.querySelectorAll<HTMLElement>(
    `.${shadowNodesClass}`
  );

  if (!hiddenElement || shadowElements.length === 0) {
    throw new Error("EntitiesNotFound");
  }

  new RandomPlacement(hiddenElement, shadowElements);

  const collider = new CheckCollideWithShadow(hiddenElement, shadowElements);
  if (collider.collideElement) {
    collider.collideElement.whenCollideStartFn = () => {
      collider.collideElement.style.backgroundColor = "white";
    };
    collider.collideElement.whenCollideStopFn = () => {
      collider.collideElement.style.backgroundColor = "transparent";
    };
  }
  const applyShadow = new ApplyShadow(shadowElements);

  const inputController = new InputController();

  inputController.addKeyListener(new MoveInScreenListener(hiddenElement));
  inputController.addKeyListener(collider);

  inputController.addMouseListener(applyShadow);
  inputController.addMouseListener(collider);

  new NavController(navElements!);

  new BlogController(blog.entries, blogRoot!);
};
