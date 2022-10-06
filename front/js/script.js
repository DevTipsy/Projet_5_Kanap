// Fonction lancée au lancement de la page
const init = async () => {
  const products = await InfoProduct();
  afficherKanap(products);
};

init();

const produits = document.querySelector("#items");

/*******************/
/*Connexion à l'api*/
/*******************/
// On récupére les produits de l'API
async function InfoProduct() {
  try {
    const response = await fetch("http://localhost:3000/api/products");
    const body = await response.json();
    return body;
  } catch (e) {
    alert("Il y a un problème avec le serveur, merci de réessayer plus tard");
  }
}

/******************************/
/*Création des cartes produits*/
/******************************/
// On affiche les produits
function afficherKanap(products) {
  for (const product of products) {
    const a = document.createElement("a");
    const article = document.createElement("article");
    const img = document.createElement("img");
    const h3 = document.createElement("h3");
    const p = document.createElement("p");

    h3.textContent = `${product.name}`;
    p.textContent = `${product.description}`;

    a.setAttribute("href", `./product.html?id=${product._id}`);
    img.setAttribute("src", `${product.imageUrl}`);
    img.setAttribute("alt", `${product.altTxt}`);
    h3.setAttribute("class", `${product.name}`);
    p.setAttribute("class", `${product.description}`);

    produits.appendChild(a);
    a.appendChild(article);
    article.appendChild(img);
    article.appendChild(h3);
    article.appendChild(p);
  }
}