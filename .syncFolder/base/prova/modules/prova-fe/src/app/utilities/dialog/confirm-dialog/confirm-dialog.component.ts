import { Component, OnInit } from '@angular/core';
import { BzDialogService, BzSize } from '@micegroup/voila2-blazing-ng';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {

  public cardSize: BzSize = BzSize.SMALL;
  public title : string = '';
  public message: string = '';
  public icon: string = '';

  constructor(public dialogService: BzDialogService) { }

  ngOnInit(): void {
  }

 

}
