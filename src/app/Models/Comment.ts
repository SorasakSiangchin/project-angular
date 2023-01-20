//-------------- เก็บข้อมูลจาก Backend ------------
export interface CommentModel {
    id: string;
    idUser: number;
    date: string;
    dataComment: string;
    adminComment: string;
    image: string;
    idUserNavigation: IDUserNavigation;
}

export interface IDUserNavigation {
    id: number;
    name: string;
    email: string;
    password: string;
    address: string;
    tel: string;
    image: string;
    comment: any[];
    order: any[];
}
//----------------------------------------------

//-------------
export interface CommentUpfile {
    id: string;
    idUser: number;
    date: string;
    dataComment: string;
    adminComment: string;
    image: string;
    Upfile: any;
}

export interface CommentAdmin {
    id: string;
    idUser: number;
    date: string;
    dataComment: string;
    adminComment: string;
    image: string;
}