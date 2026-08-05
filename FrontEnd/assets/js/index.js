// import "./modale.js"; pret a l emploi

// import { xModale } from "./modale.js";

const token = localStorage.getItem("token");
document.addEventListener("DOMContentLoaded", () => {
  const btnModifier = document.getElementById("btnModifier");

  const filters = document.createElement("div");
  filters.classList.add("filters");
  filters.style.display = "flex";
  filters.style.justifyContent = "center";
  filters.style.margin = "38px";

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
      closeButton.classList.add("close-button");

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

      const figureModalPhoto = document.createElement("div");
      figureModalPhoto.classList.add("figure-modale-photo");
      figureModalPhoto.style.display = "flex";
      figureModalPhoto.style.justifyContent = "flex-start";
      figureModalPhoto.style.flexWrap = "wrap";
      figureModalPhoto.style.gap = "5px";
      figureModalPhoto.style.padding = "10px 80px";
      figureModalPhoto.style.margin = "24px";

      modaleWrap.appendChild(figureModalPhoto);

      async function fetchWorks() {
        try {
          const response = await fetch("http://localhost:5678/api/works");
          const data = await response.json();

          data.forEach((lesOeuvres) => {
            // FIGURE POUR CHAQUE PHOTO
            const figureGallery = document.createElement("figure");
            figureGallery.classList.add("figure-gallery", "figure-modale-photo");
            figureGallery.padding = "10px";
            figureGallery.style.position = "relative";
            figureGallery.style.display = "flex";
            figureGallery.style.justifyContent = "center";
            figureGallery.style.alignItems = "center";

            figureGallery.id = `figure-${lesOeuvres.id}`;

            // IMAGE
            const imgGallery = document.createElement("img");
            imgGallery.classList.add("img-modal-photo");
            imgGallery.src = lesOeuvres.imageUrl;
            imgGallery.alt = lesOeuvres.title;
            imgGallery.id = `img-${lesOeuvres.id}`;

            // AJOUT IMAGE DANS FIGURE
            figureGallery.appendChild(imgGallery);

            // AJOUT FIGURE DANS LE CONTENEUR
            figureModalPhoto.appendChild(figureGallery);

            // STYLE DE L’IMAGE
            imgGallery.style.width = "77px";
            imgGallery.style.height = "103px";
            // imgGallery.style.border = "1px solid red";
            imgGallery.style.display = "flex";

            // POUBELLE
            const poubellePhoto = document.createElement("div");

            const iconePoubelle = document.createElement("i");
            iconePoubelle.width = "9px";
            iconePoubelle.height = "10.30px";
            iconePoubelle.classList.add("fa-solid", "fa-trash-can");

            poubellePhoto.dataset.id = lesOeuvres.id;
            
            poubellePhoto.style.fontSize = "11px";
            poubellePhoto.style.width = "17px";
            poubellePhoto.style.height = "17px";
            poubellePhoto.style.backgroundColor = "#000000";
            iconePoubelle.style.color = "white";
            poubellePhoto.style.top = "-37px";
            poubellePhoto.style.right = "22px";

            poubellePhoto.appendChild(iconePoubelle);

            poubellePhoto.classList.add("poubellePhoto");
            poubellePhoto.style.display = "flex";
            poubellePhoto.style.justifyContent = "center";
            poubellePhoto.style.alignItems = "center";
            poubellePhoto.style.position = "relative";
            figureGallery.appendChild(poubellePhoto);

            // STYLE DU CONTENEUR GLOBAL

            poubellePhoto.addEventListener("click", () => {
              const id = poubellePhoto.dataset.id;
              delete1Work(id);
            });
          });
        } catch (error) {
          console.log(error);
        }
      }
      function delete1Work(id) {
        fetch(`http://localhost:5678/api/works/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => {
            if (response.ok) {
              // Supprimer l'élément du DOM
              const figure = document.querySelector(`[data-id="${id}"]`);
              if (figure) {
                figure.remove();
              }
            }
          })
          .catch((error) => {
            console.error("Erreur lors de la suppression de l'œuvre :", error);
          });
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
      btnAjouterPhoto.classList.add("enabled");
      btnAjouterPhoto.classList.add("button");
      btnAjouterPhoto.classList.add("btnAjouterPhoto");
      btnAjouterPhoto.textContent = "Ajouter une photo";
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
          modaleAjouterPhoto.style.display = "flex";
          modaleAjouterPhoto.style.flexDirection = "column";
          // modaleAjouterPhoto.style.alignItems = "center";
          modaleAjouterPhoto.style.justifyContent = "center";

          // modaleAjouterPhoto.style.maxHeight = "688px";

          // header ds ajtmodelaPhoto
          const headerAjouterPhoto = document.createElement("header");
          headerAjouterPhoto.classList.add("header-modale-ajouter-photo");
          modaleAjouterPhoto.appendChild(headerAjouterPhoto);

          // Fleche Retour
          const arrowButton = document.createElement("button");
          // arrowButton.classList.add("arrow-button");
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
          closeModaleAjoutPhoto.classList.add("close-button")
          closeModaleAjoutPhoto.style.display = "flex";
          closeModaleAjoutPhoto.style.justifyContent = "end";
          closeModaleAjoutPhoto.style.backgroundColor = "transparent";
          closeModaleAjoutPhoto.style.border = "none";
          closeModaleAjoutPhoto.style.fontSize = "24px";
          closeModaleAjoutPhoto.style.cursor = "pointer";
          closeModaleAjoutPhoto.style.padding = "25px";

          const iconeCloseBtnAjtPhoto = document.createElement("i");
          iconeCloseBtnAjtPhoto.classList.add("fa-solid", "fa-xmark");

          // maintenant ci dessous que le close est crée on peut alors faire un evenement
          // qui ferme la page
          const calqueModaleAjoutPhoto = document.getElementById("modaleAjoutPhoto");
          // console.log(calqueModaleAjoutPhoto + "ca fait");

          // Ci dessous appel complet du boutton de close
          closeModaleAjoutPhoto.prepend(iconeCloseBtnAjtPhoto);
          headerAjouterPhoto.appendChild(closeModaleAjoutPhoto);

          closeModaleAjoutPhoto.addEventListener("click", enleverCloseModaleAjoutPhoto);

          function enleverCloseModaleAjoutPhoto() {
            modaleAjouterPhoto.remove();
            laModale.remove();
            modaleAjouterPhoto.style.display = "none";
          }

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

          // le containeur d image à sdon tour adopte le defaultImage
          containDefIconeImage.appendChild(defaultIconeImage);

          const buttonAjouterPhoto = document.createElement("label");
          buttonAjouterPhoto.classList.add("label", "button-ajouter-Photo");
          buttonAjouterPhoto.style.fontFamily = "work sans, sans-serif";
          buttonAjouterPhoto.style.fontWeight = "medium";

          // buttonAjouterPhoto.textContent = "+ Ajouter Photo";
          const textButtonAjouterPhoto = document.createElement("span");
          textButtonAjouterPhoto.textContent = "+ Ajouter Photo";

          buttonAjouterPhoto.appendChild(textButtonAjouterPhoto);

          // ici on crée l input lie au label, qui va servir a chercher les photos
          const fileButtonInput = document.createElement("input");
          fileButtonInput.id = "fileButtonInput";
          buttonAjouterPhoto.setAttribute("for", "fileButtonInput");
          fileButtonInput.type = "file";
          fileButtonInput.style.display = "none";
          fileButtonInput.accept = "image/*";
          buttonAjouterPhoto.appendChild(fileButtonInput);

          fileButtonInput.addEventListener("change", function () {
            const file = this.files[0];
            if (file && file.type.startsWith("image/")) {
              const objectUrl = URL.createObjectURL(file);
              displayPhoto.src = objectUrl;
              defaultIconeImage.style.display = "none";
              displayPhoto.style.display = "flex";
              displayPhoto.style.width = "129px";
              displayPhoto.style.height = "193px";
              displayPhoto.style.objectFit = "cover";

              // A l ajout de l image on cache
              textButtonAjouterPhoto.style.display = "none";

              // preview.style.display = "flex";

              const buttonAjouterPhoto = document.querySelector(".button-ajouter-Photo");
              buttonAjouterPhoto.style.display = "flex";
              buttonAjouterPhoto.style.justifyContent = "center";
              buttonAjouterPhoto.style.alignItems = "center";
              buttonAjouterPhoto.style.margin = "0";
              buttonAjouterPhoto.style.padding = "0";
              buttonAjouterPhoto.style.width = "420px";
              // buttonAjouterPhoto.style.backgroundColor = "red";

              buttonAjouterPhoto.style.textContent = "";

              console.log("l image est bonne : " + file.name);

              inputTitrePhoto.title = inputTitrePhoto.title.value;
              inputTitrePhoto.categoryId = inputTitrePhoto.value;

              // Libérer la mémoire après chargement
              preview.onload = () => URL.revokeObjectURL(objectUrl);
            }
          });

          buttonAjouterPhoto.style.backgroundColor = "#CBD6DC";
          buttonAjouterPhoto.style.color = "#306685";
          buttonAjouterPhoto.style.border = "none";
          buttonAjouterPhoto.style.margin = "30px";
          // buttonAjouterPhoto.style.borderRadius = "50px";
          buttonAjouterPhoto.style.padding = "12px 24px";
          buttonAjouterPhoto.style.fontSize = "16px";
          // buttonAjouterPhoto.style.width = "236px";
          buttonAjouterPhoto.style.cursor = "pointer";

          displayImage.appendChild(buttonAjouterPhoto);

          const displayPhoto = document.createElement("img");
          displayPhoto.classList.add("display-photo");
          buttonAjouterPhoto.appendChild(displayPhoto);

          buttonAjouterPhoto.addEventListener("click", () => {
            const containDefIconeImage = document.querySelector(".contain-def-icone-image");
            containDefIconeImage.style.display = "none";

            // const fileInput = document.createElement("input");
            // fileInput.type = "file";
            // fileInput.style.display = "flex";
            // fileInput.accept = "image/*";
            // document.body.appendChild(fileInput);

            addImage();

            const displayImage = document.querySelector(".display-image");
            displayImage.style.backgroundColor = "transparent";
            displayImage.style.justifyContent = "center";
            displayImage.style.alignItems = "center";
            displayImage.style.padding = "0";
            displayImage.style.width = "420px";

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

          function addImage() {}
          console.log("ca peut ajouter une photo");
          const fileInput = document.createElement("input");
          fileInput.type = "file";
          fileInput.style.display = "flex";
          // ci dessous, fileInput.accept parceque sinon on peut ajouter n importe quel type de fichier et pas seulement des images,
          fileInput.accept = "image/*";

          document.body.appendChild(fileInput);

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
          labelTitrePhoto.style.padding = "10px 0";

          ChampTitrePhoto.appendChild(labelTitrePhoto);
          const inputTitrePhoto = document.createElement("input");
          inputTitrePhoto.classList.add("input-titre-photo");
          inputTitrePhoto.setAttribute("id", "titre");
          inputTitrePhoto.type = "text";
          inputTitrePhoto.placeholder = "Entrez le titre de la photo";
          inputTitrePhoto.id = "titre";
          inputTitrePhoto.name = "titre";
          inputTitrePhoto.style.border = "none";
          inputTitrePhoto.style.height = "51px";
          inputTitrePhoto.style.width = "420px";
          inputTitrePhoto.style.boxShadow = "0px 4px 14px 0px rgba(0, 0, 255, 0.09)";

          ChampTitrePhoto.appendChild(inputTitrePhoto);

          inputTitrePhoto.addEventListener("input", () => {

            const inputTitrePhoto = document.getElementById("titre");
            inputTitrePhoto.style.color = "orange";
            console.log("le titre de la photo est bonne : " + inputTitrePhoto.value);
            if (inputTitrePhoto.blur) {
              inputTitrePhoto.style.borderColor = "green";
              console.log("inputTitrePhoto1st est blur");
            } else {
              inputTitrePhoto.style.borderColor = "red";
              console.log("inputTitrePhoto1st PROBLEME");
            }
          });
            
          const champCategoriePhoto = document.createElement("div");
          champCategoriePhoto.classList.add("champ-categorie-photo");
          champCategoriePhoto.style.display = "flex";
          champCategoriePhoto.style.flexDirection = "column";
          // champCategoriePhoto.style.alignItems = "center";
          champCategoriePhoto.style.padding = "15px";
          const labelCategoriePhoto = document.createElement("label");

          labelCategoriePhoto.setAttribute("for", "categoriePhoto");
          labelCategoriePhoto.setAttribute("id", "categorie-photo");
          labelCategoriePhoto.textContent = "Catégorie";
          labelCategoriePhoto.fontFamily = "work sans, sans-serif";
          labelCategoriePhoto.fontSize = "14px";
          labelCategoriePhoto.fontWeight = "500";
          labelCategoriePhoto.style.padding = "10px 0";

          mainAjouterPhoto.appendChild(champCategoriePhoto);
          // Et ensuite alors
          champCategoriePhoto.appendChild(labelCategoriePhoto);

          const selectCategoriePhoto = document.createElement("select");

          // selectCategoriePhoto.type = "text";
          selectCategoriePhoto.id = "categorie";
          selectCategoriePhoto.name = "categorie";
          selectCategoriePhoto.style.border = "none";
          selectCategoriePhoto.style.height = "51px";
          selectCategoriePhoto.style.width = "420px";
          selectCategoriePhoto.style.boxShadow = "0px 4px 14px 0px rgba(0, 0, 255, 0.09)";

          champCategoriePhoto.appendChild(selectCategoriePhoto);

          const optionCategorieObjet = document.createElement("option");

          // optionCategorieObjet.value = "";
          // optionCategorieObjet.textContent = "Choisir une catégorie";
          const optionCategorieVide = document.createElement("option");
          optionCategorieVide.value = "";
          optionCategorieVide.textContent = "Choisir une catégorie";
          selectCategoriePhoto.appendChild(optionCategorieVide);

          optionCategorieObjet.value = "1";
          // optionCategorieObjet.name = "name";
          optionCategorieObjet.textContent = "Objets";

          const optionCategorieAppartements = document.createElement("option");
          optionCategorieAppartements.value = "2";
          // optionCategorieAppartements.name = "name";
          optionCategorieAppartements.textContent = "Appartements";

          const optionCategorieHotelsEtRestaurants = document.createElement("option");
          optionCategorieHotelsEtRestaurants.value = "3";
          // optionCategorieHotelsEtRestaurants.name = "name";
          optionCategorieHotelsEtRestaurants.textContent = "Hotels & Restaurants";

          selectCategoriePhoto.appendChild(optionCategorieObjet);
          selectCategoriePhoto.appendChild(optionCategorieAppartements);
          selectCategoriePhoto.appendChild(optionCategorieHotelsEtRestaurants);

          const typeOptionCategorieProjet = [];
          typeOptionCategorieProjet.push(optionCategorieVide);
          typeOptionCategorieProjet.push(optionCategorieObjet);
          typeOptionCategorieProjet.push(optionCategorieAppartements);
          typeOptionCategorieProjet.push(optionCategorieHotelsEtRestaurants);
          console.log(typeOptionCategorieProjet);

          selectCategoriePhoto.addEventListener("change", () => {
            if (selectCategoriePhoto.value === "") {
              console.log("la section est vide , faites un choix correcpondant");
            } else {
              console.log("la categorie de la photo est bonne : " + selectCategoriePhoto.value);
            }
          });

          // A voir

          // fetch("http://localhost:5678/api/categories")
          //   .then((response) => response.json())
          //   .then((categories) => {
          //     categories.forEach((category) => {
          //       const option = document.createElement("option");
          //       option.value = category.id;
          //       option.textContent = category.name;
          //       selectCategoriePhoto.appendChild(option);
          //     });
          //   });

          // A voir

          //   const choixCategoriePhotoMisAJour = () => {
          //     categoriePhotoValid();
          //   };
          // }
          // function categoriePhotoValid() {
          //   {
          //     if (selectCategoriePhoto.value === "") {
          //       selectCategoriePhoto.classList.add("invalid");
          //     } else {
          //       selectCategoriePhoto.classList.remove("invalid");
          //       selectCategoriePhoto.classList.add("valid");
          //       console.log("la categorie de la photo est bonne : " + selectCategoriePhoto.value);
          //     }
          //   }

          // ------------------------------------------------------- //

          if (selectCategoriePhoto.value === "") {
            selectCategoriePhoto.classList.add("invalid");
          } else {
            selectCategoriePhoto.classList.remove("invalid");
            selectCategoriePhoto.classList.add("valid");
            console.log("la 2e categorie de la photo est bonne : " + selectCategoriePhoto.value);
          }

          // ------------------------------------------------------- //

          // lign separ de madal AJout
          const modalSeparLine = document.createElement("hr");
          modalSeparLine.classList.add("spar-line");
          // proprietes en doublons la simplifier plus tard avec separlign
          modalSeparLine.classList.add("spar-line");
          modalSeparLine.style.display = "flex";
          modalSeparLine.style.width = "420px";
          modalSeparLine.style.border = "1px solid #B3B3B3";
          modalSeparLine.style.margin = "30px 0";

          mainAjouterPhoto.appendChild(modalSeparLine);

          const modalAjoutBtn = document.createElement("button");
          modalAjoutBtn.classList.add("button");
          modalAjoutBtn.classList.add("button-validation");
          // modalAjoutBtn.classList.add("enabled");

          modalAjoutBtn.textContent = "Ajouter";
          
          modalAjoutBtn.classList.add("btnAjouterPhoto");

          // Proprietes bouton ci dessus en doublon,
          // les factoriser plus tard grace au css en un seul code

          // modalAjoutBtn.style.backgroundColor = "#A7A7A7";
          // modalAjoutBtn.style.color = "white";
          // modalAjoutBtn.style.border = "none";
          // modalAjoutBtn.style.margin = "30px";
          // modalAjoutBtn.style.borderRadius = "50px";
          // modalAjoutBtn.style.padding = "12px 24px";
          // modalAjoutBtn.style.fontSize = "16px";
          // modalAjoutBtn.style.width = "236px";
          // modalAjoutBtn.style.cursor = "pointer";
          // modalAjoutBtn.textContent = "Valider";
          mainAjouterPhoto.appendChild(modalAjoutBtn);


          function updateModalButtonState() {
            
            
            // ActivationModalajoutBtn();
         
         
         
          }

          // if (inputTitrePhoto.value && selectCategoriePhoto.value && inputImagePhoto.files[0]) {
          //   modalAjoutBtn.classList.add("active");
          // }

          function ActivationModalajoutBtn () {

            if (inputImagePhoto.files == "" || inputTitrePhoto.value == "" || selectCategoriePhoto.value == "") {
              alert("Veuillez remplir tous les champs avant de valider.");
              modalAjoutBtn.classList.add("disabled");
              modalAjoutBtn.classList.add("inactive");
              alert("Veuillez remplir tous les champs avant de valider.");
            } else if (inputImagePhoto.files[0] && inputTitrePhoto.value && selectCategoriePhoto.value) {
              alert("C est bon! .Tous les champs sont remplis. Vous pouvez valider.");
              modalAjoutBtn.classList.add("enabled");
              modalAjoutBtn.classList.add("active");
              modalAjoutBtn.classList.add("btnAjouterPhoto");
              console.log("le bouton de validation est activé");
            }
          }
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
    // Ici on va faire que lorsque la page remet la liste actuelle de
    // de l' ensemble des projets, il se vide d abord

    gallery.innerHTML = "";
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
