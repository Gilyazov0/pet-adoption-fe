import { Modal } from "react-bootstrap";
import SearchBar from "./SearchBar";

interface Props {
  showSearch: boolean;
  setShowSearch: Function;
}

const SearchBarModal: React.FC<Props> = ({ showSearch, setShowSearch }) => {
  return (
    <Modal show={showSearch} onHide={() => setShowSearch(false)} centered>
      <Modal.Body className=" ">
        <SearchBar />
      </Modal.Body>
    </Modal>
  );
};

export default SearchBarModal;
