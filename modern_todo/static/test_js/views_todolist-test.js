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
        "<div class='edit-list-name-modal modal'>" +
        "<i class='list-old-name'></i>" +
        "<input class='list-new-name' type='text'>" +
        "<button class='save'>" +
        "</div>" +
        "</div>"
      this.$el = this.view.render().$el
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
      this.$el.find(".edit-list-name-modal .save").trigger("click")
      return deferred.promise
    },
    test_modal_save_button: function() {
      var deferred = when.defer()
      var self = this
      var $modal = this.$el.find(".edit-list-name-modal")
      var $save = $modal.find(".save")
      var assert_called_hide = function(){
        buster.assert.same(undefined, $modal.data("dosave"))
        $modal.off("hide", assert_called_hide)
        $modal.find(".list-new-name").val("foo")
        $modal.on("hide", function() {
          buster.assert.same(1, $modal.data("dosave"))
          deferred.resolver.resolve()
        })
        $save.trigger("click")
      }
      $modal.on("hide", assert_called_hide)
      $save.trigger("click")
      return deferred.promise
    }
  })
})