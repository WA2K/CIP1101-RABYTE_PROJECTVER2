let id = parseInt(sessionStorage.getItem("selectedProduct"), 10);
const filtered = product.find(element => element.productId === id);

const box = document.getElementById("container");
box.innerHTML = `
    <div class="breadcrumb">
        <a href="try-homepage.html">Home</a> / 
        <a href="gallery.html?type=${filtered.type}">${filtered.type}</a> / 
        <span>${filtered.name}</span>
    </div>

    <div class="product-container">

        <div class="image-section">
            <img class="main-image" src="${filtered.image}" alt="${filtered.name}">
        </div>

        <div class="details-section">
            <h1 class="product-title">${filtered.name}</h1>

            <div class="brand-price">
                <span class="brand">${filtered.brand}</span>
                <span class="price">₱${filtered.price}</span>
            </div>

            <div class="product-meta">

                <div class="meta-item">
                    <span class="meta-label">Brand:</span>
                    <span class="meta-value">${filtered.brand}</span>
                </div>

                <div class="meta-item">
                    <span class="meta-label">Category:</span>
                    <span class="meta-value">${filtered.category}</span>
                </div>

                <div class="meta-item">
                    <span class="meta-label">Type:</span>
                    <span class="meta-value">${filtered.type}</span>
                </div>
            </div>

            
            <button class="add-to-cart">
                <i class="fa-solid fa-cart-plus"></i>
                Add to Cart
            </button>
        </div>
    </div>

    <div id="product-description" class="product-description">
        <h2>Full Description</h2>
        <br>
        <p>${filtered.desc}</p>
        <br>
        <p>${filtered.desc1}</p>
        <br>
        <p>${filtered.desc2}</p>
        <br>
        <h2>Key Features</h2>
        <br>
        <ul>
            <li>${filtered.feature}</li>
            <li>${filtered.feature1}</li>
            <li>${filtered.feature2}</li>
            <li>${filtered.feature3}</li>
            <li>${filtered.feature4}</li>
        </ul>
    </div>
`;

// Modal functionality
const addToCartBtn = document.querySelector('.add-to-cart');
const modal = document.getElementById('itemAdded');
const closeModal = document.querySelector('.close-modal');
const productNameElement = document.querySelector('.modal-product-name');

addToCartBtn.addEventListener('click', () => {
    // Update product name in modal
    productNameElement.textContent = `${filtered.name} has been added to your cart`;
    // Show modal
    modal.classList.add('show');

    let cart = JSON.parse(sessionStorage.getItem("cart")) || [];
    cart.push(filtered.productId);
    sessionStorage.setItem("cart", JSON.stringify(cart));

    // Auto-close after 2 seconds
    setTimeout(() => {
        modal.classList.remove('show');
    }, 2000);
});

closeModal.addEventListener('click', () => {
    modal.classList.remove('show');
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('show');
    }
});

document.getElementById("acc").addEventListener("click", () => {
    window.location.href = "../html/login.html";
}); 