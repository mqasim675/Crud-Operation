import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import backgroundImage from "./images/json.png";
import "../src/searchbar/search"
function Crud() {
  const [formData, setFormData] = useState({});
  const [data, setData] = useState([]);
  const handleChange = (e) => {
    const value = e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };
  console.log("formData", formData);
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        console.log("response", response.data);
        setData(response?.data);
      })
      .catch((error) => {
        console.log("Error getting fake data: " + error);
      });
  }, []);
  console.log("allrecord", data);
  const postData = (e) => {
    axios
      .post(`https://jsonplaceholder.typicode.com/users`, formData)
      .then((response) => {
        setData((prev) => [...prev, response.data]);
        setFormData({ name: "", email: "", phone: "" });
      });
  };
  const deleterow = (email) => {
    axios
      .delete(`https://jsonplaceholder.typicode.com/users/${email}`)
      .then((res) => {
        console.log(res.data);
        const deleteAll = data.filter((item) => item.email !== email);
        setData(deleteAll);
      });
  };
  const updateData = (name, email, phone) => {
    setFormData({ name, email, phone });
    axios
      .patch(`https://jsonplaceholder.typicode.com/users/${name}`)
      .then((response) => {
        setData(data.filter((item) => item.name !== name));
        console.log("response", response);
      });
  };
  return (
    <div>
      <h1 className="">crud operation</h1>
      <div className="w-full ">
        <form
          action=""
          className="w-3/5 mx-auto  flex flex-col items-center"
          onSubmit={(event) => {
            event.preventDefault();
            postData();
          }}
        >
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Enter your name"
            className="border w-1/2  border-gray-900 py-3 pl-1.5 mt-16 rounded-md outline-0"
            value={formData.name}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter your email"
            className="border w-1/2  border-gray-900 py-3 pl-1.5 mt-16 rounded-md outline-0"
            value={formData.email}
            onChange={handleChange}
          ></input>

          <input
            type="text"
            name="phone"
            id="phone"
            placeholder="Enter your phone number"
            className="border w-1/2  border-gray-900 py-3 pl-1.5 mt-16 rounded-md outline-0"
            value={formData.phone}
            onChange={handleChange}
          ></input>

          <button
            className="border w-[50%] mx-auto rounded-md
                  border-gray-900 py-3 pl-1.5 mt-6 bg-teal-600 mb-6 cursor-pointer
                  text-white mt-3.5_ mb-4.5_"
            type="submit"
          >
            post new data
          </button>
        </form>
      </div>
      <div className="w-11/12  flex mx-auto flex-wrap justify-between">
        {data?.map((item, index) => (
          <div key={index} className="w-[32%] ">
            <div
              style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: "cover",
                width: "100%",
                height: "280px",
              }}
            >
              <span>{item.id}</span> <br />
            </div>
            <div className="text-center">
              <span className="text-red-300 my-2">{item.name}</span> <br />
              <span className="text-orange-950">{item.email}</span> <br />
              <span className="text-green-600 mb-5">{item.phone}</span> <br />
              <button className="" onClick={(email) => deleterow(item.email)}>
                Delete
              </button>{" "}
              <br />
              <button
                className="btn btn-warning"
                // onClick={() => handleEdit(index)}
                onClick={() => updateData(item.name, item.email, item.phone)}
              >
                Edit
              </button>{" "}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Crud;
