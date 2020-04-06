import React from "react";
import styled from "styled-components";
import Link from "next/link";

import AddToToPlay from "./AddToToPlay";
import RemoveFromToPlay from "./RemoveFromToPlay";
import AddToPlayedIt from "./AddToPlayedIt";
import RemoveFromPlayedIt from "./RemoveFromPlayedIt";

import shuffleArray from "../lib/shuffleArray";
import SimilarCardStyles from "./styles/SimilarCard";

const SimilarGames = ({ me, games, genre, genreLabel }) => {
  if (!games) return <div>loading...</div>;

  let toPlayIds;
  let playedItIds;

  if (me) {
    toPlayIds = me.toPlay.map((item) => item.game.id);
    playedItIds = me.playedIt.map((item) => item.game.id);
  }

  const genreGames = games.filter((game) => {
    const one = game.genre1 === genre;
    const two = game.genre2 === genre;
    const three = game.genre3 === genre;

    return one || two || three;
  });

  const shuffledGames = shuffleArray(genreGames);

  return (
    <div>
      <h2 style={{ marginBottom: 0 }}>Other {genreLabel} Games</h2>
      {games && (
        <div className="similar-card-container">
          {shuffledGames.map((game, index) => {
            if (index < 5)
              return (
                <SimilarCardStyles>
                  <Link
                    href={{
                      pathname: "/game",
                      query: { id: game.id },
                    }}
                  >
                    <a>
                      {game.image && <img src={game.image} alt="game poster" />}
                    </a>
                  </Link>

                  <div className="similarDetails">
                    <div className="similarTitle">
                      <Link
                        href={{
                          pathname: "/game",
                          query: { id: game.id },
                        }}
                      >
                        {game.title}
                      </Link>
                    </div>
                    {me && (
                      <div className="flex-apart similarButtons">
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
                </SimilarCardStyles>
              );
          })}
        </div>
      )}
    </div>
  );
};
export default SimilarGames;
