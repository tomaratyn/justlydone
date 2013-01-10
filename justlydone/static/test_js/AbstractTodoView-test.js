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

define([ "jquery", "models/todo", "views/AbstractTodoView" ],
function( $,        TodoModel,     AbstractTodoView) {
  return buster.testCase("AbstractTodoView Test", {
    setUp: function () {
      todo = new TodoModel({text: "lorem ipsum", complete:true})
      this.view = new AbstractTodoView({model: todo})
      this.view.setElement($("<div><input type='checkbox' class='done' checked='checked'></div>"))
      this.useFakeServer()
    },
    test_make_done: function () {
      this.view.make_done()
      var $el = this.view.$el
      buster.assert($el.find(".done").is(":checked"))
      buster.assert(this.view.model.attributes.complete)
      buster.assert.same(1, this.sandbox.server.requests.length)
      this.view.$el.find(".done").removeAttr("checked")
      this.view.make_done()
      buster.refute($el.find(".done").is(":checked"))
      buster.refute(this.view.model.attributes.complete)
      buster.assert.same(2, this.sandbox.server.requests.length)
    },
    "test remove view on model removal": function () {
      this.spy(this.view, "remove")
      this.view.model.trigger("destroy", this.view.model)
      buster.assert.calledOnce(this.view.remove)
    }
  })
})