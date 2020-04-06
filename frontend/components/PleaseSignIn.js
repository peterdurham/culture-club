import { Query } from "react-apollo";
import { CURRENT_USER_QUERY } from "./User";
import Signin from "./Signin";
import Signup from "./Signup";

const PleaseSignIn = (props) => {
  return (
    <Query query={CURRENT_USER_QUERY}>
      {({ data, loading }) => {
        console.log(data);
        if (loading) return <p>Loading...</p>;
        if (!data.me) {
          return (
            <div>
              <h3 style={{ textAlign: "center" }}>
                Please sign in before continuing
              </h3>
              <Signin />
              <Signup />
            </div>
          );
        }
        return props.children;
      }}
    </Query>
  );
};
export default PleaseSignIn;
