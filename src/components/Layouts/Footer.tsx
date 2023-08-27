import styled from "@emotion/styled";

const StyledFooter = styled.footer`
  background-color: #20232a;
  color: #61dafb;
  text-align: center;
  padding: 20px;
  position: relative;
  bottom: 0;
  width: 100%;

  a {
    color: #61dafb;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  @media (min-width: 768px) {
    padding: 40px;
    font-size: 1.2em;
  }
`;

const Footer = () => {
  return (
    <StyledFooter>
      Made with ❤️ by{" "}
      <a href="https://linkedin.com/in/gadanihiman">Gadani Himan Gurusinga</a>
    </StyledFooter>
  );
};

export default Footer;
