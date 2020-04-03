import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { CURRENT_USER_QUERY } from "./User";

import { MdLocalMovies } from "react-icons/md";

const ADD_TO_TO_WATCH_MUTATION = gql`
  mutation addToToWatch($id: ID!) {
    addToToWatch(id: $id) {
      id
    }
  }
`;

class AddToToWatch extends React.Component {
  render() {
    const { id } = this.props;
    return (
      <Mutation
        mutation={ADD_TO_TO_WATCH_MUTATION}
        variables={{
          id
        }}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(addToToWatch, { error, loading }) => (
          <button onClick={addToToWatch} disabled={loading}>
            To Watch <MdLocalMovies />
          </button>
        )}
      </Mutation>
    );
  }
}
export default AddToToWatch;
