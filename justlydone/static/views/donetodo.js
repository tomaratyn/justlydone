/* Copyright (C) 2012  The Boulevard Platform Inc.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * Contributors:
 *  - Tom Aratyn <tom@aratyn.name>
 */

define(["jquery", "underscore", "mustache", "views/AbstractTodoView", "controllers/DoneTodo", "object_get_prototype_monkeypatch"],
function($,        _,            Mustache,   AbstractTodoView,         DoneTodoController) {
    return AbstractTodoView.extend({
      events: {
        "click .delete-todo": "click_delete_todo",
        "click .done": "click_complete_checkbox"
      },
      initialize: function() {
        Object.getPrototypeOf(Object.getPrototypeOf(this)).initialize.apply(this)
        this.controller = new DoneTodoController({view:this})
      },
      click_complete_checkbox: function() {
        var doneCheckbox = this.$el.find(".done")
        if (doneCheckbox.length > 0 && !doneCheckbox.is(":checked")) {
          this.controller.mark_todo_as_incomplete()
        }
      },
      render: function() {
        this.setElement(Mustache.render(this.template, this.model.attributes))
        this.humanize_times()
        return this
      },
      template: $("script#todo_template").text()
    })
  }
)