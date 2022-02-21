import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useParams, useSearchParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { sortData, addData } from "../redux/actions";
import { NavBar } from "./Nav";

export const DetailsPage = () => {
  const [searchParams] = useSearchParams();
  let query = searchParams.get("q");
  const dispatch = useDispatch();
  let store = useSelector((store) => store.sortedData);

  useEffect(() => {
    getData();
  }, []);

  function getData() {
    axios.get("https://fast-reef-22226.herokuapp.com/data").then((res) => {
      //   console.log(res.data);
      let sorted = [];

      res.data.forEach((item) => {
        if (item.title === query) {
          sorted.push(item);
        }
      });

      dispatch(sortData(sorted));

      dispatch(addData(res.data));
    });
  }

  function handleAlpha() {
    let sortingData = store;

    sortingData.sort((a, b) => {
      a = a.author;
      b = b.author;
      if (a < b) {
        return -1;
      }
    });
    dispatch(sortData(sortingData));
  }

  function handleAlphaDesc() {
    let sortingData = store;

    sortingData.sort((a, b) => {
      a = a.title.toUpperCase();
      b = b.title.toUpperCase();
      if (a < b) {
        return 1;
      }
    });

    dispatch(sortData(sortingData));
  }

  return (
    <div>
      <NavBar />
      <div>
        <button id="sort-alphabetically" onClick={handleAlpha}>
          Sort A-Z
        </button>
        <button id="sort-alphabetically-desc" onClick={handleAlphaDesc}>
          Sort Z-A
        </button>
        <button id="sort-by-date">Sort by Date (Asc)</button>
        <button id="sort-by-date-desc">Sort by Date (Desc)</button>
        <button id="sort-by-quality">Sort by quality (Asc)</button>
        <button id="sort-by-quality-desc">Sort by quality (Dsc)</button>
        <button id="filter-explicit">Filter Explicit</button>
      </div>
      <div id="search-result">
        {store.map((e) => (
          <div className="result" key={e.id}>
            <p>{e.url}</p>
            <h3>
              <Link to={`/page/${e.id}`}>
                {e.title} | {e.author}
              </Link>
            </h3>
            <p>{e.description}</p>
            <h4>{e.creation_date}</h4>
            <h4>
              Explicit : {e.explicit ? "Yes" : "No"} Quality : {e.quality} %
            </h4>
          </div>
        ))}
      </div>
    </div>
  );
};
