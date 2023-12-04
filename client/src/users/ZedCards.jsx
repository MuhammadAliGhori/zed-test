import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";

export default function ZedCards() {
  const [data, setData] = useState([]);
  const [editItemId, setEditItemId] = useState(null);
  const [editItem, setEditItem] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    architecture: "",
    profession: "",
    agreeToTerms: false,
  });
  const [show, setShow] = useState(false);
  const bkURL = "http://localhost:8000/";
  const handleClose = () => {
    setShow(false);
  };
  // const handleShow = () => setShow(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/getdata");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // delete card

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/deletedata/${id}`);
      setData(data.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  // edit data
  const handleEdit = (item) => {
    setEditItemId(item._id);
    setEditItem(item);
    setFormData({
      name: item.name,
      age: item.age,
      gender: item.gender,
      architecture: item.architecture,
      profession: item.profession,
      agreeToTerms: item.agreeToTerms,
    });
    setShow(true);
  };
  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8000/api/editdata/${editItemId}`,
        formData
      );
      console.log("Updated Data:", response.data);
      setEditItemId(null);
      setEditItem(null);
      setShow(false);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  return (
    <>
      <h1 className="bold text-light py-lg-5 py-3">All Records</h1>

      <div className="d-flex gap-3 flex-wrap justify-content-center pb-4">
        {data.map((item) => (
          <>
            <Card
              key={item._id}
              style={{ width: "18rem" }}
              className="card item-card card-block p-2"
            >
              {console.log(item, "ali")}
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center">
                  <Card.Title className="item-card-title">Name : </Card.Title>
                  <Card.Title className="item-card-title">
                    {item.name}
                  </Card.Title>
                </div>
                {item.file.length > 0 && (
                  <img
                    className="object-fit-cover w-100"
                    src={bkURL + item.file[0]}
                    alt=""
                  />
                )}

                <div className="d-flex justify-content-between align-items-center">
                  <Card.Text className="card-text mb-0">Age:</Card.Text>
                  <Card.Text className="card-text mb-0">{item.age}</Card.Text>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <Card.Text className="card-text mb-0">Gender:</Card.Text>
                  <Card.Text className="card-text mb-0">
                    {item.gender}
                  </Card.Text>
                </div>

                <div className="d-flex justify-content-between align-items-center">
                  <Card.Text className="card-text mb-0">Profession:</Card.Text>
                  <Card.Text className="card-text mb-0">
                    {item.profession}
                  </Card.Text>
                </div>

                <div className="d-flex justify-content-between align-items-center">
                  <Card.Text className="card-text mb-0">
                    Architecture:
                  </Card.Text>
                  <Card.Text className="card-text mb-0">
                    {item.architecture}
                  </Card.Text>
                </div>
              </Card.Body>
              <div className="d-flex align-items-center justify-content-between gap-3 px-lg-3 px-2">
                <button
                  className="custom-btn btn-9 mt-1 mb-2"
                  onClick={() => handleEdit(item)}
                >
                  Edit
                </button>
                <button
                  className="custom-btn btn-9 mt-1 mb-2"
                  onClick={() => handleDelete(item._id)}
                >
                  Delete
                </button>
              </div>
            </Card>

            {show && (
              <Modal
                key={item._id}
                show={editItemId === item._id}
                onHide={handleClose}
              >
                <Modal.Header closeButton>
                  <Modal.Title>Edit Record</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <form>
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">
                        Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData((prevData) => ({
                            ...prevData,
                            name: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="age" className="form-label">
                        Age
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="age"
                        value={formData.age}
                        onChange={(e) =>
                          setFormData((prevData) => ({
                            ...prevData,
                            age: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="gender" className="form-label">
                        Gender
                      </label>
                      <select
                        className="form-select"
                        id="gender"
                        value={formData.gender}
                        onChange={(e) =>
                          setFormData((prevData) => ({
                            ...prevData,
                            gender: e.target.value,
                          }))
                        }
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        {/* Add other gender options */}
                      </select>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="architecture" className="form-label">
                        Architecture
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="architecture"
                        value={formData.architecture}
                        onChange={(e) =>
                          setFormData((prevData) => ({
                            ...prevData,
                            architecture: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="profession" className="form-label">
                        Profession
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="profession"
                        value={formData.profession}
                        onChange={(e) =>
                          setFormData((prevData) => ({
                            ...prevData,
                            profession: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div className="mb-3 form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="agreeToTerms"
                        checked={formData.agreeToTerms}
                        onChange={(e) =>
                          setFormData((prevData) => ({
                            ...prevData,
                            agreeToTerms: e.target.value,
                          }))
                        }
                      />
                      <label
                        className="form-check-label"
                        htmlFor="agreeToTerms"
                      >
                        Agree to terms
                      </label>
                    </div>
                  </form>
                </Modal.Body>
                <Modal.Footer>
                  <Button className="custom-btn btn-9" onClick={handleUpdate}>
                    Save Changes
                  </Button>
                </Modal.Footer>
              </Modal>
            )}
          </>
        ))}
      </div>
    </>
  );
}
