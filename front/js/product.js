const url = 'http://localhost:3000/api/products/';

// Initialisation de l'URL
const queryString = window.location.search;

const urlParams = new URLSearchParams(queryString);

const id = urlParams.get('_id');

//Récupération des sélecteurs pour les futurs modifications
let title = document.getElementById('title');
let price = document.getElementById('price');
let description = document.getElementById('description');
let colorsP = document.getElementById('colors');
let imgProduit = document.querySelector('.item__img');
let img = document.createElement('img');
imgProduit.appendChild(img);


// On affiche les infos du produit sélectionné sur la page d'accueil
//On appelle la fonction (asynchrone) des détails d'un canapé
InfoProduct();

/***************************************/
/*Fonction affichage des infos produits*/
/***************************************/
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

/**************************/
/*Fonction ajout au panier*/
/**************************/
//Ajout d'un canapé au panier avec le bouton addButton
let addToCartButton = document.getElementById('addToCart');
addToCartButton.addEventListener('click', ajoutPanier);


// On établit le local storage
function ajoutPanier() {
    //Etablissement du local storage lors du click 'Ajout au panier'
    let kanapStorage;

    if (localStorage.getItem('kanapStorage') != null) {
        kanapStorage = JSON.parse(localStorage.getItem('kanapStorage'));
    } else {
        // On créé un tableau qui va contenir les éléments que l'on va ajouter
        kanapStorage = [];
    }
            //constante du choix de couleurs
            const colorChoice = document.querySelector('#colors');
            //constante du choix de la quantité
            const quantityChoice = document.querySelector('#quantity');

            console.log(colorChoice.value === '');
            //Mise en place de la condition où les valeurs color + quantity doivent être établies
            // Si la valeur quantity est renseignée et entre 1 et 100 :
            if (
                quantityChoice.value > 0 &&
                quantityChoice.value <= 100 &&
                colorChoice.value != ''
            ) {
                // On affiche la quantité
                let quantityChoiceKanap = parseInt(quantityChoice.value);
                console.log(quantityChoiceKanap);
                
                // On déclare l'objet kanap avec un ID, la couleur et la quantité choisis
                let kanap = {
                    idKanap: id,
                    colorChoiceKanap: colorChoice.value,
                    quantityKanap: quantityChoiceKanap,
                };
                // On déclare 2 variables pour vérifier plus tard que le produit est présent ou non dans le panier
                let presenceProduit = false;
                let indexProduit = null;

                // On créé une boucle pour récupérer le nombre de produits (en utilisant la quantité la couleur et l'index)
                for (let i = 0; i < kanapStorage.length; i++) {
                    if (
                        kanapStorage[i].idKanap === kanap.idKanap &&
                        kanapStorage[i].colorChoiceKanap ===
                            kanap.colorChoiceKanap
                    ) {
                        presenceProduit = true;
                        // On récupère l'index
                        indexProduit = i;
                    }
                }
                // Si le produit est présent on récupère la quantité choisie eto n l'incrémente
                if (presenceProduit) {
                    kanapStorage[indexProduit].quantityKanap +=
                        kanap.quantityKanap;
                // Sinon on affiche le produit et on l'ajoute à la fin du tableau 
                } else {
                    console.log(kanapStorage);
                    kanapStorage.push(kanap);
                }
                // On met à jour le localStorage
                // On enregistre le canapé dans le local storage
                localStorage.setItem(
                    'kanapStorage',
                    JSON.stringify(kanapStorage)
                );

                // Au clic on redirige l'utilisateur vers la page panier
                window.location.href = './cart.html';
            }
        };
