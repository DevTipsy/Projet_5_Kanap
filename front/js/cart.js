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
    totalQuantity();
    totalPrice();
}
modifQuantity();
deleteProduct();




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

// Calcul du prix total
function totalPrice(totalPrices){
  let totPrice = document.getElementById('totalPrice');
  totPrice.innerText = totalPrices;
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

// Suppression d'un produit
function deleteProduct() {
  let btnDelete = document.querySelectorAll(".deleteItem");
  btnDelete.forEach((target) => {
      let article = target.closest("article");
      let id = article.dataset.id;
      let color = article.dataset.color;
      target.addEventListener("click" , () => {

          //Selection de l'element à supprimer en fonction de son id ET sa couleur
          panier = panier.filter((element) => element.id !== id || element.color !== color );

          // Mise à jour du localstorage
          localStorage.setItem("panier", JSON.stringify(panier));
          
          //Alerte produit supprimé
          alert("Produit supprimé");
          document.location.reload();
      })
  })
}


//Formulaire :
//*******************************************************************

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

  // récupération de la validité des informations.
  let resFirstName = validFirstName(inputName);
  let resLastName = validLastName(inputLastName);
  let resAdress = validAddress(inputAdress);
  let resCity = validCity(inputCity);
  let resMail = validEmail(inputMail);

  // si toutes les validations sont à true la requète au serveur peut être effectuée
  if (panier == "") {
      alert("Votre panier est vide :(")
  }else if (resFirstName && resLastName && resAdress && resCity && resMail && panier != "" ) {
      
      // Construction d'un tableau depuis le local storage
      let idPanier = [];
      for (let i = 0; i<panier.length;i++) {
          idPanier.push(panier[i].id);
      }
      
      // création de l'objet que doit recevoir le back
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

      // Option de configuration de la requete post
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