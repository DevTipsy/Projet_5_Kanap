// Récupération des produits et création d'un tableau
let kanapeliste = JSON.parse(localStorage.getItem ("cart"));
if (!kanapeliste){
    const kTitles = document.querySelector("h1"); 
    const kCart = document.querySelector(".cart");
    kTitles.innerHTML="Votre panier est vide";
    kCart.style.display="None";
}
else () =>{
    for (let i=0;i<kanapeliste.length; i++){
        let kanapArticle = document.createElement("article");
        document.querySelector("#cart__items").appendChild(kanapArticle);
        kanapArticle.className = ("cart__item");
        kanapArticle.setAttribute ("data-id",kanapeliste[i].id);
        kanapArticle.setAttribute ("data-color",kanapeliste[i].color);

        let kanapImg = document.createElement("div");
        kanapArticle.appendChild(kanapImg);
        kanapImg.className = ("cart__item__img");
        
        let img = document.createElement("img");
        kanapImg.appendChild(img);
        img.src = kanapeliste[i].imgP;

        let description = document.createElement("div");
        kanapArticle.appendChild(kanapArticle);
        description.className = "cart__item__conten__description";
        
        let title = document.createElement("h2");
        kanapArticle.appendChild(title);
        productTitle.innerText = produit.name;

        let color = document.createElement("p");
        kanapArticle.appendChild(color);
        productColor.innerText = produit.color;

        let price = document.createElement("p");
        kanapArticle.appendChild(price);

            // boucle permettant d'associer le prix au bon article
            for (const dataArticle of data) {
                if(produit.id === dataArticle._id){
                    productPrice.innerText = dataArticle.price + " €";
                    totalPrice += (dataArticle.price * produit.quantity)
                }
            }

        let productQuantity = document.createElement("div");
        kanapQuantity.appendChild(kanapArticle);
        productQuantity.className = "cart__item__content__settings";

        let quantity = document.createElement("p");
        kanapQuantity.appendChild(quantity);
        quantity.innerText = "Qté : ";

        let inputQuantity = document.createElement("input");
        productItemContentSettingsQuantity.appendChild(inputQuantity);
        inputQuantity.value = produit.quantity;
        inputQuantity.className = "itemQuantity";
        inputQuantity.setAttribute("type", "number");
        inputQuantity.setAttribute("min", "1");
        inputQuantity.setAttribute("max", "100");
        inputQuantity.setAttribute("name", "itemQuantity");

        let divsupprItem = document.createElement("div");
        divsupprItem.appendChild(divsupprItem);
        divsupprItem.className = "cart__item__content__settings__delete";
        
        let supprItem = document.createElement("p");
        productItemContentSettingsDelete.appendChild(supprItem);
        supprItem.className = "deleteItem";
        supprItem.innerHTML = "Supprimer";

    }    
}
  





              
  // Supprimer un produit
  function deleteItem(id, color) {
    let items = getCart();
    for (i = 0; i < items.length; i++) {
      if (id === items[i][0] && color === items[i][1]) {
        items.splice(i, 1);
        localStorage.setItem("cart", JSON.stringify(items));
        window.location.reload();
      }
    }
  }
  // Modifier la quantité
  function changeQuantity(id, color, quantity) {
    let items = getCart();
    for (let i = 0; i < items.length; i++) {
      if (id === items[i][0] && color === items[i][1]) {
        items[i][2] = quantity;
      }
      localStorage.setItem("cart", JSON.stringify(items));
      window.location.reload();
    }
  }