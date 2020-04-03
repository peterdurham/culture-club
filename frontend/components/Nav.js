import Link from "next/link";
import { Mutation } from "react-apollo";
import NavStyles from "./styles/NavStyles";
import User from "./User";
import Signout from "./Signout";
import CartCount from "./CartCount";
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
              <Link href="/sell">
                <a>Sell</a>
              </Link>
              <Link href="/add-movie">
                <a>Add Movie</a>
              </Link>
              <Link href="/add-book">
                <a>Add Book</a>
              </Link>
              <Link href="/add-game">
                <a>Add Game</a>
              </Link>
              {/* <Link href="/orders">
                <a>Orders</a>
              </Link> */}
              {/* <Link href="/me">
                <a>Account</a>
              </Link> */}
              <Signout />
              <Mutation mutation={TOGGLE_CART_MUTATION}>
                {toggleCart => (
                  <button onClick={toggleCart}>
                    My Lists
                    <CartCount
                      count={me.cart.reduce(
                        (tally, cartItem) => tally + cartItem.quantity,
                        0
                      )}
                    ></CartCount>
                  </button>
                )}
              </Mutation>
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
