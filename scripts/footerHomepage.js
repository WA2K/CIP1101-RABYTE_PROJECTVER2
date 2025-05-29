// vvv CATEGORIES VVV //

document.getElementById("f1").addEventListener("click", () => {
    sessionStorage.setItem("selectedcategory", "laptop");
    sessionStorage.setItem("flag", 2);
    window.location.href = "html/gallery.html";
});

document.getElementById("f2").addEventListener("click", () => {
    sessionStorage.setItem("selectedcategory", "peripheral");
    sessionStorage.setItem("flag", 2);
    window.location.href = "html/gallery.html";
});

document.getElementById("f3").addEventListener("click", () => {
    sessionStorage.setItem("selectedcategory", "gaming");
    sessionStorage.setItem("flag", 2);
    window.location.href = "html/gallery.html";
});

document.getElementById("f4").addEventListener("click", () => {
    sessionStorage.setItem("selectedcategory", "networking");
    sessionStorage.setItem("flag", 2);
    window.location.href = "html/gallery.html";
});

// ^^^ CATEGORIES ^^^ //