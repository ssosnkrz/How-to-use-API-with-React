import styled, { createGlobalStyle } from "styled-components";
import { createContext, useState } from "react";

export const ThemeContext = createContext();
const themes = {
  light: {
    elements: "hsl(0, 0%, 100%)",
    background: "hsl(0, 0%, 98%)",
    text: "hsl(200, 15%, 8%)",
  },
  dark: {
    elements: "hsl(209, 23%, 22%)",
    background: "hsl(207, 26%, 17%)",
    text: "hsl(0, 0%, 100%)",
  },
};

export const Layout = ({ header, children }) => {
  const defaultMode = window.localStorage.getItem("mode")
    ? window.localStorage.getItem("mode")
    : "light";
  const [mode, setMode] = useState(defaultMode);
  return (
    <ThemeContext.Provider value={{ ...themes, mode: mode, setMode: setMode }}>
      <Header mode={mode}>{header}</Header>
      <ContentWrapper mode={mode}>{children}</ContentWrapper>
      <GlobalStyles mode={mode} />
    </ThemeContext.Provider>
  );
};

const GlobalStyles = createGlobalStyle`
#root {
    font-family: 'Nunito Sans', sans-serif;
    font-size: 14px;
  }
  * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  border: none;
  }
  body {
    ${({ mode }) =>
      mode === "light"
        ? `background-color: ${themes.light.background}; color: ${themes.light.text}; `
        : `background-color: ${themes.dark.background}; color: ${themes.dark.text}; `}
  }
`;

const Header = styled.header`
  height: 10vh;
  width: 100%;
  display: flex;
  align-items: center;
  position: fixed;
  ${({ mode }) =>
    mode === "light"
      ? `background-color: ${themes.light.elements}; color: ${themes.light.text};`
      : `background-color: ${themes.dark.elements}; color: ${themes.dark.text};`}
`;

const ContentWrapper = styled.section`
  padding-top: 15vh;
  width: 90vw;
  margin-left: 5vw;
`;
