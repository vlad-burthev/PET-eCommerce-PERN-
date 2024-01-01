import type { FC } from "react";
import { I_Full_Device } from "../Admin/DevicesManagement/DeviceCard/DeviceCard.props";

export interface I_Device extends I_Full_Device {
  amount: number;
}

interface CartDeviceProps {
  device: I_Device;
}

const CartDevice: FC<CartDeviceProps> = ({ device }) => {
  return (
    <div>
      {device.name}
      {device.amount}
    </div>
  );
};

export default CartDevice;
