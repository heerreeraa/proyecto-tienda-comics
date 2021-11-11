let num = 0;
// FUNCIONAMIENTO DEL MODAL -->
var modal = document.querySelector("#myModal");
var span = document.getElementsByClassName("close")[0];

span.onclick = function () {
  modal.style.display = "none";
};

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
    document.querySelector("#myModal").innerHTML = "";
    cargarModalAgregarProducto();
  });
// <-- END FUNCIONAMIENTO DEL MODAL

// INSERTAR PRODUCTO EN LOCAL -->
document
  .querySelector("#btn-insertar-producto")
  .addEventListener("click", function (event) {
    event.preventDefault();
    alert("Producto insertado correctamente pá!");

    let nombre = document.querySelector("input[name='nombre-producto']").value;
    let precio = document.querySelector("input[name='precio-producto']").value;
    let imagen = document.querySelector("input[name='imagen-producto']").value;

    let producto = {
      nombre: nombre,
      precio: precio,
      imagen: imagen,
    };
    console.log(producto);
    let body = JSON.stringify(producto);

    fetch("/productos/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: body,
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (res) {
        console.log(res);
      });
    modal.style.display = "none";
    location.reload();
  });
// <-- END INSERTAR PRODCUTO EN LOCAL

// MOSTRAR PRODUCTO INSERTADO  -->
function cargarProductos() {
  fetch("/productos/", {
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
        const item = document.createElement("div");
        item.id = `${photo.Nombre}`;
        item.classList.add("item");

        item.innerHTML = `
            <a target="_blank">
              <p>${photo.Nombre} ${photo.Precio}</p>
              <button id=boton${num} class="btn-carrito">
                <img id=${photo.Nombre} src=../styles/carrito2.png>
              </button>
              <button id=btn${num} class="boton-carrito">
                <img id=${photo.Nombre} src=../styles/carrito.png>
              </button>
              <img id=${photo.Nombre} class="img-zoom" src="${photo.Imagen}" style="width:300px; heigth:300px;">
            </a>
            `;
        document.querySelector(".gallery").appendChild(item);
      });
      generarModalProduct();
      añadirCesta();
      eliminarCesta();
    });
}
// <-- MOSTRAR PRODUCTO INSERTADO

// GENERAR MODAL EDITAR/ELIMINAR PRODUCTO -->
function generarModalProduct() {
  document.querySelectorAll(".item .img-zoom").forEach(function (el) {
    el.addEventListener("click", function () {
      modal.style.display = "block";
      cargarModal(this.id);
      document.querySelector("#myModal").innerHTML = "";
      cargarModalProducto();
      eliminarProductos();
    });
  });
}

function cargarModalProducto() {
  const item = document.createElement("div");
  item.className = `modal-content`;

  item.innerHTML = `
  <div id="div-btn-cerrar">
    <span class="close">&times;</span>
    </div>
    <div id="content-modal">
        <div>
            <div>
                <form>
                    <label>Nombre</label>
                    <input type="text" name="nombre-producto" readonly />
                </form>
            </div>
            <div>
                <form>
                    <label>Precio</label>
                    <input type="text" name="precio-producto" />
                </form>
            </div>
            <div>
            <form>
                <label>Imagen</label>
                <input type="text" name="imagen-producto" />
            </form>
        </div>
        </div>
    </div>
    <div>
    <button class="btn-modal-producto" id="btn-modificar-producto">MODIFICAR</button>
    <button class="btn-modal-producto" id="btn-eliminar-producto">ELIMINAR</button>    
    </div> 
    `;
  document.querySelector("#myModal").appendChild(item);

  var modal = document.querySelector("#myModal");
  var span = document.getElementsByClassName("close")[0];

  span.onclick = function () {
    modal.style.display = "none";
    //location.reload();
  };

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
      //location.reload();
    }
  };
  document
    .querySelector("#btn-modificar-producto")
    .addEventListener("click", function (event) {
      event.preventDefault();
      let nombre = document.querySelector(
        "input[name='nombre-producto']"
      ).value;
      let precio = document.querySelector(
        "input[name='precio-producto']"
      ).value;
      let imagen = document.querySelector(
        "input[name='imagen-producto']"
      ).value;

      let producto = {
        nombre: nombre,
        precio: precio,
        imagen: imagen,
      };
      console.log(producto);
      let body = JSON.stringify(producto);

      fetch("/productos/", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: body,
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (res) {
          console.log(res);
        });
      cargarCesta();
      //document.querySelector("#galeria-productos").innerHTML = "";
      //cargarProductos();
      location.reload();
    });
  document
    .querySelector("#btn-eliminar-producto")
    .addEventListener("click", function (event) {
      event.preventDefault();
      alert(1);
      let nombre = document.querySelector(
        "input[name='nombre-producto']"
      ).value;
      let precio = document.querySelector(
        "input[name='precio-producto']"
      ).value;
      let imagen = document.querySelector(
        "input[name='imagen-producto']"
      ).value;

      let producto = {
        nombre: nombre,
        precio: precio,
        imagen: imagen,
      };
      console.log(producto);
      let body = JSON.stringify(producto);

      fetch("/productos/", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: body,
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (res) {
          console.log(res);
        });
      cargarCesta();
      // document.querySelector("#galeria-productos").innerHTML = "";
      // cargarProductos();
      location.reload();
    });
}
function cargarModalAgregarProducto() {
  const item = document.createElement("div");
  item.className = `modal-content`;

  item.innerHTML = `
    <div id="div-btn-cerrar">
        <span class="close">&times;</span>
    </div>
    <div id="content-modal">
        <div>
            <div>
                <form>
                    <label>Nombre</label>
                    <input type="text" name="nombre-producto" />
                </form>
            </div>
            <div>
                <form>
                    <label>Precio</label>
                    <input type="text" name="precio-producto" />
                </form>
            </div>
            <div>
                <form>
                    <label>Imagen</label>
                    <input type="text" name="imagen-producto" />
                </form>
            </div>
        </div>
    </div>
    <div>
        <button id="btn-insertar-producto">AGREGAR</button>
    </div>
    `;
  document.querySelector("#myModal").appendChild(item);

  var modal = document.querySelector("#myModal");
  var span = document.getElementsByClassName("close")[0];

  span.onclick = function () {
    modal.style.display = "none";
    //location.reload();
  };

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
      //location.reload();
    }
  };
}

