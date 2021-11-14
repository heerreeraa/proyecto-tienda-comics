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
      fetch("/listas/mostrarVentas", {
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

fetch("/listas/masVendido", {
  method: "GET",
  headers: {
    "Content-Type": "application/json"
  },
}).then(function (response) {
  return response.json()
}).then(function (res) {
  let arrayLista = [];
  let masVendido 
  for(e = 0; i<res.length; i++){
    arrayLista.push(datos[e].cont);
    masVendido = parseInt(Math.max(arrayLista));
    const pmasVendido = document.createElement("p");
    const numMasVendido = document.createTextNode(masVendido);
    pmasVendido.appendChild(numMasVendido);
    let divMasVendido = document.querySelector("#div-mas-vendidos");
    divMasVendido.appendChild(pmasVendido);
  }
  console.log(masVendido);

})

fetch("/listas/menosVendido", {
  method: "GET",
  headers: {
    "Content-Type": "application/json"
  },
}).then(function (response) {
  return response.json()
}).then(function (res) {
  let arrayLista = [];
  let menosVendido 
  for(e = 0; i<res.length; i++){
    arrayLista.push(res[e].cont);
    menosVendido = parseInt(Math.max(arrayLista));
  }
  const pMenosVendido = document.createElement("p");
    const numMenosVendido = document.createTextNode(menosVendido);
    pMenosVendido.appendChild(numMenosVendido);
    let divMenosVendido = document.querySelector("#div-menos-vendidos");
    divMenosVendido.appendChild(pMenosVendido);
  console.log(menosVendido);
})







