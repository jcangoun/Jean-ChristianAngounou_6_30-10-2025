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
    const seconHeader = document.getElementById("h2");
    seconHeader.id = "secondHeader";

    // const btnModifier = document.createElement("button");
    // btnModifier.id = "btnModifiermodifierProjets";
    // btnModifier.innerText = "Modifier";
    // portfolioSection.prepend(btnModifier);

    btnModifier.style.display = "block";

    portfolioSection.prepend(containerOfSecdHeader);

    // fetch("https://api.exemple.com/data")
    // .then(response => response.json()) // convertir la réponse en JSON
    // .then(data => {
    //     console.log(data); // ici tu récupères tes données
    // })
    // .catch(error => {
    //     console.error("Erreur :", error);
    // });

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
