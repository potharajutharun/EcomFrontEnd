const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const fs = require('fs');
const Customer = require('./models/Customer');
const UserDetails = require('./models/UserDetails');
const File = require('./models/FileSchema');
require('dotenv').config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));





const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const dir = 'uploads/';
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        cb(null, dir);
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });



app.post('/upload', upload.single('profileImage'), async (req, res) => {
    try {
        const file = new File({
            fileName: req.file.filename,
            path: req.file.path,
            title: req.body.title,
            description: req.body.description,
            price: req.body.price
        });

        await file.save();
        res.send('File and data uploaded and saved in MongoDB successfully!');
    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).send('Error uploading file: ' + error.message);
    }
});


app.get('/', (req, res) => {
    res.send('Hello, world!');
});

let loggedInUserEmail = null;

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const customer = await Customer.findOne({ email, password });

        if (!customer) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        loggedInUserEmail = customer.email;
        res.status(200).json({ message: 'Login successful', customer });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: error.message });
    }
});

app.post('/register', async (req, res) => {
    try {
        const { email, password, repassword } = req.body;

        const existingCustomer = await Customer.findOne({ email });
        if (existingCustomer) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        const newCustomer = new Customer({ email, password, repassword });
        await newCustomer.save();

        res.status(201).json({ message: 'Registration successful', newCustomer });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: error.message });
    }
});

app.post('/userdetails', upload.single('profileImage'), async (req, res) => {
    try {
        const { name, dob, address, paymentMethod, phoneNumber, gender } = req.body;

        if (!loggedInUserEmail) {
            return res.status(400).json({ message: 'User is not logged in' });
        }

        const existingUser = await UserDetails.findOne({ email: loggedInUserEmail });
        if (existingUser) {
            return res.status(400).json({ message: 'User details already exist' });
        }

        const newUserDetails = new UserDetails({
            email: loggedInUserEmail,
            name,
            dob,
            address,
            profileImage: req.file ? req.file.path : '',
            paymentMethod,
            phoneNumber,
            gender
        });

        await newUserDetails.save();
        res.status(201).json({ message: 'Data updated successfully', newUserDetails });
    } catch (error) {
        console.error('User details error:', error);
        res.status(500).json({ error: error.message });
    }
});

app.get('/userdetails', async (req, res) => {
    try {
        const userDetails = await UserDetails.find();
        res.status(200).json(userDetails);
    } catch (error) {
        console.error('Get user details error:', error);
        res.status(500).json({ error: error.message });
    }
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
