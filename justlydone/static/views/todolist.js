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

define(["jquery", "underscore", "backbone-relational", "mustache", "controllers/Todolist", "views/todo", "models/todo", "views/donelist", "bootstrap"],
  function ($,        _,            Backbone,              Mustache,   TodolistController,     ToDoView,     TodoModel,     DoneListView) {
    "use strict";
    return Backbone.View.extend({
      events: {
        "click .add-new-todo": "add_new_todo",
        "click .edit-list-name-modal .save": "save_and_close_edit_name_modal",
        "click .hide-done-todolist": "hide_done_todolist",
        "click .remove-list": "remove_list",
        "click .show-done-todolist": "show_done_todolist",
        "click .toggle-todos": "toggle_todos_display",
        "dblclick .name": "rename_list"
      },
      initialize: function (options) {
        // we wrap the call to remove in a closure so that we can spy on remove() in tests.
        this.model.on("destroy", function () { this.remove(); }, this);
        this.doneListView = null;
        this.controller = new TodolistController({view: this});
      },
      add_new_todo: function () {
        var text = this.$el.find(".new-todo-text").val();
        if (text) {
          this.controller.make_todo({text: text});
          this.$el.find(".new-todo-text").val("");
        }
      },
      add_new_todo_view_to_display: function (todoView) {
        this.$(".todos").append(todoView.render().el);
      },
      hide_done_todolist: function () {
        this.$el.find(".show-done-todolist").removeClass("hide");
        this.$el.find(".donelist").addClass("hide");
        this.$el.find(".hide-done-todolist").addClass("hide");
      },
      make_done_todolist: function () {
        return new DoneListView({model: this.model});
      },
      make_todo_view: function (todo) {
        return new ToDoView({model: todo});
      },
      make_todo_views: function (todolist) {
        var self = this;
        _.each(todolist.get("todos").models, function (todo) {
          if (!todo.get("complete")) {
            var todo_view = self.make_todo_view(todo);
            self.add_new_todo_view_to_display(todo_view);
          }
        });
      },
      remove_list: function () {
        this.controller.destroy_model();
      },
      rename_list: function () {
        var self = this,
          $modal = this.$el.find(".edit-list-name-modal");
        $modal.find(".list-old-name").text(this.model.get("name"));
        $modal.find(".list-new-name").attr("placeholder", this.model.get("name"));
        $modal.modal();
        //focus must be given after .modal() is called
        $modal.find(".list-new-name").focus();
        $modal.on("hide", function () {
          if ($modal.data("dosave")) {
            self.controller.rename_list($modal.find(".list-new-name").val());
            $modal.data("dosave", false);
            $modal.off("hide");
          }
          $modal.find(".list-new-name").val("");
        });
      },
      render: function () {
        var self = this;
        this.setElement(Mustache.render(this.template, this.model.attributes));
        this.model.fetchRelated("todos");
        return this;
      },
      save_and_close_edit_name_modal: function () {
        var $modal = this.$el.find(".edit-list-name-modal");
        if ($modal.find(".list-new-name").val()) {
          $modal.data("dosave", 1);
        }
        $modal.modal("hide");
      },
      set_list_name: function (name) {
        this.$(".name").text(name);
      },
      set_todo_count: function (count) {
        this.$(".todo-count").text(count);
      },
      show_done_todolist: function () {
        if (!this.doneListView) {
          this.doneListView = this.make_done_todolist();
          this.$el.find(".donelist").append(this.doneListView.render().$el);
        }
        this.$el.find(".show-done-todolist").addClass("hide");
        this.$el.find(".donelist").removeClass("hide");
        this.$el.find(".hide-done-todolist").removeClass("hide");
      },
      toggle_todos_display: function () {
        var $todos = this.$el.find(".todolist-details"),
          $toggle_icon = this.$el.find(".toggle-todos i");
        if ($todos.hasClass("hide")) {
          $toggle_icon.removeClass("icon-chevron-right");
          $toggle_icon.addClass("icon-chevron-down");
          $todos.removeClass("hide");
        }
        else {
          $toggle_icon.removeClass("icon-chevron-down");
          $toggle_icon.addClass("icon-chevron-right");
          $todos.addClass("hide");
        }
      },
      template: $("script#list_todolist").text()
    });
  });
