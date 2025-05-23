let activeModal = null;

// ============ Signup Functionality ============
if (document.getElementById("sign-in")) {
    document.getElementById("sign-in").addEventListener("click", (e) => {
        e.preventDefault();

        const name = document.getElementById("sign-name").value.trim();
        const email = document.getElementById("sign-em").value.trim();
        const password = document.getElementById("sign-pass").value.trim();
        const phone = document.getElementById("sign-phone").value.trim();

        // Validation
        if (!name || !email || !password || !phone) {
            alert('Please fill in all fields');
            return;
        }

        const storedAccounts = JSON.parse(localStorage.getItem("accounts")) || [];

        if (storedAccounts.some(account => account.email === email)) {
            alert('Email already registered!');
            return;
        }

        const newAccount = {
            name,
            email,
            password,
            phone,
            joined: new Date().toISOString()
        };

        storedAccounts.push(newAccount);
        localStorage.setItem("accounts", JSON.stringify(storedAccounts));

        sessionStorage.setItem("currentUser", JSON.stringify(newAccount));
        updateNavbar();
        window.location.href = "../index.html";
    });
}

// ============ Login Functionality ============
if (document.getElementById("log-in")) {
    document.getElementById("log-in").addEventListener("click", (e) => {
        e.preventDefault();

        const email = document.getElementById("log-em").value.trim();
        const password = document.getElementById("log-pass").value.trim();

        if (!email || !password) {
            alert('Please fill in all fields');
            return;
        }

        const storedAccounts = JSON.parse(localStorage.getItem("accounts")) || [];
        authenticateUser(email, password, storedAccounts);
    });
}

// ============ Authentication Functions ============
function authenticateUser(email, password, accounts) {
    const user = accounts.find(account =>
        account.email === email && account.password === password
    );

    if (user) {
        sessionStorage.setItem("currentUser", JSON.stringify({
            name: user.name,
            email: user.email,
            phone: user.phone
        }));
        updateNavbar();
        window.location.href = "../index.html";
    } else {
        alert('Invalid credentials. Please try again.');
        document.getElementById("log-em").value = "";
        document.getElementById("log-pass").value = "";
    }
}

// ============ Session Management ============
function checkSession() {
    const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));

    if (currentUser) {
        if (window.location.pathname.includes("login.html") ||
            window.location.pathname.includes("signup.html")) {
            alert(`You're already logged in as ${currentUser.name}`);
            window.location.href = "../index.html";
        }
        updateNavbar();
    }
}

function updateNavbar() {
    const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
    const accountIcon = document.getElementById('acc');

    if (accountIcon) {
        accountIcon.innerHTML = currentUser ? `
            <div class="account-dropdown">
                <span>${currentUser.name[0].toUpperCase()}</span>
                <div class="dropdown-content">
                    <p>${currentUser.name}</p>
                    <button id="signout-btn">Sign Out</button>
                </div>
            </div>
        ` : '<i class="fa-solid fa-user" style="font-size: 24px; color: white;"></i>';
    }
}

function signOut() {
    sessionStorage.removeItem("currentUser");
    updateNavbar();
    window.location.href = "index.html";
}

// ============ Initialize ============
document.addEventListener('DOMContentLoaded', () => {
    checkSession();
    updateNavbar();

    // Prevent form submission on Enter
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', (e) => e.preventDefault());
    });
});

// ============ Sign Out Button Handling ============
document.addEventListener('click', (e) => {
    if (e.target && e.target.id === 'signout-btn') {
        signOut();
    }
});

//<div class="icon" id="acc">
//    <i class="fa-solid fa-user" id="profile-icon"></i>
//</div>