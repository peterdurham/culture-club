import React, { Component } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import styled from "styled-components";

import PriceTag from "../styles/PriceTag";
import formatMoney from "../../lib/formatMoney";
import DeleteMovie from "./DeleteMovie";

import DeleteButton from "../DeleteButton";
import AddToCart from "../AddToCart";
import AddToToWatch from "./AddToToWatch";
import RemoveFromToWatch from "./RemoveFromToWatch";
import AddToSeenIt from "./AddToSeenIt";
import RemoveFromSeenIt from "./RemoveFromSeenIt";
import CardDefault from "../styles/CardDefault";
import CardWide from "../styles/CardWide";
import ListView from "../styles/ListView";
import { TiEdit } from "react-icons/ti";
import { AiOutlineDelete } from "react-icons/ai";
import { GoTrashcan } from "react-icons/go";
import { MovieGenres } from "../../config";

const MovieCard = ({ movie, me, cardView }) => {
  let toWatchIds;
  let seenItIds;

  if (me) {
    toWatchIds = me.toWatch.map((item) => {
      return item.movie.id;
    });
    seenItIds = me.seenIt.map((item) => item.movie.id);
  }

  const genres = [movie.genre1, movie.genre2, movie.genre3];
  const genreTitles = MovieGenres.map((genre) => genre.title);
  const genreValues = MovieGenres.map((genre) => genre.value);

  const genreLabels = genres.map((genre, index) => {
    const genreIndex = genreValues.indexOf(genre);
    return genreTitles[genreIndex];
  });

  if (cardView === "default") {
    return (
      <CardDefault>
        <Link
          href={{
            pathname: "/movie",
            query: { id: movie.id },
          }}
        >
          <a>{movie.image && <img src={movie.image} alt="movie poster" />}</a>
        </Link>

        <div className="cardDefaultDetails">
          <div className="cardDefaultTitle">
            <Link
              href={{
                pathname: "/movie",
                query: { id: movie.id },
              }}
            >
              <a>{movie.title}</a>
            </Link>
          </div>

          {me && me.id === movie.user.id && (
            <div className="cardDefaultButtons">
              <Link
                href={{
                  pathname: "update-movie",
                  query: { id: movie.id },
                }}
              >
                <a className="button">Edit</a>
              </Link>
              {/* <DeleteMovie id={movie.id}>Delete</DeleteMovie> */}
            </div>
          )}

          <div className="flex-apart details">
            <div className="cardDefaultGenres">
              <Link
                href={{
                  pathname: "/genre",
                  query: {
                    type: "movie",
                    genre: movie.genre1,
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
                    type: "movie",
                    genre: movie.genre2,
                  },
                }}
              >
                <a>
                  {movie.genre2 !== "UNSELECTED" && (
                    <span>, {genreLabels[1]}</span>
                  )}
                </a>
              </Link>
              <Link
                href={{
                  pathname: "/genre",
                  query: {
                    type: "movie",
                    genre: movie.genre3,
                  },
                }}
              >
                <a>
                  {movie.genre3 !== "UNSELECTED" && (
                    <span>, {genreLabels[2]}</span>
                  )}
                </a>
              </Link>
            </div>
            <Link
              href={{
                pathname: "/year",
                query: {
                  type: "movie",
                  year: movie.year,
                },
              }}
            >
              <a className="cardDefaultYear">
                <span>({movie.year})</span>
              </a>
            </Link>
          </div>
          {me && (
            <div className="flex-apart cardDefaultListButtons">
              {toWatchIds.indexOf(movie.id) > -1 ? (
                <RemoveFromToWatch id={movie.id} />
              ) : (
                <AddToToWatch id={movie.id} />
              )}
              {seenItIds.indexOf(movie.id) > -1 ? (
                <RemoveFromSeenIt id={movie.id} />
              ) : (
                <AddToSeenIt id={movie.id} />
              )}
            </div>
          )}
        </div>
      </CardDefault>
    );
  } else if (cardView === "wide") {
    return (
      <CardWide>
        {movie.image && (
          <img className="cardWideImage" src={movie.image} alt={movie.title} />
        )}

        <div className="cardWideDetails flex-apart">
          <div className="cardWideDetailsTop">
            <Link
              href={{
                pathname: "/movie",
                query: { id: movie.id },
              }}
            >
              <a className="cardWideTitle">{movie.title}</a>
            </Link>
            <div className="cardWideYear">
              <Link
                href={{
                  pathname: "/year",
                  query: {
                    type: "movie",
                    year: movie.year,
                  },
                }}
              >
                <a>({movie.year})</a>
              </Link>
            </div>

            {movie.genre1 && (
              <div className="cardWideGenres">
                <Link
                  href={{
                    pathname: "/genre",
                    query: {
                      type: "movie",
                      genre: movie.genre1,
                    },
                  }}
                >
                  <a>
                    <span className="bold">Genres: </span>
                    {genreLabels[0]}
                  </a>
                </Link>
                {movie.genre2 !== "UNSELECTED" && (
                  <Link
                    href={{
                      pathname: "/genre",
                      query: {
                        type: "movie",
                        genre: movie.genre2,
                      },
                    }}
                  >
                    <a>
                      <span>, {genreLabels[1]}</span>
                    </a>
                  </Link>
                )}
                {movie.genre3 !== "UNSELECTED" && (
                  <Link
                    href={{
                      pathname: "/genre",
                      query: {
                        type: "movie",
                        genre: movie.genre3,
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
            {movie.director && (
              <div>
                {" "}
                <span className="bold">Director: </span>
                <Link
                  href={{
                    pathname: "/director",
                    query: {
                      type: "movie",
                      director: movie.director,
                    },
                  }}
                >
                  <a>{movie.director}</a>
                </Link>
              </div>
            )}
            {movie.length && (
              <div>
                {" "}
                <span className="bold">Length: </span>
                {movie.length} minutes
              </div>
            )}
            {movie.imdbURL && (
              <div>
                {" "}
                <span className="bold">imdbURL: </span>
                {movie.imdbURL}
              </div>
            )}
          </div>
          {me && (
            <div className="cardWideListButtons list-buttons ">
              {toWatchIds.indexOf(movie.id) > -1 ? (
                <RemoveFromToWatch id={movie.id} />
              ) : (
                <AddToToWatch id={movie.id} />
              )}

              {seenItIds.indexOf(movie.id) > -1 ? (
                <RemoveFromSeenIt id={movie.id} />
              ) : (
                <AddToSeenIt id={movie.id} />
              )}
            </div>
          )}
          {me && me.id === movie.user.id && (
            <div className="cardWideButtonList">
              <Link
                href={{
                  pathname: "update-movie",
                  query: { id: movie.id },
                }}
              >
                <a className="edit-link button flex-apart">
                  Edit
                  {/* <TiEdit /> */}
                </a>
              </Link>
              {/* <DeleteMovie id={movie.id}>
                Delete
               
              </DeleteMovie> */}
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
            pathname: "/movie",
            query: { id: movie.id },
          }}
        >
          <a className="listViewTitle">{movie.title}</a>
        </Link>
        <div className="listViewYear">({movie.year})</div>
        <div className="listViewGenres">
          {genreLabels[0]}
          {movie.genre2 !== "UNSELECTED" && <span>{genreLabels[1]}</span>}
          {movie.genre3 !== "UNSELECTED" && <span>{genreLabels[2]}</span>}
        </div>
        <p className="listViewDescription">{movie.description}</p>

        <div className="listViewButtons">
          {me && (
            <div className="flex-apart">
              {toWatchIds.indexOf(movie.id) > -1 ? (
                <RemoveFromToWatch id={movie.id} />
              ) : (
                <AddToToWatch id={movie.id} />
              )}

              {seenItIds.indexOf(movie.id) > -1 ? (
                <RemoveFromSeenIt id={movie.id} />
              ) : (
                <AddToSeenIt id={movie.id} />
              )}
            </div>
          )}
          <div className="flex-end">
            <Link
              href={{
                pathname: "update-movie",
                query: { id: movie.id },
              }}
            >
              <a className="edit-link">
                <TiEdit />
              </a>
            </Link>

            <DeleteMovie id={movie.id}>Delete This Movie</DeleteMovie>
          </div>
        </div>
      </ListView>
    );
  }
};
export default MovieCard;
