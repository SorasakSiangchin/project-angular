import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateProductComponent } from './components/admin/product/create-product/create-product.component';
import { CreateTypeproductComponent } from './components/admin/typeproduct/create-typeproduct/create-typeproduct.component';
import { CreateUserComponent } from './components/admin/user/create-user/create-user.component';
import { DataDetailproductComponent } from './components/admin/detailproduct/data-detailproduct/data-detailproduct.component';
import { DataProductComponent } from './components/admin/product/data-product/data-product.component';
import { DataTypeproductComponent } from './components/admin/typeproduct/data-typeproduct/data-typeproduct.component';
import { DataUserComponent } from './components/admin/user/data-user/data-user.component';
import { EditProductComponent } from './components/admin/product/edit-product/edit-product.component';
import { EditTypeproductComponent } from './components/admin/typeproduct/edit-typeproduct/edit-typeproduct.component';
import { EditUserComponent } from './components/admin/user/edit-user/edit-user.component';
import { IndexadminComponent } from './components/admin/indexadmin/indexadmin.component';
import { LoginadminComponent } from './components/admin/loginadmin/loginadmin.component';
import { MenuadminComponent } from './components/admin/menuadmin/menuadmin.component';
import { ReportComponent } from './components/admin/report/report.component';
import { AboutComponent } from './components/Users/webs/about/about.component';
import { DetailproductComponent } from './components/Users/products/detailproduct/detailproduct.component';
import { IndexComponent } from './components/Users/webs/index/index.component';
import { ProductComponent } from './components/Users/products/product/product.component';
import { DataProductDetailComponent } from './components/admin/product/data-product-detail/data-product-detail.component';
import { EditProductDetailComponent } from './components/admin/product/edit-product-detail/edit-product-detail.component';
import { CreateDetailComponent } from './components/admin/product/create-detail/create-detail.component';
import { CreateDetailproductComponent } from './components/admin/detailproduct/create-detailproduct/create-detailproduct.component';
import { CartComponent } from './components/Users/carts/cart/cart.component';
import { EditDetailproductComponent } from './components/admin/detailproduct/edit-detailproduct/edit-detailproduct.component';
import { DetailCartComponent } from './components/Users/carts/detail-cart/detail-cart.component';
import { ImagedetailproductCartComponent } from './components/Users/carts/imagedetailproduct-cart/imagedetailproduct-cart.component';
import { UserdetailComponent } from './components/Users/users/userdetail/userdetail.component';
import { ListProductComponent } from './components/Users/carts/list-product/list-product.component';
import { OrderProductComponent } from './components/Users/carts/order-product/order-product.component';
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
import { EditCommentComponent } from './components/admin/comment/edit-comment/edit-comment.component';
import { DataCommentsComponent } from './components/admin/comment/data-comments/data-comments.component';
import { DataUserCommentComponent } from './components/admin/comment/data-user-comment/data-user-comment.component';
import { AdminRespondCommenttComponent } from './components/admin/comment/admin-respond-comment/admin-respond-commentt.component';
import { DetailOrderComponent } from './components/admin/Order/detail-order/detail-order.component';
import { DetailOrderListComponent } from './components/admin/Order/detail-order-list/detail-order-list.component';
import { OrderPdfComponent } from './components/admin/Order/order-pdf/order-pdf.component';