function cargarModal(nombre) {
  let producto = {
    nombre: nombre,
  };
  console.log(producto);
  let body = JSON.stringify(producto);

  fetch("/productos/buscarNombre", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: body,
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (res) {
      console.log(res);
      document.querySelector(
        "input[name='nombre-producto']"
      ).value = `${res[0].Nombre}`;
      document.querySelector(
        "input[name='precio-producto']"
      ).value = `${res[0].Precio}`;
      document.querySelector(
        "input[name='imagen-producto']"
      ).value = `${res[0].Imagen}`;
    });
}
// <-- GENERAR MODAL EDITAR PRODUCTO

// ELIMINAR PRODUCTO -->
function eliminarProductos() {
  document
    .querySelector("#btn-eliminar-producto")
    .addEventListener("click", function (event) {
      event.preventDefault();
      let nombre = document.querySelector("input[name='nombre-producto]").value;
      let precio = document.querySelector(
        "input[name='precio-producto']"
      ).value;
      let imagen = document.querySelector(
        "input[name='imagen-producto']"
      ).value;
      let producto = {
        nombre: nombre,
        precio: precio,
        imagen: imagen,
      };
      console.log(producto);
      let body = JSON.stringify(producto);

      fetch("/productos/", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: body,
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (res) {
          console.log(res);
        });
      location.reload();
    });
}
// <-- ELIMINAR PRODUCTO

this.arrayProductos = [];
this.arrayProductosLocal = sessionStorage.getItem("arrayProductos");
this.arrayProductosLocalParseada = JSON.parse(arrayProductosLocal);
console.log(arrayProductosLocalParseada);
arrayProductos = arrayProductosLocalParseada;

if (arrayProductos == null) {
  arrayProductos = [];
  sessionStorage.setItem("arrayProductos", JSON.stringify(arrayProductos));
}

