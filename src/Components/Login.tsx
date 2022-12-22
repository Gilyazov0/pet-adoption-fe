import { useContext, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { UserContext } from "../App";
import { login } from "../lib/userApi";
import Error from "./Error";

interface Props {
  setShowAuth: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login: React.FC<Props> = ({ setShowAuth }) => {
  const [formData, setFormData] = useState<{ email: string; password: string }>(
    { email: "", password: "" }
  );

  const [error, setError] = useState("");
  const { user, setUser } = useContext(UserContext);

  function handleInput(
    e: React.ChangeEvent & { target: { name: string; value: string } }
  ) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit() {
    const response = await login(formData.email, formData.password);
    if (response.error) {
    }
    if (response.user) {
      setUser(response.user);
      setShowAuth(false);
    }
  }
  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          name={"email"}
          onChange={(e) => handleInput(e)}
          value={formData.email}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          name={"password"}
          onChange={(e) => handleInput(e)}
          value={formData.password}
        />
      </Form.Group>

      <Button className="btn-custom" onClick={() => handleSubmit()}>
        Submit
      </Button>

      <Error error={error} />
    </Form>
  );
};

export default Login;
