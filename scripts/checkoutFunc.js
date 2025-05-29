//Script for checkout
//Initialize Cart

// Format for price
function formatPrice(price) {
    if (typeof price === 'string') {
        price = price.replace(/[^\d]/g, '');
        price = parseInt(price, 10);
    }
    return '₱' + price.toLocaleString('en-PH', {maximumFractionDigits: 0});
}

function generateCart(){
    const cartItemsContainer = document.getElementById("cart-content");
    const checkoutTab = document.getElementById("checkout-tab");
    const checkoutItem = document.getElementById("order-items-container");

    let cart = JSON.parse(sessionStorage.getItem("cart")) || [];
    cartItemsContainer.innerHTML = "";
    let total = 0;

    cartItemsContainer.innerHTML = `
        <h3>Shopping Cart</h3>
        <hr>
    `;

    // Generate cart items
    cart.forEach(element => {
        const itemBox = document.createElement("div");
        const itemBox2 = document.createElement("div");
        
        itemBox.classList.add("cart-content");
        itemBox2.classList.add("cart-content-text");
        
        const filtered = product.filter(item => item.productId === element)[0];
        let price = filtered.price;
        total += price;
        
        itemBox.innerHTML = `
            <img src="${filtered.image}" alt="${filtered.name}">
        `;
        
        itemBox2.innerHTML = `
            <p>${filtered.name}</p>
            <p>${formatPrice(filtered.price)}</p>
        `;
        
        itemBox.appendChild(itemBox2);

        itemBox.onclick = function(){
            sessionStorage.setItem("pay-item", cart.indexOf(element));
            
            checkoutItem.innerHTML = `
                <div class="cart-content">
                    <img src="${filtered.image}" alt="${filtered.name}">
                    <div class="cart-content-text">
                        <p>${filtered.name}</p>
                        <p>${formatPrice(filtered.price)}</p>
                    </div>
                </div>
            `;
        }

        cartItemsContainer.appendChild(itemBox);
    });

    // Add total and checkout button
    const totalSection = document.createElement("div");
    totalSection.classList.add("total");
    totalSection.innerHTML = `
        <div>
            <p>Total price: ${formatPrice(total)}</p>
        </div>
    `;
    
    cartItemsContainer.appendChild(totalSection);
}


//Payment method switch
const credentials = document.getElementById("card-credentials");
const card = document.getElementById("credit");
const cash = document.getElementById("cod"); 
const cardNum = document.getElementById("cardNumber");
const expiry = document.getElementById("expDate");
const cvv = document.getElementById("cvv");

card.onclick = function(){
    credentials.classList.remove("hidden");
    cardNum.setAttribute("required", "");
    expiry.setAttribute("required", "");
    cvv.setAttribute("required", "");       
    fieldChecker(); 
}

cash.onclick = function(){
    credentials.classList.add("hidden");
    cardNum.removeAttribute("required");
    expiry.removeAttribute("required");
    cvv.removeAttribute("required");
    fieldChecker();
}

//Checkout Functionality
const button = document.getElementById("checkoutButton");

button.addEventListener('click', (e) => {
    e.preventDefault();

    const form = document.getElementById("checkout-form");
    let cart = JSON.parse(sessionStorage.getItem("cart")) || [];
    const itemIndex = sessionStorage.getItem("pay-item");
    

    cart.splice(itemIndex, 1);
    sessionStorage.setItem("cart", JSON.stringify(cart));

    //Removes and refreshes data after checkout
    const checkoutItem = document.getElementById("order-items-container");
    checkoutItem.innerHTML = ``;

    const modal = document.querySelector('.cart-modal');
    modal.classList.add('show');

    generateCart();
});

function fieldChecker() {
    const form = document.getElementById("checkout-form");
    const submitBtn = document.getElementById("checkoutButton");
    const requiredInputs = form.querySelectorAll("input[required]");

    // Check all required inputs on every change
    form.addEventListener("input", () => {
        const allFilled = Array.from(requiredInputs).every(input => input.value.trim() !== "");
        submitBtn.disabled = !allFilled; // Enable only if all fields are filled
    });
}

// Modal functionality
const modal = document.querySelector('.cart-modal');
const closeModal = document.querySelector('.close-modal');

closeModal.addEventListener('click', () => {
    modal.classList.remove('show');
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('show');
    }
});

generateCart();
fieldChecker();

document.getElementById("acc").addEventListener("click", () => {
    window.location.href = "../html/login.html";
});   