/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "../../node_modules/match-sorter/dist/match-sorter.esm.js":
/*!****************************************************************!*\
  !*** ../../node_modules/match-sorter/dist/match-sorter.esm.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   defaultBaseSortFn: () => (/* binding */ defaultBaseSortFn),
/* harmony export */   getItemValues: () => (/* binding */ getItemValues),
/* harmony export */   matchSorter: () => (/* binding */ matchSorter),
/* harmony export */   matchSorterWithRankInfo: () => (/* binding */ matchSorterWithRankInfo),
/* harmony export */   rankings: () => (/* binding */ rankings)
/* harmony export */ });
/* harmony import */ var remove_accents__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! remove-accents */ "../../node_modules/remove-accents/index.js");
/* harmony import */ var remove_accents__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(remove_accents__WEBPACK_IMPORTED_MODULE_0__);
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
var _marked = /*#__PURE__*/_regeneratorRuntime().mark(indexesOf);
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }


/**
 * @name match-sorter
 * @license MIT license.
 * @copyright (c) 2020 Kent C. Dodds
 * @author Kent C. Dodds <me@kentcdodds.com> (https://kentcdodds.com)
 */
var rankings = {
  CASE_SENSITIVE_EQUAL: 7,
  EQUAL: 6,
  STARTS_WITH: 5,
  WORD_STARTS_WITH: 4,
  CONTAINS: 3,
  ACRONYM: 2,
  MATCHES: 1,
  NO_MATCH: 0
};
var defaultBaseSortFn = function defaultBaseSortFn(a, b) {
  return String(a.rankedValue).localeCompare(String(b.rankedValue));
};

/**
 * Takes an array of items and a value and returns a new array with the items that match the given value
 * @param {Array} items - the items to sort
 * @param {String} value - the value to use for ranking
 * @param {Object} options - Some options to configure the sorter
 * @return {Array} - the new sorted array
 */
function matchSorter(items, value) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return getRankedItems(items, value, options).map(function (_ref) {
    var item = _ref.item;
    return item;
  });
}

/**
 * Takes an array of items and a value and returns ranked items with metadata attached
 * @param {Array} items - the items to sort
 * @param {String} value - the value to use for ranking
 * @param {Object} options - Some options to configure the sorter
 * @return {Array} - the new ranked array
 */
function matchSorterWithRankInfo(items, value) {
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  return getRankedItems(items, value, options);
}
function getRankedItems(items, value, options) {
  var keys = options.keys,
    _options$threshold = options.threshold,
    threshold = _options$threshold === void 0 ? rankings.MATCHES : _options$threshold,
    _options$baseSort = options.baseSort,
    baseSort = _options$baseSort === void 0 ? defaultBaseSortFn : _options$baseSort,
    _options$sorter = options.sorter,
    sorter = _options$sorter === void 0 ? function (matchedItems) {
      return matchedItems.sort(function (a, b) {
        return sortRankedValues(a, b, baseSort);
      });
    } : _options$sorter;
  var matchedItems = items.reduce(reduceItemsToRanked, []);
  return sorter(matchedItems);
  function reduceItemsToRanked(matches, item, index) {
    var rankingInfo = getHighestRanking(item, keys, value, options);
    var rank = rankingInfo.rank,
      _rankingInfo$keyThres = rankingInfo.keyThreshold,
      keyThreshold = _rankingInfo$keyThres === void 0 ? threshold : _rankingInfo$keyThres;
    if (rank >= keyThreshold) {
      matches.push(_extends({}, rankingInfo, {
        item: item,
        index: index
      }));
    }
    return matches;
  }
}
matchSorter.rankings = rankings;
matchSorterWithRankInfo.rankings = rankings;

/**
 * Gets the highest ranking for value for the given item based on its values for the given keys
 * @param {*} item - the item to rank
 * @param {Array} keys - the keys to get values from the item for the ranking
 * @param {String} value - the value to rank against
 * @param {Object} options - options to control the ranking
 * @return {{rank: Number, keyIndex: Number, keyThreshold: Number}} - the highest ranking
 */
function getHighestRanking(item, keys, value, options) {
  if (!keys) {
    // if keys is not specified, then we assume the item given is ready to be matched
    var stringItem = item;
    return {
      // ends up being duplicate of 'item' in matches but consistent
      rankedValue: stringItem,
      rank: getMatchRanking(stringItem, value, options),
      keyIndex: -1,
      keyThreshold: options.threshold
    };
  }
  var valuesToRank = getAllValuesToRank(item, keys);
  return valuesToRank.reduce(function (_ref2, _ref3, i) {
    var rank = _ref2.rank,
      rankedValue = _ref2.rankedValue,
      keyIndex = _ref2.keyIndex,
      keyThreshold = _ref2.keyThreshold;
    var itemValue = _ref3.itemValue,
      attributes = _ref3.attributes;
    var newRank = getMatchRanking(itemValue, value, options);
    var newRankedValue = rankedValue;
    var minRanking = attributes.minRanking,
      maxRanking = attributes.maxRanking,
      threshold = attributes.threshold;
    if (newRank < minRanking && newRank >= rankings.MATCHES) {
      newRank = minRanking;
    } else if (newRank > maxRanking) {
      newRank = maxRanking;
    }
    if (newRank > rank) {
      rank = newRank;
      keyIndex = i;
      keyThreshold = threshold;
      newRankedValue = itemValue;
    }
    return {
      rankedValue: newRankedValue,
      rank: rank,
      keyIndex: keyIndex,
      keyThreshold: keyThreshold
    };
  }, {
    rankedValue: item,
    rank: rankings.NO_MATCH,
    keyIndex: -1,
    keyThreshold: options.threshold
  });
}
function indexesOf(testString, stringToRank) {
  var index;
  return _regeneratorRuntime().wrap(function indexesOf$(_context) {
    while (1) switch (_context.prev = _context.next) {
      case 0:
        index = -1;
      case 1:
        if (!((index = testString.indexOf(stringToRank, index + 1)) > -1)) {
          _context.next = 6;
          break;
        }
        _context.next = 4;
        return index;
      case 4:
        _context.next = 1;
        break;
      case 6:
        return _context.abrupt("return", -1);
      case 7:
      case "end":
        return _context.stop();
    }
  }, _marked);
}

/**
 * Gives a rankings score based on how well the two strings match.
 * @param {String} testString - the string to test against
 * @param {String} stringToRank - the string to rank
 * @param {Object} options - options for the match (like keepDiacritics for comparison)
 * @returns {Number} the ranking for how well stringToRank matches testString
 */
function getMatchRanking(testString, stringToRank, options) {
  testString = prepareValueForComparison(testString, options);
  stringToRank = prepareValueForComparison(stringToRank, options);

  // too long
  if (stringToRank.length > testString.length) {
    return rankings.NO_MATCH;
  }

  // case sensitive equals
  if (testString === stringToRank) {
    return rankings.CASE_SENSITIVE_EQUAL;
  }

  // Lower casing before further comparison
  testString = testString.toLowerCase();
  stringToRank = stringToRank.toLowerCase();

  // Use indexOf to check for equality/includes
  var indexesOfStringToRankInTestString = indexesOf(testString, stringToRank);
  var firstIndexOfStringToRankInTestStringResult = indexesOfStringToRankInTestString.next();
  var indexOfStringToRankInTestString = firstIndexOfStringToRankInTestStringResult.value;

  // case insensitive equals
  if (testString.length === stringToRank.length && indexOfStringToRankInTestString === 0) {
    return rankings.EQUAL;
  }

  // starts with
  if (indexOfStringToRankInTestString === 0) {
    return rankings.STARTS_WITH;
  }

  // word starts with
  var indexOfStringToRankInTestStringResult = firstIndexOfStringToRankInTestStringResult;
  while (!indexOfStringToRankInTestStringResult.done) {
    if (indexOfStringToRankInTestStringResult.value > 0 && testString[indexOfStringToRankInTestStringResult.value - 1] === ' ') {
      return rankings.WORD_STARTS_WITH;
    }
    indexOfStringToRankInTestStringResult = indexesOfStringToRankInTestString.next();
  }

  // contains
  if (indexOfStringToRankInTestString > 0) {
    return rankings.CONTAINS;
  } else if (stringToRank.length === 1) {
    // If the only character in the given stringToRank
    //   isn't even contained in the testString, then
    //   it's definitely not a match.
    return rankings.NO_MATCH;
  }

  // acronym
  if (getAcronym(testString).includes(stringToRank)) {
    return rankings.ACRONYM;
  }

  // will return a number between rankings.MATCHES and
  // rankings.MATCHES + 1 depending  on how close of a match it is.
  return getClosenessRanking(testString, stringToRank);
}

/**
 * Generates an acronym for a string.
 *
 * Segment starts ︱ at the beginning of the phrase, after a **space**, or after a **hyphen**.
 * We capture the first non-delimiter character of every segment and skip runs of delimiters.
 *
 * @example
 *   getAcronym('The Tail-spin Test')  // → "TTsT"
 *   getAcronym('edge-case')           // → "ec"
 *   getAcronym('multiple  spaces')    // → "ms"
 *
 * @param {String} string the string for which to produce the acronym
 * @returns {String} the acronym
 */
function getAcronym(string) {
  var acronym = '';
  var prev = ' '; // virtual delimiter so the very first char qualifies

  for (var i = 0; i < string.length; i++) {
    var ch = string.charAt(i);
    var prevWasDelimiter = prev === ' ' || prev === '-';
    var currIsDelimiter = ch === ' ' || ch === '-';
    if (prevWasDelimiter && !currIsDelimiter) {
      acronym += ch;
    }
    prev = ch;
  }
  return acronym;
}

/**
 * Returns a score based on how spread apart the
 * characters from the stringToRank are within the testString.
 * A number close to rankings.MATCHES represents a loose match. A number close
 * to rankings.MATCHES + 1 represents a tighter match.
 * @param {String} testString - the string to test against
 * @param {String} stringToRank - the string to rank
 * @returns {Number} the number between rankings.MATCHES and
 * rankings.MATCHES + 1 for how well stringToRank matches testString
 */
function getClosenessRanking(testString, stringToRank) {
  var matchingInOrderCharCount = 0;
  var charNumber = 0;
  function findMatchingCharacter(matchChar, string, index) {
    for (var j = index, J = string.length; j < J; j++) {
      var stringChar = string[j];
      if (stringChar === matchChar) {
        matchingInOrderCharCount += 1;
        return j + 1;
      }
    }
    return -1;
  }
  function getRanking(spread) {
    var spreadPercentage = 1 / spread;
    var inOrderPercentage = matchingInOrderCharCount / stringToRank.length;
    var ranking = rankings.MATCHES + inOrderPercentage * spreadPercentage;
    return ranking;
  }
  var firstIndex = findMatchingCharacter(stringToRank[0], testString, 0);
  if (firstIndex < 0) {
    return rankings.NO_MATCH;
  }
  charNumber = firstIndex;
  for (var i = 1, I = stringToRank.length; i < I; i++) {
    var matchChar = stringToRank[i];
    charNumber = findMatchingCharacter(matchChar, testString, charNumber);
    var found = charNumber > -1;
    if (!found) {
      return rankings.NO_MATCH;
    }
  }
  var spread = charNumber - firstIndex;
  return getRanking(spread);
}

/**
 * Sorts items that have a rank, index, and keyIndex
 * @param {Object} a - the first item to sort
 * @param {Object} b - the second item to sort
 * @return {Number} -1 if a should come first, 1 if b should come first, 0 if equal
 */
function sortRankedValues(a, b, baseSort) {
  var aFirst = -1;
  var bFirst = 1;
  var aRank = a.rank,
    aKeyIndex = a.keyIndex;
  var bRank = b.rank,
    bKeyIndex = b.keyIndex;
  var same = aRank === bRank;
  if (same) {
    if (aKeyIndex === bKeyIndex) {
      // use the base sort function as a tie-breaker
      return baseSort(a, b);
    } else {
      return aKeyIndex < bKeyIndex ? aFirst : bFirst;
    }
  } else {
    return aRank > bRank ? aFirst : bFirst;
  }
}

/**
 * Prepares value for comparison by stringifying it, removing diacritics (if specified)
 * @param {String} value - the value to clean
 * @param {Object} options - {keepDiacritics: whether to remove diacritics}
 * @return {String} the prepared value
 */
function prepareValueForComparison(value, _ref4) {
  var keepDiacritics = _ref4.keepDiacritics;
  // value might not actually be a string at this point (we don't get to choose)
  // so part of preparing the value for comparison is ensure that it is a string
  value = "".concat(value); // toString
  if (!keepDiacritics) {
    value = remove_accents__WEBPACK_IMPORTED_MODULE_0___default()(value);
  }
  return value;
}

/**
 * Gets value for key in item at arbitrarily nested keypath
 * @param {Object} item - the item
 * @param {Object|Function} key - the potentially nested keypath or property callback
 * @return {Array} - an array containing the value(s) at the nested keypath
 */
function getItemValues(item, key) {
  if (_typeof(key) === 'object') {
    key = key.key;
  }
  var value;
  if (typeof key === 'function') {
    value = key(item);
  } else if (item == null) {
    value = null;
  } else if (Object.hasOwnProperty.call(item, key)) {
    value = item[key];
  } else if (key.includes('.')) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    return getNestedValues(key, item);
  } else {
    value = null;
  }

  // because `value` can also be undefined
  if (value == null) {
    return [];
  }
  if (Array.isArray(value)) {
    return value;
  }
  return [String(value)];
}

/**
 * Given path: "foo.bar.baz"
 * And item: {foo: {bar: {baz: 'buzz'}}}
 *   -> 'buzz'
 * @param path a dot-separated set of keys
 * @param item the item to get the value from
 */
function getNestedValues(path, item) {
  var keys = path.split('.');
  var values = [item];
  for (var i = 0, I = keys.length; i < I; i++) {
    var nestedKey = keys[i];
    var nestedValues = [];
    for (var j = 0, J = values.length; j < J; j++) {
      var nestedItem = values[j];
      if (nestedItem == null) continue;
      if (Object.hasOwnProperty.call(nestedItem, nestedKey)) {
        var nestedValue = nestedItem[nestedKey];
        if (nestedValue != null) {
          nestedValues.push(nestedValue);
        }
      } else if (nestedKey === '*') {
        // ensure that values is an array
        nestedValues = nestedValues.concat(nestedItem);
      }
    }
    values = nestedValues;
  }
  if (Array.isArray(values[0])) {
    // keep allowing the implicit wildcard for an array of strings at the end of
    // the path; don't use `.flat()` because that's not available in node.js v10
    var result = [];
    return result.concat.apply(result, _toConsumableArray(values));
  }
  // Based on our logic it should be an array of strings by now...
  // assuming the user's path terminated in strings
  return values;
}

/**
 * Gets all the values for the given keys in the given item and returns an array of those values
 * @param item - the item from which the values will be retrieved
 * @param keys - the keys to use to retrieve the values
 * @return objects with {itemValue, attributes}
 */
function getAllValuesToRank(item, keys) {
  var allValues = [];
  for (var j = 0, J = keys.length; j < J; j++) {
    var key = keys[j];
    var attributes = getKeyAttributes(key);
    var itemValues = getItemValues(item, key);
    for (var i = 0, I = itemValues.length; i < I; i++) {
      allValues.push({
        itemValue: itemValues[i],
        attributes: attributes
      });
    }
  }
  return allValues;
}
var defaultKeyAttributes = {
  maxRanking: Infinity,
  minRanking: -Infinity
};
/**
 * Gets all the attributes for the given key
 * @param key - the key from which the attributes will be retrieved
 * @return object containing the key's attributes
 */
function getKeyAttributes(key) {
  if (typeof key === 'string') {
    return defaultKeyAttributes;
  }
  return _extends({}, defaultKeyAttributes, key);
}

/*
eslint
  no-continue: "off",
*/



/***/ }),

/***/ "../../node_modules/remove-accents/index.js":
/*!**************************************************!*\
  !*** ../../node_modules/remove-accents/index.js ***!
  \**************************************************/
/***/ ((module) => {

var characterMap = {
  "À": "A",
  "Á": "A",
  "Â": "A",
  "Ã": "A",
  "Ä": "A",
  "Å": "A",
  "Ấ": "A",
  "Ắ": "A",
  "Ẳ": "A",
  "Ẵ": "A",
  "Ặ": "A",
  "Æ": "AE",
  "Ầ": "A",
  "Ằ": "A",
  "Ȃ": "A",
  "Ả": "A",
  "Ạ": "A",
  "Ẩ": "A",
  "Ẫ": "A",
  "Ậ": "A",
  "Ç": "C",
  "Ḉ": "C",
  "È": "E",
  "É": "E",
  "Ê": "E",
  "Ë": "E",
  "Ế": "E",
  "Ḗ": "E",
  "Ề": "E",
  "Ḕ": "E",
  "Ḝ": "E",
  "Ȇ": "E",
  "Ẻ": "E",
  "Ẽ": "E",
  "Ẹ": "E",
  "Ể": "E",
  "Ễ": "E",
  "Ệ": "E",
  "Ì": "I",
  "Í": "I",
  "Î": "I",
  "Ï": "I",
  "Ḯ": "I",
  "Ȋ": "I",
  "Ỉ": "I",
  "Ị": "I",
  "Ð": "D",
  "Ñ": "N",
  "Ò": "O",
  "Ó": "O",
  "Ô": "O",
  "Õ": "O",
  "Ö": "O",
  "Ø": "O",
  "Ố": "O",
  "Ṍ": "O",
  "Ṓ": "O",
  "Ȏ": "O",
  "Ỏ": "O",
  "Ọ": "O",
  "Ổ": "O",
  "Ỗ": "O",
  "Ộ": "O",
  "Ờ": "O",
  "Ở": "O",
  "Ỡ": "O",
  "Ớ": "O",
  "Ợ": "O",
  "Ù": "U",
  "Ú": "U",
  "Û": "U",
  "Ü": "U",
  "Ủ": "U",
  "Ụ": "U",
  "Ử": "U",
  "Ữ": "U",
  "Ự": "U",
  "Ý": "Y",
  "à": "a",
  "á": "a",
  "â": "a",
  "ã": "a",
  "ä": "a",
  "å": "a",
  "ấ": "a",
  "ắ": "a",
  "ẳ": "a",
  "ẵ": "a",
  "ặ": "a",
  "æ": "ae",
  "ầ": "a",
  "ằ": "a",
  "ȃ": "a",
  "ả": "a",
  "ạ": "a",
  "ẩ": "a",
  "ẫ": "a",
  "ậ": "a",
  "ç": "c",
  "ḉ": "c",
  "è": "e",
  "é": "e",
  "ê": "e",
  "ë": "e",
  "ế": "e",
  "ḗ": "e",
  "ề": "e",
  "ḕ": "e",
  "ḝ": "e",
  "ȇ": "e",
  "ẻ": "e",
  "ẽ": "e",
  "ẹ": "e",
  "ể": "e",
  "ễ": "e",
  "ệ": "e",
  "ì": "i",
  "í": "i",
  "î": "i",
  "ï": "i",
  "ḯ": "i",
  "ȋ": "i",
  "ỉ": "i",
  "ị": "i",
  "ð": "d",
  "ñ": "n",
  "ò": "o",
  "ó": "o",
  "ô": "o",
  "õ": "o",
  "ö": "o",
  "ø": "o",
  "ố": "o",
  "ṍ": "o",
  "ṓ": "o",
  "ȏ": "o",
  "ỏ": "o",
  "ọ": "o",
  "ổ": "o",
  "ỗ": "o",
  "ộ": "o",
  "ờ": "o",
  "ở": "o",
  "ỡ": "o",
  "ớ": "o",
  "ợ": "o",
  "ù": "u",
  "ú": "u",
  "û": "u",
  "ü": "u",
  "ủ": "u",
  "ụ": "u",
  "ử": "u",
  "ữ": "u",
  "ự": "u",
  "ý": "y",
  "ÿ": "y",
  "Ā": "A",
  "ā": "a",
  "Ă": "A",
  "ă": "a",
  "Ą": "A",
  "ą": "a",
  "Ć": "C",
  "ć": "c",
  "Ĉ": "C",
  "ĉ": "c",
  "Ċ": "C",
  "ċ": "c",
  "Č": "C",
  "č": "c",
  "C̆": "C",
  "c̆": "c",
  "Ď": "D",
  "ď": "d",
  "Đ": "D",
  "đ": "d",
  "Ē": "E",
  "ē": "e",
  "Ĕ": "E",
  "ĕ": "e",
  "Ė": "E",
  "ė": "e",
  "Ę": "E",
  "ę": "e",
  "Ě": "E",
  "ě": "e",
  "Ĝ": "G",
  "Ǵ": "G",
  "ĝ": "g",
  "ǵ": "g",
  "Ğ": "G",
  "ğ": "g",
  "Ġ": "G",
  "ġ": "g",
  "Ģ": "G",
  "ģ": "g",
  "Ĥ": "H",
  "ĥ": "h",
  "Ħ": "H",
  "ħ": "h",
  "Ḫ": "H",
  "ḫ": "h",
  "Ĩ": "I",
  "ĩ": "i",
  "Ī": "I",
  "ī": "i",
  "Ĭ": "I",
  "ĭ": "i",
  "Į": "I",
  "į": "i",
  "İ": "I",
  "ı": "i",
  "Ĳ": "IJ",
  "ĳ": "ij",
  "Ĵ": "J",
  "ĵ": "j",
  "Ķ": "K",
  "ķ": "k",
  "Ḱ": "K",
  "ḱ": "k",
  "K̆": "K",
  "k̆": "k",
  "Ĺ": "L",
  "ĺ": "l",
  "Ļ": "L",
  "ļ": "l",
  "Ľ": "L",
  "ľ": "l",
  "Ŀ": "L",
  "ŀ": "l",
  "Ł": "l",
  "ł": "l",
  "Ḿ": "M",
  "ḿ": "m",
  "M̆": "M",
  "m̆": "m",
  "Ń": "N",
  "ń": "n",
  "Ņ": "N",
  "ņ": "n",
  "Ň": "N",
  "ň": "n",
  "ŉ": "n",
  "N̆": "N",
  "n̆": "n",
  "Ō": "O",
  "ō": "o",
  "Ŏ": "O",
  "ŏ": "o",
  "Ő": "O",
  "ő": "o",
  "Œ": "OE",
  "œ": "oe",
  "P̆": "P",
  "p̆": "p",
  "Ŕ": "R",
  "ŕ": "r",
  "Ŗ": "R",
  "ŗ": "r",
  "Ř": "R",
  "ř": "r",
  "R̆": "R",
  "r̆": "r",
  "Ȓ": "R",
  "ȓ": "r",
  "Ś": "S",
  "ś": "s",
  "Ŝ": "S",
  "ŝ": "s",
  "Ş": "S",
  "Ș": "S",
  "ș": "s",
  "ş": "s",
  "Š": "S",
  "š": "s",
  "Ţ": "T",
  "ţ": "t",
  "ț": "t",
  "Ț": "T",
  "Ť": "T",
  "ť": "t",
  "Ŧ": "T",
  "ŧ": "t",
  "T̆": "T",
  "t̆": "t",
  "Ũ": "U",
  "ũ": "u",
  "Ū": "U",
  "ū": "u",
  "Ŭ": "U",
  "ŭ": "u",
  "Ů": "U",
  "ů": "u",
  "Ű": "U",
  "ű": "u",
  "Ų": "U",
  "ų": "u",
  "Ȗ": "U",
  "ȗ": "u",
  "V̆": "V",
  "v̆": "v",
  "Ŵ": "W",
  "ŵ": "w",
  "Ẃ": "W",
  "ẃ": "w",
  "X̆": "X",
  "x̆": "x",
  "Ŷ": "Y",
  "ŷ": "y",
  "Ÿ": "Y",
  "Y̆": "Y",
  "y̆": "y",
  "Ź": "Z",
  "ź": "z",
  "Ż": "Z",
  "ż": "z",
  "Ž": "Z",
  "ž": "z",
  "ſ": "s",
  "ƒ": "f",
  "Ơ": "O",
  "ơ": "o",
  "Ư": "U",
  "ư": "u",
  "Ǎ": "A",
  "ǎ": "a",
  "Ǐ": "I",
  "ǐ": "i",
  "Ǒ": "O",
  "ǒ": "o",
  "Ǔ": "U",
  "ǔ": "u",
  "Ǖ": "U",
  "ǖ": "u",
  "Ǘ": "U",
  "ǘ": "u",
  "Ǚ": "U",
  "ǚ": "u",
  "Ǜ": "U",
  "ǜ": "u",
  "Ứ": "U",
  "ứ": "u",
  "Ṹ": "U",
  "ṹ": "u",
  "Ǻ": "A",
  "ǻ": "a",
  "Ǽ": "AE",
  "ǽ": "ae",
  "Ǿ": "O",
  "ǿ": "o",
  "Þ": "TH",
  "þ": "th",
  "Ṕ": "P",
  "ṕ": "p",
  "Ṥ": "S",
  "ṥ": "s",
  "X́": "X",
  "x́": "x",
  "Ѓ": "Г",
  "ѓ": "г",
  "Ќ": "К",
  "ќ": "к",
  "A̋": "A",
  "a̋": "a",
  "E̋": "E",
  "e̋": "e",
  "I̋": "I",
  "i̋": "i",
  "Ǹ": "N",
  "ǹ": "n",
  "Ồ": "O",
  "ồ": "o",
  "Ṑ": "O",
  "ṑ": "o",
  "Ừ": "U",
  "ừ": "u",
  "Ẁ": "W",
  "ẁ": "w",
  "Ỳ": "Y",
  "ỳ": "y",
  "Ȁ": "A",
  "ȁ": "a",
  "Ȅ": "E",
  "ȅ": "e",
  "Ȉ": "I",
  "ȉ": "i",
  "Ȍ": "O",
  "ȍ": "o",
  "Ȑ": "R",
  "ȑ": "r",
  "Ȕ": "U",
  "ȕ": "u",
  "B̌": "B",
  "b̌": "b",
  "Č̣": "C",
  "č̣": "c",
  "Ê̌": "E",
  "ê̌": "e",
  "F̌": "F",
  "f̌": "f",
  "Ǧ": "G",
  "ǧ": "g",
  "Ȟ": "H",
  "ȟ": "h",
  "J̌": "J",
  "ǰ": "j",
  "Ǩ": "K",
  "ǩ": "k",
  "M̌": "M",
  "m̌": "m",
  "P̌": "P",
  "p̌": "p",
  "Q̌": "Q",
  "q̌": "q",
  "Ř̩": "R",
  "ř̩": "r",
  "Ṧ": "S",
  "ṧ": "s",
  "V̌": "V",
  "v̌": "v",
  "W̌": "W",
  "w̌": "w",
  "X̌": "X",
  "x̌": "x",
  "Y̌": "Y",
  "y̌": "y",
  "A̧": "A",
  "a̧": "a",
  "B̧": "B",
  "b̧": "b",
  "Ḑ": "D",
  "ḑ": "d",
  "Ȩ": "E",
  "ȩ": "e",
  "Ɛ̧": "E",
  "ɛ̧": "e",
  "Ḩ": "H",
  "ḩ": "h",
  "I̧": "I",
  "i̧": "i",
  "Ɨ̧": "I",
  "ɨ̧": "i",
  "M̧": "M",
  "m̧": "m",
  "O̧": "O",
  "o̧": "o",
  "Q̧": "Q",
  "q̧": "q",
  "U̧": "U",
  "u̧": "u",
  "X̧": "X",
  "x̧": "x",
  "Z̧": "Z",
  "z̧": "z",
  "й": "и",
  "Й": "И",
  "ё": "е",
  "Ё": "Е"
};
var chars = Object.keys(characterMap).join('|');
var allAccents = new RegExp(chars, 'g');
var firstAccent = new RegExp(chars, '');
function matcher(match) {
  return characterMap[match];
}
var removeAccents = function removeAccents(string) {
  return string.replace(allAccents, matcher);
};
var hasAccents = function hasAccents(string) {
  return !!string.match(firstAccent);
};
module.exports = removeAccents;
module.exports.has = hasAccents;
module.exports.remove = removeAccents;

/***/ }),

/***/ "../../packages/formula-editor/dist/formula-editor.js":
/*!************************************************************!*\
  !*** ../../packages/formula-editor/dist/formula-editor.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FormulaEditor: () => (/* binding */ FormulaEditor)
