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

define( ["jquery", "mustache", "views/AbstractTodoView", "humane"],
function ($,        Mustache,   AbstractTodoView) {
  return AbstractTodoView.extend({
    events: {
      "click .delete-todo": "click_delete_todo",
      "change .done": "make_done"
    },
    initialize: function() {
      var self = this
      Object.getPrototypeOf(Object.getPrototypeOf(this)).initialize.apply(this)
      this.model.on("change:complete", function(model, isComplete, options){
        if (isComplete){
          self.remove()
        }
      })
    },
    render: function () {
      this.setElement(Mustache.render(this.template, this.model.attributes))
      this.humanize_times()
      return this
    },
    template: $("script#todo_template").text()
  })
})
