import { Modal } from "react-bootstrap";
import Login from "./Login";
import { useState } from "react";
import SignUp from "./SignUp";
import { Link } from "react-router-dom";

interface Props {
  show: boolean;
  setShow: Function;
}

const Auth: React.FC<Props> = ({ show, setShow }) => {
  const [form, setForm] = useState<"Login" | "SignUp">("Login");
  return (
    <Modal show={show} onHide={() => setShow(false)} centered>
      <Modal.Body className="d-flex flex-row-reverse">
        <Link
          to={""}
          onClick={() =>
            setForm((prev) => (prev === "SignUp" ? "Login" : "SignUp"))
          }
        >
          {form === "Login" ? "Sign up" : "Login"}
        </Link>
      </Modal.Body>
      <Modal.Body>{form === "Login" ? <Login /> : <SignUp />}</Modal.Body>
    </Modal>
  );
};

export default Auth;
