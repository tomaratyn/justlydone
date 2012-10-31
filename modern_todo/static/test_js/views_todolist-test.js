define(["jquery", "when", "models/todolist", "views/todolist"],
function($,        when,   todolist_model,    todolist_view ) {
  buster.testCase("views todolist rename list", {
    setUp: function() {
      this.useFakeServer()
      this.todolist = new todolist_model({name:"my todolist"})
      this.view = new todolist_view({model: this.todolist})
      this.view.template =
        "<div>" +
        "<span class='name'>{{name}}</span>" +
        "<div data-dosave='1' class='edit-list-name-modal modal'><i class='list-old-name'></i><input class='list-new-name' type='text'></div>" +
        "</div>"
      this.$el = this.view.render().$el
    },
    tearDown: function () {
      this.$el.remove()
    },
    test_rename_list: function() {
      var self = this
      var new_name = "new name"
      var deferred = when.defer()
      this.todolist.on("change:name", function() {
        buster.assert.same(new_name, self.todolist.attributes.name)
        deferred.resolver.resolve()
      })
      this.$el.find(".name").trigger("dblclick")
      buster.assert.same(this.$el.find(".list-old-name").text(), this.todolist.attributes.name)
      this.$el.find(".list-new-name").val(new_name)
      this.$el.find(".edit-list-name-modal").modal("hide")
      return deferred.promise
    }
  })
})