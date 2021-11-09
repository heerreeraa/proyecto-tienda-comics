// Get the modal
var modal = document.querySelector("#myModal");

// Get the button that opens the modal
var btn = document.querySelector("#btn-Agregar");

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
  .querySelector("#btn-Agregar")
  .addEventListener("click", function (event) {
    event.preventDefault();
    modal.style.display = "block";
  });
document
  .querySelector("#btn-insertar")
  .addEventListener("click", function (event) {
    event.preventDefault();
    alert("Insertado pa");

    let nombre = document.querySelector("input[name='nombre']").value;
    let apellido = document.querySelector("input[name='apellido']").value;
    let dni = document.querySelector("input[name='dni']").value;
    let tel = document.querySelector("input[name='tel']").value;

    let cliente = {
      nombre: nombre,
      apellido: apellido,
      dni: dni,
      tel: tel,
    };
    console.log(cliente);
    let body = JSON.stringify(cliente);

    fetch("/clientes/", {
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
function cargarClientes() {
  fetch("/clientes/", {
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
        item.id = `${photo.DNI}`;
        item.classList.add("item");

        item.innerHTML = `
          <a target="_blank">
            <p>${photo.Nombre}</p>
            <img class="img-zoom" src="./styles/user.jpg">
          </a>
          `;
        document.querySelector(".gallery").appendChild(item);
      });
      generarModalClient();
    });
}
function generarModalClient() {
  document.querySelectorAll(".item").forEach(function (el) {
    el.addEventListener("click", function () {
      alert(this.id);
      modal.style.display = "block";
      cargarModal(this.id);
      document.querySelector("#myModal").innerHTML = "";
      cargarModalCliente();
    });
  });
}

function cargarModalCliente() {
  const item = document.createElement("div");
  item.className = `modal-content`;

  item.innerHTML = `
  <div class="modal-content">
  <div id="div-btn-cerrar">
      <span class="close">&times;</span>
  </div>
  <div id="content-modal">
      <div class="div-modal1">
          <div>
              <form>
                  <label>DNI</label>
                  <input id="inp-dni" type="text" name="dni" />
              </form>
          </div>
          <div>
              <form>
                  <label>Nombre</label>
                  <input type="text" name="nombre" />
              </form>
          </div>
      </div>
      <div class="div-modal2">
          <div>
              <form>
                  <label>Apellido</label>
                  <input type="text" name="apellido" />
              </form>
          </div>
          <div>
              <form>
                  <label>Telefono</label>
                  <input type="text" name="tel" />
              </form>
          </div>
      </div>
  </div>
  <div class="div-insert">
      <button id="btn-modificar">MODIFICAR</button>
      <button id="btn-eliminar">ELIMINAR</button>
  </div>
</div>
    `;
  document.querySelector("#myModal").appendChild(item);
}

function cargarModal(dni) {
  let cliente = {
    dni: dni,
  };
  console.log(cliente);
  let body = JSON.stringify(cliente);

  fetch("/clientes/buscarDni", {
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
      document.querySelector("input[name='nombre']").value = `${res[0].Nombre}`;
      document.querySelector(
        "input[name='apellido']"
      ).value = `${res[0].Apellido}`;
      document.querySelector("input[name='dni']").value = `${res[0].DNI}`;
      document.querySelector("input[name='tel']").value = `${res[0].Telefono}`;
    });
}
cargarClientes();
