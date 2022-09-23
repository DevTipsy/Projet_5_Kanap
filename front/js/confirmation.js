function confirmation(){
    fetch('http://localhost:3000/api/products/order');
    let url = new URL(window.location.href);
    let id = url.searchParams.get("orderId");
    const orderId = document.getElementById("orderId");
    orderId.innerHTML = id;
}
confirmation();