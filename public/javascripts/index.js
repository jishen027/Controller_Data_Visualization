const xboxStart = document.querySelector("#xbox-start");
const xboxConnected = document.querySelector("#xbox-connected");
const xboxTest = document.querySelector("#xbox-test");
const gamepadDispaly = document.getElementById("gamepad-display");

const chartDom = document.getElementById("graph");
let myChart = echarts.init(chartDom)

const keyChartDom = document.getElementById("chart")
let mykeyChart = echarts.init(keyChartDom)

const gamepad = {
  id: 0,
  axis: [],
  buttons: [],
};

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

window.addEventListener("gamepadconnected", () => {
  connectedContents();
  window.requestAnimationFrame(gameLoop);
  startGraph()
  updateKeyGraph()
});

window.addEventListener("gamepaddisconnected", () => {
  disconnectedContents();
});

window.addEventListener("keydown", (e) => {
  if (e.key === "w") {
    const KeyW = document.getElementById("key-w");
    KeyW.style.background = "#555";
  }
});

window.addEventListener("keyup", (e) => {
  if (e.key === "w") {
    const KeyW = document.getElementById("key-w");
    KeyW.style.background = "#f7f7f7";
  }
});



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
    gamepad.id = gamepadState.id;
    gamepad.axis = gamepadState.axis;
    gamepad.buttons = gamepadState.buttons;
    gamepadDispaly.textContent = JSON.stringify(gamepadState, null, 2);
  }
  window.requestAnimationFrame(gameLoop);
}

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

// data transfer
function triggerDataTransfer(origin) {
  let percentage = 1 - (origin / 1);
  let processedData = 5000 * percentage;

  return processedData;
}


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

  let transferedKeyData = triggerDataTransfer(gamepad.buttons[7].button_7)

  keyTime.push(keyNow)
  keyData.push(transferedKeyData)

  if (keyTime.length > 15) {
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

function updateKeyGraph() {
  setInterval(() => {
    addKeyData();
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
    });
  }, 500);
}

keyOption && mykeyChart.setOption(keyOption);



/** e-chart for showing mapping data */
let time = []
let data = []
let now = 0;

let option;

function addData() {
  time.push(now)
  data.push(gamepad.buttons[7].button_7)
  if (time.length > 15) {
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
    });
  }, 500);
}

option && myChart.setOption(option);
