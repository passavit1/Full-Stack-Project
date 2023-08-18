import React, { useState } from "react";
import axios from "axios";

const CreateProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/product/create", {
        name,
        price,
        image,
      });
      setName("");
      setPrice("");
      setImage("");
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };
  return (
    <div>
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default CreateProduct;
