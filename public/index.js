const xboxStart = document.querySelector("#xbox-start")
const xboxConnected = document.querySelector("#xbox-connected")
const xboxTest = document.querySelector("#xbox-test")

const canvas = document.querySelector("#xbox-canvas")
const img = document.querySelector("#xbox-img")
const ctx = canvas.getContext('2d')

function drawXbox() {
  ctx.drawImage(img, 280, 0, 450, 450)
  ctx.beginPath();
  ctx.moveTo(340, 70);
  ctx.lineTo(410, 50)
  ctx.quadraticCurveTo(370, 0, 340, 70)
  ctx.fill()
  ctx.stroke()

  ctx.beginPath();
  ctx.moveTo(590, 50);
  ctx.lineTo(660, 70)
  ctx.quadraticCurveTo(620, 0, 590, 50)
  ctx.fill()
  ctx.stroke()
}


function initCanvas() {
}

function disconnectedContents() {
  xboxStart.style.display = "";
  xboxConnected.style.display = "none"
  xboxTest.style.display = "none"
}

function connectedContents() {
  xboxStart.style.display = "none";
  xboxConnected.style.display = ""
  xboxTest.style.display = ""
}

function init() {
  initCanvas()
  disconnectedContents()
}
window.onload = init()

/**
 * gamepad connected
 */
window.addEventListener("gamepadconnected", (e) => {
  console.log(`Xbox controller is connected ${e.gamepad.index}: ${e.gamepad.id}`)
  connectedContents()
})

/**
 * gamepad disconnected
 */
window.addEventListener("gamepaddisconnected", (e) => {
  console.log(`Xbox controller is disconnected ${e.gamepad.index}: ${e.gamepad.id}`)
  disconnectedContents()
})

