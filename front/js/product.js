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

    function ajoutPanier(){
        //On sélectionne l'id colors et quantity situés dans le html
        const color = document.querySelector ("#colors");
        const quantity = document.querySelector ("#quantity");
        //Si ils remplissent la condition suivante :
        if  (quantity.value<=100 && quantity.value>0 && color.value=="") {

        if  (localStorage.getItem ("cart")) {
            let kanapeliste = Json.parse(localStorage.getItem ("cart"));
            let color = document.querySelector ("#colors");
            let quantity =document.querySelector ("#quantity");
            const result = kanapeliste.find (item=>item.id==id && item.color==color);
            if (result){
                let totalquantity = parseInt(quantity)+parseInt(result.quantity);
                result.quantity=totalquantity;
                localStorage.setItem("cart",Json.stringify (kanapeliste));
            }
            else {  //Création des éléments
                    let kanapeliste = Json.parse(localStorage.getItem ("cart"));
                    let idKanape = id;
                    let title = document.getElementById("title");
                    let price = document.getElementById("price");
                    let description = document.getElementById("description");
                    let colorsP = document.getElementById("colors");
                    let img = img.src;
                    let alt = img.alt;
                    let kanapePanier = {
                        idKanape : id,
                        title : title,
                        price: price,
                        description : description,
                        colorsP : colors,
                        alt : alt,
                        img : img
                    };
                    //Liaison des élémets au panier
                    kanapeliste.push(kanapePanier);
                    localStorage.setItem("cart",Json.stringify (kanapeliste));
            }
            }
        }
        else {
            //Initialisation du tableau
            let listeproduits = [];
            //Construction de l'objet
            let produits = Json.parse(localStorage.getItem ("cart"));
            let title = document.getElementById("title");
            let price = document.getElementById("price");
            let colorsP = document.getElementById("colors");
            let quantity =document.querySelector ("#quantity");
            let kanapePanier = {
                title : title,
                price: price,
                colorsP : colors,
                quantity : quantity
            };
            //Ajout du canapé dans le panier
            function addPanier(product) {
                let panier = getPanier();
                let foundProduct = panier.find(panier => panier.id == product.id && panier.color === product.color);
                if (foundProduct != undefined){
                    foundProduct.quantity = parseInt(foundProduct.quantity)+ parseInt(product.quantity) ;
                } else {
                    panier.push(product)
                }
                savePanier(panier);
            }
        }
        //Eventlistener du bouton
        const button = document.getElementById("addToCart");
        button.addEventListener("click");
        createInfoProduct();
    }

