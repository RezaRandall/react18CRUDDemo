import { useRef } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddContact() {
  const contactName = useRef("");
  const address = useRef("");
  const phoneNumber = useRef("");
  const imgUrl = useRef("");

  const navigate = useNavigate();

  function AddContactHandler() {
    const payLoad = {
      name: contactName.current.value,
      address: address.current.value,
      powers: phoneNumber.current.value,
      imageUrl: imgUrl.current.value,
    };
    axios.post("https://localhost:7208/Contacts", payLoad).then((response) => {
      navigate("/");
    });
  }

  return (
    <>
      <legend>Add New Contact</legend>
      <Form>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Contact Name</Form.Label>
          <Form.Control type="text" ref={contactName} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formAddress">
          <Form.Label>Contact Address</Form.Label>
          <Form.Control as="textarea" rows={3} ref={address} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPhone">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control type="text" ref={phoneNumber} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formImageUrl">
          <Form.Label>Image</Form.Label>
          <Form.Control type="text" ref={imgUrl} />
        </Form.Group>

        <Button variant="primary" type="button" onClick={AddContactHandler}>
          Submit
        </Button>
      </Form>
    </>
  );
}
export default AddContact;
