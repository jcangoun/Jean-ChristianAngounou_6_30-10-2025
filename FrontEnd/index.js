// import "./modale.js"; pret a l emploi

// import { xModale } from "./modale.js";

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
    const portfolioSection = document.getElementById("portfolio");

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
    h2.appendChild(h2Btn);

    h2Btn.addEventListener("click", () => {
      // ///////////////////////   LA PARTIE MODALE POTENTIELLEMENT non IMPORTABLE  ///////////////////////////////////////////////////////////////
      // xModale(gallery);

      const laModale = document.createElement("aside");
      laModale.id = "laModale";
      laModale.setAttribute("aria-hidden", "false");

      portfolio.insertBefore(laModale, gallery);
      // laModale est collée au PORTFOLIO ci dessus
      const overlay = document.querySelector("#laModale");
      console.log(overlay);
      overlay.addEventListener("click", (event) => {
        if (event.target === overlay) {
          closeModale();
        }
      });

      const modaleWrap = document.createElement("div");
      modaleWrap.classList.add("modaleWrap");

      laModale.appendChild(modaleWrap);

      // MODALEWRAP STYLE ci dessous de la modale wrap qui est la boite blanche de la modale
      modaleWrap.style.backgroundColor = "white";
      modaleWrap.style.width = "630px";
      // ci dessous maxheight pourrait plus tard redevenir
      //  just height quand on aura mis les images

      modaleWrap.style.maxHeight = "688px";
      modaleWrap.style.display = "flex";
      modaleWrap.style.flexDirection = "column";
      // modaleWrap.style.padding = "30px";

      const h2InModale = document.createElement("h2");
      h2InModale.classList.add("ss-titre-modale");
      modaleWrap.appendChild(h2InModale);
      console.log(modaleWrap);

      h2InModale.textContent = "Galerie photo";
      h2InModale.setAttribute("id", "galerie-photo");
      // h2InModale.id = "galerie-photo";

      // h2InModale STYLE ci dessous
      h2InModale.style.color = "black";
      h2InModale.style.fontFamily = "work sans, sans-serif";
      h2InModale.style.fontWeight = "400";
      h2InModale.style.fontSize = "26px";
      h2InModale.style.letterSpacing = "0";
      // h2InModale.style.padding =  "30px";

      // la closeModale
      const closeButton = document.createElement("button");
      closeButton.style.display = "flex";
      closeButton.style.justifyContent = "end";
      closeButton.style.backgroundColor = "transparent";
      closeButton.style.border = "none";
      closeButton.style.fontSize = "24px";
      closeButton.style.cursor = "pointer";
      closeButton.style.padding = "30px";

      const iconeCloseBtn = document.createElement("i");
      iconeCloseBtn.classList.add("fa-solid", "fa-xmark");
      closeButton.prepend(iconeCloseBtn);

      modaleWrap.insertBefore(closeButton, h2InModale);
      closeButton.addEventListener("click", closeModale);

      function closeModale() {
        laModale.remove();
        laModale.style.display = "none";
      }
      //  Fin closeModale

      const figureModalPhoto = document.createElement("figure");
      figureModalPhoto.classList.add("figureAddModalPhoto");

      async function fetchWorks() {
        try {
          const response = await fetch("http://localhost:5678/api/works");
          const data = await response.json();
          console.log(data);
          data.forEach((lesOeuvres) => {
            console.log("lesoeuvres", lesOeuvres);
            const modaleGallery = document.createElement("div");
            modaleGallery.classList.add("modaleGallery");

            // ci dessous a rectifier c est plutot au lieu de modaleGallery c est figureModalId
            modaleGallery.setAttribute("id", `figureModalId-${lesOeuvres.id}`);
            modaleGallery.classList.add("figure-modal-photo");

            modaleGallery.textContent = "ici la galerie de la modale";
            console.log(`fraéncisation, ${JSON.stringify(lesOeuvres)}`);

            
            modaleGallery.innerHTML =
               `
            <img class="img-modal-add-photo" <img src="${lesOeuvres.imageUrl}" id="${lesOeuvres.id}" alt="${lesOeuvres.title}">
          `;

// PHOTOS TEMPORAIRE4MENT MUTéS

            // modaleWrap.insertBefore(modaleGallery, wrapFooter);

            const classAjtPhto = document.querySelector(".img-modal-add-photo");
            classAjtPhto.style.width = "100px";
            classAjtPhto.style.display = "flex";
            classAjtPhto.style.justifyContent = "center";
            classAjtPhto.style.alignItems = "center";

            classAjtPhto.style.backgroundColor = "red";
            classAjtPhto.style.border = "1px solid red";

            const poubellerHpoto = document.createElement("div");
            poubellerHpoto.classList.add("poubellePhoto");
            poubellerHpoto.style.position = "absolute";


            
            figureModalPhoto.border = "1px solid red";
            figureModalPhoto.classList.add("figureModalPhoto");
            modaleGallery.appendChild(figureModalPhoto);

            // work(lesOeuvres);
            // fetchWorks(lesOeuvres);
          });
        } catch (error) {
          console.log(error);
        }
      }
      fetchWorks();
      console.log(works());
      
      // Section de presentation photos

      const figureModale = document.createElement("figure");
      figureModale.setAttribute("id", "figureModaleId");
      figureModale.style.display = "flex";
      figureModale.style.justifyContent = "center";
      figureModale.style.alignItems = "center";
      figureModale.style.border = "1px solid red";
      console.log(figureModale);
      figureModale.textContent = "ici la figure de la modale";
      
      // Cette insertion de figureModl ci dessus, marchera seulement plus tard en bas de btnAjouterPhoto
      // là ou on a crée et LIé le "wrapfooter", 
      //  car avant le boutton n existe pas et donc le wrapFooter non plus et donc l insertion de figureModale ne marchera pas avant, 
 
      fetch("http://localhost:5678/api/works")
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        });
        
        // figureModale.innerHTML = `${}`;
        // figureModale.innerHTML = 
        // `<div>
          // <div class="afficheIMG"></div>
          // <div>
              //<i class="fa-regular fa-image"></i> 
          // </div>
        
        // `;
      const imgModale = document.createElement("img");
      figureModale.appendChild(imgModale);
      imgModale.src = "assets/icons/instagram.png";
      imgModale.alt = "image à ajouter";






      // fin presentation photos

      const wrapFooter = document.createElement("div");
      wrapFooter.setAttribute("id", "wrapFooter");
      wrapFooter.style.display = "flex";
      wrapFooter.style.flexDirection = "column";
      wrapFooter.style.justifyContent = "center";
      wrapFooter.style.alignItems = "center";
      modaleWrap.appendChild(wrapFooter);

      const separtnLigne = document.createElement("hr");
      wrapFooter.appendChild(separtnLigne);
      separtnLigne.classList.add("spar-line");
      separtnLigne.style.display = "flex";
      separtnLigne.style.width = "420px";
      separtnLigne.style.border = "1px solid #B3B3B3";
      separtnLigne.style.margin = "10px 0";

      const btnAjouterPhoto = document.createElement("button");
      // btnAjouterPhoto.classList.add("button", "btnAjouterPhoto");
      btnAjouterPhoto.classList.add("button");
      btnAjouterPhoto.classList.add("btnAjouterPhoto");
      btnAjouterPhoto.textContent = "Ajouter une photo";
      btnAjouterPhoto.style.backgroundColor = "#1D6154";
      btnAjouterPhoto.style.color = "white";
      btnAjouterPhoto.style.border = "none";
      btnAjouterPhoto.style.margin = "30px";
      btnAjouterPhoto.style.borderRadius = "50px";
      btnAjouterPhoto.style.padding = "12px 24px";
      btnAjouterPhoto.style.fontSize = "16px";
      btnAjouterPhoto.style.width = "236px";
      btnAjouterPhoto.style.cursor = "pointer";
      wrapFooter.appendChild(btnAjouterPhoto);

      btnAjouterPhoto.addEventListener("click", () => {
        console.log("tu as clique ca A ajoute une photo");
        modaleWrap.style.display = "none";

        function openModaleAjouterPhoto() {
          // Créer une nouvelle modale pour ajouter une photo
          const modaleAjouterPhoto = document.createElement("div");
          modaleAjouterPhoto.id = "modaleAjouterPhoto";
          modaleAjouterPhoto.setAttribute("aria-hidden", "false");
          modaleAjouterPhoto.classList.add("modaleAjouterPhotoWrap");
          laModale.appendChild(modaleAjouterPhoto);

          // la modale d ajouts photos
          modaleAjouterPhoto.style.backgroundColor = "white";
          modaleAjouterPhoto.style.width = "630px";
          modaleAjouterPhoto.style.maxHeight = "688px";
          modaleAjouterPhoto.style.display = "flex";
          modaleAjouterPhoto.style.flexDirection = "column";
          // modaleAjouterPhoto.style.alignItems = "center";
          modaleAjouterPhoto.style.justifyContent = "center";

          // header ds ajtmodelaPhoto
          const headerAjouterPhoto = document.createElement("header");
          headerAjouterPhoto.classList.add("headerAjouterPhoto");
          headerAjouterPhoto.style.display = "flex";
          headerAjouterPhoto.style.margin = "0";
          // headerAjouterPhoto.style.alignItems = "center";
          modaleAjouterPhoto.appendChild(headerAjouterPhoto);

          // headerAjouterPhoto.textContent = "le header de la modale d ajout de photo";

          // Fleche Retour
          const arrowButton = document.createElement("button");
          arrowButton.style.display = "flex";
          // arrowButton.style.justifyContent = "start";
          arrowButton.style.margin = "30px";

          arrowButton.style.backgroundColor = "transparent";
          arrowButton.style.border = "none";
          arrowButton.style.cursor = "pointer";

          const leftArrowModalAjtPhoto = document.createElement("i");
          leftArrowModalAjtPhoto.classList.add("fa-solid", "fa-arrow-left");
          leftArrowModalAjtPhoto.style.fontSize = "21px";
          leftArrowModalAjtPhoto.style.cursor = "pointer";
          arrowButton.prepend(leftArrowModalAjtPhoto);
          //puis
          headerAjouterPhoto.prepend(arrowButton);
          leftArrowModalAjtPhoto.addEventListener("click", () => {
            modaleAjouterPhoto.style.display = "none";
            modaleWrap.style.display = "flex";
          });
          const closeModaleAjoutPhoto = document.createElement("button");
          closeModaleAjoutPhoto.style.display = "flex";
          closeModaleAjoutPhoto.style.justifyContent = "end";
          closeModaleAjoutPhoto.style.backgroundColor = "transparent";
          closeModaleAjoutPhoto.style.border = "none";
          closeModaleAjoutPhoto.style.fontSize = "24px";
          closeModaleAjoutPhoto.style.cursor = "pointer";
          closeModaleAjoutPhoto.style.padding = "30px";

          const iconeCloseBtnAjtPhoto = document.createElement("i");
          iconeCloseBtnAjtPhoto.classList.add("fa-solid", "fa-xmark");
          // Ci dessous appel complet du boutton de close
          closeModaleAjoutPhoto.prepend(iconeCloseBtnAjtPhoto);
          headerAjouterPhoto.appendChild(closeModaleAjoutPhoto);

          const mainAjouterPhoto = document.createElement("main");
          mainAjouterPhoto.classList.add("main-ajouter-photo");
          mainAjouterPhoto.style.display = "flex";
          mainAjouterPhoto.style.flexDirection = "column";
          mainAjouterPhoto.style.alignItems = "center";
          mainAjouterPhoto.style.justifyContent = "center";

          modaleAjouterPhoto.appendChild(mainAjouterPhoto);
          const h2AjoutPhoto = document.createElement("h2");
          h2AjoutPhoto.textContent = "Ajouter une photo";
          h2AjoutPhoto.style.color = "black";
          h2AjoutPhoto.style.fontFamily = "work sans, sans-serif";
          h2AjoutPhoto.style.fontWeight = "400";
          h2AjoutPhoto.style.fontSize = "26px";
          h2AjoutPhoto.style.letterSpacing = "0";

          mainAjouterPhoto.appendChild(h2AjoutPhoto);



          // ici la source photo de vide 

          const displayImage = document.createElement("div");
          displayImage.classList.add("display-image");
          displayImage.style.display = "flex";
          displayImage.style.padding = "10px 0";
          displayImage.style.flexDirection = "column";
          // imgAjtImage.style.flex = "100%";
          displayImage.style.justifyContent = "center";
         displayImage.style.alignItems = "center";
          
          displayImage.style.minWidth = "420px";
          displayImage.style.minHeight = "169px";
          displayImage.style.backgroundColor = "#E8F1F6";

          mainAjouterPhoto.appendChild(displayImage);

          const containDefIconeImage = document.createElement("span");
          containDefIconeImage.classList.add("contain-def-icone-image");
          containDefIconeImage.style.display = "flex";
          containDefIconeImage.style.justifyContent = "center";
          containDefIconeImage.style.alignItems = "center";
          containDefIconeImage.style.width = "100%";
          containDefIconeImage.style.height = "100%";
          const defaultIconeImage = document.createElement("i");
          defaultIconeImage.classList.add("fa-regular", "fa-image");
          defaultIconeImage.style.fontSize = "76px";
          defaultIconeImage.style.color = "#B3B3B3";

          // l affiche image adopte le containeur defaultimage
          displayImage.appendChild(containDefIconeImage);



          // le conteaineur d image à sdon tour adopte le defaultImage
          containDefIconeImage.appendChild(defaultIconeImage);

          const buttonAjouterPhoto = document.createElement("button");
          
          buttonAjouterPhoto.classList.add("button", "button-ajouter-Photo");
          buttonAjouterPhoto.textContent = "+ Ajouter Photo";
          buttonAjouterPhoto.style.fontFamily = "work sans, sans-serif";
          buttonAjouterPhoto.style.fontWeight = "medium";
          
          buttonAjouterPhoto.style.backgroundColor = "#CBD6DC";
          buttonAjouterPhoto.style.color = "#306685";
          buttonAjouterPhoto.style.border = "none";
          buttonAjouterPhoto.style.margin = "30px";
          buttonAjouterPhoto.style.borderRadius = "50px";
          buttonAjouterPhoto.style.padding = "12px 24px";
          buttonAjouterPhoto.style.fontSize = "16px";
          buttonAjouterPhoto.style.width = "236px";
          buttonAjouterPhoto.style.cursor = "pointer";
          
          displayImage.appendChild(buttonAjouterPhoto);
          buttonAjouterPhoto.addEventListener("click", () => {
            
            // const containDefIconeImage = document.querySelector(".contain-def-icone-image");
            // containDefIconeImage.style.display = "none";

            // const fileInput = document.createElement("input");
            // fileInput.type = "file";
            // fileInput.style.display = "flex";
            // fileInput.accept = "image/*";
            // document.body.appendChild(fileInput);

            addImage();

            const displayImage = document.querySelector(".display-image");
            displayImage.style.backgroundColor = "transparent";
           displayImage.style.justifyContent = "flex-start";
           displayImage.style.alignItems = "flex-start";
           displayImage.style.padding = "0";
           displayImage.style.minWidth = "0";
           

           const imgAjtImage = document.createElement("img");
           imgAjtImage.classList.add("img-ajt-image");
           imgAjtImage.style.width = "100%";
           imgAjtImage.style.height = "100%";
           imgAjtImage.style.objectFit = "cover";
           displayImage.appendChild(imgAjtImage);

           const fileInput = document.createElement("input");
           fileInput.type = "file";
           fileInput.style.display = "none";
           fileInput.accept = "image/*";
           
          //  const inputFile


          });


          function addImage() {
              
          };
          console.log("ca a ajoute une photo");
          const fileInput = document.createElement("input");
          fileInput.type = "file";
          fileInput.style.display = "flex";
          // ci dessous, fileInput.accept parceque sinon on peut ajouter n importe quel type de fichier et pas seulement des images,
          fileInput.accept = "image/*";

          document.body.appendChild(fileInput)



          // ici le groupe de champs du formulaire d ajout de photo,
          //  qui va plus tard append le groupe photo,  titre,   categorie et autres 

          const ChampTitrePhoto = document.createElement("div");
          ChampTitrePhoto.classList.add("champ-titre-photo");
          // ChampTitrePhoto.textContent = "le champ titre de la modale d ajout de photo";
          ChampTitrePhoto.style.display = "flex";
          ChampTitrePhoto.style.flexDirection = "column";
          ChampTitrePhoto.style.padding = "15px";
          // ChampTitrePhoto.style.alignItems = "center";

          mainAjouterPhoto.appendChild(ChampTitrePhoto);



          const labelTitrePhoto = document.createElement("label");
          labelTitrePhoto.setAttribute("for", "titrePhoto");
          labelTitrePhoto.textContent = "Titre";
          labelTitrePhoto.style.fontWeight = "500";
          labelTitrePhoto.fontFamily = "work sans, sans-serif";
          labelTitrePhoto.fontSize = "14px";
          labelTitrePhoto.fontWeight = "500";

          ChampTitrePhoto.appendChild(labelTitrePhoto);
          const inputTitrePhoto = document.createElement("input");
          inputTitrePhoto.type = "text";
          inputTitrePhoto.id = "titre";
          inputTitrePhoto.name = "titre";
          inputTitrePhoto.style.border = "none";
          inputTitrePhoto.style.height = "51px";
          inputTitrePhoto.style.width = "420px";
          inputTitrePhoto.style.boxShadow = "0px 4px 14px 0px rgba(0, 0, 255, 0.09)";    

          ChampTitrePhoto.appendChild(inputTitrePhoto);

          const champCategoriePhoto = document.createElement("div");
          champCategoriePhoto.classList.add("champ-categorie-photo");
          champCategoriePhoto.style.display = "flex";
          champCategoriePhoto.style.flexDirection = "column";
          // champCategoriePhoto.style.alignItems = "center";
          champCategoriePhoto.style.padding = "15px";
          const labelCategoriePhoto = document.createElement("label");

          labelCategoriePhoto.setAttribute("for", "categoriePhoto");
          labelCategoriePhoto.textContent = "Catégorie";
          labelCategoriePhoto.fontFamily = "work sans, sans-serif";
          labelCategoriePhoto.fontSize = "14px";
          labelCategoriePhoto.fontWeight = "500";
          mainAjouterPhoto.appendChild(champCategoriePhoto);
          // Et ensuite alors
          champCategoriePhoto.appendChild(labelCategoriePhoto);

          const inputTextCategoriePhoto = document.createElement("input");
          inputTextCategoriePhoto.type = "text";
          inputTextCategoriePhoto.id = "categorie";
          inputTextCategoriePhoto.name = "categorie";
          inputTextCategoriePhoto.style.border = "none";
          inputTextCategoriePhoto.style.height = "51px";
          inputTextCategoriePhoto.style.width = "420px";
          inputTextCategoriePhoto.style.boxShadow = "0px 4px 14px 0px rgba(0, 0, 255, 0.09)";
          champCategoriePhoto.appendChild(inputTextCategoriePhoto);



          // lign separ de madal AJout
          const modalSeparLine = document.createElement("hr");
          modalSeparLine.classList.add("spar-line");
          // proprietes en doublons la simplifier plus tard avec separlign
          modalSeparLine.classList.add("spar-line");
          modalSeparLine.style.display = "flex";
          modalSeparLine.style.width = "80%";
          modalSeparLine.style.border = "1px solid #B3B3B3";
          modalSeparLine.style.margin = "10px0";


          mainAjouterPhoto.appendChild(modalSeparLine);


          const modalAjoutBtn = document.createElement("button");
          modalAjoutBtn.classList.add("button");
          modalAjoutBtn.classList.add("modalAjoutBtn");
          modalAjoutBtn.textContent = "Ajouter";

          // Proprietes bouton ci dessus en doublon, 
          // les factoriser plus tard grace au css en un seul code
          modalAjoutBtn.style.backgroundColor = "#A7A7A7";
          modalAjoutBtn.style.color = "white";
          modalAjoutBtn.style.border = "none";
          modalAjoutBtn.style.margin = "30px";
          modalAjoutBtn.style.borderRadius = "50px";
          modalAjoutBtn.style.padding = "12px 24px";
          modalAjoutBtn.style.fontSize = "16px";
          modalAjoutBtn.style.width = "236px";
          modalAjoutBtn.style.cursor = "pointer";
          modalAjoutBtn.textContent = "Valider";
          mainAjouterPhoto.appendChild(modalAjoutBtn);

        }
        openModaleAjouterPhoto();
      });

      // je crée tout en bas ici l insertion de de figrModal parceque plus haut a sa bonne place,
      //  sous, " FIGUREMODALE.STYLE.BORDER = 1px solid red",
      //  le boutoon n existe pas encore
      // cela donc n aurait pas fonctionné avant,
      //  alors que là il fonctionnera car le boutton est créé et lié a son wrapFooter
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
