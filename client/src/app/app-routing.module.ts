import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ThreadComponent } from './pages/thread/thread.component';


const routes: Routes = [
  {path: 'thread/:threadName', component: ThreadComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
