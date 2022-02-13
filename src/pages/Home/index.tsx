import React from "react";
import { Main } from "components/home";

const Home: React.FC = () => {
  return (
    <>
      <div data-testid='home-test'>
        <Main />
      </div>
    </>
  );
};

export default Home;
