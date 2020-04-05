import styled from "styled-components";

const CardDefaultStyles = styled.div`
  height: 352px;
  width: 184px;
  margin: 20px 8px;
  position: relative;
  img {
    width: 100%;
    height: 275px;
    object-fit: cover;
    transition: all 0.3s;
  }
  img:hover {
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.67);
  }
  .cardDefaultTitle {
    font-size: 1.7rem;
    line-height: 2.8rem;
    max-height: 2.8rem;
    overflow: hidden;
    font-weight: 700;
    text-align: left;
    cursor: pointer;
  }
  .cardDefaultTitle:hover {
    text-decoration: underline;
  }
  .buttons {
    height: 24px;
    display: flex;
  }
  .buttons {
    cursor: pointer;
  }

  .details span:hover {
    text-decoration: underline;
  }
  .cardDefaultDetails {
    margin-top: -6px;
  }
  .cardDefaultGenres {
    text-align: left;
    font-size: 1.3rem;
    line-height: 2.1rem;
    max-height: 2.1rem;
    overflow: hidden;
  }
  .cardDefaultGenres span {
  }
  .flex-apart {
    display: flex;
    justify-content: space-between;
  }
  .cardDefaultYear {
    font-size: 1.3rem;
    line-height: 2.1rem;
    align-self: flex-start;
  }
  .cardDefaultListButtons {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
  }
  .cardDefaultListButtons button {
    width: 50%;
    transition: all 0.3s;
  }
  .cardDefaultListButtons button:not(:last-child) {
    margin-right: 8px;
  }
  .cardDefaultButtons {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 8px;
    right: 8px;
  }
  .cardDefaultButtons button:not(:first-child) {
    margin-top: 4px;
  }

  /* .list-buttons button:hover {
    border: 1px solid rgb(0, 0, 0, 0.25);
    background: rgb(0, 0, 0, 0.1);
  } */
  svg {
    font-size: 1.72rem;
    margin-left: 6px;
  }
`;
export default CardDefaultStyles;
