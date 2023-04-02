import { FC } from "react";



export interface ITypes {
    categories: string[]
}
export interface IProduct {
    img: string;
    bigImg: string;
    title: string;
    unit: string;
    size: string;
    barcode: string;
    manufacturer: string;
    brand: string;
    description: string;
    price: string;
    type?: string[];
}

export interface IProducts {
    products: IProduct[];
}


export interface IRoute {
    path: string,
    Component: FC,
    children?: any

}


export enum Unit {
    weight = 'Вес',
    volume = 'Объём'
}

