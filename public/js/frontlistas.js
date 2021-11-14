// CARGAR CLIENTES EN SELECT DE LISTAS -->
function cargarClientes() {
  fetch("/listas/cargarClientes/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (res) {
      // console.log(res);

      res.forEach((photo) => {
        const item = document.createElement("option");
        item.id = `${photo.Nombre}`;

        item.innerHTML = `${photo.Nombre}`;
        document.querySelector(".select-usuario-ventas").appendChild(item);
        // contadorProductos();
      });
    });
  mostrarVentas();
  // contadorProductos();
}
cargarClientes();
// <-- CARGAR CLIENTES EN SELECT DE LISTAS

// MOSTRAR VENTAS POR CLIENTE EN LISTAS -->
function mostrarVentas() {
  let nombreVentas;
  document
    .querySelector(".select-usuario-ventas")
    .addEventListener("change", function (event) {
      event.preventDefault();
      nombreVentas = `${event.target.value}`;
      // console.log(nombreVentas);
      fetch("/listas/mostrarVentas/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Nombre: nombreVentas }),
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (res) {
          // console.log(res);
          let arrayLista = res[0].Productos;
          // console.log(arrayLista);
          for (i = 0; i < arrayLista.length; i++) {
            const elemento = document.createElement("p");
            const elemContenido = document.createTextNode(arrayLista[i]);
            elemento.appendChild(elemContenido);
            let divLista = document.querySelector("#div-lista-ventas");
            divLista.appendChild(elemento);
          }
          // document.querySelector("#myModal").appendChild(item);
          // var modal = document.querySelector("#myModal");
        });
    });
}

fetch("/listas/masVendidos", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
})
  .then(function (response) {
    return response.json();
  })
  .then(function (res) {
    let arrayLista = [];
    let masVendido;
    let prodmasVendido;
    for (e = 0; i < res.length; i++) {
      arrayLista.push(res[e].cont);
      masVendido = parseInt(Math.max(arrayLista));
      if (res[e].cont === masVendido)
        prodmasVendido = res[e].Nombre + " " + res[e].cont;
    }
    const pmasVendido = document.createElement("p");
    const nummasVendido = document.createTextNode(prodmasVendido);
    pmasVendido.appendChild(nummasVendido);
    let divmasVendido = document.querySelector("#div-mas-vendidos");
    divmasVendido.appendChild(pmasVendido);
    console.log(masVendido);
  });

fetch("/listas/menosVendidos", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
})
  .then(function (response) {
    return response.json();
  })
  .then(function (res) {
    let arrayLista = [];
    let menosVendido;
    let prodMenosVendido;
    for (e = 0; i < res.length; i++) {
      arrayLista.push(res[e].cont);
      menosVendido = parseInt(Math.min(arrayLista));
      if (res[e].cont === masVendido)
        prodMenosVendido = res[e].Nombre + " " + res[e].cont;
    }
    const pMenosVendido = document.createElement("p");
    const numMenosVendido = document.createTextNode(prodMenosVendido);
    pMenosVendido.appendChild(numMenosVendido);
    let divMenosVendido = document.querySelector("#div-menos-vendidos");
    divMenosVendido.appendChild(pMenosVendido);
    console.log(menosVendido);
  });
