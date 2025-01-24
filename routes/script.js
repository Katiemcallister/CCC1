document.addEventListener("DOMContentLoaded", function() {
    let email = document.getElementById("email");
    let emailError = document.getElementById("email-error");
    let password = document.getElementById("password");
    let showPass = document.querySelector(".show-pass i");
    let emailLabel = email.parentElement.querySelector("i");
    let passwordLabel = password.parentElement.querySelector("i");
    let formTitle = document.getElementById("form-title");
    let formContent = document.getElementById("form-content");
    let loading = document.getElementById("loading");
    let signupLink = document.getElementById("signup-link");
    let submitButton = document.getElementById("submit-button");
    let navLinks = document.getElementById("nav-links");
    let loginContainer = document.getElementById("login-container");
    let userTableContainer = document.getElementById("user-table-container");
    let userTableBody = document.getElementById("user-table-body");
    let helloWorld = document.getElementById("hello-world");

    function togglePasswordVisibility() {
        if (password.type === "password") {
            password.type = "text";
            showPass.classList.remove("fa-eye");
            showPass.classList.add("fa-eye-slash");
        } else {
            password.type = "password";
            showPass.classList.remove("fa-eye-slash");
            showPass.classList.add("fa-eye");
        }
    }

    document.querySelector(".show-pass").addEventListener("click", togglePasswordVisibility);

    // Hide the "Email" label if the user types anything
    email.addEventListener("input", function() {
        if (email.value.trim().length > 0) {
            emailLabel.style.transform = "translateY(-150%)";
            emailLabel.style.fontSize = "0.8em";
            emailLabel.style.color = "#333";
        } else {
            emailLabel.style.transform = "translateY(0)";
            emailLabel.style.fontSize = "1em";
            emailLabel.style.color = "#aaa";
        }
    });

    email.addEventListener("blur", function() {
        let val = email.value.trim();
        if (!val.endsWith("@gmail.com") || val.length <= 10) {
            emailError.style.display = "block";
        } else {
            emailError.style.display = "none";
        }
    });

    signupLink.addEventListener("click", function(event) {
        event.preventDefault();
        formTitle.textContent = "Sign Up";
        formContent.innerHTML = `
            <div class="inputBox">
                <input type="text" id="username" required>
                <i>Username</i>
            </div>
            <div class="inputBox">
                <input type="email" id="signup-email" required maxlength="50">
                <i>Email</i>
                <div id="signup-email-error" style="display: none; color: red;">Not a valid email!</div>
            </div>
            <div class="inputBox">
                <input type="password" id="signup-password" required maxlength="20">
                <i>Password</i>
                <span class="show-pass">
                    <i class="fas fa-eye"></i>
                </span>
                <div id="popover-password">
                    <div class="progress">
                        <div id="password-strength" class="progress-bar" role="progressbar"></div>
                    </div>
                </div>
            </div>
            <div class="inputBox">
                <input type="password" id="confirm-password" required maxlength="20">
                <i>Confirm Password</i>
            </div>
            <div class="inputBox">
                <p>Want to <a href="/">sign in</a>?</p>
            </div>
            <div class="inputBox">
                <input type="submit" value="Sign Up" id="signup-button">
            </div>
        `;
        document.querySelector(".show-pass").addEventListener("click", togglePasswordVisibility);

        let signupPassword = document.getElementById("signup-password");
        let confirmPassword = document.getElementById("confirm-password");
        let passwordStrength = document.getElementById("password-strength");

        signupPassword.addEventListener("input", function() {
            let pass = signupPassword.value;
            if (pass.length === 0) {
                passwordStrength.style.width = "0%";
                passwordStrength.style.background = "transparent";
                return;
            }
            if (signupPassword.value.length > 20) {
                signupPassword.value = signupPassword.value.substring(0, 20);
            }

            let strength = 0;

            if (pass.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) strength += 1;
            if (pass.match(/([0-9])/)) strength += 1;
            if (pass.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) strength += 1;
            if (pass.length > 7) strength += 1;

            switch(strength) {
                case 0:
                    passwordStrength.style.width = "1%";
                    passwordStrength.style.background = "#ff0000";
                    break;
                case 1:
                    passwordStrength.style.width = "25%";
                    passwordStrength.style.background = "#ff2200";
                    break;
                case 2:
                    passwordStrength.style.width = "50%";
                    passwordStrength.style.background = "#ffa500";
                    break;
                case 3:
                    passwordStrength.style.width = "75%";
                    passwordStrength.style.background = "#00bcd4";
                    break;
                case 4:
                    passwordStrength.style.width = "100%";
                    passwordStrength.style.background = "#4CAF50";
                    break;
            }
        });

        document.getElementById("signup-button").addEventListener("click", function(event) {
            event.preventDefault();
            let username = document.getElementById("username").value.trim();
            let email = document.getElementById("signup-email").value.trim();
            let password = signupPassword.value.trim();
            let confirmPasswordValue = confirmPassword.value.trim();

            if (password !== confirmPasswordValue) {
                alert("Passwords do not match!");
                return;
            }

            formContent.style.display = "none";
            loading.style.display = "block";

            setTimeout(function() {
                loading.style.display = "none";
                formContent.style.display = "block";
                formTitle.textContent = "Sign In";
                formContent.innerHTML = `
                    <div class="inputBox">
                        <input type="email" id="email" required maxlength="50">
                        <i>Email</i>
                        <div id="email-error" style="display: none; color: red;">Not a valid email!</div>
                    </div>
                    <div class="inputBox">
                        <input type="password" id="password" required maxlength="20">
                        <i>Password</i>
                        <span class="show-pass">
                            <i class="fas fa-eye"></i>
                        </span>
                    </div>
                    <div class="links">
                        <a href="#" id="forgot-password">Forgot Password</a>
                        <a href="#" id="signup-link">Signup</a>
                    </div>
                    <div class="inputBox">
                        <input type="submit" value="Login" id="submit-button">
                    </div>
                `;
                document.querySelector(".show-pass").addEventListener("click", togglePasswordVisibility);
                document.getElementById("signup-link").addEventListener("click", function(event) {
                    event.preventDefault();
                    formTitle.textContent = "Sign Up";
                    formContent.innerHTML = `
                        <div class="inputBox">
                            <input type="text" id="username" required>
                            <i>Username</i>
                        </div>
                        <div class="inputBox">
                            <input type="email" id="signup-email" required maxlength="50">
                            <i>Email</i>
                            <div id="signup-email-error" style="display: none; color: red;">Not a valid email!</div>
                        </div>
                        <div class="inputBox">
                            <input type="password" id="signup-password" required maxlength="20">
                            <i>Password</i>
                            <span class="show-pass">
                                <i class="fas fa-eye"></i>
                            </span>
                            <div id="popover-password">
                                <div class="progress">
                                    <div id="password-strength" class="progress-bar" role="progressbar"></div>
                                </div>
                            </div>
                        </div>
                        <div class="inputBox">
                            <input type="password" id="confirm-password" required maxlength="20">
                            <i>Confirm Password</i>
                        </div>
                        <div class="inputBox">
                            <p>Want to <a href="/">sign in</a>?</p>
                        </div>
                        <div class="inputBox">
                            <input type="submit" value="Sign Up" id="signup-button">
                        </div>
                    `;
                    document.querySelector(".show-pass").addEventListener("click", togglePasswordVisibility);
                });

                // Save user details to users.json
                fetch('/user/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: username,
                        email: email,
                        password: password
                    })
                }).then(response => {
                    if (response.ok) {
                        alert('User registered successfully');
                    } else {
                        alert('Error registering user');
                    }
                });
            }, 2000);
        });
    });

    submitButton.addEventListener("click", function(event) {
        event.preventDefault();
        let emailValue = email.value.trim();
        let passwordValue = password.value.trim();

        fetch('/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: emailValue,
                password: passwordValue
            })
        }).then(response => response.json())
        .then(data => {
            if (data.success) {
                loginContainer.style.display = 'none';
                helloWorld.style.display = 'block';
                navLinks.style.display = 'block';
                if (window.location.pathname === '/users') {
                    userTableContainer.style.display = 'block';
                    fetch('/user')
                        .then(response => response.json())
                        .then(users => {
                            users.forEach(user => {
                                let row = document.createElement('tr');
                                row.innerHTML = `
                                    <td>${user.name}</td>
                                    <td>${user.email}</td>
                                    <td>${user.password}</td>
                                    <td>${user.role || ''}</td>
                                    <td><a href="/user/${user.id}">View</a></td>
                                    <td><a href="/user/update/${user.id}">Edit</a></td>
                                    <td><a href="/user/delete/${user.id}">Delete</a></td>
                                `;
                                userTableBody.appendChild(row);
                            });
                        });
                }
            } else {
                alert('Invalid email or password');
            }
        });
    });
});
