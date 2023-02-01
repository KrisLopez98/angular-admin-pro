import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';
import { AccountSettingComponent } from './account-setting/account-setting.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { PagesComponent } from './pages.component';
import { PerfilComponent } from './perfil/perfil.component';
import { ProgressComponent } from './progress/progress.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';
import { BusquedasComponent } from './busquedas/busquedas.component';
import { AdmiGuard } from '../guards/admi.guard';

const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: DashboardComponent,
        data: { titulo: 'Dashboard' },
      },
      {
        path: 'account-settings',
        component: AccountSettingComponent,
        data: { titulo: 'Ajustes de cuenta' },
      },
      {
        path: 'busqueda/:termino',
        component: BusquedasComponent,
        data: { titulo: 'Búsquedas' },
      },
      {
        path: 'grafica1',
        component: Grafica1Component,
        data: { titulo: ' Gráfica #1' },
      },
      {
        path: 'progress',
        component: ProgressComponent,
        data: { titulo: 'Progress' },
      },
      {
        path: 'promesas',
        component: PromesasComponent,
        data: { titulo: 'Promesas' },
      },
      {
        path: 'perfil',
        component: PerfilComponent,
        data: { titulo: 'Perfil de usuario' },
      },
      { path: 'rxjs', component: RxjsComponent, data: { titulo: 'RxJs' } },

      // Mantenimientos
      {
        path: 'hospitales',
        component: HospitalesComponent,
        data: { titulo: 'Mantenimiento de Hospitales' },
      },
      {
        path: 'medicos',
        component: MedicosComponent,
        data: { titulo: 'Mantenimiento de Médicos' },
      },
      {
        path: 'medico/:id',
        component: MedicoComponent,
        data: { titulo: 'Mantenimiento de Médico' },
      },
      // RUTAS DE ADMI
      {
        path: 'usuarios',
        canActivate: [AdmiGuard],
        component: UsuariosComponent,
        data: { titulo: 'Mantenimiento de Usuarios' },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
