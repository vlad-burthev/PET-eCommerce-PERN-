import type { FC } from "react";
import { useParams } from "react-router-dom";
import { useFetchOneDeviceQuery } from "../../services/deviceAPI";

//styles
import styles from "./DevicePage.module.scss";
//types
import { DevicePageProps } from "./DevicePage.prop";
import Rating from "../../components/Rating/Rating";
import { UIButton } from "../../components/UI-Kit/UIButton/UIButton";

const DevicePage: FC<DevicePageProps> = () => {
  const { slug } = useParams();

  const { data } = useFetchOneDeviceQuery(slug ? slug : "");
  console.log(data);

  return (
    <>
      {data && (
        <div className={styles.page}>
          <div className={styles.content}>
            <div className={styles.info}>
              <div className={styles.image}>
                <img
                  src={import.meta.env.VITE_BASE_URL + data.image}
                  alt={`${data.name} image`}
                />
              </div>
              <div className={styles.params}>
                <h2>parameters:</h2>
                {data.info &&
                  data.info.map((info) => (
                    <div className={styles["params-item"]} key={info.id}>
                      <span className={styles.title}>{info.title}</span>
                      <span className={styles.desc}>{info.description}</span>
                    </div>
                  ))}
              </div>
              <div className={styles["info-params"]}>
                <h2>information:</h2>
                <ul>
                  <li>name: {data.name}</li>
                  <li>brnad: {data.brand?.name}</li>
                  <li>type: {data.type?.name}</li>
                  <li className={styles.price}>
                    {data.sale > 0 ? (
                      <div className={styles["sale-block"]}>
                        <span className={styles["price__sale"]}>
                          price: {data.price - (data.sale / 100) * data.price} ${" "}
                          <span className={styles.sale}>sale {data.sale}%</span>
                        </span>
                      </div>
                    ) : (
                      data.price + "$"
                    )}
                  </li>
                </ul>
                <Rating ratingArray={data.rating} slug={data.slug} />
                <div className={styles["btn-block"]}>
                  <UIButton
                    styleClass={styles["btn__buy"]}
                    appearance="primary"
                  >
                    buy
                  </UIButton>
                </div>
              </div>
            </div>
            <div>{data.description}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default DevicePage;
