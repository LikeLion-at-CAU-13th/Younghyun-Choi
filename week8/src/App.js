import React from "react";
import GlobalStyle from "./styles/GlobalStyle";
import Header from "./components/Header";
import About from "./components/About";
import Archive from "./components/Archive";
import Hobby from "./components/Hobby";
import Faq from "./components/Faq";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <GlobalStyle />
      <Header />
      <About />
      <Archive />
      <Hobby />
      <Faq />
      <Footer />
    </>
  );
}

export default App;
