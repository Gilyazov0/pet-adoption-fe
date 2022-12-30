import { useContext, useState } from "react";
import { Form, Button, FloatingLabel } from "react-bootstrap";
import { UserContext } from "../../App";
import { login } from "../../lib/userApi";
import Message, { MessageType } from "../CommonComponents/Message";

interface Props {
  setShowAuth: React.Dispatch<React.SetStateAction<boolean>>;
}

const Login: React.FC<Props> = ({ setShowAuth }) => {
  const [formData, setFormData] = useState<{ email: string; password: string }>(
    { email: "", password: "" }
  );

  const [msg, setMsg] = useState<MessageType>({ text: "", type: "error" });

  const { setUser } = useContext(UserContext);

  function handleInput(
    e: React.ChangeEvent & { target: { name: string; value: string } }
  ) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit() {
    const response = await login(formData.email, formData.password);
    if (response.error) {
      setMsg({ text: response.error, type: "error" });
    }
    if (response.user) {
      console.log(response.user);
      setUser(response.user);
      setShowAuth(false);
    }
  }
  return (
    <Form>
      <FloatingLabel label="Email address" className="mb-3">
        <Form.Control
          type="email"
          placeholder="Enter email"
          name={"email"}
          onChange={(e) => handleInput(e)}
          value={formData.email}
        />
      </FloatingLabel>

      <FloatingLabel label="Password" className="mb-3">
        <Form.Control
          type="password"
          placeholder="Password"
          name={"password"}
          onChange={(e) => handleInput(e)}
          value={formData.password}
        />
      </FloatingLabel>

      <Button className="btn-custom me-2" onClick={() => handleSubmit()}>
        Submit
      </Button>

      <Message msg={msg} setMsg={setMsg} />
    </Form>
  );
};

export default Login;
