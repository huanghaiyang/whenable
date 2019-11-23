'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

var Elsable =
/*#__PURE__*/
function () {
  function Elsable(conditional) {
    _classCallCheck(this, Elsable);

    _defineProperty(this, "conditional", false);

    this.conditional = conditional;
  }

  _createClass(Elsable, [{
    key: "else",
    value: function _else(consumer) {
      if (this.conditional instanceof Promise) {
        this.conditional.then(function (result) {
          if (!result) {
            if (consumer) {
              consumer();
            }
          }
        });
      } else if (!this.conditional) {
        if (consumer) {
          consumer();
        }
      }
    }
  }]);

  return Elsable;
}();
var Thenable =
/*#__PURE__*/
function () {
  function Thenable(conditional) {
    _classCallCheck(this, Thenable);

    _defineProperty(this, "conditional", true);

    this.conditional = conditional;
  }

  _createClass(Thenable, [{
    key: "then",
    value: function then(consumer) {
      if (this.conditional instanceof Promise) {
        this.conditional.then(function (result) {
          if (result) {
            if (consumer) {
              consumer();
            }
          }
        });
      } else if (this.conditional) {
        if (consumer) {
          consumer();
        }
      }

      return new Elsable(this.conditional);
    }
  }]);

  return Thenable;
}();
function when(predicate) {
  var conditional;

  if (predicate instanceof Function) {
    conditional = predicate();
  } else {
    conditional = predicate;
  }

  return new Thenable(conditional);
}

exports.Elsable = Elsable;
exports.Thenable = Thenable;
exports.when = when;
