const express = require("express");
const router = express.Router();
const {
  createProduct,
  getProducts,
  insertManyProducts
} = require("../controllers/productController");

router.post("/", createProduct);
router.get("/", getProducts);
router.post("/bulk", insertManyProducts);

module.exports = router;