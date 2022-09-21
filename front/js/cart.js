// Connexion à l'API
const url = 'http://localhost:3000/api/products/';

// Initialisation de l'URL
const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);

const urlProduct = urlParams.get('id');

//Vérification du localstorage
let kanapStorage;
if (localStorage.getItem('kanapStorage') != null) {
    kanapStorage = JSON.parse(localStorage.getItem('kanapStorage'));
} else {
    kanapStorage = [];
}

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
                const titleCart = document.querySelector('h1');
                const sectionCart = document.querySelector('.cart');

                // On déclare les caractéristiques produits
                let nameKanap = data.name;
                let price = data.price;
                let ImgP = data.imageUrl;
                let altImg = data.altTxt;

                // Création de la balise "article" et insertion dans la section
                let productArticle = document.createElement('article');
                document
                    .querySelector('#cart__items')
                    .appendChild(productArticle);
                productArticle.className = 'cart__item';
                productArticle.setAttribute('data-id', kanapStorage[i].idKanap);

                // Insertion de l'élément "div" pour l'image produit
                let productDivImg = document.createElement('div');

                productDivImg.className = 'cart__item__img';
                productArticle.appendChild(productDivImg);

                // Insertion de l'image
                let productImg = document.createElement('img');
                productImg.src = ImgP;
                productImg.alt = altImg;
                productDivImg.appendChild(productImg);

                // Insertion de l'élément "div" pour la description produit
                let productItemContent = document.createElement('div');
                productItemContent.className = 'cart__item__content';
                productArticle.appendChild(productItemContent);

                //Insertion de l'élément "div"
                let productItemContentTitlePrice =
                    document.createElement('div');
                productItemContentTitlePrice.className =
                    'cart__item__content__titlePrice';
                productItemContent.appendChild(productItemContentTitlePrice);

                // Insertion du titre h2
                let productTitle = document.createElement('h2');
                productItemContentTitlePrice.appendChild(productTitle);
                productTitle.innerHTML = nameKanap;

                // Insertion de la couleur
                let productColor = document.createElement('p');
                productColor.innerHTML = kanapStorage[i].colorChoiceKanap;
                productColor.style.fontSize = '20px';
                productTitle.appendChild(productColor);

                // Insertion du prix
                let productPrice = document.createElement('p');
                productPrice.innerHTML = price + '  ' + ' €';
                productItemContentTitlePrice.appendChild(productPrice);

                // Insertion de l'élément "div"
                let productItemContentSettings = document.createElement('div');
                productItemContent.appendChild(productItemContentSettings);
                productItemContentSettings.className =
                    'cart__item__content__settings';

                // Insertion de l'élément "div"
                let productItemContentSettingsQuantity =
                    document.createElement('div');
                productItemContentSettings.appendChild(
                    productItemContentSettingsQuantity
                );
                productItemContentSettingsQuantity.className =
                    'cart__item__content__settings__quantity';

                // Insertion de "Qté : "
                let productQty = document.createElement('p');
                productItemContentSettingsQuantity.appendChild(productQty);
                productQty.innerHTML = 'Qté : ';

                // Insertion de la quantité via l'input et avec les restrictions d'attributs
                let productQuantity = document.createElement('input');
                productItemContentSettingsQuantity.appendChild(productQuantity);
                productQuantity.value = kanapStorage[i].quantityKanap;
                productQuantity.className = 'itemQuantity';
                productQuantity.setAttribute('type', 'number');
                productQuantity.setAttribute('min', '1');
                productQuantity.setAttribute('max', '100');
                productQuantity.setAttribute('name', 'itemQuantity');
                // On écoute le bouton input pour changer la quantité au clic
                productQuantity.addEventListener('change', modifyQuantity);
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
                        localStorage.setItem(
                            'kanapStorage',
                            JSON.stringify(kanapStorage)
                        );
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
                let productItemContentSettingsDelete =
                    document.createElement('div');
                productItemContentSettings.appendChild(
                    productItemContentSettingsDelete
                );
                productItemContentSettingsDelete.className =
                    'cart__item__content__settings__delete';

                // Insertion du bouton "p" supprimer
                let productSupprimer = document.createElement('p');
                productItemContentSettingsDelete.appendChild(productSupprimer);
                productSupprimer.className = 'deleteItem';
                productSupprimer.innerHTML = 'Supprimer';
                // On écoute le bouton "supprimer"
                productSupprimer.addEventListener('click', deleteItemFromCart);
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
                    localStorage.setItem(
                        'kanapStorage',
                        JSON.stringify(kanapStorage)
                    );
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

//Fonction pour avoir le nombre total de produits
function totalQuantity() {
    let quantityItem = document.getElementsByClassName('itemQuantity');
    let number = 0;

    for (let i = 0; i < quantityItem.length; i++) {
        number += parseInt(quantityItem[i].value);
    }
    // On déclare la variable et on l'insère via innerHTML
    let totalNumber = document.getElementById('totalQuantity');
    totalNumber.innerHTML = number;
}
// On appelle les fonctions pour les totaux
totalQuantity();
totalPrice();

