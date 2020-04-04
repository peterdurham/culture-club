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
      year
      developer
      description
      genre1
      genre2
      genre3
      image
      largeImage
    }
  }
`;

const Center = styled.div`
  text-align: center;
`;

const GamesList = styled.div`
  /* display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-gap: 40px; */

  display: flex;
  flex-wrap: wrap;
  max-width: ${(props) => props.theme.maxWidth};
  margin: 40px auto 100px auto;
`;

const Games = (props) => {
  const filters = ["all", "toWatch", "seenIt", "genre", "year"];
  // const view = ["default", "wide", "list"];
  const [view, setView] = React.useState("default");
  // const view = "wide";
  return (
    <User>
      {({ data: { me } }) => {
        return (
          <Center>
            <SearchGames />
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "20px",
              }}
            >
              <button className="button" onClick={() => setView("default")}>
                Default
              </button>
              <button className="button" onClick={() => setView("wide")}>
                Wide
              </button>
              <button className="button" onClick={() => setView("list")}>
                List
              </button>
            </div>
            <Pagination page={props.page} />
            <Query
              query={ALL_GAMES_QUERY}
              // fetchPolicy="network-only"
              variables={{
                skip: props.page * perPage - perPage,
                first: perPage,
              }}
            >
              {({ data, error, loading }) => {
                if (loading) return <p>Loading...</p>;
                if (error) return <p>Error: {error.message}</p>;

                return (
                  <GamesList>
                    {props.filter === "all" && (
                      <>
                        {data.games.map((game) => (
                          <Game game={game} key={game.id} me={me} view={view} />
                        ))}
                      </>
                    )}
                    {props.filter === "toWatch" && (
                      <>
                        {data.games
                          .filter((game) => {
                            const toWatchIds = me.toWatch.map(
                              (item) => item.game.id
                            );

                            return toWatchIds.indexOf(game.id) > -1;
                          })
                          .map((game) => (
                            <Game
                              game={game}
                              key={game.id}
                              me={me}
                              view={view}
                            />
                          ))}
                      </>
                    )}
                    {props.filter === "seenIt" && (
                      <>
                        {data.games
                          .filter((game) => {
                            const seenItIds = me.seenIt.map(
                              (item) => item.game.id
                            );

                            return seenItIds.indexOf(game.id) > -1;
                          })
                          .map((game) => (
                            <Game
                              game={game}
                              key={game.id}
                              me={me}
                              view={view}
                            />
                          ))}
                      </>
                    )}
                  </GamesList>
                );
              }}
            </Query>
            <Pagination page={props.page} />
          </Center>
        );
      }}
    </User>
  );
};

export default Games;
export { ALL_GAMES_QUERY };
