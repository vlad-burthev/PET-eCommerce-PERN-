import { I_Full_Device } from "../DeviceCard/DeviceCard.props";

export interface DeviceChangeProps {
  device: I_Full_Device | null;
  showForm: boolean;
  setShowForm: (arg: boolean) => void;
}
