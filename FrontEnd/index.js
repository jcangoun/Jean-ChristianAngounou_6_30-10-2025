// import "./modale.js";

document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  const btnModifier = document.getElementById("btnModifier");

  const filters = document.createElement("div");
  filters.classList.add("filters");

  const gallery = document.querySelector(".gallery");

  const loginConnection = document.getElementById("loginConnection");
  works();
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

    // Je crée le bouton enfant de h2 dont l id sera btnModifier
    const h2Btn = document.createElement("button");
    //  important la variable qui est bouton prend la variable btnModifier qui est son  id
    h2Btn.id = "btnModifier";
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

    h2Btn.addEventListener("mouseover", () => {
      h2Btn.style.color = "red";
    });
    h2Btn.addEventListener("mouseleave", () => {
      h2Btn.style.color = "black";
    });

    h2Btn.addEventListener("click", () => {
      // window.location.href = "./modal.html";

      const laModale = document.createElement("aside");
      laModale.setAttribute("aria-hidden", "true");
      laModale.id = "laModale";
      // proprietes styles ci dessous de la modale je vais finalement et "temporairement" faire du inner html .
      laModale.style.backgroundColor = "rgba(0, 0, 0, 0.4)";
      laModale.style.position = "fixed";
      laModale.style.inset = "0";
      
      laModale.style.display = "flex";
      laModale.style.justifyContent = "center";
      laModale.style.alignItems = "center";

      laModale.style.border = "1px solid black";
      laModale.style.padding = "0";
      laModale.style.margin = "0";

      portfolio.insertBefore(laModale, gallery);
      laModale.textContent = "coucou la modale";
      laModale.innerHTML = 
      `<div class="modalLeWrap">
        <h2>Galerie photo</h2>
      </div>`;

      
      
      // laModale.style.height = "688px";
      // laModale.style.width = "630px";

      // laModale.style.maxWidth = "calc(100vw- 20px)";
      // laModale.style.maxHeight = "calc(100vw- 20px)";

      h2InModale = document.createElement("h2");
      laModale.appendChild(h2InModale);
      h2InModale.textContent = "Galerie photo";
      h2InModale.style.display = "flex";
      h2InModale.style.justifyContent = "center";
      h2InModale.style.textAlign = "center";
      h2InModale.style.padding = "10px";
      h2InModale.style.margin = "0";

    });

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
          // console.log(createFilters)
        });
        handeuleuFilteur();
      })
      .catch((error) => {
        console.error("Erreur :", error);
      });
    btnModifier.addEventListener("click", () => {
      window.location.href = "./modal.html";
      console.log(btnModifier, "ca marche");
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

// Je crée le filtre qui permet d afficher le type choisI et
//  les styles d affichage du choix effectué

function handeuleuFilteur() {
  const filters = document.querySelectorAll("div.filters > button");
  console.log(filters);
  filters.forEach((filter, index) => {
    filter.addEventListener("click", () => {
      const activeFilter = document.querySelectorAll(".active");

      activeFilter.forEach((filter) => {
        filter.classList.remove("active");
      });
      filter.classList.add("active");
      const cards = document.querySelectorAll(".gallery figure");
      cards.forEach((card) => {
        if (index === 0) {
          card.style.display = "block";
        } else {
          if (parseInt(card.dataset.categoryId) == index) {
            card.style.display = "block";
          } else {
            card.style.display = "none";
          }
        }
      });
    });
  });
}
