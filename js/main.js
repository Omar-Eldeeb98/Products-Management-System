let categoryLabel = document.getElementById("category_label");
let dropDownSelect = document.getElementById("category_dropdown");

let categoryNameLabel = document.getElementById("category_name_label");
let categoryNameInput = document.getElementById("category_name_input");

let saveCategoryBtn = document.getElementById("save_category_btn");
let showCategoriesBtn = document.getElementById("show_categories_btn");

let productNameLabel = document.getElementById("product_name_label");
let productNameInput = document.getElementById("product_name_input");

let productQuantityLabel = document.getElementById("product_quantity_label");
let productQuantityInput = document.getElementById("product_quantity_input");

let productPriceLabel = document.getElementById("product_price_label");
let productPriceInput = document.getElementById("product_price_input");

let productDescountLabel = document.getElementById("product_descount_label");
let productDescountInput = document.getElementById("product_descount_input");

let productTotalLabel = document.getElementById("product_total_label");
let productTotalInput = document.getElementById("product_total_input");

let saveProductBtn = document.getElementById("save_product_btn");
let updateProductBtn = document.getElementById("update_product_btn");
let deleteAllProductsBtn = document.getElementById("delete_all_products");

let tableCategories = document.getElementById("categoryies_table_body");

let tableContainer = document.getElementById("table_container");

let categoryList = [];
let productList = [];

//&======================================================================= create Category ========================================================
if (localStorage.getItem("category") !== null) {
  categoryList = JSON.parse(localStorage.getItem("category"));
  showCategory();
}

function createCategory() {
  if (categoryValidation() == false) {
    categoryValidation();
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "You Can Not Create An Empty Category",
      color: "red",
    });
    return false;
  } else if (categoryValidation() == true) {
    let category = {
      categoryName: categoryNameInput.value,
    };

    categoryList.push(category);
    console.log(categoryList);

    // save data in local storage
    localStorage.setItem("category", JSON.stringify(categoryList));
    // call clearInputs()
    clearInputs();
    showCategory();
    countCategories();
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Category Created Successfully",
      showConfirmButton: false,
      timer: 1500,
    });
  }
}
//&======================================================================= create Category ========================================================
//^=========================================================== clear category input function ==============================================================
function clearInputs() {
  categoryNameInput.value = "";
}
//^============================================================== clear category input function ===========================================================

//&============================================================= show Category in select input ====================================================
function showCategory() {
  let cartona = "";
  cartona += `<option value="" >Select Category 🖇️</option>`;
  for (let i = 0; i < categoryList.length; i++) {
    cartona += `<option value="${categoryList[i].categoryName}">${categoryList[i].categoryName}</option>`;
  }

  dropDownSelect.innerHTML = cartona;
}

//&============================================================= show Category in select input ====================================================

//&================================================================= show categories in modal =====================================================
function showModalCategories() {
  let cartona = "";
  for (let i = 0; i < categoryList.length; i++) {
    cartona += `<tr>
  <td>${i + 1}</td>
  <td>${categoryList[i].categoryName}</td>
  <td>
    <button class="btn btn-danger" onclick = "deleteCategory(${i})">
      <i class="fa-solid fa-trash"></i>
    </button>
  </td>
</tr>`;
  }

  tableCategories.innerHTML = cartona;
}
//&======================================================================== show categories in modal ===============================================

//&========================================================== function delete category =============================================================

function deleteCategory(id) {
  //   if (confirm("Are You Sure ?") == true) {
  //     categoryList.splice(id, 1);
  //     // save data in local storage
  //     localStorage.setItem("category", JSON.stringify(categoryList));
  //     showModalCategories();
  //     showCategory();
  //     countCategories();
  //   }

  Swal.fire({
    title: "Do you want to Delete This Category?",
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: "Yes",
    denyButtonText: "No",
    customClass: {
      actions: "my-actions",
      cancelButton: "order-1 right-gap",
      confirmButton: "order-2",
      denyButton: "order-3",
    },
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire("Deleted", "", "success");
      categoryList.splice(id, 1);
      // save data in local storage
      localStorage.setItem("category", JSON.stringify(categoryList));
      showModalCategories();
      showCategory();
      countCategories();
    } else if (result.isDenied) {
      Swal.fire("You Canceled The Deletion", "", "info");
    }
  });
}

//&============================================================= function delete category ==========================================================
//&============================================================= count categories function ==========================================================
function countCategories() {
  document.getElementById(
    "count_category_span"
  ).innerHTML = `( ${categoryList.length} )   Category`;
}
countCategories();
//&============================================================= count categories function ==========================================================

//&=============================================================  category validation ==========================================================
function categoryValidation() {
  if (categoryNameInput.value == "" || categoryNameInput.value == " ") {
    categoryNameLabel.classList.add("text-danger");
    categoryNameLabel.classList.remove("text-white");
    return false;
  } else {
    categoryNameLabel.classList.remove("text-danger");
    categoryNameLabel.classList.add("text-white");
    return true;
  }
}
//&=============================================================  category validation ==========================================================

