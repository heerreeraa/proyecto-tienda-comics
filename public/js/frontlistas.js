function cargarClientes() {
  fetch("/listas/cargarClientes", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (res) {
      console.log(res);

      res.forEach((photo) => {
        const item = document.createElement("option");
        item.id = `${photo.Nombre}`;

        item.innerHTML = `${photo.Nombre}`;
        document.querySelector(".select-usuario-ventas").appendChild(item);
      });
      mostrarVentas();

    });
}
cargarClientes();

function mostrarVentas() {
  document.querySelector(".select-usuario-ventas")
      .addEventListener("change", function (event) {
      // event.preventDefault();
      let nombreVentas = (`${event.target.value}`);
      console.log(nombreVentas);
      
  })
}




