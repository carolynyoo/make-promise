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
    this.callHandlers('success');
  }
  if (this.state==='rejected') {
    this.callHandlers('error');
  }
};

$Promise.prototype.callHandlers = function (type) {
  if (type==='success' && this.handlerGroups[0].successCb) {
    return this.handlerGroups.shift().successCb(this.value);
  } else if (type==='error' && this.handlerGroups[0].errorCb) {
    return this.handlerGroups.shift().errorCb(this.value);
  } else {
    return 'error';
  }
};

$Promise.prototype.catch = function (func) {
  this.then(null, func);
}

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
    // note - garbage collection of handlerGroups/array shift had you save this variable separately
    var len = this.$promise.handlerGroups.length;
    for (var i=0; i<len; i++) {
      this.$promise.callHandlers('success');
    }
  }
};

Deferral.prototype.reject = function (err) {
  if (this.$promise.state === 'pending') {
    this.$promise.value = err;
    this.$promise.state = 'rejected';
    var len = this.$promise.handlerGroups.length;
    for (var i=0; i<len; i++) {
      this.$promise.callHandlers('error');
    }
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
