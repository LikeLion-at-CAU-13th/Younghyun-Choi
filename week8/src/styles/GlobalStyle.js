import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        font-family: "Noto Sans KR", sans-serif;
        background-color: #111;
        color: #fff;
    }

`;

export default GlobalStyle;
