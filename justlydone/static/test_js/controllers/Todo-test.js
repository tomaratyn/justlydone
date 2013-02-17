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

define(["when", "models/todo", "views/todo", "controllers/Todo"],
function(when,   TodoModel, TodoView) {
  buster.testCase("Todo Controller", {
    setUp: function() {
      this.useFakeServer()
      this.model= new TodoModel({text: "lorem ipsum", complete:false})
      this.view = new TodoView({model:this.model})
      this.controller = this.view.controller
      this.sandbox.server.autoRespond = true
      this.sandbox.server.respondWith("POST",
                                      "http://localhost:8000/api/testing/todo/",
                                      JSON.stringify({text:"lorem ipsum", id:99, complete:false}))
      this.sandbox.server.respondWith("POST",
                                      "http://localhost:8000/api/testing/todo/99/",
                                      JSON.stringify({text:"lorem ipsum", id:99, complete:true}))
    },
    "remove view on change:complete and complete === true": function() {
      var deferred = when.defer()
      var self = this
      this.spy(this.controller, "remove_view")
      this.spy(this.view, "remove")
      this.model.save().then(function() {
        self.model.set({complete: true})
        self.model.save().then(function() {
          buster.assert.calledOnce(self.controller.remove_view)
          buster.assert.calledOnce(self.view.remove)
          deferred.resolver.resolve()
        })
      })
      return deferred.promise
    }
  })
})
