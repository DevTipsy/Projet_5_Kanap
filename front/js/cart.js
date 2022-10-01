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
  // On créé la boucle qui va parcour le local storage et afficher les kanap
  for (let i = 0; i < kanapStorage.length; i++) {
    // On récupère les articles dans l'API et on affiche leurs infos grâce a l'ID
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
        productTitle.innerHTML = nameKanap;

        // Insertion de la couleur
        let productColor = document.createElement("p");
        productColor.innerHTML = kanapStorage[i].colorChoiceKanap;
        productColor.style.fontSize = "20px";
        productTitle.appendChild(productColor);

        // Insertion du prix
        let productPrice = document.createElement("p");
        productPrice.innerHTML = price + "  " + " €";
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
        productQty.innerHTML = "Qté : ";

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
            // Sinon on affiche un message d'erreur si la condition n'est pas respectée
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
        productSupprimer.innerHTML = "Supprimer";
        // On écoute le bouton "supprimer"
        productSupprimer.addEventListener("click", deleteItemFromCart);

        /***********************************/
        /*Fonction suppression des produits*/
        /***********************************/
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
    console.log(kanapStorage);
  }
}

/***************************************************/
/*Fonction calcul de la quantité totale de produits*/
/***************************************************/
//Fonction pour avoir le nombre total de produits
function totalQuantity() {
  // On récupère la quantité de tous les articles dans le panier
  let quantityItem = document.getElementsByClassName("itemQuantity");
  let number = 0;
// On parcourt le tableau des quantité précédent
  for (let i = 0; i < quantityItem.length; i++) {
    number += parseInt(quantityItem[i].value);
  }
  // On déclare la variable et on l'insère via innerHTML, puis affichage de la quantité totale via l'ID
  let totalNumber = document.getElementById("totalQuantity");
  totalNumber.innerHTML = number;
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
  totalPriceProduct.innerHTML = total;
}
// On appelle la fonction
totalPrice();

// Formulaire d'information pour le commande
let form = document.getElementsByClassName("cart__order__form")[0];

/************************************************/
/*Fonction création et paramétrage du formulaire*/
/************************************************/
function Form() {
  let emailRegExp = new RegExp("^[a-z0-9.-_]+[@]{1}[a-z0-9.-]+[.]{1}[a-z]{2,4}$");
  let caractRegExp = new RegExp("^[a-zA-Z. àäéèêëîìïôòöûüùç_-]+$");
  let addressRegExp = new RegExp("^[0-9]{0,5} [a-zA-Z.-_ àäéèêëîìïôòöûüùç]+$");
  let cityRegExp = new RegExp("^[A-Za-zàâäéèêëïîôöùûüç '-]+$");

  //Vérification des éléments sur le formulaire

  //Prénom
  form.firstName.addEventListener("change", function () {
    validFirstName(this);
  });
  const validFirstName = function (firstName) {
    let testFirstName = caractRegExp.test(firstName.value);
    let errorMessageFirstName = document.getElementById("firstNameErrorMsg");

    if (testFirstName) {
      errorMessageFirstName.innerHTML = "Prénom valide";
    } else {
      errorMessageFirstName.innerHTML = "Prénom invalide";
    }
  };

  //Nom
  form.lastName.addEventListener("change", function () {
    validLastName(this);
  });
  const validLastName = function (lastName) {
    let testLastName = caractRegExp.test(lastName.value);
    let errorMessageLastName = document.getElementById("lastNameErrorMsg");

    if (testLastName) {
      errorMessageLastName.innerHTML = "Nom valide";
    } else {
      errorMessageLastName.innerHTML = "Nom invalide";
    }
  };

  //Adresse
  form.address.addEventListener("change", function () {
    validAdress(this);
  });
  const validAdress = function (address) {
    let testAdress = addressRegExp.test(address.value);
    let errorMessageAdress = document.getElementById("addressErrorMsg");

    if (testAdress) {
      errorMessageAdress.innerHTML = "Adresse valide";
    } else {
      errorMessageAdress.innerHTML = "Adresse invalide";
    }
  };

  //Ville
  form.city.addEventListener("change", function () {
    validCity(this);
  });
  const validCity = function (city) {
    let testCity = cityRegExp.test(city.value);
    let errorMessageCity = document.getElementById("cityErrorMsg");

    if (testCity) {
      errorMessageCity.innerHTML = "Ville valide";
    } else {
      errorMessageCity.innerHTML = "Ville invalide";
    }
  };

  //Adresse mail
  form.email.addEventListener("change", function () {
    validEmail(this);
  });
  const validEmail = function (email) {
    let testEmail = emailRegExp.test(email.value);
    let errorMessageEmail = document.getElementById("emailErrorMsg");

    if (testEmail) {
      errorMessageEmail.innerHTML = "Adresse email valide";
    } else {
      errorMessageEmail.innerHTML = "Adresse email invalide";
    }
  };
}
Form();

// Bouton COMMANDER
const order = document.getElementById("order");

/******************************/
/*Fonction envoi du formulaire*/
/******************************/

// On envoi le formulaire
async function submitOrder() {
  //Mise en place d'un objet pour les infos du formulaire
  const infoContact = {
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    address: document.getElementById("address").value,
    city: document.getElementById("city").value,
    email: document.getElementById("email").value,
  };

  //Création d'un tableau pour les éléments du local storage
  let kanap = [];
  for (let i = 0; i < kanapStorage.length; i++) {
    kanap.push(kanapStorage[i].idKanap);
  }

  //Mise en place d'un objet pour avoir les infos contact + les produits
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
  console.log(data);
  orderId = data.orderId;
  console.log(orderId);
}

order.addEventListener("click", function (event) {
  event.preventDefault();

  submitOrder();

  // Au clic, envoi du formulaire avec un order ID
  window.location.href = "./confirmation.html?orderId=" + orderId;
});