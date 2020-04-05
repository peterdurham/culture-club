import React, { useEffect, useState } from "react";
import Head from "next/head";
import styled, { ThemeProvider, injectGlobal } from "styled-components";
import Header from "../components/Header";
import Meta from "../components/Meta";

const theme = {
  red: "red",
  blue: "rgb(46,119,208)",
  green: "rgb(35,140,44)",
  gold: "rgb(255,203,0)",
  yellow: "rgb(255,203,0)",
  black: "#393939",
  grey: "#3a3a3a",
  white: "#ffffff",
  lightgrey: "#e1e1e1",
  offWhite: "#ededed",
  maxWidth: "1240px",
  bs: "0 12px 24px 0 rgba(0, 0, 0, 0.09)",
};

const StyledPage = styled.div`
  background: white;
  color: ${(props) => props.theme.black};
`;

const Inner = styled.div`
  max-width: ${(props) => props.theme.maxWidth};
  margin: 0 auto;
  background: ${(props) => props.theme.white};
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
  font-family: 'Source Sans Pro', sans-serif;
      font-family: 'radnika_next';
  font-family: 'Sen', sans-serif;
  font-family: 'Noto Sans', sans-serif;
  font-family: 'Varela Round', sans-serif;

  }
  svg {
    font-size: 1.4rem;
  }
  a {
      text-decoration: none;
      color: ${theme.black};
  }
  .bold {
    font-weight: 700;
  }
  a.button, button.button {
    font-family: inherit;
    padding: 2px 8px;
    border-radius: 4px;
    color: rgb(60,66,87);
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 500;
    font-size: 10px;
 
    height: 20px;
    box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.12) 0px 1px 1px 0px, rgba(60, 66, 87, 0.16) 0px 0px 0px 1px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(60, 66, 87, 0.12) 0px 2px 5px 0px;
    background: #fff;
    border: none;
    cursor: pointer;
}
.button:hover {
  box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0.12) 0px 1px 1px 0px, rgba(60, 66, 87, 0.16) 0px 0px 0px 1px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(60, 66, 87, .12) 0px 3px 9px 0px, rgba(60, 66, 87, 0.12) 0px 2px 5px 0px;
}

button.complete, a.complete {
  background: ${theme.green};
  color: #fff;

}
button.upcoming, a.upcoming {
  background: ${theme.blue};
  color: #fff;
}
.flex-apart {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.cardStyleButtons {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  button {
    margin-right: 10px !important;
  }
}
.icon-right {
  margin-left: 4px;
}
.icon-left {
  margin-right: 4px;
}
.listLinks {
  display: flex;
  flex-direction: column;
  font-size: 2rem;
  font-weight: 700;
       
}
.listLinks a {
  transition: all .3s;
}
.listLinks .blue:hover {
  color: ${theme.blue}
} 
.listLinks .green:hover {
  color: ${theme.green}
} 
`;

const Page = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <StyledPage>
        <div>
          <Meta />
          <Header />
          <Inner>{children}</Inner>
        </div>
      </StyledPage>
    </ThemeProvider>
  );
};

export default Page;
