import React from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import { CURRENT_USER_QUERY } from "../User";

import { GiWhiteBook } from "react-icons/gi";

const ADD_TO_READ_IT_MUTATION = gql`
  mutation addToReadIt($id: ID!) {
    addToReadIt(id: $id) {
      id
    }
  }
`;

class AddToReadIt extends React.Component {
  render() {
    const { id } = this.props;
    return (
      <Mutation
        mutation={ADD_TO_READ_IT_MUTATION}
        variables={{
          id,
        }}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(addToReadIt, { error, loading }) => (
          <button onClick={addToReadIt} disabled={loading} className="button">
            Read It <GiWhiteBook />
          </button>
        )}
      </Mutation>
    );
  }
}
export default AddToReadIt;
