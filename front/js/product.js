//On récupére l'id via les paramètres de l'url
const id = new URL(window.location.href).searchParams.get("_id");


//Récupération des sélecteurs pour les futurs modifications
let title = document.getElementById("title");
let price = document.getElementById("price");
let description = document.getElementById("description");
let colorsP = document.getElementById("colors");
let imgProduit = document.querySelector(".item__img");
let img = document.createElement("img");
imgProduit.appendChild(img);

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

 //Eventlistener du bouton
        const button = document.getElementById("addToCart");
        button.addEventListener("click", ajoutPanier);

//Ajouter des produits au panier grâce au localstorage
/*****************************************************/

function ajoutPanier(){
    //On sélectionne l'id colors et quantity situés dans le html
    const color = document.querySelector ("#colors");
    const quantity = document.querySelector ("#quantity");
    //Si ils remplissent la condition suivante :
    if  (quantity.value<=100 && quantity.value>0 && color.value != 0) {

        if  (localStorage.getItem ("cart")) {

            let kanapeliste = JSON.parse(localStorage.getItem ("cart"));
            let idP = id;
            let color = document.querySelector ("#colors");
            let quantityP =document.querySelector ("#quantity");

            const result = kanapeliste.find ((item)=>item.idP===id && item.color===color);

                if (result){
                    let totalquantity = parseInt(quantityP)+parseInt(result.quantityP);
                    result.quantityP=totalquantity;
                    localStorage.setItem("cart",JSON.stringify (kanapeliste));
                    console.log(kanapeliste);
                }
                else {  //Création des éléments
                    let kanapeliste = JSON.parse(localStorage.getItem ("cart"));
                    let idKanape = id;
                    let title = document.querySelector("#title").textContent;
                    let price = document.querySelector("#price").textContent;
                    let quantity = document.querySelector("#quantity").value;
                    let colorsP = document.querySelector("#colors").value;
                    let imgP= img.src;
                    let altP = img.alt;

                    let kanapePanier = {
                        idKanape : id,
                        title : title,
                        price: price,
                        quantity : quantity,
                        colorsP : colorsP,
                        altP : altP,
                        imgP : imgP
                    };
                    //Liaison des élémets au panier
                    kanapeliste.push(kanapePanier);
                    alert("Produit ajouté au panier");
                    localStorage.setItem("cart",JSON.stringify (kanapeliste));
                    console.log(kanapeliste);
            }
        }
    
    else {
        //Initialisation du tableau
        let listeproduits = [];
        //Construction de l'objet
        idKanape = id;
        let title = document.querySelector("#title").textContent;
        let price = document.querySelector("#price").textContent;
        let colorsP = document.querySelector("#colors").value;
        let quantity = document.querySelector ("#quantity").value;
        let imgP = img.src;
        let altP = img.alt;

            let kanapePanier = {
                idKanape : id,
                title : title,
                price: price,
                colorsP : colorsP,
                quantity : quantity,
                imgP : imgP,
                altP : altP
            };
        //On ajoute le produit dans le tableau du Panier
        listeproduits.push(kanapePanier);
        localStorage.setItem("cart",JSON.stringify (listeproduits));
        //On affiche les produits
        console.log(listeproduits);
    }
}
}