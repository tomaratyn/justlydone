/*
 * Copyright (C) 2012  The Boulevard Platform Inc.
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

define([ /* dependencies here */ ],
function(/* receive them as arguments here */) {
  // From J Resig's blogpost: http://ejohn.org/blog/objectgetprototypeof/
  if ( typeof Object.getPrototypeOf !== "function" ) {
    if ( typeof "test".__proto__ === "object" ) {
      Object.getPrototypeOf = function(object){
        return object.__proto__
      };
    } else {
      Object.getPrototypeOf = function(object){
        // May break if the constructor has been tampered with
        return object.constructor.prototype
      };
    }
  }
  return null
})