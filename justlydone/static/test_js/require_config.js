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

var require = {
//  baseUrl: "../resources/",
  /* for buster test -po use: */
  baseUrl: "../static/",
  shim: {
    "backbone": {
      deps: ["jquery", "underscore"],
      exports: "Backbone"
    },
    "backbone-tastypie": {
      deps: ["backbone"],
      exports: "Backbone"
    },
    "backbone-relational": {
      deps: ["backbone-tastypie"],
      exports: "Backbone"
    },
    "bootstrap": {deps: ["jquery"]},
    "humane": {deps: ["jquery"]},
    "jquery": {exports: "$"},
    "mustache": {exports: "Mustache"},
    "underscore": {exports: "_"}
  },
  paths: {
    "backbone": "backbone-0.9.2",
    "backbone-tastypie": "test_js/backbone-tastypie",
    "backbone-relational": "backbone-relational.head",
    "bootstrap": "bootstrap-2.1.0/js/bootstrap",
    "humane": "humane-custom",
    "jquery": "jquery-1.8.0",
    "mustache": "mustache-0.7.0",
    "underscore": "underscore-1.4.2",
    "when": "when-1.6.0"
  }
}
