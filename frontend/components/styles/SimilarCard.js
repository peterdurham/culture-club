import styled from "styled-components";

const SimilarCardStyles = styled.div`
  height: 360px;
  width: 184px;
  margin: 20px 8px;
  position: relative;

  @media (max-width: 600px) {
    width: 149px;
    height: 315px;
  }
  img {
    width: 100%;
    height: 275px;
    object-fit: cover;
    transition: all 0.3s;

    @media (max-width: 600px) {
      height: 225px;
    }
  }
  img:hover {
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.67);
  }
  .similarTitle {
    line-height: 22px;
  }
  .similarButtons {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
  }
  .similarButtons button {
    width: 50%;

    @media (max-width: 600px) {
      height: 30px;
    }
  }
  .similarButtons button:not(:last-child) {
    margin-right: 8px;
  }
`;
export default SimilarCardStyles;
