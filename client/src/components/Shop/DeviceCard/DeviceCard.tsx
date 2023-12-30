import type { FC } from "react";

//styles
import styles from "./DeviceCard.module.scss";
//types
import { DeviceCardProps } from "./DeviceCard.props";
import { Link } from "react-router-dom";
import { devicePath } from "../../../utils/constants/routes";
import { UIButton } from "../../UI-Kit/UIButton/UIButton";

const DeviceCard: FC<DeviceCardProps> = ({ device }) => {
  const addDeviceToCart = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  return (
    <Link to={devicePath + device.slug} className={styles.card}>
      <div className={styles.image}>
        <img
          src={import.meta.env.VITE_BASE_URL + device.image}
          alt={device.name + "image"}
        />
      </div>
      <div>
        <div className={styles.info}>
          {device.sale > 0 ? (
            <div className={styles["sale-block"]}>
              <s className={styles.nosale}>{device.price}$</s>
              <span className={styles["price__sale"]}>
                {device.price - (device.sale / 100) * device.price} $
              </span>
              <span className={styles.sale}>sale {device.sale}%</span>
            </div>
          ) : (
            device.price + "$"
          )}
        </div>
        <div>{device.name}</div>
        <div>{device.brand?.name}</div>
        <div>{device.type?.name}</div>
      </div>
      <UIButton
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => addDeviceToCart(e)}
        styleClass={styles.btn}
        appearance="primary"
      >
        add to cart
      </UIButton>
    </Link>
  );
};

export default DeviceCard;
