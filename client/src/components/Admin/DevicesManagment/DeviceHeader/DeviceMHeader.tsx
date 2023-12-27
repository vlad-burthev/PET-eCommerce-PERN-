import { useState, type FC, useEffect } from "react";
import { useCreateDeviceMutation } from "../../../../services/deviceAPI";

import styles from "./DeviceHeader.module.scss";
import { UIButton } from "../../../UI-Kit/UIButton/UIButton";
import classNames from "classnames";
import { UIInput } from "../../../UI-Kit/UIInput/UIInput";
import { useFetchAllTypesQuery } from "../../../../services/typeAPI";
import { I_Type } from "../../../../interfaces/interfaces";
import { useFetchAllBrandsQuery } from "../../../../services/brandAPI";

interface I_Info {
  title: string;
  description: string;
  number: number;
}

interface I_DeviceMHeader {
  setFilter: (e: string) => void;
}

const DeviceMHeader: FC<I_DeviceMHeader> = ({ setFilter }) => {
  const [showForm, setShowForm] = useState(false);
  const [validForm, setValidForm] = useState(true);

  const [createDevice, { isSuccess, isError }] = useCreateDeviceMutation();

  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number | string>("");
  const [sale, setSale] = useState<number | string>("");
  const [brandId, setBrandId] = useState<number | string>("");
  const [typeId, setTypeId] = useState<number | string>("");
  const [description, setDescription] = useState<string>("");
  const [file, setFile] = useState<FileList | null>(null);

  const [info, setInfo] = useState<I_Info[]>([]);
  const addInfo = () => {
    setInfo([...info, { title: "", description: "", number: Date.now() }]);
  };
  const changeInfo = (key: string, value: string, number: number) => {
    setInfo(
      info.map((i) => (i.number === number ? { ...i, [key]: value } : i))
    );
  };
  const removeInfo = (num: number) => {
    setInfo(info.filter((i) => i.number !== num));
  };

  const addDeviceHandler = async () => {
    if (
      name.length === 0 &&
      price === "" &&
      sale === "" &&
      brandId === "" &&
      typeId === "" &&
      description === "" &&
      !file
    ) {
      setValidForm(false);
      return;
    }
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", `${price}`);
    formData.append("sale", `${sale}`);
    formData.append("brandId", `${brandId}`);
    formData.append("typeId", `${typeId}`);
    if (file !== null) {
      formData.append("image", file[0]);
    }
    formData.append("description", description);
    formData.append("info", JSON.stringify(info));

    await createDevice(formData);
  };

  useEffect(() => {
    if (isSuccess && !isError) {
      setPrice("");
      setName("");
      setBrandId("");
      setTypeId("");
      setDescription("");
      setFile(null);
      setSale("");
      setInfo([]);
      setShowForm(false);
    }
  }, [isSuccess]);

  const { data: types } = useFetchAllTypesQuery("");
  const { data: brands } = useFetchAllBrandsQuery("");

  return (
    <div className={styles.header}>
      <UIButton
        styleClass={styles["header-btn"]}
        appearance="ghost"
        onClick={() => setShowForm((s) => !s)}
      >
        {showForm ? "close" : "open"} add form
      </UIButton>
      <div
        className={classNames(
          styles["header-form"],
          showForm && styles["form__active"]
        )}
      >
        <div className={styles["input-form"]}>
          <UIInput
            error={isError || !validForm ? true : false}
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            apearence="warning"
            placeholder="name"
          />

          <UIInput
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            type="number"
            apearence="warning"
            placeholder="price"
            error={isError || !validForm ? true : false}
          />

          <UIInput
            error={isError || !validForm ? true : false}
            value={sale}
            onChange={(e) => setSale(Number(e.target.value))}
            type="number"
            apearence="warning"
            placeholder="sale"
          />

          <UIInput
            error={isError || !validForm ? true : false}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            type="text"
            apearence="warning"
            placeholder="description"
          />

          <select
            className={classNames(
              styles.select,
              isError || !validForm ? styles["error-select"] : ""
            )}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setTypeId(Number(e.target.value))
            }
            name="types"
          >
            <option>types</option>
            {types &&
              types.map((type: I_Type) => (
                <option key={type.id} value={type.id}>
                  {type.name}
                </option>
              ))}
          </select>

          <select
            className={classNames(
              styles.select,
              isError || !validForm ? styles["error-select"] : ""
            )}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setBrandId(Number(e.target.value))
            }
            name="brands"
          >
            <option>brands</option>
            {brands &&
              brands.map((brand: I_Type) => (
                <option key={brand.id} value={brand.id}>
                  {brand.name}
                </option>
              ))}
          </select>

          <UIInput
            error={isError || !validForm ? true : false}
            onChange={(e) => setFile(e.target.files)}
            type="file"
          />
        </div>
        <div className={styles["info-block"]}>
          <UIButton appearance="primary" onClick={addInfo}>
            add characteristic
          </UIButton>
          {info.map((i) => (
            <div className={styles["info-form"]} key={i.number}>
              <div>
                <label htmlFor={i.number + "title"}>title</label>
                <UIInput
                  id={i.number + "title"}
                  value={i.title}
                  onChange={(e) =>
                    changeInfo("title", e.target.value, i.number)
                  }
                  type="text"
                />
              </div>
              <div>
                <label htmlFor={i.number + "description"}>description</label>
                <UIInput
                  id={i.number + "description"}
                  value={i.description}
                  onChange={(e) =>
                    changeInfo("description", e.target.value, i.number)
                  }
                  type="text"
                />
              </div>
              <UIButton
                appearance="danger"
                onClick={() => removeInfo(i.number)}
              >
                delete
              </UIButton>
            </div>
          ))}
        </div>

        <UIButton onClick={addDeviceHandler} appearance="warning">
          create device
        </UIButton>
      </div>
      <UIInput
        onChange={(e) => setFilter(e.target.value)}
        type="text"
        apearence="search"
        placeholder="enter device name to search"
      />
    </div>
  );
};

export default DeviceMHeader;
