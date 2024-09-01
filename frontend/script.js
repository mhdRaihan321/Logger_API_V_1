// Function to handle registration
document.getElementById('register-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const username = document.getElementById('reg-username').value;
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;
    const password2 = document.getElementById('reg-confirm-password').value;

    // Check if the password and confirmation password match
    if (password !== password2) {
        alert('Passwords do not match!');
        return;
    }
    
    // If passwords match, proceed with registration
    fetch('http://localhost:8000/register/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username,
            email: email,
            password: password,
            password2: password
        }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Registration Success:', data);
        alert('Registration successful! Token: ' + data.token);
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('Registration failed!');
    });
});


// Function to handle login
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    
    fetch('http://localhost:8000/login/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username,
            password: password
        }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Login Success:', data);
        localStorage.setItem('token', data.token);  // Store the token for later use
        alert('Login successful! Token: ' + data.token);
        loadWelcomeMessage();
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('Login failed!');
    });
});

// Function to load welcome message
function loadWelcomeMessage() {
    const token = localStorage.getItem('token');
    if (token) {
        fetch('http://localhost:8000/welcome/', {
            method: 'GET',
            headers: {
                'Authorization': `Token ${token}`,
            },
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById('welcome-message').innerText = `Welcome ${data.user}, your ID is ${data.userid}`;
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('Failed to load welcome message');
        });
    }
}

// Function to load user details
function loadUserDetails(userId) {
    fetch(`http://localhost:8000/userDetails/${userId}/`)
    .then(response => response.json())
    .then(data => {
        document.getElementById('user-details').innerText = JSON.stringify(data, null, 2);
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('Failed to load user details');
    });
}

// Example of loading user details
// loadUserDetails(1);  // Replace 1 with the actual user ID
