/* */ 
var $ = require("./$"),
    global = require("./$.global"),
    isRegExp = require("./$.is-regexp"),
    $flags = require("./$.flags"),
    $RegExp = global.RegExp,
    Base = $RegExp,
    proto = $RegExp.prototype,
    re1 = /a/g,
    re2 = /a/g,
    CORRECT_NEW = new $RegExp(re1) !== re1;
if (require("./$.support-desc") && (!CORRECT_NEW || require("./$.fails")(function() {
  re2[require("./$.wks")('match')] = false;
  return $RegExp(re1) != re1 || $RegExp(re2) == re2 || $RegExp(re1, 'i') != '/a/i';
}))) {
  $RegExp = function RegExp(p, f) {
    var piRE = isRegExp(p),
        fiU = f === undefined;
    return !(this instanceof $RegExp) && piRE && p.constructor === $RegExp && fiU ? p : CORRECT_NEW ? new Base(piRE && !fiU ? p.source : p, f) : Base((piRE = p instanceof $RegExp) ? p.source : p, piRE && fiU ? $flags.call(p) : f);
  };
  $.each.call($.getNames(Base), function(key) {
    key in $RegExp || $.setDesc($RegExp, key, {
      configurable: true,
      get: function() {
        return Base[key];
      },
      set: function(it) {
        Base[key] = it;
      }
    });
  });
  proto.constructor = $RegExp;
  $RegExp.prototype = proto;
  require("./$.redef")(global, 'RegExp', $RegExp);
}
require("./$.species")($RegExp);
