import "bootstrap/dist/css/bootstrap.min.css";
import "../../style/Home.css";
import { useEffect, useState } from "react";
import NewPets from "./NewPets";
import NewPetsMsg from "./NewPetsMsg";
import NewAvailablePetsMsg from "./NewAvailablePetsMsg";
import { useAppSelector } from "../../hooks/redux";

const Home: React.FC = () => {
  const { user } = useAppSelector((state) => state.user);
  const [showNewPets, setShowNewPets] = useState<boolean>(false);
  const { newPets, newAvailablePets } = useAppSelector((state) => state.pet);

  useEffect(() => {
    if (newPets.length === 0 && newAvailablePets.length === 0)
      setShowNewPets(false);
  }, [newPets, newAvailablePets]);

  return (
    <div className="App">
      <div className="home">
        <div className="img">
          {showNewPets ? (
            <NewPets pets={newPets.concat(newAvailablePets)} />
          ) : (
            <div className="title">
              {user ? (
                <div className="d-flex flex-column">
                  <div>{`Welcome back, ${user.firstName} ${user.lastName}!`}</div>

                  <div
                    className="pointer d-flex flex-column"
                    onClick={() => setShowNewPets(true)}
                  >
                    <NewPetsMsg num={newPets.length} />
                    <NewAvailablePetsMsg num={newAvailablePets.length} />
                  </div>
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
