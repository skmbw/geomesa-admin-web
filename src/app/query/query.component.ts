import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {Query} from '../bean/Query';
import {DatabaseService} from '../service/database.service';
import {JsUtils} from '../bean/JsUtils';
import {HttpClient} from '@angular/common/http';
import {merge, Observable, of} from 'rxjs';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {catchError, map, startWith, switchMap} from 'rxjs/internal/operators';

@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.css']
})
export class QueryComponent implements OnInit {
  @Input() catalog = '';
  @Input() tableName = '';
  query: Query = new Query();
  displayedColumns = ['created', 'state', 'number', 'title'];
  exampleDatabase: ExampleHttpDao | null;
  data: MatTableDataSource<GithubIssue> = null;
  // data: MatTableDataSource<GithubIssue[]> = {};
  // data: GithubIssue[] = [];

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private toastr: ToastrService, private database: DatabaseService,
              private http: HttpClient) {
  }

  ngOnInit() {
    this.exampleDatabase = new ExampleHttpDao(this.http);
    // this.data.paginator = this.paginator;
    // If the user changes the sort order, reset back to the first page.
    // this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    // this.exampleDatabase.getRepoIssues('true', 'asc', this.paginator.pageIndex).subscribe(
    //   data => this.data = new MatTableDataSource<GithubIssue[]>(data));
    merge(this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.exampleDatabase.getRepoIssues('true', 'asc', this.paginator.pageIndex);
        }),
        map(data => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = data.total_count;

          return data.items;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          // Catch if the GitHub API has reached its rate limit. Return empty data.
          this.isRateLimitReached = true;
          return of([]);
        })
      ).subscribe(data => {
        this.data = new MatTableDataSource<GithubIssue>(data);
      }); // this.data = data
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
    this.query.catalog = this.catalog;
    this.query.tableName = this.tableName;
    // this.database.post('table/query', this.query).subscribe(result => {});
  }
}

export interface GithubApi {
  items: GithubIssue[];
  total_count: number;
}

export interface GithubIssue {
  created_at: string;
  number: string;
  state: string;
  title: string;
}

/** An example database that the data source uses to retrieve data for the table. */
export class ExampleHttpDao {
  constructor(private http: HttpClient) {}

  getRepoIssues(sort: string, order: string, page: number): Observable<GithubApi> {
    const href = 'https://api.github.com/search/issues';
    const requestUrl =
      `${href}?q=repo:angular/material2&sort=${sort}&order=${order}&page=${page + 1}`;

    return this.http.get<GithubApi>(requestUrl);
  }
}
