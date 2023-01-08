import { useContext, useState } from "react";
import { Form, Button, FloatingLabel } from "react-bootstrap";
import { UserContext, NewPetsContext } from "../../App";
import UserApi from "../../lib/userApi";
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
  const { setNewPets } = useContext(NewPetsContext);

  function handleInput(
    e: React.ChangeEvent & { target: { name: string; value: string } }
  ) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit() {
    const response = await UserApi.login(formData.email, formData.password);
    if (response.error) {
      setMsg({ text: response.error, type: "error" });
    }
    if (response.data) {
      setUser(response.data.user);
      setNewPets(response.data.newPets);
      console.log(response.data.newPets);
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
