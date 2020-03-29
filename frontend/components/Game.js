import React, { Component } from "react";
import PropTypes from "prop-types";
import Link from "next/link";

import PriceTag from "./styles/PriceTag";
import DeleteGame from "./DeleteGame";
import AddToCart from "./AddToCart";
import styled from "styled-components";

import DeleteButton from "./DeleteButton";

const GameStyles = styled.div`
  background: white;
  border: 1px solid ${props => props.theme.offWhite};
  box-shadow: ${props => props.theme.bs};
  position: relative;
  display: flex;
  padding: 4px;
  .gameImage {
    height: 100%;
    width: 40%;
  }
  .gameYear {
    position: absolute;
    left: 72px;
    bottom: 44px;
  }
  .gameDetails {
    width: 60%;
    text-align: left;
    position: relative;
  }
  h3 {
    margin: 0;
    margin: 0.8rem 1.8rem;
  }
  p {
    line-height: 2;
    font-weight: 300;
    flex-grow: 1;
    padding: 0rem 1.8rem;
    margin: 0;
    font-size: 1.5rem;
  }
  .buttonList {
    position: absolute;
    bottom: 0;
    right: 10px;
    cursor: pointer;

    & > * {
      background: white;
      border: 0;
      font-size: 1rem;
      padding: 1rem;
    }
  }
`;
const Title = styled.h3`
  /* transform: skew(-1deg) rotate(3deg); */

  text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.1);
  a {
    background: ${props => props.theme.red};
    display: inline;
    line-height: 1.3;
    font-size: 2.4rem;
    text-align: center;
    color: white;
    padding: 0 1rem;
  }
`;
class Game extends Component {
  static propTypes = {
    game: PropTypes.object.isRequired
  };

  render() {
    const { game } = this.props;
    return (
      <GameStyles>
        {/* {game.image && <img src={game.image} alt={game.title} />} */}
        <div className="gameYear">
          {" "}
          <PriceTag>{game.year}</PriceTag>
        </div>
        <div
          className="gameImage"
          style={{
            background: `url('${game.image}')`,
            backgroundSize: "cover",
            height: "100%"
          }}
        ></div>
        <div className="gameDetails">
          <Title>
            <Link
              href={{
                pathname: "/game",
                query: { id: game.id }
              }}
            >
              <a>{game.title}</a>
            </Link>
          </Title>

          {/* <p>{game.description}</p> */}
          <p>console</p>
          <p>developer</p>

          <div
            className="buttonList"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <Link
              href={{
                pathname: "update-game",
                query: { id: game.id }
              }}
            >
              <a>
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 576 512"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M402.3 344.9l32-32c5-5 13.7-1.5 13.7 5.7V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h273.5c7.1 0 10.7 8.6 5.7 13.7l-32 32c-1.5 1.5-3.5 2.3-5.7 2.3H48v352h352V350.5c0-2.1.8-4.1 2.3-5.6zm156.6-201.8L296.3 405.7l-90.4 10c-26.2 2.9-48.5-19.2-45.6-45.6l10-90.4L432.9 17.1c22.9-22.9 59.9-22.9 82.7 0l43.2 43.2c22.9 22.9 22.9 60 .1 82.8zM460.1 174L402 115.9 216.2 301.8l-7.3 65.3 65.3-7.3L460.1 174zm64.8-79.7l-43.2-43.2c-4.1-4.1-10.8-4.1-14.8 0L436 82l58.1 58.1 30.9-30.9c4-4.2 4-10.8-.1-14.9z"></path>
                </svg>
              </a>
            </Link>
            <div>add to list</div>
            <DeleteGame id={game.id}>
              <svg
                stroke="currentColor"
                fill="currentColor"
                stroke-width="0"
                viewBox="0 0 1024 1024"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z"></path>
              </svg>
            </DeleteGame>
          </div>

          {/* <div className="buttonList">
            <Link
              href={{
                pathname: "update",
                query: { id: game.id }
              }}
            >
              <a>Edit ✏️</a>
            </Link>
            <AddToCart id={game.id} />
            <DeleteGame id={game.id}>Delete This Game</DeleteGame>
          </div> */}
        </div>
      </GameStyles>
    );
  }
}
export default Game;
