import { useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

function AddressForm({ customerId, address = null, onCancel, onSuccess }) {
  const [form, setForm] = useState({
    address_details: "",
    city: "",
    state: "",
    pin_code: "",
  });

  useEffect(() => {
    if (address) {
      setForm({
        address_details: address.address_details,
        city: address.city,
        state: address.state,
        pin_code: address.pin_code,
      });
    }
  }, [address]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      if (address) {
        await axios.put(`${API_BASE_URL}/api/addresses/${address.id}`, form);
      } else {
        await axios.post(
          `${API_BASE_URL}/api/customers/${customerId}/addresses`,
          form
        );
      }
      onSuccess();
    } catch (error) {
      alert("Failed to save address");
      console.error(error);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "1rem" }}>
      <div>
        <label>Address Details:</label>
        <br />
        <textarea
          name="address_details"
          value={form.address_details}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>City:</label>
        <br />
        <input name="city" value={form.city} onChange={handleChange} required />
      </div>
      <div>
        <label>State:</label>
        <br />
        <input
          name="state"
          value={form.state}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Pin Code:</label>
        <br />
        <input
          name="pin_code"
          value={form.pin_code}
          onChange={handleChange}
          required
        />
      </div>
      <button className="add-btn" type="submit">
        {address ? "Update" : "Add"} Address
      </button>{" "}
      <button className="btn-danger" type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
}

export default AddressForm;
