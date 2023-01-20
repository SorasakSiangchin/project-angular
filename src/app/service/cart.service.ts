import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DataProduct } from '../Models/productLocal';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { OrderUpfile } from '../Models/Orders&Lists';
import { DeliverysModel, StatusDeliverysModel } from '../Models/Deliverry';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
//import { environment } from 'src/environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class CartService {
  storedColors: DataProduct[] = []
  items: DataProduct[] = [];
  NumberLacal: number = 0
  data01: any

  public hostUrl = environment.backendUrl
  public OrderUrl = `${this.hostUrl}ApiOrders`;
  public DeliverryUrl = `${this.hostUrl}ApiDeliverys`;
  public StatusDeliverryUrl = `${this.hostUrl}ApiStatusDeliverys`;
  public OrderUrlX2 = `${this.hostUrl}ApiOrdersX2`;
  constructor(private rout: Router, private http: HttpClient) {
  }

  addToCart(product: DataProduct) {
    this.items.push(product);
    //console.log(this.items)
    localStorage.setItem("CarT", JSON.stringify(this.items))
    this.numberLocal()
  }

  numberLocal() {
    var storedColors = JSON.parse(localStorage.getItem("CarT")!);
    if (storedColors != null) {
      this.NumberLacal = storedColors.length;
    }
  }

  // ส่งข้อมูลที่เก็บไว้ในตัวแปร
  getItems() {
    return this.items;
  }
  // ส่งข้อมูลที่เก็บไว้ใน local
  getItemslocal() {
    var storedColors = JSON.parse(localStorage.getItem("CarT")!);
    this.NumberLacal = storedColors.length;
    return storedColors;
  }

  deleteItemslocal() {
    localStorage.removeItem("CarT")
    this.getItemslocal()
  }


  //----------------*****ปุ่มยืนยันสินค้า*****-----------------------------
  makeFormList() {
    // ใน local มันเป็น list อยู่แล้ว
    // ทำการอ่านค้าและใส่ในตัวแปร
    this.storedColors = JSON.parse(localStorage.getItem("CarT")!);

    //object สำหรับ form
    let formData: FormData = new FormData();
    for (let i = 0; i < this.storedColors.length; i++) {
      formData.append("idProduck", this.storedColors[i].idProduck);
      formData.append("priceProduct", this.storedColors[i].priceProduct);
      formData.append("numberProduct", this.storedColors[i].numberProduct);
      formData.append("idUser", this.storedColors[i].userId);
    }
    Swal.fire({
      title: '<div class="armfont01">' + 'ยืนยันการสั่งซื้อหรือไม่?' + '</div>',
      showDenyButton: true,
      confirmButtonText: '<div class="armfont01">' + 'ตกลง' + '</div>',
      denyButtonText: '<div class="armfont01">' + 'ยกเลิก' + '</din>',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire('Saved!', '', 'success').then(() => {
          this.http.post<any>(this.OrderUrl, formData).subscribe(() => {
            localStorage.removeItem("CarT")
            this.NumberLacal = 0
            this.rout.navigate(['order-product'])
          })
        })
      } else if (result.isDenied) {
        Swal.fire('<div class="armfont01">' + 'ยกเลิกหรือไม่' + '</din>', '', 'info')
      }
    })
  }
  //------------------------------------------------------------------

  //----------------------UpFileOrder---------------------------------
  makeFormUpFileOrder(value: OrderUpfile) {
    let formData: FormData = new FormData();
    formData.append("id", value.id);
    formData.append("idUser", value.idUser.toString());
    formData.append("statusMoney", value.statusMoney.toString());
    formData.append("date", value.date);
    if (value.proofTransfer == null) value.proofTransfer = ""
    formData.append("prooftransfer", value.proofTransfer);
    formData.append("upfile", value.upfile);
    formData.append("priceTotal", value.priceTotal.toString());
    this.http.put(this.OrderUrlX2, formData).subscribe(() => {
      Swal.fire('ยืนยันการชำระเงินสำเร็จ').then(() => {
        this.rout.navigate(['order-product'])
      }
      )
    });
  }
  //------------------------------------------------------------------

  //-----------------------getByIdOrder-------------------------------
  getByIdOrder(id: string): Observable<any> {
    return this.http.get<any>(`${this.OrderUrlX2}/${id}`)
  }

  //------------------------------------------------------------------

  //----------------------------Deliverry-Order-----------------------
  AddDeliverryOrder(data: DeliverysModel): Observable<any> {
    return this.http.post<any>(this.DeliverryUrl, this.makeFormDataDeliverry(data))
  }
  PutDeliverryOrder(data: DeliverysModel){
    return this.http.put<any>(this.DeliverryUrl, this.makeFormDataDeliverry(data))
  }
  makeFormDataDeliverry(value: DeliverysModel) {
    const formData = new FormData()
    formData.append("id", `${value.id}`);
    formData.append("idOrder", `${value.idOrder}`);
    formData.append("date", `${value.date}`);
    formData.append("idStatus", `${value.idStatus}`);
    return formData;
  }

  getStatusDeliverryData(): Observable<StatusDeliverysModel[]> {
    return this.http.get<StatusDeliverysModel[]>(this.StatusDeliverryUrl);
  }
  //------------------------------------------------------------------
}
