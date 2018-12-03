import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {Query} from '../bean/Query';
import {DatabaseService} from '../service/database.service';
import {JsUtils} from '../bean/JsUtils';
import {MatPaginator, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.css']
})
export class QueryComponent implements OnInit {
  @Input() catalog = '';
  @Input() tableName = '';
  query: Query = new Query();
  // displayedColumns = ['created', 'state', 'number', 'title'];
  displayedColumns = [];
  // exampleDatabase: ExampleHttpDao | null;
  data: MatTableDataSource<any> = null;
  // data: MatTableDataSource<GithubIssue[]> = {};
  // data: GithubIssue[] = [];

  resultsLength = 0;
  isLoadingResults = false;
  // isRateLimitReached = false;
  geoJson = '';

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private toastr: ToastrService, private database: DatabaseService) {
  }

  ngOnInit() {
    // this.exampleDatabase = new ExampleHttpDao(this.http);
    // this.data.paginator = this.paginator;
    // If the user changes the sort order, reset back to the first page.
    // this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    // this.exampleDatabase.getRepoIssues('true', 'asc', this.paginator.pageIndex).subscribe(
    //   data => this.data = new MatTableDataSource<GithubIssue[]>(data));

    // merge(this.paginator.page)
    //   .pipe(
    //     startWith({}),
    //     switchMap(() => {
    //       if (JsUtils.isAnyBlank(this.catalog, this.tableName, this.query.ecql)) {
    //         const js = new JsonBean();
    //         js.code = 10;
    //         return of<JsonBean>(js);
    //       }
    //       this.isLoadingResults = true;
    //       // return this.exampleDatabase.getRepoIssues('true', 'asc', this.paginator.pageIndex);
    //       this.query.catalog = this.catalog;
    //       this.query.tableName = this.tableName;
    //       return this.database.post('table/query', this.query);
    //     }),
    //     map(data => {
    //       // Flip flag to show that loading has finished.
    //       this.isLoadingResults = false;
    //       if (data.code === 10) {
    //         return [];
    //       }
    //       // this.isRateLimitReached = false;
    //       this.resultsLength = data.data.length; // data.total_count;
    //
    //       // return data.items;
    //       return data.data;
    //     }),
    //     catchError(() => {
    //       this.isLoadingResults = false;
    //       // Catch if the GitHub API has reached its rate limit. Return empty data.
    //       // this.isRateLimitReached = true;
    //       return of([]);
    //     })
    //   ).subscribe(data => {
    //   this.data = new MatTableDataSource<any>(data);
    // }); // this.data = data
  }

  submit() {
    if (JsUtils.isBlank(this.catalog)) {
      this.toastr.success('请选择数据库');
      return;
    }
    if (JsUtils.isBlank(this.tableName)) {
      this.toastr.success('请选择要操作的表');
      return;
    }
    if (JsUtils.isBlank(this.query.ecql)) {
      this.toastr.success('ECQL语句不能为空');
      return;
    }
    this.isLoadingResults = true;
    this.query.catalog = this.catalog;
    this.query.tableName = this.tableName;
    this.database.post('table/query', this.query).subscribe(result => {
      // this.data = new MatTableDataSource<any>(result.data);
      this.isLoadingResults = false;
      const resultArray: any[] = [];
      this.geoJson = result.data;
      const jsonArray = JSON.parse(this.geoJson);
      for (const bean of jsonArray) {
        resultArray.push(bean.properties);
      }
      this.displayedColumns = result.columnList;
      if (resultArray.length > 0) {
        // const column = resultArray[0];
        // this.displayedColumns = JsUtils.getColumn(column);
        this.resultsLength = resultArray.length;
      }
      this.data = new MatTableDataSource<any>(resultArray);
    });
  }
}
