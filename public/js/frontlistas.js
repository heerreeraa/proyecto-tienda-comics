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
    });
}
cargarClientes();
