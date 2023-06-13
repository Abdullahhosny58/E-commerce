// // varibles

// let productName = document.getElementById('product-name');
// let productDescription = document.getElementById('product-Description');
// let number = document.getElementById('number');
// let productSizeSelect= document.getElementById('product-size');
// let createForm= document.getElementById('create-form');
// let ProductSizeValue;

// // let productSize= document.getElementById('product-size')


// // Event
// productSizeSelect.addEventListener('change',getProductSizeValue)
// createForm.addEventListener('submit',createProductFunction)

// // function
// function getProductSizeValue (e){
//     ProductSizeValue = e.target.value;
// }

// function createProductFunction (e){
// e.preventDefault();
// let allProducts =JSON.parse(localStorage.getItem('product')) ||product ;
// let nameValue = productName.value;
// let descValue = productDescription.value;

// let obj ={
//     id:allProducts ? allProducts.length + 1 : 1,
//     title:nameValue,
//     desc:descValue,
//     size:ProductSizeValue,
//     qty:1,  
// };
// let newProducts = allProducts ? [...allProducts, obj] : [obj];
// localStorage.setItem("product", JSON.stringify(newProducts));
// }




// Variables

let productName = document.getElementById("product-name");
let productDesc = document.getElementById("product-desc");
let productSizeSelect = document.getElementById("product-size");
let createForm = document.getElementById("create-form");
let inputFile = document.getElementById("upload-image-file");
let productSizeValue;
let productImage;

// Events
productSizeSelect.addEventListener("change", getProductSizeValue);
createForm.addEventListener("submit", createProductFun);
inputFile.addEventListener("change", uploadImage);

// Functions
function getProductSizeValue(e) {
  productSizeValue = e.target.value;
}

function createProductFun(e) {
  e.preventDefault();
  let allProducts = JSON.parse(localStorage.getItem("products")) || productsDB;
  let nameValue = productName.value;
  let descValue = productDesc.value;

  if (nameValue && descValue) {
    let obj = {
      id: allProducts ? allProducts.length + 1 : 1,
      qty: 1,
      imageUrl: productImage,
      size: productSizeValue,
      title: nameValue,
      desc: descValue,
      isMe: "Y",
    };

    let newProducts = allProducts ? [...allProducts, obj] : [obj];
    localStorage.setItem("products", JSON.stringify(newProducts));

    productName.value = "";
    productDesc.value = "";
    productSizeSelect.value = "";

    setTimeout(() => {
      window.location = "index.html";
    }, 500);
  } else {
    alert("Enter Data ..");
  }
}

// uploadImage
function uploadImage() {
  let file = this.files[0];
  let types = ["image/jpeg", "image/png"];

  if (types.indexOf(file.type) == -1) {
    alert("Type not Supported");
    return;
  }

  if (file.size > 2 * 1024 * 1024) {
    alert("Image not Exced 2MG");
    return;
  }

  getImageBase64(file);
  // productImage = URL.createObjectURL(file);
}

function getImageBase64(file) {
  let reader = new FileReader();

  reader.readAsDataURL(file);

  reader.onload = function () {
    productImage = reader.result;
  };

  reader.onerror = function () {
    alert("Error !!");
  };
}