import type { FC } from "react";
import { useParams } from "react-router-dom";
import { useFetchOneDeviceQuery } from "../../services/deviceAPI";

interface DevicePageProps {}

const DevicePage: FC<DevicePageProps> = () => {
  const { slug } = useParams();

  const { data } = useFetchOneDeviceQuery(slug ? slug : "");

  return "DevicePage";
};

export default DevicePage;
