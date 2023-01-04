import { useState } from "react";
import {
  Form,
  FloatingLabel,
  Button,
  FormControl,
  Row,
  Col,
} from "react-bootstrap";
import "../style/AddPet.css";
import PetApi from "../lib/petApi";
import Pet from "../Types/Pet";
import Message from "./CommonComponents/Message";
import { MessageType } from "./CommonComponents/Message";

const AddPet: React.FC = () => {
  const [formData, setFormData] = useState<
    Omit<Pet, "id" | "picture" | "adoptionStatus">
  >({
    type: "Cat",
    bio: "",
    breed: "",
    color: "",
    height: 0,
    hypoallergenic: true,
    name: "",
    weight: 0,
    dietary: "",
  });

  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const [msg, setMsg] = useState<MessageType>({ text: "", type: "error" });
  const [picture, setPicture] = useState<File | undefined>();

  function handleInput(
    e: React.ChangeEvent & { target: { name: string; value: string } }
  ) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsDisabled(true);
    const response = await PetApi.addPet({ ...formData, picture });
    if (response.error) {
      setMsg({ text: response.error, type: "error" });
    } else {
      setMsg({ text: "Pet is added to database", type: "success" });
    }
    setIsDisabled(false);
  }

  return (
    <Form className="add-pet-form" onSubmit={(e) => handleSubmit(e)}>
      <Row>
        <Col>
          <FloatingLabel label="Name" className="mb-3">
            <Form.Control
              type="text"
              placeholder="Name"
              name={"name"}
              onChange={(e) => handleInput(e)}
              value={formData.name}
              required
            />
          </FloatingLabel>
        </Col>
        <Col>
          <FloatingLabel label="Color" className="mb-3">
            <Form.Control
              type="text"
              placeholder="Color"
              name={"color"}
              onChange={(e) => handleInput(e)}
              value={formData.color}
              required
            />
          </FloatingLabel>
        </Col>
      </Row>
      <Row>
        <Col>
          <FloatingLabel label="Weight" className="mb-3">
            <Form.Control
              type="number"
              placeholder="Weight"
              name={"weight"}
              onChange={(e) => handleInput(e)}
              value={formData.weight ? formData.weight : ""}
              required
            />
          </FloatingLabel>
        </Col>
        <Col>
          <FloatingLabel label="Height" className="mb-3">
            <Form.Control
              type="number"
              placeholder="Height"
              name={"height"}
              onChange={(e) => handleInput(e)}
              value={formData.height ? formData.height : ""}
              required
            />
          </FloatingLabel>
        </Col>
      </Row>

      <FloatingLabel label="Dietary" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Dietary"
          name={"dietary"}
          onChange={(e) => handleInput(e)}
          value={formData.dietary}
        />
      </FloatingLabel>

      <FloatingLabel label="Biography" className="mb-3">
        <Form.Control
          style={{ height: "150px" }}
          required
          name="bio"
          as="textarea"
          placeholder="Biography"
          value={formData.bio}
          onChange={(e) => handleInput(e)}
        />
      </FloatingLabel>

      <Form.Check type="checkbox" label="Hypoallergnic" className="mb-3" />

      <FloatingLabel label="Breed" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Breed"
          name={"breed"}
          onChange={(e) => handleInput(e)}
          value={formData.breed}
          required
        />
      </FloatingLabel>
      <FormControl
        className="mb-3"
        type="file"
        accept="img/*"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          if (e.target.files && e.target.files[0])
            setPicture(e.target.files[0]);
        }}
      />

      <Button className="btn-custom" type="submit" disabled={isDisabled}>
        Submit
      </Button>
      <Message msg={msg} setMsg={setMsg} />
    </Form>
  );
};

export default AddPet;
