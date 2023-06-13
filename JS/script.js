let productsDom = document.querySelector(".products");
let products;

const storedProducts = JSON.parse(localStorage.getItem("products"));
if (storedProducts) {
  products = storedProducts;
} else {
  products = productsDB;
}

let drawProductsUI;
(drawProductsUI = function (products = []) {
  let productsUI = products.map((item) => {
    return `
      <div class="product-item" style="border: ${
        item.isMe === "Y" ? "2px solid #2a9d8f" : ""
      }">
        <img
          src="${item.imageUrl}"
          class="product-item-img"
          alt="image"
        />

        <div class="product-item-desc">
          <a onclick='saveItemData(${item.id})'>${item.title}</a>
          <p>${item.desc}</p>
          <span> Size: ${item.size} </span>

          ${
            item.isMe === "Y" &&
            "<button class='edit-product' onclick='editProduct(" +
              item.id +
              ")'> Edit Product </button>"
          }
        </div>
        <div class="product-item-actions">
          <button class="add-to-cart" onclick="addedToCart(${
            item.id
          })">Add To Cart</button>
          <i class="favorite far fa-heart" style="color: ${
            item.liked == true ? "#2a9d8f" : ""
          }" onclick="addToFavorite(${item.id})"></i>
        </div>
      </div>
    `;
  });

  productsDom.innerHTML = productsUI.join("");
})(products);

function addedToCart(id) {
  if (localStorage.getItem("username")) {
    const storedProducts = JSON.parse(localStorage.getItem("products"));
    const products = storedProducts ? storedProducts : productsDB;
    
    let product = products.find((item) => item.id === id);
    let isProductInCart = addedItem.some((i) => i.id === product.id);

    if (isProductInCart) {
      addedItem = addedItem.map((p) => {
        if (p.id === product.id) p.qty += 1;
        return p;
      });
    } else {
      addedItem.push(product);
    }

    cartProductDivDom.innerHTML = "";
    addedItem.forEach((item) => {
      cartProductDivDom.innerHTML += `<p>${item.title} <span class='item-qty'>${item.qty}</span></p>`;
    });

    localStorage.setItem("productsInCart", JSON.stringify(addedItem));

    let cartProductItems = document.querySelectorAll(".carts-products div p");
    badgeDom.style.display = "block";
    badgeDom.innerHTML = cartProductItems.length;
  } else {
    window.location = "login.html";
  }
}

function getUniqueArr(arr, filterType) {
  let unique = arr
    .map((item) => item[filterType])
    .map((item, i, final) => final.indexOf(item) === i && i)
    .filter((item) => arr[item])
    .map((item) => arr[item]);

  return unique;
}

function saveItemData(id) {
  localStorage.setItem("productId", id);
  window.location = "cartDetails.html";
}

let input = document.getElementById("search");

input.addEventListener("keyup", function (e) {
  const storedProducts = JSON.parse(localStorage.getItem("products"));
  const products = storedProducts ? storedProducts : productsDB;

  search(e.target.value, products);

  if (e.target.value.trim() === "")
    drawProductsUI(products);
});

function search(title, myArray) {
  if (myArray) {
    let arr = myArray.filter(
      (item) => item.title.toLowerCase().indexOf(title.toLowerCase()) !== -1
    );
    drawProductsUI(arr);
  }
}

let favoritesItems = localStorage.getItem("productsFavorite")
  ? JSON.parse(localStorage.getItem("productsFavorite"))
  : [];
function addToFavorite(id) {
  if (localStorage.getItem("username")) {
    let choosenItem = products.find((item) => item.id === id);
    choosenItem.liked = true;
    favoritesItems = [...favoritesItems, choosenItem];
    let uniqueProducts = getUniqueArr(favoritesItems, "id");
    localStorage.setItem("productsFavorite", JSON.stringify(uniqueProducts));
    products.map((item) => {
      if (item.id === choosenItem.id) {
        item.liked = true;
      }
    });
    localStorage.setItem("products", JSON.stringify(products));
    drawProductsUI(products);
  } else {
    window.location = "login.html";
  }
}

let sizeFilter = document.getElementById("size-filter");

