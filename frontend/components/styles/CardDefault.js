import styled from "styled-components";

const CardDefaultStyles = styled.div`
  height: 355px;
  width: 190px;
  margin: 48px 4px;
  img {
    width: 100%;
    height: 275px;
    object-fit: cover;
    transition: all 0.3s;
  }
  img:hover {
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.67);
  }
  .title {
    font-size: 1.6rem;
    line-height: 2.4rem;
    font-weight: 700;
    max-width: 15.6rem;
    text-align: left;
    cursor: pointer;
  }
  .title:hover {
    text-decoration: underline;
  }
  .buttons {
    height: 24px;
    display: flex;
  }
  .buttons {
    cursor: pointer;
  }
  .details {
    margin: 0.4rem 0;
    font-size: 1.4rem;
    line-height: 2.6rem;
  }
  .details span {
    cursor: pointer;
  }
  .details span:hover {
    text-decoration: underline;
  }
  .cardDefaultGenres {
    text-align: left;
  }
  .flex-apart {
    display: flex;
    justify-content: space-between;
  }
  .list-buttons {
    width: 100%;
  }
  .list-buttons button {
    border-radius: 4px;
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    line-height: 24px;
    border: 1px solid rgb(0, 0, 0, 0.1);
    transition: all 0.3s;
  }
  .list-buttons button:hover {
    border: 1px solid rgb(0, 0, 0, 0.25);
    background: rgb(0, 0, 0, 0.1);
  }
  svg {
    font-size: 1.72rem;
    margin-left: 6px;
  }
  button {
    background: #fff;
    border: none;
    padding: 0 0 0 4px;

    cursor: pointer;
  }
`;
export default CardDefaultStyles;
