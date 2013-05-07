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

define(["models/todo", "views/donetodo"],
  function (TodoModel, DoneTodoView) {
    "use strict";
    buster.testCase("views DoneTodo", {
      setUp: function() {
        this.doneTodo = new TodoModel({text: "Lorem Ipsum", complete: true});
        this.doneTodoView = new DoneTodoView({model: this.doneTodo});
      },
      "uncheck listener should mark todo model incomplete": function () {
        this.doneTodoView.$el.append("<input type='checkbox' class='done'></input>");
        this.doneTodoView.click_complete_checkbox();
        buster.refute(this.doneTodo.get("complete"));
      }
    })
  })