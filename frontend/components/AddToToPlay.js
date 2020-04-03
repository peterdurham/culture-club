import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { CURRENT_USER_QUERY } from "./User";
import { FaGamepad } from "react-icons/fa";

const ADD_TO_TO_PLAY_MUTATION = gql`
  mutation addToToPlay($id: ID!) {
    addToToPlay(id: $id) {
      id
    }
  }
`;

class AddToToPlay extends React.Component {
  render() {
    const { id } = this.props;
    return (
      <Mutation
        mutation={ADD_TO_TO_PLAY_MUTATION}
        variables={{
          id
        }}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(addToToPlay, { error, loading }) => (
          <button onClick={addToToPlay} disabled={loading}>
            To Play
            <FaGamepad />
          </button>
        )}
      </Mutation>
    );
  }
}
export default AddToToPlay;
