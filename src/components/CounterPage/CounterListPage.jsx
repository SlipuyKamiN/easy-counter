import { Link } from "react-router-dom";

const CounterListPage = () => {
  return (
    <section>
      <ul>
        <li>
          <Link to={"/counter/1"}>1</Link>
        </li>
        <li>
          <Link to={"/counter/2"}>2</Link>
        </li>
        <li>
          <Link to={"/counter/3"}>3</Link>
        </li>
        <li>
          <Link to={"/counter/4"}>4</Link>
        </li>
      </ul>
    </section>
  );
};

export default CounterListPage;
