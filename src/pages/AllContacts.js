import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import DeleteConfirmation from "../components/shared/DeleteConfirmation";

// This function is call api
function AllContacts() {
  const [Contacts, setContacts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get("https://localhost:7208/Contacts").then((response) => {
      setContacts((existingData) => {
        return response.data;
      });
    });
  }, []);

  function showConfirmPopupHandler(id) {
    setShowModal(true);
    setItemToDelete(id);
  }

  function closeConfirmPopupHandler() {
    setShowModal(false);
    setItemToDelete(0);
  }

  function deleteConfirmHandler() {
    axios.delete(`https://localhost:7208/Contacts/${itemToDelete}`).then((response) => {
      setContacts((existingData) => {
        return existingData.filter((_) => _.id !== itemToDelete);
      });
      setItemToDelete(0);
      setShowModal(false);
    });
  }

  return (
    <>
      <DeleteConfirmation showModal={showModal} title="Delete Confirmation" body="Are you sure delete this item?" closePopup={closeConfirmPopupHandler} deleteConfirmHandler={deleteConfirmHandler}></DeleteConfirmation>
      <Row className="mt-2">
        <Col md={{ span: 4, offset: 0 }}>
          <Button
            variant="primary"
            type="button"
            onClick={() => {
              navigate("/add-contact");
            }}
          >
            Add New Contact
          </Button>
        </Col>
      </Row>
      <Row xs={1} md={3} className="g-4 mt-1">
        {Contacts.map((ct) => (
          <Col key={ct.id}>
            <Card>
              <Card.Img variant="top" src={ct.imageUrl} />
              <Card.Body>
                <Card.Title>{ct.name}</Card.Title>
                <Card.Text>
                  <b>Address : </b> {ct.address}
                </Card.Text>
                <Card.Text>
                  <b>Phone : </b> {ct.phone}
                </Card.Text>
                <Button
                  variant="primary"
                  type="button"
                  onClick={() => {
                    navigate(`/update-contact/${ct.id}`);
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  type="button"
                  onClick={() => {
                    showConfirmPopupHandler(ct.id);
                  }}
                >
                  Delete
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
}
export default AllContacts;
