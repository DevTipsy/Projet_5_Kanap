const url = "http://localhost:3000/api/products/order";

/**********************************************/
/*Fonction message de confirmation de commande*/
/**********************************************/
function Confirmation() {
    // Initialisation de l'URL Parameters
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const urlOrder = urlParams.get("orderId");
  
    // Récupération du numéro de commande et inscription dans le HTML
    document.getElementById("orderId").textContent = urlOrder;
  
    //Nettoyage du local storage
    localStorage.clear();
  }
  
  Confirmation();