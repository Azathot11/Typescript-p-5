import {addToCart, removeFromCart} from "../store/card-slice.ts";
import {useCartDispatch} from "../store/hooks.ts";


type cartItem = {
    id: string;
    title: string;
    price: number;
    quantity?: number;
}
type CartItemProps = {
    items: cartItem[];
}
export default function CartItems({items}: CartItemProps) {
    const dispatch = useCartDispatch();
    const handleRemoveFromCart = (id: string) => {
        dispatch(removeFromCart(id));
    }

    const handleAddToCart = (item: cartItem) => {
        dispatch(addToCart(item));
    }

    const formattedTotalPrice = items.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0).toFixed(2);
    return (
        <div id="cart">
            {items.length === 0 ? <p>No items in cart!</p> :
                <>
                    <ul id="cart-items">
                        {items.map((item) => {
                            const formattedPrice = `$${item.price.toFixed(2)}`;

                            return (
                                <li key={item.id}>
                                    <div>
                                        <span>{item.title}</span>
                                        <span> ({formattedPrice})</span>
                                    </div>
                                    <div className="cart-item-actions">
                                        <button onClick={() => handleRemoveFromCart(item.id)}>
                                            -
                                        </button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => handleAddToCart(item)}>+</button>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>

                    <p id="cart-total-price">
                        Cart Total: <strong>{formattedTotalPrice}</strong>
                    </p>

                </>
            }
        </div>
    );
}
