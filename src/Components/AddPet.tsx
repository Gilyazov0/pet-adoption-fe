import { useState, useContext } from "react";
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
import SelectStyled from "./CommonComponents/SelectStyled";
import { AdoptStatus } from "../Types/AdoptStatus";
import { useParams } from "react-router-dom";
import { PetContext } from "../App";
import { PetType } from "../Types/PetsTypes";

const defaultInput: Pet = {
  type: "Cat",
  bio: "",
  breed: "",
  color: "",
  height: 0,
  hypoallergenic: true,
  name: "",
  weight: 0,
  dietary: "",
  adoptionStatus: "Available",
};

const AddPet: React.FC = () => {
  const { id } = useParams();
  const { pet } = useContext(PetContext);
  // eslint-disable-next-line eqeqeq
  const initData = id == pet?.id ? pet! : defaultInput;
  const [formData, setFormData] = useState<Pet>(initData);

  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [msg, setMsg] = useState<MessageType>({ text: "", type: "error" });
  const [picture, setPicture] = useState<File | undefined>();
  const [adoptionStatus, setAdoptionStatus] = useState<AdoptStatus>(
    initData.adoptionStatus
  );
  const [type, setType] = useState<PetType>(initData.type);

  function handleInput(
    e: React.ChangeEvent & { target: { name: string; value: string } }
  ) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsDisabled(true);
    const data = { ...formData, adoptionStatus, type };
    const response = !formData.id
      ? await PetApi.addPet(data, picture)
      : await PetApi.updatePet(data, picture);
    if (response.error) {
      setMsg({ text: response.error, type: "error" });
    } else {
      setMsg({
        text: id === "new" ? "Pet is added to database" : "Pet data edited",
        type: "success",
      });
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
      <Row>
        <Col>
          <div className="selector-container  mb-3">
            <SelectStyled
              defaultValue={{ value: type, label: type }}
              options={[
                { value: "Cat", label: "Cat" },
                { value: "Dog", label: "Dog" },
                { value: "Other", label: "Other" },
              ]}
              onChange={setType}
            />
          </div>
        </Col>
        <Col>
          <div className="selector-container  mb-3">
            <SelectStyled
              defaultValue={{ value: adoptionStatus, label: adoptionStatus }}
              options={[
                { value: "Available", label: "Available" },
                { value: "Adopted", label: "Adopted" },
                { value: "Fostered", label: "Fostered" },
              ]}
              onChange={setAdoptionStatus}
            />
          </div>
        </Col>
        <Col>
          <div className="input-container">
            <input
              type="checkbox"
              className="custom-checkbox"
              name="hypoallergenic"
              onChange={(e) =>
                setFormData({ ...formData, hypoallergenic: e.target.checked })
              }
            />
            <label className="checkbox-label">Hypoallergenic</label>
          </div>
        </Col>
      </Row>
      <FloatingLabel label="Dietary" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Dietary"
          name={"dietary"}
          onChange={(e) => handleInput(e)}
          value={formData.dietary}
          className="styled-border"
        />
      </FloatingLabel>
      <FloatingLabel label="Biography" className="mb-3">
        <Form.Control
          style={{ height: "100px" }}
          name="bio"
          as="textarea"
          placeholder="Biography"
          value={formData.bio}
          onChange={(e) => handleInput(e)}
        />
      </FloatingLabel>
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
      <Button className="btn-custom me-2" type="submit" disabled={isDisabled}>
        Submit
      </Button>
      <Message msg={msg} setMsg={setMsg} />
    </Form>
  );
};

export default AddPet;
