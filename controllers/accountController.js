const users = [
    {
        userName: 'testuser',
        password: 'password123' // In a real application, passwords should be hashed and stored securely.
    }
];

exports.userLogin = async (req, res) => {
    const { userName, password } = req.body;

    // Validate input
    if (!userName || !password) {
        return res.status(400).json({ message: 'User name and password are required' });
    }

    try {
        // Check if the user exists
        const user = users.find(u => u.userName === userName);

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Check if the password matches
        if (user.password !== password) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // If credentials are valid, respond with a success message
        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        // Handle any errors that occur during login
        res.status(500).json({ message: 'An error occurred during login', error: error.message });
    }
};
