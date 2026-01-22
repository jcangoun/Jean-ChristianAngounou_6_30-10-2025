document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  const btnModifier = document.getElementById("btnModifier");
  const portfolio = document.getElementById("portfolio");

  const filters = document.createElement("div");
  filters.classList.add("filters");

  const gallery = document.querySelector(".gallery");

  // console.log("Token bon:", token);
  console.log(btnModifier);

  // if (token) {console.log("Utilisateur connecté");}
  // const modifBanniere = document.createElement("div");
  // modifBanniere.setAttribute("id", "banniere");
  // document.body.insertBefore(modifBanniere, document.body.firstChild);

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

    const portfolioSection = document.getElementById("portfolio");

    const containerOfSecdHeader = document.createElement("div");
    containerOfSecdHeader.id = "containerOfSecdHeader";
    const h2 = document.createElement("h2");
    h2.id = "h2";
    h2.textContent = "Mes Projets";
    h2.style.display = "flex";
    h2.style.alignItems = "center";
    h2.style.justifyContent = "center";

    const h2span = document.createElement("span");
    h2span.id = "btModifier";
    const iconeModifier = document.createElement("i");
    iconeModifier.classList.add("fa-solid", "fa-pen-to-square");
    h2span.innerText = " Modifier";    
    h2span.appendChild(iconeModifier);
    portfolioSectionprepend(containerOfSecdHeader);
    containerOfSecdHeader.appendChild(h2);
    h2.appendChild(h2span);


    iconeModifier.style.color = "#000000";
    iconeModifier.style.fontWeight = 400;
    iconeModifier.style.fontSize = "16px";
    iconeModifier.style.margin = "8px";

    //                       //
    const btnModifier = document.getElementById("btnModifier");

    btnModifier.style.display = "flex";
    btnModifier.style.justifyContent = "center";
    btnModifier.style.alignItems = "center";
    btnModifier.style.fontSize = "16px";
    btnModifier.style.fontFamily = "Work Sans";
    btnModifier.style.fontWeight = "400";
    btnModifier.style.color = "#000000";
    btnModifier.style.padding = "16px";




////////// Premiere partie du bug login log out a troiter apres ////////

    // const seconHeader = document.getElementById("h2");
    // seconHeader.id = "secondHeader";

////////// Premiere partie du bug login log out a troiter apres ////////

    // const btnModifier = document.createElement("button");
    // btnModifier.id = "btnModifiermodifierProjets";
    // btnModifier.innerText = "Modifier";
    // portfolioSection.prepend(btnModifier);

/////// deuxieme partie de bug du login log out //////

    btnModifier.style.display = "block";
    
    portfolioSection.prepend(containerOfSecdHeader);

/////// deuxieme partie de bug du login log out //////

    loginConnection.textContent = "logout";
    loginConnection.addEventListener("click", () => {
      logout();
    });
  } else {
    btnModifier.style.display = "none";
    loginConnection.textContent = "login";
    loginConnection.addEventListener("click", () => {
      window.location.href = "./login.html";
    });

    portfolio.insertBefore(filters, gallery);

    createFilters("button", ["filter-btn", "active"], "Tous");
    fetch("http://localhost:5678/api/categories")
      .then((response) => response.json())
      .then((categories) => {
        categories.forEach((category) => {
          createFilters("button", ["filter-btn"], category.name);
        });
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
