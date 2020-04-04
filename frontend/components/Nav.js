import Link from "next/link";
import { Mutation } from "react-apollo";
import NavStyles from "./styles/NavStyles";
import User from "./User";
import Signout from "./Signout";

import { TOGGLE_CART_MUTATION } from "./Cart";

const Nav = () => {
  return (
    <User>
      {({ data: { me } }) => (
        <NavStyles>
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
                  <button
                    onClick={toggleCart}
                    style={{
                      border: "2px solid gold",
                      borderRadius: "4px",
                    }}
                  >
                    Lists
                  </button>
                )}
              </Mutation>
              <Signout />
            </>
          )}
          {!me && (
            <Link href="/signup">
              <a>Sign In</a>
            </Link>
          )}
        </NavStyles>
      )}
    </User>
  );
};
export default Nav;
