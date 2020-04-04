import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { CURRENT_USER_QUERY } from "./User";
import { IoMdClose } from "react-icons/io";

const REMOVE_FROM_PLAYED_IT_MUTATION = gql`
  mutation removeFromPlayedIt($id: ID!) {
    removeFromPlayedIt(id: $id) {
      id
    }
  }
`;

class RemoveFromPlayedIt extends React.Component {
  render() {
    const { id } = this.props;
    return (
      <Mutation
        mutation={REMOVE_FROM_PLAYED_IT_MUTATION}
        variables={{
          id,
        }}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(removeFromPlayedIt, { error, loading }) => (
          <button
            onClick={removeFromPlayedIt}
            disabled={loading}
            className="button complete"
          >
            Played It
            <IoMdClose />
          </button>
        )}
      </Mutation>
    );
  }
}
export default RemoveFromPlayedIt;
