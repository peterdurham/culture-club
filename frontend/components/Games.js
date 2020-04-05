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
      platform1
      platform2
      platform3
      genre1
      genre2
      genre3
      numPlayers
      image
      largeImage
      user {
        id
      }
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
`;

const Games = (props) => {
  const filters = ["all", "toPlay", "playedIt", "genre", "year"];
  // const view = ["default", "wide", "list"];

  return (
    <User>
      {({ data: { me } }) => {
        return (
          <Center>
            {props.genre && (
              <h1 className="page-header">{props.genreLabel} Games</h1>
            )}
            {props.platform && (
              <h1 className="page-header">{props.platformLabel} Games</h1>
            )}
            {props.year && (
              <h1 className="page-header">Games from {props.year}</h1>
            )}
            {props.developer && (
              <h1 className="page-header">Games by {props.developer}</h1>
            )}
            {props.players && (
              <h1 className="page-header">{props.playersLabel} Games</h1>
            )}
            <SearchGames />
            <div className="cardStyleButtons">
              <button
                className="button"
                onClick={() => props.setCardView("default")}
              >
                Default View
              </button>
              <button
                className="button"
                onClick={() => props.setCardView("wide")}
              >
                Wide View
              </button>
              {/* <button className="button" onClick={() => setView("list")}>
                List
              </button> */}
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
                          <Game
                            game={game}
                            key={game.id}
                            me={me}
                            cardView={props.cardView}
                          />
                        ))}
                      </>
                    )}
                    {props.filter === "toPlay" && (
                      <>
                        {data.games
                          .filter((game) => {
                            const toPlayIds = me.toPlay.map(
                              (item) => item.game.id
                            );

                            return toPlayIds.indexOf(game.id) > -1;
                          })
                          .map((game) => (
                            <Game
                              game={game}
                              key={game.id}
                              me={me}
                              cardView={props.cardView}
                            />
                          ))}
                      </>
                    )}
                    {props.filter === "playedIt" && (
                      <>
                        {data.games
                          .filter((game) => {
                            const playedItIds = me.playedIt.map(
                              (item) => item.game.id
                            );

                            return playedItIds.indexOf(game.id) > -1;
                          })
                          .map((game) => (
                            <Game
                              game={game}
                              key={game.id}
                              me={me}
                              cardView={props.cardView}
                            />
                          ))}
                      </>
                    )}
                    {props.filter === "genre" && (
                      <>
                        {data.games
                          .filter((game) => {
                            const first = game.genre1 === props.genre;
                            const second = game.genre2 === props.genre;
                            const third = game.genre3 === props.genre;
                            return first || second || third;
                          })
                          .map((game) => (
                            <Game
                              game={game}
                              key={game.id}
                              me={me}
                              cardView={props.cardView}
                            />
                          ))}
                      </>
                    )}
                    {props.filter === "platform" && (
                      <>
                        {data.games
                          .filter((game) => {
                            const first = game.platform1 === props.platform;
                            const second = game.platform2 === props.platform;
                            const third = game.platform3 === props.platform;
                            return first || second || third;
                          })
                          .map((game) => (
                            <Game
                              game={game}
                              key={game.id}
                              me={me}
                              cardView={props.cardView}
                            />
                          ))}
                      </>
                    )}
                    {props.filter === "year" && (
                      <>
                        {data.games
                          .filter((game) => {
                            return game.year === Number(props.year);
                          })
                          .map((game) => (
                            <Game
                              game={game}
                              key={game.id}
                              me={me}
                              cardView={props.cardView}
                            />
                          ))}
                      </>
                    )}
                    {props.filter === "developer" && (
                      <>
                        {data.games
                          .filter((game) => {
                            return game.developer === props.developer;
                          })
                          .map((game) => (
                            <Game
                              game={game}
                              key={game.id}
                              me={me}
                              cardView={props.cardView}
                            />
                          ))}
                      </>
                    )}
                    {props.filter === "players" && (
                      <>
                        {data.games
                          .filter((game) => {
                            return game.numPlayers === props.players;
                          })
                          .map((game) => (
                            <Game
                              game={game}
                              key={game.id}
                              me={me}
                              cardView={props.cardView}
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
