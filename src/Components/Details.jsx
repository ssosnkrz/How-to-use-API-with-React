import { useParams, useNavigate } from "react-router-dom";
import { useAPI } from "../Hooks/useAPI";
import styled from "styled-components";
import { useContext } from "react";
import { ThemeContext } from "./Layout";

export const Details = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

  let { country } = useParams();
  const url = `https://restcountries.com/v2/name/${country}?fields=name,capital,region,subregion,borders,flag&fullText=true`;
  const [{ data, isLoading, isError }] = useAPI(url);

  const { name, capital, region, subregion, flag, borders } = { ...data[0] };

  return isLoading ? (
    <div>Loading...</div>
  ) : isError ? (
    <div>Something went wrong...</div>
  ) : (
    <>
      <ButtonBack onClick={goBack}>Back</ButtonBack>
      <Item>
        <ImgBox>
          <Img src={flag} />
        </ImgBox>
        <TextBox>
          <Name>{name}</Name>
          <Text>
            <Label>Region: </Label>
            {region}
          </Text>
          <Text>
            <Label>Capital: </Label>
            {capital}
          </Text>
          <Text>
            <Label>Subregion: </Label>
            {subregion}
          </Text>
          {borders && (
            <Text>
              <Label>Border Countries: </Label>
              {borders.join(", ")}
            </Text>
          )}
        </TextBox>
      </Item>
    </>
  );
};

const ImgBox = styled.div`
  width: 40%;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  box-shadow: 0px 0px 5px 0px black;
`;

const Item = styled.div`
  width: 100%;
  margin-top: 5%;
  display: flex;
  align-items: center;
`;

const Name = styled.h2`
  font-weight: 800;
  font-size: 32px;
  padding-bottom: 20px;
`;

const TextBox = styled.div`
  width: 60%;
  display: flex;
  flex-wrap: wrap;
  padding-left: 5%;
`;
const Text = styled.p`
  display: block;
  width: 100%;
  font-size: 16px;
  line-height: 2rem;
`;

const Label = styled.label`
  font-weight: 600;
`;

const ButtonBack = styled.button`
  ${() => {
    const theme = useContext(ThemeContext);
    return theme.mode === "light"
      ? `background-color: ${theme.light.elements}; color: ${theme.light.text};`
      : `background-color: ${theme.dark.background}; color: ${theme.dark.text};`;
  }}
  height: 30px;
  width: 150px;
  font-size: 16px;
  border-radius: 5px;
  box-shadow: 0px 0px 5px 0px black;
  cursor: pointer;
`;
