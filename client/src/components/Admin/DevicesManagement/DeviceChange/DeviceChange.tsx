import { useState, type FC, useEffect, FormEvent } from "react";

//styles
import styles from "./DeviceChange.module.scss";

//types
import { DeviceChangeProps } from "./DeviceChange.props";
import { UIInput } from "../../../UI-Kit/UIInput/UIInput";
import { UIButton } from "../../../UI-Kit/UIButton/UIButton";
import { useChangeDeviceMutation } from "../../../../services/deviceAPI";

interface I_NewInfo {
  name: string;
  price: string | number;
  sale: string | number;
  description: string;
}

const DeviceChange: FC<DeviceChangeProps> = ({ setShowForm, device }) => {
  const closeFormHandler = () => {
    setShowForm(false);
  };

  const [newInfo, setNewInfo] = useState<I_NewInfo>({
    name: "",
    price: "",
    sale: "",
    description: "",
  });

  const [changeDevice, { isSuccess, isError }] = useChangeDeviceMutation();

  const changeDeviceHandler = async (e: FormEvent) => {
    e.preventDefault();
    if (device !== null) {
      await changeDevice({
        slug: device.slug,
        name: newInfo.name !== "" ? newInfo.name : device.name,
        price: newInfo.price !== "" ? newInfo.price : device.price,
        sale: newInfo.sale !== "" ? newInfo.sale : device.sale,
        description:
          newInfo.description !== "" ? newInfo.description : device.description,
      });
      console.log(newInfo);
    }
  };

  useEffect(() => {
    if (isSuccess && !isError) {
      setShowForm(false);
    }
  }, [isSuccess, isError]);

  return (
    <div onClick={closeFormHandler} className={styles.change}>
      <div onClick={(e) => e.stopPropagation()} className={styles.content}>
        <div className={styles.device}>
          {device && (
            <>
              <div>
                <img src={import.meta.env.VITE_BASE_URL + device.image} />
              </div>
              <ul className={styles.list}>
                <li>
                  name: <span>{device.name}</span>
                </li>
                <li>
                  price: <span>{device.price}</span>
                </li>
                <li>
                  sale: <span>{device.sale}</span>
                </li>
                <li>
                  desc: <span>{device.description}</span>
                </li>
              </ul>
            </>
          )}
        </div>
        <form onSubmit={changeDeviceHandler} className={styles.form}>
          <UIInput
            value={newInfo.name}
            onChange={(e) => setNewInfo({ ...newInfo, name: e.target.value })}
            type="text"
            placeholder="new name"
          />
          <UIInput
            value={newInfo.price}
            onChange={(e) =>
              setNewInfo({ ...newInfo, price: Number(e.target.value) })
            }
            type="number"
            placeholder="new price"
          />
          <UIInput
            value={newInfo.sale}
            onChange={(e) =>
              setNewInfo({ ...newInfo, sale: Number(e.target.value) })
            }
            type="number"
            placeholder="new sale"
          />
          <textarea
            value={newInfo.description}
            onChange={(e) =>
              setNewInfo({ ...newInfo, description: e.target.value })
            }
            placeholder="new description"
          />
          <UIButton type="submit" appearance="primary">
            update
          </UIButton>
        </form>
      </div>
    </div>
  );
};

export default DeviceChange;
