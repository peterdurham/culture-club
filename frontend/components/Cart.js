import React from "react";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import { adopt } from "react-adopt";
import Link from "next/link";
import User from "../components/User";
import CartStyles from "./styles/CartStyles";
import Supreme from "./styles/Supreme";
import CloseButton from "./styles/CloseButton";
import SickButton from "./styles/SickButton";
import CartItem from "./CartItem";
import calcTotalPrice from "../lib/calcTotalPrice";
import formatMoney from "../lib/formatMoney";
import TakeMyMoney from "./TakeMyMoney";

const LOCAL_STATE_QUERY = gql`
  query {
    cartOpen @client
  }
`;

const TOGGLE_CART_MUTATION = gql`
  mutation {
    toggleCart @client
  }
`;
/* eslint-disable */
const Composed = adopt({
  user: ({ render }) => <User>{render}</User>,
  toggleCart: ({ render }) => (
    <Mutation mutation={TOGGLE_CART_MUTATION}>{render}</Mutation>
  ),
  localState: ({ render }) => <Query query={LOCAL_STATE_QUERY}>{render}</Query>
});
/* eslint-enable */

const Cart = () => {
  return (
    <Composed>
      {({ user, toggleCart, localState }) => {
        const me = user.data.me;
        if (!me) return null;

        return (
          <CartStyles open={localState.data.cartOpen}>
            <header>
              <CloseButton onClick={toggleCart} title="close">
                &times;
              </CloseButton>
              <Supreme>{me.name}'s Lists</Supreme>
              <p>
                You have {me.cart.length} Item
                {me.cart.length > 1 && "s"} in your cart
              </p>
            </header>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Link href="/to-watch">
                <a>Movies to see ({me.toWatch.length})</a>
              </Link>
              <Link href="/to-play">
                <a>Games to play ({me.toPlay.length})</a>
              </Link>
              <Link href="/to-read">
                <a>Books to read ({me.toRead.length})</a>
              </Link>
              <Link href="/seen-it">
                <a>Movies i've seen ({me.seenIt.length})</a>
              </Link>
              <Link href="/played-it">
                <a>Games i've played ({me.playedIt.length})</a>
              </Link>
              <Link href="/read-it">
                <a>Books i've read ({me.readIt.length})</a>
              </Link>
            </div>
            <ul>
              {me.cart.map(cartItem => (
                <CartItem key={cartItem.id} cartItem={cartItem} />
              ))}
            </ul>
            <footer>
              <p>{formatMoney(calcTotalPrice(me.cart))}</p>

              {me.cart.length && (
                <TakeMyMoney>
                  <SickButton>Checkout</SickButton>
                </TakeMyMoney>
              )}
            </footer>
          </CartStyles>
        );
      }}
    </Composed>
  );
};
export default Cart;
export { LOCAL_STATE_QUERY, TOGGLE_CART_MUTATION };
