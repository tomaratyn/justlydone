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

define(["jquery", "when", "views/todo", "models/todo"],
function($,        when,         ToDoView,     todo_model) {
  buster.testCase("views todo", {
    setUp: function() {
      todo = new todo_model({text: "lorem ipsum"})
      this.view = new ToDoView({model: todo})
    },
    with_template: {
      setUp: function() {
        template_text = "<div id='buster_test'><input type='checkbox' class='done'><label>{{text}}</label><button class='delete-todo'>X</button></div>"
        this.useFakeServer()
        this.view.template = template_text
        $("body").append(this.view.render().el)
      },
      tearDown: function() {
        this.view.$el.remove()
      },
      "test click delete todo destroys todo model": function() {
        var deferred = when.defer()
        this.view.model.on("destroy", function() {
          buster.assert("true")
          deferred.resolver.resolve()
        }, 100)
        this.view.$el.find(".delete-todo").click()
        return deferred.promise
      },
      "//test click done destroys view": function() {
        this.spy(this.view, "remove")
        buster.refute.called(this.view.remove)
        this.view.click_done_todo_checkbox()
        buster.assert.calledOnce(this.view.remove)
        buster.assert(false)
      }
    }
  })
})