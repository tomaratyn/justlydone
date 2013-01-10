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

define(["jquery", "underscore", "collections/todolist", "views/todolist"],
  function ($, _, ToDoList_List, ToDoList_View) {
    return Backbone.View.extend({
      el: ".todolist_list",
      events: {
        "click .refresh": "refresh",
        "click .add_new_list": "add_new_list"
      },
      add_new_list: function (e) {
        var $btn = $(e.currentTarget)
        var $label = $btn.parents("div").find("input.new_list_name")
        var new_list_name = $label.val()
        if (new_list_name.length > 0) {
          this.collection.create({name: new_list_name})
        }
        $label.val("")
      },
      initialize: function () {
        this.collection.on("add", this.render_new_single_list, this)
        this.collection.on("reset", this.render_new_many_lists, this)
      },
      render_new_many_lists: function () {
        this.$el.find("ul").html("")
        var self = this
        _.each(this.collection.models, function (model) {
          self.render_new_single_list(model)
        })
      },
      refresh: function (e) {
        this.collection.fetch({add:true})
      },
      render_new_single_list: function (new_todo_list) {
        var view = new ToDoList_View({model: new_todo_list})
        $(this.el).find(".todolists").append(view.render().el)

      }
    })
  })