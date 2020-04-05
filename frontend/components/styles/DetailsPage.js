import styled from "styled-components";

const DetailsPageStyles = styled.div`
  max-width: 960px;
  margin: 2rem auto;
  /* box-shadow: ${(props) => props.theme.bs}; */

  display: flex;
  min-height: 800px;
  padding: 0 4rem;
  position:relative;

.singleImageContainer {
  width: 200px;
    height: 300px;
}
  .singleImageContainer img {
    width: 200px;
    height: 300px;
    object-fit: contain;
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
  }
  .singleActions {
    position:absolute;
    top: 12px;
    left: 186px;
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
