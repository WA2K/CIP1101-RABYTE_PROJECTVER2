// modal add-to-cart functionality
const cartIcon = document.getElementById("cart-icon");
const cartModal = document.getElementById("cartModal");
const closeCartModal = document.getElementById("closeCartModal");
const cartItemsContainer = document.getElementById("cartItemsContainer");

cartIcon.onclick = function () {
    let cart = JSON.parse(sessionStorage.getItem("cart")) || [];
    
    cartItemsContainer.innerHTML = "";
    let total = 0;

    cart.forEach(element => {
        const itemBox = document.createElement("div");
        const itemBox2 = document.createElement("div");
        
        itemBox.classList.add("cart-content");
        itemBox2.classList.add("cart-content-text");
        const filtered = product.filter(item => item.productId === element)[0];
        let price = filtered.price;
        total += price;
        itemBox.innerHTML = `
            <img src="${filtered.image}" style="width:100px; height:100px;">
        `;
        itemBox2.innerHTML = `
            <p>${filtered.name}</p>
            <p>${formatPrice(filtered.price)}</p>
        `;
        
        itemBox.appendChild(itemBox2);
        cartItemsContainer.appendChild(itemBox);
    });
    const itemBox4 = document.createElement("div");
    itemBox4.innerHTML = `
        <br>
        <hr>
        <br>
    `;
    cartItemsContainer.appendChild(itemBox4);
    const itemBox3 = document.createElement("div");
    itemBox3.classList.add("total");
    itemBox3.innerHTML = `
        <div>
            <p>Total price: ${formatPrice(total)}<p>
        </div>
    `;

    const checkoutButton = document.createElement('button');
    const itemBox5 = document.createElement("div");
    itemBox5.classList.add("checkout-section");

    checkoutButton.classList.add("checkout-button");
    checkoutButton.textContent = 'Checkout';

    checkoutButton.addEventListener("click", () => {
        window.location.href = "../html/checkout.html";
    });
    
    itemBox5.appendChild(checkoutButton);
    itemBox3.appendChild(itemBox5);

    cartItemsContainer.appendChild(itemBox3);
    cartModal.style.display = "block";
};

closeCartModal.onclick = function () {
    cartModal.style.display = "none";
};

// Optional: Close if user clicks outside the modal
window.onclick = function (event) {
    if (event.target === cartModal) {
        cartModal.style.display = "none";
    }
}

// Format for price
function formatPrice(price) {
    if (typeof price === 'string') {
        price = price.replace(/[^\d]/g, '');
        price = parseInt(price, 10);
    }
    return '₱' + price.toLocaleString('en-PH', {maximumFractionDigits: 0});
}