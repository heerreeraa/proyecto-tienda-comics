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