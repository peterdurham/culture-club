import React from "react";
import styled from "styled-components";
import Link from "next/link";

import AddToToWatch from "./AddToToWatch";
import RemoveFromToWatch from "./RemoveFromToWatch";
import AddToSeenIt from "./AddToSeenIt";
import RemoveFromSeenIt from "./RemoveFromSeenIt";

import shuffleArray from "../../lib/shuffleArray";
import SimilarCardStyles from "../styles/SimilarCard";

const SimilarMovies = ({ me, movies, genre, genreLabel, id }) => {
  if (!movies) return <div>loading...</div>;

  let toWatchIds;
  let seenItIds;

  if (me) {
    toWatchIds = me.toWatch.map((item) => item.movie.id);
    seenItIds = me.seenIt.map((item) => item.movie.id);
  }

  const genreMovies = movies.filter((movie) => {
    const differentMovie = movie.id !== id;
    const one = movie.genre1 === genre;
    const two = movie.genre2 === genre;
    const three = movie.genre3 === genre;

    return differentMovie && (one || two || three);
  });

  const shuffledMovies = shuffleArray(genreMovies);

  if (genreMovies.length === 0) return null;
  return (
    <div>
      <h2 style={{ marginBottom: 0 }}>Other {genreLabel} Movies</h2>
      {movies && (
        <div className="similarCardContainer">
          {shuffledMovies.map((movie, index) => {
            if (index < 5)
              return (
                <SimilarCardStyles>
                  <Link
                    href={{
                      pathname: "/movie",
                      query: { id: movie.id },
                    }}
                  >
                    <a>
                      {movie.image && (
                        <img src={movie.image} alt="movie poster" />
                      )}
                    </a>
                  </Link>

                  <div className="similarDetails">
                    <div className="similarTitle">
                      <Link
                        href={{
                          pathname: "/movie",
                          query: { id: movie.id },
                        }}
                      >
                        {movie.title}
                      </Link>
                    </div>
                    {me && (
                      <div className="flex-apart similarButtons">
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
                </SimilarCardStyles>
              );
          })}
        </div>
      )}
    </div>
  );
};
export default SimilarMovies;
