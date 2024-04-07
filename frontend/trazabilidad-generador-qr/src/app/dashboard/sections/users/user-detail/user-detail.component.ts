import { Component, OnInit } from '@angular/core';
import { User } from '../../../../models/user.model';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { TitlebarService } from '../../../titlebar/titlebar.service';
import { UsersService } from '../users.service';
import { AlertDialogService } from '../../../../shared/alert-dialog/alert-dialog.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from '../../../../login/auth.service';
import { take } from 'rxjs/operators';

interface Level {
  value: string,
  description: string
}

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css'
})
export class UserDetailComponent implements OnInit {
  userToEdit: User = null;
  newUserForm: FormGroup;
  loading = false;
  loginUserLevel: string = 'admin';
  levels: Level[] = [
    {
      value: "admin",
      description: "admin"
    },
    {
      value: "operator",
      description: "operator"
    }
  ];

  constructor(
    private auth: AuthService,
    private titlebarService: TitlebarService,
    private location: Location,
    private userService: UsersService,
    private alertDialogService: AlertDialogService,
    private route: ActivatedRoute
  ){
    // Se busca el nivel de privilegio del usuario logueado
    this.auth.user.pipe(
      take(1)
    ).subscribe(loginUser => {
      this.loginUserLevel = loginUser.level;
    })

    // Obtiene de la ruta si hay un user para editar. Si no lo hay, significa que se llamó
    // a este componente para crear un user nuevo
    if (this.route.snapshot.queryParams['user'])
      this.userToEdit = JSON.parse(this.route.snapshot.queryParams['user']);

    let passwordValidators: ValidatorFn[] = [];
    if (this.userToEdit)
      passwordValidators = [Validators.minLength(8)];
    else
      passwordValidators = [Validators.required, Validators.minLength(8)]

    this.newUserForm = new FormGroup({
      'emailFormControl': new FormControl({value: this.userToEdit?.email, disabled: this.userToEdit? true : false }, [Validators.required, Validators.email]),
      'passwordFormControl': new FormControl("", passwordValidators),
      'levelFormControl': new FormControl({value: this.userToEdit?.level, disabled: this.loginUserLevel !== "admin"}, [Validators.required])
    });
  }

  ngOnInit(): void {
    if (this.userToEdit)
      this.titlebarService.title = "Editar usuario";
    else
      this.titlebarService.title = "Crear nuevo usuario";

    this.titlebarService.back = true;
  }

  onSubmit() {
    this.loading = true;

    // Si userToEdit es true se llama a editUser, si no, se llama a newUser
    if (this.userToEdit) {
      this.userService.editOrigin(
        new User(
          this.newUserForm.value.emailFormControl,
          this.newUserForm.value.levelFormControl,
          this.newUserForm.value.passwordFormControl,
          this.userToEdit.id
        )).subscribe((user: User) => {
          this.loading = false;
  
          this.alertDialogService.showDialog({
            message: `Se modificó exitósamente el usuario ${this.userToEdit.email}`,
            yesText: "Finalizar",
            yesStyle: "basic",
            yesColor: "primary",
            yesClick: this.onCreateOkDialogFinishClick.bind(this),
          });
  
          this.newUserForm.reset();
        },
        (errorMessage) => {
          this.loading = false;
  
          this.alertDialogService.showDialog({
            message: errorMessage,
            yesText: "Aceptar",
            yesStyle: "outline",
            yesColor: "primary",
            noEnable: false,
            yesClick: this.onCreateErrorDialogClose.bind(this),
          });
        
          this.newUserForm.reset();
        })
    }
    else {
      this.userService.newUser(
        new User(
          this.newUserForm.value.emailFormControl,
          this.newUserForm.value.levelFormControl,
          this.newUserForm.value.passwordFormControl          
        )).subscribe((user: User) => {
          this.loading = false;
  
          this.alertDialogService.showDialog({
            message: `Se creó exitósamente el usuario ${user.email} (${user.level})`,
            yesText: "Finalizar",
            yesStyle: "basic",
            yesColor: "primary",
            yesClick: this.onCreateOkDialogFinishClick.bind(this),
          });
  
          this.newUserForm.reset();
        },
        (errorMessage) => {
          this.loading = false;
  
          this.alertDialogService.showDialog({
            message: errorMessage,
            yesText: "Aceptar",
            yesStyle: "outline",
            yesColor: "primary",
            noEnable: false,
            yesClick: this.onCreateErrorDialogClose.bind(this),
          });
        
          this.newUserForm.reset();
        })
    }
    
  }

  onCancelClick() {
    this.location.back();
  }

  onCreateOkDialogFinishClick() {
    this.alertDialogService.hideDialog();
    this.location.back();
  }

  onCreateErrorDialogClose() {
    this.alertDialogService.hideDialog();
  }
}