/* harmony export */ });
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit */ "./node_modules/lit/index.js");
/* harmony import */ var lit_decorators_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lit/decorators.js */ "./node_modules/lit/decorators.js");
/* harmony import */ var _utils_get_formula_tokens_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/get-formula-tokens.js */ "../../packages/formula-editor/dist/utils/get-formula-tokens.js");
/* harmony import */ var _utils_parser_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/parser.js */ "../../packages/formula-editor/dist/utils/parser.js");
/* harmony import */ var _styles_editor_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./styles/editor.js */ "../../packages/formula-editor/dist/styles/editor.js");
/* harmony import */ var _utils_constants_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/constants.js */ "../../packages/formula-editor/dist/utils/constants.js");
var _templateObject, _templateObject2, _templateObject3;
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
    r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
    d;
  if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var FormulaEditor = /*#__PURE__*/function (_LitElement) {
  function FormulaEditor() {
    var _this;
    _classCallCheck(this, FormulaEditor);
    _this = _callSuper(this, FormulaEditor, arguments);
    _this.recommendations = [];
    _this.currentCursorPosition = 0;
    /**
     * user input event type
     */
    _this.lastInputType = "";
    _this._selectedRecommendation = "";
    _this.isFocused = false;
    /**
     * Text area input value
     */
    _this.formulaString = "";
    _this.placeholder = "Type your formula...";
    _this.recommendationLabels = new Map();
    _this.label = "";
    _this.variables = new Map();
    _this.variableType = "";
    _this.minSuggestionLen = 2;
    _this.errorString = "";
    _this.formulaRegex = /[A-Za-z0-9_#@.]+|[-+(),*^/\s]/g;
    _this.allowedNumbers = true;
    _this.allowedOperators = _utils_constants_js__WEBPACK_IMPORTED_MODULE_5__.mathematicalOperators;
    return _this;
  }
  _inherits(FormulaEditor, _LitElement);
  return _createClass(FormulaEditor, [{
    key: "updated",
    value: function updated(_changedProperties) {
      if (_changedProperties.has("formulaString")) {
        var _this$formulaString;
        if (!((_this$formulaString = this.formulaString) !== null && _this$formulaString !== void 0 && _this$formulaString.trim())) {
          this.recommendations = Array.from(this.variables.keys());
        }
        this._adjustTextAreaHeight();
      }
      if (_changedProperties.has("variables")) {
        this._parser = new _utils_parser_js__WEBPACK_IMPORTED_MODULE_3__.Parser(this.variables, this.minSuggestionLen, this.formulaRegex, this.allowedNumbers, this.allowedOperators, this.variableType);
        this.recommendations = Array.from(this.variables.keys());
      }
    }
  }, {
    key: "onRecommendationClick",
    value: function onRecommendationClick(recommendation) {
      this.parseInput(recommendation);
    }
  }, {
    key: "handleContentUpdate",
    value: function handleContentUpdate(event) {
      event.preventDefault();
      this.lastInputType = event.inputType;
      this.formulaString = event.target.value;
      this.parseInput();
    }
  }, {
    key: "_adjustTextAreaHeight",
    value: function _adjustTextAreaHeight() {
      var _this2 = this;
      requestAnimationFrame(function () {
        if (!_this2.editor) return;
        _this2.editor.style.height = "var(--fe-height, 30px)";
        var newHeight = _this2.editor.scrollHeight;
        _this2.editor.style.height = "".concat(newHeight + 5, "px");
      });
    }
    /**
     * @param recommendation The recommendation which needs to be inserted
     * at the current cursor position
     * @returns void
     */
  }, {
    key: "parseInput",
    value: function parseInput() {
      var _this3 = this;
      var recommendation = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
      this.currentCursorPosition = this.editor.selectionStart;
      var _this$_parser$parseIn = this._parser.parseInput(this.formulaString, this.currentCursorPosition, recommendation),
        recommendations = _this$_parser$parseIn.recommendations,
        errorString = _this$_parser$parseIn.errorString,
        formattedString = _this$_parser$parseIn.formattedString,
        newCursorPosition = _this$_parser$parseIn.newCursorPosition;
      this.recommendations = recommendations;
      this.errorString = errorString || "";
      /**
       * Don't modify the text stream manually if the text is being composed,
       * unless the user manually chooses to do so by selecting a recommendation.
       * @see https://github.com/w3c/input-events/issues/86
       * @see https://github.com/w3c/input-events/pull/122
       * @see https://bugs.chromium.org/p/chromium/issues/detail?id=689541
       */
      if (this.lastInputType !== "insertCompositionText" || recommendation) {
        this.formulaString = formattedString;
      }
      if (Boolean(recommendation)) {
        this.recommendations = [];
        this.currentCursorPosition = newCursorPosition;
        /* update cursor position in text area */
        setTimeout(function () {
          _this3.editor.setSelectionRange(_this3.currentCursorPosition, _this3.currentCursorPosition);
        }, 0);
      }
      this.dispatchEvent(new CustomEvent("fw-formula-content-changed", {
        detail: {
          formulaString: this.formulaString,
          error: this.errorString,
          recommendations: this.recommendations,
          formulaTokens: (0,_utils_get_formula_tokens_js__WEBPACK_IMPORTED_MODULE_2__.getFormulaTokens)(this.formulaString || "", this.formulaRegex)
        },
        bubbles: true
      }));
    }
  }, {
    key: "formatFormula",
    value: function formatFormula() {
      if (!this.formulaString) return;
      var newContent = this._parser.addParentheses(this.formulaString);
      this.formulaString = newContent && newContent.length ? newContent : this.formulaString;
      this.parseInput();
      this.recommendations = [];
    }
  }, {
    key: "handleFocus",
    value: function handleFocus(focus) {
      this.isFocused = focus;
    }
  }, {
    key: "handleKeydown",
    value: function handleKeydown(event) {
      var _this$recommendations;
      if (!((_this$recommendations = this.recommendations) !== null && _this$recommendations !== void 0 && _this$recommendations.length)) return;
      if (event.code === "Tab") {
        var _this$recommendations2;
        event.preventDefault();
        if (((_this$recommendations2 = this.recommendations) === null || _this$recommendations2 === void 0 ? void 0 : _this$recommendations2.length) === 1) {
          this.suggestionMenu.handleRecommendationSelect(0);
        } else {
          var direction = event.shiftKey ? "up" : "down";
          this.suggestionMenu.navigate(direction);
        }
      } else if (event.code === "ArrowDown" || event.code === "ArrowUp") {
        event.preventDefault();
        var _direction = event.code === "ArrowDown" ? "down" : "up";
        this.suggestionMenu.navigate(_direction);
      } else if (event.code === "Enter") {
        event.preventDefault();
        this.suggestionMenu.handleRecommendationSelect();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$errorString,
        _this4 = this,
        _this$recommendations3;
      return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n      <style>\n        ", "\n      </style>\n\n      ", "\n\n      <textarea\n        id=\"fw-formula-editor\"\n        class=", "\n        .value=", "\n        .placeholder=", "\n        spellcheck=\"false\"\n        autocomplete=\"off\"\n        @input=", "\n        @keydown=", "\n        @blur=", "\n        @focus=", "\n      ></textarea>\n\n      ", "\n    "])), _styles_editor_js__WEBPACK_IMPORTED_MODULE_4__.FormulaEditorStyles, this.label ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["<label for=\"fw-formula-editor\" class=\"editor-label\">", "</label>"])), this.label) : "", (_this$errorString = this.errorString) !== null && _this$errorString !== void 0 && _this$errorString.length ? "error" : "", this.formulaString, this.placeholder, this.handleContentUpdate, this.handleKeydown, function () {
        return _this4.handleFocus(false);
      }, function () {
        return _this4.handleFocus(true);
      }, this.isFocused && (_this$recommendations3 = this.recommendations) !== null && _this$recommendations3 !== void 0 && _this$recommendations3.length ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["<suggestion-menu\n            .recommendations=", "\n            .currentSelection=", "\n            .onRecommendationClick=", "\n            .recommendationLabels=", "\n          ></suggestion-menu>"])), this.recommendations, this._selectedRecommendation, this.onRecommendationClick.bind(this), this.recommendationLabels) : "");
    }
  }]);
}(lit__WEBPACK_IMPORTED_MODULE_0__.LitElement);
__decorate([(0,lit_decorators_js__WEBPACK_IMPORTED_MODULE_1__.state)()], FormulaEditor.prototype, "recommendations", void 0);
__decorate([(0,lit_decorators_js__WEBPACK_IMPORTED_MODULE_1__.state)()], FormulaEditor.prototype, "currentCursorPosition", void 0);
__decorate([(0,lit_decorators_js__WEBPACK_IMPORTED_MODULE_1__.state)()], FormulaEditor.prototype, "lastInputType", void 0);
__decorate([(0,lit_decorators_js__WEBPACK_IMPORTED_MODULE_1__.state)()], FormulaEditor.prototype, "_selectedRecommendation", void 0);
__decorate([(0,lit_decorators_js__WEBPACK_IMPORTED_MODULE_1__.state)()], FormulaEditor.prototype, "isFocused", void 0);
__decorate([(0,lit_decorators_js__WEBPACK_IMPORTED_MODULE_1__.property)()], FormulaEditor.prototype, "formulaString", void 0);
__decorate([(0,lit_decorators_js__WEBPACK_IMPORTED_MODULE_1__.property)()], FormulaEditor.prototype, "placeholder", void 0);
__decorate([(0,lit_decorators_js__WEBPACK_IMPORTED_MODULE_1__.property)({
  type: Object
})], FormulaEditor.prototype, "recommendationLabels", void 0);
__decorate([(0,lit_decorators_js__WEBPACK_IMPORTED_MODULE_1__.property)({
  type: String
})], FormulaEditor.prototype, "label", void 0);
__decorate([(0,lit_decorators_js__WEBPACK_IMPORTED_MODULE_1__.property)({
  type: Object
})], FormulaEditor.prototype, "variables", void 0);
__decorate([(0,lit_decorators_js__WEBPACK_IMPORTED_MODULE_1__.property)({
  type: String
})], FormulaEditor.prototype, "variableType", void 0);
__decorate([(0,lit_decorators_js__WEBPACK_IMPORTED_MODULE_1__.property)({
  type: Number
})], FormulaEditor.prototype, "minSuggestionLen", void 0);
__decorate([(0,lit_decorators_js__WEBPACK_IMPORTED_MODULE_1__.property)({
  type: String
})], FormulaEditor.prototype, "errorString", void 0);
__decorate([(0,lit_decorators_js__WEBPACK_IMPORTED_MODULE_1__.property)({
  type: Object
})], FormulaEditor.prototype, "formulaRegex", void 0);
__decorate([(0,lit_decorators_js__WEBPACK_IMPORTED_MODULE_1__.property)({
  type: Boolean
})], FormulaEditor.prototype, "allowedNumbers", void 0);
__decorate([(0,lit_decorators_js__WEBPACK_IMPORTED_MODULE_1__.property)({
  type: Object
})], FormulaEditor.prototype, "allowedOperators", void 0);
__decorate([(0,lit_decorators_js__WEBPACK_IMPORTED_MODULE_1__.query)("#fw-formula-editor")], FormulaEditor.prototype, "editor", void 0);
__decorate([(0,lit_decorators_js__WEBPACK_IMPORTED_MODULE_1__.query)("suggestion-menu")], FormulaEditor.prototype, "suggestionMenu", void 0);
FormulaEditor = __decorate([(0,lit_decorators_js__WEBPACK_IMPORTED_MODULE_1__.customElement)("formula-editor")], FormulaEditor);


/***/ }),

/***/ "../../packages/formula-editor/dist/styles/editor.js":
/*!***********************************************************!*\
  !*** ../../packages/formula-editor/dist/styles/editor.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FormulaEditorStyles: () => (/* binding */ FormulaEditorStyles)
/* harmony export */ });
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit */ "./node_modules/lit/index.js");
var _templateObject;
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }

var FormulaEditorStyles = (0,lit__WEBPACK_IMPORTED_MODULE_0__.css)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  .editor-label {\n    display: block;\n    font-size: var(--fe-label-font-size, 0.8rem);\n    color: var(--fe-label-color, #515151);\n    margin-bottom: var(--fe-label-margin-bottom, 1px);\n  }\n\n  #fw-formula-editor {\n    display: block;\n    resize: none;\n    padding: var(--fe-padding, 4px);\n    caret-color: var(--fe-caret-color, #fff);\n    color: var(--fe-text-color, #f7f1ff);\n    font-size: var(--fe-text-font-size, 14px);\n    min-width: 100%;\n    min-height: 30px;\n    height: var(--fe-height, 30px);\n    border-radius: var(--fe-border-radius, 4px);\n    border: var(--fe-border, 2px solid black);\n    border-bottom: var(--fe-border-bottom, 0px solid black);\n    outline: 0px solid black;\n    background-color: var(--fe-background-color, #222222);\n    box-sizing: border-box;\n    line-height: 1.5;\n  }\n\n  #fw-formula-editor:empty:before {\n    content: attr(placeholder);\n    color: var(--fe-placeholder-color, grey);\n    pointer-events: none;\n  }\n\n  #fw-formula-editor.error {\n    text-decoration: underline;\n    -webkit-text-decoration-style: wavy;\n    text-decoration-style: wavy;\n    text-decoration-color: var(--fe-err-underline-color, red);\n  }\n"])));

/***/ }),

/***/ "../../packages/formula-editor/dist/types/index.js":
/*!*********************************************************!*\
  !*** ../../packages/formula-editor/dist/types/index.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Expectation: () => (/* binding */ Expectation),
/* harmony export */   Formula: () => (/* binding */ Formula)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
var Expectation;
(function (Expectation) {
  Expectation[Expectation["VARIABLE"] = 0] = "VARIABLE";
  Expectation[Expectation["OPERATOR"] = 1] = "OPERATOR";
  Expectation[Expectation["UNDEFINED"] = 2] = "UNDEFINED";
})(Expectation || (Expectation = {}));
var Formula = /*#__PURE__*/_createClass(function Formula(name, formulaString) {
  var precision = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : -1;
  _classCallCheck(this, Formula);
  this.error = null;
  this.name = name || "";
  this.formulaString = formulaString || "";
  this.precision = precision;
});

/***/ }),

/***/ "../../packages/formula-editor/dist/utils/constants.js":
/*!*************************************************************!*\
  !*** ../../packages/formula-editor/dist/utils/constants.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   mathematicalOperators: () => (/* binding */ mathematicalOperators),
/* harmony export */   operatorPrecedence: () => (/* binding */ operatorPrecedence),
/* harmony export */   unaryOperators: () => (/* binding */ unaryOperators)
/* harmony export */ });
var mathematicalOperators = new Set(["+", "-", "*", "/", "^"]);
var unaryOperators = ["+", "-"];
var operatorPrecedence = {
  "^": 3,
  "/": 2,
  "*": 2,
  "+": 1,
  "-": 1
};

/***/ }),

/***/ "../../packages/formula-editor/dist/utils/get-formula-tokens.js":
/*!**********************************************************************!*\
  !*** ../../packages/formula-editor/dist/utils/get-formula-tokens.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getFormulaTokens: () => (/* binding */ getFormulaTokens)
/* harmony export */ });
function getFormulaTokens(formulaString, formulaRegex) {
  if (!(formulaString !== null && formulaString !== void 0 && formulaString.length)) return [];
  if (!Boolean(formulaRegex)) return formulaString.split(/(\s+)/) || [];
  return formulaString.match(formulaRegex) || [];
}

/***/ }),

/***/ "../../packages/formula-editor/dist/utils/parser.js":
/*!**********************************************************!*\
  !*** ../../packages/formula-editor/dist/utils/parser.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Parser: () => (/* binding */ Parser)
/* harmony export */ });
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants.js */ "../../packages/formula-editor/dist/utils/constants.js");
/* harmony import */ var _get_formula_tokens_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./get-formula-tokens.js */ "../../packages/formula-editor/dist/utils/get-formula-tokens.js");
/* harmony import */ var _queue_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./queue.js */ "../../packages/formula-editor/dist/utils/queue.js");
/* harmony import */ var _recommendor_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./recommendor.js */ "../../packages/formula-editor/dist/utils/recommendor.js");
/* harmony import */ var _stack_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./stack.js */ "../../packages/formula-editor/dist/utils/stack.js");
/* harmony import */ var big_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! big.js */ "./node_modules/big.js/big.js");
/* harmony import */ var big_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(big_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../types */ "../../packages/formula-editor/dist/types/index.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }







var Parser = /*#__PURE__*/function () {
  function Parser(variables, minSuggestionLen) {
    var formulaRegex = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : /[A-Za-z0-9_#@.]+|[-+(),*^/\s]/g;
    var allowedNumbers = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
    var allowedOperators = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : _constants_js__WEBPACK_IMPORTED_MODULE_0__.mathematicalOperators;
    var variableType = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : "";
    _classCallCheck(this, Parser);
    this.variables = variables;
    this.formulaRegex = formulaRegex;
    this._recommender = new _recommendor_js__WEBPACK_IMPORTED_MODULE_3__.Recommender(Array.from(this.variables.keys()), minSuggestionLen);
    this.allowedNumbers = allowedNumbers;
    this.allowedOperators = allowedOperators;
    this.variableType = variableType;
  }
  return _createClass(Parser, [{
    key: "isNumber",
    value: function isNumber(value) {
      if (!this.allowedNumbers || value.trim() === "") return false;
      return !Number.isNaN(Number(value));
    }
    /**
     * Checks whether a token is a valid operand: a known variable, a number, or a unary-prefixed variable
     */
  }, {
    key: "isOperand",
    value: function isOperand(token) {
      if (!token.trim().length) return false;
      if (!Number.isNaN(Number(token)) || this.variables.has(token)) return true;
      if (token.length > 1 && _constants_js__WEBPACK_IMPORTED_MODULE_0__.unaryOperators.includes(token[0])) {
        var inner = token.substring(1);
        return !Number.isNaN(Number(inner)) || this.variables.has(inner);
      }
      return false;
    }
  }, {
    key: "formatFormulaToken",
    value: function formatFormulaToken(token) {
      var _iterator = _createForOfIteratorHelper(this.variables.keys()),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var existingKey = _step.value;
          if (existingKey.toLowerCase() === token.toLowerCase()) {
            return existingKey;
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      return token;
    }
  }, {
    key: "parseInput",
    value: function parseInput(formula) {
      var _this = this;
      var prevCurPos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      var recommendation = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var tokens = (0,_get_formula_tokens_js__WEBPACK_IMPORTED_MODULE_1__.getFormulaTokens)(formula, this.formulaRegex);
      var parentheses = new _stack_js__WEBPACK_IMPORTED_MODULE_4__.Stack();
      var expectation = _types__WEBPACK_IMPORTED_MODULE_6__.Expectation.VARIABLE;
      var currentPosition = 0;
      var previousToken = "";
      var parsedString = "";
      var parseOutput = {
        recommendations: [],
        formattedString: "",
        newCursorPosition: prevCurPos !== null && prevCurPos !== void 0 ? prevCurPos : -1,
        errorString: null
      };
      if (!formula.trim() && recommendation) {
        parseOutput.formattedString = recommendation;
        parseOutput.newCursorPosition = recommendation.length;
        return parseOutput;
      }
      tokens === null || tokens === void 0 || tokens.forEach(function (token) {
        token = _this.formatFormulaToken(token);
        var isNumber = _this.variables.has(token) || _this.isNumber(token);
        var isOperator = _this.allowedOperators.has(token);
        var isSpace = token.trim() === "";
        var isBracket = token === "(" || token === ")";
        if (isSpace) {
          parseOutput.formattedString += token;
          currentPosition += token.length;
          return;
        }
        /**
         * Check if the cursor is in between the formula string
         *
         * - If we've got a recommendation to add, replace the word with the recommendation
         * - Update recommendations based on the token/word
         */
        if (currentPosition <= prevCurPos && currentPosition + token.length >= prevCurPos) {
          if (recommendation) {
            isNumber = true;
            if (_this.allowedOperators.has(token)) {
              var updatedTokenString = "".concat(token, " ").concat(recommendation);
              parseOutput.formattedString += updatedTokenString;
              currentPosition += updatedTokenString.length;
              parseOutput.newCursorPosition = currentPosition;
              recommendation = null;
              return;
            }
            var updatedTokenLength = recommendation.length - token.length;
            parseOutput.newCursorPosition = Math.min(parseOutput.newCursorPosition, formula.length) + updatedTokenLength;
            token = recommendation;
            recommendation = null;
          }
          parseOutput.recommendations = _this._recommender.getRecommendations(token);
        }
        /**
         * Error checks
         * skip error check if there is one already
         */
        if (expectation !== _types__WEBPACK_IMPORTED_MODULE_6__.Expectation.UNDEFINED) {
          /**
           * Unknown symbol/variable/word
           */
          if (!(isNumber || isOperator || isBracket || isSpace)) {
            parseOutput.errorString = "".concat(_this.variableType, " : '").concat(token, "' doesn't exist.");
            expectation = _types__WEBPACK_IMPORTED_MODULE_6__.Expectation.UNDEFINED;
          } else if (_this.allowedOperators.has(previousToken) && isOperator) {
            parseOutput.errorString = "Please don't use mathematical operators (".concat(Array.from(_this.allowedOperators).join(" "), ") consecutively.");
            expectation = _types__WEBPACK_IMPORTED_MODULE_6__.Expectation.UNDEFINED;
          } else if (parentheses.isEmpty() && token === ")") {
            parseOutput.errorString = "Unexpected closing bracket. Make sure all opening brackets '(' have matching closing brackets ')'.";
            expectation = _types__WEBPACK_IMPORTED_MODULE_6__.Expectation.UNDEFINED;
          } else if (
          /**
           * Operator or ')' after an operator (Eg: '23 / *' or '23 / )')
           * No error for Unary `+` and `-` as they might represent a positive or negative number respectively
           */
          expectation === _types__WEBPACK_IMPORTED_MODULE_6__.Expectation.VARIABLE && !isNumber && !isSpace && token !== "(" && !(_constants_js__WEBPACK_IMPORTED_MODULE_0__.unaryOperators.includes(token) && (!parsedString.trim() || previousToken === "(" || _this.allowedOperators.has(previousToken)))) {
            parseOutput.errorString = "Please use ".concat(_this.variableType, " ").concat(_this.variableType && _this.allowedNumbers ? " or " : "", " ").concat(_this.allowedNumbers ? "numbers" : "", " after '").concat(previousToken, "'.");
            expectation = _types__WEBPACK_IMPORTED_MODULE_6__.Expectation.UNDEFINED;
          } else if (expectation === _types__WEBPACK_IMPORTED_MODULE_6__.Expectation.OPERATOR && !isOperator && !isSpace && token !== ")") {
            /**
             * Multiple number/variable together without operator
             */
            parseOutput.errorString = "Please use mathematical operators (".concat(Array.from(_this.allowedOperators).join(" "), ") after '").concat(previousToken, "'.");
            expectation = _types__WEBPACK_IMPORTED_MODULE_6__.Expectation.UNDEFINED;
          } else if (isNumber && previousToken === "/" && (_this.variables.get(token) === 0 || Number(token) === 0)) {
            /**
             * division by zero
             */
            parseOutput.errorString = "Division by zero is not possible.";
            expectation = _types__WEBPACK_IMPORTED_MODULE_6__.Expectation.UNDEFINED;
          } else if (previousToken === "(" && token === ")") {
            /**
             * Empty brackets
             */
            parseOutput.errorString = "Please don't use empty brackets ().";
            expectation = _types__WEBPACK_IMPORTED_MODULE_6__.Expectation.UNDEFINED;
          }
        }
        /**
         * Setting the expectation for the next token, if no error is there till now
         */
        if (expectation !== _types__WEBPACK_IMPORTED_MODULE_6__.Expectation.UNDEFINED) {
          if (token === "(" || isOperator) {
            expectation = _types__WEBPACK_IMPORTED_MODULE_6__.Expectation.VARIABLE;
          } else if (token === ")" || isNumber) {
            expectation = _types__WEBPACK_IMPORTED_MODULE_6__.Expectation.OPERATOR;
          }
        }
        if (token === "(") parentheses.push(currentPosition);else if (token === ")") parentheses.pop();
        parseOutput.formattedString += token;
        currentPosition += token.length;
        parsedString += token;
        previousToken = token;
      });
      if (recommendation) {
        parseOutput.newCursorPosition = Math.min(parseOutput.newCursorPosition, formula.length) + recommendation.length;
        parseOutput.formattedString += recommendation;
        previousToken = recommendation;
      }
      if (this.allowedOperators.has(previousToken) || !previousToken.trim().length) {
        var _parseOutput$errorStr;
        parseOutput.recommendations = !((_parseOutput$errorStr = parseOutput.errorString) !== null && _parseOutput$errorStr !== void 0 && _parseOutput$errorStr.length) ? Array.from(this.variables.keys()) : [];
      }
      if (this.allowedOperators.has(previousToken)) {
        parseOutput.errorString = "Please don't use mathematical operators (".concat(Array.from(this.allowedOperators).join(" "), ") at the end.");
      }
      if (!parentheses.isEmpty()) {
        parseOutput.errorString = "Unexpected opening bracket. Make sure all closing brackets ')' have matching opening brackets '('.";
      }
      return parseOutput;
    }
  }, {
    key: "buildRPN",
    value: function buildRPN(formula) {
      var _getFormulaTokens;
      if (this.parseInput(formula).errorString) return null;
      var tokens = (_getFormulaTokens = (0,_get_formula_tokens_js__WEBPACK_IMPORTED_MODULE_1__.getFormulaTokens)(formula, this.formulaRegex)) === null || _getFormulaTokens === void 0 ? void 0 : _getFormulaTokens.filter(function (el) {
        return !/\s+/.test(el) && el !== "";
      });
      var previousToken = "";
      var carriedToken = null;
      var parsedTokens = [];
      var currentTokens = "";
      // Check if variables include unary operators `-` and `+`.
      var _iterator2 = _createForOfIteratorHelper(tokens),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var _token = _step2.value;
          if (_constants_js__WEBPACK_IMPORTED_MODULE_0__.unaryOperators.includes(_token) && (!currentTokens.trim() || previousToken === "(" || this.allowedOperators.has(previousToken))) {
            carriedToken = _token;
          } else if (carriedToken) {
            parsedTokens.push(carriedToken + _token);
            carriedToken = null;
          } else {
            parsedTokens.push(_token);
          }
          previousToken = _token;
          currentTokens += _token;
        }
        /**
         * Shunting Yard Algorithm (EW Dijkstra)
         */
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
      var operatorStack = new _stack_js__WEBPACK_IMPORTED_MODULE_4__.Stack();
      var outputQueue = new _queue_js__WEBPACK_IMPORTED_MODULE_2__.Queue();
      for (var _i = 0, _parsedTokens = parsedTokens; _i < _parsedTokens.length; _i++) {
        var token = _parsedTokens[_i];
        if (token === "(") {
          operatorStack.push("(");
        } else if (token === ")") {
          while (!operatorStack.isEmpty() && operatorStack.top() !== "(") {
            outputQueue.enqueue(operatorStack.pop());
          }
          operatorStack.pop();
        } else if (this.allowedOperators.has(token)) {
          while (!operatorStack.isEmpty() && this.allowedOperators.has(operatorStack.top()) && _constants_js__WEBPACK_IMPORTED_MODULE_0__.operatorPrecedence[token] <= _constants_js__WEBPACK_IMPORTED_MODULE_0__.operatorPrecedence[operatorStack.top()]) {
            outputQueue.enqueue(operatorStack.pop());
          }
          operatorStack.push(token);
        } else if (this.isOperand(token)) {
          outputQueue.enqueue(token);
        }
      }
      while (!operatorStack.isEmpty() && operatorStack.top()) {
        outputQueue.enqueue(operatorStack.pop());
      }
      return outputQueue;
    }
  }, {
    key: "addParentheses",
    value: function addParentheses(formula) {
      var _this2 = this;
      var rpn = this.buildRPN(formula);
      if (!rpn) return null;
      var lexedRPN = [];
      while (!rpn.isEmpty()) {
        lexedRPN.push(rpn.dequeue());
      }
      var operatorStack = new _stack_js__WEBPACK_IMPORTED_MODULE_4__.Stack();
      var resultStack = new _stack_js__WEBPACK_IMPORTED_MODULE_4__.Stack();
      lexedRPN.forEach(function (symbol) {
        var parsedLeftExpression;
        var parsedRightExpression;
        // check if the symbol is a number or variable or unaryOperatorPreceded Variable
        if (_this2.isOperand(symbol)) {
          resultStack.push(symbol);
          operatorStack.push(null);
        }
        // If symbol is an operator, check operatorStack, adds brackets accordingly to the result and add it to operatorStack
        else if (Object.keys(_constants_js__WEBPACK_IMPORTED_MODULE_0__.operatorPrecedence).includes(symbol)) {
          var _ref = [resultStack.pop(), resultStack.pop(), operatorStack.pop(), operatorStack.pop()],
            rightExpression = _ref[0],
            leftExpression = _ref[1],
            operatorA = _ref[2],
            operatorB = _ref[3];
          if (_constants_js__WEBPACK_IMPORTED_MODULE_0__.operatorPrecedence[operatorB] <= _constants_js__WEBPACK_IMPORTED_MODULE_0__.operatorPrecedence[symbol] || _constants_js__WEBPACK_IMPORTED_MODULE_0__.operatorPrecedence[operatorB] === _constants_js__WEBPACK_IMPORTED_MODULE_0__.operatorPrecedence[symbol] && ["/", "-"].includes(symbol)) {
            parsedLeftExpression = "(".concat(leftExpression, ")");
          } else {
            parsedLeftExpression = leftExpression;
          }
          if (_constants_js__WEBPACK_IMPORTED_MODULE_0__.operatorPrecedence[operatorA] <= _constants_js__WEBPACK_IMPORTED_MODULE_0__.operatorPrecedence[symbol] || _constants_js__WEBPACK_IMPORTED_MODULE_0__.operatorPrecedence[operatorA] === _constants_js__WEBPACK_IMPORTED_MODULE_0__.operatorPrecedence[symbol] && ["/", "-"].includes(symbol)) {
            parsedRightExpression = "(".concat(rightExpression, ")");
          } else {
            parsedRightExpression = rightExpression;
          }
          resultStack.push("".concat(parsedLeftExpression, " ").concat(symbol, " ").concat(parsedRightExpression));
          operatorStack.push(symbol);
        } else throw "".concat(symbol, " is not a recognized symbol");
      });
      if (resultStack.isEmpty()) throw "".concat(lexedRPN, " is not a correct RPN");
      return resultStack.pop();
    }
  }, {
    key: "calculate",
    value: function calculate(formula) {
      var formulaRPN = this.buildRPN(formula);
      var calculationResult = {
        result: undefined,
        errorString: null
      };
      if (!formulaRPN) return calculationResult;
      var calcStack = new _stack_js__WEBPACK_IMPORTED_MODULE_4__.Stack();
      while (!formulaRPN.isEmpty()) {
        var frontItem = formulaRPN.dequeue();
        if (this.isOperand(frontItem)) {
          var _this$variables$get$t, _this$variables$get;
          var _ref2 = /^[+-]/.test(frontItem) && frontItem.length > 1 ? [frontItem[0], frontItem.slice(1)] : ["", frontItem],
            _ref3 = _slicedToArray(_ref2, 2),
            sign = _ref3[0],
            variableKey = _ref3[1];
          var operandValue = Number.parseFloat((_this$variables$get$t = (_this$variables$get = this.variables.get(variableKey)) === null || _this$variables$get === void 0 ? void 0 : _this$variables$get.toString()) !== null && _this$variables$get$t !== void 0 ? _this$variables$get$t : variableKey);
          var number = Number.parseFloat("".concat(sign, "1")) * operandValue;
          calcStack.push(big_js__WEBPACK_IMPORTED_MODULE_5___default()(number));
        } else {
          if (calcStack.size() < 2) {
            calculationResult.errorString = "Calculation error: Invalid formula";
            return calculationResult;
          }
          var operator = frontItem;
          var numB = calcStack.pop();
          var numA = calcStack.pop();
          try {
            switch (operator) {
              case "+":
                calcStack.push(big_js__WEBPACK_IMPORTED_MODULE_5___default()(numA).add(big_js__WEBPACK_IMPORTED_MODULE_5___default()(numB)));
                break;
              case "-":
                calcStack.push(big_js__WEBPACK_IMPORTED_MODULE_5___default()(numA).sub(big_js__WEBPACK_IMPORTED_MODULE_5___default()(numB)));
                break;
              case "*":
                calcStack.push(big_js__WEBPACK_IMPORTED_MODULE_5___default()(numA).mul(big_js__WEBPACK_IMPORTED_MODULE_5___default()(numB)));
                break;
              case "/":
                if (big_js__WEBPACK_IMPORTED_MODULE_5___default()(numB).eq(0)) {
                  calculationResult.errorString = "Division by zero encountered";
                  return calculationResult;
                }
                calcStack.push(big_js__WEBPACK_IMPORTED_MODULE_5___default()(numA).div(big_js__WEBPACK_IMPORTED_MODULE_5___default()(numB)));
                break;
              case "^":
                calcStack.push(big_js__WEBPACK_IMPORTED_MODULE_5___default()(numA).pow(parseFloat(big_js__WEBPACK_IMPORTED_MODULE_5___default()(numB).toString())));
            }
          } catch (error) {
            calculationResult.errorString = error instanceof Error ? error.message : "Unknown error during calculation";
            return calculationResult;
          }
        }
      }
      if (calcStack.isEmpty()) {
        calculationResult.errorString = "Calculation error: Empty result stack";
        return calculationResult;
      }
      var topValue = calcStack.top();
      calculationResult.result = topValue !== undefined ? parseFloat(topValue.toString()) : undefined;
      return calculationResult;
    }
  }]);
}();

/***/ }),

/***/ "../../packages/formula-editor/dist/utils/queue.js":
/*!*********************************************************!*\
  !*** ../../packages/formula-editor/dist/utils/queue.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Queue: () => (/* binding */ Queue)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Queue = /*#__PURE__*/function () {
  function Queue() {
    _classCallCheck(this, Queue);
    this._elements = {};
    this._head = 0;
    this._tail = 0;
  }
  return _createClass(Queue, [{
    key: "enqueue",
    value: function enqueue(item) {
      this._elements[this._tail] = item;
      this._tail++;
    }
  }, {
    key: "dequeue",
    value: function dequeue() {
      if (this._tail === this._head) return undefined;
      var element = this._elements[this._head];
      delete this._elements[this._head];
      this._head++;
      return element;
    }
  }, {
    key: "peek",
    value: function peek() {
      if (this.isEmpty()) return undefined;
      return this._elements[this._head];
    }
  }, {
    key: "isEmpty",
    value: function isEmpty() {
      return this._head === this._tail;
    }
  }]);
}();

