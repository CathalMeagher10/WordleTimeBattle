import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>Wordle Time Battle</title>
        <meta name="author" content="Cathal Meagher" />
        <meta
          name="description"
          content=" Wordle time battle is a spin-off of the popular wordle word-game. Get
          as many words right in a row as possible!"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
