//On récupére l'id via les paramètres de l'url
const id = new URL(window.location.href).searchParams.get('_id');

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
            let colorsP = document.getElementById('colors');

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
                let color = document.createElement('option');
                //On attribue un paramètre "value"
                color.setAttribute('value', item.colors[i]);
                //On insère la couleur dans le html
                color.innerHTML = item.colors[i];
                colorsP.appendChild(color);
            }
        });
}
//Eventlistener du bouton
const button = document.getElementById('addToCart');
button.addEventListener('click', ajoutPanier);

//Ajouter des produits au panier grâce au localstorage
/*****************************************************/

function ajoutPanier() {
    const colorChoice = document.querySelector('#colors');
    const quantityChoice = document.querySelector('#quantity');

    if (
        quantityChoice.value > 0 &&
        quantityChoice.value <= 100 &&
        quantityChoice.value != 0 &&
        colorChoice.value != 0
    ) {
        if (localStorage.getItem('cart')) {
            let productCart = JSON.parse(localStorage.getItem('cart'));
            console.log(productCart);

            let idP = id;
            let colorsP = document.querySelector('#colors').value;
            let qtyKanap = document.querySelector('#quantity').value;

            const resultFind = productCart.find(
                (el) => el.idP === id && el.colorsP === colorsP
            );
            //Si le produit commandé est déjà dans le panier

            if (resultFind) {
                let newQuantite =
                    parseInt(qtyKanap) + parseInt(resultFind.qtyKanap);

                resultFind.qtyKanap = newQuantite;
                localStorage.setItem('cart', JSON.stringify(productCart));

                //Si le produit commandé n'est pas dans le panier
            } else {
                let productCart = JSON.parse(localStorage.getItem('cart'));

                let idP = id;
                let nameKanap = document.querySelector('#title').textContent;
                let colorsP = document.querySelector('#colors').value;
                let qtyKanap = document.querySelector('#quantity').value;
                let imgP = img.src;
                let altImg = img.alt;
                let price = document.querySelector('#price').textContent;

                let productCartObj = {
                    idP: id,
                    nameKanap: nameKanap,
                    colorsP: colorsP,
                    qtyKanap: qtyKanap,
                    imgP: imgP,
                    altImg: altImg,
                    price: price,
                };

                productCart.push(productCartObj);

                let objCart = JSON.stringify(productCart);
                localStorage.setItem('cart', objCart);

                alert('Ajouté au panier !');
            }
        } else {
            let productCart = [];

            let idP = id;
            let nameKanap = document.querySelector('#title').textContent;
            let colorsP = document.querySelector('#colors').value;
            let qtyKanap = document.querySelector('#quantity').value;
            let imgP = img.src;
            let altImg = img.alt;
            let price = document.querySelector('#price').textContent;

            let productCartObj = {
                idP: id,
                nameKanap: nameKanap,
                colorsP: colorsP,
                qtyKanap: qtyKanap,
                imgP: imgP,
                altImg: altImg,
                price: price,
            };

            productCart.push(productCartObj);

            let objCart = JSON.stringify(productCart);
            localStorage.setItem('cart', objCart);

            alert('Ajouté au panier !');
        }
    }
}
