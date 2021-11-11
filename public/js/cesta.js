function openNav() {
  document.getElementById("mySidepanel").style.width = "250px";
}

function closeNav() {
  document.getElementById("mySidepanel").style.width = "0";
}

let open = false;
function openClose() {
  if (open == false) {
    openNav();
    open = true;
  } else {
    closeNav();
    open = false;
  }
}
