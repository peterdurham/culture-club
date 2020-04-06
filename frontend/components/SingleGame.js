import React, { Component } from "react";
import gql from "graphql-tag";
import Head from "next/head";
import Link from "next/link";
import { Query } from "react-apollo";
import styled from "styled-components";
import AddToToPlay from "./AddToToPlay";
import RemoveFromToPlay from "./RemoveFromToPlay";
import AddToPlayedIt from "./AddToPlayedIt";
import RemoveFromPlayedIt from "./RemoveFromPlayedIt";
import DeleteGame from "./DeleteGame";
import Error from "./ErrorMessage";
import { TiEdit } from "react-icons/ti";
import { GameGenres, GamePlatforms, GameNumPlayers } from "../config";
import DetailsPageStyles from "./styles/DetailsPage";
import User from "./User";
import SimilarGames from "./SimilarGames";

const ALL_GAMES_QUERY = gql`
  query ALL_GAMES_QUERY($skip: Int = 0) {
    games(skip: $skip, orderBy: title_DESC) {
      id
      title
      developer
      year
      description
      numPlayers
      platform1
      platform2
      platform3
      genre1
      genre2
      genre3
      image
      largeImage
      user {
        id
      }
    }
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
      numPlayers
      platform1
      platform2
      platform3
      genre1
      genre2
      genre3
      largeImage
      user {
        id
      }
    }
  }
`;

