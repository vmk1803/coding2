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
  let [data, setData] = useState(store);
  // console.log(store);

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

    setData(sortingData);
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

    setData(sortingData);
  }

  function handleDate() {
    let sortingData = store;

    sortingData.sort((a, b) => {
      a = a.creation_date;
      b = b.creation_date;
      return a - b;
    });

    setData(sortingData);
    console.log(sortingData);
  }

  function handleDataDesc() {
    let sortingData = store;

    sortingData.sort((a, b) => {
      a = a.creation_date;
      b = b.creation_date;
      return b - a;
    });

    setData(sortingData);
    console.log(sortingData);
  }

  function handleQuality() {
    let sortingData = store;

    sortingData.sort((a, b) => {
      a = a.quality;
      b = b.quality;
      return a - b;
    });
  }

  function handleQualityDesc() {
    let sortingData = store;

    sortingData.sort((a, b) => {
      a = a.quality;
      b = b.quality;
      return b - a;
    });
  }

  function handleExplicit() {
    let sortingData = store;
    let sorted = [];

    sortingData.map((e) => {
      if (e.explicit === true) {
        sorted.push(e);
      }
    });

    setData(sorted);
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
        <button id="sort-by-date" onClick={handleDate}>
          Sort by Date (Asc)
        </button>
        <button id="sort-by-date-desc" onClick={handleDataDesc}>
          Sort by Date (Desc)
        </button>
        <button id="sort-by-quality" onClick={handleQuality}>
          Sort by quality (Asc)
        </button>
        <button id="sort-by-quality-desc" onClick={handleQualityDesc}>
          Sort by quality (Dsc)
        </button>
        <button id="filter-explicit" onClick={handleExplicit}>
          Filter Explicit
        </button>
      </div>
      <div id="search-result">
        {data.length != 0
          ? data.map((e) => (
              <div className="result" key={e.id}>
                <p>{e.url}</p>
                <h2>
                  <Link to={`/page/${e.id}`}>
                    {e.title} | {e.author}
                  </Link>
                </h2>
                <p>{e.description}</p>
                <h3>{e.creation_date}</h3>
                <h3>
                  Explicit :{e.explicit ? "Yes" : "No"} Quality : {e.quality}%
                </h3>
              </div>
            ))
          : store.map((e) => (
              <div className="result" key={e.id}>
                <p>{e.url}</p>
                <h2>
                  <Link to={`/page/${e.id}`}>
                    {e.title} | {e.author}
                  </Link>
                </h2>
                <p>{e.description}</p>
                <h3>{e.creation_date}</h3>
                <h3>
                  Explicit :{e.explicit ? "Yes" : "No"} Quality : {e.quality}%
                </h3>
              </div>
            ))}
      </div>
    </div>
  );
};
