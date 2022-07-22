import css from "./main.css";

const blurTextShadow = 20;

window.onload = () => {
  const affectedBlurElements = document.querySelectorAll(".cursorMoveShadow");

  function init(node) {
    node.style.textShadow = `0px 0px ${blurTextShadow}px`;
  }

  function cursorMoveShadow(cursorX, cursorY) {
    const windowX = window.screen.width;
    const windowY = window.screen.height;

    return (node) => {
      const nodePosX = Math.floor(node.offsetWidth / 2 + node.offsetLeft);
      const nodePosY = Math.floor(node.offsetHeight / 2 + node.offsetTop);

      const x = Math.floor(((nodePosX - cursorX) / windowX) * 100);
      const y = Math.floor(((nodePosY - cursorY) / windowY) * 100);

      node.style.textShadow = `${x}px ${y}px ${blurTextShadow}px`;
    };
  }

  window.addEventListener("mousemove", (ev) => {
    const nodes = affectedBlurElements;

    const fn = cursorMoveShadow(ev.x, ev.y);

    nodes.forEach(fn);
  });

  affectedBlurElements.forEach(init);
};
