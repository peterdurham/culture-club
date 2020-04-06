import styled from "styled-components";

const DetailsPageStyles = styled.div`
  /* max-width: 960px; */
  min-height: 520px;
  display: flex;
  position: relative;
  margin: 2rem auto;
  @media (max-width: 600px) {
    flex-direction: column;
  }
  .singleImageContainer {
    width: 300px;
    height: 450px;
    @media (max-width: 600px) {
      margin-right: auto;
      width: 200px;
      height: 300px;
    }
  }
  .singleImageContainer img {
    width: 300px;
    height: 450px;
    object-fit: contain;
    @media (max-width: 600px) {
      width: 200px;
      height: 300px;
    }
  }
  .singleButtons {
    display: flex;
  }
  .singleButtons button {
    margin-right: 8px;
  }
  .singleButtons svg {
    margin-left: 4px;
  }
  .singleDetails {
    padding: 4px 24px;
    @media (max-width: 600px) {
      margin-top: 40px;
      padding: 0;
    }
  }
  .singleActions {
    position: absolute;
    top: 14px;
    left: 248px;
    @media (max-width: 600px) {
      left: 8px;
    }
  }
  .singleTitle {
    font-size: 3.5rem;
    line-height: 4.7rem;
  }

  .singleEdit {
    display: inline-block;
    width: 46.55px;
  }
  .description {
    width: 70%;
  }
  .genre {
    font-size: 14.4px;
    color: #000;
    display: inline-block;
    cursor: pointer;
  }
  .genre:hover {
    text-decoration: underline;
  }
  h2,
  h4 {
    margin: 0;
  }
`;
export default DetailsPageStyles;
