import { Accordion, Button, Form } from "react-bootstrap";
import "../style/SearchBar.css";

const SearchBar: React.FC = () => {
  return (
    <>
      <div className="label">Search for a friend</div>

      <Accordion className="m-3">
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <div
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="d-flex w-100"
            >
              <Form.Select className="me-3 w-100">
                <option>Select animal type</option>
                <option value="1">Dog</option>
                <option value="2">Cat</option>
                <option value="3">Other</option>
              </Form.Select>
            </div>
          </Accordion.Header>
          <Accordion.Body>
            <Form.Select className="mb-2">
              <option>Select adoption status</option>
              <option value="1">Adopted</option>
              <option value="2">Available</option>
              <option value="3">Fostered</option>
            </Form.Select>
            <div className="d-flex  mb-2">
              <span className="align-self-center me-3">Height:</span>
              <Form.Control type="number" />
            </div>
            <div className="d-flex mb-2">
              <span className="align-self-center me-3">Width:</span>
              <Form.Control type="number" />
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <Button className="btn-custom ms-3">Search</Button>
    </>
  );
};

export default SearchBar;
