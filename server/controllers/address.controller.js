const initializeDb = require("../db/database");

// POST /api/customers/:id/addresses
exports.addAddress = async (req, res) => {
  const customer_id = req.params.id;
  const { address_details, city, state, pin_code } = req.body;

  if (!address_details || !city || !state || !pin_code) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const db = await initializeDb();
    const result = await db.run(
      `INSERT INTO addresses (customer_id, address_details, city, state, pin_code) VALUES (?, ?, ?, ?, ?)`,
      [customer_id, address_details, city, state, pin_code]
    );

    res.status(201).json({ id: result.lastID, message: "Address added" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/customers/:id/addresses
exports.getAddressesByCustomer = async (req, res) => {
  const customer_id = req.params.id;

  try {
    const db = await initializeDb();
    const rows = await db.all(`SELECT * FROM addresses WHERE customer_id = ?`, [
      customer_id,
    ]);

    res.json({ data: rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT /api/addresses/:addressId
exports.updateAddress = async (req, res) => {
  const id = req.params.addressId;
  const { address_details, city, state, pin_code } = req.body;

  try {
    const db = await initializeDb();
    const result = await db.run(
      `UPDATE addresses SET address_details = ?, city = ?, state = ?, pin_code = ? WHERE id = ?`,
      [address_details, city, state, pin_code, id]
    );

    if (result.changes === 0) {
      return res.status(404).json({ error: "Address not found" });
    }

    res.json({ message: "Address updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE /api/addresses/:addressId
exports.deleteAddress = async (req, res) => {
  const id = req.params.addressId;

  try {
    const db = await initializeDb();
    const result = await db.run(`DELETE FROM addresses WHERE id = ?`, [id]);

    if (result.changes === 0) {
      return res.status(404).json({ error: "Address not found" });
    }

    res.json({ message: "Address deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
