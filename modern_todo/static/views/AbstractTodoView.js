define([ "backbone-relational", "humane"],
function(Backbone) {
  return Backbone.View.extend({
    initialize: function() {
      // we wrap the call to remove in a closure so that we can spy on remove() in tests.
      this.model.on("destroy", function() { this.remove() }, this)
    },
    click_delete_todo: function() {
      this.model.destroy()
    },
    humanize_times: function() {
      this.$el.find("time").humaneDates()
    },
    make_done: function () {
      if (this.$el.find(".done").is(":checked")) {
        this.model.set({"complete": true})
      }
      else {
        this.model.set({"complete": false})
      }
      this.model.save()
    }
  })
})