const initializeDb = require("../db/database");

// GET /api/customers
exports.getAllCustomers = async (req, res) => {
  const db = await initializeDb();

  const {
    search = "",
    city = "",
    state = "",
    pin_code = "",
    address_details = "",
    sort_by = "id",
    sort_order = "asc",
    page = 1,
  } = req.query;

  const limit = 5;
  const offset = (page - 1) * limit;

  const orderByWhitelist = [
    "first_name",
    "last_name",
    "phone_number",
    "city",
    "state",
    "pin_code",
    "address_details",
  ];

  const orderBy = orderByWhitelist.includes(sort_by) ? sort_by : "customers.id";
  const orderDir = sort_order.toLowerCase() === "desc" ? "DESC" : "ASC";

  const whereClauses = [];
  const params = [];

  // Search in customer fields
  if (search) {
    const likeSearch = `%${search.toLowerCase()}%`;
    whereClauses.push(`
    (
      LOWER(customers.first_name) LIKE ? OR
      LOWER(customers.last_name) LIKE ? OR
      LOWER(customers.phone_number) LIKE ? OR
      LOWER(customers.first_name || ' ' || customers.last_name) LIKE ?
    )
  `);
    params.push(likeSearch, likeSearch, likeSearch, likeSearch);
  }

  // Filter from address table
  if (city) {
    whereClauses.push("LOWER(addresses.city) LIKE ?");
    params.push(`%${city.toLowerCase()}%`);
  }

  if (state) {
    whereClauses.push("LOWER(addresses.state) LIKE ?");
    params.push(`%${state.toLowerCase()}%`);
  }

  if (pin_code) {
    whereClauses.push("addresses.pin_code LIKE ?");
    params.push(`%${pin_code}%`);
  }

  if (address_details) {
    whereClauses.push("LOWER(addresses.address_details) LIKE ?");
    params.push(`%${address_details.toLowerCase()}%`);
  }

  const whereSQL =
    whereClauses.length > 0 ? `WHERE ${whereClauses.join(" AND ")}` : "";

  const sql = `
  SELECT DISTINCT customers.id, customers.first_name, customers.last_name, customers.phone_number
  FROM customers
  LEFT JOIN addresses ON customers.id = addresses.customer_id
  ${whereSQL}
  ORDER BY ${orderBy} ${orderDir}
  LIMIT ? OFFSET ?
`;

  const countSql = `
  SELECT COUNT(DISTINCT customers.id) as count
  FROM customers
  LEFT JOIN addresses ON customers.id = addresses.customer_id
  ${whereSQL}
`;

  try {
    const data = await db.all(sql, [...params, limit, offset]);
    const countResult = await db.get(countSql, params);
    const total = countResult.count;

    res.json({ data, total });
  } catch (err) {
    console.error("Error fetching customers:", err);
    res.status(500).json({ error: err.message });
  }
};

// POST /api/customers
exports.createCustomer = async (req, res) => {
  const db = await initializeDb();
  const {
    first_name,
    last_name,
    phone_number,
    address_details,
    city,
    state,
    pin_code,
  } = req.body;

  if (
    !first_name ||
    !last_name ||
    !phone_number ||
    !address_details ||
    !city ||
    !state ||
    !pin_code
  ) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    await db.exec("BEGIN TRANSACTION");

    const result = await db.run(
      `INSERT INTO customers (first_name, last_name, phone_number) VALUES (?, ?, ?)`,
      [first_name, last_name, phone_number]
    );

    const customer_id = result.lastID;

    await db.run(
      `INSERT INTO addresses (customer_id, address_details, city, state, pin_code) VALUES (?, ?, ?, ?, ?)`,
      [customer_id, address_details, city, state, pin_code]
    );

    await db.exec("COMMIT");
    res
      .status(201)
      .json({ message: "Customer and address created", customer_id });
  } catch (err) {
    await db.exec("ROLLBACK");
    res.status(500).json({ error: err.message });
  }
};

// GET /api/customers/:id
exports.getCustomerById = async (req, res) => {
  const db = await initializeDb();
  const id = req.params.id;

  try {
    const customer = await db.get(`SELECT * FROM customers WHERE id = ?`, [id]);

    if (!customer) {
      return res.status(404).json({ error: "Customer not found" });
    }

    res.json(customer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT /api/customers/:id
exports.updateCustomer = async (req, res) => {
  const db = await initializeDb();
  const id = req.params.id;
  const { first_name, last_name, phone_number } = req.body;

  try {
    const result = await db.run(
      `UPDATE customers SET first_name = ?, last_name = ?, phone_number = ? WHERE id = ?`,
      [first_name, last_name, phone_number, id]
    );

    if (result.changes === 0) {
      return res.status(404).json({ error: "Customer not found" });
    }

    res.json({ message: "Customer updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE /api/customers/:id
exports.deleteCustomer = async (req, res) => {
  const db = await initializeDb();
  const id = req.params.id;

  try {
    await db.exec("BEGIN TRANSACTION");

    await db.run(`DELETE FROM addresses WHERE customer_id = ?`, [id]);

    const result = await db.run(`DELETE FROM customers WHERE id = ?`, [id]);

    if (result.changes === 0) {
      await db.exec("ROLLBACK");
      return res.status(404).json({ error: "Customer not found" });
    }

    await db.exec("COMMIT");
    res.json({ message: "Customer and related addresses deleted" });
  } catch (err) {
    await db.exec("ROLLBACK");
    res.status(500).json({ error: err.message });
  }
};