class SingleGame extends Component {
  render() {
    const { me } = this.props;
    let toPlayIds;
    let playedItIds;
    if (me) {
      toPlayIds = this.props.me.toPlay.map((item) => item.game.id);
      playedItIds = this.props.me.playedIt.map((item) => item.game.id);
    }
    return (
      <User>
        {({ data: { me } }) => {
          return (
            <Query query={ALL_GAMES_QUERY}>
              {({ error, loading, data }) => {
                if (error) return <Error error={error} />;
                if (loading) return <p>Loading...</p>;
                if (!data.games)
                  return <p>No game Found for {this.props.id}</p>;
                const game = data.games.filter(
                  (game) => game.id === this.props.id
                )[0];

                const genres = [game.genre1, game.genre2, game.genre3];
                const genreTitles = GameGenres.map((genre) => genre.title);
                const genreValues = GameGenres.map((genre) => genre.value);

                const genreLabels = genres.map((genre, index) => {
                  const genreIndex = genreValues.indexOf(genre);
                  return genreTitles[genreIndex];
                });

                const platforms = [
                  game.platform1,
                  game.platform2,
                  game.platform3,
                ];
                const platformTitles = GamePlatforms.map(
                  (platform) => platform.title
                );
                const platformValues = GamePlatforms.map(
                  (platform) => platform.value
                );

                const platformLabels = platforms.map((platform, index) => {
                  const platformIndex = platformValues.indexOf(platform);
                  return platformTitles[platformIndex];
                });

                const numPlayers = [game.numPlayers];
                const numPlayersTitles = GameNumPlayers.map(
                  (numPlayers) => numPlayers.title
                );
                const numPlayersValues = GameNumPlayers.map(
                  (numPlayers) => numPlayers.value
                );

                const numPlayersLabels = numPlayers.map((numPlayers, index) => {
                  const numPlayersIndex = numPlayersValues.indexOf(numPlayers);
                  return numPlayersTitles[numPlayersIndex];
                });
                return (
                  <>
                    <DetailsPageStyles>
                      <Head>
                        <title>Culture Club | {game.title}</title>
                      </Head>
                      <div className="singleImageContainer">
                        <img
                          src={game.largeImage}
                          alt={game.title}
                          className="singleImage"
                        />
                        {me && (
                          <div className="singleButtons">
                            {toPlayIds.indexOf(game.id) > -1 ? (
                              <RemoveFromToPlay id={game.id} />
                            ) : (
                              <AddToToPlay id={game.id} />
                            )}

                            {playedItIds.indexOf(game.id) > -1 ? (
                              <RemoveFromPlayedIt id={game.id} />
                            ) : (
                              <AddToPlayedIt id={game.id} />
                            )}
                          </div>
                        )}
                      </div>
                      <div className="singleDetails">
                        <div>
                          <h2 className="singleTitle">{game.title} </h2>

                          <div className="singleYear">
                            <Link
                              href={{
                                pathname: "/year",
                                query: {
                                  type: "game",
                                  year: game.year,
                                },
                              }}
                            >
                              <a>({game.year})</a>
                            </Link>
                          </div>
                          <div className="singleActions">
                            <Link
                              href={{
                                pathname: "update-game",
                                query: { id: game.id },
                              }}
                            >
                              <a className="button singleEdit">Edit</a>
                            </Link>

                            <DeleteGame id={game.id}>Delete</DeleteGame>
                          </div>
                        </div>

                        <div className="singleGenres">
                          <span className="bold">Genres: </span>

                          <Link
                            href={{
                              pathname: "/genre",
                              query: {
                                type: "game",
                                genre: game.genre1,
                              },
                            }}
                          >
                            <a>
                              <span>{genreLabels[0]}</span>
                            </a>
                          </Link>
                          <Link
                            href={{
                              pathname: "/genre",
                              query: {
                                type: "game",
                                genre: game.genre2,
                              },
                            }}
                          >
                            <a>
                              {game.genre2 !== "UNSELECTED" && (
                                <span>, {genreLabels[1]}</span>
                              )}
                            </a>
                          </Link>
                          <Link
                            href={{
                              pathname: "/genre",
                              query: {
                                type: "game",
                                genre: game.genre3,
                              },
                            }}
                          >
                            <a>
                              {game.genre3 !== "UNSELECTED" && (
                                <span>, {genreLabels[2]}</span>
                              )}
                            </a>
                          </Link>
                        </div>
                        <div className="singlePlatforms">
                          <span className="bold">Platforms: </span>
                          <Link
                            href={{
                              pathname: "/platform",
                              query: {
                                type: "game",
                                platform: game.platform1,
                              },
                            }}
                          >
                            <a>
                              <span>{platformLabels[0]}</span>
                            </a>
                          </Link>

                          {game.platform2 !== "UNSELECTED" && (
                            <Link
                              href={{
                                pathname: "/platform",
                                query: {
                                  type: "game",
                                  platform: game.platform3,
                                },
                              }}
                            >
                              <a>
                                <span>, {platformLabels[1]}</span>
                              </a>
                            </Link>
                          )}
                          {game.platform3 !== "UNSELECTED" && (
                            <Link
                              href={{
                                pathname: "/platform",
                                query: {
                                  type: "game",
                                  platform: game.platform3,
                                },
                              }}
                            >
                              <a>
                                <span>, {platformLabels[2]}</span>
                              </a>
                            </Link>
                          )}
                        </div>
                        {game.developer && (
                          <div>
                            <Link
                              href={{
                                pathname: "/developer",
                                query: {
                                  type: "game",
                                  developer: game.developer,
                                },
                              }}
                            >
                              <a>
                                <span className="bold">Developer: </span>
                                {game.developer}
                              </a>
                            </Link>
                          </div>
                        )}

                        <div className="singleDescription">
                          <span className="bold">Description: </span>
                          {game.description}
                        </div>
                      </div>
                    </DetailsPageStyles>
                    <>
                      <SimilarGames
                        me={me}
                        games={data.games}
                        genre={game.genre1}
                        genreLabel={genreLabels[0]}
                        cardView={this.props.cardView}
                      />
                      {game.genre2 !== "UNSELECTED" && (
                        <SimilarGames
                          me={me}
                          games={data.games}
                          genre={game.genre2}
                          genreLabel={genreLabels[1]}
                          cardView={this.props.cardView}
                        />
                      )}
                      {game.genre3 !== "UNSELECTED" && (
                        <SimilarGames
                          me={me}
                          games={data.games}
                          genre={game.genre3}
                          genreLabel={genreLabels[2]}
                          cardView={this.props.cardView}
                        />
                      )}
                    </>
                  </>
                );
              }}
            </Query>
          );
        }}
      </User>
    );
  }
}
export default SingleGame;
