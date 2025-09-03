import { useState, useEffect } from "react";
import CustomerList from "../components/CustomerList";
import axios from "axios";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

function CustomerListPage() {
  const [loading, setLoading] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 5;

  useEffect(() => {
    setLoading(true);
    fetchCustomers();
  }, [search, city, state, pinCode, page]);

  async function fetchCustomers() {
    const params = new URLSearchParams();
    if (search) params.append("search", search);
    if (city) params.append("city", city);
    if (state) params.append("state", state);
    if (pinCode) params.append("pin_code", pinCode);
    params.append("page", page);

    try {
      const res = await axios.get(
        `${API_BASE_URL}/api/customers?${params.toString()}`
      );
      setCustomers(res.data.data);
      setTotal(res.data.total);
    } catch (error) {
      console.error("Error fetching customers", error);
    } finally {
      setLoading(false);
    }
  }

  function resetFilters() {
    setSearch("");
    setCity("");
    setState("");
    setPinCode("");
    setPage(1);
  }

  return (
    <div className="d-flex flex-column m-4 p-2 p-sm-3 p-md-4 customer-page-container">
      <h1>Customers</h1>
      <div className="d-flex flex-column flex-md-row align-items-center gap-md-3">
        <input
          type="text"
          placeholder="Search (name, phone, etc)"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
            setPage(1);
          }}
        />
        <input
          type="text"
          placeholder="State"
          value={state}
          onChange={(e) => {
            setState(e.target.value);
            setPage(1);
          }}
        />
        <input
          type="text"
          placeholder="Pin Code"
          value={pinCode}
          onChange={(e) => {
            setPinCode(e.target.value);
            setPage(1);
          }}
        />
      </div>

      <div className="mt-3">
        <button className="btn btn-secondary" onClick={resetFilters}>
          Reset Filters
        </button>
      </div>

      {loading ? (
        <div className="text-center mt-2">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <CustomerList customers={customers} />
      )}

      <div className="align-self-center mt-auto">
        <button
          className="pagination-btn"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>
        <span style={{ margin: "0 10px" }}>Page {page}</span>
        <button
          className="pagination-btn"
          disabled={total <= limit || customers.length < limit}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default CustomerListPage;
