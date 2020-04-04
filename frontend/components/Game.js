import React, { Component } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import styled from "styled-components";

import PriceTag from "./styles/PriceTag";
import formatMoney from "../lib/formatMoney";
import DeleteGame from "./DeleteGame";

import DeleteButton from "./DeleteButton";
import AddToCart from "./AddToCart";
import AddToToPlay from "./AddToToPlay";
import RemoveFromToPlay from "./RemoveFromToPlay";
import AddToPlayedIt from "./AddToPlayedIt";
import RemoveFromPlayedIt from "./RemoveFromPlayedIt";
import CardDefault from "./styles/CardDefault";
import CardWide from "./styles/CardWide";
import ListView from "./styles/ListView";
import { TiEdit } from "react-icons/ti";
import { GameGenres } from "../config";

const GameCard = ({ game, me, view }) => {
  const toPlayIds = me.toPlay.map((item) => item.game.id);
  const playedItIds = me.playedIt.map((item) => item.game.id);

  const genres = [game.genre1, game.genre2, game.genre3];
  const genreTitles = GameGenres.map((genre) => genre.title);
  const genreValues = GameGenres.map((genre) => genre.value);

  const genreLabels = genres.map((genre, index) => {
    const genreIndex = genreValues.indexOf(genre);
    return genreTitles[genreIndex];
  });

  if (view === "default") {
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

        <div className="game-details">
          <div className="flex-apart">
            <Link
              href={{
                pathname: "/game",
                query: { id: game.id },
              }}
            >
              <span className="title">{game.title}</span>
            </Link>

            <div className="buttons">
              <Link
                href={{
                  pathname: "update-game",
                  query: { id: game.id },
                }}
              >
                <TiEdit />
              </Link>
              <DeleteGame id={game.id}>Delete This game</DeleteGame>
            </div>
          </div>

          <div className="flex-apart details">
            <div className="cardDefaultGenres">
              <span>{genreLabels[0]}</span>
              {game.genre2 !== "UNSELECTED" && <span>, {genreLabels[1]}</span>}
              {game.genre3 !== "UNSELECTED" && <span>, {genreLabels[2]}</span>}
            </div>
            <span>{game.year}</span>
          </div>
          <div className="flex-apart list-buttons">
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
        </div>
      </CardDefault>
    );
  } else if (view === "wide") {
    return (
      <CardWide>
        {game.image && (
          <img className="cardWideImage" src={game.image} alt={game.title} />
        )}

        <div className="cardWideDetails flex-apart">
          <div>
            <Link
              href={{
                pathname: "/game",
                query: { id: game.id },
              }}
            >
              <a className="cardWideTitle">{game.title}</a>
            </Link>
            <div>({game.year})</div>
            <div className="cardWideGenres">
              {genreLabels[0]}
              {game.genre2 !== "UNSELECTED" && <span>, {genreLabels[1]}</span>}
              {game.genre3 !== "UNSELECTED" && <span>, {genreLabels[2]}</span>}
            </div>
            <p>{game.description}</p>
          </div>
          <div className="list-buttons flex-apart">
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
          <div
            className="buttonList"
            style={{ display: "flex", justifyContent: "center" }}
          >
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

            <DeleteGame id={game.id}>Delete</DeleteGame>
          </div>
        </div>
      </CardWide>
    );
  } else if (view === "list") {
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
