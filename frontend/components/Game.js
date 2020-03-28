import React, { Component } from "react";
import PropTypes from "prop-types";
import Link from "next/link";

import PriceTag from "./styles/PriceTag";
import DeleteGame from "./DeleteGame";
import AddToCart from "./AddToCart";
import styled from "styled-components";

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
            <div>edit</div>
            <div>add to list</div>
            <div>delete</div>
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
