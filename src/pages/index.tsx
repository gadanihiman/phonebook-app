import Head from "next/head";
import styled from "@emotion/styled";

import ClientOnly from "@/components/ClientOnly";
import Footer from "@/components/Layouts/Footer";
import PhoneBookList from "@/components/pages/PhoneBookList";
import MainContent from "@/components/Layouts/MainContent";
import Container from "@/components/Layouts/Container";

const Title = styled.h1`
  font-size: 2.5rem;
  text-align: center;
  color: #333;
  margin-top: 30px;
  margin-bottom: 40px;

  @media (min-width: 768px) {
    font-size: 3rem;
  }
`;

export default function Home() {
  return (
    <>
      <Container>
        <Head>
          <title>Phonebook App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <MainContent>
          <Title>Phonebook App</Title>
          <ClientOnly>
            <PhoneBookList />
          </ClientOnly>
        </MainContent>

        <Footer />
      </Container>
    </>
  );
}