const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'index' },

  //---------------------------------admin-Report------------------------------------------------
  { path: 'report', component: ReportComponent },
  //---------------------------------------------------------------------------------------------

  //---------------------------------admin-User--------------------------------------------------
  { path: 'edituser/:id', component: EditUserComponent },
  { path: 'createuser', component: CreateUserComponent },
  { path: 'datauser', component: DataUserComponent },
  //---------------------------------------------------------------------------------------------

  //---------------------------------admin-Product-----------------------------------------------
  { path: 'dataproduct-detail', component: DataProductDetailComponent },
  { path: 'editproduct/:id', component: EditProductComponent },
  { path: 'dataproduct', component: DataProductComponent },
  { path: 'createdetail', component: CreateDetailComponent },
  { path: 'createproduct', component: CreateProductComponent },
  { path: 'editproduct-detail', component: EditProductDetailComponent },
  { path: 'data-order-product', component: DataOrderProductComponent },
  { path: 'create-order-product', component: CreateOrderProductComponent },
  //---------------------------------------------------------------------------------------------

  //---------------------------------admin-DetailProduct-----------------------------------------
  { path: 'editdetailproduct', component: EditDetailproductComponent },
  { path: 'createdetailproduct', component: CreateDetailproductComponent },
  { path: 'datadetailproduct', component: DataDetailproductComponent },
  //---------------------------------------------------------------------------------------------

  //---------------------------------admin-TypeProduct-------------------------------------------
  { path: 'edittypeproduct/:id', component: EditTypeproductComponent },
  { path: 'createtypeproduct', component: CreateTypeproductComponent },
  { path: 'datatypeproduct', component: DataTypeproductComponent },
  //---------------------------------------------------------------------------------------------

  //----------------------------------admin-Comment----------------------------------------------
  { path: 'data-comments', component: DataCommentsComponent },
  { path: 'edit-comment', component: EditCommentComponent },
  { path: 'data-user-comment', component: DataUserCommentComponent },
  { path: 'admin-respond-comment', component: AdminRespondCommenttComponent },
  //---------------------------------------------------------------------------------------------

  //---------------------------------admin-Order-------------------------------------------------
  { path: 'data-order-of-user', component: DataOrderOfUserComponent },
  { path: 'deliveryr-order', component: DeliveryrOrderComponent },
  { path: 'detail-order', component: DetailOrderComponent },
  { path: 'detail-order-list', component: DetailOrderListComponent },
  { path: 'order-pdf/:id', component: OrderPdfComponent },
  //---------------------------------------------------------------------------------------------

  //--------------------------------Users-carts---------------------------------------------------
  { path: 'cart', component: CartComponent },
  { path: 'order-detail/:id', component: OrderDetailComponent },
  { path: 'imagedetailproductcart/:id', component: ImagedetailproductCartComponent },
  { path: 'detailcart/:id', component: DetailCartComponent },
  { path: 'list-product', component: ListProductComponent },
  { path: 'order-product', component: OrderProductComponent },
  { path: 'order-pay/:id', component: OrderPayComponent },
  { path: 'order-list-product/:id', component: OrderListProductComponent },
  { path: 'order-delivery/:id', component: OrderDeliveryComponent },
  //----------------------------------------------------------------------------------------------

  //----------------------------------Users-products----------------------------------------------
  { path: 'product', component: ProductComponent },
  { path: 'detailproduct-wed/:id/:name/:price/:image/:stock/:color/:shape', component: DetailproductComponent },
  //----------------------------------------------------------------------------------------------

  //-------------------------------------Users-webs------------------------------------------------
  { path: 'index', component: IndexComponent },
  { path: 'about', component: AboutComponent },
  //-----------------------------------------------------------------------------------------------

  //--------------------------------------Users-users----------------------------------------------
  { path: 'userdetail', component: UserdetailComponent },
  //-----------------------------------------------------------------------------------------------

  //-------------------------------------Users-comment---------------------------------------------
  { path: 'comment', component: CommentComponent },
  { path: 'data-comment', component: DataCommentComponent },
  //-----------------------------------------------------------------------------------------------
  { path: 'loginadmin', component: LoginadminComponent },
  { path: 'indexadmin', component: IndexadminComponent },
  {
    path: 'menuadmin', component: MenuadminComponent, children: [
      { path: 'indexadmin', component: IndexadminComponent },
      { path: 'datauser', component: DataUserComponent },
      { path: 'dataproduct', component: DataProductComponent },
      { path: 'createproduct', component: CreateProductComponent },
      { path: 'createuser', component: CreateUserComponent },
      { path: 'edituser/:id', component: EditUserComponent },
      { path: 'editproduct/:id', component: EditProductComponent },
      { path: 'dataproduct-detail/:id', component: DataProductDetailComponent },
      { path: 'report', component: ReportComponent },
      { path: 'datatypeproduct', component: DataTypeproductComponent },
      { path: 'datadetailproduct', component: DataDetailproductComponent },
      { path: 'createtypeproduct', component: CreateTypeproductComponent },
      { path: 'edittypeproduct/:id', component: EditTypeproductComponent },
      { path: 'editproduct-detail/:id', component: EditProductDetailComponent },
      { path: 'createdetail/:id', component: CreateDetailComponent },
      { path: 'createdetailproduct', component: CreateDetailproductComponent },
      { path: 'editdetailproduct/:id', component: EditDetailproductComponent },
      { path: 'data-order-of-user', component: DataOrderOfUserComponent },
      { path: 'deliveryr-order/:id', component: DeliveryrOrderComponent },
      { path: 'data-order-product', component: DataOrderProductComponent },
      { path: 'create-order-product', component: CreateOrderProductComponent },
      { path: 'data-comments', component: DataCommentsComponent },
      { path: 'edit-comment', component: EditCommentComponent },
      { path: 'data-user-comment/:id', component: DataUserCommentComponent },
      { path: 'admin-respond-comment/:id', component: AdminRespondCommenttComponent },
      { path: 'detail-order/:id', component: DetailOrderComponent },
      { path: 'detail-order-list/:id', component: DetailOrderListComponent },
      { path: 'order-pdf/:id', component: OrderPdfComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
