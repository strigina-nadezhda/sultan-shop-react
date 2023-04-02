import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeSortKey } from "../features/shop/slice";
import { ShopSelector } from "../features/shop/selector";

export const Sort: React.FC = () => {
    const sortKey = useSelector(ShopSelector.sortKey);
    const dispatch = useDispatch()

    return (
        <div className="sort">
            <label htmlFor="sort-select">Сортировка:</label>

            <select name="sort" id="sort-select" value={sortKey} onChange={(event) => dispatch(changeSortKey(event.target.value))} >

                <option value="titleUp" >Название А-Я</option>
                <option value="titleDown" >Название Я-А</option>
                <option value="priceDown">По возрастанию</option>
                <option value="priceUp">По убыванию</option>

            </select>
        </div>


    )
}



