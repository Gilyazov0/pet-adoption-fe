import { useState } from "react";
import { Form, FloatingLabel, Button } from "react-bootstrap";
import { PetType } from "../Types/PetsTypes";
import "../style/AddPet.css";

interface FormData {
  type: PetType;
  name: string;
  height: number;
  weight: number;
  color: string;
  bio: string;
  hypoallergnic: boolean;
  //   dietary: string[];
  breed: string;
}
const AddPet: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    type: PetType.Cat,
    bio: "",
    breed: "",
    color: "",
    height: NaN,
    hypoallergnic: true,
    name: "",
    weight: NaN,
  });

  function handleInput(
    e: React.ChangeEvent & { target: { name: string; value: string } }
  ) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  async function handleSubmit() {}
  return (
    <Form className="add-pet-form">
      <FloatingLabel label="Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Name"
          name={"name"}
          onChange={(e) => handleInput(e)}
          value={formData?.name}
        />
      </FloatingLabel>

      <FloatingLabel label="Weight" className="mb-3">
        <Form.Control
          type="number"
          placeholder="Weight"
          name={"weight"}
          onChange={(e) => handleInput(e)}
          value={formData?.weight}
        />
      </FloatingLabel>

      <FloatingLabel label="Height" className="mb-3">
        <Form.Control
          type="number"
          placeholder="Height"
          name={"height"}
          onChange={(e) => handleInput(e)}
          value={formData?.height}
        />
      </FloatingLabel>

      <FloatingLabel label="Color" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Color"
          name={"color"}
          onChange={(e) => handleInput(e)}
          value={formData?.color}
        />
      </FloatingLabel>

      <FloatingLabel label="Biography" className="mb-3">
        <Form.Control
          style={{ height: "100px" }}
          required
          name="bio"
          as="textarea"
          placeholder="Biography"
          value={formData?.bio}
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
          value={formData?.breed}
        />
      </FloatingLabel>

      <Button className="btn-custom" onClick={() => handleSubmit()}>
        Submit
      </Button>
    </Form>
  );
};

export default AddPet;
