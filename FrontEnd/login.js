console.log("login.js loaded bien meme");

const url = "http://localhost:5678/api/";
const form = document.querySelector("form");
const error = document.getElementById("error");
console.log(form);
form.addEventListener("submit", (e) => {
  e.preventDefault();
  error.textContent = "";
  const user = {
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
  };

  fetch(url + "users/login", {
    method: "post",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      if (!response.ok) {
        if (response.status === 401) {
          error.textContent = "Une erreur est survenue le mot de passe incorrect.";
        } else if (response.status === 404) {
          error.textContent = "Une erreur est survenue. l email est incorrecte.";
        }
      }
      return response.json();
    })
    .then((data) => {
      //  ici je dois récupérer le token
      localStorage.setItem("token", data.token);
      console.log(data);
      console.log("c est les datas la haut");
      window.location.href = "./index.html";
    })
    .catch((err) => {
      console.log(err);
    });
});

// le stocker dans le local storage
const token = localStorage.getItem("token");
console.log("Token bon :", token);
// puis rediriger vers la page d accueil
// window.location.href = "./index.html";
// if (token) {
//     // console.log("Utilisateur connecté");
// // const modifBanniere = document.createElement("div");
// // modifBanniere.setAttribute("id", "banniere");
// // modifBanniere.style.display = "flex";
// // modifBanniere.style.justifyContent = "center";
// // modifBanniere.style.alignItems = "center";
// // modifBanniere.style.backgroundColor = "grey";
// // modifBanniere.style.padding = "16px 8px";
// }

// puis dans la page d accueil je dois vérifier si le token est présent

const loginConnection = document.getElementById("loginConnection");
console.log(loginConnection);
if (token) {
  console.log("c est bon");
  const modifBanniere = document.createElement("div");
  modifBanniere.setAttribute("id", "banniere");
  console.log(modifBanniere);
  const monBody = document.querySelector("body");
  console.log(modifBanniere);
  monBody.insertBefore(modifBanniere, monBody.firstChild);
  modifBanniere.style.display = "flex";
  loginConnection.textContent = "logout";
  loginConnection.addEventListener("click", () => {
    logout();
  });
} else {
  loginConnection.textContent = "login";
  loginConnection.addEventListener("click", () => {
    window.location.href = "./login.html";
  });
}
function logout() {
  localStorage.removeItem("token");
  window.location.href = "./index.html";
  loginConnection.href = "./login.html";
}
