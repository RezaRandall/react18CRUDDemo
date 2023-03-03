import Form from "react-bootstrap/Form";
import { useRef } from "react";
import Button from "react-bootstrap/Button";
import { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function UpdateContact() {
  const name = useRef("");
  const address = useRef("");
  const phone = useRef("");
  const imageUrl = useRef("");

  const { id } = useParams();
  useEffect(() => {
    axios.get(`https://localhost:7208/Contacts/${id}`).then((response) => {
      name.current.value = response.data.name;
      address.current.value = response.data.address;
      phone.current.value = response.data.phone;
      imageUrl.current.value = response.data.imageUrl;
    });
  }, []);

  const navigate = useNavigate();

  function updateContactHandler() {
    const payLoad = {
      name: name.current.value,
      address: address.current.value,
      phone: phone.current.value,
      imageUrl: imageUrl.current.value,
      id: id,
    };

    axios.put("https://localhost:7208/Contacts/", payLoad).then((response) => {
      navigate("/");
    });
  }

  return (
    <>
      <legend>Update Contact</legend>
      <Form>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Contact Name</Form.Label>
          <Form.Control type="text" ref={name} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formAddress">
          <Form.Label>Contact Address</Form.Label>
          <Form.Control as="textarea" rows={3} ref={address} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPhone">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control type="text" ref={phone} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formImageUrl">
          <Form.Label>Image</Form.Label>
          <Form.Control type="text" ref={imageUrl} />
        </Form.Group>

        <Button variant="primary" type="button" onClick={updateContactHandler}>
          Submit
        </Button>
      </Form>
    </>
  );
}

export default UpdateContact;
