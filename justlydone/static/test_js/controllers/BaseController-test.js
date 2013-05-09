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

define(["backbone", "controllers/BaseController"],
  function (backbone, BaseController) {
    "use strict";
    buster.testCase("Test Base Controller", {
      "controller with view": function () {
        var view = new (backbone.View.extend({}))(),
          NewController = BaseController.extend({
            initialize: function () {
              buster.assert.same(view, this.view);
            }
          });
        new NewController({view: view});
      },
      "controller attaches model directly": function () {
        var model = new (backbone.Model.extend({}))(),
          view = new (backbone.View.extend({model: model}))(),
          NewController = BaseController.extend({
            initialize: function () {
              buster.assert.same(view, this.view);
              buster.assert.same(this.view.model, this.model);
              buster.assert.same(model, this.model);
            }
          });
        new NewController({view: view});
      },
      "simple new controller": function () {
        var NewController = BaseController.extend({
            initialize: function () {
              this.is_initialized = true;
            }
          }),
          newController = new NewController({});
        buster.assert.same(true, newController.is_initialized);
      }
    });
  });