import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { ShellComponent } from './shared/shell/shell.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CategoriesListComponent } from './categories/categories-list/categories-list.component';

import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table'
import { HttpClientModule } from '@angular/common/http';
import { CategoriesService } from '@learnmean/products';
import { CategoryFormComponent } from './categories/category-form/category-form.component';
const UX_MODULES = [CardModule, ToolbarModule, ButtonModule, TableModule];
const routes: Routes = [
    {
        path: '', component: ShellComponent, children: [
            {
                path: 'dashboard',
                component: DashboardComponent
            },
            {
                path: 'categories',
                component: CategoriesListComponent
            },
            {
                path: 'categories/form',
                component: CategoryFormComponent
            }

        ]
    }
]
@NgModule({
    declarations: [AppComponent, ShellComponent, SidebarComponent, DashboardComponent, CategoriesListComponent, CategoryFormComponent],
    imports: [BrowserModule,
        HttpClientModule,
        RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' }),
        ...UX_MODULES],
    providers: [CategoriesService],
    bootstrap: [AppComponent]
})
export class AppModule { }
