import { EssentialsCheckbox } from "../Common/Checkboxes";
import { Counter } from "./Counter";
import { CommentInput } from "../Common/CommentInput";
import throttle from "lodash.throttle";
import { CounterItem } from "./CounterList.styled";
import { useAPI } from "~/hooks/useAPI";
import { API } from "~/API/API";
import { useRef } from "react";
import initialEssentials from "~/data/essentials.json";

export const CounterList = ({ dispatch, current, updateProgress }) => {
  const [update] = useAPI(API.update);

  const currentRef = useRef(current);
  currentRef.current = current;

  const updateData = () => {
    dispatch(current.id);
    updateProgress({ done: 1, total: 1 });
  };

  const currentChange = (id, body) => {
    update({ id, body }).then(updateData);
  };

  const updateCart = () => {
    currentChange(current.id, {
      ...current,
      cart: [...current.cart, ...current.essentials.filter((e) => e.available)],
      essentials: initialEssentials,
    });
  };

  const throttledHandleChange = useRef(
    throttle(({ name, qty, itemKey }) => {
      update({
        id: current.id,
        body: {
          ...currentRef.current,
          [itemKey]: currentRef.current[itemKey].map((l) =>
            l.name === name ? { ...l, available: qty } : l,
          ),
          updatedAt: new Date(),
        },
      }).then(updateData);
    }, 200),
  ).current;

  const throttledCheckboxChange = useRef(
    throttle((id, body) => {
      update({ id, body }).then(updateData);
    }, 200),
  ).current;

  return (
    <ul>
      {current.linens.map(({ name, available }) => (
        <Counter
          key={name}
          name={name}
          available={available}
          handleChange={throttledHandleChange}
          itemKey={"linens"}
        />
      ))}
      {current.essentials.map((found) => (
        <CounterItem key={found.name}>
          <h3>{found.name}</h3>
          <EssentialsCheckbox
            item={current}
            found={found}
            onChange={throttledCheckboxChange}
          />
        </CounterItem>
      ))}
      <CounterItem>
        <h3>Sonstiges:</h3>
        <CommentInput item={current} handleChange={currentChange} clearable />
      </CounterItem>
      <CounterItem>
        <button onClick={updateCart}>Update cart</button>
      </CounterItem>
    </ul>
  );
};
