import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RepositoryComponent } from './repository.component';
import { RouterModule } from '@angular/router';
import { environment } from 'environments/environment';
import { AngularFireModule } from 'angularfire2/angularfire2';
import { RepositoryService } from './repository.service';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    NgbPaginationModule.forRoot(),
    RouterModule.forChild([{
      path: '',
      component: RepositoryComponent
    }]),
    AngularFireModule.initializeApp(environment.firebase)

  ],
  providers: [],
  declarations: [RepositoryComponent],
})
export class RepositoryModule { }
