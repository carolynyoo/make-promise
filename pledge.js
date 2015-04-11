/*----------------------------------------------------------------
Promises Workshop: build the pledge.js deferral-style promise library
----------------------------------------------------------------*/
// YOUR CODE HERE:

// Chapter 1

var $Promise = function () {
  this.state = 'pending';
};

var Deferral = function () {
  this.$promise = new $Promise();
};

var defer = function () {
  return new Deferral();
};

Deferral.prototype.resolve = function (data) {
  if (this.$promise.state === 'pending') {
    this.$promise.value = data;
    this.$promise.state = 'resolved';
  }
};

Deferral.prototype.reject = function (err) {
  if (this.$promise.state === 'pending') {
    this.$promise.value = err;
    this.$promise.state = 'rejected';
  }
};

// Chapter 2



/*-------------------------------------------------------
The spec was designed to work with Test'Em, so we don't
actually use module.exports. But here it is for reference:

module.exports = {
  defer: defer,
};

So in a Node-based project we could write things like this:

var pledge = require('pledge');
…
var myDeferral = pledge.defer();
var myPromise1 = myDeferral.$promise;
--------------------------------------------------------*/
