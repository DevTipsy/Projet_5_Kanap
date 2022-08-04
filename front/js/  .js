fetch("http://127.0.0.1:5500/front/html/cart.html");

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
