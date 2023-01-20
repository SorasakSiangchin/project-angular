//----- ใช้สำหรับอัพเดทและ -----
export interface DetailProduct01 {
    id: string;
    idProduct: any;
    image: string;
    weight: number;
    dataMore: string;
    upfile: any;
}

//----- ใช้สำหรับเก็บค่าข้อมูลที่ส่งมาจาก Backend -----
export interface DetailProduct {
    id: string;
    idProduct: any;
    image: string;
    weight: number;
    dataMore: string;
    upfile: any[];
}

// export interface DetailProductUpFile {
//     idProduct: any;
//     image: string;
//     weight: number;
//     dataMore: string;
//     upfile: any[];
// }

//----- ใช้สำหรับเก็บค่าข้อมูลและเอามาแสดงใน HTML -----
export interface DetailProductUpFileImages {
    idProduct: any;
    image: string;
    upfile: any[];
}