function añadirCesta() {
  document.querySelectorAll(".boton-carrito img").forEach(function (el) {
    el.addEventListener("click", function () {
      let idImg = this.id;

      arrayProductos.push(`${idImg}`);
      sessionStorage.removeItem("arrayProductos");
      arrayObjetoFotos = JSON.stringify(arrayProductos);
      sessionStorage.setItem("arrayProductos", arrayObjetoFotos);

      console.log("Array js:" + arrayProductos);
      console.log("Array local: " + arrayProductosLocalParseada.length);
      vaciarCesta();
      crearCesta();
      cargarCesta();
      cargarClientes();
    });
  });
}
function eliminarCesta() {
  document.querySelectorAll(".btn-carrito img").forEach(function (el) {
    el.addEventListener("click", function () {
      let idImg = this.id;
      let index = arrayProductos.indexOf(`${idImg}`);
      if (index > -1) {
        arrayProductos.splice(index, 1);
      }
      sessionStorage.removeItem("arrayProductos");
      arrayObjetoFotos = JSON.stringify(arrayProductos);
      sessionStorage.setItem("arrayProductos", arrayObjetoFotos);
      console.log(sessionStorage.getItem("arrayProductos"));
      console.log(arrayProductos);
      vaciarCesta();
      crearCesta();
      cargarCesta();
      cargarClientes();
    });
  });
}
function cargarClientes() {
  fetch("/productos/cargarClientes", {
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
        item.value = `${photo.Nombre}`;
        item.innerHTML = `${photo.Nombre}`;
        document.querySelector(".select-clientes-ventas").appendChild(item);
      });
    });
}
let num2 = 0;
function cargarCesta() {
  let arrayProductos = [];
  arrayProductosLocal = sessionStorage.getItem("arrayProductos");
  arrayProductosLocalParseada = JSON.parse(arrayProductosLocal);
  console.log(arrayProductosLocalParseada);
  arrayProductos = arrayProductosLocalParseada;

  if (arrayProductos == null) {
    arrayProductos = [];
  }
  for (let c = 0; c < arrayProductos.length; c++) {
    let item = document.createElement("div");
    item.id = `divProd${num2}`;
    item.className = "div-productos-carro";

    let a = document.createElement("a");
    a.innerHTML = `${arrayProductos[c]}`;

    let btn = document.createElement("button");
    btn.className = "btn-borrar-cesta"
    btn.id = `${arrayProductos[c]}`;
    btn.innerHTML = "X";
    document.querySelector("#mySidepanel").appendChild(item);
    document.querySelector(`#divProd${num2}`).appendChild(a);
    document.querySelector(`#divProd${num2}`).appendChild(btn);
    num2++;
  }
  eliminarProdCesta();
}

function vaciarCesta() {
  document.querySelector("#mySidepanel").innerHTML = "";
}
function crearCesta() {
  document.querySelector("#mySidepanel").innerHTML = `
  <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">×</a>
                    <a href="#">Cesta</a>
                    <select name="" class="select-clientes-ventas">
                        <option value="" selected disabled hidden>Seleccionar Cliente</option>
                    </select>
                    <button class="btn-finalizar">FINALIZAR</button>
  `;
}
function finalizarPedido() {
  document
    .querySelector(".btn-finalizar")
    .addEventListener("click", function (event) {
      event.preventDefault();
      let arrayProductos2 = [];
      arrayProductosLocal = sessionStorage.getItem("arrayProductos");
      arrayProductosLocalParseada = JSON.parse(arrayProductosLocal);
      console.log(arrayProductosLocalParseada);
      arrayProductos2 = arrayProductosLocalParseada;

      if (arrayProductos2 == null) {
        arrayProductos2 = [];
      }

      var nombreCliente = document.querySelector(
        ".select-clientes-ventas"
      ).value;
      let venta = {
        nombreCliente: nombreCliente,
        arrayProductos2: arrayProductos2,
      };
      console.log(venta);
      alert(venta);
      let body = JSON.stringify(venta);

      fetch("/productos/venta", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: body,
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (res) {
          console.log(res);
        });
      arrayProductos = [];
      sessionStorage.removeItem("arrayProductos");
      arrayObjetoFotos = JSON.stringify(arrayProductos);
      sessionStorage.setItem("arrayProductos", arrayObjetoFotos);
      console.log(sessionStorage.getItem("arrayProductos"));
      console.log(arrayProductos);
      vaciarCesta();
      crearCesta();
      cargarCesta();
      cargarClientes();
    });
}
function eliminarProdCesta() {
  document
    .querySelectorAll(".div-productos-carro button")
    .forEach(function (el) {
      el.addEventListener("click", function () {
        if (confirm("Estas seguro que deseas eliminarlo de la cesta?")) {
          // Do something!
          let idImg = this.id;
          let index = arrayProductos.indexOf(`${idImg}`);
          if (index > -1) {
            arrayProductos.splice(index, 1);
          }
          sessionStorage.removeItem("arrayProductos");
          arrayObjetoFotos = JSON.stringify(arrayProductos);
          sessionStorage.setItem("arrayProductos", arrayObjetoFotos);
          console.log(sessionStorage.getItem("arrayProductos"));
          console.log(arrayProductos);
        } else {
          // Do nothing!
        }
        vaciarCesta();
        crearCesta();
        cargarCesta();
        cargarClientes();
      });
    });
}
cargarProductos();
cargarClientes();
cargarCesta();
finalizarPedido();
