const xboxStart = document.querySelector("#xbox-start");
const xboxConnected = document.querySelector("#xbox-connected");
const xboxTest = document.querySelector("#xbox-test");

function disconnectedContents() {
  xboxStart.style.display = "";
  xboxConnected.style.display = "none";
  xboxTest.style.display = "none";
}

function connectedContents() {
  xboxStart.style.display = "none";
  xboxConnected.style.display = "";
  xboxTest.style.display = "";
}

function init() {
  disconnectedContents();
}
window.onload = init();

/**
 * gamepad connected
 */
window.addEventListener("gamepadconnected", (e) => {
  console.log(`Xbox controller is connected ${e.gamepad.index}: ${e.gamepad.id}`);
  connectedContents();
})

/**
 * gamepad disconnected
 */
window.addEventListener("gamepaddisconnected", (e) => {
  console.log(`Xbox controller is disconnected ${e.gamepad.index}: ${e.gamepad.id}`);
  disconnectedContents();
})

