import { useEffect, type FC, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/store";

//styles
import styles from "./Header.module.scss";

// routes
import {
  adminPath,
  cartPath,
  devicePath,
  shopPath,
  signInPath,
  signUpPath,
} from "../../utils/constants/routes";

//components
import { UIContainer } from "../../components/UI-Kit/UIContainer/UIContainer";
import { UIInput } from "../../components/UI-Kit/UIInput/UIInput";
import { UILink } from "../../components/UI-Kit/UILink/UILink";

//icons
import ShopIcon from "../../assets/images/shopIcon.svg?react";
import CartIcon from "../../assets/images/cartIcon.svg?react";
import { UIButton } from "../../components/UI-Kit/UIButton/UIButton";
import { logOut } from "../../store/userSlice/userSlice";
import { useLazyFetchCartAmountQuery } from "../../services/cartAPI";
import {
  useFetchAllDevicesQuery,
  useLazyFetchAllDevicesQuery,
} from "../../services/deviceAPI";
import { useFilteredArray } from "../../hooks/useFilteredArray";
import { I_Full_Device } from "../../components/Admin/DevicesManagement/DeviceCard/DeviceCard.props";

const Header: FC = () => {
  const dispatch = useAppDispatch();
  const logOutHandler = () => {
    dispatch(logOut());
  };

  const { isLogin, isAdmin } = useAppSelector((state) => state.user);
  const [fetchCartAmount, { data }] = useLazyFetchCartAmountQuery();

  const fetchCartAmountHandle = async () => {
    await fetchCartAmount("");
  };

  const { data: devices, isSuccess } = useFetchAllDevicesQuery({ limit: 100 });
  const [deviceName, setDeviceName] = useState("");
  const [searchDevice, setSearchDevice] = useState<I_Full_Device[]>([]);
  const [showSearch, setShowSearch] = useState(false);
  const [linkClicked, setLinkClicked] = useState(false);

  const filteredData = useFilteredArray<I_Full_Device>({
    data: devices?.rows,
    isSuccess,
    filter: deviceName,
  });

  useEffect(() => {
    const limitedData = filteredData.slice(0, 5);
    setSearchDevice(limitedData);
  }, [filteredData]);

  useEffect(() => {
    if (isLogin) {
      fetchCartAmountHandle();
    }
  }, [isLogin]);

  return (
    <header className={styles.header}>
      <UIContainer>
        <div className={styles.content}>
          <div className={styles.logo}>
            <Link to={shopPath} className={styles.title}>
              [PET]<span>eCommerce</span>
            </Link>
          </div>

          <div className={styles.search}>
            <UIInput
              onChange={(e) => setDeviceName(e.target.value)}
              placeholder="enter device name"
              type="text"
              apearence="search"
              onFocus={() => setShowSearch(true)}
              onBlur={() => {
                setTimeout(() => {
                  if (!linkClicked) {
                    setShowSearch(false);
                  }
                  setLinkClicked(false);
                }, 200); // Измените задержку по вашему усмотрению
              }}
            />
            {showSearch && (
              <div className={styles.list}>
                {searchDevice.map((device) => (
                  <Link
                    to={devicePath + device.slug}
                    className={styles["list-item"]}
                    key={device.id}
                    onClick={() => setLinkClicked(true)}
                  >
                    <img
                      src={import.meta.env.VITE_BASE_URL + device.image}
                      alt={device.name + " image"}
                    />
                    <div className={styles["item-info"]}>
                      <span>name: {device.name}</span>
                      <span>price: {device.price}$</span>
                      <span>sale:{device.sale}%</span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className={styles["btn-box"]}>
            <UILink
              styleClass={styles["shop-link"]}
              to={shopPath}
              appearance="ghost"
            >
              shop
              <ShopIcon />
            </UILink>

            {isLogin ? (
              <>
                <UILink
                  styleClass={styles["shop-link"]}
                  to={cartPath}
                  appearance="ghost"
                >
                  cart
                  <CartIcon />
                  {data ? <span className={styles["item"]}>{data}</span> : ""}
                </UILink>

                <UIButton onClick={logOutHandler} appearance="danger">
                  log out
                </UIButton>

                {isAdmin && (
                  <UILink to={adminPath} appearance="warning">
                    admin
                  </UILink>
                )}
              </>
            ) : (
              <div>
                <UILink
                  to={signInPath}
                  styleClass={styles["login-btn"]}
                  appearance="primary"
                >
                  sign-in
                </UILink>
                <UILink to={signUpPath} appearance="ghost">
                  sign-up
                </UILink>
              </div>
            )}
          </div>
        </div>
      </UIContainer>
    </header>
  );
};

export default Header;
