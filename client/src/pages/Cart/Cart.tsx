import type { FC } from "react";
import { useFetchCartQuery } from "../../services/cartAPI";

interface CartProps {}

//styles
import styles from "./Cart.module.scss";
import CartDevice, { I_Device } from "../../components/Cart/CartDevice";

const Cart: FC<CartProps> = () => {
  const { data } = useFetchCartQuery("");
  console.log(data);

  return (
    <div className={styles.cart}>
      {data &&
        data.map((device: I_Device) => (
          <CartDevice key={device.id} device={device} />
        ))}
    </div>
  );
};

export default Cart;
