import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./zed.css";
import axios from "axios";
import Swal from "sweetalert2";

export default () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    architecture: "",
    profession: "",
    agreeToTerms: false,
    file: null,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;

    if (name === "name" || name === "agreeToTerms") {
      setFormData({
        ...formData,
        [name]: val,
      });
    } else if (name === "file") {
      setFormData({
        ...formData,
        file: e.target.files,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data: Ali", formData);
    const formDataToSend = new FormData();
  
    for (const key in formData) {
      if (key === 'file') {
        for (let i = 0; i < formData[key].length; i++) {
          formDataToSend.append('file', formData[key][i]);
        }
      } else {
        formDataToSend.append(key, formData[key]);
      }
    }
  
    try {
      const response = await axios.post(
        "http://localhost:8000/api/createdata",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Data created:", response.data);
      setFormData({
        name: "",
        age: "",
        gender: "",
        architecture: "",
        profession: "",
        agreeToTerms: false,
        file: null, 
      });
      navigate("/allcards");
    } catch (error) {
      console.error("Error creating data:", error);
    }
  };

  const allSelectors = [
    {
      label: "Age",
      options: [
        { label: "Select Age", value: "" },
        { label: "20", value: "20" },
        { label: "30", value: "30" },
        { label: "40", value: "40" },
      ],
    },
    {
      label: "Gender",
      options: [
        { label: "Select Gender", value: "" },
        { label: "Male", value: "male" },
        { label: "Female", value: "female" },
      ],
    },
    {
      label: "Architecture",
      options: [
        { label: "Select Architecture", value: "" },
        { label: "Classical Architecture", value: "classicarchitecture" },
        { label: "Modern Architecture", value: "modernarchitecture" },
        {
          label: "Contemporary Architecture",
          value: "contemporaryarchitecture",
        },
      ],
    },
    {
      label: "Profession",
      options: [
        { label: "Select Profession", value: "" },
        { label: "Engineer", value: "engineer" },
        { label: "Doctor", value: "doctor" },
        {
          label: "Musician",
          value: "musician",
        },
      ],
    },
  ];

  return (
    <div className="d-flex justify-content-center align-items-center box-1">
      <div className="blurred-box p-lg-5 p-4">
        <form onSubmit={handleSubmit}>
          <h4 className="user-name bold text-start mb-1">Name</h4>
          <input
            type="text"
            name="name"
            className="form-control w-100 px-2"
            placeholder="Provide Your Name"
            value={formData.name}
            onChange={handleInputChange}
          />

          <div className="mb-3 w-45 px-2 d-flex flex-column">
            <label htmlFor="file" className="form-label">
              <h4 className="user-name bold d-flex justify-content-start w-100 mb-0 ">
                File Upload:
              </h4>
            </label>
            <input
              type="file"
              name="file"
              id="file"
              onChange={handleInputChange}
              className="form-control"
              checked={formData.file}
            />
          </div>
          <div className="d-flex flex-wrap justify-content-between">
            {allSelectors.map((selector, index) => (
              <div key={index} className="mb-3 w-45 px-2 d-flex flex-column">
                <label htmlFor={selector.label} className="form-label">
                  <h4 className="user-name bold d-flex justify-content-start w-100 mb-0 ">
                    {selector.label}:
                  </h4>
                </label>
                <select
                  name={selector.label.toLowerCase()}
                  id={selector.label.toLowerCase()}
                  onChange={handleInputChange}
                  className="form-select"
                  value={formData[selector.label.toLowerCase()]}
                >
                  {selector.options.map((option, optionIndex) => (
                    <option key={optionIndex} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>

          <div className="form-check d-flex align-items-center gap-3">
            <input
              type="checkbox"
              name="agreeToTerms"
              className="form-check-input"
              checked={formData.agreeToTerms}
              onChange={handleInputChange}
            />
            <label className="user-name">Agree to terms</label>
          </div>
          <button type="submit" className="custom-btn btn-9 mt-3">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
