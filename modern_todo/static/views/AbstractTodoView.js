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

define([ "backbone-relational", "humane", "object_get_prototype_monkeypatch"],
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
      var options = {silent:true}
      if (this.$el.find(".done").is(":checked")) {
        this.model.set({"complete": true}, options)
      }
      else {
        this.model.set({"complete": false}, options)
      }
      this.model.save()
    }
  })
})