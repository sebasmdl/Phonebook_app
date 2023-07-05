import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListContactsComponent } from './pages/list-contacts/list-contacts.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { PhoneBookRoutingModule } from './phonebook-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './interceptor/interceptor.service';
const components = [ListContactsComponent, LayoutPageComponent]

@NgModule({
  declarations: [components],
  imports: [
    CommonModule,
    PhoneBookRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    } ],
  exports: [components]
})
export class PhonebookModule { }
