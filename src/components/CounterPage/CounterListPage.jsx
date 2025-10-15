import { Link } from "react-router-dom";
import { data } from "~/data/data";

const CounterListPage = () => {
  return (
    <section>
      <ul>
        {data.map(({ id, shortName }) => {
          return (
            <li key={id}>
              <Link to={`/counter/${id}`}>{shortName}</Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default CounterListPage;