/***/ }),

/***/ "../../packages/formula-editor/dist/utils/recommendor.js":
/*!***************************************************************!*\
  !*** ../../packages/formula-editor/dist/utils/recommendor.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Recommender: () => (/* binding */ Recommender)
/* harmony export */ });
/* harmony import */ var match_sorter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! match-sorter */ "../../node_modules/match-sorter/dist/match-sorter.esm.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }

var Recommender = /*#__PURE__*/function () {
  function Recommender(variables, minSuggestionLen) {
    _classCallCheck(this, Recommender);
    this._wordLimitForSuggestions = minSuggestionLen > 0 ? minSuggestionLen : 1;
    this.variableList = variables;
  }
  return _createClass(Recommender, [{
    key: "getRecommendations",
    value: function getRecommendations(inputString) {
      if (inputString.length < this._wordLimitForSuggestions) return [];
      var recommendations = (0,match_sorter__WEBPACK_IMPORTED_MODULE_0__.matchSorter)(this.variableList, inputString);
      if (recommendations.length === 0) return [];
      return recommendations;
    }
  }]);
}();

/***/ }),

/***/ "../../packages/formula-editor/dist/utils/stack.js":
/*!*********************************************************!*\
  !*** ../../packages/formula-editor/dist/utils/stack.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Stack: () => (/* binding */ Stack)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Stack = /*#__PURE__*/function () {
  function Stack() {
    _classCallCheck(this, Stack);
    this._elements = [];
  }
  return _createClass(Stack, [{
    key: "push",
    value: function push(item) {
      this._elements.push(item);
    }
  }, {
    key: "pop",
    value: function pop() {
      return this._elements.pop();
    }
  }, {
    key: "top",
    value: function top() {
      return this._elements.at(-1);
    }
  }, {
    key: "isEmpty",
    value: function isEmpty() {
      return this._elements.length === 0;
    }
  }, {
    key: "size",
    value: function size() {
      return this._elements.length;
    }
  }]);
}();

/***/ }),

/***/ "./node_modules/@lit/reactive-element/development/css-tag.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@lit/reactive-element/development/css-tag.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CSSResult: () => (/* binding */ CSSResult),
/* harmony export */   adoptStyles: () => (/* binding */ adoptStyles),
/* harmony export */   css: () => (/* binding */ css),
/* harmony export */   getCompatibleStyle: () => (/* binding */ getCompatibleStyle),
/* harmony export */   supportsAdoptingStyleSheets: () => (/* binding */ supportsAdoptingStyleSheets),
/* harmony export */   unsafeCSS: () => (/* binding */ unsafeCSS)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var NODE_MODE = false;
var global = NODE_MODE ? globalThis : window;
/**
 * Whether the current browser supports `adoptedStyleSheets`.
 */
var supportsAdoptingStyleSheets = global.ShadowRoot && (global.ShadyCSS === undefined || global.ShadyCSS.nativeShadow) && 'adoptedStyleSheets' in Document.prototype && 'replace' in CSSStyleSheet.prototype;
var constructionToken = Symbol();
var cssTagCache = new WeakMap();
/**
 * A container for a string of CSS text, that may be used to create a CSSStyleSheet.
 *
 * CSSResult is the return value of `css`-tagged template literals and
 * `unsafeCSS()`. In order to ensure that CSSResults are only created via the
 * `css` tag and `unsafeCSS()`, CSSResult cannot be constructed directly.
 */
var CSSResult = /*#__PURE__*/function () {
  function CSSResult(cssText, strings, safeToken) {
    _classCallCheck(this, CSSResult);
    // This property needs to remain unminified.
    this['_$cssResult$'] = true;
    if (safeToken !== constructionToken) {
      throw new Error('CSSResult is not constructable. Use `unsafeCSS` or `css` instead.');
    }
    this.cssText = cssText;
    this._strings = strings;
  }
  // This is a getter so that it's lazy. In practice, this means stylesheets
  // are not created until the first element instance is made.
  return _createClass(CSSResult, [{
    key: "styleSheet",
    get: function get() {
      // If `supportsAdoptingStyleSheets` is true then we assume CSSStyleSheet is
      // constructable.
      var styleSheet = this._styleSheet;
      var strings = this._strings;
      if (supportsAdoptingStyleSheets && styleSheet === undefined) {
        var cacheable = strings !== undefined && strings.length === 1;
        if (cacheable) {
          styleSheet = cssTagCache.get(strings);
        }
        if (styleSheet === undefined) {
          (this._styleSheet = styleSheet = new CSSStyleSheet()).replaceSync(this.cssText);
          if (cacheable) {
            cssTagCache.set(strings, styleSheet);
          }
        }
      }
      return styleSheet;
    }
  }, {
    key: "toString",
    value: function toString() {
      return this.cssText;
    }
  }]);
}();
var textFromCSSResult = function textFromCSSResult(value) {
  // This property needs to remain unminified.
  if (value['_$cssResult$'] === true) {
    return value.cssText;
  } else if (typeof value === 'number') {
    return value;
  } else {
    throw new Error("Value passed to 'css' function must be a 'css' function result: " + "".concat(value, ". Use 'unsafeCSS' to pass non-literal values, but take care ") + "to ensure page security.");
  }
};
/**
 * Wrap a value for interpolation in a {@linkcode css} tagged template literal.
 *
 * This is unsafe because untrusted CSS text can be used to phone home
 * or exfiltrate data to an attacker controlled site. Take care to only use
 * this with trusted input.
 */
var unsafeCSS = function unsafeCSS(value) {
  return new CSSResult(typeof value === 'string' ? value : String(value), undefined, constructionToken);
};
/**
 * A template literal tag which can be used with LitElement's
 * {@linkcode LitElement.styles} property to set element styles.
 *
 * For security reasons, only literal string values and number may be used in
 * embedded expressions. To incorporate non-literal values {@linkcode unsafeCSS}
 * may be used inside an expression.
 */
var css = function css(strings) {
  for (var _len = arguments.length, values = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    values[_key - 1] = arguments[_key];
  }
  var cssText = strings.length === 1 ? strings[0] : values.reduce(function (acc, v, idx) {
    return acc + textFromCSSResult(v) + strings[idx + 1];
  }, strings[0]);
  return new CSSResult(cssText, strings, constructionToken);
};
/**
 * Applies the given styles to a `shadowRoot`. When Shadow DOM is
 * available but `adoptedStyleSheets` is not, styles are appended to the
 * `shadowRoot` to [mimic spec behavior](https://wicg.github.io/construct-stylesheets/#using-constructed-stylesheets).
 * Note, when shimming is used, any styles that are subsequently placed into
 * the shadowRoot should be placed *before* any shimmed adopted styles. This
 * will match spec behavior that gives adopted sheets precedence over styles in
 * shadowRoot.
 */
var adoptStyles = function adoptStyles(renderRoot, styles) {
  if (supportsAdoptingStyleSheets) {
    renderRoot.adoptedStyleSheets = styles.map(function (s) {
      return s instanceof CSSStyleSheet ? s : s.styleSheet;
    });
  } else {
    styles.forEach(function (s) {
      var style = document.createElement('style');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      var nonce = global['litNonce'];
      if (nonce !== undefined) {
        style.setAttribute('nonce', nonce);
      }
      style.textContent = s.cssText;
      renderRoot.appendChild(style);
    });
  }
};
var cssResultFromStyleSheet = function cssResultFromStyleSheet(sheet) {
  var cssText = '';
  var _iterator = _createForOfIteratorHelper(sheet.cssRules),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var rule = _step.value;
      cssText += rule.cssText;
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return unsafeCSS(cssText);
};
var getCompatibleStyle = supportsAdoptingStyleSheets || NODE_MODE && global.CSSStyleSheet === undefined ? function (s) {
  return s;
} : function (s) {
  return s instanceof CSSStyleSheet ? cssResultFromStyleSheet(s) : s;
};

/***/ }),

/***/ "./node_modules/@lit/reactive-element/development/decorators/base.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@lit/reactive-element/development/decorators/base.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   decorateProperty: () => (/* binding */ decorateProperty),
/* harmony export */   legacyPrototypeMethod: () => (/* binding */ legacyPrototypeMethod),
/* harmony export */   standardPrototypeMethod: () => (/* binding */ standardPrototypeMethod)
/* harmony export */ });
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var legacyPrototypeMethod = function legacyPrototypeMethod(descriptor, proto, name) {
  Object.defineProperty(proto, name, descriptor);
};
var standardPrototypeMethod = function standardPrototypeMethod(descriptor, element) {
  return {
    kind: 'method',
    placement: 'prototype',
    key: element.key,
    descriptor: descriptor
  };
};
/**
 * Helper for decorating a property that is compatible with both TypeScript
 * and Babel decorators. The optional `finisher` can be used to perform work on
 * the class. The optional `descriptor` should return a PropertyDescriptor
 * to install for the given property.
 *
 * @param finisher {function} Optional finisher method; receives the element
 * constructor and property key as arguments and has no return value.
 * @param descriptor {function} Optional descriptor method; receives the
 * property key as an argument and returns a property descriptor to define for
 * the given property.
 * @returns {ClassElement|void}
 */
var decorateProperty = function decorateProperty(_ref) {
  var finisher = _ref.finisher,
    descriptor = _ref.descriptor;
  return function (protoOrDescriptor, name
  // Note TypeScript requires the return type to be `void|any`
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ) {
    var _a;
    // TypeScript / Babel legacy mode
    if (name !== undefined) {
      var ctor = protoOrDescriptor.constructor;
      if (descriptor !== undefined) {
        Object.defineProperty(protoOrDescriptor, name, descriptor(name));
      }
      finisher === null || finisher === void 0 ? void 0 : finisher(ctor, name);
      // Babel standard mode
    } else {
      // Note, the @property decorator saves `key` as `originalKey`
      // so try to use it here.
      var key =
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (_a = protoOrDescriptor.originalKey) !== null && _a !== void 0 ? _a : protoOrDescriptor.key;
      var info = descriptor != undefined ? {
        kind: 'method',
        placement: 'prototype',
        key: key,
        descriptor: descriptor(protoOrDescriptor.key)
      } : _extends({}, protoOrDescriptor, {
        key: key
      });
      if (finisher != undefined) {
        info.finisher = function (ctor) {
          finisher(ctor, key);
        };
      }
      return info;
    }
  };
};

/***/ }),

/***/ "./node_modules/@lit/reactive-element/development/decorators/custom-element.js":
/*!*************************************************************************************!*\
  !*** ./node_modules/@lit/reactive-element/development/decorators/custom-element.js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   customElement: () => (/* binding */ customElement)
/* harmony export */ });
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var legacyCustomElement = function legacyCustomElement(tagName, clazz) {
  customElements.define(tagName, clazz);
  // Cast as any because TS doesn't recognize the return type as being a
  // subtype of the decorated class when clazz is typed as
  // `Constructor<HTMLElement>` for some reason.
  // `Constructor<HTMLElement>` is helpful to make sure the decorator is
  // applied to elements however.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return clazz;
};
var standardCustomElement = function standardCustomElement(tagName, descriptor) {
  var kind = descriptor.kind,
    elements = descriptor.elements;
  return {
    kind: kind,
    elements: elements,
    // This callback is called once the class is otherwise fully defined
    finisher: function finisher(clazz) {
      customElements.define(tagName, clazz);
    }
  };
};
/**
 * Class decorator factory that defines the decorated class as a custom element.
 *
 * ```js
 * @customElement('my-element')
 * class MyElement extends LitElement {
 *   render() {
 *     return html``;
 *   }
 * }
 * ```
 * @category Decorator
 * @param tagName The tag name of the custom element to define.
 */
var customElement = function customElement(tagName) {
  return function (classOrDescriptor) {
    return typeof classOrDescriptor === 'function' ? legacyCustomElement(tagName, classOrDescriptor) : standardCustomElement(tagName, classOrDescriptor);
  };
};

/***/ }),

/***/ "./node_modules/@lit/reactive-element/development/decorators/event-options.js":
/*!************************************************************************************!*\
  !*** ./node_modules/@lit/reactive-element/development/decorators/event-options.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   eventOptions: () => (/* binding */ eventOptions)
/* harmony export */ });
/* harmony import */ var _base_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base.js */ "./node_modules/@lit/reactive-element/development/decorators/base.js");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

/**
 * Adds event listener options to a method used as an event listener in a
 * lit-html template.
 *
 * @param options An object that specifies event listener options as accepted by
 * `EventTarget#addEventListener` and `EventTarget#removeEventListener`.
 *
 * Current browsers support the `capture`, `passive`, and `once` options. See:
 * https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Parameters
 *
 * ```ts
 * class MyElement {
 *   clicked = false;
 *
 *   render() {
 *     return html`
 *       <div @click=${this._onClick}>
 *         <button></button>
 *       </div>
 *     `;
 *   }
 *
 *   @eventOptions({capture: true})
 *   _onClick(e) {
 *     this.clicked = true;
 *   }
 * }
 * ```
 * @category Decorator
 */
function eventOptions(options) {
  return (0,_base_js__WEBPACK_IMPORTED_MODULE_0__.decorateProperty)({
    finisher: function finisher(ctor, name) {
      Object.assign(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ctor.prototype[name], options);
    }
  });
}

/***/ }),

/***/ "./node_modules/@lit/reactive-element/development/decorators/property.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@lit/reactive-element/development/decorators/property.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   property: () => (/* binding */ property)
/* harmony export */ });
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var standardProperty = function standardProperty(options, element) {
  // When decorating an accessor, pass it through and add property metadata.
  // Note, the `hasOwnProperty` check in `createProperty` ensures we don't
  // stomp over the user's accessor.
  if (element.kind === 'method' && element.descriptor && !('value' in element.descriptor)) {
    return _extends({}, element, {
      finisher: function finisher(clazz) {
        clazz.createProperty(element.key, options);
      }
    });
  } else {
    // createProperty() takes care of defining the property, but we still
    // must return some kind of descriptor, so return a descriptor for an
    // unused prototype field. The finisher calls createProperty().
    return {
      kind: 'field',
      key: Symbol(),
      placement: 'own',
      descriptor: {},
      // store the original key so subsequent decorators have access to it.
      originalKey: element.key,
      // When @babel/plugin-proposal-decorators implements initializers,
      // do this instead of the initializer below. See:
      // https://github.com/babel/babel/issues/9260 extras: [
      //   {
      //     kind: 'initializer',
      //     placement: 'own',
      //     initializer: descriptor.initializer,
      //   }
      // ],
      initializer: function initializer() {
        if (typeof element.initializer === 'function') {
          this[element.key] = element.initializer.call(this);
        }
      },
      finisher: function finisher(clazz) {
        clazz.createProperty(element.key, options);
      }
    };
  }
};
var legacyProperty = function legacyProperty(options, proto, name) {
  proto.constructor.createProperty(name, options);
};
/**
 * A property decorator which creates a reactive property that reflects a
 * corresponding attribute value. When a decorated property is set
 * the element will update and render. A {@linkcode PropertyDeclaration} may
 * optionally be supplied to configure property features.
 *
 * This decorator should only be used for public fields. As public fields,
 * properties should be considered as primarily settable by element users,
 * either via attribute or the property itself.
 *
 * Generally, properties that are changed by the element should be private or
 * protected fields and should use the {@linkcode state} decorator.
 *
 * However, sometimes element code does need to set a public property. This
 * should typically only be done in response to user interaction, and an event
 * should be fired informing the user; for example, a checkbox sets its
 * `checked` property when clicked and fires a `changed` event. Mutating public
 * properties should typically not be done for non-primitive (object or array)
 * properties. In other cases when an element needs to manage state, a private
 * property decorated via the {@linkcode state} decorator should be used. When
 * needed, state properties can be initialized via public properties to
 * facilitate complex interactions.
 *
 * ```ts
 * class MyElement {
 *   @property({ type: Boolean })
 *   clicked = false;
 * }
 * ```
 * @category Decorator
 * @ExportDecoratedItems
 */
function property(options) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function (protoOrDescriptor, name) {
    return name !== undefined ? legacyProperty(options, protoOrDescriptor, name) : standardProperty(options, protoOrDescriptor);
  };
}

/***/ }),

/***/ "./node_modules/@lit/reactive-element/development/decorators/query-all.js":
/*!********************************************************************************!*\
  !*** ./node_modules/@lit/reactive-element/development/decorators/query-all.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   queryAll: () => (/* binding */ queryAll)
/* harmony export */ });
/* harmony import */ var _base_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base.js */ "./node_modules/@lit/reactive-element/development/decorators/base.js");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

/**
 * A property decorator that converts a class property into a getter
 * that executes a querySelectorAll on the element's renderRoot.
 *
 * @param selector A DOMString containing one or more selectors to match.
 *
 * See:
 * https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll
 *
 * ```ts
 * class MyElement {
 *   @queryAll('div')
 *   divs: NodeListOf<HTMLDivElement>;
 *
 *   render() {
 *     return html`
 *       <div id="first"></div>
 *       <div id="second"></div>
 *     `;
 *   }
 * }
 * ```
 * @category Decorator
 */
function queryAll(selector) {
  return (0,_base_js__WEBPACK_IMPORTED_MODULE_0__.decorateProperty)({
    descriptor: function descriptor(_name) {
      return {
        get: function get() {
          var _a, _b;
          return (_b = (_a = this.renderRoot) === null || _a === void 0 ? void 0 : _a.querySelectorAll(selector)) !== null && _b !== void 0 ? _b : [];
        },
        enumerable: true,
        configurable: true
      };
    }
  });
}

/***/ }),

/***/ "./node_modules/@lit/reactive-element/development/decorators/query-assigned-elements.js":
/*!**********************************************************************************************!*\
  !*** ./node_modules/@lit/reactive-element/development/decorators/query-assigned-elements.js ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   queryAssignedElements: () => (/* binding */ queryAssignedElements)
/* harmony export */ });
/* harmony import */ var _base_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base.js */ "./node_modules/@lit/reactive-element/development/decorators/base.js");
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var _a;
/*
 * IMPORTANT: For compatibility with tsickle and the Closure JS compiler, all
 * property decorators (but not class decorators) in this file that have
 * an @ExportDecoratedItems annotation must be defined as a regular function,
 * not an arrow function.
 */

var NODE_MODE = false;
var global = NODE_MODE ? globalThis : window;
/**
 * A tiny module scoped polyfill for HTMLSlotElement.assignedElements.
 */
var slotAssignedElements = ((_a = global.HTMLSlotElement) === null || _a === void 0 ? void 0 : _a.prototype.assignedElements) != null ? function (slot, opts) {
  return slot.assignedElements(opts);
} : function (slot, opts) {
  return slot.assignedNodes(opts).filter(function (node) {
    return node.nodeType === Node.ELEMENT_NODE;
  });
};
/**
 * A property decorator that converts a class property into a getter that
 * returns the `assignedElements` of the given `slot`. Provides a declarative
 * way to use
 * [`HTMLSlotElement.assignedElements`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLSlotElement/assignedElements).
 *
 * Can be passed an optional {@linkcode QueryAssignedElementsOptions} object.
 *
 * Example usage:
 * ```ts
 * class MyElement {
 *   @queryAssignedElements({ slot: 'list' })
 *   listItems!: Array<HTMLElement>;
 *   @queryAssignedElements()
 *   unnamedSlotEls!: Array<HTMLElement>;
 *
 *   render() {
 *     return html`
 *       <slot name="list"></slot>
 *       <slot></slot>
 *     `;
 *   }
 * }
 * ```
 *
 * Note, the type of this property should be annotated as `Array<HTMLElement>`.
 *
 * @category Decorator
 */
function queryAssignedElements(options) {
  var _ref = options !== null && options !== void 0 ? options : {},
    slot = _ref.slot,
    selector = _ref.selector;
  return (0,_base_js__WEBPACK_IMPORTED_MODULE_0__.decorateProperty)({
    descriptor: function descriptor(_name) {
      return {
        get: function get() {
          var _a;
          var slotSelector = "slot".concat(slot ? "[name=".concat(slot, "]") : ':not([name])');
          var slotEl = (_a = this.renderRoot) === null || _a === void 0 ? void 0 : _a.querySelector(slotSelector);
          var elements = slotEl != null ? slotAssignedElements(slotEl, options) : [];
          if (selector) {
            return elements.filter(function (node) {
              return node.matches(selector);
            });
          }
          return elements;
        },
        enumerable: true,
        configurable: true
      };
    }
  });
}

/***/ }),

/***/ "./node_modules/@lit/reactive-element/development/decorators/query-assigned-nodes.js":
/*!*******************************************************************************************!*\
  !*** ./node_modules/@lit/reactive-element/development/decorators/query-assigned-nodes.js ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   queryAssignedNodes: () => (/* binding */ queryAssignedNodes)
/* harmony export */ });
/* harmony import */ var _base_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base.js */ "./node_modules/@lit/reactive-element/development/decorators/base.js");
/* harmony import */ var _query_assigned_elements_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./query-assigned-elements.js */ "./node_modules/@lit/reactive-element/development/decorators/query-assigned-elements.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/*
 * IMPORTANT: For compatibility with tsickle and the Closure JS compiler, all
 * property decorators (but not class decorators) in this file that have
 * an @ExportDecoratedItems annotation must be defined as a regular function,
 * not an arrow function.
 */


function queryAssignedNodes(slotOrOptions, flatten, selector) {
  // Normalize the overloaded arguments.
  var slot = slotOrOptions;
  var assignedNodesOptions;
  if (_typeof(slotOrOptions) === 'object') {
    slot = slotOrOptions.slot;
    assignedNodesOptions = slotOrOptions;
  } else {
    assignedNodesOptions = {
      flatten: flatten
    };
  }
  // For backwards compatibility, queryAssignedNodes with a selector behaves
  // exactly like queryAssignedElements with a selector.
  if (selector) {
    return (0,_query_assigned_elements_js__WEBPACK_IMPORTED_MODULE_1__.queryAssignedElements)({
      slot: slot,
      flatten: flatten,
      selector: selector
    });
  }
  return (0,_base_js__WEBPACK_IMPORTED_MODULE_0__.decorateProperty)({
    descriptor: function descriptor(_name) {
      return {
        get: function get() {
          var _a, _b;
          var slotSelector = "slot".concat(slot ? "[name=".concat(slot, "]") : ':not([name])');
          var slotEl = (_a = this.renderRoot) === null || _a === void 0 ? void 0 : _a.querySelector(slotSelector);
          return (_b = slotEl === null || slotEl === void 0 ? void 0 : slotEl.assignedNodes(assignedNodesOptions)) !== null && _b !== void 0 ? _b : [];
        },
        enumerable: true,
        configurable: true
      };
    }
  });
}

/***/ }),

/***/ "./node_modules/@lit/reactive-element/development/decorators/query-async.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/@lit/reactive-element/development/decorators/query-async.js ***!
  \**********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   queryAsync: () => (/* binding */ queryAsync)
/* harmony export */ });
/* harmony import */ var _base_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base.js */ "./node_modules/@lit/reactive-element/development/decorators/base.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

// Note, in the future, we may extend this decorator to support the use case
// where the queried element may need to do work to become ready to interact
// with (e.g. load some implementation code). If so, we might elect to
// add a second argument defining a function that can be run to make the
// queried element loaded/updated/ready.
/**
 * A property decorator that converts a class property into a getter that
 * returns a promise that resolves to the result of a querySelector on the
 * element's renderRoot done after the element's `updateComplete` promise
 * resolves. When the queried property may change with element state, this
 * decorator can be used instead of requiring users to await the
 * `updateComplete` before accessing the property.
 *
 * @param selector A DOMString containing one or more selectors to match.
 *
 * See: https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector
 *
 * ```ts
 * class MyElement {
 *   @queryAsync('#first')
 *   first: Promise<HTMLDivElement>;
 *
 *   render() {
 *     return html`
 *       <div id="first"></div>
 *       <div id="second"></div>
 *     `;
 *   }
 * }
 *
 * // external usage
 * async doSomethingWithFirst() {
 *  (await aMyElement.first).doSomething();
 * }
 * ```
 * @category Decorator
 */
function queryAsync(selector) {
  return (0,_base_js__WEBPACK_IMPORTED_MODULE_0__.decorateProperty)({
    descriptor: function descriptor(_name) {
      return {
        get: function get() {
          var _this = this;
          return _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
            var _a;
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return _this.updateComplete;
                case 2:
                  return _context.abrupt("return", (_a = _this.renderRoot) === null || _a === void 0 ? void 0 : _a.querySelector(selector));
                case 3:
                case "end":
                  return _context.stop();
              }
            }, _callee);
          }))();
        },
        enumerable: true,
        configurable: true
      };
    }
  });
}

/***/ }),

/***/ "./node_modules/@lit/reactive-element/development/decorators/query.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@lit/reactive-element/development/decorators/query.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   query: () => (/* binding */ query)
/* harmony export */ });
/* harmony import */ var _base_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base.js */ "./node_modules/@lit/reactive-element/development/decorators/base.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

/**
 * A property decorator that converts a class property into a getter that
 * executes a querySelector on the element's renderRoot.
 *
 * @param selector A DOMString containing one or more selectors to match.
 * @param cache An optional boolean which when true performs the DOM query only
 *     once and caches the result.
 *
 * See: https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector
 *
 * ```ts
 * class MyElement {
 *   @query('#first')
 *   first: HTMLDivElement;
 *
 *   render() {
 *     return html`
 *       <div id="first"></div>
 *       <div id="second"></div>
 *     `;
 *   }
 * }
 * ```
 * @category Decorator
 */
function query(selector, cache) {
  return (0,_base_js__WEBPACK_IMPORTED_MODULE_0__.decorateProperty)({
    descriptor: function descriptor(name) {
      var descriptor = {
        get: function get() {
          var _a, _b;
          return (_b = (_a = this.renderRoot) === null || _a === void 0 ? void 0 : _a.querySelector(selector)) !== null && _b !== void 0 ? _b : null;
        },
        enumerable: true,
        configurable: true
      };
      if (cache) {
        var key = _typeof(name) === 'symbol' ? Symbol() : "__".concat(name);
        descriptor.get = function () {
          var _a, _b;
          if (this[key] === undefined) {
            this[key] = (_b = (_a = this.renderRoot) === null || _a === void 0 ? void 0 : _a.querySelector(selector)) !== null && _b !== void 0 ? _b : null;
          }
          return this[key];
        };
      }
      return descriptor;
    }
  });
}

/***/ }),

/***/ "./node_modules/@lit/reactive-element/development/decorators/state.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@lit/reactive-element/development/decorators/state.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   state: () => (/* binding */ state)
/* harmony export */ });
/* harmony import */ var _property_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./property.js */ "./node_modules/@lit/reactive-element/development/decorators/property.js");
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/*
 * IMPORTANT: For compatibility with tsickle and the Closure JS compiler, all
 * property decorators (but not class decorators) in this file that have
 * an @ExportDecoratedItems annotation must be defined as a regular function,
 * not an arrow function.
 */

/**
 * Declares a private or protected reactive property that still triggers
 * updates to the element when it changes. It does not reflect from the
 * corresponding attribute.
 *
 * Properties declared this way must not be used from HTML or HTML templating
 * systems, they're solely for properties internal to the element. These
 * properties may be renamed by optimization tools like closure compiler.
 * @category Decorator
 */
function state(options) {
  return (0,_property_js__WEBPACK_IMPORTED_MODULE_0__.property)(_extends({}, options, {
    state: true
  }));
}

/***/ }),

