import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { CURRENT_USER_QUERY } from "./User";
import { IoMdClose } from "react-icons/io";

const REMOVE_FROM_TO_WATCH_MUTATION = gql`
  mutation removeFromToWatch($id: ID!) {
    removeFromToWatch(id: $id) {
      id
    }
  }
`;

class RemoveFromToWatch extends React.Component {
  render() {
    const { id } = this.props;
    return (
      <Mutation
        mutation={REMOVE_FROM_TO_WATCH_MUTATION}
        variables={{
          id
        }}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(removeFromToWatch, { error, loading }) => (
          <button onClick={removeFromToWatch} disabled={loading}>
            To Watch
            {/* Remov{loading ? "ing" : "e"}  */}
            <IoMdClose />
          </button>
        )}
      </Mutation>
    );
  }
}
export default RemoveFromToWatch;
