let funcflag = parseInt(sessionStorage.getItem("flag"), 10);
const box = document.getElementById("box");
const modal = document.getElementById("productModal");
const modalContent = document.getElementById("modalProductContent");
const span = document.getElementsByClassName("close")[0];
const added = document.getElementById("itemAdded");
const closeAdded = document.getElementById("closeAddModal");

// Define category-subtype relationships
const categoryHierarchy = {
    peripheral: ['keyboard', 'mouse', 'speaker', 'microphone', 'headphone'],
    gaming: ['console', 'controller'],
    networking: ['router', 'switch', 'netcard', 'ap']
};

function formatPrice(price) {
    if (typeof price === 'string') {
        price = price.replace(/[^\d]/g, '');
        price = parseInt(price, 10);
    }
    return '₱' + price.toLocaleString('en-PH', {maximumFractionDigits: 0});
}

function display(data, container) {
    container.innerHTML = "";
    data.forEach(element => {
        const prodCard = document.createElement("div");
        prodCard.classList.add("prod-card");
        prodCard.innerHTML = `
            <img src="${element.image}" alt="${element.name}">
            <p class="prod-text-title">${element.name}</p>
            <p class="prod-text-price">${formatPrice(element.price)}</p>
            <button class="add-to-cart" data-id="${element.productId}">Add to Cart</button>
        `;

        /*
        prodCard.onclick = function() {
            showProductModal(element);
        }
        */

        prodCard.onclick = function(){
            sessionStorage.setItem("selectedProduct", element.productId);
            window.location.href = "product.html";
        }

        const button = prodCard.querySelector(".add-to-cart");

        button.addEventListener('click', (event) => {
            event.stopPropagation();
            added.style.display = "block";

            let cart = JSON.parse(sessionStorage.getItem("cart")) || [];
            cart.push(element.productId);
            sessionStorage.setItem("cart", JSON.stringify(cart));
        });

        container.appendChild(prodCard);
    });

    const galleryTitle = document.querySelector("#gallery-title h3");
    const total = data.length;
    const start = total === 0 ? 0 : 1;
    const end = total;
    galleryTitle.textContent = `Showing ${start}-${end} out of ${total}`;
}

closeAdded.addEventListener('click', (e) => {
    console.log("Clicked the close button");
    added.style.display = "none";
});

function main(funcflag, product, box){
    if(funcflag == 1){
        let selected = sessionStorage.getItem("selectedbrand");
        const filtered = product.filter(element => element.brand === selected);
        sessionStorage.setItem("flag", 0);
        display(filtered, box);
    } else if (funcflag == 2) {
        let selected = sessionStorage.getItem("selectedcategory");
        const filtered = product.filter(element => element.category === selected);
        sessionStorage.setItem("flag", 0); 
        display(filtered, box);
    } else {
        display(product, box);
    }
}

main(funcflag, product, box);

function applyFilters() {
    const categories = {
        laptop: document.getElementById("laptop").checked,
        peripheral: document.getElementById("peripheral").checked,
        gaming: document.getElementById("gaming").checked,
        networking: document.getElementById("networking").checked,
        keyboard: document.getElementById("keyboard").checked,
        mouse: document.getElementById("mouse").checked,
        speaker: document.getElementById("speaker").checked,
        microphone: document.getElementById("microphone").checked,
        headphone: document.getElementById("headphone").checked,
        console: document.getElementById("console").checked,
        controller: document.getElementById("controller").checked,
        router: document.getElementById("router").checked,
        switch: document.getElementById("switch").checked,
        netcard: document.getElementById("netcard").checked,
        ap: document.getElementById("ap").checked
    };

    const maxPrice = parseInt(document.getElementById("price-max").value);
    document.getElementById("max-price-value").textContent = formatPrice(maxPrice);

    // Check if any filter is selected
    const anyFilterSelected = Object.values(categories).some(v => v);

    const filtered = product.filter(item => {
        // Always apply price filter first
        if (item.price > maxPrice) return false;

        // Show all products if no filters selected (except price)
        if (!anyFilterSelected) return true;

        // Check laptop category separately
        if (categories.laptop && item.category === 'laptop') return true;

        // Check hierarchical categories
        const categoryMatch = Object.entries(categoryHierarchy).some(([parent, subtypes]) => {
            const parentChecked = categories[parent];
            const anySubtypeChecked = subtypes.some(st => categories[st]);

            // Parent category selected without subtypes
            if (parentChecked && !anySubtypeChecked) {
                return item.category === parent;
            }
            
            // Specific subtypes selected
            return anySubtypeChecked && 
                    item.category === parent && 
                    subtypes.some(st => categories[st] && item.type === st);
        });

        return categoryMatch;
    });

    display(filtered, box);
}

// Event listeners
document.getElementById("price-max").addEventListener("input", applyFilters);
document.querySelectorAll('.filter-group input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener("change", applyFilters);
});

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("max-price-value").textContent = formatPrice(document.getElementById("price-max").value);
});

document.querySelector('.sort-select').addEventListener('change', function() {
    const sortValue = this.value;
    let products = [...box.querySelectorAll('.prod-card')].map(card => 
        product.find(p => p.name === card.querySelector('.prod-text-title').textContent)
    );

    switch(sortValue) {
        case 'price-asc': 
            products.sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            products.sort((a, b) => b.price - a.price);
            break;
        case 'name-asc':
            products.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'name-desc':
            products.sort((a, b) => b.name.localeCompare(a.name));
            break;
        default:
            products.sort((a, b) => (b.sales || 0) - (a.sales || 0));
    }
    display(products, box);
});

// Category group handling
document.querySelectorAll('.category-group > .checkbox-container input').forEach(checkbox => {
    checkbox.addEventListener('change', function() {
        const categoryGroup = this.closest('.category-group');
        const subTypes = categoryGroup.querySelector('.sub-types');
        if (subTypes) {
            categoryGroup.classList.toggle('active', this.checked);
            if (!this.checked) {
                subTypes.querySelectorAll('input').forEach(child => child.checked = false);
                applyFilters();
            }
        }
    });
});

//Go back to Login
document.getElementById("acc").addEventListener("click", () => {
    window.location.href = "../html/login.html";
});