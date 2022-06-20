const xboxStart = document.querySelector("#xbox-start")
const xboxConnected = document.querySelector("#xbox-connected")

function init(){
  xboxStart.style.display = "flex";
  xboxConnected.style.display = "none"
}
window.onload = init()

/**
 * gamepad connected
 */
window.addEventListener("gamepadconnected", (e) => {
  console.log(`Xbox controller is connected ${e.gamepad.index}: ${e.gamepad.id}`)
  xboxStart.style.display = "none"
  xboxConnected.style.display = "flex"
})

/**
 * gamepad disconnected
 */
window.addEventListener("gamepaddisconnected", (e) => {
  console.log(`Xbox controller is disconnected ${e.gamepad.index}: ${e.gamepad.id}`)
  xboxStart.style.display = "flex"
  xboxConnected.style.display = "none"
})

