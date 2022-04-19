import DataTable from "react-data-table-component";
import { useState, useEffect } from "react";
const axios = require("axios");

const columns = [
  {
    name: "Title",
    selector: (row) => row.title,
  },
  {
    name: "Original Title",
    selector: (row) => row.originalTitle,
  },
  {
    name: "Director",
    selector: (row) => row.director,
  },
  {
    name: "Running Time",
    selector: (row) => row.runningTime,
  },
  {
    name: "RT Score",
    selector: (row) => row.rtScore,
  },
  {
    name: "Release Date",
    selector: (row) => row.releaseDate,
  },
];

export default function FilmTable() {
  const api = "https://ghibliapi.herokuapp.com/films";
  const [filmData, setFilmData] = useState([]);
  useEffect(() => {
    axios
      .get(api)
      .then(({ data: films }) => {
        const filteredFilms = films.map((film) => ({
          title: film.title,
          originalTitle: film.original_title,
          director: film.director,
          releaseDate: film.release_date,
          runningTime: film.running_time,
          rtScore: film.rt_score,
        }));
        setFilmData(filteredFilms);
      })
      .catch((error) => console.log(error));
  }, []);
  return <DataTable columns={columns} data={filmData} pagination />;
}
