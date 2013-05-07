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

define(["models/Todo", "views/Todo", "controllers/Todo"],
  function (TodoModel, TodoView) {
    "use strict";
    buster.testCase("Todo Controller", {
      setUp: function () {
        this.model = new TodoModel({text: "lorem ipsum", complete:false});
        this.view = new TodoView({model:this.model});
        this.controller = this.view.controller;
      },
      "remove view on change:complete and complete === true": function () {
        this.spy(this.controller, "remove_view");
        this.spy(this.view, "remove");
        this.model.set({complete: true});
        buster.assert.calledOnce(this.controller.remove_view);
        buster.assert.calledOnce(this.view.remove);
      }
    });
  });
