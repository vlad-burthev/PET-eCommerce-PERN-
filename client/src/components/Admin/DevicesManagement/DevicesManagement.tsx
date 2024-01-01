import { useState } from "react";

//styles
import styles from "./DevicesManagement.module.scss";
//types
import { I_Full_Device } from "./DeviceCard/DeviceCard.props";

import { useFetchAllDevicesQuery } from "../../../services/deviceAPI";
import { useFilteredArray } from "../../../hooks/useFilteredArray";
import DeviceMHeader from "./DeviceHeader/DeviceMHeader";
import DeviceCard from "./DeviceCard/DeviceCard";
import DeviceChange from "./DeviceChange/DeviceChange";
import ReactPaginate from "react-paginate";
import Pagination from "../../Pagination/Pagination";

const DevicesManagement = () => {
  const { data, isSuccess }: any = useFetchAllDevicesQuery("");
  const [filter, setFilter] = useState("");

  const filteredDevice = useFilteredArray<I_Full_Device>({
    data: data?.rows,
    isSuccess,
    filter,
  });

  const [selectedDevice, setSelectedDevice] = useState<I_Full_Device | null>(
    null
  );
  const [showForm, setShowForm] = useState(false);

  const showFormHandler = (show: boolean, device: I_Full_Device) => {
    setShowForm(show);
    setSelectedDevice(device);
  };

  const [page, setPage] = useState(1);

  const handlePageClick = (event: any) => {
    setPage(event.selected);
  };

  console.log(showForm);

  return (
    <>
      {showForm && (
        <DeviceChange
          setShowForm={setShowForm}
          device={selectedDevice}
          showForm={showForm}
        />
      )}
      <div className={styles["device-menegment"]}>
        <DeviceMHeader setFilter={setFilter} />
        <div className={styles.list}>
          {filteredDevice &&
            filteredDevice.map((device: I_Full_Device) => (
              <DeviceCard
                showFormHandler={showFormHandler}
                key={device.id}
                device={device}
              />
            ))}
        </div>
      </div>
    </>
  );
};

export default DevicesManagement;
