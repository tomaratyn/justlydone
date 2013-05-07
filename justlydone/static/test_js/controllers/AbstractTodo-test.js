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

define(["models/todo", "views/donetodo", "controllers/DoneTodo"],
  function (TodoModel, DoneTodoView, DoneTodoController) {
    "use strict";
    buster.testCase("Abstract Todo Controller", {
      setUp: function () {
        this.model = new TodoModel({text: "lorem ipsum", complete: true});
        this.view = new DoneTodoView({model: this.model});
        // Using DoneTodoController for no particular reason, just need a concrete
        // implementation of the TodoController.
        this.controller = this.view.controller;
      },
      "remove view on model destruction": function () {
        this.spy(this.view, "remove");
        this.spy(this.controller, "remove_view");
        this.model.trigger("destroy", this.model);
        buster.assert.calledOnce(this.view.remove);
        buster.assert.calledOnce(this.controller.remove_view);
      }
    })
  })