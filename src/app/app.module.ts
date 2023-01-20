import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
//-------------------มันเป็นของมัน HttpClient เอาไว้ติดต่อกับ blackend----------------------------
import { HttpClientModule } from '@angular/common/http'
//---------------------------------ถ้ามี Module คือตัวใหญ่ของมัน--------------------------------
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './components/Users/webs/index/index.component';
import { FooterComponent } from './components/Users/webs/footer/footer.component';
import { HeaderComponent } from './components/Users/webs/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { AboutComponent } from './components/Users/webs/about/about.component';
import { Cs63Service } from './service/cs63.service';
import { IndexadminComponent } from './components/admin/indexadmin/indexadmin.component';
import { DataUserComponent } from './components/admin/user/data-user/data-user.component';
import { EditUserComponent } from './components/admin/user/edit-user/edit-user.component';
import { MenuadminComponent } from './components/admin/menuadmin/menuadmin.component';
import { LoginadminComponent } from './components/admin/loginadmin/loginadmin.component';
import { DataProductComponent } from './components/admin/product/data-product/data-product.component';
import { EditProductComponent } from './components/admin/product/edit-product/edit-product.component';
import { CreateProductComponent } from './components/admin/product/create-product/create-product.component';
import { ReportComponent } from './components/admin/report/report.component';
import { CreateUserComponent } from './components/admin/user/create-user/create-user.component';
import { DataTypeproductComponent } from './components/admin/typeproduct/data-typeproduct/data-typeproduct.component';
import { DataDetailproductComponent } from './components/admin/detailproduct/data-detailproduct/data-detailproduct.component';
import { CreateTypeproductComponent } from './components/admin/typeproduct/create-typeproduct/create-typeproduct.component';
import { EditTypeproductComponent } from './components/admin/typeproduct/edit-typeproduct/edit-typeproduct.component';
import { CreateDetailproductComponent } from './components/admin/detailproduct/create-detailproduct/create-detailproduct.component';
import { ProductComponent } from './components/Users/products/product/product.component';
import { DetailproductComponent } from './components/Users/products/detailproduct/detailproduct.component';
import { DataProductDetailComponent } from './components/admin/product/data-product-detail/data-product-detail.component';
import { EditProductDetailComponent } from './components/admin/product/edit-product-detail/edit-product-detail.component';
import { CreateDetailComponent } from './components/admin/product/create-detail/create-detail.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { CartComponent } from './components/Users/carts/cart/cart.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { EditDetailproductComponent } from './components/admin/detailproduct/edit-detailproduct/edit-detailproduct.component';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSliderModule } from '@angular/material/slider';
import { DetailCartComponent } from './components/Users/carts/detail-cart/detail-cart.component';
import { ImagedetailproductCartComponent } from './components/Users/carts/imagedetailproduct-cart/imagedetailproduct-cart.component';
import { UserdetailComponent } from './components/Users/users/userdetail/userdetail.component';
import { ListProductComponent } from './components/Users/carts/list-product/list-product.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { OrderProductComponent } from './components/Users/carts/order-product/order-product.component';
import { MatDividerModule } from '@angular/material/divider';
import { OrderPayComponent } from './components/Users/carts/order-pay/order-pay.component';
import { OrderListProductComponent } from './components/Users/carts/order-list-product/order-list-product.component';
import { DataOrderOfUserComponent } from './components/admin/Order/data-order-of-user/data-order-of-user.component';
import { DeliveryrOrderComponent } from './components/admin/Order/deliveryr-order/deliveryr-order.component';
import { OrderDeliveryComponent } from './components/Users/carts/order-delivery/order-delivery.component';
import { OrderDetailComponent } from './components/Users/carts/order-detail/order-detail.component';
import { DataOrderProductComponent } from './components/admin/product/data-order-product/data-order-product.component';
import { CreateOrderProductComponent } from './components/admin/product/create-order-product/create-order-product.component';
import { CommentComponent } from './components/Users/comments/comment/comment.component';
import { DataCommentComponent } from './components/Users/comments/data-comment/data-comment.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { EditCommentComponent } from './components/admin/comment/edit-comment/edit-comment.component';
import { DataCommentsComponent } from './components/admin/comment/data-comments/data-comments.component';
import { DataUserCommentComponent } from './components/admin/comment/data-user-comment/data-user-comment.component';
import { AdminRespondCommenttComponent } from './components/admin/comment/admin-respond-comment/admin-respond-commentt.component';
import { DetailOrderComponent } from './components/admin/Order/detail-order/detail-order.component';
import { DetailOrderListComponent } from './components/admin/Order/detail-order-list/detail-order-list.component';
import { OrderPdfComponent } from './components/admin/Order/order-pdf/order-pdf.component';
//---------------- เอาไว้สำหรับ Report Print -----------------
import { NgxPrintModule } from 'ngx-print';



@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    FooterComponent,
    HeaderComponent,
    AboutComponent,
    IndexadminComponent,
    DataUserComponent,
    EditUserComponent,
    MenuadminComponent,
    LoginadminComponent,
    DataProductComponent,
    EditProductComponent,
    CreateProductComponent,
    ReportComponent,
    CreateUserComponent,
    DataTypeproductComponent,
    DataDetailproductComponent,
    CreateTypeproductComponent,
    EditTypeproductComponent,
    CreateDetailproductComponent,
    ProductComponent,
    DetailproductComponent,
    DataProductDetailComponent,
    EditProductDetailComponent,
    CreateDetailComponent,
    CartComponent,
    EditDetailproductComponent,
    DetailCartComponent,
    ImagedetailproductCartComponent,
    UserdetailComponent,
    ListProductComponent,
    OrderProductComponent,
    OrderPayComponent,
    OrderListProductComponent,
    DataOrderOfUserComponent,
    DeliveryrOrderComponent,
    OrderDeliveryComponent,
    OrderDetailComponent,
    DataOrderProductComponent,
    CreateOrderProductComponent,
    CommentComponent,
    DataCommentComponent,
    EditCommentComponent,
    DataCommentsComponent,
    DataUserCommentComponent,
    AdminRespondCommenttComponent,
    DetailOrderComponent,
    DetailOrderListComponent,
    OrderPdfComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatIconModule,
    MatChipsModule,
    MatButtonModule,
    MatInputModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatCardModule,
    MatSelectModule,
    MatButtonToggleModule,
    MatProgressBarModule,
    MatBadgeModule,
    MatSliderModule,
    MatTooltipModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    NgxPrintModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(public cs63: Cs63Service) {
    this.cs63.chkLoggedIn()
  }
}
