/*----------------------------------------------------------------
Promises Workshop: build the pledge.js deferral-style promise library
----------------------------------------------------------------*/
// YOUR CODE HERE:

var $Promise = function () {
  this.state = 'pending';
  this.handlerGroups = [];
};

$Promise.prototype.then = function (successCb, errorCb) {
  if (typeof successCb!=='function') {
    successCb = null; 
  }
  if (typeof errorCb!=='function') {
    errorCb = null;
  }
  this.handlerGroups.push({
    successCb: successCb, 
    errorCb: errorCb
  });
  if (this.state==='resolved') {
    this.callHandlers();
  }
};

$Promise.prototype.callHandlers = function () {
  return this.handlerGroups.shift().successCb(this.value);
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
    // iffy 
    for (var i=0; i<this.$promise.handlerGroups.length; i++) {
      this.$promise.callHandlers();
    }
  }
};

Deferral.prototype.reject = function (err) {
  if (this.$promise.state === 'pending') {
    this.$promise.value = err;
    this.$promise.state = 'rejected';
  }
};

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
