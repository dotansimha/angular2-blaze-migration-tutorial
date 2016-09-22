import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Params} from "@angular/router";

@Component({
    template: '<blaze-template *ngIf="templateContext" name="App_body" [context]="templateContext"></blaze-template>'
})
export class ListShowComponent implements OnInit {
    private templateContext: any;

    constructor(private currentRoute: ActivatedRoute) {

    }

    ngOnInit() {
        this.currentRoute.params.subscribe((params: Params) => {
            const listId = params['_id'];

            this.templateContext = {
                main: "Lists_show_page",
                _id: listId
            };
        });
    }
}