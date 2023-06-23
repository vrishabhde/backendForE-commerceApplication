import Users from "../models/register.js";
import encrypt from 'encryptjs';
import axios from "axios";



export const addproduct = async (req, res) => {

    const fakestoreApiUrl = 'https://fakestoreapi.com/';

    try {
        const { id, title, price, description, image, category } = req.body;

        const response = await Users.find({ _id: id }).exec();

        const product = await axios.post(`${fakestoreApiUrl}products`, {
            title,
            price,
            description,
            category,
            image,
        });
        res.json(product.data);

    } catch (err) {
        return res.send(err);
    }
};



export const getAllProducts = async (req, res) => {

    const fakestoreApiUrl = 'https://fakestoreapi.com/';

    try {

        const response = await axios.get(`${fakestoreApiUrl}products`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};


export const getProductById = async (req, res) => {

    const fakestoreApiUrl = 'https://fakestoreapi.com/';

    try {
        const { id, _id, pin } = req.body;
        const check = await Users.find({_id:_id}).exec();
        if(check[0].role != "seller") return res.send("cannot get products");
        const secretkey = 'vrushabh';
        const decipherForPin = encrypt.decrypt(check[0].pin, secretkey, 256);
        if(decipherForPin != pin) return res.send("incorrect pin");
        
        const response = await axios.get(`${fakestoreApiUrl}products/${id}`);
        res.json(response.data);
    } catch (error) {
        res.status(404).json({ error: 'Product not found' });
    }
};


export const updateProduct = async (req, res) => {
    const fakestoreApiUrl = 'https://fakestoreapi.com/';

    const { id } = req.body;
    const { title, price, description, category, image } = req.body;
    try {
        const response = await axios.put(`${fakestoreApiUrl}products/${id}`, {
            title,
            price,
            description,
            category,
            image,
        });
        res.json(response.data);
    } catch (error) {
        res.status(404).json({ error: 'Product not found' });
    }
};


export const deleteProduct = async (req, res) => {
    const fakestoreApiUrl = 'https://fakestoreapi.com/';

    const { id } = req.body;
    try {
        await axios.delete(`${fakestoreApiUrl}products/${id}`);
        // res.sendStatus(204);
        return res.send("product deleted");
    } catch (error) {
        res.status(404).json({ error: 'Product not found' });
    }
};

