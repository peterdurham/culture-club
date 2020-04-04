import Nav from "./Nav";
import Link from "next/link";
import styled from "styled-components";
import Router from "next/router";
import NProgress from "nprogress";
import Cart from "./Cart";
import Search from "./Search";

Router.onRouteChangeStart = () => {
  NProgress.start();
};

Router.onRouteChangeComplete = () => {
  NProgress.done();
};

Router.onRouteChangeError = () => {
  NProgress.done();
};

const StyledHeader = styled.header`
  .bar {
    border-bottom: 4px solid ${(props) => props.theme.black};
    display: grid;
    grid-template-columns: auto 1fr;
    grid-template-rows: 75px;
    justify-content: space-between;
    align-items: stretch;
    @media (max-width: 1300px) {
      grid-template-columns: 1fr;
      justify-content: center;
    }
  }
  .sub-bar {
    display: grid;
    grid-template-columns: 1fr auto;
    border-bottom: 1px solid ${(props) => props.theme.lightgrey};
  }
`;

const Header = () => {
  return (
    <StyledHeader>
      <div className="bar">
        <Nav />
      </div>
      <div className="sub-bar">{/* <Search /> */}</div>
      <Cart />
    </StyledHeader>
  );
};

export default Header;
