// Connexion à l'API
const url = "http://localhost:3000/api/products/";

// Initialisation de l'URL
const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);

const urlProduct = urlParams.get("id");

//Vérification du localstorage
let kanapStorage;
if (localStorage.getItem("kanapStorage") != null) {
  kanapStorage = JSON.parse(localStorage.getItem("kanapStorage"));
} else {
  kanapStorage = [];
}

/******************************************************************/
/*Fonction création et affichage des infos produits dans le panier*/
/******************************************************************/

// Appel de la fonction
getLocalStorage();

// Création de la fonction getLocalStorage
function getLocalStorage() {
  // On créé la boucle qui va afficher les kanap dans le panier grâce à leur titre et infos
  for (let i = 0; i < kanapStorage.length; i++) {
    // On récupère les articles et on affiche leurs infos grâce a l'ID
    fetch(url + kanapStorage[i].idKanap)
      .then((resp) => resp.json())
      .then(function (data) {
        // On déclare 2 constantes titre et section
        const titleCart = document.querySelector("h1");
        const sectionCart = document.querySelector(".cart");

        // On déclare les caractéristiques produits
        let nameKanap = data.name;
        let price = data.price;
        let ImgP = data.imageUrl;
        let altImg = data.altTxt;

        // Création de la balise "article" et insertion dans la section
        let productArticle = document.createElement("article");
        document.querySelector("#cart__items").appendChild(productArticle);
        productArticle.className = "cart__item";
        productArticle.setAttribute("data-id", kanapStorage[i].idKanap);

        // Insertion de l'élément "div" pour l'image produit
        let productDivImg = document.createElement("div");

        productDivImg.className = "cart__item__img";
        productArticle.appendChild(productDivImg);

        // Insertion de l'image
        let productImg = document.createElement("img");
        productImg.src = ImgP;
        productImg.alt = altImg;
        productDivImg.appendChild(productImg);

        // Insertion de l'élément "div" pour la description produit
        let productItemContent = document.createElement("div");
        productItemContent.className = "cart__item__content";
        productArticle.appendChild(productItemContent);

        //Insertion de l'élément "div"
        let productItemContentTitlePrice = document.createElement("div");
        productItemContentTitlePrice.className =
          "cart__item__content__titlePrice";
        productItemContent.appendChild(productItemContentTitlePrice);

        // Insertion du titre h2
        let productTitle = document.createElement("h2");
        productItemContentTitlePrice.appendChild(productTitle);
        productTitle.innerText = nameKanap;

        // Insertion de la couleur
        let productColor = document.createElement("p");
        productColor.innerText = kanapStorage[i].colorChoiceKanap;
        productColor.style.fontSize = "20px";
        productTitle.appendChild(productColor);

        // Insertion du prix
        let productPrice = document.createElement("p");
        productPrice.innerText = price + "  " + " €";
        productItemContentTitlePrice.appendChild(productPrice);

        // Insertion de l'élément "div"
        let productItemContentSettings = document.createElement("div");
        productItemContent.appendChild(productItemContentSettings);
        productItemContentSettings.className = "cart__item__content__settings";

        // Insertion de l'élément "div"
        let productItemContentSettingsQuantity = document.createElement("div");
        productItemContentSettings.appendChild(
          productItemContentSettingsQuantity
        );
        productItemContentSettingsQuantity.className =
          "cart__item__content__settings__quantity";

        // Insertion de "Qté : "
        let productQty = document.createElement("p");
        productItemContentSettingsQuantity.appendChild(productQty);
        productQty.innerText = "Qté : ";

        // Insertion de la quantité via l'input et avec les restrictions d'attributs
        let productQuantity = document.createElement("input");
        productItemContentSettingsQuantity.appendChild(productQuantity);
        productQuantity.value = kanapStorage[i].quantityKanap;
        productQuantity.className = "itemQuantity";
        productQuantity.setAttribute("type", "number");
        productQuantity.setAttribute("min", "1");
        productQuantity.setAttribute("max", "100");
        productQuantity.setAttribute("name", "itemQuantity");
        // On écoute le bouton input pour changer la quantité au clic
        productQuantity.addEventListener("change", modifyQuantity);


        /**************************************/
        /*Fonction modification de la quantité*/
        /**************************************/
        function modifyQuantity(e) {
          // On affiche la quantité modifiée dynamiquement
          console.log(e);

          // On déclare la valeur entrée à partir du clavier
          let valueNewQuantity = e.path[0].value;
          // Si la quantité d'origine et la nouvelle sont entre 1 et 100
          if (
            valueNewQuantity != kanapStorage[i].quantityKanap &&
            valueNewQuantity <= 100 &&
            valueNewQuantity > 0
          ) {
            // On change la quantité pour la nouvelle dans le localStorage
            kanapStorage[i].quantityKanap = valueNewQuantity;
            localStorage.setItem("kanapStorage", JSON.stringify(kanapStorage));
            // On appelle les fonctions pour la quantité et le prix total
            totalQuantity();
            totalPrice();
            // Sinon on affiche un message d'erreur
          } else {
            alert(
              `Vous ne pouvez commander qu'un nombre d'article compris entre 1 et 100`
            );
            quantityInput.value = 100;
          }
        }

        // Insertion de l'élément "div"
        let productItemContentSettingsDelete = document.createElement("div");
        productItemContentSettings.appendChild(
          productItemContentSettingsDelete
        );
        productItemContentSettingsDelete.className =
          "cart__item__content__settings__delete";

        // Insertion du bouton "p" supprimer
        let productSupprimer = document.createElement("p");
        productItemContentSettingsDelete.appendChild(productSupprimer);
        productSupprimer.className = "deleteItem";
        productSupprimer.innerText = "Supprimer";
        // On écoute le bouton "supprimer"
        productSupprimer.addEventListener("click", deleteItemFromCart);
        // Création de la fonction de suppression de l'article dans le localStorage et le panier
        function deleteItemFromCart() {
          let idProduitDelete = kanapStorage[i].idKanap;
          let colorProduitDelete = kanapStorage[i].colorChoiceKanap;
          //On filtre les données liées à l'élément à supprimer
          kanapStorage = kanapStorage.filter(
            (a) =>
              a.idKanap !== idProduitDelete &&
              a.colorChoiceKanap !== colorProduitDelete
          );
          // On mets à jour le localStorage
          localStorage.setItem("kanapStorage", JSON.stringify(kanapStorage));
          // Si la quantité du kanap = 0, on vide le localStorage et on refresh rapide
          if (kanapStorage.length === 0) {
            localStorage.clear();
          }
          window.location.reload();
        }
        // On appelle la fonction de quantité totale (car on a modifié la quantité par la suppression)
        totalQuantity();
      });
  }
}


