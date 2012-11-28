/* This file is used to tell buster where to send GET requests.
 * Currently we don't use this as the proxying isn't yet in the released
 * version of buster.
 * Copy this file to make your own testing host information.
 * Call it `testing_host.js` */

define([], function() {
  //Change the below to match your server:
  return {host: "http://localhost:8000"}
})
