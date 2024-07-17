const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../schemas/userSchema');

const { uploadSingle } = require('../utils/helper');
const { jwtSecret } = require('../config/config');


// LOGIN
exports.userLogin = async (req, res) => {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
        return res.status(400).json({ message: 'User email and password are required' });
    }

    try {
        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Check if the password matches
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }


        // generate token
        const token = jwt.sign({
            role: user.role,
            fullName: user.fullName,
            id: user._id
        }, jwtSecret, {
            expiresIn: '7d'
        });

        const responseBody = {
            fullName: user.fullName,
            email: user.email,
            phone: user.phone,
            role: user.role,
            userImage: user.userImage,
            permissions: user.permissions,
            jwtToken: token
        }

        res.status(200).json(responseBody);
    } catch (error) {
        // Handle any errors that occur during login
        res.status(500).json({ message: 'An error occurred during login', error: error.message });
    }
};

// SIGNUP
exports.registerUser = async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName: req.body.fullName,
            password: hashedPassword,
            email: req.body.email,
            address: req.body.address || '',
            phone: req.body.phone
        });

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred during registration', error: error.message });
    }
};

// UPDATE USER
exports.updateUser = async (req, res) => {
    const { id } = req.params;

    try {
        const file = await uploadSingle('userImage')(req, res);

        const updateData = {
            fullName: req.body.fullName,
            email: req.body.email,
            address: req.body.address,
            phone: req.body.phone,
            role: req.body.role,
            permissions: req.body.permissions,
        };

        if (file) {
            updateData.userImage = file.path.replace(/\\/g, '/'); // Normalize path
        }

        const user = await User.findByIdAndUpdate(id, updateData, { new: true });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        if (error.message.includes('MulterError')) {
            res.status(400).json({ message: 'File upload error', error: error.message });
        } else {
            res.status(500).json({ message: 'An error occurred during the update', error: error.message });
        }
    }
};

// GET USER
exports.getUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while fetching the user data', error: error.message });
    }
};

// Get ALL USER
exports.getAllUser = async (req, res) => {
    try {
        const users = await User.find({}, { password: 0 });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while fetching the users', error: error.message });
    }
};