export interface StatusProduct {
    id: string;
    idProduct: number;
    date: string;
    stock: number;
    status: boolean | null;
    idProductNavigation?: IDProductNavigation;
}

export interface IDProductNavigation {
    id: number;
    idTypeProduct: number;
    name: string;
    price: number;
    image: string;
    stock: number;
    color: string;
    shape: string;
    idTypeProductNavigation: null;
    detailProduct: any[];
    list: any[];
    statusProduct: StatusProduct[];
}

