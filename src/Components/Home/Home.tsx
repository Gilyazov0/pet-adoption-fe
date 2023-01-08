import "bootstrap/dist/css/bootstrap.min.css";
import "../../style/Home.css";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../App";
import EventApi from "../../lib/eventApi";
import Pet from "../../Types/Pet";
import NewPets from "./NewPets";
function Home() {
  const { user } = useContext(UserContext);
  const [newPets, setNewPets] = useState<Pet[]>([]);
  const [showNewPets, setShowNewPets] = useState<boolean>(false);

  useEffect(() => {
    async function getNewPets() {
      const response = await EventApi.getNewPets();

      if (response.data) {
        setNewPets(response.data);
      }
      console.log(response.data);
    }
    getNewPets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App">
      <div className="home">
        <div className="img">
          {showNewPets ? (
            <NewPets pets={newPets} />
          ) : (
            <div className="title">
              {user ? (
                <div className="d-flex flex-column">
                  <div>{`Welcome back, ${user.firstName} ${user.lastName}!`}</div>
                  {newPets.length > 0 && (
                    <div
                      className="pointer"
                      onClick={() => setShowNewPets(true)}
                    >
                      {`We have got ${newPets.length} new pet${
                        newPets.length > 1 ? "s" : ""
                      } for you.`}
                    </div>
                  )}
                </div>
              ) : (
                "Standing up for animals since... just about to start"
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
