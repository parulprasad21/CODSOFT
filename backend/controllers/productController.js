const Product = require("../models/Product");

// CREATE PRODUCT
const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL PRODUCTS
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const insertManyProducts = async (req, res) => { 
    try { const products = await Product.insertMany(req.body); res.status(201).json(products); 

    } catch (error) {
         res.status(500).json({ message: error.message });
         } }

module.exports = { createProduct, getProducts, insertManyProducts };