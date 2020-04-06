import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { CURRENT_USER_QUERY } from "../User";
import { IoMdClose } from "react-icons/io";

const REMOVE_FROM_READ_IT_MUTATION = gql`
  mutation removeFromReadIt($id: ID!) {
    removeFromReadIt(id: $id) {
      id
    }
  }
`;

class RemoveFromReadIt extends React.Component {
  render() {
    const { id } = this.props;
    return (
      <Mutation
        mutation={REMOVE_FROM_READ_IT_MUTATION}
        variables={{
          id,
        }}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(removeFromReadIt, { error, loading }) => (
          <button
            onClick={removeFromReadIt}
            disabled={loading}
            className="button complete"
          >
            Read It
            {/* Remov{loading ? "ing" : "e"}  */}
            <IoMdClose />
          </button>
        )}
      </Mutation>
    );
  }
}
export default RemoveFromReadIt;
