const express = require("express");
const cors = require("cors");
const customerRoutes = require("./routes/customer.route");
const addressRoutes = require("./routes/address.route");
const initializeDb = require("./db/database");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/customers", customerRoutes);
app.use("/api", addressRoutes);

const PORT = process.env.PORT || 5000;

initializeDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to initialize database:", err.message);
  });
