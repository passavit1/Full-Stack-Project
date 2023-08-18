// ProductList.jsx
import React, { useState } from "react";
import axios from "axios";
import { Table, Button, Modal, Form } from "react-bootstrap";

const ProductList = ({ fetchProducts, products, setProducts }) => {
  const [selectedProduct, setSelectedProduct] = useState(null); // State to track the selected product for editing
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [editedPrice, setEditedPrice] = useState("");

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setEditedName(product.name);
    setEditedPrice(product.price);
    setShowEditModal(true);
  };

  const handleEditModalClose = () => {
    setSelectedProduct(null);
    setEditedName("");
    setEditedPrice("");
    setShowEditModal(false);
  };

  const handleSaveChanges = async () => {
    try {
      await axios.put(
        `http://localhost:5000/product/edit/${selectedProduct._id}`,
        {
          name: editedName,
          price: editedPrice,
        }
      );

      // Update the product list with the edited product
      const updatedProducts = products.map((product) =>
        product._id === selectedProduct._id
          ? { ...product, name: editedName, price: editedPrice }
          : product
      );
      setProducts(updatedProducts);

      handleEditModalClose();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div>
      <h2>Products</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>
                <Button
                  variant="primary"
                  onClick={() => handleEditClick(product)}
                >
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showEditModal} onHide={handleEditModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="editedName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="editedPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                value={editedPrice}
                onChange={(e) => setEditedPrice(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleEditModalClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProductList;
