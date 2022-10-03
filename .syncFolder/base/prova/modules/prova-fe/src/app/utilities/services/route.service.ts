import { Injectable, Injector } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from '@angular/common';

@Injectable() 
export class RouteService {

    private routerService !: Router;
    private routeService !: ActivatedRoute;
    private locationService !: Location

    constructor(private injector: Injector){}
   
    get router() : Router{
        if(!this.routerService)
           this.routerService = this.injector.get(Router);
        return this.routerService;
    }

    get route() :  ActivatedRoute {
        if(!this.routeService)
          this.routeService = this.injector.get(ActivatedRoute);
        return this.routeService;
    }

    get location() : Location {
        if(!this.locationService)
          this.locationService = this.injector.get(Location);
        return this.locationService;
    }
}
