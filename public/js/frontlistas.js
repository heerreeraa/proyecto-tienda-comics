// CARGAR CLIENTES EN SELECT DE LISTAS -->
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
      // console.log(res);

      res.forEach((photo) => {
        const item = document.createElement("option");
        item.id = `${photo.Nombre}`;

        item.innerHTML = `${photo.Nombre}`;
        document.querySelector(".select-usuario-ventas").appendChild(item);
        contadorProductos();    });

      });
      mostrarVentas();
      contadorProductos();
}
cargarClientes();
// <-- CARGAR CLIENTES EN SELECT DE LISTAS

// MOSTRAR VENTAS POR CLIENTE EN LISTAS -->
function mostrarVentas() {
  let nombreVentas;
  document.querySelector(".select-usuario-ventas")
    .addEventListener("change", function (event) {
      event.preventDefault();
      nombreVentas = (`${event.target.value}`);
      // console.log(nombreVentas);
      fetch("/listas/mostrarVentas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ Nombre: nombreVentas }),
      }).then(function (response) {
        return response.json()
      }).then(function (res) {
        // console.log(res);
        let arrayLista = res[0].Productos;
        // console.log(arrayLista);
        for(i=0; i<arrayLista.length; i++){
          const elemento = document.createElement("p");
          const elemContenido = document.createTextNode(arrayLista[i]);
          elemento.appendChild(elemContenido);
          let divLista = document.querySelector("#div-lista-ventas");
          divLista.appendChild(elemento);
        }
        // document.querySelector("#myModal").appendChild(item);
        // var modal = document.querySelector("#myModal");
      })
    })
}
// <-- MOSTRAR VENTAS POR CLIENTE EN LISTAS

// MOSTRAR VENTAS POR CLIENTE EN LISTAS -->
function contadorProductos() {
  let arrayProductos = [];
      fetch("/listas/contadorProductos", {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        },
      }).then(function (response) {
        return response.json()
      }).then(function (res) {
        // console.log(res);
        arrayProductos = res[0].Productos;
        console.log(res);
        // console.log(arrayProductos);
        // for(i=0; i<arrayProductos.length; i++){
          
        // }
        // document.querySelector("#myModal").appendChild(item);
        // var modal = document.querySelector("#myModal");
      })
}







