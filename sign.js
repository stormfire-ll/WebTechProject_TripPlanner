
function validateForm() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    if (email === '' || password === '') {
        alert("Please fill in both the username and password fields.");
        return false;
    }

    // Send the credentials to the server for authentication
    authenticateUser(email, password);
}

function authenticateUser(email, password) {
    
    axios.post('/login', {
        email: email,
        password: password
    })
    .then(function(response) {
        var token = response.data.token; // Assuming the server sends the token as 'token' in the response
        // Store the token in localStorage or sessionStorage
        // For example, using localStorage:
        localStorage.setItem('token', token);

        // Redirect the user to the authenticated page
        window.location.href = '/authenticated-page';
    })
    .catch(function(error) {
        console.error(error);
        alert('Failed to authenticate. Please check your credentials and try again.');
    });
}





const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

// Handle login route
app.post('/login', (req, res) => {
    // Validate the user's credentials and perform authentication
    const email = req.body.email;
    const password = req.body.password;

    // Example authentication logic
    if (email === 'user@example.com' && password === 'password') {
        // Generate a JWT token
        const token = jwt.sign({ email: email }, 'your-secret-key');

        // Send the token back as the response
        res.json({ token: token });
    } else {
        // Authentication failed
        res.status(401).json({ error: 'Authentication failed' });
    }
});

// Other routes and server configuration...

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
