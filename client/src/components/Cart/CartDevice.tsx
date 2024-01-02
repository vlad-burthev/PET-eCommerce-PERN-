import type { FC } from "react";
import { I_Full_Device } from "../Admin/DevicesManagement/DeviceCard/DeviceCard.props";

export interface I_Device extends I_Full_Device {
  amount: number;
}

interface CartDeviceProps {
  device: I_Device;
}

import styles from "./CardDevice.module.scss";
import { UIButton } from "../UI-Kit/UIButton/UIButton";
import classNames from "classnames";

const CartDevice: FC<CartDeviceProps> = ({ device }) => {
  console.log(device);

  return (
    <div className={styles.card}>
      <div className={styles.img}>
        <img
          src={import.meta.env.VITE_BASE_URL + device.image}
          alt={`${device.name} image`}
        />
      </div>
      <div className={styles["info-block"]}>
        <ul className={styles.list}>
          <li>{device.name}</li>
          <li>{device.price}</li>
          <li>{device.sale}</li>
        </ul>
        <div className={styles["amount-block"]}>
          <span className={classNames(styles.minus, styles.btn)}>-</span>
          <span className={styles.amount}>{device.amount}</span>
          <span className={classNames(styles.add, styles.btn)}>+</span>
        </div>
      </div>
      <UIButton appearance="danger">remove from cart</UIButton>
    </div>
  );
};

export default CartDevice;