//~=========================== get total ======================================
function getTatal() {
  if (productPriceInput.value > 0) {
    let total =
      productQuantityInput.value * productPriceInput.value -
      productDescountInput.value;
    productTotalInput.value = total;
    productTotalInput.classList.remove("bg-danger");
    productTotalInput.classList.add("bg-success");
  } else if (productPriceInput.value < 0 || productPriceInput.value == 0) {
    productTotalInput.classList.add("bg-danger");
    productTotalInput.classList.remove("bg-success");
  }
}
//~=========================== get total ======================================

//&=============================================================  create Product ==========================================================

if (localStorage.getItem("products") !== null) {
  productList = JSON.parse(localStorage.getItem("products"));
  showProductsInTable();
}

function createProduct() {
  if (
    validateCategory() == false ||
    validateProductName() == false ||
    validateQuantity() == false ||
    validatePrice() == false
  ) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Can Not Add A New Product , You Should Fill All Inputs First ",
      color: "red",
    });
    validateCategory();
    validateProductName();
    validateQuantity();
    validatePrice();
    return false;
  } else {
    let product = {
      productCategory:
        dropDownSelect.options[dropDownSelect.selectedIndex].text,
      productName: productNameInput.value,
      productQuantity: productQuantityInput.value,
      productPrice: productPriceInput.value,
      productDescount: productDescountInput.value,
      productTotal: productTotalInput.value,
    };

    // console.log(product);
    productList.push(product);
    // save data in local storage
    localStorage.setItem("products", JSON.stringify(productList));
    // clear inputs after adding product
    clearProductInputs();

    Swal.fire({
      position: "center-center",
      icon: "success",
      title: "A New Product Added Successfully",
      showConfirmButton: false,
      timer: 1500,
    });
    showProductsInTable();
  }
}

//&=============================================================  create Product ==========================================================

//^============================================================== clear product inputs ===========================================================
function clearProductInputs() {
  dropDownSelect.options[dropDownSelect.selectedIndex].text =
    "Select Category 🖇️";
  productNameInput.value = "";
  productQuantityInput.value = 0;
  productPriceInput.value = 0;
  productDescountInput.value = 0;
  productTotalInput.value = 0;

  productTotalInput.classList.add("bg-danger");
  productTotalInput.classList.remove("bg-success");
}
//^============================================================== clear product inputs ===========================================================

//&=============================================================  display Product in table ==========================================================

function showProductsInTable() {
  let cartona = "";
  for (let i = 0; i < productList.length; i++) {
    cartona += `<tr>
    <td>${i + 1}</td>
    <td>${productList[i].productCategory}</td>
    <td>${productList[i].productName}</td>
    <td>${productList[i].productQuantity}</td>
    <td>${productList[i].productPrice} $</td>
    <td>${productList[i].productDescount} $</td>
    <td>${productList[i].productTotal} $</td>
    <td>
      <button onclick = "setData(${i})" class="btn btn-outline-warning">
        <i class="fa-solid fa-pen-to-square "></i> 
      </button>
    </td>
    <td>
      <button onclick = "deleteProduct(${i})" class="btn btn-outline-danger">
        <i class="fa-solid fa-trash "></i>
      </button>
    </td>`;
  }
  document.getElementById("products_table_body").innerHTML = cartona;
  if (productList.length == 0) {
    tableContainer.style.height = "80px";
  } else {
    tableContainer.style.height = "400px";
  }
}

//&=============================================================  display Product in table ==========================================================

//&=============================================================  delete Product  ==========================================================
function deleteProduct(id) {
  Swal.fire({
    title: "Do you want to Delete This Product?",
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: "Yes",
    denyButtonText: "No",
    customClass: {
      actions: "my-actions",
      cancelButton: "order-1 right-gap",
      confirmButton: "order-2",
      denyButton: "order-3",
    },
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire("Deleted", "", "success");
      productList.splice(id, 1);
      localStorage.setItem("products", JSON.stringify(productList));
      showProductsInTable();
    } else if (result.isDenied) {
      Swal.fire("You Canceled The Deletion", "", "info");
    }
  });
}

//&=============================================================  delete Product  ==========================================================

//&=============================================================  edit Product  ==========================================================
var indexUpdate = 0;
function setData(index) {
  indexUpdate = index;
  var currentProduct = productList[index];

  dropDownSelect.options[dropDownSelect.selectedIndex].text =
    currentProduct.productCategory;
  productNameInput.value = currentProduct.productName;
  productQuantityInput.value = currentProduct.productQuantity;
  productPriceInput.value = currentProduct.productPrice;
  productDescountInput.value = currentProduct.productDescount;
  productTotalInput.value = currentProduct.productTotal;

  saveProductBtn.classList.add("d-none");
  updateProductBtn.classList.remove("d-none");

  productTotalInput.classList.remove("bg-danger");
  productTotalInput.classList.add("bg-success");
}

