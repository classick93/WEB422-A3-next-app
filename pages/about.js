import React from "react";
import Link from "next/link";
import Card from "react-bootstrap/Card";
import PageHeader from "@/components/PageHeader";
import MovieDetails from "@/components/MovieDetails";

// get called on build time
export function getStaticProps() {
  // call external api endpoint and get posts
  return new Promise((res, rej) => {
    fetch(
      "https://white-gosling-hat.cyclic.app/api/movies/573a1399f29313caabcedc5d"
    )
      .then((res) => res.json())
      .then((data) => {
        // assign data to props for future use
        res({ props: { moviePost: data } });
      })
      .catch((err) => {
        rej(err);
      });
  });
}

export default function About({ moviePost }) {
  return (
    <>
      <PageHeader text="About the Developer" />
      <Card>
        <Card.Body>
          My name is Jason Shin, a student at Seneca College pursuing Computer
          Programming Diploma. As an individual committed to lifelong learning,
          I actively seek out feedback and constructive criticism as
          opportunities for growth. Although my academic background includes a
          degree in business management, my current studies in computer
          programming demonstrate my passion for programming in business
          applications. My goal is to become a full stack developer and
          undertake challenging roles and responsibilities that can yield
          meaningful results. I aim to become more than proficient in using
          Javascript, HTML, CSS, and back-end languages like Python and Java in
          the near future. I hope to obtain an opportunity in the near future to
          gain experience in this field and start my career as a developer.{" "}
          <br />
          <br />
          My favorite movie is{" "}
          <Link href="/movies/Titanic" legacyBehavior>
            <a>&quot;Jurassic Park&quot;</a>
          </Link>{" "}
          (released in 1993) an all time classic and series I enjoy watching.
          <br />
          <br />
        </Card.Body>
        <MovieDetails movie={moviePost} />
      </Card>
    </>
  );
}
