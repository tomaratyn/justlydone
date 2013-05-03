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

define(["jquery", "underscore", "backbone-relational", "mustache", "controllers/DoneTodolist", "views/donetodo"],
function($,        _,            Backbone,              Mustache,   DoneTodolistController,     DoneTodoView) {
  return Backbone.View.extend({
    initialize: function() {
      this.controller = new DoneTodolistController({"view":this})
    },
    add_new_todo_view_to_display: function(todoView) {
      this.$el.find(".donetodos").append(todoView.el)
    },
    make_donetodo_view: function(todo) {
      return new DoneTodoView({model:todo})
    },
    make_donetodo_views: function(todolist) {
      _.each(todolist.get("todos").models, function(todo) {
        if (todo.get('complete')) {
          var donetodo_view = this.make_donetodo_view(todo)
          this.$el.find(".donetodos").append(donetodo_view.render().$el)
        }
      }, this)
    },
    render: function() {
      this.setElement(Mustache.render(this.template, this.model.attributes))
      this.make_donetodo_views(this.model)
      _.each(this.model.get("todos").models, function(todo) {
        this.controller.register_donetodo_view_creator_listener(todo)
      }, this)
      return this
    },
    template: $("script#donetodolist_template").text()
  })
})