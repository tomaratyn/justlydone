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
define(["controllers/BaseController", "models/Todo"],
  function (BaseController, TodoModel) {
    "use strict";
    return BaseController.extend({
      initialize: function () {
        this.model.on("add:todos", function (todo) {
          if (this.view.el) {
            this.register_todo_view_creator_listener(todo);
            var todoview = this.view.make_todo_view(todo);
            this.view.add_new_todo_view_to_display(todoview);
          }
        }, this);
        this.model.on("add:todos", function () {this.update_todo_count(); }, this);
        this.model.on("remove:todos", function () {this.update_todo_count(); }, this);
        this.model.on("change:name", this.on_name_change, this);
        this.model.get('todos').each(this.register_todo_view_creator_listener, this);
      },
      count_todos: function () {
        return this.model.get("todos").models.length;
      },
      destroy_model: function () {
        this.model.destroy();
      },
      make_todo: function (todo_properties) {
        todo_properties.list = this.model;
        var todo = new TodoModel(todo_properties);
        return todo.save();
      },
      on_name_change: function(todolist, name, options) {
        this.view.set_list_name(name);
      },
      register_todo_view_creator_listener: function (todoModel) {
        todoModel.on("change:complete", function (todoModel, isComplete, options) {
          if (!isComplete) {
            if (this.view.$el) {
              var todoView = this.view.make_todo_view(todoModel);
              this.view.add_new_todo_view_to_display(todoView);
            }
          }
        }, this);
      },
      rename_list: function (new_name) {
        return this.model.save({"name": new_name});
      },
      update_todo_count: function () {
        this.view.set_todo_count(this.count_todos());
      }
    })
  })