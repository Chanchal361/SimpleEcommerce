
function LoadCategory() {
    fetch("http://fakestoreapi.com/products/categories")
        .then(function (res) {
            return res.json()

        })
        .then(function (categories) {
            categories.unshift("ALL")
            categories.map(function (categorie) {
                let option = document.createElement("option");
                option.text = categorie.toUpperCase();
                option.value = categorie;
                document.getElementById("lstCategories").appendChild(option);
            })

        })
}
function LoadProduct(url) {
    document.querySelector("main").innerHTML = "";
    fetch(url)
        .then(function (res) {
            return res.json();
        })
        .then(function (products) {
            products.map(function (product) {
                let div = document.createElement("div");
                div.className = "m-2 p-2 card";
                div.style.width = "200px";
                div.innerHTML = `
                    <img class="card-img-top " height="140" src=${product.image}>
                        <div class="card-header overflow-auto"style="height:120px">
                           <P>${product.title}</p>
                        </div>

                        <div class="card-body">
                            <dl>
                                <dt>Price</dt>
                                <dl>$${product.price}</dl>
                                <dt>Rating</dt>
                                <dd>${product.rating.rate}<span class="bi bi-star-fill text-success"></span></dd>
                            </dl>
                        </div>
                        <div class="card-footer">   
                          <button onclick="addClick(${product.id})" class="btn btn-success w-100"><span class="bi bi-cart4"></span>Add To Cart</button>
                         </div>
                      `;
                document.querySelector("main").appendChild(div);

            })
        })
}
function CategoriesChange() {
    let categorieName = document.getElementById("lstCategories").value;
    if (categorieName == "ALL") {
        LoadProduct("http://fakestoreapi.com/products");
    } else {
        LoadProduct(`http://fakestoreapi.com/products/category/${categorieName}`);
    }
}
function NavCategoryChancge(categoryName) {
    LoadProduct("http://fakestoreapi.com/products");
}
function NavCategoryChancge1(categoryName) {
    LoadProduct("https://fakestoreapi.com/products/category/electronics");
}
function NavCategoryChancge2(categoryName) {
    LoadProduct("https://fakestoreapi.com/products/category/jewelery");
}
function NavCategoryChancge3(categoryName) {
    LoadProduct("https://fakestoreapi.com/products/category/men's clothing");
}
function NavCategoryChancge3(categoryName) {
    LoadProduct("https://fakestoreapi.com/products/category/women's clothing");
}


function bodyload() {
    LoadCategory();
    LoadProduct("http://fakestoreapi.com/products");
    GetCartItemsCount();
}
let carItems = [];
function GetCartItemsCount() {
    document.getElementById("iblCount").innerHTML = carItems.length;
}

function addClick(id) {
    fetch(`http://fakestoreapi.com/products/${id}`)
        .then(function (responce) {
            return responce.json();
        })
        .then(function (product) {
            carItems.push(product);
            alert(`${product.title}\n\n Added to Card`);
            GetCartItemsCount();
        })
}
function ShowCart() {
    document.querySelector("tbody").innerHTML = "";
    carItems.map(function (product) {
        let tr = document.createElement("tr");
        let tdTitle = document.createElement("td")
        let tdImage = document.createElement("td")
        let tdPrice = document.createElement("td")
        let tdAction = document.createElement("td")
        tdTitle.innerHTML = product.title;
        tdImage.innerHTML = `<img width="50" height="50" src=${product.image}>`
        tdPrice.innerHTML = product.price;
        tdAction.innerHTML = `<button class="btn btn-danger"><span class="bi bi-trash-fill"></span></button>`
        tr.appendChild(tdTitle);
        tr.appendChild(tdImage);
        tr.appendChild(tdPrice);
        tr.appendChild(tdAction);
        document.querySelector("tbody").appendChild(tr);
    })
}
