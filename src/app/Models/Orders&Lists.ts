export class OrderList {
    idProduck!: number[]
    priceProduct!: number[]
    numberProduct!: number[]
    idUser!: number
    StatusMoney!: boolean
}

export interface Lists {
    id: string;
    idOrder: string;
    idProduck: number;
    priceProduct: number;
    numberProduct: number;
}

//--------------------------------------
export interface OrderUpfile {
    id:               string;
    idUser:           number;
    statusMoney:      boolean;
    proofTransfer:    string;
    date:             string;
    priceTotal:       number;
    upfile:any;
    idUserNavigation: IDUserNavigation;
    delivery:         any[];
    list:             List[];
}

export interface IDUserNavigation {
    id:       number;
    name:     string;
    email:    string;
    password: string;
    address:  string;
    tel:      string;
    image:    string;
    order:    any[];
}
//--------------------------------------

//-------------------- เอาไว้เก็บข้อมูลที่ส่งมาจาก Backend มาโชว์---------------------
export interface Orders {
    id:               string;
    idUser:           number;
    statusMoney:      boolean;
    proofTransfer:    any;
    date:             string;
    priceTotal:       number;
    idUserNavigation: null;
    delivery:         any[];
    list:             List[];
}

export interface List {
    id:                  string;
    idOrder:             string;
    idProduck:           number;
    priceProduct:        number;
    numberProduct:       number;
}
//-----------------------------------------------------------------------

//----------------- เก็บข้อมูลของ List มาแสดงหน้า HTML ---------------------
export interface DataList {
    id:                  string;
    idOrder:             string;
    idProduck:           number;
    priceProduct:        number;
    numberProduct:       number;
    idOrderNavigation:   IDOrderNavigation;
    idProduckNavigation: IDProduckNavigation;
}

export interface IDOrderNavigation {
    id:               string;
    idUser:           number;
    statusMoney:      boolean;
    proofTransfer:    string;
    date:             Date;
    priceTotal:       number;
    idUserNavigation: null;
    delivery:         any[];
    list:             any[];
}

export interface IDProduckNavigation {
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
//----------------------------------------------------------------------

//--------------------- เก็บข้อมูลของ Order เพื่อมาแสดงหน้า HTML ------------
export interface IDOrderNavigation1 {
    id:               string;
    idUser:           number;
    statusMoney:      boolean;
    proofTransfer:    null;
    date:             Date;
    priceTotal:       number;
    idUserNavigation: null;
    delivery:         any[];
    list:             OrderData[];
}

export interface OrderData {
    id:                  string;
    idOrder:             string;
    idProduck:           number;
    priceProduct:        number;
    numberProduct:       number;
    idOrderNavigation:  IDOrderNavigation1;
    idProduckNavigation: IDProduckNavigation;
}

//---------------------------------------------------------------------

//------------------- PDF Order ---------------------------------------
export interface GetOrder {
    id:               string;
    idUser:           number;
    statusMoney:      boolean;
    proofTransfer:    null;
    date:             Date;
    priceTotal:       number;
    idUserNavigation: IDUserNavigation;
    delivery:         any[];
    list:             any[];
}

//---------------------------------------------------------------------
