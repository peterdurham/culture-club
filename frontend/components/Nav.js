import Link from "next/link";
import { Mutation } from "react-apollo";

import User from "./User";
import Signout from "./Signout";
import styled from "styled-components";

import { TOGGLE_CART_MUTATION } from "./Cart";
import { MdWbSunny } from "react-icons/md";
import { WiMoonAltWaningCrescent5 } from "react-icons/wi";

const NavStyles = styled.ul`
  margin: 0;
  padding: 0;
  padding-right: 40px;
  width: 100vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.6rem;
  a,
  button {
    padding: 0.5rem 1.5rem;
    display: flex;
    align-items: center;
    position: relative;
    font-weight: 400;
    color: ${(props) => props.theme.black};
    font-size: 1.2em;
    background: none;
    border: 0;
    cursor: pointer;
    @media (max-width: 700px) {
      font-size: 13px;
      padding: 0 10px;
    }
  }
  .navCenter {
    display: flex;
    transform: translateX(-40px);
    @media (max-width: 700px) {
      transform: translateX(0px);
    }
  }
  .Nav__mode {
    background: none;
    border: none;
    cursor: pointer;
    transition: all 0.3s;
    outline: 0;
    & svg {
      font-size: 3.2rem;
    }
  }
  .Nav__mode:hover {
    color: ${(props) => props.theme.yellow};
  }
  @media (max-width: 1300px) {
    border-top: 1px solid ${(props) => props.theme.lightgrey};
    width: 100%;

    font-size: 1.5rem;
  }
`;
const Logo = styled.h1`
  font-size: 3rem;
  margin: 0;
  margin-left: 2rem;
  margin-top: 0.5rem;
  position: relative;
  z-index: 2;
  font-weight: 700;
  /* transform: skew(-7deg); */
  a {
    border-radius: 4px;
    padding: 0.5rem 1rem;

    color: black;
    text-transform: uppercase;
    text-decoration: none;
    @media (max-width: 700px) {
      font-size: 17px;
    }
  }
  @media (max-width: 1300px) {
    margin: 0;
    text-align: center;
    margin-top: 0.5rem;
  }
`;
class Nav extends React.Component {
  render() {
    return (
      <User>
        {({ data: { me } }) => (
          <NavStyles>
            <Logo>
              <Link href="/">
                <a>Culture Club</a>
              </Link>
            </Logo>
            <div className="navCenter">
              <Link href="/movies">
                <a>Movies</a>
              </Link>
              <Link href="/books">
                <a>Books</a>
              </Link>
              <Link href="/games">
                <a>Games</a>
              </Link>

              {me && (
                <>
                  <Mutation mutation={TOGGLE_CART_MUTATION}>
                    {(toggleCart) => (
                      <button onClick={toggleCart}>Lists</button>
                    )}
                  </Mutation>
                </>
              )}
            </div>
            <div>
              {/* <button
                className="Nav__mode"
                onClick={theme.toggleDarkMode}
                aria-label="Toggle Dark Mode."
                title="Toggle Dark Mode"
              >
                {theme.darkMode ? (
                  <MdWbSunny />
                ) : (
                  // <img src={moon} className="theme-icon" alt="Dark Mode" />
                  <WiMoonAltWaningCrescent5 />
                )}
              </button> */}
              {!me && (
                <Link href="/signup">
                  <a>Sign In</a>
                </Link>
              )}
              {me && (
                <>
                  <Signout />
                </>
              )}
            </div>
          </NavStyles>
        )}
      </User>
    );
  }
}
export default Nav;
