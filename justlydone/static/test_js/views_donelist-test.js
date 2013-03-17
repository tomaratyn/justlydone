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

define(["underscore", "jquery", "when", "test_js/FakeServerConfigurator", "models/todolist", "models/todo", "views/donelist"],
function(_,            $,        when,   FakeServerConfigurator,          ToDoListModel,    ToDoModel,     DoneListView) {
    buster.testCase("view donetodolist", {
      setUp: function() {
        this.todolist = new ToDoListModel({name:"my todolist"})
        this.view = new DoneListView({model: this.todolist})
        this.view.template =
          "<div>" +
          "<ul class='donetodos'>" +
          "</ul>" +
          "</div>"
        this.todo1 = new ToDoModel({text:"lorem ipsum", list: this.view.model})
        this.todo2 = new ToDoModel({text:"lorem ipsum", list: this.view.model})
        this.todo3 = new ToDoModel({text:"lorem ipsum", list: this.view.model})
      },
      show_done_todos: function() {
        this.todo2.set("complete", true)
        this.todo3.set("complete", true)
        this.spy(this.view, "make_donetodo_view")
        this.view.make_donetodo_views(this.view.model)
        buster.assert.equals(2, this.view.make_donetodo_view.callCount)
      }
    })
  }
)