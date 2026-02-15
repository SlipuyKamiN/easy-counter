import { useState } from "react";
import {
  TbShoppingCart,
  TbShoppingCartPlus,
  TbShoppingCartX,
} from "react-icons/tb";
import { Modal } from "../Common/Modal";
import { TextInput } from "../Common/Inputs.styled";
import { CartList, NewCartItem } from "./CartContoller.styled";
import { getCartTotal, groupItems } from "~/helpers/cart";

export const CartContoller = ({ item, handleChange }) => {
  const { cart } = item;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newQty, setNewQty] = useState("");

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const updateCart = () => {
    handleChange(item.id, {
      ...item,
      cart: [
        ...item.cart,
        {
          quantity: newQty,
          name: newName,
          available: false,
          price: newPrice,
        },
      ],
    });
    setNewQty("");
    setNewName("");
    setNewPrice("");
  };

  const clearCart = () => {
    handleChange(item.id, {
      ...item,
      cart: [],
    });
    setNewQty("");
    setNewName("");
    setNewPrice("");
  };

  return (
    <>
      <button>
        <TbShoppingCart size={24} onClick={toggleModal} />
        <span>{cart.length || 0}</span>
      </button>
      {isModalOpen && (
        <Modal toggleModal={toggleModal}>
          <CartList>
            {cart.length ? (
              <>
                <li>
                  <h4>Gesamtpreis: {getCartTotal(cart)} €</h4>
                  <button onClick={clearCart}>
                    <TbShoppingCartX size={24} />
                  </button>
                </li>
                {groupItems(cart).map(({ name, price, quantity }) => (
                  <li key={name}>
                    {quantity}x {name} {price} €
                  </li>
                ))}
              </>
            ) : (
              "Warenkorb sind noch leer"
            )}
            <li>
              <NewCartItem>
                <li>
                  <TextInput
                    placeholder="Menge"
                    type="number"
                    value={newQty}
                    onChange={({ target }) => setNewQty(target.value)}
                  />
                </li>
                <li>
                  <TextInput
                    placeholder="Name"
                    type="text"
                    value={newName}
                    onChange={({ target }) => setNewName(target.value)}
                  />
                </li>
                <li>
                  <TextInput
                    placeholder="Preis"
                    value={newPrice}
                    type="number"
                    onChange={({ target }) => setNewPrice(Number(target.value))}
                  />
                </li>
                <li>
                  <button>
                    <TbShoppingCartPlus size={24} onClick={updateCart} />
                  </button>
                </li>
              </NewCartItem>
            </li>
          </CartList>
        </Modal>
      )}
    </>
  );
};
