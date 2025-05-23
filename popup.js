document.addEventListener("DOMContentLoaded", function () {
  // 获取所有开关元素
  const toggleRadio = document.getElementById("toggleRadio");
  const toggleCheckbox = document.getElementById("toggleCheckbox");
  const toggleResults = document.getElementById("toggleResults");
  const toggleInputs = document.getElementById("toggleInputs");
  const trainingMode = document.getElementById("trainingMode");
  const filterError = document.getElementById("filterError");
  const exportButton = document.getElementById("exportButton");
  const importButton = document.getElementById("importButton");
  const exportJsonButton = document.getElementById("exportJsonButton");
  const editAnswersButton = document.getElementById("editAnswersButton");

  // 从存储中加载当前状态
  chrome.storage.sync.get(
    [
      "hideRadio",
      "hideCheckbox",
      "hideResults",
      "hideInputs",
      "trainingMode",
      "filterError",
    ],
    function (result) {
      toggleRadio.checked = result.hideRadio || false;
      toggleCheckbox.checked = result.hideCheckbox || false;
      toggleResults.checked = result.hideResults || false;
      toggleInputs.checked = result.hideInputs || false;
      trainingMode.checked = result.trainingMode || false;
      filterError.checked = result.filterError || false;
    }
  );

  // 设置开关的点击事件
  toggleRadio.addEventListener("change", function () {
    const hideRadio = toggleRadio.checked;
    chrome.storage.sync.set({ hideRadio }, function () {
      sendMessage({ type: "radio", hide: hideRadio });
    });
  });

  toggleCheckbox.addEventListener("change", function () {
    const hideCheckbox = toggleCheckbox.checked;
    chrome.storage.sync.set({ hideCheckbox }, function () {
      sendMessage({ type: "checkbox", hide: hideCheckbox });
    });
  });

  toggleResults.addEventListener("change", function () {
    const hideResults = toggleResults.checked;
    chrome.storage.sync.set({ hideResults }, function () {
      sendMessage({ type: "results", hide: hideResults });
    });
  });

  toggleInputs.addEventListener("change", function () {
    const hideInputs = toggleInputs.checked;
    chrome.storage.sync.set({ hideInputs }, function () {
      sendMessage({ type: "inputs", hide: hideInputs });
    });
  });

  trainingMode.addEventListener("change", function () {
    const isTrainingModeActive = trainingMode.checked;
    chrome.storage.sync.set(
      { trainingMode: isTrainingModeActive },
      function () {
        sendMessage({ type: "trainingMode", hide: isTrainingModeActive });
      }
    );
  });

  exportButton.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      if (tabs[0]) {
        chrome.tabs.sendMessage(tabs[0].id, { type: "exportAnswers" });
      }
    });
  });

  // 隐藏正确答案
  filterError.addEventListener("change", function () {
    const isFilterErrorActive = filterError.checked;
    chrome.storage.sync.set({ filterError: isFilterErrorActive }, function () {
      sendMessage({ type: "filterError", hide: isFilterErrorActive });
    });
  });

  importButton.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      if (tabs[0]) {
        chrome.tabs.sendMessage(tabs[0].id, { type: "importAnswers" });
      }
    });
  });

  exportJsonButton.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      if (tabs[0]) {
        chrome.tabs.sendMessage(tabs[0].id, { type: "exportJson" });
      }
    });
  });

  editAnswersButton.addEventListener("click", function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      if (tabs[0]) {
        chrome.tabs.sendMessage(tabs[0].id, { type: "editAnswers" });
      }
    });
  });

  // 向当前标签页发送消息
  function sendMessage(message) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      if (tabs[0]) {
        chrome.tabs.sendMessage(tabs[0].id, message);
      }
    });
  }
});
