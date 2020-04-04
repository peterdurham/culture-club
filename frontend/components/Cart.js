import React from "react";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import { adopt } from "react-adopt";
import Link from "next/link";
import User from "../components/User";
import CartStyles from "./styles/CartStyles";
import Supreme from "./styles/Supreme";
import CloseButton from "./styles/CloseButton";
import CartItem from "./CartItem";

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
  localState: ({ render }) => <Query query={LOCAL_STATE_QUERY}>{render}</Query>,
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
            </header>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                fontSize: "24px",
                fontWeight: "700",
              }}
            >
              <Link href="/to-watch">
                <a>Movies To See ({me.toWatch.length})</a>
              </Link>
              <Link href="/to-play">
                <a>Games To Play ({me.toPlay.length})</a>
              </Link>
              <Link href="/to-read">
                <a>Books To Read ({me.toRead.length})</a>
              </Link>
              <hr />
              <Link href="/seen-it">
                <a>Movies I've Seen ({me.seenIt.length})</a>
              </Link>
              <Link href="/played-it">
                <a>Games I've Played ({me.playedIt.length})</a>
              </Link>
              <Link href="/read-it">
                <a>Books I've Read ({me.readIt.length})</a>
              </Link>
            </div>
            <ul>
              {me.cart.map((cartItem) => (
                <CartItem key={cartItem.id} cartItem={cartItem} />
              ))}
            </ul>
          </CartStyles>
        );
      }}
    </Composed>
  );
};
export default Cart;
export { LOCAL_STATE_QUERY, TOGGLE_CART_MUTATION };
