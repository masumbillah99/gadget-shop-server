const express = require('express');
const cors = require('cors');
const jwt = require("jsonwebtoken");
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 4000;

// middleware
app.use(cors());
app.use(express.json());


// mongodb client
const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.og57wk2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(url, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
})

const dbConnect = async () => {
    try {
        await client.connect();
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } catch (error) {
        console.log(error.name, error.message);
    }
}

dbConnect();

// apis

app.get("/", (req, res) => {
    res.send(`Server is running .......`);
})

// jwt
app.post("/auth-token", async (req, res) => {
    const userEmail = req.body;
    const token = jwt.sign(userEmail, process.env.ACCESS_JWT_TOKEN, {
        expiresIn: "5d",
    });
    res.send({ token });
})

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})