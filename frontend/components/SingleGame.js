import React, { Component } from "react";
import gql from "graphql-tag";
import Head from "next/head";
import { Query } from "react-apollo";
import styled from "styled-components";

import Error from "./ErrorMessage";

const SingleGameStyles = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  box-shadow: ${props => props.theme.bs};
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  min-height: 800px;
  padding: 0 4rem;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  .details {
    margin: 3rem;
    font-size: 2rem;
  }
`;

const SINGLE_GAME_QUERY = gql`
  query SINGLE_GAME_QUERY($id: ID!) {
    game(where: { id: $id }) {
      id
      title
      developer
      year
      description
      largeImage
    }
  }
`;

class SingleGame extends Component {
  render() {
    console.log(this.props.id);
    return (
      <Query
        query={SINGLE_GAME_QUERY}
        variables={{
          id: this.props.id
        }}
      >
        {({ error, loading, data }) => {
          if (error) return <Error error={error} />;
          if (loading) return <p>Loading...</p>;
          if (!data.game) return <p>No game Found for {this.props.id}</p>;
          const game = data.game;
          return (
            <SingleGameStyles>
              <Head>
                <title>Culture Club | {game.title}</title>
              </Head>
              <img src={game.largeImage} alt={game.title} />
              <div className="details">
                <h2>Viewing {game.title}</h2>
                <p>{game.description}</p>
              </div>
            </SingleGameStyles>
          );
        }}
      </Query>
    );
  }
}
export default SingleGame;
