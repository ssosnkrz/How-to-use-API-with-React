import styled from "styled-components";
import { useContext } from "react";
import { ThemeContext } from "./Layout";
import imgDark from "../assets/dark.svg";
import imgLight from "../assets/light.svg";

export const Header = () => {
  const theme = useContext(ThemeContext);

  const setAndSaveMOde = () => {
    theme.setMode((currentMode) => {
      const newMode = currentMode === "light" ? "dark" : "light";
      window.localStorage.setItem("mode", newMode);
      return newMode;
    });
  };

  return (
    <>
      <Title>Where in the word?</Title>
      <Mode onClick={setAndSaveMOde}>
        {theme.mode === "light" ? (
          <>
            <img src={imgLight} />
            Light mode
          </>
        ) : (
          <>
            <img src={imgDark} />
            Dark mode
          </>
        )}
      </Mode>
    </>
  );
};

const Title = styled.h1`
  position: fixed;
  left: 5%;
`;

const Mode = styled.div`
  position: fixed;
  right: 5%;
  display: flex;
  align-items: center;
  font-size: 20px;
  cursor: pointer;
  img {
    width: 25px;
    height: 25px;
    padding-right: 10px;
  }
`;
