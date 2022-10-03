import { NgModule } from "@angular/core";
import {PageStatusPipe, PermissionPipe, ReadOnlyPipe, siNoPipe, tableInfoPipe, voilaTranslatePipe} from './utility-pipe';

const PIPE = [
    PageStatusPipe,
    PermissionPipe,
    ReadOnlyPipe,
    siNoPipe,
    tableInfoPipe,
    voilaTranslatePipe
]

@NgModule({
    declarations: [...PIPE],
    imports: [
    ],
    exports:[...PIPE]
  })
  export class UtilityPipeModule { }
  