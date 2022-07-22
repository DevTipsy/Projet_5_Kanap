//On récupère l'id du produit dans l'url
let params = (new URL(document.location)).searchParams;
let _id = params.get('_id');
let kanapID = parseInt(params.get('_id'));
console.log(_id);

