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

define(["underscore"],
function(_) {
  var FakeServerConfigurator = {
    enableFakeServer: function(testCase) {
      testCase.useFakeServer()
      testCase.sandbox.server.autoRespond = true
    },
    enableTodolistCreateResponse: function(testCase) {
      testCase.sandbox.server.respondWith(/todolist\/?$/, function(xhr) {
        xhr.respond(201, { "Content-Type": "application/json" }, JSON.stringify({
          "creation_datetime": "2012-12-20T22:37:32.580887+00:00",
          "id": 88,
          "name": "test",
          "resource_uri": "/api/testing/todolist/88/",
          "todos": []
        }))
      })
    },
    enableTodoCreateResponse: function(testCase) {
      var id = 99
      testCase.sandbox.server.respondWith(/todo\/?$/, function(xhr) {
        var text = JSON.stringify({
          "complete": false,
          "completion_datetime": null,
          "creation_datetime": "2012-12-15T20:24:16.415315+00:00",
          "id": ++id,
          "list": 88,
          "resource_uri": "/api/testing/todo/" + id + "/",
          "text": "lorem ipsum " + id
        })
        xhr.respond(201, { "Content-Type": "application/json" }, text)
      })
    },
    enableTodoSetResponse: function(testCase, todos) {
      var keys = ["complete", "id", "resource_uri", "creation_datetime", "text"]
      testCase.sandbox.server.respondWith(/todo\/set\//,function(xhr) {
        var response = JSON.stringify({
            "objects": _.map(todos,
              function (todo) {
                return _.pick(todo.attributes, keys)
              })
          }
        )
        xhr.respond(200, { "Content-Type": "application/json" }, response)
      })
    }
  }
  return FakeServerConfigurator
})