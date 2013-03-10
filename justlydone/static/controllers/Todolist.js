/* Copyright (C) 2013  The Boulevard Platform Inc.
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
define(["controllers/BaseController", "models/todo"],
function (BaseController, TodoModel) {
  return BaseController.extend({
    initialize: function() {
      this.model.on("add:todos", function(todo) {
        if (this.view.el) {
          var todoview = this.view.make_todo_view(todo)
          this.view.add_new_todo_view_to_display(todoview)
        }
      }, this)
      _.each(this.model.get('todos').models, this.register_todo_view_creator_listener, this)
    },
    make_todo: function(todo_properties) {
      todo_properties.list = this.model
      var todo = new TodoModel(todo_properties)
      this.register_todo_view_creator_listener(todo)
      return todo.save()
    },
    register_todo_view_creator_listener: function(todoModel) {
      var self = this
      todoModel.on("change:complete", function(todoModel, isComplete, options) {
        if (!isComplete) {
          if (self.view.$el) {
            var todoView = self.view.make_todo_view(todoModel)
            self.view.add_new_todo_view_to_display(todoView)
          }
        }
      })
    }
  })
})