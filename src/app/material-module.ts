import { NgModule } from '@angular/core';

import {
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatFormFieldModule,
    MatGridListModule,
    MatCardModule,
    MatTableModule,
    MatInputModule,
    MatPaginatorModule,
    MatAutocompleteModule,
    MatSelectModule
} from '@angular/material';

@NgModule({
    imports: [
        MatToolbarModule,
        MatIconModule,
        MatSidenavModule,
        MatListModule,
        MatButtonModule,
        MatFormFieldModule,
        MatGridListModule,
        MatCardModule,
        MatTableModule,
        MatInputModule,
        MatPaginatorModule,
        MatAutocompleteModule,
        MatFormFieldModule,
        MatSelectModule
    ],
    exports: [
        MatToolbarModule,
        MatIconModule,
        MatSidenavModule,
        MatListModule,
        MatButtonModule,
        MatFormFieldModule,
        MatGridListModule,
        MatCardModule,
        MatTableModule,
        MatFormFieldModule,
        MatInputModule,
        MatPaginatorModule,
        MatAutocompleteModule,
        MatSelectModule
    ],
    providers: [],
})
export class MaterialModule { }
