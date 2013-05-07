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

define(["models/Todolist", "models/Todo", "views/DoneTodolist"],
  function (TodolistModel, TodoModel, DoneTodolistView) {
    "use strict";
    buster.testCase("DoneTodoList Controller", {
      setUp: function () {
        this.todolist = new TodolistModel({name: "my todolist"});
        this.view = new DoneTodolistView({model: this.todolist});
        this.view.template = "<div><ul class='donetodos'></ul></div>";
      },
      register_donetodo_view_creator_listener: function () {
        var notDoneTodo = new TodoModel({text: "Not Done", list: this.todolist, complete: false}),
          doneTodo = new TodoModel({text: "Done", list: this.todolist, complete: true}),
          makeDonetodoViewStub = this.stub(this.view, "make_donetodo_view");
        makeDonetodoViewStub.returns({
          render: function () {}
        });
        this.stub(this.view, "add_new_todo_view_to_display");
        notDoneTodo.off();
        doneTodo.off();
        this.view.controller.register_donetodo_view_creator_listener(notDoneTodo);
        // when the todo is MADE complete then it should make calls to the view
        notDoneTodo.set("complete", true);
        buster.assert.equals(1, this.view.make_donetodo_view.callCount);
        buster.assert.equals(1, this.view.add_new_todo_view_to_display.callCount);
        this.view.controller.register_donetodo_view_creator_listener(doneTodo);
        // when the todo is made incomplete then nothing should happen
        doneTodo.set("complete", false);
        buster.assert.equals(1, this.view.make_donetodo_view.callCount);
        buster.assert.equals(1, this.view.add_new_todo_view_to_display.callCount);
      }
    });
  });