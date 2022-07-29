import React from "react";
import Card from "../Components/UI/Card/Card";
import classes from "./Home.module.css";

function Home() {
  return (
    <Card className={classes.home}>
      <h1>Welcome Back</h1>
    </Card>
  );
}

export default Home;
