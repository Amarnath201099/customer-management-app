import { useState } from "react";
import AddressForm from "./AddressForm";
import axios from "axios";

import { MdDelete } from "react-icons/md";
import { FaEdit, FaPlusSquare } from "react-icons/fa";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

function AddressList({ addresses, customerId, refreshAddresses }) {
  const [editingAddress, setEditingAddress] = useState(null);
  const [adding, setAdding] = useState(false);

  async function deleteAddress(id) {
    if (window.confirm("Delete this address?")) {
      try {
        await axios.delete(`${API_BASE_URL}/api/addresses/${id}`);
        refreshAddresses();
      } catch (error) {
        alert("Failed to delete address");
        console.error(error);
      }
    }
  }

  return (
    <div>
      {addresses.length === 0 && <p>No addresses found.</p>}

      <ul className="list-unstyled">
        {addresses.map((addr) => (
          <li className="address-list-style" key={addr.id}>
            {addr.address_details}, {addr.city}, {addr.state} - {addr.pin_code}{" "}
            <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center gap-1 gap-md-3">
              <button
                className="edit-btn d-flex align-items-center gap-2"
                onClick={() => setEditingAddress(addr)}
              >
                Edit
                <FaEdit />
              </button>{" "}
              <button
                className="btn-danger d-flex align-items-center gap-2"
                onClick={() => deleteAddress(addr.id)}
                disabled={addresses.length === 1}
                title={
                  addresses.length === 1 ? "At least one address required" : ""
                }
              >
                Delete
                <MdDelete />
              </button>
            </div>
          </li>
        ))}
      </ul>

      {adding ? (
        <AddressForm
          customerId={customerId}
          onCancel={() => setAdding(false)}
          onSuccess={() => {
            setAdding(false);
            refreshAddresses();
          }}
        />
      ) : (
        <button
          className="add-btn d-flex align-items-center gap-2"
          onClick={() => setAdding(true)}
        >
          <FaPlusSquare /> Add New Address
        </button>
      )}

      {editingAddress && (
        <AddressForm
          customerId={customerId}
          address={editingAddress}
          onCancel={() => setEditingAddress(null)}
          onSuccess={() => {
            setEditingAddress(null);
            refreshAddresses();
          }}
        />
      )}
    </div>
  );
}

export default AddressList;
