let head = 0,
  tails = 0;
let coin = document.querySelector(".coin"),
  flipBtn = document.querySelector("#flip-button"),
  resetBtn = document.querySelector("#reset-button");

flipBtn.addEventListener("click", () => {
  let i = Math.floor(Math.random() * 2);
  coin.style.animation = "none";
  if (i) {
    setTimeout(() => {
      coin.style.animation = "flip-head 3s forwards";
    }, 100);
    head++;
  } else {
    setTimeout(() => {
      coin.style.animation = "flip-tails 3s forwards";
    }, 100);
    tails++;
  }
  setTimeout(updateState, 3000);
  disableButton();
});

function updateState() {
  document.querySelector("#head-count").textContent = `Tura: ${head}`;
  document.querySelector("#tails-count").textContent = `Yazı: ${tails}`;
}

function disableButton() {
  flipBtn.disabled = true;
  setTimeout(() => {
    flipBtn.disabled = false;
  }, 3000);
}

resetBtn.addEventListener("click", () => {
  coin.style.animation = "none";
  tails = 0;
  head = 0;
  updateState();
});
