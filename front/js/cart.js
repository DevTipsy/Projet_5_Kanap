let KanapStorage = JSON.parse(localStorage.getItem("cart"));

if (!KanapStorage) {

    const titleCart = document.querySelector("h1");
    const sectionCart = document.querySelector(".cart");

    titleCart.innerHTML = "Votre panier est vide !";
    sectionCart.style.display = "none";

} else {

    for (let i=0; i < KanapStorage.length; i++) {

        // Création de la balise "article" et insertion dans la section
        let productArticle = document.createElement("article");
        document.querySelector("#cart__items").appendChild(productArticle);
        productArticle.className = "cart__item";
        productArticle.setAttribute("data-id", KanapStorage[i].id);

        // Insertion de l'élément "div" pour l'image produit
        let productDivImg = document.createElement("div");
        productArticle.appendChild(productDivImg);
        productDivImg.className = "cart__item__img";

        // Insertion de l'image
        let productImg = document.createElement("img");
        productDivImg.appendChild(productImg);
        productImg.src = KanapStorage[i].imgP;
        // productImg.alt = productLocalStorage.altImgProduit;
        
        // Insertion de l'élément "div" pour la description produit
        let productItemContent = document.createElement("div");
        productArticle.appendChild(productItemContent);
        productItemContent.className = "cart__item__content";

        // Insertion de l'élément "div"
        let productItemContentTitlePrice = document.createElement("div");
        productItemContent.appendChild(productItemContentTitlePrice);
        productItemContentTitlePrice.className = "cart__item__content__titlePrice";
        
        // Insertion du titre h2
        let productTitle = document.createElement("h2");
        productItemContentTitlePrice.appendChild(productTitle);
        productTitle.innerHTML = KanapStorage[i].title;

        // Insertion de la couleur
        let productColor = document.createElement("p");
        productTitle.appendChild(productColor);
        productColor.innerHTML = KanapStorage[i].colorsP;
        productColor.style.fontSize = "20px";

        // Insertion du prix
        let productPrice = document.createElement("p");
        productItemContentTitlePrice.appendChild(productPrice);
        productPrice.innerHTML = KanapStorage[i].price + " €";

        // Insertion de l'élément "div"
        let productItemContentSettings = document.createElement("div");
        productItemContent.appendChild(productItemContentSettings);
        productItemContentSettings.className = "cart__item__content__settings";

        // Insertion de l'élément "div"
        let productItemContentSettingsQuantity = document.createElement("div");
        productItemContentSettings.appendChild(productItemContentSettingsQuantity);
        productItemContentSettingsQuantity.className = "cart__item__content__settings__quantity";
        
        // Insertion de "Qté : "
        let productQty = document.createElement("p");
        productItemContentSettingsQuantity.appendChild(productQty);
        productQty.innerHTML = "Qté : ";

        // Insertion de la quantité
        let productQuantity = document.createElement("input");
        productItemContentSettingsQuantity.appendChild(productQuantity);
        productQuantity.value = KanapStorage[i].quantity;
        productQuantity.className = "itemQuantity";
        productQuantity.setAttribute("type", "number");
        productQuantity.setAttribute("min", "1");
        productQuantity.setAttribute("max", "100");
        productQuantity.setAttribute("name", "itemQuantity");

        // Insertion de l'élément "div"
        let productItemContentSettingsDelete = document.createElement("div");
        productItemContentSettings.appendChild(productItemContentSettingsDelete);
        productItemContentSettingsDelete.className = "cart__item__content__settings__delete";

        // Insertion de "p" supprimer
        let productSupprimer = document.createElement("p");
        productItemContentSettingsDelete.appendChild(productSupprimer);
        productSupprimer.className = "deleteItem";
        productSupprimer.innerHTML = "Supprimer";
        
    }    
    totalQuantity();
    totalPrice(totalPrices);
}
modifQuantity();
deleteArticle();

// Calcul de la quantité totale
function totalQuantity(){
let quantity = document.querySelectorAll('.itemQuantity');
let totalQuantity = document.getElementById('totalQuantity');
totalQuant = 0;
for (let i = 0; i < quantity.length; ++i) {
    totalQuant += quantity[i].valueAsNumber;
}
totalQuantity.innerText = totalQuant;
}

// Calcul du total prix
function totalPrice(totalPrices){
    let totPrice = document.getElementById('totalPrice');
    totPrice.innerText = totalPrice;
}

// Modification de la quantité
function modifQuantity() {
let quantity = document.querySelectorAll(".itemQuantity");
quantity.forEach((target) => {
    let article = target.closest("article");
    let id = article.dataset.id;
    let color = article.dataset.color;
    target.addEventListener("change" , () => {
        let index = panier.findIndex((element) => element.id == id && element.color == color );
        let quantityCart = panier.quantity;
        let modifQuantity = target.valueAsNumber;
        if (quantityCart != modifQuantity && modifQuantity > 0){
            panier[index].quantity = modifQuantity
            localStorage.setItem("panier", JSON.stringify(panier));
            document.location.reload();
        }else if (modifQuantity <= 0){
            alert("veuillez entrer une valeur supérieur à 0 ou cliquez sur le boutton supprimer afin de le retirer du panier");
            document.location.reload();
        }
    })
})
}

