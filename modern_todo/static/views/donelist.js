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

define(["jquery", "underscore", "backbone-relational", "mustache", "views/donetodo"],
function($,        _,            Backbone,              Mustache,   DoneTodoView) {
  return Backbone.View.extend({
    initialize: function() {
      this.model.on("add:todos", this.register_donetodo_view_creator_listener, this)
    },
    make_donetodo_view: function(todo) {
      return new DoneTodoView({model:todo})
    },
    make_donetodo_views: function(todolist) {
      var self = this
      _.each(todolist.get("todos").models, function(todo) {
        if (todo.get('complete')){
          var donetodo_view = self.make_donetodo_view(todo)
          self.$el.find(".donetodos").append(donetodo_view.render().$el)
        }
      })
    },
    register_donetodo_view_creator_listener: function(todoModel) {
      var self = this
      todoModel.on("change:complete", function(todoModel, isComplete, options) {
        if (isComplete) {
          if (self.$el) {
            var todoView = self.make_donetodo_view(todoModel)
            todoView.render()
            self.$el.find(".donetodos").append(todoView.$el)
          }
        }
      })
    },
    render: function() {
      this.setElement(Mustache.render(this.template, this.model.attributes))
      this.make_donetodo_views(this.model)
      var self = this
      _.each(this.model.get("todos").models, function(todo) {
        self.register_donetodo_view_creator_listener(todo)
      })
      return this
    },
    template: $("script#donetodolist_template").text()
  })
})