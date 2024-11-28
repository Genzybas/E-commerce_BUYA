document.getElementById('toggleButton').onclick = function() {
    const signupForm = document.getElementById('signupForm');
    const loginForm = document.getElementById('loginForm');
    const isLogin = loginForm.classList.contains('hidden');

       if (isLogin) {
        signupForm.classList.add('hidden');
        loginForm.classList.remove('hidden');
        this.textContent = "New User? Sign Up";
    } else {
        loginForm.classList.add('hidden');
        signupForm.classList.remove('hidden');
        this.textContent = "Already a user? Login";
    }
};

document.getElementById('signupForm').onsubmit = function(event) {
    event.preventDefault();
    alert('Sign up successful! Redirecting to the dashboard...');
    // Redirect to the dashboard (mock)
    window.location.href = 'cart.html';
};

document.getElementById('loginForm').onsubmit = function(event) {
    event.preventDefault();
    alert('Login successful! Redirecting to the dashboard...');
    // Redirect to the dashboard (mock)
    window.location.href = 'cart.html';
};