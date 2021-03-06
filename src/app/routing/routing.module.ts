import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {IndexComponent} from '../index/index.component';
import {DatabaseComponent} from '../database/database.component';
import {QueryComponent} from '../query/query.component';
import {LogoutComponent} from '../logout/logout.component';

const routes: Routes = [
  {path: '', redirectTo: '/index', pathMatch: 'full'},
  {path: 'index', component: IndexComponent},
  {path: 'database', component: DatabaseComponent},
  {path: 'query', component: QueryComponent},
  {path: 'logout', component: LogoutComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class RoutingModule {
}
