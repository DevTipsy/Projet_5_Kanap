/*Connexion à l'api*/
/*********************/
fetch("http://localhost:3000/api/products")
/*On transforme la réponse en objet JS interprétable par le navigateur*/
  .then((reponse) => reponse.json())
/*On nomme le résultat promise*/
  .then((promise) => {
/*On demande de récupérer les données sous forme de tableau dans la console*/
    console.table(promise);
/*On demande d'afficher les produits de la boucle for qui suit*/
    afficherKanap(promise);
  })
/*Si il ya une erreur :*/
  .catch((err) => {
/*On récupère l'élément class="titles" et on le remplace par "Erreur..."*/
    document.querySelector(".titles").innerHTML = "<h1>Erreur, produits indisponibles</h1>";
/*On affiche l'erreur dans la console*/
    console.log("Erreur");
  });
/*Création des cartes produits*/
/******************************/
/*On utilise le même nom que la promise pour la fonction en précisant la page concernée*/
function afficherKanap(index) {
/*On déclare une variable en utilisant l'ID items */
  let produits = document.querySelector("#items");
/*On créé la boucle for avec la balise article de l'index*/
  for (let article of index) {
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