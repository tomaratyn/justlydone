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

define(["underscore", "models/todo", "models/todolist"],
  function (_, TodoModel, TodolistModel) {
    "use strict";
    buster.testCase("create empty", {
      setUp: function () {
        this.useFakeServer();
      },
      make_one_blank: function () {
        var todolist = new TodolistModel(),
          jqXHR = todolist.save(),
          request,
          requestBody
        buster.refute.same(jqXHR, false);
        buster.assert.same(1, this.sandbox.server.requests.length);
        request = this.sandbox.server.requests[0];
        requestBody = JSON.parse(request.requestBody);
        buster.assert.same("", requestBody.name);
        buster.assert.same(0, requestBody.todos.length);
      },
      make_list_with_todos: function () {
        var todolist = new TodolistModel({name: "my todolist"}),
          todos =  [ new TodoModel({text: "foo"}),
                       new TodoModel({text: "bar"}),
                       new TodoModel({text: "qux"})],
          requestBody;
        _.each(todos, function (todo) {
          todolist.attributes.todos.models.push(todo);
        });
        todolist.save();
        buster.assert.same(1, this.sandbox.server.requests.length);
        requestBody = JSON.parse(this.sandbox.server.requests[0].requestBody);
        buster.assert.same(todolist.attributes.name, requestBody.name);
        _.each(todos, function (todo) {
          var actual_todo = _.where(requestBody.todos, {text:todo.attributes.text});
          buster.assert.same(1, actual_todo.length);
        });
      }
    });
  });
