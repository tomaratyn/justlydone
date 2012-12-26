define([ "backbone-relational", "humane"],
function(Backbone) {
  return Backbone.View.extend({
    humanize_times: function() {
      this.$el.find("time").humaneDates()
    }
  })
})