// Fonction pour avoir le prix total
async function totalPrice() {
    let quantityItem = document.getElementsByClassName('itemQuantity');
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
    totalPriceProduct = document.getElementById('totalPrice');
    totalPriceProduct.innerHTML = total;
}
// On appelle la fonction
totalPrice();

// REGEX
let emailRegExp = new RegExp(
    '^[A-Za-z0-9.-_]+[@]{1}[A-Za-z0-9.-_]+[.]{1}[a-z]{2,}$'
);
// On définit les règles de regex pour les champs
let caractRegExp = new RegExp("^[A-Za-zàâäéèêëïîôöùûüç'-]+$");
let cityRegExp = new RegExp("^[A-Za-zàâäéèêëïîôöùûüç '-]+$");
let addressRegExp = new RegExp(
    '^[0-9]{1,3}(?:(?:[,. ]){1}[-A-Za-zàâäéèêëïîôöùûüç]+)+'
);

// Validation du prénom
function validFirstName(inputFirstName) {
    let firstNameErrorMsg = document.querySelector('#firstNameErrorMsg');
    // On vérifie si il y a une correspondance entre le texte et l'expression
    // Si oui, le champ est considéré comme valide
    if (caractRegExp.test(inputFirstName.value)) {
        firstNameErrorMsg.innerHTML = '';
        return true;
        // Si non, on affiche le message d'erreur suivant
    } else {
        firstNameErrorMsg.innerHTML = 'Saisissez un prénom valide';
        return false;
    }
}

// Validation du nom
function validLastName(inputLastName) {
    let lastNameErrorMsg = document.querySelector('#lastNameErrorMsg');
    if (caractRegExp.test(inputLastName.value)) {
        lastNameErrorMsg.innerHTML = '';
        return true;
    } else {
        lastNameErrorMsg.innerHTML = 'Saisissez un nom valide';
        return false;
    }
}

// Validation de l'adresse
function validAddress(inputAddress) {
    let addressErrorMsg = document.querySelector('#addressErrorMsg');
    if (addressRegExp.test(inputAddress.value)) {
        addressErrorMsg.innerHTML = '';
        return true;
    } else {
        addressErrorMsg.innerHTML = 'Saisissez une adresse valide';
        return false;
    }
}

// Validation de la ville
function validCity(inputCity) {
    let cityErrorMsg = document.querySelector('#cityErrorMsg');
    if (cityRegExp.test(inputCity.value)) {
        cityErrorMsg.innerHTML = '';
        return true;
    } else {
        cityErrorMsg.innerHTML = 'Saisissez un nom de ville valide';
        return false;
    }
}

// Validation de l'email
function validEmail(inputEmail) {
    let emailErrorMsg = document.querySelector('#emailErrorMsg');
    if (emailRegExp.test(inputEmail.value)) {
        emailErrorMsg.innerHTML = '';
        return true;
    } else {
        emailErrorMsg.innerHTML = 'Saisissez un email valide';
        return false;
    }
}

// Déclaration du bouton "commander" et envoi du formulaire
const btn_commander = document.getElementById('order');
btn_commander.addEventListener('click', (event) => submitForm(event));

//Envoi des informations client au localstorage après validation
function submitForm(event) {
    event.preventDefault();

    // On récupère les coordonnées du formulaire client
    let inputName = document.getElementById('firstName');
    let inputLastName = document.getElementById('lastName');
    let inputAdress = document.getElementById('address');
    let inputCity = document.getElementById('city');
    let inputMail = document.getElementById('email');

    // On vérifie les info
    let resFirstName = validFirstName(inputName);
    let resLastName = validLastName(inputLastName);
    let resAdress = validAddress(inputAdress);
    let resCity = validCity(inputCity);
    let resMail = validEmail(inputMail);

    // Si le panier est vide, on affiche un message, si tous les champs sont remplis, la requète serveur peut être effectuée
    if (kanapStorage == '') {
        alert('Votre panier est vide :(');
    } else if (
        resFirstName &&
        resLastName &&
        resAdress &&
        resCity &&
        resMail &&
        kanapStorage != ''
    ) {
        // Construction d'un tableau depuis le localstorage
        let idPanier = [];
        for (let i = 0; i < kanapStorage.length; i++) {
            idPanier.push(kanapStorage[i].id);
        }

        // Création de l'objet
        const order = {
            contact: {
                firstName: inputName.value,
                lastName: inputLastName.value,
                address: inputAdress.value,
                city: inputCity.value,
                email: inputMail.value,
            },
            products: idPanier,
        };
        // Requête post
        const options = {
            method: 'POST',
            body: JSON.stringify(order),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        };

        // On connecte à l'API
        fetch('http://localhost:3000/api/products/order', options)
            .then((response) => response.json())
            .then((data) => {
                localStorage.clear();
                document.location.href = 'confirmation.html?id='+ data.orderId;
            })
            .catch((err) => {
                alert('Erreur : ' + err.message);
            });
    } else {
        // On affiche un message d'erreur
        alert('Veuillez remplir les champs manquants svp');
    }
}