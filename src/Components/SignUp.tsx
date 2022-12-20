import { Form, Button } from "react-bootstrap";

const SignUp: React.FC = () => {
  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>First name</Form.Label>
        <Form.Control type="text" placeholder="First name" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Last name</Form.Label>
        <Form.Control type="text" placeholder="Last name" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Phone number</Form.Label>
        <Form.Control
          type="tel"
          pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
          placeholder="Phone number"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>

      <Button className="btn-custom " type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default SignUp;
