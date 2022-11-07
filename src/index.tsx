import { createRoot } from "react-dom/client";

import { NavView } from "./views";

import {
  ApplyShadow,
  CheckCollideWithShadow,
  RandomPlacement,
} from "./effects";
import {
  blogRootId,
  changelogRootId,
  hiddenNodeId,
  shadowNodesClass,
} from "./constants";
import { InputController, MoveInScreenListener } from "./controllers";
import { BlogController } from "./controllers/blog";
import blog from "./feeds/blog.json";
import changelog from "./feeds/changelog.json";
import { ChangelogController } from "./controllers/changelog";

window.onload = () => {
  const blogRoot = document.getElementById(blogRootId);
  const changelogRoot = document.getElementById(changelogRootId);
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

  new BlogController(blog.entries, blogRoot!);

  new ChangelogController(changelog.entries, changelogRoot!);

  const container = document.getElementById("navView");
  const root = createRoot(container!); // createRoot(container!) if you use TypeScript
  root.render(<NavView />);
};
