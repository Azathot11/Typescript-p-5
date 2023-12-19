import { createPortal } from 'react-dom';


import CartItems from './CartItems.tsx';
import {useCartSelector} from "../store/hooks.ts";

type CartProps = {
  onClose: () => void;
};


export default function Cart({ onClose }: CartProps) {
    const items = useCartSelector((state) => state.cart.items);
    console.log(items);
  return createPortal(
    <>
      <div className="cart-backdrop" />
      <dialog id="cart-modal" open>
        <h2>Your Cart</h2>

        <CartItems items={items} />
        <p id="cart-actions">
          <button onClick={onClose}>Close</button>
        </p>
      </dialog>
    </>,
    document.getElementById('modal')!
  );
}
