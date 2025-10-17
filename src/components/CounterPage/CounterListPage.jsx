import { useEffect } from "react";
import { Link } from "react-router-dom";
import { API } from "~/API/API";
import { useAPI } from "~/hooks/useAPI";

const CounterListPage = () => {
  const [dispatch, data, isLoading, isError] = useAPI(API.getAll);

  useEffect(() => {
    if (!data) {
      dispatch();
    }
  }, [dispatch, data]);

  if (!data || isLoading) return <div>Loading...</div>;
  if (!data || isError) return <div>Error...</div>;

  return (
    <section>
      <ul>
        {data.map(({ id, address }) => {
          return (
            <li key={id}>
              <Link to={`/counter/${id}`}>{address}</Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default CounterListPage;
