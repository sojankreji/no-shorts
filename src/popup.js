// Initialize butotn with users's prefered color
let powerBtn = document.getElementById("power-btn");
let powerBtnOn = document.getElementById("power-btn-on");
let powerBtnOFF = document.getElementById("power-btn-off");
btnStateActive = true;
toggleBtn()




// chrome.storage.sync.get("color", ({ color }) => {
//   changeColor.style.backgroundColor = color;
// });

function toggleBtn() {
  if (btnStateActive){
    powerBtnOn.style.display = "None";
    powerBtnOFF.style.display = "Block"
  }
  else{
    powerBtnOFF.style.display = "None";
    powerBtnOn.style.display = "Block"
  }
  btnStateActive = !btnStateActive;
}
// When the button is clicked, inject setPageBackgroundColor into current page
powerBtn.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  toggleBtn()
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: toggleShorts(btnStateActive),
  });
});

// // The body of this function will be execuetd as a content script inside the
// // current page
function toggleShorts(enable) {
  try {
    $("ytd-rich-shelf-renderer").hidden = enable
  } catch (error) {
    console.log("Unable to remove shorts from home page")
  }
  
  // chrome.storage.sync.get("color", ({ color }) => {
  //   document.body.style.backgroundColor = color;
  // });
}
