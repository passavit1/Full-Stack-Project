import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import axios from "axios";

const UserList = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedEmail, setUpdatedEmail] = useState("");
  const [users, setUsers] = useState([]);

  // Fetch users the first time
  useEffect(() => {
    fetchUsers();
  }, []);

  // function fetch user information from server
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/admin/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setUpdatedName(user.name);
    setUpdatedEmail(user.email);
    setShowModal(true);
  };

  const handleSaveClick = async () => {
    if (selectedUser) {
      try {
        await axios.put(
          `http://localhost:5000/updateUser/${selectedUser._id}`,
          {
            name: updatedName,
            email: updatedEmail,
          }
        );

        setShowModal(false);
        setSelectedUser(null);
        setUpdatedName("");
        setUpdatedEmail("");
        // You may want to fetch updated user list after successful update

        fetchUsers();
      } catch (error) {
        console.error("Error updating user:", error);
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedUser(null);
    setUpdatedName("");
    setUpdatedEmail("");
  };

  return (
    <div>
      <h2>User List</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Username</th>
            <th>Name</th>
            <th>Email</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.username}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <Button variant="primary" onClick={() => handleEditClick(user)}>
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="updatedName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={updatedName}
                onChange={(e) => setUpdatedName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="updatedEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={updatedEmail}
                onChange={(e) => setUpdatedEmail(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveClick}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default UserList;
