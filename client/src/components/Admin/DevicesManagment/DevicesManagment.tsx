import { useState } from "react";

//styles
import styles from "./DevicesManagment.module.scss";
//types
import { I_Full_Device } from "./DeviceCard/DeviceCard.props";

import { useFetchAllDevicesQuery } from "../../../services/deviceAPI";
import { useFilteredArray } from "../../../hooks/useFilteredArray";
import DeviceMHeader from "./DeviceHeader/DeviceMHeader";
import DeviceCard from "./DeviceCard/DeviceCard";

const DevicesManagment = () => {
  const { data, isSuccess }: any = useFetchAllDevicesQuery("");
  const [filter, setFilter] = useState("");

  const filteredDevice = useFilteredArray<I_Full_Device>({
    data: data?.rows,
    isSuccess,
    filter,
  });

  return (
    <div className={styles["device-menegment"]}>
      <DeviceMHeader setFilter={setFilter} />
      <div className={styles.list}>
        {filteredDevice &&
          filteredDevice.map((device: I_Full_Device) => (
            <DeviceCard key={device.id} device={device} />
          ))}
      </div>
    </div>
  );
};

export default DevicesManagment;
