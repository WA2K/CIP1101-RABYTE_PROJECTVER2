        document.addEventListener('DOMContentLoaded', function() {
            const signupForm = document.getElementById('signupForm');

            signupForm.addEventListener('submit', function(e) {
                e.preventDefault();

                const name = document.getElementById('sign-name').value.trim();
                const email = document.getElementById('sign-em').value.trim();
                const phone = document.getElementById('sign-phone').value.trim();
                const password = document.getElementById('sign-pass').value;
                const confirmPassword = document.getElementById('sign-confirm-pass').value;

                document.querySelectorAll('.error-message').forEach(el => el.style.display = 'none');
                document.querySelectorAll('input').forEach(el => el.classList.remove('error'));

                let isValid = true;

                if (!name) {
                    showError('sign-name', 'Full name is required');
                    isValid = false;
                }

                if (!email) {
                    showError('sign-em', 'Email is required');
                    isValid = false;
                } else if (!validateEmail(email)) {
                    showError('sign-em', 'Please enter a valid email');
                    isValid = false;
                }

                if (!phone) {
                    showError('sign-phone', 'Phone number is required');
                    isValid = false;
                }

                if (!password) {
                    showError('sign-pass', 'Password is required');
                    isValid = false;
                } else if (password.length < 8) {
                    showError('sign-pass', 'Password must be at least 8 characters');
                    isValid = false;
                }

                if (password !== confirmPassword) {
                    showError('sign-confirm-pass', 'Passwords do not match');
                    isValid = false;
                }

                if (isValid) {
                    const newAccount = {
                        name: name,
                        email: email,
                        phone: phone,
                        password: password
                    };

                    const storedAccounts = JSON.parse(localStorage.getItem('accounts')) || [];
                    const emailExists = storedAccounts.some(account => account.email === email);

                    if (emailExists) {
                        showError('sign-em', 'Email already registered');
                        return;
                    }

                    storedAccounts.push(newAccount);
                    localStorage.setItem('accounts', JSON.stringify(storedAccounts));
                    alert('Account created successfully!');
                    window.location.href = 'logintest.html';
                }
            });

            function showError(fieldId, message) {
                const field = document.getElementById(fieldId);
                field.classList.add('error');

                let errorElement = field.nextElementSibling;
                if (!errorElement || !errorElement.classList.contains('error-message')) {
                    errorElement = document.createElement('div');
                    errorElement.className = 'error-message';
                    field.parentNode.insertBefore(errorElement, field.nextSibling);
                }

                errorElement.textContent = message;
                errorElement.style.display = 'block';
            }

            function validateEmail(email) {
                const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return re.test(email);
            }
        });