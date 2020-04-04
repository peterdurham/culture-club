import Signup from "../components/Signup";
import Signin from "../components/Signin";
import RequestReset from "../components/RequestReset";
import styled from "styled-components";
import User from "../components/User";

const LoginOptions = styled.div`
  text-align: center;
  .loginSignup {
    margin: 50px 0;
  }
  .loginSignin {
    margin: 50px 0;
  }
`;

const SignupPage = (props) => (
  <User>
    {({ data: { me } }) => (
      <LoginOptions>
        {!me && (
          <>
            <div className="loginSignin">
              {" "}
              <Signin />
            </div>
            <div style={{ textAlign: "center" }}>OR</div>
            <div className="loginSignup">
              {" "}
              <Signup />
            </div>
          </>
        )}
        {me && (
          <div>
            <h2>Welcome,</h2>
            <h2>currently logged in as {me.name}</h2>
          </div>
        )}
        {/* <RequestReset /> */}
      </LoginOptions>
    )}
  </User>
);

export default SignupPage;
