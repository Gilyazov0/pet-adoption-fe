import { Accordion, Button, Form } from "react-bootstrap";
import "../style/SearchBar.css";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { PetType } from "../Types/PetsTypes";
import { AdoptStatus } from "../Types/AdoptStatus";

const SearchBar: React.FC<{ setShowSearch: Function }> = ({
  setShowSearch,
}) => {
  const navigate = useNavigate();

  const type = useRef<HTMLSelectElement>(null);
  const status = useRef<HTMLSelectElement>(null);
  const hight = useRef<HTMLInputElement>(null);
  const weight = useRef<HTMLInputElement>(null);
  const name = useRef<HTMLInputElement>(null);

  function getQuery() {
    let query = "?";
    if (type.current!.value) query += `type=${type.current!.value}&&`;
    if (status.current!.value) query += `status=${status.current!.value}&&`;
    if (hight.current!.value) query += `hight=${hight.current!.value}&&`;
    if (weight.current!.value) query += `weight=${weight.current!.value}&&`;
    if (name.current!.value) query += `name=${name.current!.value}&&`;

    return query.length > 1 ? query.slice(0, query.length - 2) : "";
  }

  function handleSubmit() {
    const query = getQuery();
    if (!query) return;
    setShowSearch(false);

    navigate(`/Search/${query}`);
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
              <Form.Select className="me-3 w-100" ref={type}>
                <option value={""}>Select animal type</option>
                <option value={PetType[PetType.Dog]}>Dog</option>
                <option value={PetType[PetType.Cat]}>Cat</option>
                <option value={PetType[PetType.Other]}>Other</option>
              </Form.Select>
            </div>
          </Accordion.Header>
          <Accordion.Body>
            <Form.Select className="mb-2" ref={status}>
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
              <span
                className="align-self-center me-3 search-label"
                ref={weight}
              >
                Name:
              </span>
              <Form.Control type="text" ref={name} />
            </div>
            <div className="d-flex  mb-2">
              <span className="align-self-center me-3 search-label">
                Height:
              </span>
              <Form.Control type="number" ref={hight} />
            </div>
            <div className="d-flex mb-2">
              <span className="align-self-center me-3 search-label">
                Width:
              </span>
              <Form.Control type="number" ref={weight} />
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
