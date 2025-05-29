document.getElementById("acc").addEventListener("click", () => {
    window.location.href = "html/login.html";
});

document.getElementById("razer").addEventListener("click", () => {
    sessionStorage.setItem("selectedbrand", "RAZER");
    sessionStorage.setItem("flag", 1);
    window.location.href = "html/gallery.html";
});

document.getElementById("logitech").addEventListener("click", () => {
    sessionStorage.setItem("selectedbrand", "LOGITECH");
    sessionStorage.setItem("flag", 1);
    window.location.href = "html/gallery.html";
});

document.getElementById("msi").addEventListener("click", () => {
    sessionStorage.setItem("selectedbrand", "MSI");
    sessionStorage.setItem("flag", 1);
    window.location.href = "html/gallery.html";
});

document.getElementById("tuf").addEventListener("click", () => {
    sessionStorage.setItem("selectedbrand", "TUF");
    sessionStorage.setItem("flag", 1);
    window.location.href = "html/gallery.html";
});

document.getElementById("rd").addEventListener("click", () => {
    sessionStorage.setItem("selectedbrand", "REDDRAGON");
    sessionStorage.setItem("flag", 1);
    window.location.href = "html/gallery.html";
});

document.getElementById("corsair").addEventListener("click", () => {
    sessionStorage.setItem("selectedbrand", "CORSAIR");
    sessionStorage.setItem("flag", 1);
    window.location.href = "html/gallery.html";
});

// vvv CATEGORIES VVV //

document.getElementById("laptop").addEventListener("click", () => {
    sessionStorage.setItem("selectedcategory", "laptop");
    sessionStorage.setItem("flag", 2);
    window.location.href = "html/gallery.html";
});

document.getElementById("peripheral").addEventListener("click", () => {
    sessionStorage.setItem("selectedcategory", "peripheral");
    sessionStorage.setItem("flag", 2);
    window.location.href = "html/gallery.html";
});

document.getElementById("networking").addEventListener("click", () => {
    sessionStorage.setItem("selectedcategory", "networking");
    sessionStorage.setItem("flag", 2);
    window.location.href = "html/gallery.html";
});

document.getElementById("gaming").addEventListener("click", () => {
    sessionStorage.setItem("selectedcategory", "gaming");
    sessionStorage.setItem("flag", 2);
    window.location.href = "html/gallery.html";
});

// ^^^ CATEGORIES ^^^ //

//MacBook Air 13-inch
document.getElementById("laptop1").addEventListener("click", () => {
    sessionStorage.setItem("selectedProduct", 11);
    window.location.href = "html/product.html";
});

//HP 15S-EQ2323AU/ RYZEN 3-5300U
document.getElementById("laptop2").addEventListener("click", () => {
    sessionStorage.setItem("selectedProduct", 7);
    window.location.href = "html/product.html";
});

//LOGITECH G413 TKL KEYBOARD MECHANICAL
document.getElementById("perp1").addEventListener("click", () => {
    sessionStorage.setItem("selectedProduct", 18);
    window.location.href = "html/product.html";
});

//RAZER BARRACUDA X (2022) BLACK
document.getElementById("perp2").addEventListener("click", () => {
    sessionStorage.setItem("selectedProduct", 29);
    window.location.href = "html/product.html";
});

//UBIQUITI USW-Ultra-60W Switch
document.getElementById("net1").addEventListener("click", () => {
    sessionStorage.setItem("selectedProduct", 45);
    window.location.href = "html/product.html";
});

//ZYXEL GS1915-8EP 8-port GbE Smart Managed Switch
document.getElementById("net2").addEventListener("click", () => {
    sessionStorage.setItem("selectedProduct", 44);
    window.location.href = "html/product.html";
});

//WII ARCADE FIGHTER
document.getElementById("game1").addEventListener("click", () => {
    sessionStorage.setItem("selectedProduct", 57);
    window.location.href = "html/product.html";
});

//Sony Playstation PS5 Console Digital Version 30th Anniversary Edition (CFI-2000 B30)
document.getElementById("game2").addEventListener("click", () => {
    sessionStorage.setItem("selectedProduct", 51);
    window.location.href = "html/product.html";
});

// vvv === HOMEPAGE RESPONSIVENESS === VVV //

// === Responsive Hot Picks === //
           
const container = document.querySelector('.image-container-hot-picks');
const leftBtn = document.querySelector('.hot-pick-arrow.left');
const rightBtn = document.querySelector('.hot-pick-arrow.right');

const scrollAmount = 247; // amount to scroll in px (a bit more than 212px image width)

leftBtn.addEventListener('click', () => {
    container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
});

rightBtn.addEventListener('click', () => {
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
});


// === Responsive New Arrivals === //
const newArrivalsContainer = document.querySelector('#New_Arrivals .item-containers');
const newArrivalsLeftBtn = document.querySelector('.new-arrivals-arrow.left');
const newArrivalsRightBtn = document.querySelector('.new-arrivals-arrow.right');

const scrollAmount2 = 265; // adjust scroll distance as you like

newArrivalsLeftBtn.addEventListener('click', () => {
    newArrivalsContainer.scrollBy({
        left: -scrollAmount2,
        behavior: 'smooth'
    });
});

newArrivalsRightBtn.addEventListener('click', () => {
    newArrivalsContainer.scrollBy({
        left: scrollAmount2,
        behavior: 'smooth'
    });
});

// === Gallery Page Functionality === //
const carouselElement = document.querySelector('#carouselExampleFade');
const carousel = new bootstrap.Carousel(carouselElement);

document.querySelector('.carousel-arrow.left').addEventListener('click', () => {
carousel.prev();
});

document.querySelector('.carousel-arrow.right').addEventListener('click', () => {
carousel.next();
});

// ^^^ === HOMEPAGE RESPONSIVENESS === ^^^ //