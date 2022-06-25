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
  gameLoop()
})

/**
 * gamepad disconnected
 */
window.addEventListener("gamepaddisconnected", (e) => {
  console.log(`Xbox controller is disconnected ${e.gamepad.index}: ${e.gamepad.id}`);
  disconnectedContents();
  window.cancelAnimationFrame(gameLoop)
})

if (!("GamepadEvent" in window)) {
  var interval = setInterval(pollGamePads, 500)
}

const pollGamePads = () => {
  const gamepads = navigator.getGamepads()
  for (let i = 0; i < gamepads.length; i++) {
    const gp = gamepads[i]
    if (gp) {
      gameLoop();
      clearInterval(interval)
    }
  }
}

const buttonPressed = (b) => {
  if (typeof (b) == "object") {
    return b.pressed;
  }
  return b == 1.0
}


const gameLoop = () => {
  const gamepads = navigator.getGamepads()

  if (!gamepads)
    return;

  const gp = gamepads[0]

  if (buttonPressed(gp.buttons[0])) {
    console.log(`button: ${gp.buttons[0]} `);
  } else if (buttonPressed(gp.buttons[2])) {
    console.log(`button: ${gp.buttons[2]} `);
  }
  if (buttonPressed(gp.buttons[1])) {
    console.log(`button: ${gp.buttons[1]} `);
  } else if (buttonPressed(gp.buttons[3])) {
    console.log(`button: ${gp.buttons[3]} `);
  }

  var start = window.requestAnimationFrame(gameLoop)
}






