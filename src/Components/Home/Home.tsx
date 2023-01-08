import "bootstrap/dist/css/bootstrap.min.css";
import "../../style/Home.css";
import { useContext, useEffect, useState } from "react";
import { UserContext, NewPetsContext } from "../../App";
import NewPets from "./NewPets";

const Home: React.FC = () => {
  const { user } = useContext(UserContext);
  const [showNewPets, setShowNewPets] = useState<boolean>(false);
  const { newPets } = useContext(NewPetsContext);
  console.log(newPets);

  useEffect(() => {
    if (newPets.length === 0) setShowNewPets(false);
  }, [newPets]);

  return (
    <div className="App">
      <div className="home">
        <div className="img">
          {showNewPets ? (
            <NewPets pets={newPets!} />
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
                      <span>We've got</span>
                      <span className="text-red">{` ${newPets.length} `}</span>
                      <span>
                        {`new pet${newPets.length > 1 ? "s" : ""} for you`}.
                      </span>
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
};

export default Home;
