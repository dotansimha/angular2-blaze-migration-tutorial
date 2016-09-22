import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Params} from "@angular/router";

@Component({
    template: 'Hello ListShow!'
})
export class ListShowComponent implements OnInit {
    constructor(private currentRoute: ActivatedRoute) {

    }

    ngOnInit() {
        this.currentRoute.params.subscribe((params: Params) => {
            const listId = params['_id'];
        })
    }
}