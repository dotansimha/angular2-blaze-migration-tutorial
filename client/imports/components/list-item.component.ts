import {Component, Input, Output, EventEmitter} from '@angular/core';
import {
  setCheckedStatus,
  updateText,
  remove,
} from '../../../imports/api/todos/methods';
import {displayError} from '../../../imports/errors';
import template from "./list-item.html";

declare let _;

@Component({
  selector: 'list-item',
  template
})
export class ListItemComponent {
  @Input("todo") todo: any;
  @Input("editing") editing: boolean;
  @Output("editChange") editChange = new EventEmitter();

  constructor() {
  }

  toggleEdit(isEdit) {
    if (!isEdit || (isEdit && this.editing)) {
      this.editChange.emit({
        editing: isEdit,
        todoId: this.todo._id
      });
    }
  }

  remove() {
    remove.call({
      todoId: this.todo._id,
    }, displayError);
  }

  checkedChange(event) {
    setCheckedStatus.call({
      todoId: this.todo._id,
      newCheckedStatus: event.target.checked,
    });
  }

  updateText(event) {
    _.throttle((event) => {
      updateText.call({
        todoId: this.todo._id,
        newText: event.target.value,
      }, displayError);
    }, 300)(event);
  }
}