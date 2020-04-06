import styled from "styled-components";

const PaginationStyles = styled.div`
  text-align: center;
  display: inline-grid;
  grid-template-columns: repeat(4, auto);
  align-items: stretch;
  justify-content: center;
  align-content: center;
  margin: 2rem 0;
  border: 1px solid ${(props) => props.theme.lightgrey};
  border-radius: 8px;
  line-height: 2.8rem;

  & > * {
    margin: 0;
    padding: 4px 20px;
    border-right: 1px solid ${(props) => props.theme.lightgrey};
    &:last-child {
      border-right: 0;
    }
    @media (max-width: 600px) {
      padding: 0 5px;
      font-size: 1.3rem;
    }
  }
  a[aria-disabled="true"] {
    color: rgb(188, 188, 188);
    pointer-events: none;
  }
`;

export default PaginationStyles;
