let num = 0;
let idProd;
let tipo;

// FUNCIONAMIENTO DEL MODAL -->
var modal = document.querySelector("#myModal");
var span = document.getElementsByClassName("close")[0];

cargarProductos();
cargarClientes();
cargarCesta();
finalizarPedido();

span.onclick = function () {
  modal.style.display = "none";
  let img = document.querySelectorAll(".boton-carrito");
  for (let c = 0; c < img.length; c++) {
    img[c].style.zIndex = "1";
  }
  let img2 = document.querySelectorAll(".btn-carrito");
  for (let c = 0; c < img2.length; c++) {
    img2[c].style.zIndex = "1";
  }
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
    cambioTipoProducto();
    agregarProducto();
    let img = document.querySelectorAll(".boton-carrito");
    for (let c = 0; c < img.length; c++) {
      img[c].style.zIndex = "0";
    }
    let img2 = document.querySelectorAll(".btn-carrito");
    for (let c = 0; c < img2.length; c++) {
      img2[c].style.zIndex = "0";
    }
  });
// <-- END FUNCIONAMIENTO DEL MODAL

// INSERTAR PRODUCTO EN LOCAL -->
function agregarProducto() {
  document
    .querySelector("#btn-insertar-producto")
    .addEventListener("click", function (event) {
      event.preventDefault();
      alert("Producto insertado correctamente pá!");

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
        tipo: tipo,
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
}

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
              <p id="${photo.Nombre}A">${photo.Nombre} ${photo.Precio}</p>
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
      idProd = this.id;
      document.querySelector("#myModal").innerHTML = "";
      cargarModalProducto();
      eliminarProductos();
      let img = document.querySelectorAll(".boton-carrito");
      for (let c = 0; c < img.length; c++) {
        img[c].style.zIndex = "0";
      }
      let img2 = document.querySelectorAll(".btn-carrito");
      for (let c = 0; c < img2.length; c++) {
        img2[c].style.zIndex = "0";
      }
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
        <div id="div-select-productos">
                                <select class="select-tipo-productos">
                                    <option value="" selected hidden>Tipo:</option>
                                    <option value="comics">Comics</option>
                                    <option value="juegosMesa">Juegos de Mesa</option>
                                    <option value="juegosCartas">Juegos de Cartas</option>
                                    <option value="snacks">Snacks</option>
                                </select>
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
    let img = document.querySelectorAll(".boton-carrito");
    for (let c = 0; c < img.length; c++) {
      img[c].style.zIndex = "1";
    }
    let img2 = document.querySelectorAll(".btn-carrito");
    for (let c = 0; c < img2.length; c++) {
      img2[c].style.zIndex = "1";
    }
  };

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
      //location.reload();
      let img = document.querySelectorAll(".boton-carrito");
      for (let c = 0; c < img.length; c++) {
        img[c].style.zIndex = "1";
      }
      let img2 = document.querySelectorAll(".btn-carrito");
      for (let c = 0; c < img2.length; c++) {
        img2[c].style.zIndex = "1";
      }
    }
  };

  document
    .querySelector(".select-tipo-productos")
    .addEventListener("change", function (event) {
      event.preventDefault();
      tipo = this.value;
    });

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
        tipo: tipo,
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
      // document.querySelector("#galeria-productos").innerHTML = "";
      // cargarProductos();
      document.querySelector(`#${idProd}A`).innerHTML = `${nombre} ${precio}`;
      modal.style.display = "none";
      //location.reload();
    });
  document
    .querySelector("#btn-eliminar-producto")
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
        tipo: tipo,
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
      document.querySelector(`#${idProd}`).style.display = "none";

      modal.style.display = "none";
      //location.reload();
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
        <div id="div-select-productos">
                                <select class="select-tipo-productos">
                                    <option value="" selected hidden>Tipo:</option>
                                    <option value="comics">Comics</option>
                                    <option value="juegosMesa">Juegos de Mesa</option>
                                    <option value="juegosCartas">Juegos de Cartas</option>
                                    <option value="snacks">Snacks</option>
                                </select>
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

      document.querySelector(".select-tipo-productos").value = `${res[0].Tipo}`;
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
      finalizarPedido();
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
      finalizarPedido();
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
function cargarCesta() {
  let arrayProductos = [];
  arrayProductosLocal = sessionStorage.getItem("arrayProductos");
  arrayProductosLocalParseada = JSON.parse(arrayProductosLocal);
  console.log(arrayProductosLocalParseada);
  arrayProductos = arrayProductosLocalParseada;
  let num2 = 0;

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
    btn.className = "btn-borrar-cesta";
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
      alert(111);
      let arrayProductos2 = [];
      arrayProductosLocal = sessionStorage.getItem("arrayProductos");
      arrayProductosLocalParseada = JSON.parse(arrayProductosLocal);
      console.log(arrayProductosLocalParseada);
      arrayProductos2 = arrayProductosLocalParseada;
      console.log(arrayProductos2);

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
        finalizarPedido();
      });
    });
}
function cambioTipo() {
  document
    .querySelector(".select-busqueda-tipos")
    .addEventListener("change", function (event) {
      event.preventDefault();
      if (this.value == "comics") {
        alert(1);
      } else if (this.value == "juegosMesa") {
        alert(2);
      } else if (this.value == "juegosCartas") {
        alert(3);
      } else if (this.value == "snacks") {
        alert(4);
      } else {
        alert(0);
      }
    });
}
function cambioTipoProducto() {
  document
    .querySelector(".select-tipo-productos")
    .addEventListener("change", function (event) {
      event.preventDefault();
      tipo = this.value;
      alert(tipo);
    });
}
cambioTipo();
