import type { FC } from "react";
import Brands from "../Brands/Brands";
import {
  deviceAPI,
  useFetchAllDevicesQuery,
} from "../../../services/deviceAPI";
import { useAppSelector } from "../../../store/store";
import { I_Full_Device } from "../../Admin/DevicesManagement/DeviceCard/DeviceCard.props";
import DeviceCard from "../DeviceCard/DeviceCard";

interface ContentProps {}

//styles
import styles from "./Content.module.scss";

const Content: FC<ContentProps> = () => {
  const { page, brandId, typeId } = useAppSelector((state) => state.device);

  const { data } = useFetchAllDevicesQuery({ page, brandId, typeId });

  return (
    <div>
      <Brands />
      <div className={styles.list}>
        {data &&
          data.rows.map((device: I_Full_Device) => (
            <DeviceCard device={device} key={device.id} />
          ))}
      </div>
    </div>
  );
};

export default Content;
