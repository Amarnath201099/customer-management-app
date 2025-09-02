import { Link } from "react-router-dom";
import { BsEyeFill } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";

function CustomerList({ customers }) {
  if (!customers.length)
    return <p className="mt-5 fw-bold text-center fs-2">No customers found.</p>;

  return (
    <table>
      <thead>
        <tr>
          <th>Full Name</th>
          <th>Phone Number</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {customers.map((cust) => (
          <tr key={cust.id}>
            <td>
              {cust.first_name} {cust.last_name}
            </td>
            <td>{cust.phone_number}</td>
            <td>
              <div className="d-flex flex-column flex-md-row justify-content-center align-items-center gap-3">
                <Link
                  className="btn  view-btn d-flex align-items-center gap-2"
                  to={`/customers/${cust.id}`}
                >
                  View <BsEyeFill />
                </Link>{" "}
                <Link
                  className="btn edit-btn d-flex align-items-center gap-2"
                  to={`/customers/${cust.id}/edit`}
                >
                  Edit <FaEdit />
                </Link>{" "}
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default CustomerList;
