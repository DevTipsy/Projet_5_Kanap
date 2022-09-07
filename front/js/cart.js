    // REGEX
    let emailRegExp = new RegExp("^[A-Za-z0-9.-_]+[@]{1}[A-Za-z0-9.-_]+[.]{1}[a-z]{2,}$");
    let caractRegExp = new RegExp("^[A-Za-zàâäéèêëïîôöùûüç'-]+$");
    let cityRegExp = new RegExp("^[A-Za-zàâäéèêëïîôöùûüç '-]+$");
    let addressRegExp = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-A-Za-zàâäéèêëïîôöùûüç]+)+");



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
            productSupprimer.addEventListener('click', (e) => {
              e.preventDefault;
          
              // enregistrer l'id et la couleur séléctionnés par le bouton supprimer
              let deleteId = KanapStorage[i].id;
              let deleteColor = KanapStorage[i].colorsP;
      
              // filtrer l'élément cliqué par le bouton supprimer
              KanapStorage = KanapStorage.filter( elt => elt.id !== deleteId || elt.colorsP !== deleteColor);
      
              // envoyer les nouvelles données dans le localStorage
              localStorage.setItem('cart', JSON.stringify(KanapStorage));               
      
              // avertir de la suppression et recharger la page
              alert('Votre article a bien été supprimé.');
              
              //Si pas de produits dans le local storage on affiche que le panier est vide
              if (KanapStorage.length === 0) {
                  localStorage.clear();
              }
              //Refresh rapide de la page
              location.reload();
          });
            
        }
    }
    
    // Calcul de la quantité totale
    function total(){
        let quantity = document.querySelectorAll('.itemQuantity');
        let totalQuantity = document.getElementById('totalQuantity');
        totalQuant = 0;
        for (let i = 0; i < quantity.length; ++i) {
            totalQuant += quantity[i].valueAsNumber;
        }
        totalQuantity.innerText = totalQuant;
    
        let productTotalPrice = document.getElementById('totalPrice');
        // Récupération du prix total
       let totalPrice = 0;
        for (var i = 0; i < quantity.length; ++i) {
            totalPrice += (quantity[i].valueAsNumber * KanapStorage[i].price);
        }
    
       
        productTotalPrice.innerHTML = totalPrice;
    }
    
    total();
    
    
     modifyQtt();
    
    function modifyQtt() {
            let qttModif = document.querySelectorAll(".itemQuantity");
        
            for (let k= 0; k < qttModif.length; k++){
                qttModif[k].addEventListener("change" , (event) => 
                {
                    event.preventDefault();
        
                    //Selection de l'element à modifier en fonction de son id ET sa couleur
                    let quantityModif = KanapStorage[k].quantity;
                    let qttModifValue = qttModif[k].valueAsNumber;
                    
                    const resultFind = KanapStorage.find((el) => el.qttModifValue !== quantityModif);
        
                    resultFind.quantity = qttModifValue;
                    KanapStorage[k].quantity = resultFind.quantity;
                    
                    localStorage.setItem("cart", JSON.stringify(KanapStorage));
                
                    // refresh rapide
                    location.reload();
                })
            }
        }

    // Validation du prénom
    function validFirstName(inputFirstName) {
        let firstNameErrorMsg = document.querySelector("#firstNameErrorMsg");
        if (caractRegExp.test(inputFirstName.value)) {
            firstNameErrorMsg.innerHTML = '';
            return true
        }
        else {
            firstNameErrorMsg.innerHTML = "Saisissez un prénom valide";
            return false
        }
    };

    // Validation du nom
    function validLastName(inputLastName) {
        let lastNameErrorMsg = document.querySelector("#lastNameErrorMsg");
        if (caractRegExp.test(inputLastName.value)) {
            lastNameErrorMsg.innerHTML = '';
            return true
        } else {
            lastNameErrorMsg.innerHTML = "Saisissez un nom valide";
            return false
        }
    };

    // Validation de l'adresse
        function validAddress(inputAddress) {
        let addressErrorMsg = document.querySelector("#addressErrorMsg");
        if (addressRegExp.test(inputAddress.value)) {
            addressErrorMsg.innerHTML = '';
            return true
        } else {
            addressErrorMsg.innerHTML = "Saisissez une adresse valide";
            return false
        }
    };

    // Validation de la ville
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

    // Validation de l'email
    function validEmail(inputEmail) {
        let emailErrorMsg = document.querySelector("#emailErrorMsg");
        if (emailRegExp.test(inputEmail.value)) {
            emailErrorMsg.innerHTML = '';
            return true
        } else {
            emailErrorMsg.innerHTML = "Saisissez un email valide";
            return false
        }
    };

    // Déclaration du bouton "commander" et envoi du formulaire
    const btn_commander = document.getElementById("order");
    btn_commander.addEventListener("click", (event) => submitForm(event));

    //Envoi des informations client au localstorage après validation
    function submitForm(event){
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

        // Si tous les champs sont remplis, la requète serveur peut être effectuée
        if (panier == "") {
                alert("Votre panier est vide :(")
            }
                else if (resFirstName && resLastName && resAdress && resCity && resMail && KanapStorage != "" ) {
                    
                    // Construction d'un tableau depuis le localstorage
                    let idPanier = [];
                    for (let i = 0; i<KanapStorage.length;i++) {
                        idPanier.push(KanapStorage[i].id);
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
                }
            else {
                    alert("Veuillez remplir les champs manquants svp");
                }
    }