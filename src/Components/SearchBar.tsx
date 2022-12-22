import { Accordion, Button, Form } from "react-bootstrap";
import "../style/SearchBar.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { PetType } from "../Types/PetsTypes";
import { AdoptStatus } from "../Types/AdoptStatus";

const SearchBar: React.FC<{ setShowSearch: Function }> = ({
  setShowSearch,
}) => {
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useState({
    name: "",
    type: "",
    weight: "",
    height: "",
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
    if (searchParams.height) query += `hight=${searchParams.height}&&`;
    if (searchParams.weight) query += `weight=${searchParams.weight}&&`;
    if (searchParams.name) query += `name=${searchParams.name}&&`;

    return query.length > 1 ? query.slice(0, query.length - 2) : "";
  }

  function handleSubmit() {
    const query = getQuery();
    if (!query) return;
    setShowSearch(false);

    navigate(`/Search${query}`);
  }

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
              <Form.Select
                className="me-3 w-100"
                name="type"
                onChange={(e) => handleInput(e)}
              >
                <option value={""}>Select animal type</option>
                <option value={PetType[PetType.Dog]}>Dog</option>
                <option value={PetType[PetType.Cat]}>Cat</option>
                <option value={PetType[PetType.Other]}>Other</option>
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
              <option value={AdoptStatus[AdoptStatus.Adopted]}>Adopted</option>
              <option value={AdoptStatus[AdoptStatus.Available]}>
                Available
              </option>
              <option value={AdoptStatus[AdoptStatus.Fostered]}>
                Fostered
              </option>
            </Form.Select>
            <div className="d-flex mb-2">
              <span className="align-self-center me-3 search-label">Name:</span>
              <Form.Control
                type="text"
                name="name"
                onChange={(e) => handleInput(e)}
              />
            </div>
            <div className="d-flex  mb-2">
              <span className="align-self-center me-3 search-label">
                Height:
              </span>
              <Form.Control
                type="number"
                name="height"
                onChange={(e) => handleInput(e)}
              />
            </div>
            <div className="d-flex mb-2">
              <span className="align-self-center me-3 search-label">
                Width:
              </span>
              <Form.Control
                type="number"
                name="weight"
                onChange={(e) => handleInput(e)}
              />
            </div>
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
