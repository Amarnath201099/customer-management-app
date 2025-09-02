import { useState, useEffect } from "react";

function CustomerForm({ initialData = null, onSubmit }) {
  const isEditMode = Boolean(initialData);

  const [customerForm, setCustomerForm] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
  });

  const [addressForm, setAddressForm] = useState({
    address_details: "",
    city: "",
    state: "",
    pin_code: "",
  });

  useEffect(() => {
    if (isEditMode) {
      setCustomerForm({
        first_name: initialData.first_name,
        last_name: initialData.last_name,
        phone_number: initialData.phone_number,
      });

      // Optional: preload address if included
      if (initialData.addresses?.length > 0) {
        setAddressForm(initialData.addresses[0]); // Load first address
      }
    }
  }, [initialData, isEditMode]);

  const handleCustomerChange = (e) => {
    setCustomerForm({ ...customerForm, [e.target.name]: e.target.value });
  };

  const handleAddressChange = (e) => {
    setAddressForm({ ...addressForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isCustomerValid =
      customerForm.first_name &&
      customerForm.last_name &&
      customerForm.phone_number;

    if (!isCustomerValid) {
      alert("Please fill out all customer fields.");
      return;
    }

    if (!isEditMode) {
      const isAddressValid =
        addressForm.address_details &&
        addressForm.city &&
        addressForm.state &&
        addressForm.pin_code;

      if (!isAddressValid) {
        alert("Please fill out all address fields.");
        return;
      }

      const fullData = { ...customerForm, ...addressForm };
      onSubmit(fullData);
    } else {
      // Only send customer fields on edit
      onSubmit(customerForm);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Customer Information</h3>
      <input
        name="first_name"
        placeholder="First Name"
        value={customerForm.first_name}
        onChange={handleCustomerChange}
        required
      />
      <input
        name="last_name"
        placeholder="Last Name"
        value={customerForm.last_name}
        onChange={handleCustomerChange}
        required
      />
      <input
        name="phone_number"
        placeholder="Phone Number"
        value={customerForm.phone_number}
        onChange={handleCustomerChange}
        required
      />

      {!isEditMode ? (
        <>
          <h3>Primary Address</h3>
          <textarea
            name="address_details"
            placeholder="Address Details"
            value={addressForm.address_details}
            onChange={handleAddressChange}
            required
          />
          <input
            name="city"
            placeholder="City"
            value={addressForm.city}
            onChange={handleAddressChange}
            required
          />
          <input
            name="state"
            placeholder="State"
            value={addressForm.state}
            onChange={handleAddressChange}
            required
          />
          <input
            name="pin_code"
            placeholder="Pin Code"
            value={addressForm.pin_code}
            onChange={handleAddressChange}
            required
          />
        </>
      ) : (
        <>
          <h4 style={{ color: "#888" }}>
            To edit address details, go to the <strong>Customer Detail</strong>{" "}
            page.
          </h4>
        </>
      )}

      <button className="add-btn" type="submit">
        {isEditMode ? "Update Customer" : "Create Customer"}
      </button>
    </form>
  );
}

export default CustomerForm;
