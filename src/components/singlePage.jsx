import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const SingleItem = () => {
  let { id } = useParams();
  let [data, setData] = useState({});
  useEffect(() => {
    axios
      .get(`https://fast-reef-22226.herokuapp.com/data/${id}`)
      .then((res) => {
        setData(res.data);
      });
  }, []);
  return (
    <div id="detailed-result">
      <div className="title">
        <h1>Title : {data.title}</h1>
      </div>
      <div className="desc">
        <p>{data.description}</p>
      </div>
      <div className="author">
        <h2>Author : {data.author}</h2>
      </div>
      <div className="creation-date">
        <h2>Creation Date : {data.creation_date}</h2>
      </div>
      <div className="explicit">
        <h3>Explicit : {data.explicit ? "Yes" : "No"}</h3>
      </div>
      <div className="quality">
        <h3>Quality : {data.quality}</h3>
      </div>
    </div>
  );
};
