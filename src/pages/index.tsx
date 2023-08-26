import Head from "next/head";
import ClientOnly from "../components/ClientOnly";
import Countries from "../components/Countries";
import Footer from "@/components/Layouts/Footer";

export default function Home() {
  return (
    <>
      <div>
      <Head>
        <title>Phonebook App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>
          Phonebook App
        </h1>
        <ClientOnly>
          <Countries />
        </ClientOnly>
      </main>

      <Footer />
    </div>
    </>
  )
}
