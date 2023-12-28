import type { FC } from "react";

//styles
import styles from "./DeviceCard.module.scss";

//types
import { DeviceCardProps } from "./DeviceCard.props";
import { UIButton } from "../../../UI-Kit/UIButton/UIButton";
import { useDeleteDeviceMutation } from "../../../../services/deviceAPI";

const DeviceCard: FC<DeviceCardProps> = ({ device, showFormHandler }) => {
  const [deleteDevice] = useDeleteDeviceMutation();

  const deleteDeviceHandler = async (slug: string) => {
    await deleteDevice(slug);
  };

  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <div className={styles.image}>
          <img src={import.meta.env.VITE_BASE_URL + device.image} />
        </div>
        <ul className={styles.list}>
          <li>
            id: <span>{device.id}</span>
          </li>
          <li>
            name: <span>{device.name}</span>
          </li>
          <li>
            brand: <span>{device?.brand.name}</span>
          </li>
          <li>
            type: <span>{device?.type.name}</span>
          </li>
          <li>
            price:<span>{device.price}</span>$
          </li>
          <li>
            sale:<span>{device.sale}</span>%
          </li>
          <li>
            description:<span>{device.description}</span>
          </li>
        </ul>
      </div>
      <div className={styles["block-btn"]}>
        <UIButton
          onClick={() => deleteDeviceHandler(device.slug)}
          appearance="danger"
        >
          delete
        </UIButton>
        <UIButton
          onClick={() => showFormHandler(true, device)}
          appearance="warning"
        >
          update
        </UIButton>
      </div>
    </div>
  );
};

export default DeviceCard;
