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

define(["models/todo"],
  function (TodoModel) {
    "use strict";
    buster.testCase("test todo_model's name", {
      setUp: function () {
        this.useFakeServer();
      },
      empty_by_default: function () {
        var todo = new TodoModel(),
          jqXHR = todo.save(),
          requestBody,
          request;
        buster.refute.same(jqXHR, false);
        buster.assert.same(1, this.sandbox.server.requests.length);
        request = this.sandbox.server.requests[0];
        requestBody = JSON.parse(request.requestBody);
        buster.assert.same("", requestBody.text);
        buster.assert.same(null, requestBody.list);
      }
    });
  });