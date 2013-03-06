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
        Object.getPrototypeOf(Object.getPrototypeOf(this)).initialize.apply(this)
        var self = this
        this.model.on("change:complete", function(model, isComplete, options){
          if (isComplete){
            this.remove_view()
          }
        }, this)
      },
      mark_todo_as_complete: function(){
        this.model.set({complete:true})
        return this.model.save()
      },
      remove_view: function() {
        var view = this.view
        this.view = null
        view.controller = null
        this.model.off(null, null, this)
        view.remove()
      }
    })
})