/***/ "./node_modules/@lit/reactive-element/development/reactive-element.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@lit/reactive-element/development/reactive-element.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CSSResult: () => (/* reexport safe */ _css_tag_js__WEBPACK_IMPORTED_MODULE_0__.CSSResult),
/* harmony export */   ReactiveElement: () => (/* binding */ ReactiveElement),
/* harmony export */   adoptStyles: () => (/* reexport safe */ _css_tag_js__WEBPACK_IMPORTED_MODULE_0__.adoptStyles),
/* harmony export */   css: () => (/* reexport safe */ _css_tag_js__WEBPACK_IMPORTED_MODULE_0__.css),
/* harmony export */   defaultConverter: () => (/* binding */ defaultConverter),
/* harmony export */   getCompatibleStyle: () => (/* reexport safe */ _css_tag_js__WEBPACK_IMPORTED_MODULE_0__.getCompatibleStyle),
/* harmony export */   notEqual: () => (/* binding */ notEqual),
/* harmony export */   supportsAdoptingStyleSheets: () => (/* reexport safe */ _css_tag_js__WEBPACK_IMPORTED_MODULE_0__.supportsAdoptingStyleSheets),
/* harmony export */   unsafeCSS: () => (/* reexport safe */ _css_tag_js__WEBPACK_IMPORTED_MODULE_0__.unsafeCSS)
/* harmony export */ });
/* harmony import */ var _css_tag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./css-tag.js */ "./node_modules/@lit/reactive-element/development/css-tag.js");
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _wrapNativeSuper(t) { var r = "function" == typeof Map ? new Map() : void 0; return _wrapNativeSuper = function _wrapNativeSuper(t) { if (null === t || !_isNativeFunction(t)) return t; if ("function" != typeof t) throw new TypeError("Super expression must either be null or a function"); if (void 0 !== r) { if (r.has(t)) return r.get(t); r.set(t, Wrapper); } function Wrapper() { return _construct(t, arguments, _getPrototypeOf(this).constructor); } return Wrapper.prototype = Object.create(t.prototype, { constructor: { value: Wrapper, enumerable: !1, writable: !0, configurable: !0 } }), _setPrototypeOf(Wrapper, t); }, _wrapNativeSuper(t); }
function _construct(t, e, r) { if (_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments); var o = [null]; o.push.apply(o, e); var p = new (t.bind.apply(t, o))(); return r && _setPrototypeOf(p, r.prototype), p; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _isNativeFunction(t) { try { return -1 !== Function.toString.call(t).indexOf("[native code]"); } catch (n) { return "function" == typeof t; } }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var _a, _b, _c, _d;
var _e;
/**
 * Use this module if you want to create your own base class extending
 * {@link ReactiveElement}.
 * @packageDocumentation
 */

// In the Node build, this import will be injected by Rollup:
// import {HTMLElement, customElements} from '@lit-labs/ssr-dom-shim';

var NODE_MODE = false;
var global = NODE_MODE ? globalThis : window;
if (NODE_MODE) {
  (_a = global.customElements) !== null && _a !== void 0 ? _a : global.customElements = customElements;
}
var DEV_MODE = true;
var requestUpdateThenable;
var issueWarning;
var trustedTypes = global.trustedTypes;
// Temporary workaround for https://crbug.com/993268
// Currently, any attribute starting with "on" is considered to be a
// TrustedScript source. Such boolean attributes must be set to the equivalent
// trusted emptyScript value.
var emptyStringForBooleanAttribute = trustedTypes ? trustedTypes.emptyScript : '';
var polyfillSupport = DEV_MODE ? global.reactiveElementPolyfillSupportDevMode : global.reactiveElementPolyfillSupport;
if (DEV_MODE) {
  // Ensure warnings are issued only 1x, even if multiple versions of Lit
  // are loaded.
  var issuedWarnings = (_b = global.litIssuedWarnings) !== null && _b !== void 0 ? _b : global.litIssuedWarnings = new Set();
  // Issue a warning, if we haven't already.
  issueWarning = function issueWarning(code, warning) {
    warning += " See https://lit.dev/msg/".concat(code, " for more information.");
    if (!issuedWarnings.has(warning)) {
      console.warn(warning);
      issuedWarnings.add(warning);
    }
  };
  issueWarning('dev-mode', "Lit is in dev mode. Not recommended for production!");
  // Issue polyfill support warning.
  if (((_c = global.ShadyDOM) === null || _c === void 0 ? void 0 : _c.inUse) && polyfillSupport === undefined) {
    issueWarning('polyfill-support-missing', "Shadow DOM is being polyfilled via `ShadyDOM` but " + "the `polyfill-support` module has not been loaded.");
  }
  requestUpdateThenable = function requestUpdateThenable(name) {
    return {
      then: function then(onfulfilled, _onrejected) {
        issueWarning('request-update-promise', "The `requestUpdate` method should no longer return a Promise but " + "does so on `".concat(name, "`. Use `updateComplete` instead."));
        if (onfulfilled !== undefined) {
          onfulfilled(false);
        }
      }
    };
  };
}
/**
 * Useful for visualizing and logging insights into what the Lit template system is doing.
 *
 * Compiled out of prod mode builds.
 */
var debugLogEvent = DEV_MODE ? function (event) {
  var shouldEmit = global.emitLitDebugLogEvents;
  if (!shouldEmit) {
    return;
  }
  global.dispatchEvent(new CustomEvent('lit-debug', {
    detail: event
  }));
} : undefined;
/*
 * When using Closure Compiler, JSCompiler_renameProperty(property, object) is
 * replaced at compile time by the munged name for object[property]. We cannot
 * alias this function, so we have to use a small shim that has the same
 * behavior when not compiling.
 */
/*@__INLINE__*/
var JSCompiler_renameProperty = function JSCompiler_renameProperty(prop, _obj) {
  return prop;
};
var defaultConverter = {
  toAttribute: function toAttribute(value, type) {
    switch (type) {
      case Boolean:
        value = value ? emptyStringForBooleanAttribute : null;
        break;
      case Object:
      case Array:
        // if the value is `null` or `undefined` pass this through
        // to allow removing/no change behavior.
        value = value == null ? value : JSON.stringify(value);
        break;
    }
    return value;
  },
  fromAttribute: function fromAttribute(value, type) {
    var fromValue = value;
    switch (type) {
      case Boolean:
        fromValue = value !== null;
        break;
      case Number:
        fromValue = value === null ? null : Number(value);
        break;
      case Object:
      case Array:
        // Do *not* generate exception when invalid JSON is set as elements
        // don't normally complain on being mis-configured.
        // TODO(sorvell): Do generate exception in *dev mode*.
        try {
          // Assert to adhere to Bazel's "must type assert JSON parse" rule.
          fromValue = JSON.parse(value);
        } catch (e) {
          fromValue = null;
        }
        break;
    }
    return fromValue;
  }
};
/**
 * Change function that returns true if `value` is different from `oldValue`.
 * This method is used as the default for a property's `hasChanged` function.
 */
var notEqual = function notEqual(value, old) {
  // This ensures (old==NaN, value==NaN) always returns false
  return old !== value && (old === old || value === value);
};
var defaultPropertyDeclaration = {
  attribute: true,
  type: String,
  converter: defaultConverter,
  reflect: false,
  hasChanged: notEqual
};
/**
 * The Closure JS Compiler doesn't currently have good support for static
 * property semantics where "this" is dynamic (e.g.
 * https://github.com/google/closure-compiler/issues/3177 and others) so we use
 * this hack to bypass any rewriting by the compiler.
 */
var finalized = 'finalized';
/**
 * Base element class which manages element properties and attributes. When
 * properties change, the `update` method is asynchronously called. This method
 * should be supplied by subclassers to render updates as desired.
 * @noInheritDoc
 */
var ReactiveElement
// In the Node build, this `extends` clause will be substituted with
// `(globalThis.HTMLElement ?? HTMLElement)`.
//
// This way, we will first prefer any global `HTMLElement` polyfill that the
// user has assigned, and then fall back to the `HTMLElement` shim which has
// been imported (see note at the top of this file about how this import is
// generated by Rollup). Note that the `HTMLElement` variable has been
// shadowed by this import, so it no longer refers to the global.
= /*#__PURE__*/function (_HTMLElement) {
  function ReactiveElement() {
    var _this;
    _classCallCheck(this, ReactiveElement);
    _this = _callSuper(this, ReactiveElement);
    _this.__instanceProperties = new Map();
    /**
     * True if there is a pending update as a result of calling `requestUpdate()`.
     * Should only be read.
     * @category updates
     */
    _this.isUpdatePending = false;
    /**
     * Is set to `true` after the first update. The element code cannot assume
     * that `renderRoot` exists before the element `hasUpdated`.
     * @category updates
     */
    _this.hasUpdated = false;
    /**
     * Name of currently reflecting property
     */
    _this.__reflectingProperty = null;
    _this.__initialize();
    return _this;
  }
  /**
   * Adds an initializer function to the class that is called during instance
   * construction.
   *
   * This is useful for code that runs against a `ReactiveElement`
   * subclass, such as a decorator, that needs to do work for each
   * instance, such as setting up a `ReactiveController`.
   *
   * ```ts
   * const myDecorator = (target: typeof ReactiveElement, key: string) => {
   *   target.addInitializer((instance: ReactiveElement) => {
   *     // This is run during construction of the element
   *     new MyController(instance);
   *   });
   * }
   * ```
   *
   * Decorating a field will then cause each instance to run an initializer
   * that adds a controller:
   *
   * ```ts
   * class MyElement extends LitElement {
   *   @myDecorator foo;
   * }
   * ```
   *
   * Initializers are stored per-constructor. Adding an initializer to a
   * subclass does not add it to a superclass. Since initializers are run in
   * constructors, initializers will run in order of the class hierarchy,
   * starting with superclasses and progressing to the instance's class.
   *
   * @nocollapse
   */
  _inherits(ReactiveElement, _HTMLElement);
  return _createClass(ReactiveElement, [{
    key: "__initialize",
    value:
    /**
     * Internal only override point for customizing work done when elements
     * are constructed.
     */
    function __initialize() {
      var _this2 = this;
      var _a;
      this.__updatePromise = new Promise(function (res) {
        return _this2.enableUpdating = res;
      });
      this._$changedProperties = new Map();
      this.__saveInstanceProperties();
      // ensures first update will be caught by an early access of
      // `updateComplete`
      this.requestUpdate();
      (_a = this.constructor._initializers) === null || _a === void 0 ? void 0 : _a.forEach(function (i) {
        return i(_this2);
      });
    }
    /**
     * Registers a `ReactiveController` to participate in the element's reactive
     * update cycle. The element automatically calls into any registered
     * controllers during its lifecycle callbacks.
     *
     * If the element is connected when `addController()` is called, the
     * controller's `hostConnected()` callback will be immediately called.
     * @category controllers
     */
  }, {
    key: "addController",
    value: function addController(controller) {
      var _a, _b;
      ((_a = this.__controllers) !== null && _a !== void 0 ? _a : this.__controllers = []).push(controller);
      // If a controller is added after the element has been connected,
      // call hostConnected. Note, re-using existence of `renderRoot` here
      // (which is set in connectedCallback) to avoid the need to track a
      // first connected state.
      if (this.renderRoot !== undefined && this.isConnected) {
        (_b = controller.hostConnected) === null || _b === void 0 ? void 0 : _b.call(controller);
      }
    }
    /**
     * Removes a `ReactiveController` from the element.
     * @category controllers
     */
  }, {
    key: "removeController",
    value: function removeController(controller) {
      var _a;
      // Note, if the indexOf is -1, the >>> will flip the sign which makes the
      // splice do nothing.
      (_a = this.__controllers) === null || _a === void 0 ? void 0 : _a.splice(this.__controllers.indexOf(controller) >>> 0, 1);
    }
    /**
     * Fixes any properties set on the instance before upgrade time.
     * Otherwise these would shadow the accessor and break these properties.
     * The properties are stored in a Map which is played back after the
     * constructor runs. Note, on very old versions of Safari (<=9) or Chrome
     * (<=41), properties created for native platform properties like (`id` or
     * `name`) may not have default values set in the element constructor. On
     * these browsers native properties appear on instances and therefore their
     * default value will overwrite any element default (e.g. if the element sets
     * this.id = 'id' in the constructor, the 'id' will become '' since this is
     * the native platform default).
     */
  }, {
    key: "__saveInstanceProperties",
    value: function __saveInstanceProperties() {
      var _this3 = this;
      // Use forEach so this works even if for/of loops are compiled to for loops
      // expecting arrays
      this.constructor.elementProperties.forEach(function (_v, p) {
        if (_this3.hasOwnProperty(p)) {
          _this3.__instanceProperties.set(p, _this3[p]);
          delete _this3[p];
        }
      });
    }
    /**
     * Returns the node into which the element should render and by default
     * creates and returns an open shadowRoot. Implement to customize where the
     * element's DOM is rendered. For example, to render into the element's
     * childNodes, return `this`.
     *
     * @return Returns a node into which to render.
     * @category rendering
     */
  }, {
    key: "createRenderRoot",
    value: function createRenderRoot() {
      var _a;
      var renderRoot = (_a = this.shadowRoot) !== null && _a !== void 0 ? _a : this.attachShadow(this.constructor.shadowRootOptions);
      (0,_css_tag_js__WEBPACK_IMPORTED_MODULE_0__.adoptStyles)(renderRoot, this.constructor.elementStyles);
      return renderRoot;
    }
    /**
     * On first connection, creates the element's renderRoot, sets up
     * element styling, and enables updating.
     * @category lifecycle
     */
  }, {
    key: "connectedCallback",
    value: function connectedCallback() {
      var _a;
      // create renderRoot before first update.
      if (this.renderRoot === undefined) {
        this.renderRoot = this.createRenderRoot();
      }
      this.enableUpdating(true);
      (_a = this.__controllers) === null || _a === void 0 ? void 0 : _a.forEach(function (c) {
        var _a;
        return (_a = c.hostConnected) === null || _a === void 0 ? void 0 : _a.call(c);
      });
    }
    /**
     * Note, this method should be considered final and not overridden. It is
     * overridden on the element instance with a function that triggers the first
     * update.
     * @category updates
     */
  }, {
    key: "enableUpdating",
    value: function enableUpdating(_requestedUpdate) {}
    /**
     * Allows for `super.disconnectedCallback()` in extensions while
     * reserving the possibility of making non-breaking feature additions
     * when disconnecting at some point in the future.
     * @category lifecycle
     */
  }, {
    key: "disconnectedCallback",
    value: function disconnectedCallback() {
      var _a;
      (_a = this.__controllers) === null || _a === void 0 ? void 0 : _a.forEach(function (c) {
        var _a;
        return (_a = c.hostDisconnected) === null || _a === void 0 ? void 0 : _a.call(c);
      });
    }
    /**
     * Synchronizes property values when attributes change.
     *
     * Specifically, when an attribute is set, the corresponding property is set.
     * You should rarely need to implement this callback. If this method is
     * overridden, `super.attributeChangedCallback(name, _old, value)` must be
     * called.
     *
     * See [using the lifecycle callbacks](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements#using_the_lifecycle_callbacks)
     * on MDN for more information about the `attributeChangedCallback`.
     * @category attributes
     */
  }, {
    key: "attributeChangedCallback",
    value: function attributeChangedCallback(name, _old, value) {
      this._$attributeToProperty(name, value);
    }
  }, {
    key: "__propertyToAttribute",
    value: function __propertyToAttribute(name, value) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultPropertyDeclaration;
      var _a;
      var attr = this.constructor.__attributeNameForProperty(name, options);
      if (attr !== undefined && options.reflect === true) {
        var converter = ((_a = options.converter) === null || _a === void 0 ? void 0 : _a.toAttribute) !== undefined ? options.converter : defaultConverter;
        var attrValue = converter.toAttribute(value, options.type);
        if (DEV_MODE && this.constructor.enabledWarnings.indexOf('migration') >= 0 && attrValue === undefined) {
          issueWarning('undefined-attribute-value', "The attribute value for the ".concat(name, " property is ") + "undefined on element ".concat(this.localName, ". The attribute will be ") + "removed, but in the previous version of `ReactiveElement`, " + "the attribute would not have changed.");
        }
        // Track if the property is being reflected to avoid
        // setting the property again via `attributeChangedCallback`. Note:
        // 1. this takes advantage of the fact that the callback is synchronous.
        // 2. will behave incorrectly if multiple attributes are in the reaction
        // stack at time of calling. However, since we process attributes
        // in `update` this should not be possible (or an extreme corner case
        // that we'd like to discover).
        // mark state reflecting
        this.__reflectingProperty = name;
        if (attrValue == null) {
          this.removeAttribute(attr);
        } else {
          this.setAttribute(attr, attrValue);
        }
        // mark state not reflecting
        this.__reflectingProperty = null;
      }
    }
    /** @internal */
  }, {
    key: "_$attributeToProperty",
    value: function _$attributeToProperty(name, value) {
      var _a;
      var ctor = this.constructor;
      // Note, hint this as an `AttributeMap` so closure clearly understands
      // the type; it has issues with tracking types through statics
      var propName = ctor.__attributeToPropertyMap.get(name);
      // Use tracking info to avoid reflecting a property value to an attribute
      // if it was just set because the attribute changed.
      if (propName !== undefined && this.__reflectingProperty !== propName) {
        var options = ctor.getPropertyOptions(propName);
        var converter = typeof options.converter === 'function' ? {
          fromAttribute: options.converter
        } : ((_a = options.converter) === null || _a === void 0 ? void 0 : _a.fromAttribute) !== undefined ? options.converter : defaultConverter;
        // mark state reflecting
        this.__reflectingProperty = propName;
        this[propName] = converter.fromAttribute(value, options.type
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        );
        // mark state not reflecting
        this.__reflectingProperty = null;
      }
    }
    /**
     * Requests an update which is processed asynchronously. This should be called
     * when an element should update based on some state not triggered by setting
     * a reactive property. In this case, pass no arguments. It should also be
     * called when manually implementing a property setter. In this case, pass the
     * property `name` and `oldValue` to ensure that any configured property
     * options are honored.
     *
     * @param name name of requesting property
     * @param oldValue old value of requesting property
     * @param options property options to use instead of the previously
     *     configured options
     * @category updates
     */
  }, {
    key: "requestUpdate",
    value: function requestUpdate(name, oldValue, options) {
      var shouldRequestUpdate = true;
      // If we have a property key, perform property update steps.
      if (name !== undefined) {
        options = options || this.constructor.getPropertyOptions(name);
        var hasChanged = options.hasChanged || notEqual;
        if (hasChanged(this[name], oldValue)) {
          if (!this._$changedProperties.has(name)) {
            this._$changedProperties.set(name, oldValue);
          }
          // Add to reflecting properties set.
          // Note, it's important that every change has a chance to add the
          // property to `_reflectingProperties`. This ensures setting
          // attribute + property reflects correctly.
          if (options.reflect === true && this.__reflectingProperty !== name) {
            if (this.__reflectingProperties === undefined) {
              this.__reflectingProperties = new Map();
            }
            this.__reflectingProperties.set(name, options);
          }
        } else {
          // Abort the request if the property should not be considered changed.
          shouldRequestUpdate = false;
        }
      }
      if (!this.isUpdatePending && shouldRequestUpdate) {
        this.__updatePromise = this.__enqueueUpdate();
      }
      // Note, since this no longer returns a promise, in dev mode we return a
      // thenable which warns if it's called.
      return DEV_MODE ? requestUpdateThenable(this.localName) : undefined;
    }
    /**
     * Sets up the element to asynchronously update.
     */
  }, {
    key: "__enqueueUpdate",
    value: (function () {
      var _enqueueUpdate = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var result;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              this.isUpdatePending = true;
              _context.prev = 1;
              _context.next = 4;
              return this.__updatePromise;
            case 4:
              _context.next = 9;
              break;
            case 6:
              _context.prev = 6;
              _context.t0 = _context["catch"](1);
              // Refire any previous errors async so they do not disrupt the update
              // cycle. Errors are refired so developers have a chance to observe
              // them, and this can be done by implementing
              // `window.onunhandledrejection`.
              Promise.reject(_context.t0);
            case 9:
              result = this.scheduleUpdate(); // If `scheduleUpdate` returns a Promise, we await it. This is done to
              // enable coordinating updates with a scheduler. Note, the result is
              // checked to avoid delaying an additional microtask unless we need to.
              if (!(result != null)) {
                _context.next = 13;
                break;
              }
              _context.next = 13;
              return result;
            case 13:
              return _context.abrupt("return", !this.isUpdatePending);
            case 14:
            case "end":
              return _context.stop();
          }
        }, _callee, this, [[1, 6]]);
      }));
      function __enqueueUpdate() {
        return _enqueueUpdate.apply(this, arguments);
      }
      return __enqueueUpdate;
    }()
    /**
     * Schedules an element update. You can override this method to change the
     * timing of updates by returning a Promise. The update will await the
     * returned Promise, and you should resolve the Promise to allow the update
     * to proceed. If this method is overridden, `super.scheduleUpdate()`
     * must be called.
     *
     * For instance, to schedule updates to occur just before the next frame:
     *
     * ```ts
     * override protected async scheduleUpdate(): Promise<unknown> {
     *   await new Promise((resolve) => requestAnimationFrame(() => resolve()));
     *   super.scheduleUpdate();
     * }
     * ```
     * @category updates
     */
    )
  }, {
    key: "scheduleUpdate",
    value: function scheduleUpdate() {
      return this.performUpdate();
    }
    /**
     * Performs an element update. Note, if an exception is thrown during the
     * update, `firstUpdated` and `updated` will not be called.
     *
     * Call `performUpdate()` to immediately process a pending update. This should
     * generally not be needed, but it can be done in rare cases when you need to
     * update synchronously.
     *
     * Note: To ensure `performUpdate()` synchronously completes a pending update,
     * it should not be overridden. In LitElement 2.x it was suggested to override
     * `performUpdate()` to also customizing update scheduling. Instead, you should now
     * override `scheduleUpdate()`. For backwards compatibility with LitElement 2.x,
     * scheduling updates via `performUpdate()` continues to work, but will make
     * also calling `performUpdate()` to synchronously process updates difficult.
     *
     * @category updates
     */
  }, {
    key: "performUpdate",
    value: function performUpdate() {
      var _this4 = this;
      var _a, _b;
      // Abort any update if one is not pending when this is called.
      // This can happen if `performUpdate` is called early to "flush"
      // the update.
      if (!this.isUpdatePending) {
        return;
      }
      debugLogEvent === null || debugLogEvent === void 0 ? void 0 : debugLogEvent({
        kind: 'update'
      });
      // create renderRoot before first update.
      if (!this.hasUpdated) {
        // Produce warning if any class properties are shadowed by class fields
        if (DEV_MODE) {
          var shadowedProperties = [];
          (_a = this.constructor.__reactivePropertyKeys) === null || _a === void 0 ? void 0 : _a.forEach(function (p) {
            var _a;
            if (_this4.hasOwnProperty(p) && !((_a = _this4.__instanceProperties) === null || _a === void 0 ? void 0 : _a.has(p))) {
              shadowedProperties.push(p);
            }
          });
          if (shadowedProperties.length) {
            throw new Error("The following properties on element ".concat(this.localName, " will not ") + "trigger updates as expected because they are set using class " + "fields: ".concat(shadowedProperties.join(', '), ". ") + "Native class fields and some compiled output will overwrite " + "accessors used for detecting changes. See " + "https://lit.dev/msg/class-field-shadowing " + "for more information.");
          }
        }
      }
      // Mixin instance properties once, if they exist.
      if (this.__instanceProperties) {
        // Use forEach so this works even if for/of loops are compiled to for loops
        // expecting arrays
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.__instanceProperties.forEach(function (v, p) {
          return _this4[p] = v;
        });
        this.__instanceProperties = undefined;
      }
      var shouldUpdate = false;
      var changedProperties = this._$changedProperties;
      try {
        shouldUpdate = this.shouldUpdate(changedProperties);
        if (shouldUpdate) {
          this.willUpdate(changedProperties);
          (_b = this.__controllers) === null || _b === void 0 ? void 0 : _b.forEach(function (c) {
            var _a;
            return (_a = c.hostUpdate) === null || _a === void 0 ? void 0 : _a.call(c);
          });
          this.update(changedProperties);
        } else {
          this.__markUpdated();
        }
      } catch (e) {
        // Prevent `firstUpdated` and `updated` from running when there's an
        // update exception.
        shouldUpdate = false;
        // Ensure element can accept additional updates after an exception.
        this.__markUpdated();
        throw e;
      }
      // The update is no longer considered pending and further updates are now allowed.
      if (shouldUpdate) {
        this._$didUpdate(changedProperties);
      }
    }
    /**
     * Invoked before `update()` to compute values needed during the update.
     *
     * Implement `willUpdate` to compute property values that depend on other
     * properties and are used in the rest of the update process.
     *
     * ```ts
     * willUpdate(changedProperties) {
     *   // only need to check changed properties for an expensive computation.
     *   if (changedProperties.has('firstName') || changedProperties.has('lastName')) {
     *     this.sha = computeSHA(`${this.firstName} ${this.lastName}`);
     *   }
     * }
     *
     * render() {
     *   return html`SHA: ${this.sha}`;
     * }
     * ```
     *
     * @category updates
     */
  }, {
    key: "willUpdate",
    value: function willUpdate(_changedProperties) {}
    // Note, this is an override point for polyfill-support.
    // @internal
  }, {
    key: "_$didUpdate",
    value: function _$didUpdate(changedProperties) {
      var _a;
      (_a = this.__controllers) === null || _a === void 0 ? void 0 : _a.forEach(function (c) {
        var _a;
        return (_a = c.hostUpdated) === null || _a === void 0 ? void 0 : _a.call(c);
      });
      if (!this.hasUpdated) {
        this.hasUpdated = true;
        this.firstUpdated(changedProperties);
      }
      this.updated(changedProperties);
      if (DEV_MODE && this.isUpdatePending && this.constructor.enabledWarnings.indexOf('change-in-update') >= 0) {
        issueWarning('change-in-update', "Element ".concat(this.localName, " scheduled an update ") + "(generally because a property was set) " + "after an update completed, causing a new update to be scheduled. " + "This is inefficient and should be avoided unless the next update " + "can only be scheduled as a side effect of the previous update.");
      }
    }
  }, {
    key: "__markUpdated",
    value: function __markUpdated() {
      this._$changedProperties = new Map();
      this.isUpdatePending = false;
    }
    /**
     * Returns a Promise that resolves when the element has completed updating.
     * The Promise value is a boolean that is `true` if the element completed the
     * update without triggering another update. The Promise result is `false` if
     * a property was set inside `updated()`. If the Promise is rejected, an
     * exception was thrown during the update.
     *
     * To await additional asynchronous work, override the `getUpdateComplete`
     * method. For example, it is sometimes useful to await a rendered element
     * before fulfilling this Promise. To do this, first await
     * `super.getUpdateComplete()`, then any subsequent state.
     *
     * @return A promise of a boolean that resolves to true if the update completed
     *     without triggering another update.
     * @category updates
     */
  }, {
    key: "updateComplete",
    get: function get() {
      return this.getUpdateComplete();
    }
    /**
     * Override point for the `updateComplete` promise.
     *
     * It is not safe to override the `updateComplete` getter directly due to a
     * limitation in TypeScript which means it is not possible to call a
     * superclass getter (e.g. `super.updateComplete.then(...)`) when the target
     * language is ES5 (https://github.com/microsoft/TypeScript/issues/338).
     * This method should be overridden instead. For example:
     *
     * ```ts
     * class MyElement extends LitElement {
     *   override async getUpdateComplete() {
     *     const result = await super.getUpdateComplete();
     *     await this._myChild.updateComplete;
     *     return result;
     *   }
     * }
     * ```
     *
     * @return A promise of a boolean that resolves to true if the update completed
     *     without triggering another update.
     * @category updates
     */
  }, {
    key: "getUpdateComplete",
    value: function getUpdateComplete() {
      return this.__updatePromise;
    }
    /**
     * Controls whether or not `update()` should be called when the element requests
     * an update. By default, this method always returns `true`, but this can be
     * customized to control when to update.
     *
     * @param _changedProperties Map of changed properties with old values
     * @category updates
     */
  }, {
    key: "shouldUpdate",
    value: function shouldUpdate(_changedProperties) {
      return true;
    }
    /**
     * Updates the element. This method reflects property values to attributes.
     * It can be overridden to render and keep updated element DOM.
     * Setting properties inside this method will *not* trigger
     * another update.
     *
     * @param _changedProperties Map of changed properties with old values
     * @category updates
     */
  }, {
    key: "update",
    value: function update(_changedProperties) {
      var _this5 = this;
      if (this.__reflectingProperties !== undefined) {
        // Use forEach so this works even if for/of loops are compiled to for
        // loops expecting arrays
        this.__reflectingProperties.forEach(function (v, k) {
          return _this5.__propertyToAttribute(k, _this5[k], v);
        });
        this.__reflectingProperties = undefined;
      }
      this.__markUpdated();
    }
    /**
     * Invoked whenever the element is updated. Implement to perform
     * post-updating tasks via DOM APIs, for example, focusing an element.
     *
     * Setting properties inside this method will trigger the element to update
     * again after this update cycle completes.
     *
     * @param _changedProperties Map of changed properties with old values
     * @category updates
     */
  }, {
    key: "updated",
    value: function updated(_changedProperties) {}
    /**
     * Invoked when the element is first updated. Implement to perform one time
     * work on the element after update.
     *
     * ```ts
     * firstUpdated() {
     *   this.renderRoot.getElementById('my-text-area').focus();
     * }
     * ```
     *
     * Setting properties inside this method will trigger the element to update
     * again after this update cycle completes.
     *
     * @param _changedProperties Map of changed properties with old values
     * @category updates
     */
  }, {
    key: "firstUpdated",
    value: function firstUpdated(_changedProperties) {}
  }], [{
    key: "addInitializer",
    value: function addInitializer(initializer) {
      var _a;
      this.finalize();
      ((_a = this._initializers) !== null && _a !== void 0 ? _a : this._initializers = []).push(initializer);
    }
    /**
     * Returns a list of attributes corresponding to the registered properties.
     * @nocollapse
     * @category attributes
     */
  }, {
    key: "observedAttributes",
    get: function get() {
      var _this6 = this;
      // note: piggy backing on this to ensure we're finalized.
      this.finalize();
      var attributes = [];
      // Use forEach so this works even if for/of loops are compiled to for loops
      // expecting arrays
      this.elementProperties.forEach(function (v, p) {
        var attr = _this6.__attributeNameForProperty(p, v);
        if (attr !== undefined) {
          _this6.__attributeToPropertyMap.set(attr, p);
          attributes.push(attr);
        }
      });
      return attributes;
    }
    /**
     * Creates a property accessor on the element prototype if one does not exist
     * and stores a {@linkcode PropertyDeclaration} for the property with the
     * given options. The property setter calls the property's `hasChanged`
     * property option or uses a strict identity check to determine whether or not
     * to request an update.
     *
     * This method may be overridden to customize properties; however,
     * when doing so, it's important to call `super.createProperty` to ensure
     * the property is setup correctly. This method calls
     * `getPropertyDescriptor` internally to get a descriptor to install.
     * To customize what properties do when they are get or set, override
     * `getPropertyDescriptor`. To customize the options for a property,
     * implement `createProperty` like this:
     *
     * ```ts
     * static createProperty(name, options) {
     *   options = Object.assign(options, {myOption: true});
     *   super.createProperty(name, options);
     * }
     * ```
     *
     * @nocollapse
     * @category properties
     */
  }, {
    key: "createProperty",
    value: function createProperty(name) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultPropertyDeclaration;
      var _a;
      // if this is a state property, force the attribute to false.
      if (options.state) {
        // Cast as any since this is readonly.
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        options.attribute = false;
      }
      // Note, since this can be called by the `@property` decorator which
      // is called before `finalize`, we ensure finalization has been kicked off.
      this.finalize();
      this.elementProperties.set(name, options);
      // Do not generate an accessor if the prototype already has one, since
      // it would be lost otherwise and that would never be the user's intention;
      // Instead, we expect users to call `requestUpdate` themselves from
      // user-defined accessors. Note that if the super has an accessor we will
      // still overwrite it
      if (!options.noAccessor && !this.prototype.hasOwnProperty(name)) {
        var key = _typeof(name) === 'symbol' ? Symbol() : "__".concat(name);
        var descriptor = this.getPropertyDescriptor(name, key, options);
        if (descriptor !== undefined) {
          Object.defineProperty(this.prototype, name, descriptor);
          if (DEV_MODE) {
            // If this class doesn't have its own set, create one and initialize
            // with the values in the set from the nearest ancestor class, if any.
            if (!this.hasOwnProperty('__reactivePropertyKeys')) {
              this.__reactivePropertyKeys = new Set((_a = this.__reactivePropertyKeys) !== null && _a !== void 0 ? _a : []);
            }
            this.__reactivePropertyKeys.add(name);
          }
        }
      }
    }
    /**
     * Returns a property descriptor to be defined on the given named property.
     * If no descriptor is returned, the property will not become an accessor.
     * For example,
     *
     * ```ts
     * class MyElement extends LitElement {
     *   static getPropertyDescriptor(name, key, options) {
     *     const defaultDescriptor =
     *         super.getPropertyDescriptor(name, key, options);
     *     const setter = defaultDescriptor.set;
     *     return {
     *       get: defaultDescriptor.get,
     *       set(value) {
     *         setter.call(this, value);
     *         // custom action.
     *       },
     *       configurable: true,
     *       enumerable: true
     *     }
     *   }
     * }
     * ```
     *
     * @nocollapse
     * @category properties
     */
  }, {
    key: "getPropertyDescriptor",
    value: function getPropertyDescriptor(name, key, options) {
      return {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        get: function get() {
          return this[key];
        },
        set: function set(value) {
          var oldValue = this[name];
          this[key] = value;
          this.requestUpdate(name, oldValue, options);
        },
        configurable: true,
        enumerable: true
      };
    }
    /**
     * Returns the property options associated with the given property.
     * These options are defined with a `PropertyDeclaration` via the `properties`
     * object or the `@property` decorator and are registered in
     * `createProperty(...)`.
     *
     * Note, this method should be considered "final" and not overridden. To
     * customize the options for a given property, override
     * {@linkcode createProperty}.
     *
     * @nocollapse
     * @final
     * @category properties
     */
  }, {
    key: "getPropertyOptions",
    value: function getPropertyOptions(name) {
      return this.elementProperties.get(name) || defaultPropertyDeclaration;
    }
    /**
     * Creates property accessors for registered properties, sets up element
     * styling, and ensures any superclasses are also finalized. Returns true if
     * the element was finalized.
     * @nocollapse
     */
  }, {
    key: "finalize",
    value: function finalize() {
      var _this7 = this;
      if (this.hasOwnProperty(finalized)) {
        return false;
      }
      this[finalized] = true;
      // finalize any superclasses
      var superCtor = Object.getPrototypeOf(this);
      superCtor.finalize();
      // Create own set of initializers for this class if any exist on the
      // superclass and copy them down. Note, for a small perf boost, avoid
      // creating initializers unless needed.
      if (superCtor._initializers !== undefined) {
        this._initializers = _toConsumableArray(superCtor._initializers);
      }
      this.elementProperties = new Map(superCtor.elementProperties);
      // initialize Map populated in observedAttributes
      this.__attributeToPropertyMap = new Map();
      // make any properties
      // Note, only process "own" properties since this element will inherit
      // any properties defined on the superClass, and finalization ensures
      // the entire prototype chain is finalized.
      if (this.hasOwnProperty(JSCompiler_renameProperty('properties', this))) {
        var props = this.properties;
        // support symbols in properties (IE11 does not support this)
        var propKeys = [].concat(_toConsumableArray(Object.getOwnPropertyNames(props)), _toConsumableArray(Object.getOwnPropertySymbols(props)));
        // This for/of is ok because propKeys is an array
        var _iterator = _createForOfIteratorHelper(propKeys),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var p = _step.value;
            // note, use of `any` is due to TypeScript lack of support for symbol in
            // index types
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            this.createProperty(p, props[p]);
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }
      this.elementStyles = this.finalizeStyles(this.styles);
      // DEV mode warnings
      if (DEV_MODE) {
        var warnRemovedOrRenamed = function warnRemovedOrRenamed(name) {
          var renamed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
          if (_this7.prototype.hasOwnProperty(name)) {
            issueWarning(renamed ? 'renamed-api' : 'removed-api', "`".concat(name, "` is implemented on class ").concat(_this7.name, ". It ") + "has been ".concat(renamed ? 'renamed' : 'removed', " ") + "in this version of LitElement.");
          }
        };
        warnRemovedOrRenamed('initialize');
        warnRemovedOrRenamed('requestUpdateInternal');
        warnRemovedOrRenamed('_getUpdateComplete', true);
      }
      return true;
    }
    /**
     * Takes the styles the user supplied via the `static styles` property and
     * returns the array of styles to apply to the element.
     * Override this method to integrate into a style management system.
     *
     * Styles are deduplicated preserving the _last_ instance in the list. This
     * is a performance optimization to avoid duplicated styles that can occur
     * especially when composing via subclassing. The last item is kept to try
     * to preserve the cascade order with the assumption that it's most important
     * that last added styles override previous styles.
     *
     * @nocollapse
     * @category styles
     */
  }, {
    key: "finalizeStyles",
    value: function finalizeStyles(styles) {
      var elementStyles = [];
      if (Array.isArray(styles)) {
        // Dedupe the flattened array in reverse order to preserve the last items.
        // Casting to Array<unknown> works around TS error that
        // appears to come from trying to flatten a type CSSResultArray.
        var set = new Set(styles.flat(Infinity).reverse());
        // Then preserve original order by adding the set items in reverse order.
        var _iterator2 = _createForOfIteratorHelper(set),
          _step2;
        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var s = _step2.value;
            elementStyles.unshift((0,_css_tag_js__WEBPACK_IMPORTED_MODULE_0__.getCompatibleStyle)(s));
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      } else if (styles !== undefined) {
        elementStyles.push((0,_css_tag_js__WEBPACK_IMPORTED_MODULE_0__.getCompatibleStyle)(styles));
      }
      return elementStyles;
    }
    /**
     * Returns the property name for the given attribute `name`.
     * @nocollapse
     */
  }, {
    key: "__attributeNameForProperty",
    value: function __attributeNameForProperty(name, options) {
      var attribute = options.attribute;
      return attribute === false ? undefined : typeof attribute === 'string' ? attribute : typeof name === 'string' ? name.toLowerCase() : undefined;
    }
  }]);
}(/*#__PURE__*/_wrapNativeSuper(HTMLElement));
_e = finalized;
/**
 * Marks class as having finished creating properties.
 */
