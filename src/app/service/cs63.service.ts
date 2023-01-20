import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TypeProduct, TypeProduct01 } from '../Models/TypeProducts';
import { User } from '../Models/๊Users';
import { Product, Product01 } from '../Models/Products';
import { DetailProduct01, DetailProductUpFileImages } from '../Models/DetailProduct';
import { OrderProduct } from '../Models/OrderProduct';
import { Lists, Orders } from '../Models/Orders&Lists';
//import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class Cs63Service {
  //---------------number it--------------------------
  public hostUrl = environment.backendUrl;
  //--------------------------------------------------

  //-------admin---------------------------------------
  private authenApiAdmin = `${this.hostUrl}ApiAdmin`;
  //----------------------------------------------------

  //----------------User--------------------------------
  public authenApiUrl = `${this.hostUrl}ApiUsers`;
  private loginUrl = `${this.authenApiUrl}/login`;
  private registerUrl = `${this.authenApiUrl}/register`;
  //----------------------------------------------------

  //------------------Product--------------------------
  public productUrl = `${this.hostUrl}ApiProducts`;
  private getProductUrl = `${this.productUrl}/Product`;
  //private AddProduct = `${this.productUrl}/AddProduct`;
  //---------------------------------------------------
  
  //----------TypeProduct------------------------------
  public TypeProductUrl = `${this.hostUrl}ApiTypeProducts`;
  private getTypeProductUrl = `${this.TypeProductUrl}/TypeProduct`;
  //----------------------------------------------------

  //-------------------- DetailProduct & DetailProductX2 -------------------
  private detailproductUrl = `${this.hostUrl}ApiDtailProducts`;
  private detailproductX2Url = `${this.hostUrl}ApiDtailProductsX2`;
  //-------------------------------------------------------------------------
  

  //--------------------Delivery--------------------------
  public DeliveryX2Url = `${this.hostUrl}ApiDeliverysX2`;
  public DeliveryUrl = `${this.hostUrl}ApiDeliverys`;
  //--------------------------------------------------------

  //--------------------Orders&Lists--------------------------
  public OrderUrl = `${this.hostUrl}ApiOrders`;
  public OrderX2Url = `${this.hostUrl}ApiOrdersX2`;
  public ListUrl = `${this.hostUrl}ApiLists`;
  //----------------------------------------------------------

  //--------------------Comment--------------------------
  public commentUrl = `${this.hostUrl}ApiComments`;
  public commentX2Url = `${this.hostUrl}ApiCommentsX2`;
  //----------------------------------------------------------

  //----------------------OrderProduct&X2----------------------------
  public OrderProductUrl = `${this.hostUrl}ApiOrderProducts`;
  public OrderProductX2Url = `${this.hostUrl}ApiOrderProductsX2`;
  //--------------------------------------------------------------
  public OK = 'OK'

  constructor(private http: HttpClient, private router: Router) { }

  isLoggedIn() {
    //อ่านค่าใน local
    let loginResult = localStorage.getItem(environment.loginResult);
    //เช็คว่า เป็นจริงป่าว | 
    return (loginResult != null && loginResult == this.OK)
  }

  isLoggedInAdmin() {
    //อ่านค่าใน local
    let loginResult = localStorage.getItem(environment.loginResultAdmin);
    //เช็คว่า เป็นจริงป่าว | 
    return (loginResult != null && loginResult == this.OK)
  }

  chkLoggedIn() {
    //อ่านค่าใน local มีหรือป่าว
    let loginResult = localStorage.getItem(environment.loginResult);
    if (loginResult == null && loginResult !== this.OK) {
      this.router.navigate(['index'])
    }
  }
  //--------------------------------------------------



  //-------------------------------------------------------Users---------------------------------------------------------------
  login(value: any) {
    let formData = new FormData()
    formData.append('Email', value.Email)
    formData.append('Password', value.Password)
    // post มันคือโฟส
    // return ต้องมี
    return this.http.post<any>(this.loginUrl, formData)
  }
  addUser(user: User): Observable<any> {
    // this.makeFormData เราทำการยัดใส่ใน form เพราะส่งproductไปตรงๆไม่ได้
    return this.http.post<any>(this.registerUrl, this.makeFormData(user))
  }
  makeFormData(user: User): FormData {
    const formData = new FormData()
    formData.append("id", `${user.id}`);
    formData.append("name", user.name);
    formData.append('email', `${user.email}`)
    formData.append('password', `${user.password}`)
    formData.append('address', `${user.address}`)
    formData.append('tel', `${user.tel}`)
    // ถ้าไม่มีรูปให้  product.image = "" เพือตอนแก้ไขด้วยเดียวของเก่าหาย
    if (user.image == null) user.image = ""
    formData.append('image', user.image)
    formData.append('upfile', user.upfile)
    return formData
  }
  getUser(): Observable<User[]> {
    return this.http.get<User[]>(this.authenApiUrl)
  }
  getUserImageUrl(image: any): string {
    if (image) return `${environment.backendUrl}${image}`
    return 'assets/noimg.jpg'
  }
  deleteUser(id: any) {
    const url = `${this.authenApiUrl}/${id}`;
    // void ไม่มีการคืนค่าใดๆ
    return this.http.delete<void>(url);
  }
  getUserById(id: number) {
    const url = `${this.authenApiUrl}/${id}`;
    return this.http.get<any>(url);
  }
  getUserDataById(id: number) {
    const url = `${this.authenApiUrl}/${id}`;
    return this.http.get<User>(url);
  }
  updateUser(user: User): Observable<any> {
    return this.http.put<any>(this.authenApiUrl, this.makeFormData(user))
  }
  //----------------------------------------------------------------------------endUser---------------------------------


  //------------------------------------------------Admin---------------------------------------------------------------------------------
  loginAdmin(value: any) {
    let formData = new FormData()
    formData.append('Email', value.Email)
    formData.append('Password', value.Password)
    // post มันคือโฟส
    // return ต้องมี
    return this.http.post<any>(this.authenApiAdmin, formData)
  }
  //------------------------------------------------------------------------endAdmin----------------------------



  //-------------------------------------------------Product---------------------------------------------------------------------------------------
  addproduct(produt: Product): Observable<any> {
    // this.makeFormData เราทำการยัดใส่ใน form เพราะส่งproductไปตรงๆไม่ได้
    return this.http.post<any>(this.productUrl, this.makeFormDataProduct01(produt))
  }
  makeFormDataProduct01(product: Product): FormData {
    const formData = new FormData()
    formData.append("id", `${product.id}`);
    formData.append("idTypeProduct", product.idTypeProduct);
    formData.append('name', `${product.name}`)
    formData.append('price', `${product.price}`)
    formData.append('stock', `${product.stock}`)
    formData.append('color', `${product.color}`)
    formData.append('shape', `${product.shape}`)
    // ถ้าไม่มีรูปให้  product.image = "" เพือตอนแก้ไขด้วยเดียวของเก่าหาย
    if (product.image == null) product.image = ""
    formData.append('image', product.image)
    formData.append('upfile', product.upfile)
    return formData
    //------------------------------------------------------------
  }
  getProduct(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productUrl)
  }

  getProductInclude(): Observable<Product01[]> {
    return this.http.get<Product01[]>(this.getProductUrl)
  }
  
  getOrder(): Observable<Orders[]> {
    return this.http.get<Orders[]>(`${this.OrderUrl}/1`)
  }

  getProductImageUrl(image: any): string {
    if (image) return `${environment.backendUrl}${image}`
    return 'assets/noimg.jpg'
  }

  deleteProduct(id: any) {
    const url = `${this.productUrl}/${id}`;
    // void ไม่มีการคืนค่าใดๆ
    return this.http.delete<void>(url);
  }

  getProductById(id: number) {
    const url = `${this.productUrl}/${id}`;
    return this.http.get<any>(url);
  }

  updateProduct(product: Product01): Observable<any> {
    return this.http.put<any>(this.productUrl, this.makeFormDataProduct(product))
  }
  makeFormDataProduct(product: Product01): FormData {
    const formData = new FormData()
    formData.append("id", `${product.id}`);
    formData.append("idTypeProduct", `${product.idTypeProduct}`);
    formData.append('name', `${product.name}`)
    formData.append('price', `${product.price}`)
    formData.append('stock', `${product.stock}`)
    formData.append('color', `${product.color}`)
    formData.append('shape', `${product.shape}`)
    // ถ้าไม่มีรูปให้  product.image = "" เพือตอนแก้ไขด้วยเดียวของเก่าหาย
    if (product.image == null) product.image = ""
    formData.append('image', product.image)
    formData.append('upfile', product.upfile)
    return formData

  }
  //----------------------------------------------------------------------endProduct--------------------------------------------------


  //-----------------------------------------------------TypeProduct-------------------------------------------------------------------------------------
  getTypeProduct(): Observable<TypeProduct[]> {
    return this.http.get<TypeProduct[]>(this.TypeProductUrl)
  }

  deleteTypeProduct(id: any) {
    // void ไม่มีการคืนค่าใดๆ
    return this.http.delete<void>(`${this.TypeProductUrl}/${id}`);
  }

  addtypeproduct(typeproduct: TypeProduct01): Observable<any> {
    const formData = new FormData()
    formData.append('Name', typeproduct.name)
    // this.makeFormData เราทำการยัดใส่ใน form เพราะส่งproductไปตรงๆไม่ได้
    return this.http.post<any>(this.TypeProductUrl, formData)
  }

  getTypeProductById(id: number) {
    const url = `${this.TypeProductUrl}/${id}`;
    return this.http.get<any>(url);
  }

  updateTypeProduct(typeproduct: TypeProduct): Observable<any> {
    const formData = new FormData()
    formData.append('Id', `${typeproduct.id}`)
    formData.append('Name', `${typeproduct.name}`)
    return this.http.put<any>(this.TypeProductUrl, formData)
  }

  getTypeProductInclude(): Observable<DetailProduct01[]> {
    return this.http.get<DetailProduct01[]>(this.getTypeProductUrl)
  }
  //-------------------------------------------------------------------------------------------------------------------------------------------------------


  //-------------------------------------------------------DetailProduct & DetailProductX2------------------------------------------------------------------------------------------
  getDetailProduct(): Observable<DetailProduct01[]> {
    return this.http.get<DetailProduct01[]>(this.detailproductUrl)
  }

  getDetailProductByid(id: number): Observable<DetailProduct01[]> {
    return this.http.get<DetailProduct01[]>(`${this.detailproductUrl}/${id}`)
  }

  getDetailProductByid01(id: number): Observable<DetailProduct01> {
    return this.http.get<DetailProduct01>(`${this.detailproductUrl}/${id}`)
  }
  getDetailProductImageUrl(image: any): string {
    if (image) return `${environment.backendUrl}${image}`
    return "assets/img/no-image.jpg";
  }

  getDetailProductX2Byid(id: string): Observable<DetailProduct01[]> {
    return this.http.get<DetailProduct01[]>(`${this.detailproductX2Url}/${id}`)
  }

  updateDetailProduct(detail: DetailProduct01): Observable<any> {
    return this.http.put<any>(this.detailproductUrl, this.makeFormDataDetailProduct(detail))
  }
  makeFormDataDetailProduct(value: DetailProduct01) {
    const formData = new FormData()
    formData.append("id", `${value.id}`);
    formData.append("idProduct", `${value.idProduct}`);
    formData.append("weight", `${value.weight}`);
    formData.append("dataMore", `${value.dataMore}`);
    // ถ้าไม่มีรูปให้  product.image = "" เพือตอนแก้ไขด้วยเดียวของเก่าหาย
    if (value.image == null) value.image = ""
    formData.append('image', value.image)
    formData.append('upfile', value.upfile)
    return formData;
  }

  deleteDetailProductId(value: string) {
    // void ไม่ต้องการค่ากลับ
    return this.http.delete<void>(`${this.detailproductUrl}/${value}`);
  }
  deleteDetailProductAll(value: string) {
    // void ไม่ต้องการค่ากลับ
    return this.http.delete<void>(`${this.detailproductX2Url}/${value}`);
  }

  adddetailproduct(value: DetailProductUpFileImages): Observable<any> {
    return this.http.post<any>(this.detailproductUrl, this.makeFormDataDetailProduct01(value))
  }

  makeFormDataDetailProduct01(value: DetailProductUpFileImages) {
    const formData = new FormData()
    formData.append("idProduct", `${value.idProduct}`);
    // ถ้าไม่มีรูปให้  product.image = "" เพือตอนแก้ไขด้วยเดียวของเก่าหาย
    if (value.image == null) value.image = ""
    formData.append('image', value.image)
    for (let i = 0; i < value.upfile.length; i++) {
      formData.append('upfile', value.upfile[i])
    }
    return formData;
  }

  //--------------------------------------------------------------------------------------------------------------------------------------------------------------

  //---------------------------------------------Orders & Lists---------------------------------------------------------------------------------------------------
  getListAll(): Observable<Lists[]> {
    return this.http.get<Lists[]>(this.ListUrl);
  }

  getListbyId(id: string): Observable<Lists> {
    return this.http.get<Lists>(`${this.ListUrl}/${id}`);
  }
  //--------------------------------------------------------------------------------------------------------------------------------------------------------------

  //-------------------------------------------OrderProduct-------------------------------------------------------------------------------------------------------
  addOrderProduct(data: OrderProduct): Observable<any> {
    return this.http.post<any>(this.OrderProductUrl, this.makeFormOrderProduct(data));
  }
  makeFormOrderProduct(value: OrderProduct) {
    const formData = new FormData()
    formData.append("id", `${value.id}`);
    formData.append("idStatus", `${value.idStatus}`);
    formData.append("idProduct", `${value.idProduct}`);
    formData.append("date", `${value.date}`);
    formData.append("stock", `${value.stock}`);
    return formData;
  }
  //--------------------------------------------------------------------------------------------------------------------------------------------------------------
}
