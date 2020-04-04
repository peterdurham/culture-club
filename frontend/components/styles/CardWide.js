import styled from "styled-components";

const CardWide = styled.div`
  width: 380px;
  height: 220px;
  margin: 16px 10px;
  background: white;
  border: 1px solid ${(props) => props.theme.offWhite};
  box-shadow: ${(props) => props.theme.bs};
  position: relative;
  display: flex;
  padding: 8px;
  .cardWideImage {
    min-width: 133px;
    background-size: cover;
    height: 100%;
    width: 133px;
  }

  .cardWideDetails {
    width: 100%;
    text-align: left;
    position: relative;
    padding-left: 8px;

    flex-direction: column;
  }
  .flex-apart {
    display: flex;
    justify-content: space-between;
  }
  .cardWideTitle {
    font-size: 16px;
    font-weight: 700;
  }
  .cardWideGenres {
    font-size: 1.3rem;
  }
  h3 {
    margin: 0;
    margin: 0.8rem 1.8rem;
  }
  p {
    font-weight: 300;
    flex-grow: 1;
    margin: 0;
    font-size: 1.3rem;
    line-height: 1.7rem;
    max-height: 50px;
    overflow: hidden;
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
    cursor: pointer;
  }
  .list-buttons svg {
    margin-left: 4px;
  }
  .list-buttons button:not(:last-child) {
    margin-right: 8px;
  }
  .list-buttons button:hover {
    border: 1px solid rgb(0, 0, 0, 0.25);
    background: rgb(0, 0, 0, 0.1);
  }
  .buttonList {
    position: absolute;
    top: -5px;
    right: 0px;
    cursor: pointer;

    button {
      cursor: pointer;
    }
    svg {
      font-size: 1.8rem;
    }
    a:hover svg,
    button:hover svg {
      color: rgba(0, 0, 0, 0.5);
    }
    .edit-link {
      transform: translateY(4px);
    }

    & > * {
      background: white;
      border: 0;
      font-size: 1.4rem;
      padding: 0.4rem;
    }
  }
`;

export default CardWide;