window.onload = () => {
    let productDeleted = document.getElementsByClassName("deleteItem");
    for (let i = 0; i < productDeleted.length; i++) {
      productDeleted[i].addEventListener("click", (e) => {
        let articleDOM = productDeleted[i].closest("article");
        const productToClear = dataStorage.indexOf(dataStorage[i]);
        dataStorage.splice(productToClear, 1);
        articleDOM.remove();
        if (localStorage != undefined) {
          localStorage.setItem("panier", JSON.stringify(dataStorage));
        } else {
          localStorage.clear();
        }
        totalRefresh();
        console.log("Produit supprimé du panier");
        location.reload()
      });
    }
  };
  

// REGEX
let emailRegExp = new RegExp('^[A-Za-z0-9.-_]+[@]{1}[A-Za-z0-9.-_]+[.]{1}[a-z]{2,}$');
let caractRegExp = new RegExp("^[A-Za-zàâäéèêëïîôöùûüç'-]+$");
let cityRegExp = new RegExp("^[A-Za-zàâäéèêëïîôöùûüç '-]+$");
let addressRegExp = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-A-Za-zàâäéèêëïîôöùûüç]+)+");

// Déclaration du bouton commander et envoi du formulaire
const btn_commander = document.getElementById("order");
btn_commander.addEventListener("click", (event) => submitForm(event));

//validation du prénom
function validFirstName(inputFirstName) {
let firstNameErrorMsg = document.querySelector("#firstNameErrorMsg");

if (caractRegExp.test(inputFirstName.value)) {
    firstNameErrorMsg.innerHTML = '';
    return true
} else {
    firstNameErrorMsg.innerHTML = 'Saisissez un prénom valide';
    return false
}
};

//validation du nom
function validLastName(inputLastName) {
let lastNameErrorMsg = document.querySelector("#lastNameErrorMsg");

if (caractRegExp.test(inputLastName.value)) {
    lastNameErrorMsg.innerHTML = '';
    return true
} else {
    lastNameErrorMsg.innerHTML = 'Saisissez un nom valide';
    return false
}
};

//validation de l'adresse
function validAddress(inputAddress) {
let addressErrorMsg = document.querySelector("#addressErrorMsg");

if (addressRegExp.test(inputAddress.value)) {
    addressErrorMsg.innerHTML = '';
    return true
} else {
    addressErrorMsg.innerHTML = 'Saisissez une adresse valide';
    return false
}
};

//validation de la ville
function validCity(inputCity) {
let cityErrorMsg = document.querySelector("#cityErrorMsg");

if (cityRegExp.test(inputCity.value)) {
    cityErrorMsg.innerHTML = '';
    return true
} else {
    cityErrorMsg.innerHTML = "Saisissez un nom de ville valide";
    return false

}
};

//validation de l'email
function validEmail(inputEmail) {
let emailErrorMsg = document.querySelector("#emailErrorMsg");

if (emailRegExp.test(inputEmail.value)) {
    emailErrorMsg.innerHTML = '';
    return true
} else {
    emailErrorMsg.innerHTML = "Email invalide";
    return false
}
};
//Envoi des informations client au localstorage après validation
function submitForm(event){
event.preventDefault();

//Récupération des coordonnées du formulaire client
let inputName = document.getElementById('firstName');
let inputLastName = document.getElementById('lastName');
let inputAdress = document.getElementById('address');
let inputCity = document.getElementById('city');
let inputMail = document.getElementById('email');

// Vérification des informations.
let resFirstName = validFirstName(inputName);
let resLastName = validLastName(inputLastName);
let resAdress = validAddress(inputAdress);
let resCity = validCity(inputCity);
let resMail = validEmail(inputMail);

// si toutes les validations sont vraies, la requète au serveur peut être effectuée
if (panier == "") {
    alert("Votre panier est vide :(")
}else if (resFirstName && resLastName && resAdress && resCity && resMail && panier != "" ) {
    
    // Construction d'un tableau depuis le local storage
    let idPanier = [];
    for (let i = 0; i<panier.length;i++) {
        idPanier.push(panier[i].id);
    }
    
    // Création de l'objet
    const order = {
        contact : {
            firstName: inputName.value,
            lastName: inputLastName.value,
            address: inputAdress.value,
            city: inputCity.value,
            email: inputMail.value,
        },
        products: idPanier,
    } 

    // Requête post
    const options = {
        method: 'POST',
        body: JSON.stringify(order),
        headers: {
            'Accept': 'application/json', 
            "Content-Type": "application/json" 
        },
    };
    
    fetch("http://localhost:3000/api/products/order", options)
    .then((response) => response.json())
    .then((data) => {
        localStorage.clear();
        document.location.href = `confirmation.html?id=${data.orderId}`;
    })
    .catch((err) => {
        alert ("Erreur : " + err.message);
    });
}else{
    alert("Veuillez remplir les champs manquants svp");
}
}