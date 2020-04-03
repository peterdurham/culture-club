import React, { Component } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import Game from "./Game";
import Pagination from "./PaginationGames";
import { perPage } from "../config";
import SearchGames from "./SearchGames";
import User from "./User";

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
      <User>
        {({ data: { me } }) => {
          return (
            <Center>
              <SearchGames />
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
                      {this.props.filter === "all" && (
                        <>
                          {data.games.map(game => (
                            <Game game={game} key={game.id} me={me} />
                          ))}
                        </>
                      )}
                      {this.props.filter === "toPlay" && (
                        <>
                          {data.games
                            .filter(game => {
                              const toPlayIds = me.toPlay.map(
                                item => item.game.id
                              );

                              return toPlayIds.indexOf(game.id) > -1;
                            })
                            .map(game => (
                              <Game game={game} key={game.id} me={me} />
                            ))}
                        </>
                      )}
                      {this.props.filter === "playedIt" && (
                        <>
                          {data.games
                            .filter(game => {
                              const playedItIds = me.playedIt.map(
                                item => item.game.id
                              );

                              return playedItIds.indexOf(game.id) > -1;
                            })
                            .map(game => (
                              <Game game={game} key={game.id} me={me} />
                            ))}
                        </>
                      )}
                    </GamesList>
                  );
                }}
              </Query>
              <Pagination page={this.props.page} />
            </Center>
          );
        }}
      </User>
    );
  }
}

export default Games;
export { ALL_GAMES_QUERY };
