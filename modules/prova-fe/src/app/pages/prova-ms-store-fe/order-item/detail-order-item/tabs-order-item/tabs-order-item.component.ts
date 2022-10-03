import { Component, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IOrderItem } from '../../order-item.interface';
import { getPrivileges, getPrivilegesEnum } from '@micegroup/voila2-runtime-ng';
import { BzTabComponent } from '@micegroup/voila2-blazing-ng';

@Component({
    selector: 'app-tabs-order-item',
    templateUrl: './tabs-order-item.component.html',
    styleUrls: ['../../order-item.scss']
})
export class TabsOrderItemComponent implements OnChanges {
    public privileges: string[] = getPrivileges();

    public activeTab!: BzTabComponent;

    @Input()
    public formGroup!: FormGroup;

    @Input()
    public entity!: IOrderItem;

    @Input()
    public pageStatus!: string;

    public get Privileges(): any {
        return getPrivilegesEnum();
    }

    public ngOnChanges(changes: SimpleChanges) {
        this.manageEntityChanges(changes);
        this.managePageSatutusChanges(changes);
    }

    private managePageSatutusChanges(changes: SimpleChanges): void {
        const pageStatusChanges: SimpleChange = changes.pageStatus;
        if (pageStatusChanges) this.pageStatus = pageStatusChanges?.currentValue;
    }

    private manageEntityChanges(changes: SimpleChanges): void {
        const entityChanges: SimpleChange = changes.entity;
        if (entityChanges?.currentValue) {
            this.entity = entityChanges.currentValue;
        }
    }

    public onChangeTab(bzTab: BzTabComponent): void {
        this.activeTab = bzTab;
    }
}
