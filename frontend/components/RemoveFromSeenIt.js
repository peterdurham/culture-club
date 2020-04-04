import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { CURRENT_USER_QUERY } from "./User";
import { IoMdClose } from "react-icons/io";

const REMOVE_FROM_SEEN_IT_MUTATION = gql`
  mutation removeFromSeenIt($id: ID!) {
    removeFromSeenIt(id: $id) {
      id
    }
  }
`;

class RemoveFromSeenIt extends React.Component {
  render() {
    const { id } = this.props;
    return (
      <Mutation
        mutation={REMOVE_FROM_SEEN_IT_MUTATION}
        variables={{
          id,
        }}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(removeFromSeenIt, { error, loading }) => (
          <button
            onClick={removeFromSeenIt}
            disabled={loading}
            className="button complete"
          >
            Seen It
            {/* Remov{loading ? "ing" : "e"}  */}
            <IoMdClose />
          </button>
        )}
      </Mutation>
    );
  }
}
export default RemoveFromSeenIt;
