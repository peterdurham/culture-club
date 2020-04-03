import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { CURRENT_USER_QUERY } from "./User";
import { IoMdClose } from "react-icons/io";

const REMOVE_FROM_TO_PLAY_MUTATION = gql`
  mutation removeFromToPlay($id: ID!) {
    removeFromToPlay(id: $id) {
      id
    }
  }
`;

class RemoveFromToPlay extends React.Component {
  render() {
    const { id } = this.props;
    return (
      <Mutation
        mutation={REMOVE_FROM_TO_PLAY_MUTATION}
        variables={{
          id
        }}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(removeFromToPlay, { error, loading }) => (
          <button onClick={removeFromToPlay} disabled={loading}>
            To Play
            {/* Remov{loading ? "ing" : "e"}  */}
            <IoMdClose />
          </button>
        )}
      </Mutation>
    );
  }
}
export default RemoveFromToPlay;
