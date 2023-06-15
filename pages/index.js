/****************************************************************************
 *  WEB422 – Assignment 3
 *  I declare that this assignment is my own work in accordance with Seneca Academic Policy.
 *  No part of this assignment has been copied manually or electronically from any other source
 *  (including web sites) or distributed to other students.
 *
 *  Name: Jason Shin
 *  Student ID: 111569216
 *  Date: June 15 2023
 *  Cyclic Link: https://white-gosling-hat.cyclic.app/
 *  Next App Link: aesthetic-florentine-4a9ee6.netlify.app
 *
 ****************************************************************************/

import React, { useState, useEffect } from "react";
import useSWR from "swr";
import PageHeader from "@/components/PageHeader";
import MovieDetails from "@/components/MovieDetails";
import Pagination from "react-bootstrap/Pagination";
import Accordion from "react-bootstrap/Accordion";

export default function Home() {
  // set states
  let [page, setPage] = useState(1);
  let [pageData, setPageData] = useState([]);
  // utilize swr to request data
  const { data, error } = useSWR(
    `https://white-gosling-hat.cyclic.app//api/movies?page=${page}&perPage=10`
  );

  // when data is updated, screen data is updated as well
  useEffect(() => {
    if (data) {
      setPageData(data);
    }
  }, [data]);

  // page state value decreases by 1 if page>1
  const previous = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  // page state value increases by 1
  const next = () => {
    setPage(page + 1);
  };

  return (
    <>
      <PageHeader text="Film Collection: Sorted by Date" />
      <Accordion defaultActiveKey="0">
        {pageData.map((movie) => (
          <Accordion.Item eventKey={movie._id} key={movie._id}>
            <Accordion.Header>
              <strong>{movie.title}</strong>
              <pre> </pre>({movie.year}: Directed By{" "}
              {movie.directors.join(", ")})
            </Accordion.Header>
            <Accordion.Body>
              <MovieDetails movie={movie} />
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
      <br />
      <Pagination>
        <Pagination.Prev onClick={previous} />
        <Pagination.Item>{page}</Pagination.Item>
        <Pagination.Next onClick={next} />
      </Pagination>
    </>
  );
}
