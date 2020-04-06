import Link from "next/link";
import styled from "styled-components";

const FooterStyles = styled.div`
  background: #000;
  color: #fff;
  height: 120px;

  .footerContainer {
    width: ${(props) => props.theme.maxWidth};
    height: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media (max-width: 1300px) {
      width: 100%;
      padding: 0 20px;
    }
  }
  .footerLogo {
    color: #fff;
    @media (max-width: 1300px) {
      font-size: 2.8rem;
    }
  }
  .footerLinks {
    display: flex;
    @media (max-width: 600px) {
      flex-direction: column;
    }
  }
  .footerLinks a {
    color: #fff;
    font-size: 18px;
    line-height: 36px;
    margin-left: 30px;
    position: relative;
    display: inline-block;
    @media (max-width: 700px) {
      font-size: 15px;
      line-height: 24px;
    }
  }
  .link-underline {
    height: 3px;
    width: 100%;
    background: #fff;
    position: absolute;
    bottom: 7%;
    left: 0;
    transform: scaleX(0);
    transition: all 0.17s;
    transform-origin: 0% 50%;
    transition-timing-function: ease-in-out;
  }
  .footerLogo:hover .link-underline {
    transform: scaleX(1);
  }
  .footerLinks a:hover .link-underline {
    transform: scaleX(1);
  }
`;

const FooterLogo = styled.h1`
  font-size: 3.6rem;
  margin: 0;
  position: relative;

  font-weight: 700;

  a {
    text-decoration: none;
    @media (max-width: 700px) {
      font-size: 17px;
    }
  }
  @media (max-width: 1300px) {
    margin: 0;
    text-align: center;
  }
`;

const Footer = () => {
  return (
    <FooterStyles>
      <div className="footerContainer">
        <FooterLogo>
          <Link href="/">
            <a className="footerLogo">
              Culture Club
              <span className="link-underline link-underline-dark"></span>
            </a>
          </Link>
        </FooterLogo>

        <div className="footerLinks">
          <Link href="/movies">
            <a>
              Movies
              <span className="link-underline link-underline-dark"></span>
            </a>
          </Link>
          <Link href="/books">
            <a>
              Books<span className="link-underline link-underline-dark"></span>
            </a>
          </Link>
          <Link href="/games">
            <a>
              Games<span className="link-underline link-underline-dark"></span>
            </a>
          </Link>
        </div>
      </div>
    </FooterStyles>
  );
};
export default Footer;