ReactiveElement[_e] = true;
/**
 * Memoized list of all element properties, including any superclass properties.
 * Created lazily on user subclasses when finalizing the class.
 * @nocollapse
 * @category properties
 */
ReactiveElement.elementProperties = new Map();
/**
 * Memoized list of all element styles.
 * Created lazily on user subclasses when finalizing the class.
 * @nocollapse
 * @category styles
 */
ReactiveElement.elementStyles = [];
/**
 * Options used when calling `attachShadow`. Set this property to customize
 * the options for the shadowRoot; for example, to create a closed
 * shadowRoot: `{mode: 'closed'}`.
 *
 * Note, these options are used in `createRenderRoot`. If this method
 * is customized, options should be respected if possible.
 * @nocollapse
 * @category rendering
 */
ReactiveElement.shadowRootOptions = {
  mode: 'open'
};
// Apply polyfills if available
polyfillSupport === null || polyfillSupport === void 0 ? void 0 : polyfillSupport({
  ReactiveElement: ReactiveElement
});
// Dev mode warnings...
if (DEV_MODE) {
  // Default warning set.
  ReactiveElement.enabledWarnings = ['change-in-update'];
  var ensureOwnWarnings = function ensureOwnWarnings(ctor) {
    if (!ctor.hasOwnProperty(JSCompiler_renameProperty('enabledWarnings', ctor))) {
      ctor.enabledWarnings = ctor.enabledWarnings.slice();
    }
  };
  ReactiveElement.enableWarning = function (warning) {
    ensureOwnWarnings(this);
    if (this.enabledWarnings.indexOf(warning) < 0) {
      this.enabledWarnings.push(warning);
    }
  };
  ReactiveElement.disableWarning = function (warning) {
    ensureOwnWarnings(this);
    var i = this.enabledWarnings.indexOf(warning);
    if (i >= 0) {
      this.enabledWarnings.splice(i, 1);
    }
  };
}
// IMPORTANT: do not change the property name or the assignment expression.
// This line will be used in regexes to search for ReactiveElement usage.
((_d = global.reactiveElementVersions) !== null && _d !== void 0 ? _d : global.reactiveElementVersions = []).push('1.6.3');
if (DEV_MODE && global.reactiveElementVersions.length > 1) {
  issueWarning('multiple-versions', "Multiple versions of Lit loaded. Loading multiple versions " + "is not recommended.");
}

/***/ }),

/***/ "./node_modules/big.js/big.js":
/*!************************************!*\
  !*** ./node_modules/big.js/big.js ***!
  \************************************/
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/*
 *  big.js v5.2.2
 *  A small, fast, easy-to-use library for arbitrary-precision decimal arithmetic.
 *  Copyright (c) 2018 Michael Mclaughlin <M8ch88l@gmail.com>
 *  https://github.com/MikeMcl/big.js/LICENCE
 */
;
(function (GLOBAL) {
  'use strict';

  var Big,
    /************************************** EDITABLE DEFAULTS *****************************************/

    // The default values below must be integers within the stated ranges.

    /*
     * The maximum number of decimal places (DP) of the results of operations involving division:
     * div and sqrt, and pow with negative exponents.
     */
    DP = 20,
    // 0 to MAX_DP

    /*
     * The rounding mode (RM) used when rounding to the above decimal places.
     *
     *  0  Towards zero (i.e. truncate, no rounding).       (ROUND_DOWN)
     *  1  To nearest neighbour. If equidistant, round up.  (ROUND_HALF_UP)
     *  2  To nearest neighbour. If equidistant, to even.   (ROUND_HALF_EVEN)
     *  3  Away from zero.                                  (ROUND_UP)
     */
    RM = 1,
    // 0, 1, 2 or 3

    // The maximum value of DP and Big.DP.
    MAX_DP = 1E6,
    // 0 to 1000000

    // The maximum magnitude of the exponent argument to the pow method.
    MAX_POWER = 1E6,
    // 1 to 1000000

    /*
     * The negative exponent (NE) at and beneath which toString returns exponential notation.
     * (JavaScript numbers: -7)
     * -1000000 is the minimum recommended exponent value of a Big.
     */
    NE = -7,
    // 0 to -1000000

    /*
     * The positive exponent (PE) at and above which toString returns exponential notation.
     * (JavaScript numbers: 21)
     * 1000000 is the maximum recommended exponent value of a Big.
     * (This limit is not enforced or checked.)
     */
    PE = 21,
    // 0 to 1000000

    /**************************************************************************************************/

    // Error messages.
    NAME = '[big.js] ',
    INVALID = NAME + 'Invalid ',
    INVALID_DP = INVALID + 'decimal places',
    INVALID_RM = INVALID + 'rounding mode',
    DIV_BY_ZERO = NAME + 'Division by zero',
    // The shared prototype object.
    P = {},
    UNDEFINED = void 0,
    NUMERIC = /^-?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i;

  /*
   * Create and return a Big constructor.
   *
   */
  function _Big_() {
    /*
     * The Big constructor and exported function.
     * Create and return a new instance of a Big number object.
     *
     * n {number|string|Big} A numeric value.
     */
    function Big(n) {
      var x = this;

      // Enable constructor usage without new.
      if (!(x instanceof Big)) return n === UNDEFINED ? _Big_() : new Big(n);

      // Duplicate.
      if (n instanceof Big) {
        x.s = n.s;
        x.e = n.e;
        x.c = n.c.slice();
      } else {
        parse(x, n);
      }

      /*
       * Retain a reference to this Big constructor, and shadow Big.prototype.constructor which
       * points to Object.
       */
      x.constructor = Big;
    }
    Big.prototype = P;
    Big.DP = DP;
    Big.RM = RM;
    Big.NE = NE;
    Big.PE = PE;
    Big.version = '5.2.2';
    return Big;
  }

  /*
   * Parse the number or string value passed to a Big constructor.
   *
   * x {Big} A Big number instance.
   * n {number|string} A numeric value.
   */
  function parse(x, n) {
    var e, i, nl;

    // Minus zero?
    if (n === 0 && 1 / n < 0) n = '-0';else if (!NUMERIC.test(n += '')) throw Error(INVALID + 'number');

    // Determine sign.
    x.s = n.charAt(0) == '-' ? (n = n.slice(1), -1) : 1;

    // Decimal point?
    if ((e = n.indexOf('.')) > -1) n = n.replace('.', '');

    // Exponential form?
    if ((i = n.search(/e/i)) > 0) {
      // Determine exponent.
      if (e < 0) e = i;
      e += +n.slice(i + 1);
      n = n.substring(0, i);
    } else if (e < 0) {
      // Integer.
      e = n.length;
    }
    nl = n.length;

    // Determine leading zeros.
    for (i = 0; i < nl && n.charAt(i) == '0';) ++i;
    if (i == nl) {
      // Zero.
      x.c = [x.e = 0];
    } else {
      // Determine trailing zeros.
      for (; nl > 0 && n.charAt(--nl) == '0';);
      x.e = e - i - 1;
      x.c = [];

      // Convert string to array of digits without leading/trailing zeros.
      for (e = 0; i <= nl;) x.c[e++] = +n.charAt(i++);
    }
    return x;
  }

  /*
   * Round Big x to a maximum of dp decimal places using rounding mode rm.
   * Called by stringify, P.div, P.round and P.sqrt.
   *
   * x {Big} The Big to round.
   * dp {number} Integer, 0 to MAX_DP inclusive.
   * rm {number} 0, 1, 2 or 3 (DOWN, HALF_UP, HALF_EVEN, UP)
   * [more] {boolean} Whether the result of division was truncated.
   */
  function round(x, dp, rm, more) {
    var xc = x.c,
      i = x.e + dp + 1;
    if (i < xc.length) {
      if (rm === 1) {
        // xc[i] is the digit after the digit that may be rounded up.
        more = xc[i] >= 5;
      } else if (rm === 2) {
        more = xc[i] > 5 || xc[i] == 5 && (more || i < 0 || xc[i + 1] !== UNDEFINED || xc[i - 1] & 1);
      } else if (rm === 3) {
        more = more || !!xc[0];
      } else {
        more = false;
        if (rm !== 0) throw Error(INVALID_RM);
      }
      if (i < 1) {
        xc.length = 1;
        if (more) {
          // 1, 0.1, 0.01, 0.001, 0.0001 etc.
          x.e = -dp;
          xc[0] = 1;
        } else {
          // Zero.
          xc[0] = x.e = 0;
        }
      } else {
        // Remove any digits after the required decimal places.
        xc.length = i--;

        // Round up?
        if (more) {
          // Rounding up may mean the previous digit has to be rounded up.
          for (; ++xc[i] > 9;) {
            xc[i] = 0;
            if (!i--) {
              ++x.e;
              xc.unshift(1);
            }
          }
        }

        // Remove trailing zeros.
        for (i = xc.length; !xc[--i];) xc.pop();
      }
    } else if (rm < 0 || rm > 3 || rm !== ~~rm) {
      throw Error(INVALID_RM);
    }
    return x;
  }

  /*
   * Return a string representing the value of Big x in normal or exponential notation.
   * Handles P.toExponential, P.toFixed, P.toJSON, P.toPrecision, P.toString and P.valueOf.
   *
   * x {Big}
   * id? {number} Caller id.
   *         1 toExponential
   *         2 toFixed
   *         3 toPrecision
   *         4 valueOf
   * n? {number|undefined} Caller's argument.
   * k? {number|undefined}
   */
  function stringify(x, id, n, k) {
    var e,
      s,
      Big = x.constructor,
      z = !x.c[0];
    if (n !== UNDEFINED) {
      if (n !== ~~n || n < (id == 3) || n > MAX_DP) {
        throw Error(id == 3 ? INVALID + 'precision' : INVALID_DP);
      }
      x = new Big(x);

      // The index of the digit that may be rounded up.
      n = k - x.e;

      // Round?
      if (x.c.length > ++k) round(x, n, Big.RM);

      // toFixed: recalculate k as x.e may have changed if value rounded up.
      if (id == 2) k = x.e + n + 1;

      // Append zeros?
      for (; x.c.length < k;) x.c.push(0);
    }
    e = x.e;
    s = x.c.join('');
    n = s.length;

    // Exponential notation?
    if (id != 2 && (id == 1 || id == 3 && k <= e || e <= Big.NE || e >= Big.PE)) {
      s = s.charAt(0) + (n > 1 ? '.' + s.slice(1) : '') + (e < 0 ? 'e' : 'e+') + e;

      // Normal notation.
    } else if (e < 0) {
      for (; ++e;) s = '0' + s;
      s = '0.' + s;
    } else if (e > 0) {
      if (++e > n) for (e -= n; e--;) s += '0';else if (e < n) s = s.slice(0, e) + '.' + s.slice(e);
    } else if (n > 1) {
      s = s.charAt(0) + '.' + s.slice(1);
    }
    return x.s < 0 && (!z || id == 4) ? '-' + s : s;
  }

  // Prototype/instance methods

  /*
   * Return a new Big whose value is the absolute value of this Big.
   */
  P.abs = function () {
    var x = new this.constructor(this);
    x.s = 1;
    return x;
  };

  /*
   * Return 1 if the value of this Big is greater than the value of Big y,
   *       -1 if the value of this Big is less than the value of Big y, or
   *        0 if they have the same value.
  */
  P.cmp = function (y) {
    var isneg,
      x = this,
      xc = x.c,
      yc = (y = new x.constructor(y)).c,
      i = x.s,
      j = y.s,
      k = x.e,
      l = y.e;

    // Either zero?
    if (!xc[0] || !yc[0]) return !xc[0] ? !yc[0] ? 0 : -j : i;

    // Signs differ?
    if (i != j) return i;
    isneg = i < 0;

    // Compare exponents.
    if (k != l) return k > l ^ isneg ? 1 : -1;
    j = (k = xc.length) < (l = yc.length) ? k : l;

    // Compare digit by digit.
    for (i = -1; ++i < j;) {
      if (xc[i] != yc[i]) return xc[i] > yc[i] ^ isneg ? 1 : -1;
    }

    // Compare lengths.
    return k == l ? 0 : k > l ^ isneg ? 1 : -1;
  };

  /*
   * Return a new Big whose value is the value of this Big divided by the value of Big y, rounded,
   * if necessary, to a maximum of Big.DP decimal places using rounding mode Big.RM.
   */
  P.div = function (y) {
    var x = this,
      Big = x.constructor,
      a = x.c,
      // dividend
      b = (y = new Big(y)).c,
      // divisor
      k = x.s == y.s ? 1 : -1,
      dp = Big.DP;
    if (dp !== ~~dp || dp < 0 || dp > MAX_DP) throw Error(INVALID_DP);

    // Divisor is zero?
    if (!b[0]) throw Error(DIV_BY_ZERO);

    // Dividend is 0? Return +-0.
    if (!a[0]) return new Big(k * 0);
    var bl,
      bt,
      n,
      cmp,
      ri,
      bz = b.slice(),
      ai = bl = b.length,
      al = a.length,
      r = a.slice(0, bl),
      // remainder
      rl = r.length,
      q = y,
      // quotient
      qc = q.c = [],
      qi = 0,
      d = dp + (q.e = x.e - y.e) + 1; // number of digits of the result

    q.s = k;
    k = d < 0 ? 0 : d;

    // Create version of divisor with leading zero.
    bz.unshift(0);

    // Add zeros to make remainder as long as divisor.
    for (; rl++ < bl;) r.push(0);
    do {
      // n is how many times the divisor goes into current remainder.
      for (n = 0; n < 10; n++) {
        // Compare divisor and remainder.
        if (bl != (rl = r.length)) {
          cmp = bl > rl ? 1 : -1;
        } else {
          for (ri = -1, cmp = 0; ++ri < bl;) {
            if (b[ri] != r[ri]) {
              cmp = b[ri] > r[ri] ? 1 : -1;
              break;
            }
          }
        }

        // If divisor < remainder, subtract divisor from remainder.
        if (cmp < 0) {
          // Remainder can't be more than 1 digit longer than divisor.
          // Equalise lengths using divisor with extra leading zero?
          for (bt = rl == bl ? b : bz; rl;) {
            if (r[--rl] < bt[rl]) {
              ri = rl;
              for (; ri && !r[--ri];) r[ri] = 9;
              --r[ri];
              r[rl] += 10;
            }
            r[rl] -= bt[rl];
          }
          for (; !r[0];) r.shift();
        } else {
          break;
        }
      }

      // Add the digit n to the result array.
      qc[qi++] = cmp ? n : ++n;

      // Update the remainder.
      if (r[0] && cmp) r[rl] = a[ai] || 0;else r = [a[ai]];
    } while ((ai++ < al || r[0] !== UNDEFINED) && k--);

    // Leading zero? Do not remove if result is simply zero (qi == 1).
    if (!qc[0] && qi != 1) {
      // There can't be more than one zero.
      qc.shift();
      q.e--;
    }

    // Round?
    if (qi > d) round(q, dp, Big.RM, r[0] !== UNDEFINED);
    return q;
  };

  /*
   * Return true if the value of this Big is equal to the value of Big y, otherwise return false.
   */
  P.eq = function (y) {
    return !this.cmp(y);
  };

  /*
   * Return true if the value of this Big is greater than the value of Big y, otherwise return
   * false.
   */
  P.gt = function (y) {
    return this.cmp(y) > 0;
  };

  /*
   * Return true if the value of this Big is greater than or equal to the value of Big y, otherwise
   * return false.
   */
  P.gte = function (y) {
    return this.cmp(y) > -1;
  };

  /*
   * Return true if the value of this Big is less than the value of Big y, otherwise return false.
   */
  P.lt = function (y) {
    return this.cmp(y) < 0;
  };

  /*
   * Return true if the value of this Big is less than or equal to the value of Big y, otherwise
   * return false.
   */
  P.lte = function (y) {
    return this.cmp(y) < 1;
  };

  /*
   * Return a new Big whose value is the value of this Big minus the value of Big y.
   */
  P.minus = P.sub = function (y) {
    var i,
      j,
      t,
      xlty,
      x = this,
      Big = x.constructor,
      a = x.s,
      b = (y = new Big(y)).s;

    // Signs differ?
    if (a != b) {
      y.s = -b;
      return x.plus(y);
    }
    var xc = x.c.slice(),
      xe = x.e,
      yc = y.c,
      ye = y.e;

    // Either zero?
    if (!xc[0] || !yc[0]) {
      // y is non-zero? x is non-zero? Or both are zero.
      return yc[0] ? (y.s = -b, y) : new Big(xc[0] ? x : 0);
    }

    // Determine which is the bigger number. Prepend zeros to equalise exponents.
    if (a = xe - ye) {
      if (xlty = a < 0) {
        a = -a;
        t = xc;
      } else {
        ye = xe;
        t = yc;
      }
      t.reverse();
      for (b = a; b--;) t.push(0);
      t.reverse();
    } else {
      // Exponents equal. Check digit by digit.
      j = ((xlty = xc.length < yc.length) ? xc : yc).length;
      for (a = b = 0; b < j; b++) {
        if (xc[b] != yc[b]) {
          xlty = xc[b] < yc[b];
          break;
        }
      }
    }

    // x < y? Point xc to the array of the bigger number.
    if (xlty) {
      t = xc;
      xc = yc;
      yc = t;
      y.s = -y.s;
    }

    /*
     * Append zeros to xc if shorter. No need to add zeros to yc if shorter as subtraction only
     * needs to start at yc.length.
     */
    if ((b = (j = yc.length) - (i = xc.length)) > 0) for (; b--;) xc[i++] = 0;

    // Subtract yc from xc.
    for (b = i; j > a;) {
      if (xc[--j] < yc[j]) {
        for (i = j; i && !xc[--i];) xc[i] = 9;
        --xc[i];
        xc[j] += 10;
      }
      xc[j] -= yc[j];
    }

    // Remove trailing zeros.
    for (; xc[--b] === 0;) xc.pop();

    // Remove leading zeros and adjust exponent accordingly.
    for (; xc[0] === 0;) {
      xc.shift();
      --ye;
    }
    if (!xc[0]) {
      // n - n = +0
      y.s = 1;

      // Result must be zero.
      xc = [ye = 0];
    }
    y.c = xc;
    y.e = ye;
    return y;
  };

  /*
   * Return a new Big whose value is the value of this Big modulo the value of Big y.
   */
  P.mod = function (y) {
    var ygtx,
      x = this,
      Big = x.constructor,
      a = x.s,
      b = (y = new Big(y)).s;
    if (!y.c[0]) throw Error(DIV_BY_ZERO);
    x.s = y.s = 1;
    ygtx = y.cmp(x) == 1;
    x.s = a;
    y.s = b;
    if (ygtx) return new Big(x);
    a = Big.DP;
    b = Big.RM;
    Big.DP = Big.RM = 0;
    x = x.div(y);
    Big.DP = a;
    Big.RM = b;
    return this.minus(x.times(y));
  };

  /*
   * Return a new Big whose value is the value of this Big plus the value of Big y.
   */
  P.plus = P.add = function (y) {
    var t,
      x = this,
      Big = x.constructor,
      a = x.s,
      b = (y = new Big(y)).s;

    // Signs differ?
    if (a != b) {
      y.s = -b;
      return x.minus(y);
    }
    var xe = x.e,
      xc = x.c,
      ye = y.e,
      yc = y.c;

    // Either zero? y is non-zero? x is non-zero? Or both are zero.
    if (!xc[0] || !yc[0]) return yc[0] ? y : new Big(xc[0] ? x : a * 0);
    xc = xc.slice();

    // Prepend zeros to equalise exponents.
    // Note: reverse faster than unshifts.
    if (a = xe - ye) {
      if (a > 0) {
        ye = xe;
        t = yc;
      } else {
        a = -a;
        t = xc;
      }
      t.reverse();
      for (; a--;) t.push(0);
      t.reverse();
    }

    // Point xc to the longer array.
    if (xc.length - yc.length < 0) {
      t = yc;
      yc = xc;
      xc = t;
    }
    a = yc.length;

    // Only start adding at yc.length - 1 as the further digits of xc can be left as they are.
    for (b = 0; a; xc[a] %= 10) b = (xc[--a] = xc[a] + yc[a] + b) / 10 | 0;

    // No need to check for zero, as +x + +y != 0 && -x + -y != 0

    if (b) {
      xc.unshift(b);
      ++ye;
    }

    // Remove trailing zeros.
    for (a = xc.length; xc[--a] === 0;) xc.pop();
    y.c = xc;
    y.e = ye;
    return y;
  };

  /*
   * Return a Big whose value is the value of this Big raised to the power n.
   * If n is negative, round to a maximum of Big.DP decimal places using rounding
   * mode Big.RM.
   *
   * n {number} Integer, -MAX_POWER to MAX_POWER inclusive.
   */
  P.pow = function (n) {
    var x = this,
      one = new x.constructor(1),
      y = one,
      isneg = n < 0;
    if (n !== ~~n || n < -MAX_POWER || n > MAX_POWER) throw Error(INVALID + 'exponent');
    if (isneg) n = -n;
    for (;;) {
      if (n & 1) y = y.times(x);
      n >>= 1;
      if (!n) break;
      x = x.times(x);
    }
    return isneg ? one.div(y) : y;
  };

  /*
   * Return a new Big whose value is the value of this Big rounded using rounding mode rm
   * to a maximum of dp decimal places, or, if dp is negative, to an integer which is a
   * multiple of 10**-dp.
   * If dp is not specified, round to 0 decimal places.
   * If rm is not specified, use Big.RM.
   *
   * dp? {number} Integer, -MAX_DP to MAX_DP inclusive.
   * rm? 0, 1, 2 or 3 (ROUND_DOWN, ROUND_HALF_UP, ROUND_HALF_EVEN, ROUND_UP)
   */
  P.round = function (dp, rm) {
    var Big = this.constructor;
    if (dp === UNDEFINED) dp = 0;else if (dp !== ~~dp || dp < -MAX_DP || dp > MAX_DP) throw Error(INVALID_DP);
    return round(new Big(this), dp, rm === UNDEFINED ? Big.RM : rm);
  };

  /*
   * Return a new Big whose value is the square root of the value of this Big, rounded, if
   * necessary, to a maximum of Big.DP decimal places using rounding mode Big.RM.
   */
  P.sqrt = function () {
    var r,
      c,
      t,
      x = this,
      Big = x.constructor,
      s = x.s,
      e = x.e,
      half = new Big(0.5);

    // Zero?
    if (!x.c[0]) return new Big(x);

    // Negative?
    if (s < 0) throw Error(NAME + 'No square root');

    // Estimate.
    s = Math.sqrt(x + '');

    // Math.sqrt underflow/overflow?
    // Re-estimate: pass x coefficient to Math.sqrt as integer, then adjust the result exponent.
    if (s === 0 || s === 1 / 0) {
      c = x.c.join('');
      if (!(c.length + e & 1)) c += '0';
      s = Math.sqrt(c);
      e = ((e + 1) / 2 | 0) - (e < 0 || e & 1);
      r = new Big((s == 1 / 0 ? '1e' : (s = s.toExponential()).slice(0, s.indexOf('e') + 1)) + e);
    } else {
      r = new Big(s);
    }
    e = r.e + (Big.DP += 4);

    // Newton-Raphson iteration.
    do {
      t = r;
      r = half.times(t.plus(x.div(t)));
    } while (t.c.slice(0, e).join('') !== r.c.slice(0, e).join(''));
    return round(r, Big.DP -= 4, Big.RM);
  };

  /*
   * Return a new Big whose value is the value of this Big times the value of Big y.
   */
  P.times = P.mul = function (y) {
    var c,
      x = this,
      Big = x.constructor,
      xc = x.c,
      yc = (y = new Big(y)).c,
      a = xc.length,
      b = yc.length,
      i = x.e,
      j = y.e;

    // Determine sign of result.
    y.s = x.s == y.s ? 1 : -1;

    // Return signed 0 if either 0.
    if (!xc[0] || !yc[0]) return new Big(y.s * 0);

    // Initialise exponent of result as x.e + y.e.
    y.e = i + j;

    // If array xc has fewer digits than yc, swap xc and yc, and lengths.
    if (a < b) {
      c = xc;
      xc = yc;
      yc = c;
      j = a;
      a = b;
      b = j;
    }

    // Initialise coefficient array of result with zeros.
    for (c = new Array(j = a + b); j--;) c[j] = 0;

    // Multiply.

    // i is initially xc.length.
    for (i = b; i--;) {
      b = 0;

      // a is yc.length.
      for (j = a + i; j > i;) {
        // Current sum of products at this digit position, plus carry.
        b = c[j] + yc[i] * xc[j - i - 1] + b;
        c[j--] = b % 10;

        // carry
        b = b / 10 | 0;
      }
      c[j] = (c[j] + b) % 10;
    }

    // Increment result exponent if there is a final carry, otherwise remove leading zero.
    if (b) ++y.e;else c.shift();

    // Remove trailing zeros.
    for (i = c.length; !c[--i];) c.pop();
    y.c = c;
    return y;
  };

  /*
   * Return a string representing the value of this Big in exponential notation to dp fixed decimal
   * places and rounded using Big.RM.
   *
   * dp? {number} Integer, 0 to MAX_DP inclusive.
   */
  P.toExponential = function (dp) {
    return stringify(this, 1, dp, dp);
  };

  /*
   * Return a string representing the value of this Big in normal notation to dp fixed decimal
   * places and rounded using Big.RM.
   *
   * dp? {number} Integer, 0 to MAX_DP inclusive.
   *
   * (-0).toFixed(0) is '0', but (-0.1).toFixed(0) is '-0'.
   * (-0).toFixed(1) is '0.0', but (-0.01).toFixed(1) is '-0.0'.
   */
  P.toFixed = function (dp) {
    return stringify(this, 2, dp, this.e + dp);
  };

  /*
   * Return a string representing the value of this Big rounded to sd significant digits using
   * Big.RM. Use exponential notation if sd is less than the number of digits necessary to represent
   * the integer part of the value in normal notation.
   *
   * sd {number} Integer, 1 to MAX_DP inclusive.
   */
  P.toPrecision = function (sd) {
    return stringify(this, 3, sd, sd - 1);
  };

  /*
   * Return a string representing the value of this Big.
   * Return exponential notation if this Big has a positive exponent equal to or greater than
   * Big.PE, or a negative exponent equal to or less than Big.NE.
   * Omit the sign for negative zero.
   */
  P.toString = function () {
    return stringify(this);
  };

  /*
   * Return a string representing the value of this Big.
   * Return exponential notation if this Big has a positive exponent equal to or greater than
   * Big.PE, or a negative exponent equal to or less than Big.NE.
   * Include the sign for negative zero.
   */
  P.valueOf = P.toJSON = function () {
    return stringify(this, 4);
  };

  // Export

  Big = _Big_();
  Big['default'] = Big.Big = Big;

  //AMD.
  if (true) {
    !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {
      return Big;
    }).call(exports, __webpack_require__, exports, module),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

    // Node and other CommonJS-like environments that support module.exports.
  } else {}
})(this);

/***/ }),

/***/ "./node_modules/lit-element/development/lit-element.js":
/*!*************************************************************!*\
  !*** ./node_modules/lit-element/development/lit-element.js ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CSSResult: () => (/* reexport safe */ _lit_reactive_element__WEBPACK_IMPORTED_MODULE_0__.CSSResult),
