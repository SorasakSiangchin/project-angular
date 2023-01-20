//---------------- เก็บข้อมูลเพื่อมาแสดง ---------------
export interface OrderProductModel {
    id:                  string;
    idStatus:            number;
    idProduct:           number;
    date:                string;
    stock:               number;
    idProductNavigation: IDProductNavigation;
    idStatusNavigation:  IDStatusNavigation;
}

export interface IDProductNavigation {
    id:                      number;
    idTypeProduct:           number;
    name:                    string;
    price:                   number;
    image:                   string;
    stock:                   number;
    color:                   string;
    shape:                   string;
    idTypeProductNavigation: null;
    detailProduct:           any[];
    list:                    any[];
    orderProduct:            any[];
}

export interface IDStatusNavigation {
    id:           number;
    name:         string;
    orderProduct: any[];
}
//-------------------------------------------------

//------------- เก็บบค่าจาก Form --------------------
export interface OrderProduct {
    id:                  string;
    idStatus:            number;
    idProduct:           number;
    date:                string;
    stock:               number;
}

export interface IdOrderProduct{
    idOrPro:                  string;
}
//-------------------------------------------------