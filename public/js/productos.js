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