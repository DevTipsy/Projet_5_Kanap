const url = 'http://localhost:3000/api/products/';

// Initialisation de l'URL Parameters
const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);

const id = urlParams.get('_id');

//On récupére l'id via les paramètres de l'url
//const id = new URL(window.location.href).searchParams.get('_id');

//Récupération des sélecteurs pour les futurs modifications
let title = document.getElementById('title');
let price = document.getElementById('price');
let description = document.getElementById('description');
let colorsP = document.getElementById('colors');
let imgProduit = document.querySelector('.item__img');
let img = document.createElement('img');
imgProduit.appendChild(img);

//On appelle la fonction (asynchrone) des détails d'un canapé
InfoProduct();

//On récupère l'article et affiche ses données grâce a l'id
async function InfoProduct() {
    await fetch('http://localhost:3000/api/products/' + id)
        .then((response) => response.json())
        .then((item) => {
            //Récupération des sélecteurs pour les futures modifications
            let title = document.getElementById('title');
            let price = document.getElementById('price');
            let description = document.getElementById('description');
            let color = document.getElementById('colors');

            //On définit la source et alt de l'img
            img.setAttribute('src', item.imageUrl);
            img.setAttribute('alt', item.altTxt);
            //On insère les infos produit
            title.innerHTML = item.name;
            price.innerHTML = item.price;
            description.innerHTML = item.description;
            document.title = item.name;
            //On créé la boucle pour le choix de la couleur
            for (let i = 0; i < item.colors.length; i++) {
                //Création de l'élément "option"
                let colors = document.createElement('option');
                //On attribue un paramètre "value"
                colors.setAttribute('value', item.colors[i]);
                //On insère la couleur dans le html
                colors.innerHTML = item.colors[i];
                color.appendChild(colors);
            }
        });
}

//Ajout d'un canapé au panier avec le bouton addButton
let addToCartButton = document.getElementById('addToCart');
addToCartButton.addEventListener('click', ajoutPanier);

function ajoutPanier() {
    //Etablissement du local storage lors du click 'Ajout au panier'

    let kanapStorage;

    if (localStorage.getItem('kanapStorage') != null) {
        kanapStorage = JSON.parse(localStorage.getItem('kanapStorage'));
    } else {
        kanapStorage = [];
    }

    fetch(url + id)
        .then((resp) => resp.json())
        .then(function (data) {
            //constante du choix de couleurs
            const colorChoice = document.querySelector('#colors');
            //constante du choix de la quantité
            const quantityChoice = document.querySelector('#quantity');

            console.log(colorChoice.value === '');
            //Mise en place de la condition où les valeurs color + quantity doivent être établies
            if (
                quantityChoice.value > 0 &&
                quantityChoice.value <= 100 &&
                colorChoice.value != ''
            ) {
                let quantityChoiceKanap = parseInt(quantityChoice.value);
                console.log(quantityChoiceKanap);

                let kanap = {
                    idKanap: id,
                    colorChoiceKanap: colorChoice.value,
                    quantityKanap: quantityChoiceKanap,
                };

                let presenceProduit = false;
                let indexProduit = null;

                for (let i = 0; i < kanapStorage.length; i++) {
                    if (
                        kanapStorage[i].idKanap === kanap.idKanap &&
                        kanapStorage[i].colorChoiceKanap ===
                            kanap.colorChoiceKanap
                    ) {
                        presenceProduit = true;
                        indexProduit = i;
                    }
                }
                if (presenceProduit) {
                    kanapStorage[indexProduit].quantityKanap +=
                        kanap.quantityKanap;
                } else {
                    console.log(kanapStorage);
                    kanapStorage.push(kanap);
                }

                localStorage.setItem(
                    'kanapStorage',
                    JSON.stringify(kanapStorage)
                ); // enregistrement du canapé dans le local storage

                // AU "CLICK", ENVOI SUR LA PAGE PANIER
                window.location.href = './cart.html';
            }
        });
    console.log(kanapStorage);
}