import { useRouter } from "next/router";
import useSWR from "swr";
import Error from "next/error";
import MovieDetails from "@/components/MovieDetails";
import PageHeader from "@/components/PageHeader";

export default function Movie() {
  const router = useRouter();
  //get title from route
  const { title } = router.query;
  //call api & fetch data
  const { data, error } = useSWR(
    `https://white-gosling-hat.cyclic.app//api/movies?page=1&perPage=10&title=${title}`
  );

  //error
  if (error) {
    return <Error statusCode={500} />;
  }

  //data validate
  if (!data) {
    return null;
  }

  if (data.length === 0) {
    return <Error statusCode={404} />;
  }

  // return data
  return (
    <>
      {data.map((movie) => (
        <div key={movie._id}>
          <PageHeader text={movie.title} />
          <MovieDetails movie={movie} />
        </div>
      ))}
    </>
  );
}
