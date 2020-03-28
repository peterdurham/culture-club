import React, { Component } from "react";
import styled, { ThemeProvider, injectGlobal } from "styled-components";
import Header from "../components/Header";
import Meta from "../components/Meta";

const theme = {
  red: "navy",
  black: "#393939",
  grey: "#3a3a3a",
  white: "#ffffff",
  lightgrey: "#e1e1e1",
  offWhite: "#ededed",
  maxWidth: "1240px",
  bs: "0 12px 24px 0 rgba(0, 0, 0, 0.09)"
};

const StyledPage = styled.div`
  background: white;
  color: ${props => props.theme.black};
`;

const Inner = styled.div`
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
  background: ${props => props.theme.white};
  padding: 2rem;
`;

injectGlobal`
  @font-face {
      font-family: 'radnika_next';
      src: url('/static/radnikanext-medium-webfont.woff2')
      format('woff2');
      font-weight: normal;
      font-style: normal;
  }
  html {
      box-sizing: border-box;
      font-size: 10px;
  }
  *, *:before, *:after {
      box-sizing: inherit;
  }
  body {
      padding: 0;
      margin: 0;
      font-size: 1.5rem;
      line-height: 2;
font-family: 'Libre Franklin', sans-serif;
      font-family: 'radnika_next';
font-family: 'Sen', sans-serif;
font-family: 'Sofia', cursive;
font-family: 'Merriweather', serif;
font-family: 'Varela Round', sans-serif;
font-family: 'Noto Sans', sans-serif;
font-family: 'Fira Sans Condensed', sans-serif;
      font-family: 'Source Sans Pro', sans-serif;


  }
  a {
      text-decoration: none;
      color: ${theme.black};
  }
`;

class Page extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <StyledPage>
          <Meta />
          <Header />
          <Inner>{this.props.children}</Inner>
        </StyledPage>
      </ThemeProvider>
    );
  }
}
export default Page;
