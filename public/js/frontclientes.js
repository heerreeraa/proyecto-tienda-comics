// Get the modal
var modal = document.querySelector("#myModal");

// Get the button that opens the modal
var btn = document.querySelector("#btn-Agregar");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
document
  .querySelector("#btn-Agregar")
  .addEventListener("click", function (event) {
    event.preventDefault();
    modal.style.display = "block";

    // fetch("/burger", {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // })
    //   .then(function (response) {
    //     return response.json();
    //   })
    //   .then(function (res) {
    //     console.log(res.hamburguesas);

    //     console.log("HOLA PERRO");
    //   });
  });
document
  .querySelector("#btn-insertar")
  .addEventListener("click", function (event) {
    event.preventDefault();
    alert("Insertado pa");
    // fetch("/burger", {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // })
    //   .then(function (response) {
    //     return response.json();
    //   })
    //   .then(function (res) {
    //     console.log(res.hamburguesas);

    //     console.log("HOLA PERRO");
    //   });
  });
