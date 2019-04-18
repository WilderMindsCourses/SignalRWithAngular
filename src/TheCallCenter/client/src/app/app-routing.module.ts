import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CallListView } from "./views/calllist.component";
import { CallView } from "./views/call.component";


const routes: Routes = [
  { path: "", redirectTo: "/call-list", pathMatch: 'full' },
  { path: "call-list", component: CallListView },
  { path: "call/:id", component: CallView }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
