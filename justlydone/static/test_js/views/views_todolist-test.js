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

define(["underscore", "jquery", "when", "test_js/FakeServerConfigurator", "models/todolist", "models/todo", "views/todolist"],
  function (_,            $,        when,   FakeServerConfigurator,           TodoListModel,    ToDoModel,     TodoListView) {
    "use strict";
    buster.testCase("views todolist", {
      setUp: function () {
        FakeServerConfigurator.enableFakeServer(this);
        this.todolist = new TodoListModel({name: "my todolist"});
        this.view = new TodoListView({model: this.todolist});
        this.view.template =
          "<div>" +
          "<span class='name'>{{name}}</span>" +
          "<span class='todo-count'></span>" +
          "<input type='text'class='new-todo-text'>" +
          "<button class='add-new-todo'></button>" +
          "<div class='edit-list-name-modal modal'>" +
          "<i class='list-old-name'></i>" +
          "<input class='list-new-name' type='text'>" +
          "<button class='save'></button>" +
          "<button class='show-done-todolist'></button>" +
          "</div>" +
          "<ul class='todos'>" +
          "</ul>" +
          "<ul class='donetodos'>" +
          "</ul>" +
          "</div>";
        this.$el = this.view.render().$el;
      },
      add_new_todo: {
        "add_todo": function () {
          var new_todo_name = "Lorem Ipsum",
            $add_todo = this.$el.find(".add-new-todo"),
            $new_todo_textbox = this.$el.find(".new-todo-text");
          this.stub(this.view.controller, "make_todo");
          $new_todo_textbox.val(new_todo_name);
          $add_todo.trigger("click");
          buster.assert.calledOnce(this.view.controller.make_todo);
        },
        dont_add_empty: function () {
          var $add_todo = this.$el.find(".add-new-todo"),
            $new_todo_textbox = this.$el.find(".new-todo-text");
          this.stub(this.view.controller, "make_todo");
          $new_todo_textbox.val("");
          $add_todo.trigger("click");
          buster.refute.called(this.view.controller.make_todo);
        }
      },
      "rename list" : {
        "happy day": function () {
          var new_name = "new name",
            deferred = when.defer();
          this.todolist.on("change:name", function (todolist, name, options) {
            buster.assert.same(new_name, name);
            deferred.resolver.resolve();
          });
          this.$el.find(".name").trigger("dblclick");
          buster.assert.same(this.$el.find(".list-old-name").text(), this.todolist.get("name"));
          this.$el.find(".list-new-name").val(new_name);
          this.$el.find(".edit-list-name-modal .save").trigger("click");
          return deferred.promise;
        },
        "detailed interaction test": function () {
          var deferred = when.defer(),
            $modal = this.$el.find(".edit-list-name-modal"),
            $save = $modal.find(".save"),
            assert_called_hide = function () {
              buster.assert.same(undefined, $modal.data("dosave"));
              $modal.off("hide", assert_called_hide);
              $modal.find(".list-new-name").val("foo");
              $modal.on("hide", function () {
                buster.assert.same(1, $modal.data("dosave"));
                deferred.resolver.resolve();
              });
              $save.trigger("click");
            };
          $modal.on("hide", assert_called_hide);
          $save.trigger("click");
          return deferred.promise;
        }
      },
      "done todolist interaction": {
        "check click creates a done todolist": function () {
          this.spy(this.view, "make_done_todolist");
          this.$el.find(".show-done-todolist").click();
          buster.assert.called(this.view.make_done_todolist);
        },
        "don't trigger twice": function () {
          this.spy(this.view, "make_done_todolist");
          this.$el.find(".show-done-todolist").click();
          buster.assert.called(this.view.make_done_todolist);
          this.$el.find(".show-done-todolist").click();
          buster.assert.equals(1, this.view.make_done_todolist.callCount);
        }
      },
      "test remove view on model removal": function () {
        this.spy(this.view, "remove");
        this.view.model.trigger("destroy", this.view.model);
        buster.assert.calledOnce(this.view.remove);
      },
      "tests with todos": {
        setUp: function () {
          var deferred = when.defer(),
            self = this,
            id = 99,
            keys = ["complete", "id", "resource_uri", "creation_datetime", "text"];
          this.sandbox.server.autoRespond = true;
          this.sandbox.server.respondWith(/todolist\/?$/, function (xhr) {
            xhr.respond(201, { "Content-Type": "application/json" }, JSON.stringify({
              "creation_datetime": "2012-12-20T22:37:32.580887+00:00",
              "id": "88",
              "name": "test",
              //"owner": "/api/testing/user/1/",
              "resource_uri": "/api/testing/todolist/88/",
              "todos": []
            }));
          });
          this.sandbox.server.respondWith(/todo\/?$/, function (xhr) {
            id = id + 1;
            var text = JSON.stringify({
              "complete": false,
              "completion_datetime": null,
              "creation_datetime": "2012-12-15T20:24:16.415315+00:00",
              "id": id,
              "list": "/api/testing/todolist/88/",
              "resource_uri": "/api/testing/todo/" + id + "/",
              "text": "lorem ipsum"
            });
            xhr.respond(201, { "Content-Type": "application/json" }, text);
          });
          this.sandbox.server.respondWith(/todo\/set\//, function (xhr) {
            var response = JSON.stringify({
                "objects": _.map([self.todo1, self.todo2, self.todo3],
                  function (todo) {
                    return _.pick(todo.attributes, keys);
                  })
              });
            xhr.respond(200, { "Content-Type": "application/json" }, response);
          });
          this.view.model.save().then(function () {
            self.todo1 = new ToDoModel({text: "lorem ipsum", list: self.view.model});
            self.todo1.save().then(function () {
              self.todo2 = new ToDoModel({text: "lorem ipsum", list: self.view.model});
              self.todo2.save().then(function () {
                self.todo3 = new ToDoModel({text: "lorem ipsum", list: self.view.model});
                self.todo3.save().then(function () {
                  deferred.resolver.resolve();
                });
              });
            });
          });
          return deferred.promise;
        },
        "update todo count": {
          "on add": function () {
            var self = this,
              deferred = when.defer(),
              starting_text_todo_count = this.$el.find(".todo-count").text(),
              starting_model_todo_count = this.view.model.attributes.todos.length;
            buster.assert.equals(parseInt(starting_text_todo_count, 10), starting_model_todo_count);
            this.view.model.on("add:todos", function () {
              setTimeout(function () {
                buster.assert.equals(parseInt(self.$el.find(".todo-count").text(), 10), self.view.model.attributes.todos.length);
                buster.assert.equals(starting_model_todo_count + 1, self.view.model.attributes.todos.length);
                deferred.resolver.resolve();
              }, 10);
            });
            new ToDoModel({text: "going to trigger the tested code", list: this.view.model});
            return deferred.promise;
          },
          "on delete": function () {
            var self = this,
              deferred = when.defer(),
              starting_text_todo_count = this.$el.find(".todo-count").text(),
              starting_model_todo_count = this.view.model.attributes.todos.length;
            buster.assert.equals(parseInt(starting_text_todo_count, 10), starting_model_todo_count);
            this.view.model.on("remove:todos", function () {
              setTimeout(function () {
                buster.assert.equals(parseInt(self.$el.find(".todo-count").text(), 10), self.view.model.attributes.todos.length);
                buster.assert.equals(starting_model_todo_count - 1, self.view.model.attributes.todos.length);
                deferred.resolver.resolve();
              }, 10);
            });
            this.todo3.destroy();
            return deferred.promise;
          }
        },
        "make_todo_views": function () {
          this.spy(this.view, "make_todo_view");
          this.view.make_todo_views(this.view.model);
          buster.assert.equals(3, this.view.make_todo_view.callCount);
          this.todo3.set("complete", true);
          this.view.make_todo_views(this.view.model);
          buster.assert.equals(3 + 2, this.view.make_todo_view.callCount);
        }
      }
    });
  });