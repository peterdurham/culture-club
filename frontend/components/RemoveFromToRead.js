import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { CURRENT_USER_QUERY } from "./User";
import { IoMdClose } from "react-icons/io";

const REMOVE_FROM_TO_READ_MUTATION = gql`
  mutation removeFromToRead($id: ID!) {
    removeFromToRead(id: $id) {
      id
    }
  }
`;

class RemoveFromToRead extends React.Component {
  render() {
    const { id } = this.props;
    return (
      <Mutation
        mutation={REMOVE_FROM_TO_READ_MUTATION}
        variables={{
          id,
        }}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(removeFromToRead, { error, loading }) => (
          <button
            onClick={removeFromToRead}
            disabled={loading}
            className="button upcoming"
          >
            To Read
            {/* Remov{loading ? "ing" : "e"}  */}
            <IoMdClose />
          </button>
        )}
      </Mutation>
    );
  }
}
export default RemoveFromToRead;
