// Get the modal
var modal = document.querySelector("#myModal");

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
  .querySelector("#btn-agregar-producto")
  .addEventListener("click", function (event) {
    event.preventDefault();
    modal.style.display = "block";
  });
// // INSERTAR EN LOCAL -->
// document
//   .querySelector("#btn-insertar")
//   .addEventListener("click", function (event) {
//     event.preventDefault();
//     alert("Insertado pa");

//     let nombre = document.querySelector("input[name='nombre']").value;
//     let apellido = document.querySelector("input[name='apellido']").value;
//     let dni = document.querySelector("input[name='dni']").value;
//     let tel = document.querySelector("input[name='tel']").value;

//     let cliente = {
//       nombre: nombre,
//       apellido: apellido,
//       dni: dni,
//       tel: tel,
//     };
//     console.log(cliente);
//     let body = JSON.stringify(cliente);

//     fetch("/clientes/", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: body,
//     })
//       .then(function (response) {
//         return response.json();
//       })
//       .then(function (res) {
//         console.log(res);
//       });
//   });
