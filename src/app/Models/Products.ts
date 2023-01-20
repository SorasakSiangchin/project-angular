export class Product {
    id!:string;
    idTypeProduct!:string;
    name!:string;
    price!:string;
    image!:string;
    upfile:any;
    stock!:string;
    color!:string;
    shape:any;
}

export interface Product01 {
    id:                      number;
    idTypeProduct:           number;
    name:                    string;
    price:                   number;
    image:                   string;
    stock:                   number;
    color:                   string;
    shape:                   string;
    upfile:                  any;
    idTypeProductNavigation: IDTypeProductNavigation;
    detailProduct:           any[];
    list:                    any[];
    statusProduct:           any[];
}


export interface IDTypeProductNavigation {
    id:      number;
    name:    string;
    product: any[];
}
