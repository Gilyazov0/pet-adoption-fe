import { useContext, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { UserContext } from "../App";
import { createUser } from "../lib/userApi";
import Error from "./Error";

interface Props {
  setShowAuth: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignUp: React.FC<Props> = ({ setShowAuth }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password1: "",
    password2: "",
  });

  const [error, setError] = useState("");
  const { user, setUser } = useContext(UserContext);

  function handleInput(
    e: React.ChangeEvent & { target: { name: string; value: string } }
  ) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function passwordError(pw1: string, pw2: string) {
    if (pw1 !== pw2) return "passwords do not match";
    if (pw1.length < 6) return "password length less than 6";
    return "";
  }

  async function handleSubmit(e: React.FormEvent<HTMLButtonElement>) {
    e.preventDefault();
    const error = passwordError(formData.password1, formData.password2);

    if (error) {
      setError(error);
      return;
    }
    const response = await createUser(
      formData.firstName,
      formData.lastName,
      formData.email,
      formData.phone,
      formData.password1
    );

    if (response.error) {
      setError(response.error);
      return;
    }

    setUser(response.user!);
    setShowAuth(false);
  }

  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>First name</Form.Label>
        <Form.Control
          required
          type="text"
          name="firstName"
          placeholder="First name"
          onChange={(e) => handleInput(e)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Last name</Form.Label>
        <Form.Control
          required
          name="lastName"
          type="text"
          placeholder="Last name"
          onChange={(e) => handleInput(e)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          required
          name="email"
          type="email"
          placeholder="Enter email"
          onChange={(e) => handleInput(e)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Phone number</Form.Label>
        <Form.Control
          type="tel"
          name="phone"
          pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
          placeholder="Phone number"
          onChange={(e) => handleInput(e)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          required
          name="password1"
          type="password"
          placeholder="Password"
          onChange={(e) => handleInput(e)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          required
          name="password2"
          type="password"
          placeholder="Password"
          onChange={(e) => handleInput(e)}
        />
      </Form.Group>

      <Button
        className="btn-custom me-3"
        type="submit"
        onClick={(e) => handleSubmit(e)}
      >
        Submit
      </Button>
      <Error error={error} />
    </Form>
  );
};

export default SignUp;
