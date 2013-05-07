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
define(["controllers/BaseController"],
  function (BaseController) {
    "use strict";
    return BaseController.extend({
      initialize: function () {
        this.model.on("add:todos", this.register_donetodo_view_creator_listener, this);
      },
      register_donetodo_view_creator_listener: function (todoModel) {
        todoModel.on("change:complete", function (todoModel, isComplete, options) {
          if (isComplete) {
            var todoView = this.view.make_donetodo_view(todoModel);
            todoView.render();
            this.view.add_new_todo_view_to_display(todoView);
          }
        }, this);
      }
    });
  });