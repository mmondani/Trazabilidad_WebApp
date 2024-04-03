import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TitlebarService } from '../../titlebar/titlebar.service';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '../../../models/user.model';
import { Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AuthService } from '../../../login/auth.service';
import { UsersService } from './users.service';
import { LoadingService } from '../../../shared/loading/loading.service';
import { AlertDialogService } from '../../../shared/alert-dialog/alert-dialog.service';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit, OnDestroy, AfterViewInit   {
  displayedColumns: string[] = ['email', 'level', 'createdAt', 'actions'];
  dataSource: MatTableDataSource<User>;
  userServiceSub: Subscription;
  userList: User[];
  loginUserLevel: string = "admin";
  loginUserEmail: string = "";

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private auth: AuthService,
    private titlebarService: TitlebarService,
    private userService: UsersService,
    private loadingService: LoadingService,
    private alertDialogService: AlertDialogService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.titlebarService.title = "Listado de usuarios";
    this.titlebarService.back = false;

    // Se busca el nivel de privilegio del usuario logueado
    this.auth.user.pipe(
      take(1)
    ).subscribe(loginUser => {
      this.loginUserLevel = loginUser.level;
      this.loginUserEmail = loginUser.email;
    });

    this.userServiceSub = this.userService.userList.subscribe(userList => {
      this.userList = userList;

      this.dataSource = new MatTableDataSource(userList);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

      this.loadingService.hideLoading();
    });

    // Se pide el listado de usuarios
    this.loadingService.showLoading();
    this.userService.getUsers().subscribe(() => {});
  }

  ngOnDestroy(): void {
    this.userServiceSub.unsubscribe();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editClick (user: User) {
    this.router.navigate(['detail'],
      {
        relativeTo: this.route, 
        queryParams: {
          user: JSON.stringify(user)
        }
      });
  }

  deleteClick (user: User) {
    this.alertDialogService.showDialog({
      message: `¿Estás seguro que querés eliminar el usuario ${user.email}?`,
      data: user,
      yesText: "Eliminar",
      yesStyle: "filled",
      yesColor: "warn",
      noEnable: true,
      noText: "Cancelar",
      noStyle: "basic",
      noColor: "primary",
      yesClick: this.yesDeleteOrigin.bind(this),
      noClick: this.noDeleteOrigin.bind(this)
    })
  }

  yesDeleteOrigin(user: User) {
    this.alertDialogService.hideDialog();

    this.loadingService.showLoading();
    this.userService.deleteUser(user.id).subscribe(() => {
      this.userService.getUsers().subscribe(() => {},);
    },
    () => {
      this .loadingService.hideLoading();
      console.log ("Error al eliminar el usuario: " + user.id)
    })
  }

  noDeleteOrigin(origin) {
    this.alertDialogService.hideDialog();
  }
}
