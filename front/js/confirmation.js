function confirmation(){
    let url = new URL(window.location.href);
    let id = url.searchParams.get("_id");
    const orderId = document.getElementById("orderId");
    orderId.innerHTML = id;
}

