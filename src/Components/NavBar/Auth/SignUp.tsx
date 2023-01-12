import { useState } from "react";
import { Form, Button, FloatingLabel } from "react-bootstrap";
import PasswordValidation from "../../../lib/passwordValidation";
import UserApi from "../../../lib/userApi";
import { userSlice } from "../../../store/reducers/UserSlice";
import Message, { MessageType } from "../../CommonComponents/Message";
import { useAppDispatch } from "../../../hooks/redux";

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

  const [msg, setMsg] = useState<MessageType>({ text: "", type: "error" });

  const { setUser } = userSlice.actions;
  const dispatch = useAppDispatch();

  function handleInput(
    e: React.ChangeEvent & { target: { name: string; value: string } }
  ) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent<HTMLButtonElement>) {
    e.preventDefault();
    const error = PasswordValidation.validate(
      formData.password1,
      formData.password2
    );

    if (error) {
      setMsg({ text: error, type: "error" });
      return;
    }
    const response = await UserApi.createUser(
      formData.firstName,
      formData.lastName,
      formData.email,
      formData.phone,
      formData.password1
    );

    if (response.error) {
      setMsg({ text: response.error, type: "error" });
      return;
    }

    dispatch(setUser(response.data!));
    setShowAuth(false);
  }

  return (
    <Form>
      <FloatingLabel label="First name" className="mb-3">
        <Form.Control
          required
          type="text"
          name="firstName"
          placeholder="First name"
          onChange={(e) => handleInput(e)}
        />
      </FloatingLabel>

      <FloatingLabel label="Last name" className="mb-3">
        <Form.Control
          required
          name="lastName"
          type="text"
          placeholder="Last name"
          onChange={(e) => handleInput(e)}
        />
      </FloatingLabel>

      <FloatingLabel label="Email address" className="mb-3">
        <Form.Control
          required
          name="email"
          type="email"
          placeholder="Enter email"
          onChange={(e) => handleInput(e)}
        />
      </FloatingLabel>

      <FloatingLabel label="Phone number" className="mb-3">
        <Form.Control
          type="tel"
          name="phone"
          pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
          placeholder="Phone number"
          onChange={(e) => handleInput(e)}
        />
      </FloatingLabel>

      <FloatingLabel label="Password" className="mb-3">
        <Form.Control
          required
          name="password1"
          type="password"
          placeholder="Password"
          onChange={(e) => handleInput(e)}
        />
      </FloatingLabel>

      <FloatingLabel label="Password" className="mb-3">
        <Form.Control
          required
          name="password2"
          type="password"
          placeholder="Password"
          onChange={(e) => handleInput(e)}
        />
      </FloatingLabel>

      <Button
        className="btn-custom me-2"
        type="submit"
        onClick={(e) => handleSubmit(e)}
      >
        Submit
      </Button>
      <Message msg={msg} setMsg={setMsg} />
    </Form>
  );
};

export default SignUp;
