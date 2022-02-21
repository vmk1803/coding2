import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { sortData } from "../redux/actions";

const NavDiv = styled.div`
  display: flex;
  border: 1px;
  justify-content: center;
  align-items: center;

  & input {
    width: 400px;
    height: 40px;
    margin-left: 60px;
  }
  & button {
    width: 100px;
    height: 50px;
  }
`;

export const NavBar = () => {
  let [text, setText] = useState();
  let { data, sortedData } = useSelector((store) => store);
  const dispatch = useDispatch();

  function handleSort(e) {
    let sorted = [];
    data.forEach((item) => {
      if (item.title === text) {
        sorted.push(item);
      }
    });

    dispatch(sortData(sorted));
  }

  function handlePress(e) {
    if (e.code === "Enter") {
      let sorted = [];
      data.forEach((item) => {
        if (item.title === text) {
          sorted.push(item);
        }
      });

      dispatch(sortData(sorted));
    }
  }

  return (
    <NavDiv id="navbar">
      <h2>Google</h2>
      <input
        type="text"
        onChange={(e) => {
          setText(e.target.value);
        }}
        onKeyPress={handlePress}
      />
      <button className="search" onClick={handleSort}>
        Search
      </button>
    </NavDiv>
  );
};