function updateProduct() {
  if (
    validateCategory() == false ||
    validateProductName() == false ||
    validateQuantity() == false ||
    validatePrice() == false
  ) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Can Not Update Product , You Should Fill All Inputs First ",
      color: "red",
    });
    validateCategory();
    validateProductName();
    validateQuantity();
    validatePrice();
    return false;
  } else {
    var product = {
      productCategory:
        dropDownSelect.options[dropDownSelect.selectedIndex].text,
      productName: productNameInput.value,
      productQuantity: productQuantityInput.value,
      productPrice: productPriceInput.value,
      productDescount: productDescountInput.value,
      productTotal: productTotalInput.value,
    };

    productList.splice(indexUpdate, 1, product);
    // save to local storage
    localStorage.setItem("products", JSON.stringify(productList));

    saveProductBtn.classList.remove("d-none");
    updateProductBtn.classList.add("d-none");

    productTotalInput.classList.add("bg-danger");
    productTotalInput.classList.remove("bg-success");

    showProductsInTable();
    clearProductInputs();
    // location.reload();
    Swal.fire({
      position: "center-center",
      icon: "success",
      title: "Product Updated Successfully ",
      showConfirmButton: false,
      timer: 1500,
    });
  }
}

//&=============================================================  edit Product  ==========================================================

//&=============================================================  search Product  ==========================================================
let searchInput = document.getElementById("search_input");
function searchProduct() {
  let term = searchInput.value;
  let cartona = "";
  for (let i = 0; i < productList.length; i++) {
    if (
      productList[i].productCategory
        .toLowerCase()
        .includes(term.toLowerCase()) ||
      productList[i].productName.toLowerCase().includes(term.toLowerCase())
    ) {
      cartona += `<tr>
      <td>${i + 1}</td>
      <td>${productList[i].productCategory}</td>
      <td>${productList[i].productName}</td>
      <td>${productList[i].productQuantity}</td>
      <td>${productList[i].productPrice} $</td>
      <td>${productList[i].productDescount} $</td>
      <td>${productList[i].productTotal} $</td>
      <td>
        <button onclick = "setData(${i})" class="btn btn-outline-warning">
          <i class="fa-solid fa-pen-to-square "></i> 
        </button>
      </td>
      <td>
        <button onclick = "deleteProduct(${i})" class="btn btn-outline-danger">
          <i class="fa-solid fa-trash "></i>
        </button>
      </td>`;
    }
  }

  document.getElementById("products_table_body").innerHTML = cartona;
}
searchInput.addEventListener("input", function () {
  searchProduct();
});

//&=============================================================  search Product  ==========================================================

//&=============================================================  delete all Products  =====================================================

function deleteAllProducts() {
  Swal.fire({
    title: "Do you want to Delete All Products In DB?",
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: "Yes",
    denyButtonText: "No",
    customClass: {
      actions: "my-actions",
      cancelButton: "order-1 right-gap",
      confirmButton: "order-2",
      denyButton: "order-3",
    },
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire("All Products Deleted", "", "success");
      productList.splice(0, productList.length);
      localStorage.setItem("products", JSON.stringify(productList));
      showProductsInTable();
    } else if (result.isDenied) {
      Swal.fire("You Canceled The Deletion", "", "info");
    }
  });
}

//&=============================================================  delete all Products  =======================================================

//~=============================================================  validation  =======================================================

function validateCategory() {
  if (
    dropDownSelect.options[dropDownSelect.selectedIndex].text ==
    "Select Category 🖇️"
  ) {
    categoryLabel.classList.add("text-danger");
    categoryLabel.classList.remove("text-white");
    return false;
  } else {
    categoryLabel.classList.remove("text-danger");
    categoryLabel.classList.add("text-white");
    return true;
  }
}

function validateProductName() {
  if (productNameInput.value == "" || productNameInput.value == " ") {
    productNameLabel.classList.add("text-danger");
    productNameLabel.classList.remove("text-white");
    return false;
  } else {
    productNameLabel.classList.remove("text-danger");
    productNameLabel.classList.add("text-white");
  }
}

function validateQuantity() {
  if (productQuantityInput.value == 0 || productQuantityInput.value < 0) {
    productQuantityLabel.classList.add("text-danger");
    productQuantityLabel.classList.remove("text-white");
    return false;
  } else {
    productQuantityLabel.classList.remove("text-danger");
    productQuantityLabel.classList.add("text-white");
    return true;
  }
}

function validatePrice() {
  if (productPriceInput.value == 0 || productPriceInput.value < 0) {
    productPriceLabel.classList.add("text-danger");
    productPriceLabel.classList.remove("text-white");
    return false;
  } else {
    productPriceLabel.classList.remove("text-danger");
    productPriceLabel.classList.add("text-white");
    return true;
  }
}

//~=============================================================  validation  =======================================================

function refreshPage() {
  location.reload();
}
