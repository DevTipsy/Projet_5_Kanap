//récupérer éléments du panier et les mettre dans tableau puis boucle for et parcourir avec affichage des elements
//getItem si panier vide envoyer message mais pas alert
//parcourir tableau si tout est bon
//créer et insérer les instructions ajoutés au panier avec innerHtml boucle for
//affficher les éléments du panier

// Récupération des produits et création d'un tableau
function getCart() {
    let items = [];
    if (localStorage.getItem("cart") != null) {
      items = JSON.parse(localStorage.getItem("cart"));
    }
    return items;
  }
  
  // On ajoute le produit au panier si il existe, on le créé puis on l'ajoute si inexistant
  function add2Cart(id, color, quantity) {
    if (quantity <= 0 || color == "") {
      return;
    }
    let items = getCart();
    if (items.length == 0) {
      items = [[id, color, quantity]];
    } else {
      let found = false;
      for (let i = 0; i < items.length; i++) {
        if (id === items[i][0] && color === items[i][1]) {
          found = true;
          items[i][2] += quantity;
        }
      }
      if (found == false) {
        let item = [id, color, quantity];
        items.push(item);
      }
    }
    localStorage.setItem("cart", JSON.stringify(items));
  }


  const cart = [    
    {
        idKanape : id,
        title : title,
        price: price,
        quantity : quantity,
        colorsP : colorsP,
        altP : altP,
        imgP : imgP
    }
  ];
  function produit(kanap) {
    return produit.id === 'id';
  }
  console.log(cart.find(id));



//On créé les balises prduits
  fetch("http://localhost:3000/api/products")
  //On transforme la réponse en objet JS interprétable par le navigateur
  .then((reponse) => reponse.json())
  //On nomme le résultat promise
  .then((promise) => {
    //On demande de récupérer les données sous forme de tableau dans la console
    console.table(promise);
    //On demande d'afficher les produits de la boucle for qui suit
    afficherKanap(promise);
  })
  //Si il ya une erreur:
  .catch((err) => {
    //On récupère l'élément class="titles" et on le remplace par "Erreur..."
    document.querySelector(".titles").innerHTML = "<h1>Erreur, produits indisponibles</h1>";
    //On affiche l'erreur dans la console
    console.log("Erreur");
  });

/*Création des cartes produits*/
/******************************/
//On utilise le même nom que la promise pour la fonction en précisant la page concernée
function afficherKanap(localStorage) {
  //On déclare une variable en utilisant l'ID items 
  let produits = document.querySelector("#items");
  //On créé la boucle for avec la balise article de l'index
  for (let article of localStorage) {
    /*On insère via innerHTML les caractéristiques des produits.
    On utilise un lien propre à chaque produit grâce à lien+_id=${produit._id}
    On utilise $ pour l'image, alt, name et description afin de récupérer les données propre à chaque produit*/
    produits.innerHTML += `<a href="./product.html?_id=${article._id}">
    <article>
      <img src="${article.imageUrl}" alt="${article.altTxt}">
      <h3 class="productName">${article.name}</h3>
      <p class="productDescription">${article.description}</p>
    </article>
  </a>`;
  }
}
console.log("cart");
              
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