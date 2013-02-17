/* Copyright (C) 2013  The Boulevard Platform Inc.
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

define(["underscore", "backbone"],
function(_,            backbone) {

  // Based on the code for the View controller
  var Controller = function(options) {
    this._configure(options || {});
    this.initialize.apply(this, arguments);
  }

  // These options will be attached directly to the controller not just in options.
  var controllerOptions = ['model', 'collection', 'view']

  Controller.prototype = {
    // A copy of the backbone.View._configure function. We've just modified the "viewOptions" to be controllerOptions
    // so that the controller correctly grabs what it needs.
    _configure: function(options) {
      if (this.options) options = _.extend({}, this.options, options)
      for (var i = 0, l = controllerOptions.length; i < l; i++) {
        var attr = controllerOptions[i]
        if (options[attr]) this[attr] = options[attr]
      }
      if (this.view && this.view.model && !this.model) this.model = this.view.model
      this.options = options
    }
  }

  // This we're fine grabbing by reference rather than copying the code itself.
  Controller.extend = backbone.View.extend

  return Controller
});