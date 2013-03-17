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

define(["when", "test_js/FakeServerConfigurator", "models/todolist", "views/todolist", "models/todo"],
function(when,   FakeServerConfigurator,           TodolistModel,     TodolistView,     TodoModel) {
  buster.testCase("todolist controller", {
    setUp: function() {
      FakeServerConfigurator.enableFakeServer(this)
      FakeServerConfigurator.enableTodolistCreateResponse(this)
      FakeServerConfigurator.enableTodoCreateResponse(this)
      this.model = new TodolistModel({name: "test"})
      this.model.save()
      this.view = new TodolistView({model:this.model})
      this.controller = this.view.controller
    },
    "make_todo": {
      "happy day": function() {
        var deferred = when.defer()
        var self = this
        this.spy(this.view, "add_new_todo_view_to_display")
        this.spy(this.view.controller, "register_todo_view_creator_listener")
        this.model.on("add:todos", function(todo, todosInList) {
          setTimeout(function() {
            if (self.view.add_new_todo_view_to_display.callCount > 1) {
              console.log(self.view.add_new_todo_view_to_display.firstCall)
              console.log(self.view.add_new_todo_view_to_display.secondCall)
              buster.assert(false)
            }
            buster.assert.calledOnce(self.view.add_new_todo_view_to_display)
            buster.assert.calledOnce(self.view.controller.register_todo_view_creator_listener)
            deferred.resolver.resolve()
          }, 10)
        })
        this.controller.make_todo({text:"Lorem Ipsum", complete: false})
        return deferred.promise
      }
    },
    // We need to test this manually because `register_todo_view_creator_listener` gets called in the `success`
    // callback of `fetchRelated` which, unfortunately, isn't testable in buster.
    "register_todo_view_creator_listener": function() {
      todo1 = new TodoModel({text:"lorem ipsum", list: this.model})
      todo1.save()
      this.spy(this.view, "make_todo_view")
      todo1.set("complete", true)
      buster.assert.equals(0, this.view.make_todo_view.callCount)
      todo1.set("complete", false)
      buster.assert.equals(0, this.view.make_todo_view.callCount)
      this.view.controller.register_todo_view_creator_listener(todo1)
      todo1.set("complete", true)
      buster.assert.equals(0, this.view.make_todo_view.callCount)
      todo1.set("complete", false)
      buster.assert.equals(1, this.view.make_todo_view.callCount)
    },
    "update list name": function() {
      var new_name = "New Name"
      this.stub(this.view, "set_list_name")
      this.model.set("name", new_name)
      buster.assert.calledOnce(this.view.set_list_name)
    }
  })
});