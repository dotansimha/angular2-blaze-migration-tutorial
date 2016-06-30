import {Component, Input, Output, EventEmitter} from '@angular/core';

import {
  setCheckedStatus,
  updateText,
  remove,
} from '../../../imports/api/todos/methods.js';

import {displayError} from '../../../imports/errors.js';

@Component({
  selector: 'list-item',
  templateUrl: '/client/imports/components/list-item.ng2.html'
})
export class ListItem {
  @Input() todo:any;
  @Input() editing:boolean;
  @Output() editChange = new EventEmitter();

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