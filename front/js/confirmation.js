function confirmation(){
    let url = new URL(window.location.href);
    let id = url.searchParams.get("id");
    const orderId = document.getElementById("orderId");
    orderId.innerHTML = id;
}
confirmation();