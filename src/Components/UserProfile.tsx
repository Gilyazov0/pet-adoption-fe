import { useContext, useState } from "react";
import { Form, Button, FloatingLabel } from "react-bootstrap";
import { UserContext } from "../App";
import User from "../Types/User";
import Error from "./CommonComponents/Error";
import "../style/UserProfile.css";
import passwordValidation from "../lib/passwordValidation";
import { updateUser } from "../lib/userApi";

interface FormData {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  bio: string;
  password: string;
}

const UserProfile: React.FC = () => {
  const { user, setUser } = useContext(UserContext);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState<FormData>({
    email: user!.email,
    firstName: user!.firstName,
    lastName: user!.lastName,
    phone: user!.phone,
    bio: user!.bio,
    password: "",
  });
  const { email, firstName, lastName, phone, bio, password } = formData;

  function handleInput(
    e: React.ChangeEvent & { target: { name: string; value: string } }
  ) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (formData.password) {
      const error = passwordValidation(password);
      setError(error);
    }

    const response = await updateUser(
      email,
      firstName,
      lastName,
      phone,
      bio,
      password ? password : undefined
    );

    if (response.error) {
      setError(response.error);
      return;
    }

    setUser(response.user!);
  }

  return (
    <>
      <Form className="user-profile-form">
        <FloatingLabel label="First name" className="mb-3">
          <Form.Control
            required
            type="text"
            name="firstName"
            placeholder="First name"
            value={firstName}
            onChange={(e) => handleInput(e)}
          />
        </FloatingLabel>

        <FloatingLabel label="Last name" className="mb-3">
          <Form.Control
            required
            name="lastName"
            type="text"
            placeholder="Last name"
            value={lastName}
            onChange={(e) => handleInput(e)}
          />
        </FloatingLabel>
        <FloatingLabel label="mail address" className="mb-3">
          <Form.Control
            required
            name="email"
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => handleInput(e)}
          />
        </FloatingLabel>

        <FloatingLabel label="Phone number" className="mb-3">
          <Form.Control
            type="tel"
            name="phone"
            pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
            placeholder="Phone number"
            value={phone}
            onChange={(e) => handleInput(e)}
          />
        </FloatingLabel>

        <FloatingLabel label="Password" className="mb-3">
          <Form.Control
            required
            name="password"
            type="password"
            placeholder="Password"
            onChange={(e) => handleInput(e)}
          />
        </FloatingLabel>

        <FloatingLabel label="Biography" className="mb-3">
          <Form.Control
            style={{ height: "100px" }}
            required
            name="bio"
            as="textarea"
            placeholder="Biography"
            value={bio}
            onChange={(e) => handleInput(e)}
          />
        </FloatingLabel>

        <Button
          className="btn-custom me-3"
          onClick={(e) => {
            handleSubmit(e);
          }}
        >
          Submit
        </Button>
        <Error error={error} />
      </Form>
    </>
  );
};

export default UserProfile;
