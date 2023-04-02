import { BiPencil, BiTrash } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { openEditProductDialog } from "../../features/admin/slice";
import { deleteProduct } from "../../features/products/slice";
import { ShopSelector } from "../../features/shop/selector";
import { IProduct } from "../../store/types/types";

export const Table = () => {
  const products = useSelector(ShopSelector.filteredProducts);
  const dispatch = useDispatch();

  const imgSrc = (img: string, i: number) => {
    if (img.includes("http")) {
      return img;
    } else {
      return `/images/${products[i].bigImg}`;
    }
  };

  return (
    <table>
      <thead>
        <tr>
          <th>&nbsp;</th>

          <th>Название товара</th>
          <th>Бренд</th>
          <th>Цена</th>
          <th>Кол.</th>
          <th>
            <BiPencil />  <BiTrash />
          </th>
        </tr>
      </thead>
      <tbody>
        {Array.from(products).map((product: IProduct, i) => (
          <tr key={i}>
            <td>
              <img src={imgSrc(product.bigImg, i)} alt="product-img" />
            </td>
            <td>{product.title}</td>
            <td>{product.manufacturer}</td>
            <td>{product.price}</td>
            <td>1</td>
            <td>
              <button
                className="btn-table btn"
                onClick={() => dispatch(openEditProductDialog(product))}
              >
                {" "}
                <BiPencil size="2em" />{" "}
              </button>
              <button
                className="btn-table btn"
                onClick={() => dispatch(deleteProduct(product))}
              >
                {" "}
                <BiTrash size="2em" />{" "}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
