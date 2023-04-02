import { FC } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { ShopSelector } from "../../features/shop/selector";
import { AdminSelector } from "../../features/admin/selector";
import { useDispatch } from "react-redux";
import { IProduct } from "../../store/types/types";
import { addProduct } from "../../features/products/slice";
import { updateProduct } from "../../features/products/slice";
import { closeDialog } from "../../features/admin/slice";

export const AdminDialogForm: FC = () => {
  const product = useSelector(AdminSelector.editableProduct);
  const dispatch = useDispatch();
  const editableProduct = useSelector(AdminSelector.editableProduct)

  const [isOpenedType, setIsOpened] = useState(true);
  const types = useSelector(ShopSelector.categories)

  const showCheckboxes = () => {
    setIsOpened((current) => !current);
  };


  const handleSubmit = (event: any) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const cardData: any = {};
    cardData["type"] = [];

    for (let [key, value] of formData.entries()) {
      if (cardData[key]) {
        const existingValue = cardData[key];
        if (Array.isArray(existingValue)) {
          existingValue.push(value);
        } else {
          cardData[key] = [cardData[key], value];
        }
      } else {
        cardData[key] = value;
      }
    }

    const product: IProduct = cardData;

    editableProduct === null ? dispatch(addProduct(product)) : dispatch(updateProduct(product))

    dispatch(closeDialog());
  };

  return (
    <div className="form">
      <div className="form__title">Форма нового продукта</div>
      <form onSubmit={handleSubmit}>
        <div className="form__row">
          <div className="form__row--col">
            <div className="form__line">
              <label className="form__line--label">Название* </label>
              <input
                className="form__line--input"
                type="text"
                defaultValue={product?.title}
                name="title"
                placeholder="Введите название"
                required
              />
            </div>
            <div className="form__line">
              <label className="form__line--label">Объём/Вес* </label>
              <select
                name="unit"
                required
                defaultValue={product?.unit}
                placeholder="Выберите вариант"
                className="form__line--input form__line--input-select"
              >

                <option value="Вес">Вес</option>
                <option value="Объём">Объём</option>
              </select>
            </div>
            <div className="form__line">
              <label className="form__line--label">Размер* </label>
              <input
                className="form__line--input"
                type="text"
                defaultValue={product?.size}

                name="size"
                placeholder="Введите размер"
                required
              />
            </div>
            <div className="form__line">
              <label className="form__line--label">Штрихкод* </label>
              <input
                className="form__line--input"
                type="text"
                defaultValue={product?.barcode}

                name="barcode"
                placeholder="Введите штрихкод"
                required
              />
            </div>
            <div className="form__line">
              <label className="form__line--label">Описание* </label>
              <textarea
                className="form__line--input"
                name="description"
                defaultValue={product?.description}

                placeholder="Введите описание"
                required
              />
            </div>
          </div>

          <div className="form__row--col">
            <div className="form__line">
              <label className="form__line--label" >Бренд* </label>
              <input
                className="form__line--input"
                type="text"
                defaultValue={product?.brand}
                name="brand"
                placeholder="Введите бренд"
                required
              />
            </div>
            <div className="form__line">
              <label className="form__line--label">Производитель* </label>
              <input
                className="form__line--input"
                type="text"
                defaultValue={product?.manufacturer}

                name="manufacturer"
                placeholder="Введите производителя"
                required
              />
            </div>
            <div className="form__line">
              <label className="form__line--label">Цена* </label>
              <input
                className="form__line--input"
                type="text"
                defaultValue={product?.price}

                name="price"
                placeholder="Введите цену"
                required
              />
            </div>
            <div className="form__line">
              <label className="form__line--label">Тип* </label>
              {/* <select multiple name="type">
                {Array.from(types).map((type: string, index: number) => (
                  <option key={index}
                    className="type"
                    value={type}
                    selected={product?.type?.includes(type) ?? false}>
                    {type}
                  </option>
                ))}
              </select> */}
              <div className="selectBox" onClick={() => showCheckboxes()}>
                <select
                  placeholder="Выберите тип"
                  className="form__line--input form__line--input-select"
                ></select>

              </div>
              <div
                id="checkboxes"
                style={{ display: isOpenedType ? "none" : "grid" }}
              >
                <fieldset>
                  {Array.from(types).map((type: string, index: number) => (
                    <label key={index}>
                      <input
                        className="type"
                        type="checkbox"
                        name="type"
                        value={type}
                        defaultChecked={product?.type?.includes(type) ?? false}

                      />
                      {type}
                    </label>
                  ))}
                </fieldset>

              </div>
            </div>
            <div className="form__line">
              <label className="form__line--label">Картинка маленькая* </label>
              <input
                name="img"
                defaultValue={product?.img}
                className="form__line--input"
                type="text"
                placeholder="Вставьте ссылку на картинку"
                required
              ></input>
            </div>
            <div className="form__line">
              <label className="form__line--label">Картинка большая* </label>
              <input
                name="bigImg"
                defaultValue={product?.bigImg}
                className="form__line--input"
                type="text"
                placeholder="Вставьте ссылку на картинку"
                required
              ></input>
            </div>
          </div>

        </div>

        <button type="submit" name="button" className="btn">
          Сохранить
        </button>
      </form>
    </div>
  );
};
