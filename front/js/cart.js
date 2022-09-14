const url = 'http://localhost:3000/api/products/';

// On récupère l'élément cart situé dans le localstorage
let KanapStorage = JSON.parse(localStorage.getItem('cart'));

// On sélectionne le titre et la classe "cart"
if (!KanapStorage) {
    const titleCart = document.querySelector('h1');
    const sectionCart = document.querySelector('.cart');
    // On insère un message si le panier est vide
    titleCart.innerHTML = 'Votre panier est vide !';
    sectionCart.style.display = 'none';
    // Si le localstorage n'est pas vide on insère les caractéristiques des produits
} else {
    for (let i = 0; i < KanapStorage.length; i++) {
        // Création de la balise "article" et insertion dans la section
        let productArticle = document.createElement('article');
        document.querySelector('#cart__items').appendChild(productArticle);
        productArticle.className = 'cart__item';
        productArticle.setAttribute('data-id', KanapStorage[i].id);

        // Insertion de l'élément "div" pour l'image produit
        let productDivImg = document.createElement('div');
        productArticle.appendChild(productDivImg);
        productDivImg.className = 'cart__item__img';

        // Insertion de l'image
        let productImg = document.createElement('img');
        productDivImg.appendChild(productImg);
        productImg.src = KanapStorage[i].imgP;
        // productImg.alt = productLocalStorage.altImgProduit;

        // Insertion de l'élément "div" pour la description produit
        let productItemContent = document.createElement('div');
        productArticle.appendChild(productItemContent);
        productItemContent.className = 'cart__item__content';

        // Insertion de l'élément "div"
        let productItemContentTitlePrice = document.createElement('div');
        productItemContent.appendChild(productItemContentTitlePrice);
        productItemContentTitlePrice.className =
            'cart__item__content__titlePrice';

        // Insertion du titre h2
        let productTitle = document.createElement('h2');
        productItemContentTitlePrice.appendChild(productTitle);
        productTitle.innerHTML = KanapStorage[i].nameKanap;

        // Insertion de la couleur
        let productColor = document.createElement('p');
        productTitle.appendChild(productColor);
        productColor.innerHTML = KanapStorage[i].colorsP;
        productColor.style.fontSize = '20px';

        // Insertion du prix
        let productPrice = document.createElement('p');
        productItemContentTitlePrice.appendChild(productPrice);
        productPrice.innerHTML = KanapStorage[i].price + '  ' + ' €';

        // Insertion de l'élément "div"
        let productItemContentSettings = document.createElement('div');
        productItemContent.appendChild(productItemContentSettings);
        productItemContentSettings.className = 'cart__item__content__settings';

        // Insertion de l'élément "div"
        let productItemContentSettingsQuantity = document.createElement('div');
        productItemContentSettings.appendChild(
            productItemContentSettingsQuantity
        );
        productItemContentSettingsQuantity.className =
            'cart__item__content__settings__quantity';

        // Insertion de "Qté : "
        let productQty = document.createElement('p');
        productItemContentSettingsQuantity.appendChild(productQty);
        productQty.innerHTML = 'Qté : ';

        // Insertion de la quantité
        let productQuantity = document.createElement('input');
        productItemContentSettingsQuantity.appendChild(productQuantity);
        productQuantity.value = KanapStorage[i].qtyKanap;
        productQuantity.className = 'itemQuantity';
        productQuantity.setAttribute('type', 'number');
        productQuantity.setAttribute('min', '1');
        productQuantity.setAttribute('max', '100');
        productQuantity.setAttribute('name', 'itemQuantity');

        // Insertion de l'élément "div"
        let productItemContentSettingsDelete = document.createElement('div');
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
        productSupprimer.addEventListener('click', (e) => {
            e.preventDefault;

            // On enregistre l'id et la couleur séléctionnés par le bouton "supprimer"
            let deleteId = KanapStorage[i].id;
            let deleteColor = KanapStorage[i].colorsP;

            // On filtre l'élément cliqué par le bouton supprimer
            KanapStorage = KanapStorage.filter(
                (elt) => elt.id !== deleteId || elt.colorsP !== deleteColor
            );

            // On envoi les nouvelles données dans le localStorage
            localStorage.setItem('cart', JSON.stringify(KanapStorage));

            // Message de confirmation de suppression de l'article
            alert('Votre article a bien été supprimé.');

            // Si le panier est vide on vide le local storage
            if (KanapStorage.length === 0) {
                localStorage.clear();
            }
            //Refresh rapide de la page
            location.reload();
        });
    }
}

// Calcul de la quantité totale
function total() {
    let quantity = document.querySelectorAll('.itemQuantity');
    let totalQuantity = document.getElementById('totalQuantity');
    let totalQuant = 0;
    // On incrémente la quantité
    for (let i = 0; i < quantity.length; i++) {
        totalQuant += quantity[i].valueAsNumber;
    }
    // On affiche la quantité totale
    totalQuantity.innerText = totalQuant;
    // On récupère l'élément totalPrice
    let productTotalPrice = document.getElementById('totalPrice');
    // Récupération du prix total
    let totalPrice = 0;
    // On incrémente le prix et on calcul le prix total
    for (var i = 0; i < quantity.length; i++) {
        totalPrice += quantity[i].valueAsNumber * KanapStorage[i].price;
    }
    // Insertion du prix total
    productTotalPrice.innerHTML = totalPrice;
}
// Appel de la fonction
total();

// Fonction pour modifier dynamiquement la quantité
function modifyQtt() {
    let qttModif = document.querySelectorAll('.itemQuantity');
    // On incrémente la quantité modifiée
    for (let k = 0; k < qttModif.length; k++) {
        // On écoute les quantités modifiées
        qttModif[k].addEventListener('change', (event) => {
            // On annule l'évènement exécuté par le navigateur
            event.preventDefault();
            //Selection de l'element à modifier en fonction de son id ET sa couleur
            let quantityModif = KanapStorage[k].quantity;
            let qttModifValue = qttModif[k].valueAsNumber;
            // On demande la première valeur trouvée dans le tableau
            const resultFind = KanapStorage.find(
                (el) => el.qttModifValue !== quantityModif
            );
            // La valeur trouvée devient la nouvelle quantité
            resultFind.quantity = qttModifValue;
            KanapStorage[k].quantity = resultFind.quantity;
            // On converti une valeur JS en chaîne JSON
            localStorage.setItem('cart', JSON.stringify(KanapStorage));
            // On recharge rapidement la page
            location.reload();
        });
    }
}
// Appel de la fonction
modifyQtt();
// REGEX
let emailRegExp = new RegExp(
    '^[A-Za-z0-9.-_]+[@]{1}[A-Za-z0-9.-_]+[.]{1}[a-z]{2,}$'
);
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
    if (KanapStorage == '') {
        alert('Votre panier est vide :(');
    } else if (
        resFirstName &&
        resLastName &&
        resAdress &&
        resCity &&
        resMail &&
        KanapStorage != ''
    ) {
        // Construction d'un tableau depuis le localstorage
        let idPanier = [];
        for (let i = 0; i < KanapStorage.length; i++) {
            idPanier.push(KanapStorage[i].id);
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
                document.location.href = `confirmation.html?id=${data.orderId}`;
            })
            .catch((err) => {
                alert('Erreur : ' + err.message);
            });
    } else {
        alert('Veuillez remplir les champs manquants svp');
    }
}