import css from "./main.css";

const blurTextShadow = 10

function cursorMoveShadow(cursorX, cursorY) {
    const windowX = window.screen.width
    const windowY = window.screen.height

    return (node) => {
        const nodePosX = Math.floor((node.offsetWidth / 2) + node.offsetLeft)
        const nodePosY = Math.floor((node.offsetHeight / 2) + node.offsetTop)

        const x = Math.floor(((nodePosX - curosrX) / windowX) * 100)
        const y = Math.floor(((nodePosY - curosrY) / windowY) * 100)

        node.style.textShadow = `${x}px ${y}px ${blurTextShadow}px`
    }
}

window.on('mousemove', (ev) => {
    const nodes = document.querySelector('.cursorMoveShadow')

    const fn = cursorMoveShadow(ev.screenX, ev.screenY)

    nodes.forEach(fn)
})