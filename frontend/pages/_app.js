import App, { Container } from "next/app";
import Page from "../components/Page";
import { ApolloProvider } from "react-apollo";
import withData from "../lib/withData";

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    // this exposes the query to the user
    pageProps.query = ctx.query;
    return { pageProps };
  }
  state = {
    cardView: "wide",
  };
  componentDidMount() {
    const json = localStorage.getItem("cardview");
    const currentCardView = JSON.parse(json);
    if (currentCardView) {
      this.setState({ cardView: currentCardView });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.cardView.length !== this.state.cardView.length) {
      const json = JSON.stringify(this.state.cardView);
      localStorage.setItem("cardview", json);
    }
  }
  setCardView = (input) => {
    this.setState({ cardView: input });
  };
  render() {
    const { Component, apollo, pageProps } = this.props;

    return (
      <Container>
        <ApolloProvider client={apollo}>
          <Page>
            <Component
              {...pageProps}
              cardView={this.state.cardView}
              setCardView={this.setCardView}
            />
          </Page>
        </ApolloProvider>
      </Container>
    );
  }
}

export default withData(MyApp);
