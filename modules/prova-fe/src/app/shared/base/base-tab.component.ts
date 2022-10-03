import { Component } from '@angular/core';
import { GenericTabComponent, getControl } from '@micegroup/voila2-runtime-ng';
import { BzTabComponent } from '@micegroup/voila2-blazing-ng';

@Component({
    selector: 'base-tab',
    template: ``
})
export class BaseTabComponent<T> extends GenericTabComponent<T> {
    PATH_VIEW: string = '/view';

    public errors: any = {};

    public isTabActive(tab: BzTabComponent, tabName: string): boolean {
        return tab.active && tab.tabName === tabName;
    }

    public isNotSamePage(page: number, object: any): boolean {
        return page != object.page || object.columnName;
    }
}
