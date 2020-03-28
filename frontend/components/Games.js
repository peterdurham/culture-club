import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import Game from "./Game";
import Pagination from "./PaginationGames";
import { perPage } from "../config";

const ALL_GAMES_QUERY = gql`
  query ALL_GAMES_QUERY($skip: Int = 0, $first: Int = ${perPage}) {
    games(first: $first, skip: $skip, orderBy: title_DESC) {
      id
      title
      developer
      year
      description
      image
      largeImage
    }
  }
`;

const Center = styled.div`
  text-align: center;
`;

const GamesList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 200px 200px 200px;
  grid-column-gap: 20px;
  grid-row-gap: 20px;
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
`;

class Games extends Component {
  render() {
    return (
      <Center>
        <Pagination page={this.props.page} />
        <Query
          query={ALL_GAMES_QUERY}
          // fetchPolicy="network-only"
          variables={{
            skip: this.props.page * perPage - perPage,
            first: perPage
          }}
        >
          {({ data, error, loading }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error: {error.message}</p>;
            return (
              <GamesList>
                {data.games.map(game => (
                  <Game game={game} key={game.id} />
                ))}
              </GamesList>
            );
          }}
        </Query>
        <Pagination page={this.props.page} />
      </Center>
    );
  }
}

export default Games;
export { ALL_GAMES_QUERY };
