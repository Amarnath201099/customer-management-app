const express = require("express");
const router = express.Router();
const addressController = require("../controllers/address.controller");

router.post("/customers/:id/addresses", addressController.addAddress);
router.get(
  "/customers/:id/addresses",
  addressController.getAddressesByCustomer
);
router.put("/addresses/:addressId", addressController.updateAddress);
router.delete("/addresses/:addressId", addressController.deleteAddress);

module.exports = router;
