import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import AddressList from "../components/AddressList";

import { MdDelete, MdArrowBack } from "react-icons/md";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

function CustomerDetailPage() {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCustomer();
    fetchAddresses();
  }, [id]);

  async function fetchCustomer() {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/customers/${id}`);
      console.log(res.data);
      setCustomer(res.data);
    } catch (error) {
      console.error("Failed to fetch customer", error);
    }
  }

  async function fetchAddresses() {
    try {
      const res = await axios.get(
        `${API_BASE_URL}/api/customers/${id}/addresses`
      );
      setAddresses(res.data.data);
      console.log(res.data);
    } catch (error) {
      console.error("Failed to fetch addresses", error);
    }
  }

  async function handleDeleteCustomer() {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      try {
        await axios.delete(`http://localhost:5000/api/customers/${id}`);
        alert("Customer deleted");
        navigate("/");
      } catch (error) {
        alert("Failed to delete customer");
        console.error(error);
      }
    }
  }

  if (!customer)
    return (
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );

  return (
    <div className="customer-detail-container p-4 m-4">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h1 className="d-flex align-items-center mb-0">
          Customer Details{" "}
          {addresses.length === 1 && (
            <span className="badge bg-info fs-6 ms-2">Only One Address</span>
          )}
        </h1>

        <button
          className="btn btn-outline-secondary d-flex align-items-center gap-1"
          onClick={() => navigate(-1)}
          style={{ minWidth: "fit-content" }}
        >
          <MdArrowBack size={20} />
          Back
        </button>
      </div>
      <p>
        <b>Name:</b> {customer.first_name} {customer.last_name}
      </p>
      <p>
        <b>Phone:</b> {customer.phone_number}
      </p>
      <button
        className="btn-danger d-flex align-items-center gap-2"
        onClick={handleDeleteCustomer}
      >
        Delete Customer <MdDelete />
      </button>{" "}
      <hr />
      <h2>Addresses</h2>
      <AddressList
        addresses={addresses}
        customerId={id}
        refreshAddresses={fetchAddresses}
      />
    </div>
  );
}

export default CustomerDetailPage;
