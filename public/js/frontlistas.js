function cargarClientesSelect() {
    fetch("/listas/", {
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
  
        res.forEach((sel) => {
          const item = document.createElement("option");
          item.id = `${sel.Nombre}`;
          item.classList.add("option-cliente");
  
          item.innerHTML = `${sel.Nombre}`;
          document.querySelector(".select-usuario-ventas").appendChild(item);
        });
        generarModalClient();
      });
  }