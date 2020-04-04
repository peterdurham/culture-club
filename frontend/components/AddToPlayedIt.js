import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { CURRENT_USER_QUERY } from "./User";

import { FaGamepad } from "react-icons/fa";

const ADD_TO_PLAYED_IT_MUTATION = gql`
  mutation addToPlayedIt($id: ID!) {
    addToPlayedIt(id: $id) {
      id
    }
  }
`;

class AddToPlayedIt extends React.Component {
  render() {
    const { id } = this.props;
    return (
      <Mutation
        mutation={ADD_TO_PLAYED_IT_MUTATION}
        variables={{
          id,
        }}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(addToPlayedIt, { error, loading }) => (
          <button onClick={addToPlayedIt} disabled={loading} className="button">
            Played It <FaGamepad />
          </button>
        )}
      </Mutation>
    );
  }
}
export default AddToPlayedIt;