/***************************************************/
/*Fonction calcul de la quantité totale de produits*/
/***************************************************/
//Fonction pour avoir le nombre total de produits
function totalQuantity() {
  let quantityItem = document.getElementsByClassName("itemQuantity");
  let number = 0;

  for (let i = 0; i < quantityItem.length; i++) {
    number += parseInt(quantityItem[i].value);
  }
  // On déclare la variable et on l'insère
  let totalNumber = document.getElementById("totalQuantity");
  totalNumber.innerText = number;
}
// On appelle les fonctions pour les totaux
totalQuantity();


/***************************************/
/*Fonction calcul du prix total des produits*/
/***************************************/
// Fonction pour avoir le prix total
async function totalPrice() {
  let quantityItem = document.getElementsByClassName("itemQuantity");
  let total = 0;

  for (let e = 0; e < kanapStorage.length; e++) {
    // On récupére le prix du canapé via l'url
    let itemPrice = await fetch(url + kanapStorage[e].idKanap)
      .then((resp) => resp.json())
      .then(function (data) {
        return data.price;
      });
    // On effectue le calcul
    total += itemPrice * parseInt(quantityItem[e].value);
  }
  // On insère le prix total
  totalPriceProduct = document.getElementById("totalPrice");
  totalPriceProduct.innerText = total;
}
// On appelle la fonction
totalPrice();


/************************************************/
/*Fonction création et paramétrage du formulaire*/
/************************************************/
// Formulaire d'information pour le commande
let form = document.getElementsByClassName("cart__order__form")[0];

// Bouton COMMANDER
const order = document.getElementById("order");

async function submitOrder() {
  let emailRegExp = new RegExp(
    "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$");
  let charRegExp = new RegExp("^[a-zA-Z ,.'-]+$");
  let addressRegExp = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");
  let p = document.createElement("p");

  let inputFirstName = document.getElementById("firstName");
  let firstNameErrorMsg = inputFirstName.nextElementSibling;
  let hasError = false;

  if (charRegExp.test(inputFirstName.value)) {
    firstNameErrorMsg.textContent = "";
  } else {
    firstNameErrorMsg.textContent = "Prenom Invalide";
    hasError = true;
  }

  let inputLastName = document.getElementById("lastName");
  let lastNameErrorMsg = inputLastName.nextElementSibling;
  if (charRegExp.test(inputLastName.value)) {
    lastNameErrorMsg.textContent = "";
  } else {
    lastNameErrorMsg.textContent = "Nom Invalide.";
    hasError = true;
  }

  let inputAddress = document.getElementById("address");
  let addressErrorMsg = inputAddress.nextElementSibling;
  if (addressRegExp.test(inputAddress.value)) {
    addressErrorMsg.textContent = "";
  } else {
    addressErrorMsg.textContent = "Adresse Invalide";
    hasError = true;
  }

  let inputCity = document.getElementById("city");
  let cityErrorMsg = inputCity.nextElementSibling;
  if (charRegExp.test(inputCity.value)) {
    cityErrorMsg.textContent = "";
  } else {
    cityErrorMsg.textContent = "Ville Invalide.";
    hasError = true;
  }

  let inputEmail = document.getElementById("email");
  let emailErrorMsg = inputEmail.nextElementSibling;
  if (emailRegExp.test(inputEmail.value)) {
    emailErrorMsg.textContent = "";
  } else {
    emailErrorMsg.textContent = "Email Invalide.";
    hasError = true;
  }

  if (hasError) return;
  //Mise en place d'un objet pour les infos du formulaire
  const infoContact = {
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    address: document.getElementById("address").value,
    city: document.getElementById("city").value,
    email: document.getElementById("email").value,
  };

  //Création d'un array pour les éléments du local storage
  let kanap = [];
  for (let i = 0; i < kanapStorage.length; i++) {
    kanap.push(kanapStorage[i].idKanap);
  }

  //Mise en place d'un objet pour les avoir les infos contact + les produits
  const infoRecap = {
    products: kanap,
    contact: infoContact,
  };

  let response = await fetch(url + "order", {
    // Ajout de la méthode
    method: "POST",

    // Ajout du body à envoyer
    body: JSON.stringify(infoRecap),

    // Ajout de titre à la requête
    headers: { "Content-type": "application/json; charset=UTF-8" },
  });
  let data = await response.json();
  orderId = data.orderId;
  //AU CLICK ENVOI SUR LA PAGE CONFIRMATION AVEC L'ORDERID
  window.location.href = "./confirmation.html?orderId=" + orderId;
}

order.addEventListener("click", function (event) {
  event.preventDefault();
  submitOrder();
});