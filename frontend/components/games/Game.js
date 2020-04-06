import React, { Component } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import styled from "styled-components";

import PriceTag from "../styles/PriceTag";
import formatMoney from "../../lib/formatMoney";
import DeleteGame from "./DeleteGame";

import DeleteButton from "../DeleteButton";
import AddToCart from "../AddToCart";
import AddToToPlay from "./AddToToPlay";
import RemoveFromToPlay from "./RemoveFromToPlay";
import AddToPlayedIt from "./AddToPlayedIt";
import RemoveFromPlayedIt from "./RemoveFromPlayedIt";
import CardDefault from "../styles/CardDefault";
import CardWide from "../styles/CardWide";
import ListView from "../styles/ListView";
import { TiEdit } from "react-icons/ti";
import { AiOutlineDelete } from "react-icons/ai";
import { GameGenres, GamePlatforms, GameNumPlayers } from "../../config";

const GameCard = ({ game, me, cardView }) => {
  let toPlayIds;
  let playedItIds;
  if (me) {
    toPlayIds = me.toPlay.map((item) => item.game.id);
    playedItIds = me.playedIt.map((item) => item.game.id);
  }
  const genres = [game.genre1, game.genre2, game.genre3];
  const genreTitles = GameGenres.map((genre) => genre.title);
  const genreValues = GameGenres.map((genre) => genre.value);

  const genreLabels = genres.map((genre, index) => {
    const genreIndex = genreValues.indexOf(genre);
    return genreTitles[genreIndex];
  });

  const platforms = [game.platform1, game.platform2, game.platform3];
  const platformTitles = GamePlatforms.map((platform) => platform.title);
  const platformValues = GamePlatforms.map((platform) => platform.value);

  const platformLabels = platforms.map((platform, index) => {
    const platformIndex = platformValues.indexOf(platform);
    return platformTitles[platformIndex];
  });

  const numPlayers = [game.numPlayers];
  const numPlayersTitles = GameNumPlayers.map((numPlayers) => numPlayers.title);
  const numPlayersValues = GameNumPlayers.map((numPlayers) => numPlayers.value);

  const numPlayersLabels = numPlayers.map((numPlayers, index) => {
    const numPlayersIndex = numPlayersValues.indexOf(numPlayers);
    return numPlayersTitles[numPlayersIndex];
  });

  if (cardView === "default") {
    return (
      <CardDefault>
        <Link
          href={{
            pathname: "/game",
            query: { id: game.id },
          }}
        >
          <a>{game.image && <img src={game.image} alt="game poster" />}</a>
        </Link>

        <div className="cardDefaultDetails">
          <Link
            href={{
              pathname: "/game",
              query: { id: game.id },
            }}
          >
            <div className="cardDefaultTitle">{game.title}</div>
          </Link>

          <div className="cardDefaultButtons">
            <Link
              href={{
                pathname: "update-game",
                query: { id: game.id },
              }}
            >
              <a className="button">
                {/* <TiEdit /> */}
                Edit
              </a>
            </Link>
            <DeleteGame id={game.id}>Delete</DeleteGame>
          </div>

          <div className="flex-apart details">
            <div className="cardDefaultGenres">
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
            <Link
              href={{
                pathname: "/year",
                query: {
                  type: "game",
                  year: game.year,
                },
              }}
            >
              <a className="cardDefaultYear">
                <span>({game.year})</span>
              </a>
            </Link>
          </div>
          {me && (
            <div className="flex-apart cardDefaultListButtons">
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
      </CardDefault>
    );
  } else if (cardView === "wide") {
    return (
      <CardWide>
        {game.image && (
          <img className="cardWideImage" src={game.image} alt={game.title} />
        )}

        <div className="cardWideDetails flex-apart">
          <div className="cardWideDetailsTop">
            <Link
              href={{
                pathname: "/game",
                query: { id: game.id },
              }}
            >
              <a className="cardWideTitle">{game.title}</a>
            </Link>

            <div className="cardWideYear">
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

            {game.platform1 && (
              <div className="cardWideGenres">
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
                  <a>{platformLabels[0]}</a>
                </Link>

                {game.platform2 !== "UNSELECTED" && (
                  <Link
                    href={{
                      pathname: "/platform",
                      query: {
                        type: "game",
                        platform: game.platform2,
                      },
                    }}
                  >
                    <a>
                      <span>, {platformLabels[1]}</span>{" "}
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
            )}
            {game.genre1 && (
              <div className="cardWideGenres">
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
                    <span className="bold">Genres: </span>
                    {genreLabels[0]}
                  </a>
                </Link>
                {game.genre2 !== "UNSELECTED" && (
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
                      <span>, {genreLabels[1]}</span>
                    </a>
                  </Link>
                )}
                {game.genre3 !== "UNSELECTED" && (
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
                      <span>, {genreLabels[2]}</span>
                    </a>
                  </Link>
                )}
              </div>
            )}
            {game.developer && (
              <div>
                {" "}
                <span className="bold">Developer: </span>
                <Link
                  href={{
                    pathname: "/developer",
                    query: {
                      type: "game",
                      developer: game.developer,
                    },
                  }}
                >
                  <a>{game.developer}</a>
                </Link>
              </div>
            )}
            {game.numPlayers && (
              <div>
                <span className="bold">Players: </span>

                <Link
                  href={{
                    pathname: "/players",
                    query: {
                      type: "game",
                      players: game.numPlayers,
                    },
                  }}
                >
                  <a>{numPlayersLabels[0]}</a>
                </Link>
              </div>
            )}
          </div>
          {me && (
            <div className="cardWideListButtons list-buttons ">
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
          {me && me.id === game.user.id && (
            <div className="cardWideButtonList">
              <Link
                href={{
                  pathname: "update-game",
                  query: { id: game.id },
                }}
              >
                <a className="edit-link button flex-apart">Edit</a>
              </Link>

              <DeleteGame id={game.id} className="flex-apart">
                Delete
              </DeleteGame>
            </div>
          )}
        </div>
      </CardWide>
    );
  } else if (cardView === "list") {
    return (
      <ListView>
        <Link
          href={{
            pathname: "/game",
            query: { id: game.id },
          }}
        >
          <a className="listViewTitle">{game.title}</a>
        </Link>
        <div className="listViewYear">({game.year})</div>
        <div className="listViewGenres">
          {genreLabels[0]}
          {game.genre2 !== "UNSELECTED" && <span>{genreLabels[1]}</span>}
          {game.genre3 !== "UNSELECTED" && <span>{genreLabels[2]}</span>}
        </div>
        <p className="listViewDescription">{game.description}</p>

        <div className="listViewButtons">
          {me && (
            <div className="flex-apart">
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
          <div className="flex-end">
            <Link
              href={{
                pathname: "update-game",
                query: { id: game.id },
              }}
            >
              <a className="edit-link">
                <TiEdit />
              </a>
            </Link>

            <DeleteGame id={game.id}>Delete This game</DeleteGame>
          </div>
        </div>
      </ListView>
    );
  }
};
export default GameCard;
