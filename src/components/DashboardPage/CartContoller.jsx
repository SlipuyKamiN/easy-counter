import { useState } from "react";
import {
  TbShoppingCart,
  TbShoppingCartCancel,
  TbShoppingCartPlus,
  TbShoppingCartX,
} from "react-icons/tb";
import { Modal } from "../Common/Modal";
import { TextInput } from "../Common/Inputs.styled";
import {
  CartButton,
  CartHeading,
  CartList,
  NewCartItem,
} from "./CartContoller.styled";
import { getCartTotal, getText, groupItems } from "~/helpers/cart";
import {
  HiOutlineClipboardDocumentCheck,
  HiOutlineClipboardDocumentList,
} from "react-icons/hi2";
import { ClipboardIcon } from "../Common/ClipboardIcon.styled";
import { handleCopy } from "~/helpers/handleCopy";

export const CartContoller = ({ item, handleChange }) => {
  const { cart } = item;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newQty, setNewQty] = useState("");
  const [copied, setCopied] = useState("");

  const noNewData = !newQty || !newName || !newPrice;

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const updateCart = () => {
    if (noNewData) return;

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
      <CartButton onClick={toggleModal}>
        <TbShoppingCart size={24} />
        <span>{cart.length || 0}</span>
      </CartButton>
      {isModalOpen && (
        <Modal toggleModal={toggleModal}>
          <CartList>
            {cart.length ? (
              <>
                <CartHeading>
                  <h4>Gesamtpreis: {getCartTotal(cart)} €</h4>
                  <ul>
                    <li>
                      <CartButton
                        className={copied && "copied"}
                        onClick={() => handleCopy(getText(cart), setCopied)}
                      >
                        <HiOutlineClipboardDocumentList size={28} />
                        <ClipboardIcon className={copied && "copied"}>
                          <HiOutlineClipboardDocumentCheck size={28} />
                        </ClipboardIcon>
                      </CartButton>
                    </li>
                    <li>
                      <CartButton
                        onClick={() => {
                          const text = `Möchten Sie den Warenkorb für: ${item.address} leeren?`;
                          if (window.confirm(text)) {
                            clearCart();
                          } else {
                            console.log("Canceled");
                          }
                        }}
                      >
                        <TbShoppingCartX size={28} />
                      </CartButton>
                    </li>
                  </ul>
                </CartHeading>
                {groupItems(cart).map(({ name, price, quantity }) => (
                  <li key={name}>
                    {quantity}x {name} {price} €
                  </li>
                ))}
              </>
            ) : (
              <CartHeading>
                <h4>Warenkorb sind noch leer</h4>
                <TbShoppingCartCancel size={28} />
              </CartHeading>
            )}
            <li>
              <NewCartItem>
                <li>
                  <TextInput
                    required
                    placeholder="Menge"
                    type="number"
                    value={newQty}
                    onChange={({ target }) => setNewQty(Number(target.value))}
                  />
                </li>
                <li>
                  <TextInput
                    required
                    placeholder="Name"
                    type="text"
                    value={newName}
                    onChange={({ target }) => setNewName(target.value)}
                  />
                </li>
                <li>
                  <TextInput
                    required
                    placeholder="Preis"
                    value={newPrice}
                    type="number"
                    onChange={({ target }) => setNewPrice(Number(target.value))}
                  />
                </li>
                <li>
                  <CartButton onClick={updateCart} disabled={noNewData}>
                    <TbShoppingCartPlus size={24} />
                  </CartButton>
                </li>
              </NewCartItem>
            </li>
          </CartList>
        </Modal>
      )}
    </>
  );
};