/* harmony export */   LitElement: () => (/* binding */ LitElement),
/* harmony export */   ReactiveElement: () => (/* reexport safe */ _lit_reactive_element__WEBPACK_IMPORTED_MODULE_0__.ReactiveElement),
/* harmony export */   UpdatingElement: () => (/* binding */ UpdatingElement),
/* harmony export */   _$LE: () => (/* binding */ _$LE),
/* harmony export */   _$LH: () => (/* reexport safe */ lit_html__WEBPACK_IMPORTED_MODULE_1__._$LH),
/* harmony export */   adoptStyles: () => (/* reexport safe */ _lit_reactive_element__WEBPACK_IMPORTED_MODULE_0__.adoptStyles),
/* harmony export */   css: () => (/* reexport safe */ _lit_reactive_element__WEBPACK_IMPORTED_MODULE_0__.css),
/* harmony export */   defaultConverter: () => (/* reexport safe */ _lit_reactive_element__WEBPACK_IMPORTED_MODULE_0__.defaultConverter),
/* harmony export */   getCompatibleStyle: () => (/* reexport safe */ _lit_reactive_element__WEBPACK_IMPORTED_MODULE_0__.getCompatibleStyle),
/* harmony export */   html: () => (/* reexport safe */ lit_html__WEBPACK_IMPORTED_MODULE_1__.html),
/* harmony export */   noChange: () => (/* reexport safe */ lit_html__WEBPACK_IMPORTED_MODULE_1__.noChange),
/* harmony export */   notEqual: () => (/* reexport safe */ _lit_reactive_element__WEBPACK_IMPORTED_MODULE_0__.notEqual),
/* harmony export */   nothing: () => (/* reexport safe */ lit_html__WEBPACK_IMPORTED_MODULE_1__.nothing),
/* harmony export */   render: () => (/* reexport safe */ lit_html__WEBPACK_IMPORTED_MODULE_1__.render),
/* harmony export */   supportsAdoptingStyleSheets: () => (/* reexport safe */ _lit_reactive_element__WEBPACK_IMPORTED_MODULE_0__.supportsAdoptingStyleSheets),
/* harmony export */   svg: () => (/* reexport safe */ lit_html__WEBPACK_IMPORTED_MODULE_1__.svg),
/* harmony export */   unsafeCSS: () => (/* reexport safe */ _lit_reactive_element__WEBPACK_IMPORTED_MODULE_0__.unsafeCSS)
/* harmony export */ });
/* harmony import */ var _lit_reactive_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @lit/reactive-element */ "./node_modules/@lit/reactive-element/development/reactive-element.js");
/* harmony import */ var lit_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lit-html */ "./node_modules/lit-html/development/lit-html.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _superPropGet(t, o, e, r) { var p = _get(_getPrototypeOf(1 & r ? t.prototype : t), o, e); return 2 & r && "function" == typeof p ? function (t) { return p.apply(e, t); } : p; }
function _get() { return _get = "undefined" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function (e, t, r) { var p = _superPropBase(e, t); if (p) { var n = Object.getOwnPropertyDescriptor(p, t); return n.get ? n.get.call(arguments.length < 3 ? e : r) : n.value; } }, _get.apply(null, arguments); }
function _superPropBase(t, o) { for (; !{}.hasOwnProperty.call(t, o) && null !== (t = _getPrototypeOf(t));); return t; }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var _a, _b, _c;
/**
 * The main LitElement module, which defines the {@linkcode LitElement} base
 * class and related APIs.
 *
 *  LitElement components can define a template and a set of observed
 * properties. Changing an observed property triggers a re-render of the
 * element.
 *
 *  Import {@linkcode LitElement} and {@linkcode html} from this module to
 * create a component:
 *
 *  ```js
 * import {LitElement, html} from 'lit-element';
 *
 * class MyElement extends LitElement {
 *
 *   // Declare observed properties
 *   static get properties() {
 *     return {
 *       adjective: {}
 *     }
 *   }
 *
 *   constructor() {
 *     this.adjective = 'awesome';
 *   }
 *
 *   // Define the element's template
 *   render() {
 *     return html`<p>your ${adjective} template here</p>`;
 *   }
 * }
 *
 * customElements.define('my-element', MyElement);
 * ```
 *
 * `LitElement` extends {@linkcode ReactiveElement} and adds lit-html
 * templating. The `ReactiveElement` class is provided for users that want to
 * build their own custom element base classes that don't use lit-html.
 *
 * @packageDocumentation
 */




// For backwards compatibility export ReactiveElement as UpdatingElement. Note,
// IE transpilation requires exporting like this.
var UpdatingElement = _lit_reactive_element__WEBPACK_IMPORTED_MODULE_0__.ReactiveElement;
var DEV_MODE = true;
var issueWarning;
if (DEV_MODE) {
  // Ensure warnings are issued only 1x, even if multiple versions of Lit
  // are loaded.
  var issuedWarnings = (_a = globalThis.litIssuedWarnings) !== null && _a !== void 0 ? _a : globalThis.litIssuedWarnings = new Set();
  // Issue a warning, if we haven't already.
  issueWarning = function issueWarning(code, warning) {
    warning += " See https://lit.dev/msg/".concat(code, " for more information.");
    if (!issuedWarnings.has(warning)) {
      console.warn(warning);
      issuedWarnings.add(warning);
    }
  };
}
/**
 * Base element class that manages element properties and attributes, and
 * renders a lit-html template.
 *
 * To define a component, subclass `LitElement` and implement a
 * `render` method to provide the component's template. Define properties
 * using the {@linkcode LitElement.properties properties} property or the
 * {@linkcode property} decorator.
 */
var LitElement = /*#__PURE__*/function (_ReactiveElement) {
  function LitElement() {
    var _this;
    _classCallCheck(this, LitElement);
    _this = _callSuper(this, LitElement, arguments);
    /**
     * @category rendering
     */
    _this.renderOptions = {
      host: _this
    };
    _this.__childPart = undefined;
    return _this;
  }
  /**
   * @category rendering
   */
  _inherits(LitElement, _ReactiveElement);
  return _createClass(LitElement, [{
    key: "createRenderRoot",
    value: function createRenderRoot() {
      var _a;
      var _b;
      var renderRoot = _superPropGet(LitElement, "createRenderRoot", this, 3)([]);
      // When adoptedStyleSheets are shimmed, they are inserted into the
      // shadowRoot by createRenderRoot. Adjust the renderBefore node so that
      // any styles in Lit content render before adoptedStyleSheets. This is
      // important so that adoptedStyleSheets have precedence over styles in
      // the shadowRoot.
      (_a = (_b = this.renderOptions).renderBefore) !== null && _a !== void 0 ? _a : _b.renderBefore = renderRoot.firstChild;
      return renderRoot;
    }
    /**
     * Updates the element. This method reflects property values to attributes
     * and calls `render` to render DOM via lit-html. Setting properties inside
     * this method will *not* trigger another update.
     * @param changedProperties Map of changed properties with old values
     * @category updates
     */
  }, {
    key: "update",
    value: function update(changedProperties) {
      // Setting properties in `render` should not trigger an update. Since
      // updates are allowed after super.update, it's important to call `render`
      // before that.
      var value = this.render();
      if (!this.hasUpdated) {
        this.renderOptions.isConnected = this.isConnected;
      }
      _superPropGet(LitElement, "update", this, 3)([changedProperties]);
      this.__childPart = (0,lit_html__WEBPACK_IMPORTED_MODULE_1__.render)(value, this.renderRoot, this.renderOptions);
    }
    /**
     * Invoked when the component is added to the document's DOM.
     *
     * In `connectedCallback()` you should setup tasks that should only occur when
     * the element is connected to the document. The most common of these is
     * adding event listeners to nodes external to the element, like a keydown
     * event handler added to the window.
     *
     * ```ts
     * connectedCallback() {
     *   super.connectedCallback();
     *   addEventListener('keydown', this._handleKeydown);
     * }
     * ```
     *
     * Typically, anything done in `connectedCallback()` should be undone when the
     * element is disconnected, in `disconnectedCallback()`.
     *
     * @category lifecycle
     */
  }, {
    key: "connectedCallback",
    value: function connectedCallback() {
      var _a;
      _superPropGet(LitElement, "connectedCallback", this, 3)([]);
      (_a = this.__childPart) === null || _a === void 0 ? void 0 : _a.setConnected(true);
    }
    /**
     * Invoked when the component is removed from the document's DOM.
     *
     * This callback is the main signal to the element that it may no longer be
     * used. `disconnectedCallback()` should ensure that nothing is holding a
     * reference to the element (such as event listeners added to nodes external
     * to the element), so that it is free to be garbage collected.
     *
     * ```ts
     * disconnectedCallback() {
     *   super.disconnectedCallback();
     *   window.removeEventListener('keydown', this._handleKeydown);
     * }
     * ```
     *
     * An element may be re-connected after being disconnected.
     *
     * @category lifecycle
     */
  }, {
    key: "disconnectedCallback",
    value: function disconnectedCallback() {
      var _a;
      _superPropGet(LitElement, "disconnectedCallback", this, 3)([]);
      (_a = this.__childPart) === null || _a === void 0 ? void 0 : _a.setConnected(false);
    }
    /**
     * Invoked on each update to perform rendering tasks. This method may return
     * any value renderable by lit-html's `ChildPart` - typically a
     * `TemplateResult`. Setting properties inside this method will *not* trigger
     * the element to update.
     * @category rendering
     */
  }, {
    key: "render",
    value: function render() {
      return lit_html__WEBPACK_IMPORTED_MODULE_1__.noChange;
    }
  }]);
}(_lit_reactive_element__WEBPACK_IMPORTED_MODULE_0__.ReactiveElement);
/**
 * Ensure this class is marked as `finalized` as an optimization ensuring
 * it will not needlessly try to `finalize`.
 *
 * Note this property name is a string to prevent breaking Closure JS Compiler
 * optimizations. See @lit/reactive-element for more information.
 */
LitElement['finalized'] = true;
// This property needs to remain unminified.
LitElement['_$litElement$'] = true;
// Install hydration if available
(_b = globalThis.litElementHydrateSupport) === null || _b === void 0 ? void 0 : _b.call(globalThis, {
  LitElement: LitElement
});
// Apply polyfills if available
var polyfillSupport = DEV_MODE ? globalThis.litElementPolyfillSupportDevMode : globalThis.litElementPolyfillSupport;
polyfillSupport === null || polyfillSupport === void 0 ? void 0 : polyfillSupport({
  LitElement: LitElement
});
// DEV mode warnings
if (DEV_MODE) {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  // Note, for compatibility with closure compilation, this access
  // needs to be as a string property index.
  LitElement['finalize'] = function () {
    var finalized = _lit_reactive_element__WEBPACK_IMPORTED_MODULE_0__.ReactiveElement.finalize.call(this);
    if (!finalized) {
      return false;
    }
    var warnRemovedOrRenamed = function warnRemovedOrRenamed(obj, name) {
      var renamed = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      if (obj.hasOwnProperty(name)) {
        var ctorName = (typeof obj === 'function' ? obj : obj.constructor).name;
        issueWarning(renamed ? 'renamed-api' : 'removed-api', "`".concat(name, "` is implemented on class ").concat(ctorName, ". It ") + "has been ".concat(renamed ? 'renamed' : 'removed', " ") + "in this version of LitElement.");
      }
    };
    warnRemovedOrRenamed(this, 'render');
    warnRemovedOrRenamed(this, 'getStyles', true);
    warnRemovedOrRenamed(this.prototype, 'adoptStyles');
    return true;
  };
  /* eslint-enable @typescript-eslint/no-explicit-any */
}
/**
 * END USERS SHOULD NOT RELY ON THIS OBJECT.
 *
 * Private exports for use by other Lit packages, not intended for use by
 * external users.
 *
 * We currently do not make a mangled rollup build of the lit-ssr code. In order
 * to keep a number of (otherwise private) top-level exports  mangled in the
 * client side code, we export a _$LE object containing those members (or
 * helper methods for accessing private fields of those members), and then
 * re-export them for use in lit-ssr. This keeps lit-ssr agnostic to whether the
 * client-side code is being used in `dev` mode or `prod` mode.
 *
 * This has a unique name, to disambiguate it from private exports in
 * lit-html, since this module re-exports all of lit-html.
 *
 * @private
 */
var _$LE = {
  _$attributeToProperty: function _$attributeToProperty(el, name, value) {
    // eslint-disable-next-line
    el._$attributeToProperty(name, value);
  },
  // eslint-disable-next-line
  _$changedProperties: function _$changedProperties(el) {
    return el._$changedProperties;
  }
};
// IMPORTANT: do not change the property name or the assignment expression.
// This line will be used in regexes to search for LitElement usage.
((_c = globalThis.litElementVersions) !== null && _c !== void 0 ? _c : globalThis.litElementVersions = []).push('3.3.3');
if (DEV_MODE && globalThis.litElementVersions.length > 1) {
  issueWarning('multiple-versions', "Multiple versions of Lit loaded. Loading multiple versions " + "is not recommended.");
}

/***/ }),

/***/ "./node_modules/lit-html/development/is-server.js":
/*!********************************************************!*\
  !*** ./node_modules/lit-html/development/is-server.js ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isServer: () => (/* binding */ isServer)
/* harmony export */ });
/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * @fileoverview
 *
 * This file exports a boolean const whose value will depend on what environment
 * the module is being imported from.
 */
var NODE_MODE = false;
/**
 * A boolean that will be `true` in server environments like Node, and `false`
 * in browser environments. Note that your server environment or toolchain must
 * support the `"node"` export condition for this to be `true`.
 *
 * This can be used when authoring components to change behavior based on
 * whether or not the component is executing in an SSR context.
 */
var isServer = NODE_MODE;

/***/ }),

/***/ "./node_modules/lit-html/development/lit-html.js":
/*!*******************************************************!*\
  !*** ./node_modules/lit-html/development/lit-html.js ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   _$LH: () => (/* binding */ _$LH),
/* harmony export */   html: () => (/* binding */ html),
/* harmony export */   noChange: () => (/* binding */ noChange),
/* harmony export */   nothing: () => (/* binding */ nothing),
/* harmony export */   render: () => (/* binding */ render),
/* harmony export */   svg: () => (/* binding */ svg)
/* harmony export */ });
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var _a, _b, _c, _d;
var DEV_MODE = true;
var ENABLE_EXTRA_SECURITY_HOOKS = true;
var ENABLE_SHADYDOM_NOPATCH = true;
var NODE_MODE = false;
// Use window for browser builds because IE11 doesn't have globalThis.
var global = NODE_MODE ? globalThis : window;
/**
 * Useful for visualizing and logging insights into what the Lit template system is doing.
 *
 * Compiled out of prod mode builds.
 */
var debugLogEvent = DEV_MODE ? function (event) {
  var shouldEmit = global.emitLitDebugLogEvents;
  if (!shouldEmit) {
    return;
  }
  global.dispatchEvent(new CustomEvent('lit-debug', {
    detail: event
  }));
} : undefined;
// Used for connecting beginRender and endRender events when there are nested
// renders when errors are thrown preventing an endRender event from being
// called.
var debugLogRenderId = 0;
var issueWarning;
if (DEV_MODE) {
  (_a = global.litIssuedWarnings) !== null && _a !== void 0 ? _a : global.litIssuedWarnings = new Set();
  // Issue a warning, if we haven't already.
  issueWarning = function issueWarning(code, warning) {
    warning += code ? " See https://lit.dev/msg/".concat(code, " for more information.") : '';
    if (!global.litIssuedWarnings.has(warning)) {
      console.warn(warning);
      global.litIssuedWarnings.add(warning);
    }
  };
  issueWarning('dev-mode', "Lit is in dev mode. Not recommended for production!");
}
var wrap = ENABLE_SHADYDOM_NOPATCH && ((_b = global.ShadyDOM) === null || _b === void 0 ? void 0 : _b.inUse) && ((_c = global.ShadyDOM) === null || _c === void 0 ? void 0 : _c.noPatch) === true ? global.ShadyDOM.wrap : function (node) {
  return node;
};
var trustedTypes = global.trustedTypes;
/**
 * Our TrustedTypePolicy for HTML which is declared using the html template
 * tag function.
 *
 * That HTML is a developer-authored constant, and is parsed with innerHTML
 * before any untrusted expressions have been mixed in. Therefor it is
 * considered safe by construction.
 */
var policy = trustedTypes ? trustedTypes.createPolicy('lit-html', {
  createHTML: function createHTML(s) {
    return s;
  }
}) : undefined;
var identityFunction = function identityFunction(value) {
  return value;
};
var noopSanitizer = function noopSanitizer(_node, _name, _type) {
  return identityFunction;
};
/** Sets the global sanitizer factory. */
var setSanitizer = function setSanitizer(newSanitizer) {
  if (!ENABLE_EXTRA_SECURITY_HOOKS) {
    return;
  }
  if (sanitizerFactoryInternal !== noopSanitizer) {
    throw new Error("Attempted to overwrite existing lit-html security policy." + " setSanitizeDOMValueFactory should be called at most once.");
  }
  sanitizerFactoryInternal = newSanitizer;
};
/**
 * Only used in internal tests, not a part of the public API.
 */
var _testOnlyClearSanitizerFactoryDoNotCallOrElse = function _testOnlyClearSanitizerFactoryDoNotCallOrElse() {
  sanitizerFactoryInternal = noopSanitizer;
};
var createSanitizer = function createSanitizer(node, name, type) {
  return sanitizerFactoryInternal(node, name, type);
};
// Added to an attribute name to mark the attribute as bound so we can find
// it easily.
var boundAttributeSuffix = '$lit$';
// This marker is used in many syntactic positions in HTML, so it must be
// a valid element name and attribute name. We don't support dynamic names (yet)
// but this at least ensures that the parse tree is closer to the template
// intention.
var marker = "lit$".concat(String(Math.random()).slice(9), "$");
// String used to tell if a comment is a marker comment
var markerMatch = '?' + marker;
// Text used to insert a comment marker node. We use processing instruction
// syntax because it's slightly smaller, but parses as a comment node.
var nodeMarker = "<".concat(markerMatch, ">");
var d = NODE_MODE && global.document === undefined ? {
  createTreeWalker: function createTreeWalker() {
    return {};
  }
} : document;
// Creates a dynamic marker. We never have to search for these in the DOM.
var createMarker = function createMarker() {
  return d.createComment('');
};
var isPrimitive = function isPrimitive(value) {
  return value === null || _typeof(value) != 'object' && typeof value != 'function';
};
var isArray = Array.isArray;
var isIterable = function isIterable(value) {
  return isArray(value) ||
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  typeof (value === null || value === void 0 ? void 0 : value[Symbol.iterator]) === 'function';
};
var SPACE_CHAR = "[ \t\n\f\r]";
var ATTR_VALUE_CHAR = "[^ \t\n\f\r\"'`<>=]";
var NAME_CHAR = "[^\\s\"'>=/]";
// These regexes represent the five parsing states that we care about in the
// Template's HTML scanner. They match the *end* of the state they're named
// after.
// Depending on the match, we transition to a new state. If there's no match,
// we stay in the same state.
// Note that the regexes are stateful. We utilize lastIndex and sync it
// across the multiple regexes used. In addition to the five regexes below
// we also dynamically create a regex to find the matching end tags for raw
// text elements.
/**
 * End of text is: `<` followed by:
 *   (comment start) or (tag) or (dynamic tag binding)
 */
var textEndRegex = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;
var COMMENT_START = 1;
var TAG_NAME = 2;
var DYNAMIC_TAG_NAME = 3;
var commentEndRegex = /-->/g;
/**
 * Comments not started with <!--, like </{, can be ended by a single `>`
 */
var comment2EndRegex = />/g;
/**
 * The tagEnd regex matches the end of the "inside an opening" tag syntax
 * position. It either matches a `>`, an attribute-like sequence, or the end
 * of the string after a space (attribute-name position ending).
 *
 * See attributes in the HTML spec:
 * https://www.w3.org/TR/html5/syntax.html#elements-attributes
 *
 * " \t\n\f\r" are HTML space characters:
 * https://infra.spec.whatwg.org/#ascii-whitespace
 *
 * So an attribute is:
 *  * The name: any character except a whitespace character, ("), ('), ">",
 *    "=", or "/". Note: this is different from the HTML spec which also excludes control characters.
 *  * Followed by zero or more space characters
 *  * Followed by "="
 *  * Followed by zero or more space characters
 *  * Followed by:
 *    * Any character except space, ('), ("), "<", ">", "=", (`), or
 *    * (") then any non-("), or
 *    * (') then any non-(')
 */
var tagEndRegex = new RegExp(">|".concat(SPACE_CHAR, "(?:(").concat(NAME_CHAR, "+)(").concat(SPACE_CHAR, "*=").concat(SPACE_CHAR, "*(?:").concat(ATTR_VALUE_CHAR, "|(\"|')|))|$)"), 'g');
var ENTIRE_MATCH = 0;
var ATTRIBUTE_NAME = 1;
var SPACES_AND_EQUALS = 2;
var QUOTE_CHAR = 3;
var singleQuoteAttrEndRegex = /'/g;
var doubleQuoteAttrEndRegex = /"/g;
/**
 * Matches the raw text elements.
 *
 * Comments are not parsed within raw text elements, so we need to search their
 * text content for marker strings.
 */
var rawTextElement = /^(?:script|style|textarea|title)$/i;
/** TemplateResult types */
var HTML_RESULT = 1;
var SVG_RESULT = 2;
// TemplatePart types
// IMPORTANT: these must match the values in PartType
var ATTRIBUTE_PART = 1;
var CHILD_PART = 2;
var PROPERTY_PART = 3;
var BOOLEAN_ATTRIBUTE_PART = 4;
var EVENT_PART = 5;
var ELEMENT_PART = 6;
var COMMENT_PART = 7;
/**
 * Generates a template literal tag function that returns a TemplateResult with
 * the given result type.
 */
var tag = function tag(type) {
  return function (strings) {
    // Warn against templates octal escape sequences
    // We do this here rather than in render so that the warning is closer to the
    // template definition.
    if (DEV_MODE && strings.some(function (s) {
      return s === undefined;
    })) {
      console.warn('Some template strings are undefined.\n' + 'This is probably caused by illegal octal escape sequences.');
    }
    for (var _len = arguments.length, values = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      values[_key - 1] = arguments[_key];
    }
    return _defineProperty(_defineProperty(_defineProperty({}, '_$litType$', type), "strings", strings), "values", values);
  };
};
/**
 * Interprets a template literal as an HTML template that can efficiently
 * render to and update a container.
 *
 * ```ts
 * const header = (title: string) => html`<h1>${title}</h1>`;
 * ```
 *
 * The `html` tag returns a description of the DOM to render as a value. It is
 * lazy, meaning no work is done until the template is rendered. When rendering,
 * if a template comes from the same expression as a previously rendered result,
 * it's efficiently updated instead of replaced.
 */
var html = tag(HTML_RESULT);
/**
 * Interprets a template literal as an SVG fragment that can efficiently
 * render to and update a container.
 *
 * ```ts
 * const rect = svg`<rect width="10" height="10"></rect>`;
 *
 * const myImage = html`
 *   <svg viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
 *     ${rect}
 *   </svg>`;
 * ```
 *
 * The `svg` *tag function* should only be used for SVG fragments, or elements
 * that would be contained **inside** an `<svg>` HTML element. A common error is
 * placing an `<svg>` *element* in a template tagged with the `svg` tag
 * function. The `<svg>` element is an HTML element and should be used within a
 * template tagged with the {@linkcode html} tag function.
 *
 * In LitElement usage, it's invalid to return an SVG fragment from the
 * `render()` method, as the SVG fragment will be contained within the element's
 * shadow root and thus cannot be used within an `<svg>` HTML element.
 */
var svg = tag(SVG_RESULT);
/**
 * A sentinel value that signals that a value was handled by a directive and
 * should not be written to the DOM.
 */
var noChange = Symbol["for"]('lit-noChange');
/**
 * A sentinel value that signals a ChildPart to fully clear its content.
 *
 * ```ts
 * const button = html`${
 *  user.isAdmin
 *    ? html`<button>DELETE</button>`
 *    : nothing
 * }`;
 * ```
 *
 * Prefer using `nothing` over other falsy values as it provides a consistent
 * behavior between various expression binding contexts.
 *
 * In child expressions, `undefined`, `null`, `''`, and `nothing` all behave the
 * same and render no nodes. In attribute expressions, `nothing` _removes_ the
 * attribute, while `undefined` and `null` will render an empty string. In
 * property expressions `nothing` becomes `undefined`.
 */
var nothing = Symbol["for"]('lit-nothing');
/**
 * The cache of prepared templates, keyed by the tagged TemplateStringsArray
 * and _not_ accounting for the specific template tag used. This means that
 * template tags cannot be dynamic - the must statically be one of html, svg,
 * or attr. This restriction simplifies the cache lookup, which is on the hot
 * path for rendering.
 */
var templateCache = new WeakMap();
var walker = d.createTreeWalker(d, 129 /* NodeFilter.SHOW_{ELEMENT|COMMENT} */, null, false);
var sanitizerFactoryInternal = noopSanitizer;
function trustFromTemplateString(tsa, stringFromTSA) {
  // A security check to prevent spoofing of Lit template results.
  // In the future, we may be able to replace this with Array.isTemplateObject,
  // though we might need to make that check inside of the html and svg
  // functions, because precompiled templates don't come in as
  // TemplateStringArray objects.
  if (!Array.isArray(tsa) || !tsa.hasOwnProperty('raw')) {
    var message = 'invalid template strings array';
    if (DEV_MODE) {
      message = "\n          Internal Error: expected template strings to be an array\n          with a 'raw' field. Faking a template strings array by\n          calling html or svg like an ordinary function is effectively\n          the same as calling unsafeHtml and can lead to major security\n          issues, e.g. opening your code up to XSS attacks.\n          If you're using the html or svg tagged template functions normally\n          and still seeing this error, please file a bug at\n          https://github.com/lit/lit/issues/new?template=bug_report.md\n          and include information about your build tooling, if any.\n        ".trim().replace(/\n */g, '\n');
    }
    throw new Error(message);
  }
  return policy !== undefined ? policy.createHTML(stringFromTSA) : stringFromTSA;
}
/**
 * Returns an HTML string for the given TemplateStringsArray and result type
 * (HTML or SVG), along with the case-sensitive bound attribute names in
 * template order. The HTML contains comment markers denoting the `ChildPart`s
 * and suffixes on bound attributes denoting the `AttributeParts`.
 *
 * @param strings template strings array
 * @param type HTML or SVG
 * @return Array containing `[html, attrNames]` (array returned for terseness,
 *     to avoid object fields since this code is shared with non-minified SSR
 *     code)
 */
