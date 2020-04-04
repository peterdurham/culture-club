import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { CURRENT_USER_QUERY } from "./User";

import { MdLocalMovies } from "react-icons/md";

const ADD_TO_SEEN_IT_MUTATION = gql`
  mutation addToSeenIt($id: ID!) {
    addToSeenIt(id: $id) {
      id
    }
  }
`;

class AddToSeenIt extends React.Component {
  render() {
    const { id } = this.props;
    return (
      <Mutation
        mutation={ADD_TO_SEEN_IT_MUTATION}
        variables={{
          id,
        }}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(addToSeenIt, { error, loading }) => (
          <button onClick={addToSeenIt} disabled={loading} className="button">
            Seen It <MdLocalMovies />
          </button>
        )}
      </Mutation>
    );
  }
}
export default AddToSeenIt;
