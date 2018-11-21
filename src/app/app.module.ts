import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {IndexComponent} from './index/index.component';
import {RoutingModule} from './routing/routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatCommonModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatInputModule,
  MatListModule,
  MatOptionModule,
  MatPaginatorModule,
  MatRadioModule,
  MatSelectModule,
  MatTableModule,
  MatTabsModule
} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {ToastrModule} from 'ngx-toastr';
import {DatabaseComponent} from './database/database.component';
import {QueryComponent} from './query/query.component';
import {TableComponent} from './table/table.component';
import {LogoutComponent} from './logout/logout.component';
import {CreateTableComponent} from './create-table/create-table.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {ConfirmComponent} from './confirm/confirm.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    DatabaseComponent,
    QueryComponent,
    TableComponent,
    LogoutComponent,
    CreateTableComponent,
    ConfirmComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatCardModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatCommonModule,
    MatCheckboxModule,
    MatRadioModule,
    MatSelectModule,
    MatOptionModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatListModule,
    MatDividerModule,
    MatTabsModule,
    MatPaginatorModule,
    MatTableModule,
    MatDialogModule,
    MatExpansionModule,
    ToastrModule.forRoot({timeOut: 3000, positionClass: 'toast-top-center'}),
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
