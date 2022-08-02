//On récupére l'id via les paramètres de l'url
const id = new URL(window.location.href).searchParams.get("_id");

//On appelle la fonction (asynchrone) des détails d'un canapé
InfoProduct();

//On récupère l'article et affiche ses données grâce a l'id
async function InfoProduct() {
     await fetch("http://localhost:3000/api/products/" +id)
    .then((response) => response.json())    
    .then(item => {
        //Récupération des sélecteurs pour les futures modifications
        let title = document.getElementById("title");
        let price = document.getElementById("price");
        let description = document.getElementById("description");
        let colorsP = document.getElementById("colors");
        //On créé la balise img dans la classe item__img
        let imgProduct = document.querySelector(".item__img");
        let img = document.createElement("img");
        imgProduct.appendChild(img);
        //On définit la source et alt de l'img
        img.setAttribute("src", item.imageUrl);
        img.setAttribute("alt", item.altTxt);
        //On insère les infos produit    
        title.innerHTML = item.name;
        price.innerHTML = item.price;
        description.innerHTML = item.description;
        document.title = item.name;
        //On créé la boucle pour le choix de la couleur
        for (let i =0; i < item.colors.length; i++) {
        //Création de l'élément "option"
            let color = document.createElement("option");
            //On attribue un paramètre "value"
            color.setAttribute("value", item.colors[i]);
            //On insère la couleur dans le html
            color.innerHTML = item.colors[i];
            colorsP.appendChild(color);
        }  
    }) ;          
}

//Ajouter des produits au panier grâce au localstorage
/*****************************************************/
    function saveBasket (basket) {
        localStorage.setItem("basket", JSON.stringify(basket));
    }
    //Récupérer les éléments du panier, si il n'y en a pas, retourner un tableau vide
    function getBasket() {
        let basket = localStorage.getItem("basket");
        if (basket == null) {
            return [];
        } else {
            return JSON.parse (basket);
        }
    }
    //Ajouter des produits au panier
    var button = document.getElementById("addToCart")
    button.addEventListener("click",function addBasket (product) {
        let basket = getBasket();
        let foundProduct = basket.find(p => p.id == product.id);
        if (foundProduct != undefined) {
            foundProduct.quantity++;
        } else {
            product.quantity = 1;
            basket.push(product); 
    }
    saveBasket (basket)
    });

    //Supprimer un élément du panier
    function removefromBasket (product) {
        let basket = getBasket();
        basket = basket.filter(p => p.id != product.id);
        saveBasket(basket);
    }
    //Modifier la quantité (si la quantité<0 alors l'article est supprimé)
    function changeQuantity(product, quantity) {
        let basket = getBasket();
        let foundProduct = basket.find(p => p.id == product.id);
        if (foundProduct != undefined) {
            foundProduct.quantity += quantity;
            if (foundProduct.quantity <= 0) {
                removeFromBasket(foundProduct);
            } else {
                saveBasket (basket) ;
            }
    }
}
//Afficher le nombre de produits
function getNumberProduct() {
    let basket = getBasket();
    let number = 0;
    for (let product of basket) {
        number +-product.quantity;
    }
    //Obtenir le prix total du panier
    function getTotalPrice() {
        let basket = getBasket();
        let total = 0;
        for (let product of basket) {
            total += product.price * product.quantity;
        }
        return(total)
    }
}