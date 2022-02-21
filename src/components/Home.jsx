import axios from "axios";
import { useState } from "react";
import styled from "styled-components";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addData } from "../redux/actions";

const Input = styled.input`
  width: 400px;
  border-radius: 10px;
  padding: 5px;
`;

const Heading = styled.h1`
  font-size: 70px;
  font-weight: 700;
`;

export const HomePage = () => {
  let [query, setQuery] = useState();
  let navigate = useNavigate();

  function handleChange(e) {
    setQuery(e.target.value);
  }

  function handleEnter(e) {
    if (e.code === "Enter") {
      navigate({
        pathname: `/search`,
        search: `?q=${query}`,
      });
    }
  }

  return (
    <div>
      <Heading>Google</Heading>
      <Input
        placeholder="search google"
        className="search-box"
        onChange={handleChange}
        onKeyPress={handleEnter}
      ></Input>
    </div>
  );
};
