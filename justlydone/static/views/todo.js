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

define( ["jquery", "mustache", "views/AbstractTodoView", "controllers/Todo", "humane"],
function ($,        Mustache,   AbstractTodoView,         TodoController) {
  return AbstractTodoView.extend({
    events: {
      "click .delete-todo": "click_delete_todo",
      "click .done": "click_done_todo_checkbox"
    },
    click_done_todo_checkbox: function() {
      this.controller.mark_todo_as_complete()
    },
    initialize: function() {
      var self = this
      this.controller = new TodoController({view:this})
      Object.getPrototypeOf(Object.getPrototypeOf(this)).initialize.apply(this)
    },
    render: function () {
      this.setElement(Mustache.render(this.template, this.model.attributes))
      this.humanize_times()
      return this
    },
    template: $("script#todo_template").text(),
    update_creation_datetime: function(new_creation_datetime) {
      this.$el.find(".creation-datetime").attr("datetime", new_creation_datetime)
      this.humanize_times()
    },
    update_todo_text: function(new_text) {
      this.$el.find(".text").text(new_text)
    }
  })
})
