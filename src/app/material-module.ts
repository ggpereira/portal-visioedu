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
    MatSelectModule,
    MatSnackBarModule
} from '@angular/material';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

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
        MatSelectModule,
        MatProgressSpinnerModule,
        MatSnackBarModule
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
        MatSelectModule,
        MatProgressSpinnerModule,
        MatSnackBarModule
    ],
    providers: [],
})
export class MaterialModule { }
