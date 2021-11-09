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
              <img class="img-zoom" src="${photo.Imagen}" style="width:300px; heigth:300px;">
            </a>
            `;
        document.querySelector(".gallery").appendChild(item);
      });
      generarModalProduct();
    });
}
// <-- MOSTRAR PRODUCTO INSERTADO

// GENERAR MODAL EDITAR/ELIMINAR PRODUCTO -->
function generarModalProduct() {
  document.querySelectorAll(".item").forEach(function (el) {
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
    <button id="btn-modificar-producto">MODIFICAR</button>
    <button id="btn-eliminar-producto">ELIMINAR</button>    
    </div> 
    `;
  document.querySelector("#myModal").appendChild(item);

  var modal = document.querySelector("#myModal");
  var span = document.getElementsByClassName("close")[0];

  span.onclick = function () {
    modal.style.display = "none";
    location.reload();
  };

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
      location.reload();
    }
  };
  document
    .querySelector("#btn-modificar-producto")
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
      location.reload();
    });
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

cargarProductos();
