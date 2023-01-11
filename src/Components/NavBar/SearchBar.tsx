import { Accordion, Button, Col, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

const SearchBar: React.FC<{ setShowSearch: Function }> = ({
  setShowSearch,
}) => {
  const navigate = useNavigate();
  const { mode } = useParams();

  const [searchParams, setSearchParams] = useState({
    name: "",
    type: "",
    maxWeight: "",
    minWeight: "",
    maxHeight: "",
    minHeight: "",
    status: "",
  });

  function handleInput(
    e: React.ChangeEvent & { target: { name: string; value: string } }
  ) {
    setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
  }

  function getQuery() {
    let query = "?";
    if (searchParams.type) query += `type=${searchParams.type}&&`;
    if (searchParams.status) query += `status=${searchParams.status}&&`;
    if (searchParams.maxHeight)
      query += `maxHeight=${searchParams.maxHeight}&&`;
    if (searchParams.minHeight)
      query += `minHeight=${searchParams.minHeight}&&`;
    if (searchParams.maxWeight)
      query += `maxWeight=${searchParams.maxWeight}&&`;
    if (searchParams.minWeight)
      query += `minWeight=${searchParams.minWeight}&&`;
    if (searchParams.name) query += `name=${searchParams.name}&&`;

    return query.length > 1 ? query.slice(0, query.length - 2) : "";
  }

  function handleSubmit() {
    const query = getQuery();

    setShowSearch(false);
    navigate(`/Search/${mode === "edit" ? "edit" : "show"}${query}`);
  }

  return (
    <>
      <Accordion className="m-3">
        <Accordion.Item eventKey="0">
          <Accordion.Header>
            <div
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="d-flex w-100"
            >
              <Form.Select
                className="me-3 w-100"
                name="type"
                onChange={(e) => handleInput(e)}
              >
                <option value="">Select animal type</option>
                <option value="Dog">Dog</option>
                <option value="Cat">Cat</option>
                <option value="Other">Other</option>
              </Form.Select>
            </div>
          </Accordion.Header>
          <Accordion.Body>
            <Form.Select
              className="mb-2"
              name="status"
              onChange={(e) => handleInput(e)}
            >
              <option value={""}>Select adoption status</option>
              <option value={"Adopted"}>Adopted</option>
              <option value={"Available"}>Available</option>
              <option value={"Fostered"}>Fostered</option>
            </Form.Select>
            <div className="d-flex mb-2">
              <span className="align-self-center me-3 search-label">Name:</span>
              <Form.Control
                type="text"
                name="name"
                onChange={(e) => handleInput(e)}
              />
            </div>
            <Row className="align-items-center mb-2">
              <Col xs={3} className="pe-0">
                Height from:
              </Col>
              <Col xs={3}>
                <Form.Control
                  type="number"
                  name="maxHeight"
                  onChange={(e) => handleInput(e)}
                />
              </Col>
              <Col xs={1}>to:</Col>
              <Col xs={3}>
                <Form.Control
                  type="number"
                  name="minHeight"
                  onChange={(e) => handleInput(e)}
                />
              </Col>
            </Row>
            <Row className="align-items-center mb-2">
              <Col xs={3}> Width from:</Col>
              <Col xs={3}>
                <Form.Control
                  type="number"
                  name="maxWeight"
                  onChange={(e) => handleInput(e)}
                />
              </Col>
              <Col xs={1}>to:</Col>
              <Col xs={3}>
                <Form.Control
                  type="number"
                  name="minWeight"
                  onChange={(e) => handleInput(e)}
                />
              </Col>
            </Row>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      <Button className="btn-custom ms-3" onClick={handleSubmit}>
        Search
      </Button>
    </>
  );
};

export default SearchBar;
