const xboxStart = document.querySelector("#xbox-start");
const xboxConnected = document.querySelector("#xbox-connected");
const xboxTest = document.querySelector("#xbox-test");
const gamepadDisplay = document.getElementById("gamepad-display");
const keyboardDisplay = document.getElementById("keyboard-display");

const chartDom = document.getElementById("graph");
let myChart = echarts.init(chartDom)

const keyChartDom = document.getElementById("chart")
let mykeyChart = echarts.init(keyChartDom)

/** globle gamepad object */
const gamepad = {
  id: 0,
  axis: [],
  buttons: [],
};

const keyW = {
  id: 0,
  interval: 0,
  ispressed: 0,
}

let counter = 0;

/** hide element when gamepad is disconnected */
function disconnectedContents() {
  xboxStart.style.display = "";
  xboxConnected.style.display = "none";
  xboxTest.style.display = "none";
}

/** show element when gamepad is connected */
function connectedContents() {
  xboxStart.style.display = "none";
  xboxConnected.style.display = "";
  xboxTest.style.display = "";
}

function init() {
  disconnectedContents();
}
window.onload = init();

/** event listener for gamepad connect */
window.addEventListener("gamepadconnected", () => {
  connectedContents();
  window.requestAnimationFrame(gameLoop);
  startGraph()
});

/** event listener for gamepad disconnect */
window.addEventListener("gamepaddisconnected", () => {
  disconnectedContents();
});

/** event listener for keydown */
window.addEventListener("keydown", (e) => {
  if (e.key === "w") {
    const KeyW = document.getElementById("key-w");
    KeyW.style.background = "#555";
  }
});

/** event listener for keyup */
window.addEventListener("keyup", (e) => {
  if (e.key === "w") {
    const KeyW = document.getElementById("key-w");
    KeyW.style.background = "#f7f7f7";
  }
});

/** game loop for check gamepad status */
function gameLoop() {
  const gamepads = navigator.getGamepads();
  if (gamepads[0]) {
    const gamepadState = {
      id: gamepads[0].id,
      axis: [
        gamepads[0].axes[0].toFixed(2),
        gamepads[0].axes[1].toFixed(2),
        gamepads[0].axes[2].toFixed(2),
        gamepads[0].axes[3].toFixed(2),
      ],
      buttons: [
        { button_0: gamepads[0].buttons[0].pressed },
        { button_1: gamepads[0].buttons[1].pressed },
        { button_2: gamepads[0].buttons[2].pressed },
        { button_3: gamepads[0].buttons[3].pressed },
        { button_4: gamepads[0].buttons[4].pressed },
        { button_5: gamepads[0].buttons[5].pressed },
        { button_6: gamepads[0].buttons[6].value.toFixed(2) },
        { button_7: gamepads[0].buttons[7].value.toFixed(2) },
        { button_8: gamepads[0].buttons[8].pressed },
        { button_9: gamepads[0].buttons[9].pressed },
        { button_10: gamepads[0].buttons[10].pressed },
        { button_11: gamepads[0].buttons[11].pressed },
        { button_12: gamepads[0].buttons[12].pressed },
        { button_13: gamepads[0].buttons[13].pressed },
        { button_14: gamepads[0].buttons[14].pressed },
        { button_15: gamepads[0].buttons[15].pressed },
      ],
    };

    const keyboardState = {
      id: "w key",
      ispressed: 0,
      frequancy: parseInt(triggerDataTransfer(gamepads[0].buttons[7].value.toFixed(2))),
    }
    gamepad.id = gamepadState.id;
    gamepad.axis = gamepadState.axis;
    gamepad.buttons = gamepadState.buttons;
    gamepadDisplay.textContent = JSON.stringify(gamepadState, null, 2);


    const indicator = parseInt(triggerDataTransfer(gamepads[0].buttons[7].value.toFixed(2)));
    console.log("counter:", counter)

    if (counter > 50) {
      counter = 0
    }

    if (indicator === 50) {
      keyboardState.ispressed = 0;
      keyW.ispressed = 0;
      counter = 0
    } else if (indicator === 0) {
      keyboardState.ispressed = 1;
      keyW.ispressed = 1;
      counter = 0
    } else {
      if (counter === indicator) {
        console.log("button pressed")
        keyboardState.ispressed = 1;
        keyW.ispressed = 1;
        counter = 0;
      } else {
        keyboardState.ispressed = 0;
        keyW.ispressed = 0;
        counter = counter + 1;
      }
    }

    if (keyW.ispressed === 1) {
      const KeyW = document.getElementById("key-w");
      KeyW.style.background = "#555";
    } else {
      const KeyW = document.getElementById("key-w");
      KeyW.style.background = "#f7f7f7";
    }

    keyboardDisplay.textContent = JSON.stringify(keyboardState, null, 2)

  }
  window.requestAnimationFrame(gameLoop);
}

/**  dispatch key event  */
function pressedKeyW() {
  window.dispatchEvent(
    new KeyboardEvent("keydown", {
      key: "w",
    })
  );
  console.log("w key pressed")
  window.dispatchEvent(
    new KeyboardEvent("keyup", {
      key: "w",
    })
  );
}

/** data conversion */
function triggerDataTransfer(origin) {
  let percentage = 1 - (origin / 1);
  let processedData = 50 * percentage;

  return processedData;
}

/** frequancy of press keyboard */
function pressFrequency(data) {
  setInterval(() => {
    pressedKeyW();
  }, triggerDataTransfer(data));
}

/** keyboard chart  */
let keyTime = []
let keyData = []
let keyNow = 0;

let keyOption;

function addKeyData() {
  keyData.push(keyW.ispressed)
  keyTime.push(keyNow)

  if (keyTime.length > 100) {
    keyTime.shift()
    keyData.shift()
  }
  keyNow += 1
}

keyOption = {
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: keyTime
  },
  yAxis: {
    boundaryGap: [0, '50%'],
    type: 'value'
  },
  series: [
    {
      name: '成交',
      type: 'line',
      smooth: true,
      symbol: 'none',
      stack: 'a',
      areaStyle: {
        normal: {}
      },
      data: keyData
    }
  ]
};


keyOption && mykeyChart.setOption(keyOption);



/** e-chart for showing mapping data */
let time = []
let data = []
let now = 0;

let option;

function addData() {
  time.push(now)
  data.push(gamepad.buttons[7].button_7)
  if (time.length > 100) {
    data.shift()
    time.shift()
  }
  now += 1
}

option = {
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: time
  },
  yAxis: {
    boundaryGap: [0, '50%'],
    type: 'value'
  },
  series: [
    {
      name: '成交',
      type: 'line',
      smooth: true,
      symbol: 'none',
      stack: 'a',
      areaStyle: {
        normal: {}
      },
      data: data
    }
  ]
};

function startGraph() {
  setInterval(() => {
    addData();
    addKeyData();

    myChart.setOption({
      xAxis: {
        data: time
      },
      series: [
        {
          name: '成交',
          data: data
        }
      ]
    })

    mykeyChart.setOption({
      xAxis: {
        data: keyTime
      },
      series: [
        {
          name: '成交',
          data: keyData
        }
      ]
    })

  }, 17);
}

option && myChart.setOption(option);