var getTemplateHtml = function getTemplateHtml(strings, type) {
  // Insert makers into the template HTML to represent the position of
  // bindings. The following code scans the template strings to determine the
  // syntactic position of the bindings. They can be in text position, where
  // we insert an HTML comment, attribute value position, where we insert a
  // sentinel string and re-write the attribute name, or inside a tag where
  // we insert the sentinel string.
  var l = strings.length - 1;
  // Stores the case-sensitive bound attribute names in the order of their
  // parts. ElementParts are also reflected in this array as undefined
  // rather than a string, to disambiguate from attribute bindings.
  var attrNames = [];
  var html = type === SVG_RESULT ? '<svg>' : '';
  // When we're inside a raw text tag (not it's text content), the regex
  // will still be tagRegex so we can find attributes, but will switch to
  // this regex when the tag ends.
  var rawTextEndRegex;
  // The current parsing state, represented as a reference to one of the
  // regexes
  var regex = textEndRegex;
  for (var i = 0; i < l; i++) {
    var s = strings[i];
    // The index of the end of the last attribute name. When this is
    // positive at end of a string, it means we're in an attribute value
    // position and need to rewrite the attribute name.
    // We also use a special value of -2 to indicate that we encountered
    // the end of a string in attribute name position.
    var attrNameEndIndex = -1;
    var attrName = void 0;
    var lastIndex = 0;
    var match = void 0;
    // The conditions in this loop handle the current parse state, and the
    // assignments to the `regex` variable are the state transitions.
    while (lastIndex < s.length) {
      // Make sure we start searching from where we previously left off
      regex.lastIndex = lastIndex;
      match = regex.exec(s);
      if (match === null) {
        break;
      }
      lastIndex = regex.lastIndex;
      if (regex === textEndRegex) {
        if (match[COMMENT_START] === '!--') {
          regex = commentEndRegex;
        } else if (match[COMMENT_START] !== undefined) {
          // We started a weird comment, like </{
          regex = comment2EndRegex;
        } else if (match[TAG_NAME] !== undefined) {
          if (rawTextElement.test(match[TAG_NAME])) {
            // Record if we encounter a raw-text element. We'll switch to
            // this regex at the end of the tag.
            rawTextEndRegex = new RegExp("</".concat(match[TAG_NAME]), 'g');
          }
          regex = tagEndRegex;
        } else if (match[DYNAMIC_TAG_NAME] !== undefined) {
          if (DEV_MODE) {
            throw new Error('Bindings in tag names are not supported. Please use static templates instead. ' + 'See https://lit.dev/docs/templates/expressions/#static-expressions');
          }
          regex = tagEndRegex;
        }
      } else if (regex === tagEndRegex) {
        if (match[ENTIRE_MATCH] === '>') {
          // End of a tag. If we had started a raw-text element, use that
          // regex
          regex = rawTextEndRegex !== null && rawTextEndRegex !== void 0 ? rawTextEndRegex : textEndRegex;
          // We may be ending an unquoted attribute value, so make sure we
          // clear any pending attrNameEndIndex
          attrNameEndIndex = -1;
        } else if (match[ATTRIBUTE_NAME] === undefined) {
          // Attribute name position
          attrNameEndIndex = -2;
        } else {
          attrNameEndIndex = regex.lastIndex - match[SPACES_AND_EQUALS].length;
          attrName = match[ATTRIBUTE_NAME];
          regex = match[QUOTE_CHAR] === undefined ? tagEndRegex : match[QUOTE_CHAR] === '"' ? doubleQuoteAttrEndRegex : singleQuoteAttrEndRegex;
        }
      } else if (regex === doubleQuoteAttrEndRegex || regex === singleQuoteAttrEndRegex) {
        regex = tagEndRegex;
      } else if (regex === commentEndRegex || regex === comment2EndRegex) {
        regex = textEndRegex;
      } else {
        // Not one of the five state regexes, so it must be the dynamically
        // created raw text regex and we're at the close of that element.
        regex = tagEndRegex;
        rawTextEndRegex = undefined;
      }
    }
    if (DEV_MODE) {
      // If we have a attrNameEndIndex, which indicates that we should
      // rewrite the attribute name, assert that we're in a valid attribute
      // position - either in a tag, or a quoted attribute value.
      console.assert(attrNameEndIndex === -1 || regex === tagEndRegex || regex === singleQuoteAttrEndRegex || regex === doubleQuoteAttrEndRegex, 'unexpected parse state B');
    }
    // We have four cases:
    //  1. We're in text position, and not in a raw text element
    //     (regex === textEndRegex): insert a comment marker.
    //  2. We have a non-negative attrNameEndIndex which means we need to
    //     rewrite the attribute name to add a bound attribute suffix.
    //  3. We're at the non-first binding in a multi-binding attribute, use a
    //     plain marker.
    //  4. We're somewhere else inside the tag. If we're in attribute name
    //     position (attrNameEndIndex === -2), add a sequential suffix to
    //     generate a unique attribute name.
    // Detect a binding next to self-closing tag end and insert a space to
    // separate the marker from the tag end:
    var end = regex === tagEndRegex && strings[i + 1].startsWith('/>') ? ' ' : '';
    html += regex === textEndRegex ? s + nodeMarker : attrNameEndIndex >= 0 ? (attrNames.push(attrName), s.slice(0, attrNameEndIndex) + boundAttributeSuffix + s.slice(attrNameEndIndex)) + marker + end : s + marker + (attrNameEndIndex === -2 ? (attrNames.push(undefined), i) : end);
  }
  var htmlResult = html + (strings[l] || '<?>') + (type === SVG_RESULT ? '</svg>' : '');
  // Returned as an array for terseness
  return [trustFromTemplateString(strings, htmlResult), attrNames];
};
var Template = /*#__PURE__*/function () {
  function Template(// This property needs to remain unminified.
  _ref2, options) {
    var strings = _ref2.strings,
      type = _ref2['_$litType$'];
    _classCallCheck(this, Template);
    this.parts = [];
    var node;
    var nodeIndex = 0;
    var attrNameIndex = 0;
    var partCount = strings.length - 1;
    var parts = this.parts;
    // Create template element
    var _getTemplateHtml = getTemplateHtml(strings, type),
      _getTemplateHtml2 = _slicedToArray(_getTemplateHtml, 2),
      html = _getTemplateHtml2[0],
      attrNames = _getTemplateHtml2[1];
    this.el = Template.createElement(html, options);
    walker.currentNode = this.el.content;
    // Reparent SVG nodes into template root
    if (type === SVG_RESULT) {
      var content = this.el.content;
      var svgElement = content.firstChild;
      svgElement.remove();
      content.append.apply(content, _toConsumableArray(svgElement.childNodes));
    }
    // Walk the template to find binding markers and create TemplateParts
    while ((node = walker.nextNode()) !== null && parts.length < partCount) {
      if (node.nodeType === 1) {
        if (DEV_MODE) {
          var _tag = node.localName;
          // Warn if `textarea` includes an expression and throw if `template`
          // does since these are not supported. We do this by checking
          // innerHTML for anything that looks like a marker. This catches
          // cases like bindings in textarea there markers turn into text nodes.
          if (/^(?:textarea|template)$/i.test(_tag) && node.innerHTML.includes(marker)) {
            var m = "Expressions are not supported inside `".concat(_tag, "` ") + "elements. See https://lit.dev/msg/expression-in-".concat(_tag, " for more ") + "information.";
            if (_tag === 'template') {
              throw new Error(m);
            } else issueWarning('', m);
          }
        }
        // TODO (justinfagnani): for attempted dynamic tag names, we don't
        // increment the bindingIndex, and it'll be off by 1 in the element
        // and off by two after it.
        if (node.hasAttributes()) {
          // We defer removing bound attributes because on IE we might not be
          // iterating attributes in their template order, and would sometimes
          // remove an attribute that we still need to create a part for.
          var attrsToRemove = [];
          var _iterator = _createForOfIteratorHelper(node.getAttributeNames()),
            _step;
          try {
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              var _name2 = _step.value;
              // `name` is the name of the attribute we're iterating over, but not
              // _necessarily_ the name of the attribute we will create a part
              // for. They can be different in browsers that don't iterate on
              // attributes in source order. In that case the attrNames array
              // contains the attribute name we'll process next. We only need the
              // attribute name here to know if we should process a bound attribute
              // on this element.
              if (_name2.endsWith(boundAttributeSuffix) || _name2.startsWith(marker)) {
                var realName = attrNames[attrNameIndex++];
                attrsToRemove.push(_name2);
                if (realName !== undefined) {
                  // Lowercase for case-sensitive SVG attributes like viewBox
                  var value = node.getAttribute(realName.toLowerCase() + boundAttributeSuffix);
                  var statics = value.split(marker);
                  var _m = /([.?@])?(.*)/.exec(realName);
                  parts.push({
                    type: ATTRIBUTE_PART,
                    index: nodeIndex,
                    name: _m[2],
                    strings: statics,
                    ctor: _m[1] === '.' ? PropertyPart : _m[1] === '?' ? BooleanAttributePart : _m[1] === '@' ? EventPart : AttributePart
                  });
                } else {
                  parts.push({
                    type: ELEMENT_PART,
                    index: nodeIndex
                  });
                }
              }
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
          for (var _i = 0, _attrsToRemove = attrsToRemove; _i < _attrsToRemove.length; _i++) {
            var name = _attrsToRemove[_i];
            node.removeAttribute(name);
          }
        }
        // TODO (justinfagnani): benchmark the regex against testing for each
        // of the 3 raw text element names.
        if (rawTextElement.test(node.tagName)) {
          // For raw text elements we need to split the text content on
          // markers, create a Text node for each segment, and create
          // a TemplatePart for each marker.
          var _strings = node.textContent.split(marker);
          var lastIndex = _strings.length - 1;
          if (lastIndex > 0) {
            node.textContent = trustedTypes ? trustedTypes.emptyScript : '';
            // Generate a new text node for each literal section
            // These nodes are also used as the markers for node parts
            // We can't use empty text nodes as markers because they're
            // normalized when cloning in IE (could simplify when
            // IE is no longer supported)
            for (var i = 0; i < lastIndex; i++) {
              node.append(_strings[i], createMarker());
              // Walk past the marker node we just added
              walker.nextNode();
              parts.push({
                type: CHILD_PART,
                index: ++nodeIndex
              });
            }
            // Note because this marker is added after the walker's current
            // node, it will be walked to in the outer loop (and ignored), so
            // we don't need to adjust nodeIndex here
            node.append(_strings[lastIndex], createMarker());
          }
        }
      } else if (node.nodeType === 8) {
        var data = node.data;
        if (data === markerMatch) {
          parts.push({
            type: CHILD_PART,
            index: nodeIndex
          });
        } else {
          var _i2 = -1;
          while ((_i2 = node.data.indexOf(marker, _i2 + 1)) !== -1) {
            // Comment node has a binding marker inside, make an inactive part
            // The binding won't work, but subsequent bindings will
            parts.push({
              type: COMMENT_PART,
              index: nodeIndex
            });
            // Move to the end of the match
            _i2 += marker.length - 1;
          }
        }
      }
      nodeIndex++;
    }
    // We could set walker.currentNode to another node here to prevent a memory
    // leak, but every time we prepare a template, we immediately render it
    // and re-use the walker in new TemplateInstance._clone().
    debugLogEvent === null || debugLogEvent === void 0 ? void 0 : debugLogEvent({
      kind: 'template prep',
      template: this,
      clonableTemplate: this.el,
      parts: this.parts,
      strings: strings
    });
  }
  // Overridden via `litHtmlPolyfillSupport` to provide platform support.
  /** @nocollapse */
  return _createClass(Template, null, [{
    key: "createElement",
    value: function createElement(html, _options) {
      var el = d.createElement('template');
      el.innerHTML = html;
      return el;
    }
  }]);
}();
function resolveDirective(part, value) {
  var parent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : part;
  var attributeIndex = arguments.length > 3 ? arguments[3] : undefined;
  var _a, _b, _c;
  var _d;
  // Bail early if the value is explicitly noChange. Note, this means any
  // nested directive is still attached and is not run.
  if (value === noChange) {
    return value;
  }
  var currentDirective = attributeIndex !== undefined ? (_a = parent.__directives) === null || _a === void 0 ? void 0 : _a[attributeIndex] : parent.__directive;
  var nextDirectiveConstructor = isPrimitive(value) ? undefined :
  // This property needs to remain unminified.
  value['_$litDirective$'];
  if ((currentDirective === null || currentDirective === void 0 ? void 0 : currentDirective.constructor) !== nextDirectiveConstructor) {
    // This property needs to remain unminified.
    (_b = currentDirective === null || currentDirective === void 0 ? void 0 : currentDirective['_$notifyDirectiveConnectionChanged']) === null || _b === void 0 ? void 0 : _b.call(currentDirective, false);
    if (nextDirectiveConstructor === undefined) {
      currentDirective = undefined;
    } else {
      currentDirective = new nextDirectiveConstructor(part);
      currentDirective._$initialize(part, parent, attributeIndex);
    }
    if (attributeIndex !== undefined) {
      ((_c = (_d = parent).__directives) !== null && _c !== void 0 ? _c : _d.__directives = [])[attributeIndex] = currentDirective;
    } else {
      parent.__directive = currentDirective;
    }
  }
  if (currentDirective !== undefined) {
    value = resolveDirective(part, currentDirective._$resolve(part, value.values), currentDirective, attributeIndex);
  }
  return value;
}
/**
 * An updateable instance of a Template. Holds references to the Parts used to
 * update the template instance.
 */
var TemplateInstance = /*#__PURE__*/function () {
  function TemplateInstance(template, parent) {
    _classCallCheck(this, TemplateInstance);
    this._$parts = [];
    /** @internal */
    this._$disconnectableChildren = undefined;
    this._$template = template;
    this._$parent = parent;
  }
  // Called by ChildPart parentNode getter
  return _createClass(TemplateInstance, [{
    key: "parentNode",
    get: function get() {
      return this._$parent.parentNode;
    }
    // See comment in Disconnectable interface for why this is a getter
  }, {
    key: "_$isConnected",
    get: function get() {
      return this._$parent._$isConnected;
    }
    // This method is separate from the constructor because we need to return a
    // DocumentFragment and we don't want to hold onto it with an instance field.
  }, {
    key: "_clone",
    value: function _clone(options) {
      var _a;
      var _this$_$template = this._$template,
        content = _this$_$template.el.content,
        parts = _this$_$template.parts;
      var fragment = ((_a = options === null || options === void 0 ? void 0 : options.creationScope) !== null && _a !== void 0 ? _a : d).importNode(content, true);
      walker.currentNode = fragment;
      var node = walker.nextNode();
      var nodeIndex = 0;
      var partIndex = 0;
      var templatePart = parts[0];
      while (templatePart !== undefined) {
        if (nodeIndex === templatePart.index) {
          var part = void 0;
          if (templatePart.type === CHILD_PART) {
            part = new ChildPart(node, node.nextSibling, this, options);
          } else if (templatePart.type === ATTRIBUTE_PART) {
            part = new templatePart.ctor(node, templatePart.name, templatePart.strings, this, options);
          } else if (templatePart.type === ELEMENT_PART) {
            part = new ElementPart(node, this, options);
          }
          this._$parts.push(part);
          templatePart = parts[++partIndex];
        }
        if (nodeIndex !== (templatePart === null || templatePart === void 0 ? void 0 : templatePart.index)) {
          node = walker.nextNode();
          nodeIndex++;
        }
      }
      // We need to set the currentNode away from the cloned tree so that we
      // don't hold onto the tree even if the tree is detached and should be
      // freed.
      walker.currentNode = d;
      return fragment;
    }
  }, {
    key: "_update",
    value: function _update(values) {
      var i = 0;
      var _iterator2 = _createForOfIteratorHelper(this._$parts),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var part = _step2.value;
          if (part !== undefined) {
            debugLogEvent === null || debugLogEvent === void 0 ? void 0 : debugLogEvent({
              kind: 'set part',
              part: part,
              value: values[i],
              valueIndex: i,
              values: values,
              templateInstance: this
            });
            if (part.strings !== undefined) {
              part._$setValue(values, part, i);
              // The number of values the part consumes is part.strings.length - 1
              // since values are in between template spans. We increment i by 1
              // later in the loop, so increment it by part.strings.length - 2 here
              i += part.strings.length - 2;
            } else {
              part._$setValue(values[i]);
            }
          }
          i++;
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }
  }]);
}();
var ChildPart = /*#__PURE__*/function () {
  function ChildPart(startNode, endNode, parent, options) {
    _classCallCheck(this, ChildPart);
    var _a;
    this.type = CHILD_PART;
    this._$committedValue = nothing;
    // The following fields will be patched onto ChildParts when required by
    // AsyncDirective
    /** @internal */
    this._$disconnectableChildren = undefined;
    this._$startNode = startNode;
    this._$endNode = endNode;
    this._$parent = parent;
    this.options = options;
    // Note __isConnected is only ever accessed on RootParts (i.e. when there is
    // no _$parent); the value on a non-root-part is "don't care", but checking
    // for parent would be more code
    this.__isConnected = (_a = options === null || options === void 0 ? void 0 : options.isConnected) !== null && _a !== void 0 ? _a : true;
    if (ENABLE_EXTRA_SECURITY_HOOKS) {
      // Explicitly initialize for consistent class shape.
      this._textSanitizer = undefined;
    }
  }
  // See comment in Disconnectable interface for why this is a getter
  return _createClass(ChildPart, [{
    key: "_$isConnected",
    get: function get() {
      var _a, _b;
      // ChildParts that are not at the root should always be created with a
      // parent; only RootChildNode's won't, so they return the local isConnected
      // state
      return (_b = (_a = this._$parent) === null || _a === void 0 ? void 0 : _a._$isConnected) !== null && _b !== void 0 ? _b : this.__isConnected;
    }
    /**
     * The parent node into which the part renders its content.
     *
     * A ChildPart's content consists of a range of adjacent child nodes of
     * `.parentNode`, possibly bordered by 'marker nodes' (`.startNode` and
     * `.endNode`).
     *
     * - If both `.startNode` and `.endNode` are non-null, then the part's content
     * consists of all siblings between `.startNode` and `.endNode`, exclusively.
     *
     * - If `.startNode` is non-null but `.endNode` is null, then the part's
     * content consists of all siblings following `.startNode`, up to and
     * including the last child of `.parentNode`. If `.endNode` is non-null, then
     * `.startNode` will always be non-null.
     *
     * - If both `.endNode` and `.startNode` are null, then the part's content
     * consists of all child nodes of `.parentNode`.
     */
  }, {
    key: "parentNode",
    get: function get() {
      var parentNode = wrap(this._$startNode).parentNode;
      var parent = this._$parent;
      if (parent !== undefined && (parentNode === null || parentNode === void 0 ? void 0 : parentNode.nodeType) === 11 /* Node.DOCUMENT_FRAGMENT */) {
        // If the parentNode is a DocumentFragment, it may be because the DOM is
        // still in the cloned fragment during initial render; if so, get the real
        // parentNode the part will be committed into by asking the parent.
        parentNode = parent.parentNode;
      }
      return parentNode;
    }
    /**
     * The part's leading marker node, if any. See `.parentNode` for more
     * information.
     */
  }, {
    key: "startNode",
    get: function get() {
      return this._$startNode;
    }
    /**
     * The part's trailing marker node, if any. See `.parentNode` for more
     * information.
     */
  }, {
    key: "endNode",
    get: function get() {
      return this._$endNode;
    }
  }, {
    key: "_$setValue",
    value: function _$setValue(value) {
      var directiveParent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this;
      var _a;
      if (DEV_MODE && this.parentNode === null) {
        throw new Error("This `ChildPart` has no `parentNode` and therefore cannot accept a value. This likely means the element containing the part was manipulated in an unsupported way outside of Lit's control such that the part's marker nodes were ejected from DOM. For example, setting the element's `innerHTML` or `textContent` can do this.");
      }
      value = resolveDirective(this, value, directiveParent);
      if (isPrimitive(value)) {
        // Non-rendering child values. It's important that these do not render
        // empty text nodes to avoid issues with preventing default <slot>
        // fallback content.
        if (value === nothing || value == null || value === '') {
          if (this._$committedValue !== nothing) {
            debugLogEvent === null || debugLogEvent === void 0 ? void 0 : debugLogEvent({
              kind: 'commit nothing to child',
              start: this._$startNode,
              end: this._$endNode,
              parent: this._$parent,
              options: this.options
            });
            this._$clear();
          }
          this._$committedValue = nothing;
        } else if (value !== this._$committedValue && value !== noChange) {
          this._commitText(value);
        }
        // This property needs to remain unminified.
      } else if (value['_$litType$'] !== undefined) {
        this._commitTemplateResult(value);
      } else if (value.nodeType !== undefined) {
        if (DEV_MODE && ((_a = this.options) === null || _a === void 0 ? void 0 : _a.host) === value) {
          this._commitText("[probable mistake: rendered a template's host in itself " + "(commonly caused by writing ${this} in a template]");
          console.warn("Attempted to render the template host", value, "inside itself. This is almost always a mistake, and in dev mode ", "we render some warning text. In production however, we'll ", "render it, which will usually result in an error, and sometimes ", "in the element disappearing from the DOM.");
          return;
        }
        this._commitNode(value);
      } else if (isIterable(value)) {
        this._commitIterable(value);
      } else {
        // Fallback, will render the string representation
        this._commitText(value);
      }
    }
  }, {
    key: "_insert",
    value: function _insert(node) {
      return wrap(wrap(this._$startNode).parentNode).insertBefore(node, this._$endNode);
    }
  }, {
    key: "_commitNode",
    value: function _commitNode(value) {
      var _a;
      if (this._$committedValue !== value) {
        this._$clear();
        if (ENABLE_EXTRA_SECURITY_HOOKS && sanitizerFactoryInternal !== noopSanitizer) {
          var parentNodeName = (_a = this._$startNode.parentNode) === null || _a === void 0 ? void 0 : _a.nodeName;
          if (parentNodeName === 'STYLE' || parentNodeName === 'SCRIPT') {
            var message = 'Forbidden';
            if (DEV_MODE) {
              if (parentNodeName === 'STYLE') {
                message = "Lit does not support binding inside style nodes. " + "This is a security risk, as style injection attacks can " + "exfiltrate data and spoof UIs. " + "Consider instead using css`...` literals " + "to compose styles, and make do dynamic styling with " + "css custom properties, ::parts, <slot>s, " + "and by mutating the DOM rather than stylesheets.";
              } else {
                message = "Lit does not support binding inside script nodes. " + "This is a security risk, as it could allow arbitrary " + "code execution.";
              }
            }
            throw new Error(message);
          }
        }
        debugLogEvent === null || debugLogEvent === void 0 ? void 0 : debugLogEvent({
          kind: 'commit node',
          start: this._$startNode,
          parent: this._$parent,
          value: value,
          options: this.options
        });
        this._$committedValue = this._insert(value);
      }
    }
  }, {
    key: "_commitText",
    value: function _commitText(value) {
      // If the committed value is a primitive it means we called _commitText on
      // the previous render, and we know that this._$startNode.nextSibling is a
      // Text node. We can now just replace the text content (.data) of the node.
      if (this._$committedValue !== nothing && isPrimitive(this._$committedValue)) {
        var node = wrap(this._$startNode).nextSibling;
        if (ENABLE_EXTRA_SECURITY_HOOKS) {
          if (this._textSanitizer === undefined) {
            this._textSanitizer = createSanitizer(node, 'data', 'property');
          }
          value = this._textSanitizer(value);
        }
        debugLogEvent === null || debugLogEvent === void 0 ? void 0 : debugLogEvent({
          kind: 'commit text',
          node: node,
          value: value,
          options: this.options
        });
        node.data = value;
      } else {
        if (ENABLE_EXTRA_SECURITY_HOOKS) {
          var textNode = d.createTextNode('');
          this._commitNode(textNode);
          // When setting text content, for security purposes it matters a lot
          // what the parent is. For example, <style> and <script> need to be
          // handled with care, while <span> does not. So first we need to put a
          // text node into the document, then we can sanitize its content.
          if (this._textSanitizer === undefined) {
            this._textSanitizer = createSanitizer(textNode, 'data', 'property');
          }
          value = this._textSanitizer(value);
          debugLogEvent === null || debugLogEvent === void 0 ? void 0 : debugLogEvent({
            kind: 'commit text',
            node: textNode,
            value: value,
            options: this.options
          });
          textNode.data = value;
        } else {
          this._commitNode(d.createTextNode(value));
          debugLogEvent === null || debugLogEvent === void 0 ? void 0 : debugLogEvent({
            kind: 'commit text',
            node: wrap(this._$startNode).nextSibling,
            value: value,
            options: this.options
          });
        }
      }
      this._$committedValue = value;
    }
  }, {
    key: "_commitTemplateResult",
    value: function _commitTemplateResult(result) {
      var _a;
      // This property needs to remain unminified.
      var values = result.values,
        type = result['_$litType$'];
      // If $litType$ is a number, result is a plain TemplateResult and we get
      // the template from the template cache. If not, result is a
      // CompiledTemplateResult and _$litType$ is a CompiledTemplate and we need
      // to create the <template> element the first time we see it.
      var template = typeof type === 'number' ? this._$getTemplate(result) : (type.el === undefined && (type.el = Template.createElement(trustFromTemplateString(type.h, type.h[0]), this.options)), type);
      if (((_a = this._$committedValue) === null || _a === void 0 ? void 0 : _a._$template) === template) {
        debugLogEvent === null || debugLogEvent === void 0 ? void 0 : debugLogEvent({
          kind: 'template updating',
          template: template,
          instance: this._$committedValue,
          parts: this._$committedValue._$parts,
          options: this.options,
          values: values
        });
        this._$committedValue._update(values);
      } else {
        var instance = new TemplateInstance(template, this);
        var fragment = instance._clone(this.options);
        debugLogEvent === null || debugLogEvent === void 0 ? void 0 : debugLogEvent({
          kind: 'template instantiated',
          template: template,
          instance: instance,
          parts: instance._$parts,
          options: this.options,
          fragment: fragment,
          values: values
        });
        instance._update(values);
        debugLogEvent === null || debugLogEvent === void 0 ? void 0 : debugLogEvent({
          kind: 'template instantiated and updated',
          template: template,
          instance: instance,
          parts: instance._$parts,
          options: this.options,
          fragment: fragment,
          values: values
        });
        this._commitNode(fragment);
        this._$committedValue = instance;
      }
    }
    // Overridden via `litHtmlPolyfillSupport` to provide platform support.
    /** @internal */
  }, {
    key: "_$getTemplate",
    value: function _$getTemplate(result) {
      var template = templateCache.get(result.strings);
      if (template === undefined) {
        templateCache.set(result.strings, template = new Template(result));
      }
      return template;
    }
  }, {
    key: "_commitIterable",
    value: function _commitIterable(value) {
      // For an Iterable, we create a new InstancePart per item, then set its
      // value to the item. This is a little bit of overhead for every item in
      // an Iterable, but it lets us recurse easily and efficiently update Arrays
      // of TemplateResults that will be commonly returned from expressions like:
      // array.map((i) => html`${i}`), by reusing existing TemplateInstances.
      // If value is an array, then the previous render was of an
      // iterable and value will contain the ChildParts from the previous
      // render. If value is not an array, clear this part and make a new
      // array for ChildParts.
      if (!isArray(this._$committedValue)) {
        this._$committedValue = [];
        this._$clear();
      }
      // Lets us keep track of how many items we stamped so we can clear leftover
      // items from a previous render
      var itemParts = this._$committedValue;
      var partIndex = 0;
      var itemPart;
      var _iterator3 = _createForOfIteratorHelper(value),
        _step3;
      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var item = _step3.value;
          if (partIndex === itemParts.length) {
            // If no existing part, create a new one
            // TODO (justinfagnani): test perf impact of always creating two parts
            // instead of sharing parts between nodes
            // https://github.com/lit/lit/issues/1266
            itemParts.push(itemPart = new ChildPart(this._insert(createMarker()), this._insert(createMarker()), this, this.options));
          } else {
            // Reuse an existing part
            itemPart = itemParts[partIndex];
          }
          itemPart._$setValue(item);
          partIndex++;
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
      if (partIndex < itemParts.length) {
        // itemParts always have end nodes
        this._$clear(itemPart && wrap(itemPart._$endNode).nextSibling, partIndex);
        // Truncate the parts array so _value reflects the current state
        itemParts.length = partIndex;
      }
    }
    /**
     * Removes the nodes contained within this Part from the DOM.
     *
     * @param start Start node to clear from, for clearing a subset of the part's
     *     DOM (used when truncating iterables)
     * @param from  When `start` is specified, the index within the iterable from
     *     which ChildParts are being removed, used for disconnecting directives in
     *     those Parts.
     *
     * @internal
     */
  }, {
    key: "_$clear",
    value: function _$clear() {
      var start = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : wrap(this._$startNode).nextSibling;
      var from = arguments.length > 1 ? arguments[1] : undefined;
      var _a;
      (_a = this._$notifyConnectionChanged) === null || _a === void 0 ? void 0 : _a.call(this, false, true, from);
      while (start && start !== this._$endNode) {
        var n = wrap(start).nextSibling;
        wrap(start).remove();
        start = n;
      }
    }
    /**
     * Implementation of RootPart's `isConnected`. Note that this metod
     * should only be called on `RootPart`s (the `ChildPart` returned from a
     * top-level `render()` call). It has no effect on non-root ChildParts.
     * @param isConnected Whether to set
     * @internal
     */
  }, {
    key: "setConnected",
    value: function setConnected(isConnected) {
      var _a;
      if (this._$parent === undefined) {
        this.__isConnected = isConnected;
        (_a = this._$notifyConnectionChanged) === null || _a === void 0 ? void 0 : _a.call(this, isConnected);
      } else if (DEV_MODE) {
        throw new Error('part.setConnected() may only be called on a ' + 'RootPart returned from render().');
      }
    }
  }]);
}();
var AttributePart = /*#__PURE__*/function () {
  function AttributePart(element, name, strings, parent, options) {
    _classCallCheck(this, AttributePart);
    this.type = ATTRIBUTE_PART;
    /** @internal */
    this._$committedValue = nothing;
    /** @internal */
    this._$disconnectableChildren = undefined;
    this.element = element;
    this.name = name;
    this._$parent = parent;
    this.options = options;
    if (strings.length > 2 || strings[0] !== '' || strings[1] !== '') {
      this._$committedValue = new Array(strings.length - 1).fill(new String());
      this.strings = strings;
    } else {
      this._$committedValue = nothing;
    }
    if (ENABLE_EXTRA_SECURITY_HOOKS) {
      this._sanitizer = undefined;
    }
  }
  return _createClass(AttributePart, [{
    key: "tagName",
    get: function get() {
      return this.element.tagName;
    }
    // See comment in Disconnectable interface for why this is a getter
  }, {
    key: "_$isConnected",
    get: function get() {
      return this._$parent._$isConnected;
    }
    /**
     * Sets the value of this part by resolving the value from possibly multiple
     * values and static strings and committing it to the DOM.
     * If this part is single-valued, `this._strings` will be undefined, and the
     * method will be called with a single value argument. If this part is
     * multi-value, `this._strings` will be defined, and the method is called
     * with the value array of the part's owning TemplateInstance, and an offset
     * into the value array from which the values should be read.
     * This method is overloaded this way to eliminate short-lived array slices
     * of the template instance values, and allow a fast-path for single-valued
     * parts.
     *
     * @param value The part value, or an array of values for multi-valued parts
     * @param valueIndex the index to start reading values from. `undefined` for
     *   single-valued parts
     * @param noCommit causes the part to not commit its value to the DOM. Used
     *   in hydration to prime attribute parts with their first-rendered value,
     *   but not set the attribute, and in SSR to no-op the DOM operation and
     *   capture the value for serialization.
     *
     * @internal
     */
  }, {
    key: "_$setValue",
    value: function _$setValue(value) {
      var directiveParent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this;
      var valueIndex = arguments.length > 2 ? arguments[2] : undefined;
      var noCommit = arguments.length > 3 ? arguments[3] : undefined;
      var strings = this.strings;
      // Whether any of the values has changed, for dirty-checking
      var change = false;
      if (strings === undefined) {
        // Single-value binding case
        value = resolveDirective(this, value, directiveParent, 0);
        change = !isPrimitive(value) || value !== this._$committedValue && value !== noChange;
        if (change) {
          this._$committedValue = value;
        }
      } else {
        // Interpolation case
        var values = value;
        value = strings[0];
        var i, v;
        for (i = 0; i < strings.length - 1; i++) {
          v = resolveDirective(this, values[valueIndex + i], directiveParent, i);
          if (v === noChange) {
            // If the user-provided value is `noChange`, use the previous value
            v = this._$committedValue[i];
          }
          change || (change = !isPrimitive(v) || v !== this._$committedValue[i]);
          if (v === nothing) {
            value = nothing;
          } else if (value !== nothing) {
            value += (v !== null && v !== void 0 ? v : '') + strings[i + 1];
          }
          // We always record each value, even if one is `nothing`, for future
          // change detection.
          this._$committedValue[i] = v;
        }
      }
      if (change && !noCommit) {
        this._commitValue(value);
      }
    }
    /** @internal */
  }, {
    key: "_commitValue",
    value: function _commitValue(value) {
      if (value === nothing) {
        wrap(this.element).removeAttribute(this.name);
      } else {
        if (ENABLE_EXTRA_SECURITY_HOOKS) {
          if (this._sanitizer === undefined) {
            this._sanitizer = sanitizerFactoryInternal(this.element, this.name, 'attribute');
          }
          value = this._sanitizer(value !== null && value !== void 0 ? value : '');
        }
        debugLogEvent === null || debugLogEvent === void 0 ? void 0 : debugLogEvent({
          kind: 'commit attribute',
          element: this.element,
          name: this.name,
          value: value,
          options: this.options
        });
        wrap(this.element).setAttribute(this.name, value !== null && value !== void 0 ? value : '');
      }
    }
  }]);
}();
var PropertyPart = /*#__PURE__*/function (_AttributePart) {
  function PropertyPart() {
    var _this;
    _classCallCheck(this, PropertyPart);
    _this = _callSuper(this, PropertyPart, arguments);
    _this.type = PROPERTY_PART;
    return _this;
  }
  /** @internal */
  _inherits(PropertyPart, _AttributePart);
  return _createClass(PropertyPart, [{
    key: "_commitValue",
    value: function _commitValue(value) {
      if (ENABLE_EXTRA_SECURITY_HOOKS) {
        if (this._sanitizer === undefined) {
          this._sanitizer = sanitizerFactoryInternal(this.element, this.name, 'property');
        }
        value = this._sanitizer(value);
      }
      debugLogEvent === null || debugLogEvent === void 0 ? void 0 : debugLogEvent({
        kind: 'commit property',
        element: this.element,
        name: this.name,
        value: value,
        options: this.options
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.element[this.name] = value === nothing ? undefined : value;
    }
  }]);
}(AttributePart); // Temporary workaround for https://crbug.com/993268
// Currently, any attribute starting with "on" is considered to be a
// TrustedScript source. Such boolean attributes must be set to the equivalent
// trusted emptyScript value.
var emptyStringForBooleanAttribute = trustedTypes ? trustedTypes.emptyScript : '';
var BooleanAttributePart = /*#__PURE__*/function (_AttributePart2) {
  function BooleanAttributePart() {
    var _this2;
    _classCallCheck(this, BooleanAttributePart);
    _this2 = _callSuper(this, BooleanAttributePart, arguments);
    _this2.type = BOOLEAN_ATTRIBUTE_PART;
    return _this2;
  }
  /** @internal */
  _inherits(BooleanAttributePart, _AttributePart2);
  return _createClass(BooleanAttributePart, [{
    key: "_commitValue",
    value: function _commitValue(value) {
      debugLogEvent === null || debugLogEvent === void 0 ? void 0 : debugLogEvent({
        kind: 'commit boolean attribute',
        element: this.element,
        name: this.name,
        value: !!(value && value !== nothing),
        options: this.options
      });
      if (value && value !== nothing) {
        wrap(this.element).setAttribute(this.name, emptyStringForBooleanAttribute);
      } else {
        wrap(this.element).removeAttribute(this.name);
      }
    }
  }]);
}(AttributePart);
var EventPart = /*#__PURE__*/function (_AttributePart3) {
  function EventPart(element, name, strings, parent, options) {
    var _this3;
    _classCallCheck(this, EventPart);
    _this3 = _callSuper(this, EventPart, [element, name, strings, parent, options]);
    _this3.type = EVENT_PART;
    if (DEV_MODE && _this3.strings !== undefined) {
      throw new Error("A `<".concat(element.localName, ">` has a `@").concat(name, "=...` listener with ") + 'invalid content. Event listeners in templates must have exactly ' + 'one expression and no surrounding text.');
    }
    return _this3;
  }
  // EventPart does not use the base _$setValue/_resolveValue implementation
  // since the dirty checking is more complex
  /** @internal */
  _inherits(EventPart, _AttributePart3);
  return _createClass(EventPart, [{
    key: "_$setValue",
    value: function _$setValue(newListener) {
      var directiveParent = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this;
      var _a;
      newListener = (_a = resolveDirective(this, newListener, directiveParent, 0)) !== null && _a !== void 0 ? _a : nothing;
      if (newListener === noChange) {
        return;
      }
      var oldListener = this._$committedValue;
      // If the new value is nothing or any options change we have to remove the
      // part as a listener.
      var shouldRemoveListener = newListener === nothing && oldListener !== nothing || newListener.capture !== oldListener.capture || newListener.once !== oldListener.once || newListener.passive !== oldListener.passive;
      // If the new value is not nothing and we removed the listener, we have
      // to add the part as a listener.
      var shouldAddListener = newListener !== nothing && (oldListener === nothing || shouldRemoveListener);
      debugLogEvent === null || debugLogEvent === void 0 ? void 0 : debugLogEvent({
        kind: 'commit event listener',
        element: this.element,
        name: this.name,
        value: newListener,
        options: this.options,
        removeListener: shouldRemoveListener,
        addListener: shouldAddListener,
        oldListener: oldListener
      });
      if (shouldRemoveListener) {
        this.element.removeEventListener(this.name, this, oldListener);
      }
      if (shouldAddListener) {
        // Beware: IE11 and Chrome 41 don't like using the listener as the
        // options object. Figure out how to deal w/ this in IE11 - maybe
        // patch addEventListener?
        this.element.addEventListener(this.name, this, newListener);
      }
      this._$committedValue = newListener;
    }
  }, {
    key: "handleEvent",
    value: function handleEvent(event) {
      var _a, _b;
      if (typeof this._$committedValue === 'function') {
        this._$committedValue.call((_b = (_a = this.options) === null || _a === void 0 ? void 0 : _a.host) !== null && _b !== void 0 ? _b : this.element, event);
      } else {
        this._$committedValue.handleEvent(event);
      }
    }
  }]);
}(AttributePart);
var ElementPart = /*#__PURE__*/function () {
  function ElementPart(element, parent, options) {
    _classCallCheck(this, ElementPart);
    this.element = element;
    this.type = ELEMENT_PART;
    /** @internal */
    this._$disconnectableChildren = undefined;
    this._$parent = parent;
    this.options = options;
  }
  // See comment in Disconnectable interface for why this is a getter
  return _createClass(ElementPart, [{
    key: "_$isConnected",
    get: function get() {
      return this._$parent._$isConnected;
    }
  }, {
    key: "_$setValue",
    value: function _$setValue(value) {
      debugLogEvent === null || debugLogEvent === void 0 ? void 0 : debugLogEvent({
        kind: 'commit to element binding',
        element: this.element,
        value: value,
        options: this.options
      });
      resolveDirective(this, value);
    }
  }]);
}();
/**
 * END USERS SHOULD NOT RELY ON THIS OBJECT.
 *
 * Private exports for use by other Lit packages, not intended for use by
 * external users.
 *
 * We currently do not make a mangled rollup build of the lit-ssr code. In order
 * to keep a number of (otherwise private) top-level exports  mangled in the
 * client side code, we export a _$LH object containing those members (or
 * helper methods for accessing private fields of those members), and then
 * re-export them for use in lit-ssr. This keeps lit-ssr agnostic to whether the
 * client-side code is being used in `dev` mode or `prod` mode.
 *
 * This has a unique name, to disambiguate it from private exports in
 * lit-element, which re-exports all of lit-html.
 *
 * @private
 */
var _$LH = {
  // Used in lit-ssr
  _boundAttributeSuffix: boundAttributeSuffix,
  _marker: marker,
  _markerMatch: markerMatch,
  _HTML_RESULT: HTML_RESULT,
  _getTemplateHtml: getTemplateHtml,
  // Used in tests and private-ssr-support
  _TemplateInstance: TemplateInstance,
  _isIterable: isIterable,
  _resolveDirective: resolveDirective,
  _ChildPart: ChildPart,
  _AttributePart: AttributePart,
  _BooleanAttributePart: BooleanAttributePart,
  _EventPart: EventPart,
  _PropertyPart: PropertyPart,
  _ElementPart: ElementPart
};
// Apply polyfills if available
var polyfillSupport = DEV_MODE ? global.litHtmlPolyfillSupportDevMode : global.litHtmlPolyfillSupport;
polyfillSupport === null || polyfillSupport === void 0 ? void 0 : polyfillSupport(Template, ChildPart);
// IMPORTANT: do not change the property name or the assignment expression.
// This line will be used in regexes to search for lit-html usage.
((_d = global.litHtmlVersions) !== null && _d !== void 0 ? _d : global.litHtmlVersions = []).push('2.8.0');
if (DEV_MODE && global.litHtmlVersions.length > 1) {
  issueWarning('multiple-versions', "Multiple versions of Lit loaded. " + "Loading multiple versions is not recommended.");
}
/**
 * Renders a value, usually a lit-html TemplateResult, to the container.
 *
 * This example renders the text "Hello, Zoe!" inside a paragraph tag, appending
 * it to the container `document.body`.
 *
 * ```js
 * import {html, render} from 'lit';
 *
 * const name = "Zoe";
 * render(html`<p>Hello, ${name}!</p>`, document.body);
 * ```
 *
 * @param value Any [renderable
 *   value](https://lit.dev/docs/templates/expressions/#child-expressions),
 *   typically a {@linkcode TemplateResult} created by evaluating a template tag
 *   like {@linkcode html} or {@linkcode svg}.
 * @param container A DOM container to render to. The first render will append
 *   the rendered value to the container, and subsequent renders will
 *   efficiently update the rendered value if the same result type was
 *   previously rendered there.
 * @param options See {@linkcode RenderOptions} for options documentation.
 * @see
 * {@link https://lit.dev/docs/libraries/standalone-templates/#rendering-lit-html-templates| Rendering Lit HTML Templates}
 */
var render = function render(value, container, options) {
  var _a, _b;
  if (DEV_MODE && container == null) {
    // Give a clearer error message than
    //     Uncaught TypeError: Cannot read properties of null (reading
    //     '_$litPart$')
    // which reads like an internal Lit error.
    throw new TypeError("The container to render into may not be ".concat(container));
  }
  var renderId = DEV_MODE ? debugLogRenderId++ : 0;
  var partOwnerNode = (_a = options === null || options === void 0 ? void 0 : options.renderBefore) !== null && _a !== void 0 ? _a : container;
  // This property needs to remain unminified.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  var part = partOwnerNode['_$litPart$'];
  debugLogEvent === null || debugLogEvent === void 0 ? void 0 : debugLogEvent({
    kind: 'begin render',
    id: renderId,
    value: value,
    container: container,
    options: options,
    part: part
  });
  if (part === undefined) {
    var endNode = (_b = options === null || options === void 0 ? void 0 : options.renderBefore) !== null && _b !== void 0 ? _b : null;
    // This property needs to remain unminified.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    partOwnerNode['_$litPart$'] = part = new ChildPart(container.insertBefore(createMarker(), endNode), endNode, undefined, options !== null && options !== void 0 ? options : {});
  }
  part._$setValue(value);
  debugLogEvent === null || debugLogEvent === void 0 ? void 0 : debugLogEvent({
    kind: 'end render',
    id: renderId,
    value: value,
    container: container,
    options: options,
    part: part
  });
  return part;
};
if (ENABLE_EXTRA_SECURITY_HOOKS) {
  render.setSanitizer = setSanitizer;
  render.createSanitizer = createSanitizer;
  if (DEV_MODE) {
    render._testOnlyClearSanitizerFactoryDoNotCallOrElse = _testOnlyClearSanitizerFactoryDoNotCallOrElse;
  }
}

/***/ }),

/***/ "./node_modules/lit/decorators.js":
/*!****************************************!*\
  !*** ./node_modules/lit/decorators.js ***!
  \****************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   customElement: () => (/* reexport safe */ _lit_reactive_element_decorators_custom_element_js__WEBPACK_IMPORTED_MODULE_0__.customElement),
