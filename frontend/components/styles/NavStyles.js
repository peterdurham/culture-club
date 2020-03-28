import styled from "styled-components";

const NavStyles = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
  justify-self: end;
  font-size: 1.6rem;
  a,
  button {
    padding: 0.5rem 1.5rem;
    display: flex;
    align-items: center;
    position: relative;
    font-weight: 400;
    color: ${props => props.theme.black};
    font-size: 1.2em;
    background: none;
    border: 0;
    cursor: pointer;
    @media (max-width: 700px) {
      font-size: 10px;
      padding: 0 10px;
    }
  }
  @media (max-width: 1300px) {
    border-top: 1px solid ${props => props.theme.lightgrey};
    width: 100%;
    justify-content: center;
    font-size: 1.5rem;
  }
`;

export default NavStyles;
