import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { ALL_GAMES_QUERY } from "./Games";

const DELETE_GAME_MUTATION = gql`
  mutation DELETE_GAME_MUTATION($id: ID!) {
    deleteGame(id: $id) {
      id
    }
  }
`;

class DeleteGame extends Component {
  update = (cache, payload) => {
    // manually update the cache on the client, so it matches the server
    // 1. Read the cache for the games we want
    const data = cache.readQuery({ query: ALL_GAMES_QUERY });
    console.log(data, payload);
    // 2. Filter the deleted game out of the page
    data.games = data.games.filter(
      (game) => game.id !== payload.data.deleteGame.id
    );
    // 3. Put the games back!
    cache.writeQuery({ query: ALL_GAMES_QUERY, data });
  };
  render() {
    return (
      <Mutation
        mutation={DELETE_GAME_MUTATION}
        variables={{ id: this.props.id }}
        update={this.update}
      >
        {(deleteGame, { error }) => (
          <button
            className="button"
            onClick={() => {
              if (confirm("Are you sure you want to delete this Game?")) {
                deleteGame().catch((err) => {
                  alert(err.message);
                });
              }
            }}
          >
            {this.props.children}
          </button>
        )}
      </Mutation>
    );
  }
}

export default DeleteGame;