/* harmony export */   eventOptions: () => (/* reexport safe */ _lit_reactive_element_decorators_event_options_js__WEBPACK_IMPORTED_MODULE_3__.eventOptions),
/* harmony export */   property: () => (/* reexport safe */ _lit_reactive_element_decorators_property_js__WEBPACK_IMPORTED_MODULE_1__.property),
/* harmony export */   query: () => (/* reexport safe */ _lit_reactive_element_decorators_query_js__WEBPACK_IMPORTED_MODULE_4__.query),
/* harmony export */   queryAll: () => (/* reexport safe */ _lit_reactive_element_decorators_query_all_js__WEBPACK_IMPORTED_MODULE_5__.queryAll),
/* harmony export */   queryAssignedElements: () => (/* reexport safe */ _lit_reactive_element_decorators_query_assigned_elements_js__WEBPACK_IMPORTED_MODULE_7__.queryAssignedElements),
/* harmony export */   queryAssignedNodes: () => (/* reexport safe */ _lit_reactive_element_decorators_query_assigned_nodes_js__WEBPACK_IMPORTED_MODULE_8__.queryAssignedNodes),
/* harmony export */   queryAsync: () => (/* reexport safe */ _lit_reactive_element_decorators_query_async_js__WEBPACK_IMPORTED_MODULE_6__.queryAsync),
/* harmony export */   state: () => (/* reexport safe */ _lit_reactive_element_decorators_state_js__WEBPACK_IMPORTED_MODULE_2__.state)
/* harmony export */ });
/* harmony import */ var _lit_reactive_element_decorators_custom_element_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @lit/reactive-element/decorators/custom-element.js */ "./node_modules/@lit/reactive-element/development/decorators/custom-element.js");
/* harmony import */ var _lit_reactive_element_decorators_property_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @lit/reactive-element/decorators/property.js */ "./node_modules/@lit/reactive-element/development/decorators/property.js");
/* harmony import */ var _lit_reactive_element_decorators_state_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @lit/reactive-element/decorators/state.js */ "./node_modules/@lit/reactive-element/development/decorators/state.js");
/* harmony import */ var _lit_reactive_element_decorators_event_options_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @lit/reactive-element/decorators/event-options.js */ "./node_modules/@lit/reactive-element/development/decorators/event-options.js");
/* harmony import */ var _lit_reactive_element_decorators_query_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @lit/reactive-element/decorators/query.js */ "./node_modules/@lit/reactive-element/development/decorators/query.js");
/* harmony import */ var _lit_reactive_element_decorators_query_all_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @lit/reactive-element/decorators/query-all.js */ "./node_modules/@lit/reactive-element/development/decorators/query-all.js");
/* harmony import */ var _lit_reactive_element_decorators_query_async_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @lit/reactive-element/decorators/query-async.js */ "./node_modules/@lit/reactive-element/development/decorators/query-async.js");
/* harmony import */ var _lit_reactive_element_decorators_query_assigned_elements_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @lit/reactive-element/decorators/query-assigned-elements.js */ "./node_modules/@lit/reactive-element/development/decorators/query-assigned-elements.js");
/* harmony import */ var _lit_reactive_element_decorators_query_assigned_nodes_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @lit/reactive-element/decorators/query-assigned-nodes.js */ "./node_modules/@lit/reactive-element/development/decorators/query-assigned-nodes.js");










/***/ }),

/***/ "./node_modules/lit/index.js":
/*!***********************************!*\
  !*** ./node_modules/lit/index.js ***!
  \***********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CSSResult: () => (/* reexport safe */ lit_element_lit_element_js__WEBPACK_IMPORTED_MODULE_2__.CSSResult),
/* harmony export */   LitElement: () => (/* reexport safe */ lit_element_lit_element_js__WEBPACK_IMPORTED_MODULE_2__.LitElement),
/* harmony export */   ReactiveElement: () => (/* reexport safe */ lit_element_lit_element_js__WEBPACK_IMPORTED_MODULE_2__.ReactiveElement),
/* harmony export */   UpdatingElement: () => (/* reexport safe */ lit_element_lit_element_js__WEBPACK_IMPORTED_MODULE_2__.UpdatingElement),
/* harmony export */   _$LE: () => (/* reexport safe */ lit_element_lit_element_js__WEBPACK_IMPORTED_MODULE_2__._$LE),
/* harmony export */   _$LH: () => (/* reexport safe */ lit_element_lit_element_js__WEBPACK_IMPORTED_MODULE_2__._$LH),
/* harmony export */   adoptStyles: () => (/* reexport safe */ lit_element_lit_element_js__WEBPACK_IMPORTED_MODULE_2__.adoptStyles),
/* harmony export */   css: () => (/* reexport safe */ lit_element_lit_element_js__WEBPACK_IMPORTED_MODULE_2__.css),
/* harmony export */   defaultConverter: () => (/* reexport safe */ lit_element_lit_element_js__WEBPACK_IMPORTED_MODULE_2__.defaultConverter),
/* harmony export */   getCompatibleStyle: () => (/* reexport safe */ lit_element_lit_element_js__WEBPACK_IMPORTED_MODULE_2__.getCompatibleStyle),
/* harmony export */   html: () => (/* reexport safe */ lit_element_lit_element_js__WEBPACK_IMPORTED_MODULE_2__.html),
/* harmony export */   isServer: () => (/* reexport safe */ lit_html_is_server_js__WEBPACK_IMPORTED_MODULE_3__.isServer),
/* harmony export */   noChange: () => (/* reexport safe */ lit_element_lit_element_js__WEBPACK_IMPORTED_MODULE_2__.noChange),
/* harmony export */   notEqual: () => (/* reexport safe */ lit_element_lit_element_js__WEBPACK_IMPORTED_MODULE_2__.notEqual),
/* harmony export */   nothing: () => (/* reexport safe */ lit_element_lit_element_js__WEBPACK_IMPORTED_MODULE_2__.nothing),
/* harmony export */   render: () => (/* reexport safe */ lit_element_lit_element_js__WEBPACK_IMPORTED_MODULE_2__.render),
/* harmony export */   supportsAdoptingStyleSheets: () => (/* reexport safe */ lit_element_lit_element_js__WEBPACK_IMPORTED_MODULE_2__.supportsAdoptingStyleSheets),
/* harmony export */   svg: () => (/* reexport safe */ lit_element_lit_element_js__WEBPACK_IMPORTED_MODULE_2__.svg),
/* harmony export */   unsafeCSS: () => (/* reexport safe */ lit_element_lit_element_js__WEBPACK_IMPORTED_MODULE_2__.unsafeCSS)
/* harmony export */ });
/* harmony import */ var _lit_reactive_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @lit/reactive-element */ "./node_modules/@lit/reactive-element/development/reactive-element.js");
/* harmony import */ var lit_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lit-html */ "./node_modules/lit-html/development/lit-html.js");
/* harmony import */ var lit_element_lit_element_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lit-element/lit-element.js */ "./node_modules/lit-element/development/lit-element.js");
/* harmony import */ var lit_html_is_server_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lit-html/is-server.js */ "./node_modules/lit-html/development/is-server.js");





/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
(() => {
"use strict";
/*!******************!*\
  !*** ./index.js ***!
  \******************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FWFormulaEditorShowcase: () => (/* binding */ FWFormulaEditorShowcase)
/* harmony export */ });
/* harmony import */ var lit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lit */ "./node_modules/lit/index.js");
/* harmony import */ var lit_decorators_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lit/decorators.js */ "./node_modules/lit/decorators.js");
/* harmony import */ var _fw_components_formula_editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @fw-components/formula-editor */ "../../packages/formula-editor/dist/formula-editor.js");
/* harmony import */ var _fw_components_formula_editor_utils_parser_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @fw-components/formula-editor/utils/parser.js */ "../../packages/formula-editor/dist/utils/parser.js");
/* harmony import */ var _fw_components_formula_editor_types_index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @fw-components/formula-editor/types/index.js */ "../../packages/formula-editor/dist/types/index.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _templateObject, _templateObject2, _templateObject3, _templateObject4;
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _decorate(e, r, t, i) { var o = _getDecoratorsApi(); if (i) for (var n = 0; n < i.length; n++) o = i[n](o); var s = r(function (e) { o.initializeInstanceElements(e, a.elements); }, t), a = o.decorateClass(_coalesceClassElements(s.d.map(_createElementDescriptor)), e); return o.initializeClassElements(s.F, a.elements), o.runClassFinishers(s.F, a.finishers); }
function _getDecoratorsApi() { _getDecoratorsApi = function _getDecoratorsApi() { return e; }; var e = { elementsDefinitionOrder: [["method"], ["field"]], initializeInstanceElements: function initializeInstanceElements(e, r) { ["method", "field"].forEach(function (t) { r.forEach(function (r) { r.kind === t && "own" === r.placement && this.defineClassElement(e, r); }, this); }, this); }, initializeClassElements: function initializeClassElements(e, r) { var t = e.prototype; ["method", "field"].forEach(function (i) { r.forEach(function (r) { var o = r.placement; if (r.kind === i && ("static" === o || "prototype" === o)) { var n = "static" === o ? e : t; this.defineClassElement(n, r); } }, this); }, this); }, defineClassElement: function defineClassElement(e, r) { var t = r.descriptor; if ("field" === r.kind) { var i = r.initializer; t = { enumerable: t.enumerable, writable: t.writable, configurable: t.configurable, value: void 0 === i ? void 0 : i.call(e) }; } Object.defineProperty(e, r.key, t); }, decorateClass: function decorateClass(e, r) { var t = [], i = [], o = { "static": [], prototype: [], own: [] }; if (e.forEach(function (e) { this.addElementPlacement(e, o); }, this), e.forEach(function (e) { if (!_hasDecorators(e)) return t.push(e); var r = this.decorateElement(e, o); t.push(r.element), t.push.apply(t, r.extras), i.push.apply(i, r.finishers); }, this), !r) return { elements: t, finishers: i }; var n = this.decorateConstructor(t, r); return i.push.apply(i, n.finishers), n.finishers = i, n; }, addElementPlacement: function addElementPlacement(e, r, t) { var i = r[e.placement]; if (!t && -1 !== i.indexOf(e.key)) throw new TypeError("Duplicated element (" + e.key + ")"); i.push(e.key); }, decorateElement: function decorateElement(e, r) { for (var t = [], i = [], o = e.decorators, n = o.length - 1; n >= 0; n--) { var s = r[e.placement]; s.splice(s.indexOf(e.key), 1); var a = this.fromElementDescriptor(e), l = this.toElementFinisherExtras((0, o[n])(a) || a); e = l.element, this.addElementPlacement(e, r), l.finisher && i.push(l.finisher); var c = l.extras; if (c) { for (var p = 0; p < c.length; p++) this.addElementPlacement(c[p], r); t.push.apply(t, c); } } return { element: e, finishers: i, extras: t }; }, decorateConstructor: function decorateConstructor(e, r) { for (var t = [], i = r.length - 1; i >= 0; i--) { var o = this.fromClassDescriptor(e), n = this.toClassDescriptor((0, r[i])(o) || o); if (void 0 !== n.finisher && t.push(n.finisher), void 0 !== n.elements) { e = n.elements; for (var s = 0; s < e.length - 1; s++) for (var a = s + 1; a < e.length; a++) if (e[s].key === e[a].key && e[s].placement === e[a].placement) throw new TypeError("Duplicated element (" + e[s].key + ")"); } } return { elements: e, finishers: t }; }, fromElementDescriptor: function fromElementDescriptor(e) { var r = { kind: e.kind, key: e.key, placement: e.placement, descriptor: e.descriptor }; return Object.defineProperty(r, Symbol.toStringTag, { value: "Descriptor", configurable: !0 }), "field" === e.kind && (r.initializer = e.initializer), r; }, toElementDescriptors: function toElementDescriptors(e) { if (void 0 !== e) return _toArray(e).map(function (e) { var r = this.toElementDescriptor(e); return this.disallowProperty(e, "finisher", "An element descriptor"), this.disallowProperty(e, "extras", "An element descriptor"), r; }, this); }, toElementDescriptor: function toElementDescriptor(e) { var r = e.kind + ""; if ("method" !== r && "field" !== r) throw new TypeError('An element descriptor\'s .kind property must be either "method" or "field", but a decorator created an element descriptor with .kind "' + r + '"'); var t = _toPropertyKey(e.key), i = e.placement + ""; if ("static" !== i && "prototype" !== i && "own" !== i) throw new TypeError('An element descriptor\'s .placement property must be one of "static", "prototype" or "own", but a decorator created an element descriptor with .placement "' + i + '"'); var o = e.descriptor; this.disallowProperty(e, "elements", "An element descriptor"); var n = { kind: r, key: t, placement: i, descriptor: Object.assign({}, o) }; return "field" !== r ? this.disallowProperty(e, "initializer", "A method descriptor") : (this.disallowProperty(o, "get", "The property descriptor of a field descriptor"), this.disallowProperty(o, "set", "The property descriptor of a field descriptor"), this.disallowProperty(o, "value", "The property descriptor of a field descriptor"), n.initializer = e.initializer), n; }, toElementFinisherExtras: function toElementFinisherExtras(e) { return { element: this.toElementDescriptor(e), finisher: _optionalCallableProperty(e, "finisher"), extras: this.toElementDescriptors(e.extras) }; }, fromClassDescriptor: function fromClassDescriptor(e) { var r = { kind: "class", elements: e.map(this.fromElementDescriptor, this) }; return Object.defineProperty(r, Symbol.toStringTag, { value: "Descriptor", configurable: !0 }), r; }, toClassDescriptor: function toClassDescriptor(e) { var r = e.kind + ""; if ("class" !== r) throw new TypeError('A class descriptor\'s .kind property must be "class", but a decorator created a class descriptor with .kind "' + r + '"'); this.disallowProperty(e, "key", "A class descriptor"), this.disallowProperty(e, "placement", "A class descriptor"), this.disallowProperty(e, "descriptor", "A class descriptor"), this.disallowProperty(e, "initializer", "A class descriptor"), this.disallowProperty(e, "extras", "A class descriptor"); var t = _optionalCallableProperty(e, "finisher"); return { elements: this.toElementDescriptors(e.elements), finisher: t }; }, runClassFinishers: function runClassFinishers(e, r) { for (var t = 0; t < r.length; t++) { var i = (0, r[t])(e); if (void 0 !== i) { if ("function" != typeof i) throw new TypeError("Finishers must return a constructor."); e = i; } } return e; }, disallowProperty: function disallowProperty(e, r, t) { if (void 0 !== e[r]) throw new TypeError(t + " can't have a ." + r + " property."); } }; return e; }
function _createElementDescriptor(e) { var r, t = _toPropertyKey(e.key); "method" === e.kind ? r = { value: e.value, writable: !0, configurable: !0, enumerable: !1 } : "get" === e.kind ? r = { get: e.value, configurable: !0, enumerable: !1 } : "set" === e.kind ? r = { set: e.value, configurable: !0, enumerable: !1 } : "field" === e.kind && (r = { configurable: !0, writable: !0, enumerable: !0 }); var i = { kind: "field" === e.kind ? "field" : "method", key: t, placement: e["static"] ? "static" : "field" === e.kind ? "own" : "prototype", descriptor: r }; return e.decorators && (i.decorators = e.decorators), "field" === e.kind && (i.initializer = e.value), i; }
function _coalesceGetterSetter(e, r) { void 0 !== e.descriptor.get ? r.descriptor.get = e.descriptor.get : r.descriptor.set = e.descriptor.set; }
function _coalesceClassElements(e) { for (var r = [], isSameElement = function isSameElement(e) { return "method" === e.kind && e.key === o.key && e.placement === o.placement; }, t = 0; t < e.length; t++) { var i, o = e[t]; if ("method" === o.kind && (i = r.find(isSameElement))) { if (_isDataDescriptor(o.descriptor) || _isDataDescriptor(i.descriptor)) { if (_hasDecorators(o) || _hasDecorators(i)) throw new ReferenceError("Duplicated methods (" + o.key + ") can't be decorated."); i.descriptor = o.descriptor; } else { if (_hasDecorators(o)) { if (_hasDecorators(i)) throw new ReferenceError("Decorators can't be placed on different accessors with for the same property (" + o.key + ")."); i.decorators = o.decorators; } _coalesceGetterSetter(o, i); } } else r.push(o); } return r; }
function _hasDecorators(e) { return e.decorators && e.decorators.length; }
function _isDataDescriptor(e) { return void 0 !== e && !(void 0 === e.value && void 0 === e.writable); }
function _optionalCallableProperty(e, r) { var t = e[r]; if (void 0 !== t && "function" != typeof t) throw new TypeError("Expected '" + r + "' to be a function"); return t; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _toArray(r) { return _arrayWithHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }





var FWFormulaEditorShowcase = _decorate(null, function (_initialize, _LitElement) {
  var FWFormulaEditorShowcase = /*#__PURE__*/function (_LitElement2) {
    function FWFormulaEditorShowcase() {
      var _this;
      _classCallCheck(this, FWFormulaEditorShowcase);
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      _this = _callSuper(this, FWFormulaEditorShowcase, [].concat(args));
      _initialize(_this);
      return _this;
    }
    _inherits(FWFormulaEditorShowcase, _LitElement2);
    return _createClass(FWFormulaEditorShowcase);
  }(_LitElement);
  return {
    F: FWFormulaEditorShowcase,
    d: [{
      kind: "field",
      decorators: [(0,lit_decorators_js__WEBPACK_IMPORTED_MODULE_1__.property)({
        type: Object
      })],
      key: "formula",
      value: function value() {
        return new _fw_components_formula_editor_types_index_js__WEBPACK_IMPORTED_MODULE_4__.Formula("Total Sales", "sales_in_quarter + additional_cost", 2);
      }
    }, {
      kind: "field",
      decorators: [(0,lit_decorators_js__WEBPACK_IMPORTED_MODULE_1__.state)()],
      key: "calculatedResult",
      value: void 0
    }, {
      kind: "field",
      decorators: [(0,lit_decorators_js__WEBPACK_IMPORTED_MODULE_1__.property)({
        type: Object
      })],
      key: "variables",
      value: function value() {
        return new Map([["sales_expense", 5000], ["sales_in_quarter", 30000], ["sales_cummulative", 70000], ["cummulative_sum", 80000], ["additional_cost", 2000]]);
      }
    }, {
      kind: "field",
      decorators: [(0,lit_decorators_js__WEBPACK_IMPORTED_MODULE_1__.query)("formula-editor")],
      key: "formulaEditor",
      value: void 0
    }, {
      kind: "field",
      "static": true,
      key: "styles",
      value: function value() {
        return (0,lit__WEBPACK_IMPORTED_MODULE_0__.css)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n    .container {\n      width: 95%;\n      margin: auto;\n      font-family: Arial, sans-serif;\n    }\n    .variables {\n      margin: 20px 0;\n      padding: 15px;\n      border-radius: 8px;\n      background-color: #f3f3f3;\n      box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);\n    }\n    .variable-list {\n      margin-top: 10px;\n    }\n    .variable-item {\n      display: flex;\n      justify-content: space-between;\n      padding: 5px 0;\n    }\n    .formula-builder-container {\n      width: 99%;\n      margin-top: 20px;\n    }\n\n    .metric-name-div {\n      margin: 10px 0;\n    }\n\n    .formula-label {\n      display: block;\n      margin: 10px 0;\n    }\n\n    #fw-formula-err {\n      border-radius: 4px;\n      color: var(--fe-err-text-color, #fc514f);\n      border: var(--fe-err-border-width, 2px) solid black;\n      /* border-top: 0px; */\n      background-color: var(--fe-background-color, #222222);\n      padding: 8px;\n      margin: 10px 0px 8px 0px;\n    }\n\n    .fw-formula-no-err {\n      color: #098668 !important;\n    }\n  "])));
      }
    }, {
      kind: "field",
      key: "handleCalculate",
      value: function value() {
        var _this2 = this;
        return function () {
          try {
            var formulaParser = new _fw_components_formula_editor_utils_parser_js__WEBPACK_IMPORTED_MODULE_3__.Parser(_this2.variables, 0);
            var calculatedResult = formulaParser.calculate(_this2.formula.formulaString);
            if (calculatedResult.errorString) {
              _this2.calculatedResult = "Error: Invalid formula";
              console.error("Formula calculation error:", calculatedResult.errorString);
            } else {
              _this2.calculatedResult = calculatedResult.result;
            }
          } catch (error) {
            console.error("Calculation failed:", error);
            _this2.calculatedResult = "Error: Calculation failed";
          }
        };
      }
    }, {
      kind: "field",
      key: "handleFormat",
      value: function value() {
        var _this3 = this;
        return function () {
          var _this3$formulaEditor;
          (_this3$formulaEditor = _this3.formulaEditor) === null || _this3$formulaEditor === void 0 || _this3$formulaEditor.formatFormula();
        };
      }
    }, {
      kind: "method",
      key: "render",
      value: function render() {
        var _this4 = this,
          _this$formula$error,
          _this$formula$error2;
        return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n      <div class=\"formula-editor-showcase\">\n        <div class=\"variables\">\n          <!-- Current Variables -->\n          <div class=\"variable-list\">\n            <h4>Current Variables</h4>\n            ", "\n          </div>\n        </div>\n\n        <div class=\"formula-builder-container\">\n          <div class=\"metric-name-div\">\n            <label for=\"metric-name-input\">Metric Name</label>\n            <input\n              id=\"metric-name-input\"\n              .value=", "\n              @input=", "\n            />\n          </div>\n          <label class=\"formula-label\">Formula</label>\n          <formula-editor\n            class=\"fe\"\n            minSuggestionLen=\"0\"\n            @fw-formula-content-changed=", "\n            .variables=", "\n            .formulaString=", "\n            .errorString=", "\n          >\n          </formula-editor>\n\n          <label class=\"formula-label\">Formula Output</label>\n          <div id=\"fw-formula-err\" class=\"", "\">", "</div>\n\n          ", "\n          <button class=\"primary-text-button\" @click=", ">Calculate</button>\n          <button class=\"primary-text-button\" @click=", ">Format</button>\n        </div>\n      </div>\n    "])), Array.from(this.variables.entries()).map(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 2),
            key = _ref2[0],
            value = _ref2[1];
          return (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n                <div class=\"variable-item\">\n                  <span>", "</span>\n                  <span>", "</span>\n                </div>\n              "])), key, value);
        }), this.formula.name, function (e) {
          _this4.formula.name = e.target.value;
          _this4.requestUpdate();
        }, function (e) {
          _this4.formula.formulaString = e.detail.formulaString;
          _this4.formula.error = e.detail.error;
          _this4.calculatedResult = 0;
          _this4.requestUpdate();
        }, this.variables, this.formula.formulaString, this.formula.error, (_this$formula$error = this.formula.error) !== null && _this$formula$error !== void 0 ? _this$formula$error : "fw-formula-no-err", (_this$formula$error2 = this.formula.error) !== null && _this$formula$error2 !== void 0 ? _this$formula$error2 : "".concat(this.formula.name, " = ").concat(this.formula.formulaString), this.calculatedResult ? (0,lit__WEBPACK_IMPORTED_MODULE_0__.html)(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["<p>Result: ", "</p>"])), this.calculatedResult) : "", this.handleCalculate, this.handleFormat);
      }
    }]
  };
}, lit__WEBPACK_IMPORTED_MODULE_0__.LitElement);
window.customElements.define("fw-formula-editor-showcase", FWFormulaEditorShowcase);
})();

/******/ })()
;
//# sourceMappingURL=main.js.map