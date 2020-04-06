import Link from "next/link";
import { Mutation } from "react-apollo";

import User from "./User";
import Signout from "./Signout";
import styled from "styled-components";

import { TOGGLE_CART_MUTATION } from "./Cart";
import { MdWbSunny } from "react-icons/md";
import { WiMoonAltWaningCrescent5 } from "react-icons/wi";
import { FiMenu } from "react-icons/fi";
import { MdClose } from "react-icons/md";

const NavStyles = styled.ul`
  margin: 0;
  padding: 0;
  padding-right: 40px;
  width: 100vw;
  position: fixed;
  z-index: 10;
  background: #fff;
  display: flex;
  justify-content: space-between;
  border-bottom: 3px solid black;
  align-items: center;
  font-size: 1.6rem;
  @media (max-width: 1300px) {
    padding: 0;
  }
  .navContainer {
    width: ${(props) => props.theme.maxWidth};
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    @media (max-width: 1300px) {
      width: 100%;
      padding: 0 20px;
    }
    @media (max-width: 600px) {
      width: 100%;
      padding: 0 4%;
    }
  }
  .navLogo {
    font-weight: 700;
    min-width: 234px;
    @media (max-width: 1300px) {
      font-size: 2.8rem;
    }
    @media (max-width: 600px) {
      font-size: 2.4rem;
      padding: 0;
    }
  }
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
      font-size: 15px;
      padding: 0 10px;
    }
  }
  .navCenter {
    display: flex;
    transform: translateX(-40px);
    @media (max-width: 1300px) {
      transform: translateX(0px);
    }
    @media (max-width: 600px) {
      display: none;
    }
  }
  .navLogin {
    @media (max-width: 600px) {
      display: none;
    }
  }
  .navMobileButton {
    display: none;
    @media (max-width: 600px) {
      display: block;
    }
  }
  .navMobileMenu {
    position: fixed;
    top: 83px;
    left: 0;
    width: 100vw;
    height: 100vh;
    padding: 2rem;
    background: #fff;
    z-index: 5;

    @media (max-width: 600px) {
      top: 53px;
    }
  }
  .navMobileMenu a,
  .navMobileMenu button {
    font-size: 2rem;
    line-height: 4rem;
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
const Nav = () => {
  const [navOpen, setNavOpen] = React.useState(false);

  return (
    <User>
      {({ data: { me } }) => (
        <NavStyles>
          <div className="navContainer">
            <Logo>
              <Link href="/">
                <a className="navLogo">Culture Club</a>
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
            <div className="navLogin">
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
            <div className="navMobileButton">
              {!navOpen ? (
                <button
                  onClick={() => setNavOpen(true)}
                  className="icon-button"
                >
                  <FiMenu />
                </button>
              ) : (
                <button
                  onClick={() => setNavOpen(false)}
                  className="icon-button"
                >
                  <MdClose />
                </button>
              )}
            </div>
            {navOpen && (
              <div className="navMobileMenu">
                <Link href="/movies">
                  <a onClick={() => setNavOpen(false)}>Movies</a>
                </Link>
                <Link href="/books">
                  <a onClick={() => setNavOpen(false)}>Books</a>
                </Link>
                <Link href="/games">
                  <a onClick={() => setNavOpen(false)}>Games</a>
                </Link>

                {me && (
                  <>
                    <Mutation mutation={TOGGLE_CART_MUTATION}>
                      {(toggleCart) => (
                        <button
                          onClick={() => {
                            toggleCart();
                            setNavOpen(false);
                          }}
                        >
                          Lists
                        </button>
                      )}
                    </Mutation>
                  </>
                )}
                {!me && (
                  <Link href="/signup">
                    <a onClick={() => setNavOpen(false)}>Sign In</a>
                  </Link>
                )}
                {me && (
                  <>
                    <Signout />
                  </>
                )}
              </div>
            )}
          </div>
        </NavStyles>
      )}
    </User>
  );
};
export default Nav;
