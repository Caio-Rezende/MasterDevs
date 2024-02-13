import { createRoot } from "react-dom/client";

import { NavView } from "./views";

import { ApplyShadow, RandomPlacement } from "./effects";
import {
  blogRootId,
  changelogRootId,
  hiddenNodeId,
  shadowApplyNodesClass,
  shadowMovesNodesClass,
} from "./constants";
import { InputController, MoveInScreenListener } from "./controllers";
import { BlogController } from "./controllers/blog";
import blog from "./feeds/blog.json";
import changelog from "./feeds/changelog.json";
import { ChangelogController } from "./controllers/changelog";
import { ShadowController } from "./controllers/shadow";

window.onload = () => {
  const blogRoot = document.getElementById(blogRootId);
  const changelogRoot = document.getElementById(changelogRootId);
  const hiddenElement = document.getElementById(hiddenNodeId);
  const textForShadowsElements = document.querySelectorAll<HTMLHeadingElement>(
    `.${shadowApplyNodesClass}`
  );

  if (!hiddenElement || textForShadowsElements.length === 0) {
    throw new Error("EntitiesNotFound");
  }

  new RandomPlacement(hiddenElement, textForShadowsElements);
  const applyShadow = new ApplyShadow(textForShadowsElements);

  const shadowsElements = document.querySelectorAll<HTMLHeadingElement>(
    `.${shadowMovesNodesClass}`
  );

  const shadowController = new ShadowController(
    hiddenElement,
    textForShadowsElements,
    shadowsElements
  );

  const inputController = new InputController();

  inputController.addKeyListener(new MoveInScreenListener(hiddenElement));
  inputController.addMouseListener(applyShadow);

  if (shadowController.collider) {
    inputController.addKeyListener(shadowController.collider);
    inputController.addMouseListener(shadowController.collider);
  }

  new BlogController(blog.entries, blogRoot!);

  new ChangelogController(changelog.entries, changelogRoot!);

  const container = document.getElementById("navView");
  if (container) {
    const root = createRoot(container);
    root.render(<NavView />);
  }
};
