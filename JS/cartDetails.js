let products = localStorage.getItem("products")
  ? JSON.parse(localStorage.getItem("products"))
  : [];

let productId = localStorage.getItem("productId");
let itemDom = document.querySelector(".item-details");
let productDetails = products.find((item) => item.id == productId);

if (productDetails) {
  itemDom.innerHTML = `
    <img src="${productDetails.imageUrl}" alt="" />
    <h2> ${productDetails.title} </h2>
    <p> ${productDetails.desc} </p>
    <span>Size : ${productDetails.size}</span><br>
    <span>Qantatiy : ${productDetails.qty}</span><br>
    <button onclick="editProduct(${productId})">Eidt Product</button>
  `;
} else {
  itemDom.innerHTML = "Product not found.";
}

// Edit Product
function editProduct(id) {
  localStorage.setItem("editProduct", id);
  window.location = "editProduct.html";
}