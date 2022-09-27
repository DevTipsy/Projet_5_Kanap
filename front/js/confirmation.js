const url = "http://localhost:3000/api/products/order";

function Confirmation() {
    // Initialisation de l'URL Parameters
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const urlOrder = urlParams.get("orderId");
  
    // Récupération du numéro de commande et inscription dans le HTML
    document.getElementById("orderId").innerHTML = urlOrder;
  
    //Nettoyage du local storage
    localStorage.clear();
  }
  
  Confirmation();