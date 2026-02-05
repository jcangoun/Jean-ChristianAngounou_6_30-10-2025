document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  const btnModifier = document.getElementById("btnModifier");

  // mutage portfolio inutil probably
  // const portfolio = document.getElementById("portfolio");

  const filters = document.createElement("div");
  filters.classList.add("filters");

  const gallery = document.querySelector(".gallery");
  // console.log("Token bon:", token);

  const loginConnection = document.getElementById("loginConnection");
  console.log(loginConnection);
  if (token) {
    // Ici, si j ai le token je crée la banniere d édition
    const banniere = document.createElement("div");
    banniere.id = "banniereEdition";
    banniere.innerHTML = `
        <div id="banniere">
        	<span id="modifierBanniere">
		        <i class="fa-solid fa-pen-to-square"></i>
	        </span>
            <button id="texteBanniere">Mode édition</button>
        </div>    
        `;
    document.body.prepend(banniere);
    const texteBanniere = document.getElementById("texteBanniere");
    const modifierBanniere = document.querySelector("#modifierBanniere i");

    texteBanniere.style.color = "white";
    texteBanniere.style.backgroundColor = "black";
    texteBanniere.style.border = "none";
    texteBanniere.style.fontWeight = "light";
    texteBanniere.style.fontSize = "16px";

    modifierBanniere.style.color = "white";
    modifierBanniere.style.fontSize = "18px";
    modifierBanniere.style.marginRight = "8px";

    // Creation de la section portfolio .. ezst ce utile ? ci dessous .
    // const portfolioSection = document.getElementById("portfolio");

    const containerOfSecdHeader = document.createElement("div");
    containerOfSecdHeader.id = "containerOfSecdHeader";
    console.log(containerOfSecdHeader);

    // Je crée le bouton enfant de h2 dont l id sera btnModifier
    const h2Btn = document.createElement("button");
    //  important la variable qui est bouton prend la variable btnModifier qui est son  id
    h2Btn.id = "btModifier";
    const iconeModifier = document.createElement("i");
    iconeModifier.classList.add("fa-solid", "fa-pen-to-square");
    h2Btn.innerText = " Modifier";
    // liaison de iconeModifier a son bouton modifier ci dessous puis h2Btn new name pour appelation now
    h2Btn.prepend(iconeModifier);
    h2Btn.style.background = "transparent";
    h2Btn.style.border = "none";

    iconeModifier.style.color = "#000000";
    iconeModifier.style.fontWeight = 400;
    iconeModifier.style.fontSize = "16px";
    iconeModifier.style.margin = "8px";

    //on na plus que un h2//
    const h2 = document.querySelector("#portfolio > h2");
    h2.id = "h2Projet";
    h2.style.display = "flex";
    h2.style.alignItems = "center";
    h2.style.justifyContent = "center";

    h2.appendChild(h2Btn);

    // // Creation des boutons de filtre
    // const boutonDeFiltre = document.createElement("div");
    // boutonDeFiltre.id = "containersBoutons";
    // boutonDeFiltre.style.display = "flex";
    // boutonDeFiltre.style.justifyContent = "center";
    // boutonDeFiltre.style.margin = "30px";

    // const sophieGallery = document.querySelector("#portfolio .gallery");

    // portfolio.insertBefore(boutonDeFiltre, sophieGallery);
    // console.log(boutonDeFiltre);

    // const btnAll = document.createElement("button");
    // btnAll.classList.add("btn-filter", "btn-active");
    // // Je crée le style du bouton all
    // btnAll.style.fontFamily = "Syne";
    // btnAll.style.border = "1px solid #1D6154";
    // btnAll.style.color = "#1D6154";
    // btnAll.style.borderRadius = "60px";
    // btnAll.style.padding = "8px 16px";
    // btnAll.style.margin = "5px";

    // btnAll.dataset.filter = "all";
    // btnAll.textContent = "Tous";
    // boutonDeFiltre.appendChild(btnAll);

    // const btnObjets = document.createElement("button");
    // btnObjets.classList.add("btn-filter");
    // // Je crée le style du bouton Objets
    // btnObjets.style.fontFamily = "Syne";
    // btnObjets.style.border = "1px solid #1D6154";
    // btnObjets.style.color = "#1D6154";
    // btnObjets.style.borderRadius = "60px";
    // btnObjets.style.padding = "8px 16px";
    // btnObjets.style.margin = "5px";

    // btnObjets.dataset.filter = "objets";
    // btnObjets.textContent = "Objets";
    // boutonDeFiltre.appendChild(btnObjets);

    // const btnAppartements = document.createElement("button");
    // btnAppartements.classList.add("btn-filter");
    // // Je crée le style du bouton Appartements
    // btnAppartements.style.fontFamily = "Syne";
    // btnAppartements.style.border = "1px solid #1D6154";
    // btnAppartements.style.color = "#1D6154";
    // btnAppartements.style.borderRadius = "60px";
    // btnAppartements.style.padding = "8px 16px";
    // btnAppartements.style.margin = "5px";

    // btnAppartements.dataset.filter = "appartements";

    // btnAppartements.textContent = "Appartements";
    // boutonDeFiltre.appendChild(btnAppartements);

    //     const btnHotelsRestaurants = document.createElement("button");
    // btnHotelsRestaurants.classList.add("btn-filter");
    // // Je crée le style du bouton HotelsRestaurants
    // btnHotelsRestaurants.style.fontFamily = "Syne";
    // btnHotelsRestaurants.style.border = "1px solid #1D6154";
    // btnHotelsRestaurants.style.color = "#1D6154";
    // btnHotelsRestaurants.style.borderRadius = "60px";
    // btnHotelsRestaurants.style.padding = "8px 16px";
    // btnHotelsRestaurants.style.margin = "5px";

    // btnHotelsRestaurants.dataset.filter = "HotelsRestaurants";

    // btnHotelsRestaurants.textContent = "Hotels & Restaurants";
    // boutonDeFiltre.appendChild(btnHotelsRestaurants);

    loginConnection.textContent = "logout";
    loginConnection.addEventListener("click", () => {
      logout();
    });
  } else {
    // quand connecté pas de boutons de filtres

    loginConnection.textContent = "login";
    loginConnection.addEventListener("click", () => {
      window.location.href = "./login.html";
    });

    // On met en premiere place enfant dans le porfolio le filtre juste avant gallery
    portfolio.insertBefore(filters, gallery);

    createFilters("button", ["filter-btn", "active"], "Tous");
    fetch("http://localhost:5678/api/categories")
      .then((response) => response.json())
      .then((categories) => {
        categories.forEach((category) => {
          createFilters("button", ["filter-btn"], category.name);
        });

        // // Creation des boutons de filtre
        const boutonDeFiltre = document.getElementsByClassName("filters")[0];
        boutonDeFiltre.id = "containersBoutons";
        boutonDeFiltre.style.display = "flex";
        boutonDeFiltre.style.justifyContent = "center";
        boutonDeFiltre.style.margin = "30px";

        const sophieGallery = document.querySelector("#portfolio .gallery");

        portfolio.insertBefore(boutonDeFiltre, sophieGallery);
        console.log(boutonDeFiltre);


        const btnHotelsRestaurants = document.getElementsByClassName("filter-btn")[3];
    // Je crée le style du 4e et dernier bouton,  HotelsRestaurants
    btnHotelsRestaurants.style.fontFamily = "Syne";
    btnHotelsRestaurants.style.border = "1px solid #1D6154";
    btnHotelsRestaurants.style.color = "#1D6154";
    btnHotelsRestaurants.style.borderRadius = "60px";
    btnHotelsRestaurants.style.padding = "8px 16px";
    btnHotelsRestaurants.style.margin = "5px";

    btnHotelsRestaurants.dataset.filter = "HotelsRestaurants";

    btnHotelsRestaurants.textContent = "Hotels & Restaurants";
    boutonDeFiltre.appendChild(btnHotelsRestaurants);


        const btnAppartements = document.getElementsByClassName("filter-btn")[2];
    // btnAppartements.classList.add("btn-filter");
    // Je crée le style du bouton Appartements
    btnAppartements.style.fontFamily = "Syne";
    btnAppartements.style.border = "1px solid #1D6154";
    btnAppartements.style.color = "#1D6154";
    btnAppartements.style.borderRadius = "60px";
    btnAppartements.style.padding = "8px 16px";
    btnAppartements.style.margin = "5px";

    btnAppartements.dataset.filter = "appartements";

    btnAppartements.textContent = "Appartements";
    boutonDeFiltre.prepend(btnAppartements);


        const btnObjets = document.getElementsByClassName("filter-btn")[2];
    btnObjets.classList.add("btn-filter");
    // Je crée le style du bouton Objets
    btnObjets.style.fontFamily = "Syne";
    btnObjets.style.border = "1px solid #1D6154";
    btnObjets.style.color = "#1D6154";
    btnObjets.style.borderRadius = "60px";
    btnObjets.style.padding = "8px 16px";
    btnObjets.style.margin = "5px";

    btnObjets.dataset.filter = "objets";
    btnObjets.textContent = "Objets";
    boutonDeFiltre.prepend(btnObjets)



        const btnAll = document.getElementsByClassName("filter-btn")[2];
    btnAll.classList.add("btn-filter", "btn-active");
    // Je crée le style du bouton all
    btnAll.style.fontFamily = "Syne";
    btnAll.style.border = "1px solid #1D6154";
    btnAll.style.color = "#1D6154";
    btnAll.style.borderRadius = "60px";
    btnAll.style.padding = "8px 16px";
    btnAll.style.margin = "5px";

    btnAll.dataset.filter = "all";
    btnAll.textContent = "Tous";
    boutonDeFiltre.prepend(btnAll);

      })
      .catch((error) => {
        console.error("Erreur :", error);
      });
  }

  function logout() {
    localStorage.removeItem("token");
    window.location.href = "./index.html";
    loginConnection.href = "./login.html";
  }
});

const gallery = document.querySelector(".gallery");

function createFilters(tag, classes = [], content) {
  const filters = document.querySelector(".filters");

  const filter = document.createElement(tag);
  classes.forEach((classe) => filter.classList.add(classe));
  filter.textContent = content;
  filters.appendChild(filter);
}
async function works() {
  try {
    const response = await fetch("http://localhost:5678/api/works");
    const data = await response.json();
    console.log(data);
    data.forEach((data) => {
      work(data);
    });
  } catch (error) {
    console.log(error);
  }
}
works();
function work(data) {
  const figure = document.createElement("figure");
  const img = document.createElement("img");
  img.src = data.imageUrl;
  img.alt = data.title;

  figure.dataset.categoryId = data.categoryId;

  const figcaption = document.createElement("figcaption");
  figcaption.textContent = data.title;
  figure.appendChild(img);
  figure.appendChild(figcaption);
  gallery.appendChild(figure);
}
