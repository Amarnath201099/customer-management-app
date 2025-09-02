import { useState, useEffect } from "react";
import CustomerForm from "../components/CustomerForm";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

function CustomerFormPage() {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchCustomer();
    }
  }, [id]);

  async function fetchCustomer() {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/customers/${id}`);
      const customerData = res.data;
      // fetch addresses too
      const addressRes = await axios.get(
        `${API_BASE_URL}/api/customers/${id}/addresses`
      );
      customerData.addresses = addressRes.data;

      setCustomer(customerData);
    } catch (error) {
      console.error("Failed to fetch customer", error);
    }
  }

  async function handleSubmit(formData) {
    try {
      if (id) {
        await axios.put(`${API_BASE_URL}/api/customers/${id}`, formData);
        alert("Customer updated");
      } else {
        await axios.post(`${API_BASE_URL}/api/customers`, formData);
        alert("Customer created");
      }
      navigate("/");
    } catch (error) {
      alert("Failed to save customer");
      console.error(error);
    }
  }

  return (
    <div className="customer-form-container p-4 m-4">
      <div className="d-flex justify-content-between align-items-center">
        <h1>{id ? "Edit Customer" : "Add Customer"}</h1>
        <button
          className="btn btn-outline-secondary d-flex align-items-center gap-2"
          onClick={() => navigate(-1)}
        >
          <BsArrowLeft />
          Back
        </button>
      </div>
      <CustomerForm initialData={customer} onSubmit={handleSubmit} />
    </div>
  );
}

export default CustomerFormPage;
