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
  .querySelector("#btn-insertar-producto").addEventListener("click", function (event) {
    event.preventDefault();
    alert("Producto insertado correctamente pá!");

    let nombre = document.querySelector("input[name='nombre-producto']").value;
    let precio = document.querySelector("input[name='precio-producto']").value;

    let producto = {
      nombre: nombre,
      precio: precio
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
    fetch("/Productos/", {
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
          item.id = `${photo.nombre}`;
          item.classList.add("item");

          item.innerHTML = `
            <a target="_blank">
              <p>${photo.Nombre} ${photo.Precio}</p>
              <img class="img-zoom" src="./styles/comicDefault.png" style="width:300px; heigth:350px;">
            </a>
            `;
          document.querySelector(".gallery").appendChild(item);
        });
      });
  }
  cargarProductos();
// <-- MOSTRAR PRODUCTO INSERTADO

// GenerateHTML(productos) {
//     productos.forEach((producto) => {
//       let item = document.createElement("div");
//       item.className = "producto";
//       item.id = `producto${num}`;
//       let pro = document.createElement("producto");

//       pro.src = `${producto.producto_files[0].link} muted`;

//       let divpro = document.createElement("div");
//       divpro.id = `divpro${num}`;

//       let divBtn = document.createElement("div");
//       divBtn.id = `caja${num}`;

//       let btnFav = document.createElement("button");
//       btnFav.id = `btn${num}`;
//       btnFav.className = `btnClass`;

//       let imgFav = document.createElement("img");
//       imgFav.id = `${producto.producto_files[0].link}`;
//       imgFav.src = `imgs/star.png`;
//       imgFav.className = `false${num}`;
//       document.querySelector("#producto-container").appendChild(item);

//       // document.querySelector(`#producto${num}`).appendChild(divpro);
//       // document.querySelector(`#producto${num}`).appendChild(divBtn);

//       document.querySelector(`#producto${num}`).appendChild(btnFav);
//       document.querySelector(`#btn${num}`).appendChild(imgFav);
//       document.querySelector(`#producto${num}`).appendChild(pro);

//       num++;
//     });
   
//   }