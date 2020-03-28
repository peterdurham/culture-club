// import React from 'react';
import Items from "../components/Items";
import Movies from "../components/Movies";
import Books from "../components/Books";
import Games from "../components/Games";

const Home = props => {
  return (
    <div>
      <Items page={parseFloat(props.query.page) || 1} />
      <Movies page={parseFloat(props.query.page) || 1} />
      <Books page={parseFloat(props.query.page) || 1} />
      <Games page={parseFloat(props.query.page) || 1} />
    </div>
  );
};
export default Home;
