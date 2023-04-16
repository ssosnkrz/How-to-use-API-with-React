import { useContext, useState } from "react";
import { ThemeContext } from "./Layout";
import styled from "styled-components";
import { useAPI } from "../Hooks/useAPI";
import { Link } from "react-router-dom";

//always required fields: name, flag; the rest are optional
const fieldArray = [
  "flag",
  "name",
  "capital",
  "population",
  "region",
  "subregion",
  "wrongField",
];

export const Countries = () => {
  const theme = useContext(ThemeContext);
  const url = "https://restcountries.com/v2/all?fields=" + fieldArray.join(",");
  const [{ data, isLoading, isError }] = useAPI(url);
  const [query, setQuery] = useState("");

  return isLoading ? (
    <div>Loading...</div>
  ) : isError ? (
    <div>Something went wrong...</div>
  ) : (
    <>
      <SearchInput
        type="search"
        placeholder="Search in string"
        theme={theme}
        onChange={(event) => setQuery(event.target.value)}
      />
      <List>
        {data.map((item, index) => {
          return (
            item.name &&
            item.flag && (
              <ListItem
                key={`list_item_${index}`}
                isHidden={isHidden(item, query)}
              >
                <LinkBox theme={theme} to={`/country/${item.name}`}>
                  <Items data={item} index={index} />
                </LinkBox>
              </ListItem>
            )
          );
        })}
      </List>
    </>
  );
};

const isHidden = (item, query) => {
  if (query === "") return false;
  const valuesToCheck = Object.values(item)
    .filter((e) => typeof e === "string" && !e.startsWith("https:"))
    .map((e) => e.toLowerCase());
  for (let index = 0; index < valuesToCheck.length; ++index) {
    const element = valuesToCheck[index];
    if (element.includes(query.toLowerCase())) return false;
  }
  return true;
};

const Items = ({ data, index }) => {
  return (
    <div>
      {fieldArray.map((f, i) => {
        let key = f + "_" + index + "_" + i;
        return <Item item={data} field={f} key={key} />;
      })}
    </div>
  );
};

const Item = ({ field, item }) => {
  switch (field) {
    case "name":
      return <Name>{item.name}</Name>;
    case "flag":
      return (
        <ImgBox>
          <Img src={item.flag} alt={item.name + " flag"} />{" "}
        </ImgBox>
      );
    default:
      return (
        item[field] && (
          <TextBox>
            <Label>{field}: </Label>
            {item[field]}
          </TextBox>
        )
      );
  }
};

const SearchInput = styled.input`
  width: 300px;
  height: 30px;
  padding: 10px;
  box-shadow: 0px 0px 5px 0px black;
  ${({ theme }) =>
    theme.mode === "light"
      ? `background-color: ${theme.light.elements}; color: ${theme.light.text};`
      : `background-color: ${theme.dark.background}; color: ${theme.dark.text};`}
  font-size: 16px;
  border-radius: 5px;
  margin-bottom: 5%;
  &:focus {
    outline: none;
  }
`;

const List = styled.ul`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  list-style-type: none;
  gap: 50px;
`;
const LinkBox = styled(Link)`
  display: block;
  min-height: 430px;
  text-transform: capitalize;
  text-decoration: none;
  border-radius: 10px;
  box-shadow: 0px 0px 5px 0px black;
  ${({ theme }) =>
    theme.mode === "light"
      ? `background-color: ${theme.light.elements}; color: ${theme.light.text};`
      : `background-color: ${theme.dark.background}; color: ${theme.dark.text};`}
`;
const ListItem = styled.li`
width: 10vw;
min-width: 300px; 
display: ${({ isHidden }) => (isHidden ? "none" : "initial")}};
}
`;

const Name = styled.h2`
  padding: 20px;
`;

const ImgBox = styled.div`
  width: 100%;
  height: 200px;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 10px 10px 0 0;
  border-bottom: 1px solid black;
`;

const TextBox = styled.p`
  padding-left: 20px;
  margin-bottom: 6px;
`;

const Label = styled.label`
  font-weight: 600;
`;
