import { useState } from "react";
import { Form, FloatingLabel, Button } from "react-bootstrap";
import "../style/AddPet.css";
import { addPet } from "../lib/petsApi";
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
    hypoallergnic: true,
    name: "",
    weight: 0,
    dietary: "",
  });

  const [msg, setMsg] = useState<MessageType>({ text: "", type: "error" });

  function handleInput(
    e: React.ChangeEvent & { target: { name: string; value: string } }
  ) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  async function handleSubmit(e: React.FormEvent<HTMLButtonElement>) {
    e.preventDefault();
    const response = await addPet(formData);
    if (response.error) {
      setMsg({ text: response.error, type: "error" });
    } else {
      setMsg({ text: "Pet is added to database", type: "success" });
    }
  }

  return (
    <Form className="add-pet-form">
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
          style={{ height: "90px" }}
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

      <Button
        className="btn-custom"
        type="submit"
        onSubmit={(e) => handleSubmit(e)}
      >
        Submit
      </Button>
      <Message text={msg.text} type={msg.type} />
    </Form>
  );
};

export default AddPet;
