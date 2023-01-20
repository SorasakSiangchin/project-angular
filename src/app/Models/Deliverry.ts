
export interface DeliverysModel {
    id:                 string;
    idOrder:            string;
    idStatus:           any;
    date:               string;
}

// ------------- เก็บข้อมูลของ StatusDelivery -----------------
export interface StatusDeliverysModel {
    id:       number;
    status:   string;
}

//-------------- เก็บข้อมูลของ Delivery ----------------------
export interface DeliverysModelX2 {
    id:                 string;
    idOrder:            string;
    idStatus:           number;
    date:               string;
    idOrderNavigation:  null;
    idStatusNavigation: IDStatusNavigation;
}
export interface IDStatusNavigation {
    id:       number;
    status:   string;
    delivery: any[];
}


// export interface DataDeliverysModel {
//     id:                 string;
//     idOrder:            string;
//     idStatus:           number;
//     date:               Date;
//     idOrderNavigation:  null;
//     idStatusNavigation: IDStatusNavigation;
// }

// export interface IDStatusNavigation {
//     id:       number;
//     status:   string;
//     delivery: any[];
// }