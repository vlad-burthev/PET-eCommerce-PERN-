import { useState, useMemo } from "react";
import { I_Type } from "../interfaces/interfaces";
import { I_Full_Device } from "../components/Admin/DevicesManagment/DeviceCard/DeviceCard.props";

interface useFilteredArrayProps<T> {
  data: T[];
  isSuccess: boolean;
  filter: string;
}

export const useFilteredArray = <T extends I_Type | I_Full_Device>({
  data,
  isSuccess,
  filter,
}: useFilteredArrayProps<T>) => {
  const [filteredData, setFilteredData] = useState<T[]>([]);

  useMemo(() => {
    if (data) {
      const filteredData = data.filter((element: T) =>
        element.name.trim().toLowerCase().includes(filter.trim().toLowerCase())
      );
      setFilteredData(filteredData);
    }
  }, [isSuccess, data, filter]);

  return filteredData;
};
