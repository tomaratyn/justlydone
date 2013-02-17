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

define(["controllers/AbstractTodo"],
function(AbstractTodoController) {
    return AbstractTodoController.extend({
      initialize: function() {
        console.log("running controllers/Todo.js initialize")
        this.testid = Date.now()
        Object.getPrototypeOf(Object.getPrototypeOf(this)).initialize.apply(this)
        var self = this
        this.model.on("change:complete", function(model, isComplete, options){
          if (isComplete){
            self.remove_view()
          }
        })
      },
      mark_todo_as_complete: function(){
        this.model.set({complete:true}, {silent:true})
        this.model.save()
      }
    })
})
