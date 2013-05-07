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

define(["underscore", "jquery", "when", "models/Todolist", "models/Todo", "views/DoneTodolist"],
  function (_, $, when, TodolistModel, TodoModel, DoneTodolistModel) {
    "use strict";
    buster.testCase("view donetodolist", {
      setUp: function () {
        this.todolist = new TodolistModel({name: "my todolist"});
        this.view = new DoneTodolistModel({model: this.todolist});
        this.view.template = "<div><ul class='donetodos'></ul></div>";
        this.todo1 = new TodoModel({text: "lorem ipsum", list: this.view.model});
        this.todo2 = new TodoModel({text: "lorem ipsum", list: this.view.model});
        this.todo3 = new TodoModel({text: "lorem ipsum", list: this.view.model});
      },
      show_done_todos: function () {
        // the view's controller has a listener for complete changes. We use silent so that it doesn't fire.
        this.todo2.set("complete", true, {silent: true});
        this.todo3.set("complete", true, {silent: true});
        this.spy(this.view, "make_donetodo_view");
        buster.refute.equals(2, this.view.make_donetodo_view.callCount);
        this.view.make_donetodo_views(this.view.model);
        buster.assert.equals(2, this.view.make_donetodo_view.callCount);
      }
    });
  });