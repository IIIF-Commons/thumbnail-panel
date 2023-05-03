import require$$0, { createContext, useContext, useState, useMemo, useEffect } from "react";
var jsxRuntimeExports = {};
var jsxRuntime = {
  get exports() {
    return jsxRuntimeExports;
  },
  set exports(v2) {
    jsxRuntimeExports = v2;
  }
};
var reactJsxRuntime_production_min = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var hasRequiredReactJsxRuntime_production_min;
function requireReactJsxRuntime_production_min() {
  if (hasRequiredReactJsxRuntime_production_min)
    return reactJsxRuntime_production_min;
  hasRequiredReactJsxRuntime_production_min = 1;
  var f = require$$0, k2 = Symbol.for("react.element"), l = Symbol.for("react.fragment"), m = Object.prototype.hasOwnProperty, n = f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, p2 = { key: true, ref: true, __self: true, __source: true };
  function q2(c, a, g) {
    var b2, d = {}, e = null, h2 = null;
    void 0 !== g && (e = "" + g);
    void 0 !== a.key && (e = "" + a.key);
    void 0 !== a.ref && (h2 = a.ref);
    for (b2 in a)
      m.call(a, b2) && !p2.hasOwnProperty(b2) && (d[b2] = a[b2]);
    if (c && c.defaultProps)
      for (b2 in a = c.defaultProps, a)
        void 0 === d[b2] && (d[b2] = a[b2]);
    return { $$typeof: k2, type: c, key: e, ref: h2, props: d, _owner: n.current };
  }
  reactJsxRuntime_production_min.Fragment = l;
  reactJsxRuntime_production_min.jsx = q2;
  reactJsxRuntime_production_min.jsxs = q2;
  return reactJsxRuntime_production_min;
}
var reactJsxRuntime_development = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var hasRequiredReactJsxRuntime_development;
function requireReactJsxRuntime_development() {
  if (hasRequiredReactJsxRuntime_development)
    return reactJsxRuntime_development;
  hasRequiredReactJsxRuntime_development = 1;
  if (process.env.NODE_ENV !== "production") {
    (function() {
      var React = require$$0;
      var REACT_ELEMENT_TYPE = Symbol.for("react.element");
      var REACT_PORTAL_TYPE = Symbol.for("react.portal");
      var REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
      var REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode");
      var REACT_PROFILER_TYPE = Symbol.for("react.profiler");
      var REACT_PROVIDER_TYPE = Symbol.for("react.provider");
      var REACT_CONTEXT_TYPE = Symbol.for("react.context");
      var REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref");
      var REACT_SUSPENSE_TYPE = Symbol.for("react.suspense");
      var REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list");
      var REACT_MEMO_TYPE = Symbol.for("react.memo");
      var REACT_LAZY_TYPE = Symbol.for("react.lazy");
      var REACT_OFFSCREEN_TYPE = Symbol.for("react.offscreen");
      var MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
      var FAUX_ITERATOR_SYMBOL = "@@iterator";
      function getIteratorFn(maybeIterable) {
        if (maybeIterable === null || typeof maybeIterable !== "object") {
          return null;
        }
        var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];
        if (typeof maybeIterator === "function") {
          return maybeIterator;
        }
        return null;
      }
      var ReactSharedInternals = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
      function error(format) {
        {
          {
            for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
              args[_key2 - 1] = arguments[_key2];
            }
            printWarning("error", format, args);
          }
        }
      }
      function printWarning(level, format, args) {
        {
          var ReactDebugCurrentFrame2 = ReactSharedInternals.ReactDebugCurrentFrame;
          var stack = ReactDebugCurrentFrame2.getStackAddendum();
          if (stack !== "") {
            format += "%s";
            args = args.concat([stack]);
          }
          var argsWithFormat = args.map(function(item) {
            return String(item);
          });
          argsWithFormat.unshift("Warning: " + format);
          Function.prototype.apply.call(console[level], console, argsWithFormat);
        }
      }
      var enableScopeAPI = false;
      var enableCacheElement = false;
      var enableTransitionTracing = false;
      var enableLegacyHidden = false;
      var enableDebugTracing = false;
      var REACT_MODULE_REFERENCE;
      {
        REACT_MODULE_REFERENCE = Symbol.for("react.module.reference");
      }
      function isValidElementType(type) {
        if (typeof type === "string" || typeof type === "function") {
          return true;
        }
        if (type === REACT_FRAGMENT_TYPE || type === REACT_PROFILER_TYPE || enableDebugTracing || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || enableLegacyHidden || type === REACT_OFFSCREEN_TYPE || enableScopeAPI || enableCacheElement || enableTransitionTracing) {
          return true;
        }
        if (typeof type === "object" && type !== null) {
          if (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || // This needs to include all possible module reference object
          // types supported by any Flight configuration anywhere since
          // we don't know which Flight build this will end up being used
          // with.
          type.$$typeof === REACT_MODULE_REFERENCE || type.getModuleId !== void 0) {
            return true;
          }
        }
        return false;
      }
      function getWrappedName(outerType, innerType, wrapperName) {
        var displayName = outerType.displayName;
        if (displayName) {
          return displayName;
        }
        var functionName = innerType.displayName || innerType.name || "";
        return functionName !== "" ? wrapperName + "(" + functionName + ")" : wrapperName;
      }
      function getContextName(type) {
        return type.displayName || "Context";
      }
      function getComponentNameFromType(type) {
        if (type == null) {
          return null;
        }
        {
          if (typeof type.tag === "number") {
            error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue.");
          }
        }
        if (typeof type === "function") {
          return type.displayName || type.name || null;
        }
        if (typeof type === "string") {
          return type;
        }
        switch (type) {
          case REACT_FRAGMENT_TYPE:
            return "Fragment";
          case REACT_PORTAL_TYPE:
            return "Portal";
          case REACT_PROFILER_TYPE:
            return "Profiler";
          case REACT_STRICT_MODE_TYPE:
            return "StrictMode";
          case REACT_SUSPENSE_TYPE:
            return "Suspense";
          case REACT_SUSPENSE_LIST_TYPE:
            return "SuspenseList";
        }
        if (typeof type === "object") {
          switch (type.$$typeof) {
            case REACT_CONTEXT_TYPE:
              var context = type;
              return getContextName(context) + ".Consumer";
            case REACT_PROVIDER_TYPE:
              var provider = type;
              return getContextName(provider._context) + ".Provider";
            case REACT_FORWARD_REF_TYPE:
              return getWrappedName(type, type.render, "ForwardRef");
            case REACT_MEMO_TYPE:
              var outerName = type.displayName || null;
              if (outerName !== null) {
                return outerName;
              }
              return getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE: {
              var lazyComponent = type;
              var payload = lazyComponent._payload;
              var init = lazyComponent._init;
              try {
                return getComponentNameFromType(init(payload));
              } catch (x2) {
                return null;
              }
            }
          }
        }
        return null;
      }
      var assign = Object.assign;
      var disabledDepth = 0;
      var prevLog;
      var prevInfo;
      var prevWarn;
      var prevError;
      var prevGroup;
      var prevGroupCollapsed;
      var prevGroupEnd;
      function disabledLog() {
      }
      disabledLog.__reactDisabledLog = true;
      function disableLogs() {
        {
          if (disabledDepth === 0) {
            prevLog = console.log;
            prevInfo = console.info;
            prevWarn = console.warn;
            prevError = console.error;
            prevGroup = console.group;
            prevGroupCollapsed = console.groupCollapsed;
            prevGroupEnd = console.groupEnd;
            var props = {
              configurable: true,
              enumerable: true,
              value: disabledLog,
              writable: true
            };
            Object.defineProperties(console, {
              info: props,
              log: props,
              warn: props,
              error: props,
              group: props,
              groupCollapsed: props,
              groupEnd: props
            });
          }
          disabledDepth++;
        }
      }
      function reenableLogs() {
        {
          disabledDepth--;
          if (disabledDepth === 0) {
            var props = {
              configurable: true,
              enumerable: true,
              writable: true
            };
            Object.defineProperties(console, {
              log: assign({}, props, {
                value: prevLog
              }),
              info: assign({}, props, {
                value: prevInfo
              }),
              warn: assign({}, props, {
                value: prevWarn
              }),
              error: assign({}, props, {
                value: prevError
              }),
              group: assign({}, props, {
                value: prevGroup
              }),
              groupCollapsed: assign({}, props, {
                value: prevGroupCollapsed
              }),
              groupEnd: assign({}, props, {
                value: prevGroupEnd
              })
            });
          }
          if (disabledDepth < 0) {
            error("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
          }
        }
      }
      var ReactCurrentDispatcher = ReactSharedInternals.ReactCurrentDispatcher;
      var prefix;
      function describeBuiltInComponentFrame(name, source, ownerFn) {
        {
          if (prefix === void 0) {
            try {
              throw Error();
            } catch (x2) {
              var match = x2.stack.trim().match(/\n( *(at )?)/);
              prefix = match && match[1] || "";
            }
          }
          return "\n" + prefix + name;
        }
      }
      var reentry = false;
      var componentFrameCache;
      {
        var PossiblyWeakMap = typeof WeakMap === "function" ? WeakMap : Map;
        componentFrameCache = new PossiblyWeakMap();
      }
      function describeNativeComponentFrame(fn, construct) {
        if (!fn || reentry) {
          return "";
        }
        {
          var frame = componentFrameCache.get(fn);
          if (frame !== void 0) {
            return frame;
          }
        }
        var control;
        reentry = true;
        var previousPrepareStackTrace = Error.prepareStackTrace;
        Error.prepareStackTrace = void 0;
        var previousDispatcher;
        {
          previousDispatcher = ReactCurrentDispatcher.current;
          ReactCurrentDispatcher.current = null;
          disableLogs();
        }
        try {
          if (construct) {
            var Fake = function() {
              throw Error();
            };
            Object.defineProperty(Fake.prototype, "props", {
              set: function() {
                throw Error();
              }
            });
            if (typeof Reflect === "object" && Reflect.construct) {
              try {
                Reflect.construct(Fake, []);
              } catch (x2) {
                control = x2;
              }
              Reflect.construct(fn, [], Fake);
            } else {
              try {
                Fake.call();
              } catch (x2) {
                control = x2;
              }
              fn.call(Fake.prototype);
            }
          } else {
            try {
              throw Error();
            } catch (x2) {
              control = x2;
            }
            fn();
          }
        } catch (sample) {
          if (sample && control && typeof sample.stack === "string") {
            var sampleLines = sample.stack.split("\n");
            var controlLines = control.stack.split("\n");
            var s = sampleLines.length - 1;
            var c = controlLines.length - 1;
            while (s >= 1 && c >= 0 && sampleLines[s] !== controlLines[c]) {
              c--;
            }
            for (; s >= 1 && c >= 0; s--, c--) {
              if (sampleLines[s] !== controlLines[c]) {
                if (s !== 1 || c !== 1) {
                  do {
                    s--;
                    c--;
                    if (c < 0 || sampleLines[s] !== controlLines[c]) {
                      var _frame = "\n" + sampleLines[s].replace(" at new ", " at ");
                      if (fn.displayName && _frame.includes("<anonymous>")) {
                        _frame = _frame.replace("<anonymous>", fn.displayName);
                      }
                      {
                        if (typeof fn === "function") {
                          componentFrameCache.set(fn, _frame);
                        }
                      }
                      return _frame;
                    }
                  } while (s >= 1 && c >= 0);
                }
                break;
              }
            }
          }
        } finally {
          reentry = false;
          {
            ReactCurrentDispatcher.current = previousDispatcher;
            reenableLogs();
          }
          Error.prepareStackTrace = previousPrepareStackTrace;
        }
        var name = fn ? fn.displayName || fn.name : "";
        var syntheticFrame = name ? describeBuiltInComponentFrame(name) : "";
        {
          if (typeof fn === "function") {
            componentFrameCache.set(fn, syntheticFrame);
          }
        }
        return syntheticFrame;
      }
      function describeFunctionComponentFrame(fn, source, ownerFn) {
        {
          return describeNativeComponentFrame(fn, false);
        }
      }
      function shouldConstruct(Component) {
        var prototype = Component.prototype;
        return !!(prototype && prototype.isReactComponent);
      }
      function describeUnknownElementTypeFrameInDEV(type, source, ownerFn) {
        if (type == null) {
          return "";
        }
        if (typeof type === "function") {
          {
            return describeNativeComponentFrame(type, shouldConstruct(type));
          }
        }
        if (typeof type === "string") {
          return describeBuiltInComponentFrame(type);
        }
        switch (type) {
          case REACT_SUSPENSE_TYPE:
            return describeBuiltInComponentFrame("Suspense");
          case REACT_SUSPENSE_LIST_TYPE:
            return describeBuiltInComponentFrame("SuspenseList");
        }
        if (typeof type === "object") {
          switch (type.$$typeof) {
            case REACT_FORWARD_REF_TYPE:
              return describeFunctionComponentFrame(type.render);
            case REACT_MEMO_TYPE:
              return describeUnknownElementTypeFrameInDEV(type.type, source, ownerFn);
            case REACT_LAZY_TYPE: {
              var lazyComponent = type;
              var payload = lazyComponent._payload;
              var init = lazyComponent._init;
              try {
                return describeUnknownElementTypeFrameInDEV(init(payload), source, ownerFn);
              } catch (x2) {
              }
            }
          }
        }
        return "";
      }
      var hasOwnProperty = Object.prototype.hasOwnProperty;
      var loggedTypeFailures = {};
      var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
      function setCurrentlyValidatingElement(element) {
        {
          if (element) {
            var owner = element._owner;
            var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
            ReactDebugCurrentFrame.setExtraStackFrame(stack);
          } else {
            ReactDebugCurrentFrame.setExtraStackFrame(null);
          }
        }
      }
      function checkPropTypes(typeSpecs, values, location, componentName, element) {
        {
          var has = Function.call.bind(hasOwnProperty);
          for (var typeSpecName in typeSpecs) {
            if (has(typeSpecs, typeSpecName)) {
              var error$1 = void 0;
              try {
                if (typeof typeSpecs[typeSpecName] !== "function") {
                  var err = Error((componentName || "React class") + ": " + location + " type `" + typeSpecName + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof typeSpecs[typeSpecName] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                  err.name = "Invariant Violation";
                  throw err;
                }
                error$1 = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
              } catch (ex) {
                error$1 = ex;
              }
              if (error$1 && !(error$1 instanceof Error)) {
                setCurrentlyValidatingElement(element);
                error("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", componentName || "React class", location, typeSpecName, typeof error$1);
                setCurrentlyValidatingElement(null);
              }
              if (error$1 instanceof Error && !(error$1.message in loggedTypeFailures)) {
                loggedTypeFailures[error$1.message] = true;
                setCurrentlyValidatingElement(element);
                error("Failed %s type: %s", location, error$1.message);
                setCurrentlyValidatingElement(null);
              }
            }
          }
        }
      }
      var isArrayImpl = Array.isArray;
      function isArray(a) {
        return isArrayImpl(a);
      }
      function typeName(value) {
        {
          var hasToStringTag = typeof Symbol === "function" && Symbol.toStringTag;
          var type = hasToStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
          return type;
        }
      }
      function willCoercionThrow(value) {
        {
          try {
            testStringCoercion(value);
            return false;
          } catch (e) {
            return true;
          }
        }
      }
      function testStringCoercion(value) {
        return "" + value;
      }
      function checkKeyStringCoercion(value) {
        {
          if (willCoercionThrow(value)) {
            error("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", typeName(value));
            return testStringCoercion(value);
          }
        }
      }
      var ReactCurrentOwner = ReactSharedInternals.ReactCurrentOwner;
      var RESERVED_PROPS = {
        key: true,
        ref: true,
        __self: true,
        __source: true
      };
      var specialPropKeyWarningShown;
      var specialPropRefWarningShown;
      var didWarnAboutStringRefs;
      {
        didWarnAboutStringRefs = {};
      }
      function hasValidRef(config) {
        {
          if (hasOwnProperty.call(config, "ref")) {
            var getter = Object.getOwnPropertyDescriptor(config, "ref").get;
            if (getter && getter.isReactWarning) {
              return false;
            }
          }
        }
        return config.ref !== void 0;
      }
      function hasValidKey(config) {
        {
          if (hasOwnProperty.call(config, "key")) {
            var getter = Object.getOwnPropertyDescriptor(config, "key").get;
            if (getter && getter.isReactWarning) {
              return false;
            }
          }
        }
        return config.key !== void 0;
      }
      function warnIfStringRefCannotBeAutoConverted(config, self2) {
        {
          if (typeof config.ref === "string" && ReactCurrentOwner.current && self2 && ReactCurrentOwner.current.stateNode !== self2) {
            var componentName = getComponentNameFromType(ReactCurrentOwner.current.type);
            if (!didWarnAboutStringRefs[componentName]) {
              error('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', getComponentNameFromType(ReactCurrentOwner.current.type), config.ref);
              didWarnAboutStringRefs[componentName] = true;
            }
          }
        }
      }
      function defineKeyPropWarningGetter(props, displayName) {
        {
          var warnAboutAccessingKey = function() {
            if (!specialPropKeyWarningShown) {
              specialPropKeyWarningShown = true;
              error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", displayName);
            }
          };
          warnAboutAccessingKey.isReactWarning = true;
          Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: true
          });
        }
      }
      function defineRefPropWarningGetter(props, displayName) {
        {
          var warnAboutAccessingRef = function() {
            if (!specialPropRefWarningShown) {
              specialPropRefWarningShown = true;
              error("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", displayName);
            }
          };
          warnAboutAccessingRef.isReactWarning = true;
          Object.defineProperty(props, "ref", {
            get: warnAboutAccessingRef,
            configurable: true
          });
        }
      }
      var ReactElement = function(type, key, ref, self2, source, owner, props) {
        var element = {
          // This tag allows us to uniquely identify this as a React Element
          $$typeof: REACT_ELEMENT_TYPE,
          // Built-in properties that belong on the element
          type,
          key,
          ref,
          props,
          // Record the component responsible for creating this element.
          _owner: owner
        };
        {
          element._store = {};
          Object.defineProperty(element._store, "validated", {
            configurable: false,
            enumerable: false,
            writable: true,
            value: false
          });
          Object.defineProperty(element, "_self", {
            configurable: false,
            enumerable: false,
            writable: false,
            value: self2
          });
          Object.defineProperty(element, "_source", {
            configurable: false,
            enumerable: false,
            writable: false,
            value: source
          });
          if (Object.freeze) {
            Object.freeze(element.props);
            Object.freeze(element);
          }
        }
        return element;
      };
      function jsxDEV(type, config, maybeKey, source, self2) {
        {
          var propName;
          var props = {};
          var key = null;
          var ref = null;
          if (maybeKey !== void 0) {
            {
              checkKeyStringCoercion(maybeKey);
            }
            key = "" + maybeKey;
          }
          if (hasValidKey(config)) {
            {
              checkKeyStringCoercion(config.key);
            }
            key = "" + config.key;
          }
          if (hasValidRef(config)) {
            ref = config.ref;
            warnIfStringRefCannotBeAutoConverted(config, self2);
          }
          for (propName in config) {
            if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
              props[propName] = config[propName];
            }
          }
          if (type && type.defaultProps) {
            var defaultProps = type.defaultProps;
            for (propName in defaultProps) {
              if (props[propName] === void 0) {
                props[propName] = defaultProps[propName];
              }
            }
          }
          if (key || ref) {
            var displayName = typeof type === "function" ? type.displayName || type.name || "Unknown" : type;
            if (key) {
              defineKeyPropWarningGetter(props, displayName);
            }
            if (ref) {
              defineRefPropWarningGetter(props, displayName);
            }
          }
          return ReactElement(type, key, ref, self2, source, ReactCurrentOwner.current, props);
        }
      }
      var ReactCurrentOwner$1 = ReactSharedInternals.ReactCurrentOwner;
      var ReactDebugCurrentFrame$1 = ReactSharedInternals.ReactDebugCurrentFrame;
      function setCurrentlyValidatingElement$1(element) {
        {
          if (element) {
            var owner = element._owner;
            var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
            ReactDebugCurrentFrame$1.setExtraStackFrame(stack);
          } else {
            ReactDebugCurrentFrame$1.setExtraStackFrame(null);
          }
        }
      }
      var propTypesMisspellWarningShown;
      {
        propTypesMisspellWarningShown = false;
      }
      function isValidElement(object) {
        {
          return typeof object === "object" && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
        }
      }
      function getDeclarationErrorAddendum() {
        {
          if (ReactCurrentOwner$1.current) {
            var name = getComponentNameFromType(ReactCurrentOwner$1.current.type);
            if (name) {
              return "\n\nCheck the render method of `" + name + "`.";
            }
          }
          return "";
        }
      }
      function getSourceInfoErrorAddendum(source) {
        {
          if (source !== void 0) {
            var fileName = source.fileName.replace(/^.*[\\\/]/, "");
            var lineNumber = source.lineNumber;
            return "\n\nCheck your code at " + fileName + ":" + lineNumber + ".";
          }
          return "";
        }
      }
      var ownerHasKeyUseWarning = {};
      function getCurrentComponentErrorInfo(parentType) {
        {
          var info = getDeclarationErrorAddendum();
          if (!info) {
            var parentName = typeof parentType === "string" ? parentType : parentType.displayName || parentType.name;
            if (parentName) {
              info = "\n\nCheck the top-level render call using <" + parentName + ">.";
            }
          }
          return info;
        }
      }
      function validateExplicitKey(element, parentType) {
        {
          if (!element._store || element._store.validated || element.key != null) {
            return;
          }
          element._store.validated = true;
          var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);
          if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
            return;
          }
          ownerHasKeyUseWarning[currentComponentErrorInfo] = true;
          var childOwner = "";
          if (element && element._owner && element._owner !== ReactCurrentOwner$1.current) {
            childOwner = " It was passed a child from " + getComponentNameFromType(element._owner.type) + ".";
          }
          setCurrentlyValidatingElement$1(element);
          error('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', currentComponentErrorInfo, childOwner);
          setCurrentlyValidatingElement$1(null);
        }
      }
      function validateChildKeys(node, parentType) {
        {
          if (typeof node !== "object") {
            return;
          }
          if (isArray(node)) {
            for (var i = 0; i < node.length; i++) {
              var child = node[i];
              if (isValidElement(child)) {
                validateExplicitKey(child, parentType);
              }
            }
          } else if (isValidElement(node)) {
            if (node._store) {
              node._store.validated = true;
            }
          } else if (node) {
            var iteratorFn = getIteratorFn(node);
            if (typeof iteratorFn === "function") {
              if (iteratorFn !== node.entries) {
                var iterator = iteratorFn.call(node);
                var step;
                while (!(step = iterator.next()).done) {
                  if (isValidElement(step.value)) {
                    validateExplicitKey(step.value, parentType);
                  }
                }
              }
            }
          }
        }
      }
      function validatePropTypes(element) {
        {
          var type = element.type;
          if (type === null || type === void 0 || typeof type === "string") {
            return;
          }
          var propTypes;
          if (typeof type === "function") {
            propTypes = type.propTypes;
          } else if (typeof type === "object" && (type.$$typeof === REACT_FORWARD_REF_TYPE || // Note: Memo only checks outer props here.
          // Inner props are checked in the reconciler.
          type.$$typeof === REACT_MEMO_TYPE)) {
            propTypes = type.propTypes;
          } else {
            return;
          }
          if (propTypes) {
            var name = getComponentNameFromType(type);
            checkPropTypes(propTypes, element.props, "prop", name, element);
          } else if (type.PropTypes !== void 0 && !propTypesMisspellWarningShown) {
            propTypesMisspellWarningShown = true;
            var _name = getComponentNameFromType(type);
            error("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", _name || "Unknown");
          }
          if (typeof type.getDefaultProps === "function" && !type.getDefaultProps.isReactClassApproved) {
            error("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
          }
        }
      }
      function validateFragmentProps(fragment) {
        {
          var keys = Object.keys(fragment.props);
          for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            if (key !== "children" && key !== "key") {
              setCurrentlyValidatingElement$1(fragment);
              error("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", key);
              setCurrentlyValidatingElement$1(null);
              break;
            }
          }
          if (fragment.ref !== null) {
            setCurrentlyValidatingElement$1(fragment);
            error("Invalid attribute `ref` supplied to `React.Fragment`.");
            setCurrentlyValidatingElement$1(null);
          }
        }
      }
      function jsxWithValidation(type, props, key, isStaticChildren, source, self2) {
        {
          var validType = isValidElementType(type);
          if (!validType) {
            var info = "";
            if (type === void 0 || typeof type === "object" && type !== null && Object.keys(type).length === 0) {
              info += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.";
            }
            var sourceInfo = getSourceInfoErrorAddendum(source);
            if (sourceInfo) {
              info += sourceInfo;
            } else {
              info += getDeclarationErrorAddendum();
            }
            var typeString;
            if (type === null) {
              typeString = "null";
            } else if (isArray(type)) {
              typeString = "array";
            } else if (type !== void 0 && type.$$typeof === REACT_ELEMENT_TYPE) {
              typeString = "<" + (getComponentNameFromType(type.type) || "Unknown") + " />";
              info = " Did you accidentally export a JSX literal instead of a component?";
            } else {
              typeString = typeof type;
            }
            error("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", typeString, info);
          }
          var element = jsxDEV(type, props, key, source, self2);
          if (element == null) {
            return element;
          }
          if (validType) {
            var children = props.children;
            if (children !== void 0) {
              if (isStaticChildren) {
                if (isArray(children)) {
                  for (var i = 0; i < children.length; i++) {
                    validateChildKeys(children[i], type);
                  }
                  if (Object.freeze) {
                    Object.freeze(children);
                  }
                } else {
                  error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
                }
              } else {
                validateChildKeys(children, type);
              }
            }
          }
          if (type === REACT_FRAGMENT_TYPE) {
            validateFragmentProps(element);
          } else {
            validatePropTypes(element);
          }
          return element;
        }
      }
      function jsxWithValidationStatic(type, props, key) {
        {
          return jsxWithValidation(type, props, key, true);
        }
      }
      function jsxWithValidationDynamic(type, props, key) {
        {
          return jsxWithValidation(type, props, key, false);
        }
      }
      var jsx2 = jsxWithValidationDynamic;
      var jsxs2 = jsxWithValidationStatic;
      reactJsxRuntime_development.Fragment = REACT_FRAGMENT_TYPE;
      reactJsxRuntime_development.jsx = jsx2;
      reactJsxRuntime_development.jsxs = jsxs2;
    })();
  }
  return reactJsxRuntime_development;
}
(function(module) {
  if (process.env.NODE_ENV === "production") {
    module.exports = requireReactJsxRuntime_production_min();
  } else {
    module.exports = requireReactJsxRuntime_development();
  }
})(jsxRuntime);
const Fragment = jsxRuntimeExports.Fragment;
const jsx = jsxRuntimeExports.jsx;
const jsxs = jsxRuntimeExports.jsxs;
const metaState$1 = {};
const compatVault$1 = {
  get(nonRef) {
    return nonRef;
  },
  setMetaValue([id, meta, key], value) {
    const oldValue = compatVault$1.getResourceMeta(id, meta);
    const oldValueItem = oldValue ? oldValue[key] : void 0;
    const newValue = typeof value === "function" ? value(oldValueItem) : value;
    metaState$1[id] = {
      ...metaState$1[id] || {},
      [meta]: {
        ...(metaState$1[id] || {})[meta] || {},
        [key]: newValue
      }
    };
  },
  getResourceMeta: (resource, metaKey) => {
    const resourceMeta = metaState$1[resource];
    if (!resourceMeta) {
      return void 0;
    }
    if (!metaKey) {
      return resourceMeta;
    }
    return resourceMeta[metaKey];
  }
};
function p(i) {
  return i.endsWith("info.json") ? i : i.endsWith("/") ? `${i}info.json` : `${i}/info.json`;
}
const te = "http://library.stanford.edu/iiif/image-api/compliance.html#level0", z = "http://library.stanford.edu/iiif/image-api/compliance.html#level1", A = "http://library.stanford.edu/iiif/image-api/compliance.html#level2", ne = "http://library.stanford.edu/iiif/image-api/conformance.html#level0", E = "http://library.stanford.edu/iiif/image-api/conformance.html#level1", b = "http://library.stanford.edu/iiif/image-api/conformance.html#level2", re = "http://library.stanford.edu/iiif/image-api/1.1/compliance.html#level0", L = "http://library.stanford.edu/iiif/image-api/1.1/compliance.html#level1", M = "http://library.stanford.edu/iiif/image-api/1.1/compliance.html#level2", se = "http://library.stanford.edu/iiif/image-api/1.1/conformance.html#level0", W = "http://library.stanford.edu/iiif/image-api/1.1/conformance.html#level1", j = "http://library.stanford.edu/iiif/image-api/1.1/conformance.html#level2", ae = "http://iiif.io/api/image/1/level0.json", oe = "http://iiif.io/api/image/1/profiles/level0.json", $ = "http://iiif.io/api/image/1/level1.json", C = "http://iiif.io/api/image/1/profiles/level1.json", P = "http://iiif.io/api/image/1/level2.json", B = "http://iiif.io/api/image/1/profiles/level2.json", fe = "http://iiif.io/api/image/2/level0.json", le = "http://iiif.io/api/image/2/profiles/level0.json", N = "http://iiif.io/api/image/2/level1.json", R = "http://iiif.io/api/image/2/profiles/level1.json", H = "http://iiif.io/api/image/2/level2.json", T = "http://iiif.io/api/image/2/profiles/level2.json", he = "level0", G = "level1", k = "level2", ue = "http://iiif.io/api/image/2/level0", Q = "http://iiif.io/api/image/2/level1", V = "http://iiif.io/api/image/2/level2", D = [V, A, b, M, j, P, B, H, T, k], U = [...D, Q, z, E, L, W, $, C, N, R, G], J = [ue, Q, V, te, z, A, ne, E, b, re, L, M, se, W, j, ae, oe, $, C, P, B, fe, le, N, R, H, T, he, G, k], ce = { extraFormats: ["jpg"], extraQualities: ["default"], extraFeatures: ["sizeByWhListed"] }, de = { extraFormats: ["jpg"], extraQualities: ["default"], extraFeatures: ["baseUriRedirect", "cors", "jsonldMediaType", "regionByPx", "regionSquare", "sizeByWhListed", "sizeByH", "sizeByW", "sizeByWh"] }, ge = { extraFormats: ["jpg", "png"], extraQualities: ["default"], extraFeatures: ["baseUriRedirect", "cors", "jsonldMediaType", "regionByPct", "regionByPx", "regionSquare", "rotationBy90s", "sizeByWhListed", "sizeByConfinedWh", "sizeByH", "sizeByPct", "sizeByW", "sizeByWh"] };
function pe(i) {
  return D.indexOf(i) !== -1 ? ge : U.indexOf(i) !== -1 ? de : ce;
}
function K(i) {
  const e = i ? Array.isArray(i.profile) ? i.profile : [i.profile] : [], t = { extraQualities: [], extraFormats: [], extraFeatures: [] };
  for (let n of e)
    if (typeof n == "string" && (n = pe(n)), !!n) {
      if (n.formats)
        for (const r of n.formats)
          t.extraFormats.indexOf(r) === -1 && t.extraFormats.push(r);
      if (n.qualities)
        for (const r of n.qualities)
          t.extraQualities.indexOf(r) === -1 && t.extraQualities.push(r);
      if (n.supports)
        for (const r of n.supports)
          t.extraFeatures.indexOf(r) === -1 && t.extraFeatures.push(r);
      if (n.maxHeight && (t.maxHeight = n.maxHeight), n.maxWidth && (t.maxWidth = n.maxWidth), n.maxArea && (t.maxArea = n.maxArea), n.extraFormats)
        for (const r of n.extraFormats)
          t.extraFormats.indexOf(r) === -1 && t.extraFormats.push(r);
      if (n.extraQualities)
        for (const r of n.extraQualities)
          t.extraQualities.indexOf(r) === -1 && t.extraQualities.push(r);
      if (n.extraFeatures)
        for (const r of n.extraFeatures)
          t.extraFeatures.indexOf(r) === -1 && t.extraFeatures.push(r);
      n.maxHeight && (t.maxHeight = n.maxHeight), n.maxWidth && (t.maxWidth = n.maxWidth), n.maxArea && (t.maxArea = n.maxArea);
    }
  if (i.extraFormats)
    for (const n of i.extraFormats)
      t.extraFormats.indexOf(n) === -1 && t.extraFormats.push(n);
  if (i.extraFeatures)
    for (const n of i.extraFeatures)
      t.extraFeatures.indexOf(n) === -1 && t.extraFeatures.push(n);
  if (i.extraQualities)
    for (const n of i.extraQualities)
      t.extraQualities.indexOf(n) === -1 && t.extraQualities.push(n);
  return t;
}
function me(i) {
  try {
    if (i === "full")
      return { full: true };
    if (i === "square")
      return { square: true };
    const e = i.startsWith("pct:"), n = i.substr(e ? 4 : 0).split(",").map((r) => parseFloat(r));
    return { x: n[0], y: n[1], w: n[2], h: n[3], percent: e };
  } catch {
    throw new Error("Expected 'full', 'square' or 'x,y,w,h'. Found " + i);
  }
}
function xe(i) {
  const e = { upscaled: false, max: false, confined: false };
  if (i[0] === "^" && (e.upscaled = true, i = i.slice(1)), i === "max" || i === "full")
    return e.max = true, e.serialiseAsFull = i === "full", e;
  if (i[0] === "!" && (e.confined = true, i = i.slice(1)), i[0] === "p")
    return e.percentScale = parseFloat(i.slice(4)), e;
  const t = i.split(",").map((n) => n.trim());
  return t.length && (t[0] !== "" && (e.width = parseInt(t[0], 10)), t[1] !== "" ? (e.height = parseInt(t[1], 10), e.version = 2) : e.version = 3), e;
}
function Ie(i) {
  const e = { angle: 0 };
  if (i[0] === "!" && (e.mirror = true, i = i.substr(1)), e.angle = parseFloat(i) % 360, Number.isNaN(e.angle))
    throw new Error(`Invalid rotation ${i}`);
  return e;
}
function ye(i, e = "") {
  const t = i.match(/^(([a-zA-Z]+):\/\/([^/]+))?((.*)+)/);
  if (!t)
    throw new Error(`Invalid or unknown input ${i}`);
  const n = t[2], r = t[3];
  let s = t[4];
  if (s[0] === "/" && (s = s.substr(1)), e.length > 0) {
    if (e[0] === "/" && (e = e.substr(1)), e !== s.substr(0, e.length))
      throw new Error(`Path does not start with prefix (path: ${s}, prefix: ${e})`);
    s = s.substr(e.length);
  }
  return { scheme: n, server: r, path: s, prefix: e };
}
function _e(i, e = "") {
  const { path: t, scheme: n, server: r, prefix: s } = ye(i, e), a = t.split("/").reverse(), [o, f, u, l, ...d] = a, g = d.reverse().filter(Boolean).join("/");
  if (a.length === 1 || o === "")
    return { type: "base", scheme: n, server: r, prefix: s, identifier: g };
  if (o === "info.json") {
    const [, ...c] = a;
    return { type: "info", scheme: n, server: r, prefix: s, identifier: c.reverse().filter(Boolean).join("/") };
  }
  const m = o.split(".");
  return { type: "image", scheme: n, server: r, prefix: s, identifier: g, originalPath: t, region: me(l), size: xe(u), rotation: Ie(f), quality: m[0], format: m[1] };
}
function we(i) {
  const e = _e(p(i.id));
  if (e.type !== "info")
    throw new Error("Invalid service URL");
  const t = K(i);
  return { identifier: e.identifier, originalPath: "", server: e.server, prefix: e.prefix, scheme: e.scheme, type: "image", quality: t.extraQualities.indexOf("default") === -1 ? t.extraQualities[0] : "default", region: { full: true }, size: { max: true, upscaled: false, confined: false }, format: "jpg", rotation: { angle: 0 } };
}
function Se(i, e, t) {
  const n = t.length, r = [];
  for (let s = 0; s < n; s++) {
    const o = t[s].width;
    r.push(i / o);
  }
  return r;
}
function ve(i, e, t) {
  const n = t.length, r = [];
  for (let s = 0; s < n; s++) {
    const a = t[s];
    r.push({ width: Math.floor(i / a), height: Math.floor(e / a) });
  }
  return r;
}
function h(i) {
  if (i["@id"])
    return i["@id"];
  if (i.id)
    return i.id;
}
function w(i) {
  if (!i || !i.profile || !h(i))
    return false;
  const e = Array.isArray(i.profile) ? i.profile : [i.profile];
  for (const t of e)
    if (typeof t == "string" && J.indexOf(t) !== -1)
      return true;
  return false;
}
function Fe(i) {
  if (!w(i))
    return false;
  const e = Array.isArray(i.profile) ? i.profile : [i.profile];
  for (const t of e)
    if (typeof t == "string") {
      if (U.indexOf(t) !== -1)
        return true;
    } else {
      const n = [...t.supports || [], ...t.extraFeatures || []];
      if (n.indexOf("regionByPx") !== -1 && (n.indexOf("sizeByW") !== -1 || n.indexOf("sizeByWh") !== -1))
        return true;
    }
  return false;
}
function v(i, e) {
  if (e && e.profile) {
    const t = e.profile;
    if (t) {
      const n = Array.isArray(t) ? t : [t];
      return n.includes(`level${i}`) || n.includes(`http://iiif.io/api/image/2/level${i}.json`) || n.includes(`http://iiif.io/api/image/1/level${i}.json`) || n.includes(`http://iiif.io/api/image/1/profiles/level${i}.json`);
    }
  }
  return false;
}
function F(i) {
  return w(i) ? v(0, i) ? 0 : v(1, i) ? 1 : v(2, i) ? 2 : null : null;
}
function X(i) {
  return (i["@context"] ? Array.isArray(i["@context"]) ? i["@context"] : [i["@context"]] : []).indexOf("http://iiif.io/api/image/3/context.json") !== -1;
}
function Oe(i) {
  if (!Fe(i))
    return [];
  const e = [], t = Array.isArray(i.profile) ? i.profile : [i.profile], n = t.length;
  for (let r = 0; r < n; r++) {
    const s = t[r];
    if (typeof s != "string" && (s.maxHeight || s.maxWidth))
      return [{ id: h(i), type: "variable", minWidth: 0, minHeight: 0, maxHeight: s.maxHeight || s.maxWidth, maxWidth: s.maxWidth || s.maxHeight, level: F(i), version: i["@context"] === "http://iiif.io/api/image/3/context.json" ? 3 : 2 }];
  }
  if (i.tiles) {
    const r = i.tiles.length;
    for (let s = 0; s < r; s++) {
      const a = i.tiles[s];
      (a.height || a.width) && e.push({ id: h(i), type: "variable", minHeight: 0, minWidth: 0, maxHeight: a.height || a.width, maxWidth: a.width, level: F(i), version: X(i) ? 3 : 2 });
    }
  }
  return e;
}
function Y(i) {
  const e = /^.*\/(full)\/(((\d+),(\d+)?)|max)\/(\d+)\/default\.(jpg|png|jpeg)$/, t = i.match(e);
  if (t) {
    const n = t[1], r = parseInt(t[4], 10), s = parseInt(t[5], 10), a = t[7];
    if ((n === "max" || n === "full") && r && s && a)
      return { type: "fixed", id: i, height: s, width: r };
  }
  return { type: "unknown", id: i };
}
function ze(i) {
  if (i["@type"])
    return i["@type"];
  if (i.type)
    return i.type;
}
function Ae(i) {
  if (typeof i == "string")
    return Y(i);
  const e = ze(i);
  if (e !== "Image" && e !== "sc:Image")
    return null;
  const t = i, n = h(t);
  return n ? n && t.width && t.height ? { id: n, type: "fixed", width: t.width, height: t.height, unsafe: true } : Y(n) : null;
}
function Ee(i) {
  return w(i) ? (i && i.sizes ? i.sizes : []).map((e) => ({ id: h(i), type: "fixed-service", height: e.height, width: e.width, level: F(i), version: X(i) ? 3 : 2 })) : [];
}
function q(i) {
  const e = [], t = i.length;
  for (let n = 0; n < t; n++) {
    const r = Ee(i[n]);
    r.length && e.push(...r);
    const s = Oe(i[n]);
    s.length && e.push(...s);
  }
  return e;
}
function ee(i) {
  const e = i.service ? Array.isArray(i.service) ? i.service : [i.service] : [], t = e.length, n = [];
  for (let r = 0; r < t; r++)
    w(e[r]) && n.push(e[r]);
  return n;
}
function be(i, e = true, t) {
  const n = [], r = Ae(i);
  if (r === null)
    return n;
  const s = i;
  if (n.push(r), e && s.width && s.height) {
    const a = [], o = ee(s);
    for (const f of o) {
      const u = { id: h(f), width: s.width, height: s.height };
      if (t.canLoadSync(u)) {
        const l = t.loadServiceSync(u);
        l && (l.height || (l.height = s.height), l.width || (l.width = s.width), a.push(...q([l])));
      }
    }
    if (a.length)
      return n.push(...a), n;
  }
  return s.service && n.push(...q(s.service)), n;
}
function Le({ x: i = 0, y: e = 0, w: t, h: n, full: r, square: s, percent: a }) {
  if (r)
    return "full";
  if (s)
    return "square";
  if (typeof t > "u" || typeof n > "u")
    throw new Error("RegionParameter: invalid region");
  const o = `${i},${e},${t},${n}`;
  return a ? `pct:${o}` : o;
}
function Me({ max: i, percentScale: e, upscaled: t, confined: n, width: r, height: s, serialiseAsFull: a, version: o }) {
  const f = [];
  return t && f.push("^"), i ? (f.push(a ? "full" : "max"), f.join("")) : (n && f.push("!"), e && f.push(`pct:${e}`), r && f.push(`${r}`), f.push(","), s && o === 3 && f.push(`${s}`), f.join(""));
}
function We(i) {
  return `${i.mirror ? "!" : ""}${(i.angle || 0) % 360}`;
}
var Ve = Object.defineProperty, De = Object.defineProperties, Ue = Object.getOwnPropertyDescriptors, je = Object.getOwnPropertySymbols, Je = Object.prototype.hasOwnProperty, Ze = Object.prototype.propertyIsEnumerable, $e = (i, e, t) => e in i ? Ve(i, e, { enumerable: true, configurable: true, writable: true, value: t }) : i[e] = t, x = (i, e) => {
  for (var t in e || (e = {}))
    Je.call(e, t) && $e(i, t, e[t]);
  if (je)
    for (var t of je(e))
      Ze.call(e, t) && $e(i, t, e[t]);
  return i;
}, I = (i, e) => De(i, Ue(e));
function Ce(i, e) {
  const t = i.prefix.startsWith("/") ? i.prefix.substr(1) : i.prefix, n = `${i.scheme}://${i.server}/${t ? `${t}/` : ""}${i.identifier}`;
  if (i.type === "base")
    return n;
  if (i.type === "info")
    return `${n}/info.json`;
  let { size: r } = i;
  const { region: s, rotation: a, format: o, quality: f } = i;
  if (e) {
    const u = e["@context"] ? Array.isArray(e["@context"]) ? e["@context"] : [e["@context"]] : [], l = u.indexOf("http://iiif.io/api/image/2/context.json") !== -1, d = u.indexOf("http://iiif.io/api/image/3/context.json") !== -1;
    if ((r.width === e.width && !r.height || r.height === e.height && !r.width || r.width === e.width && r.height === e.height) && (r = I(x({}, r), { max: true })), l && (r.max && !r.serialiseAsFull && (r = I(x({}, r), { serialiseAsFull: true })), !r.max && r.width && r.height && (r = I(x({}, r), { height: void 0 })), r = I(x({}, r), { version: 2 })), d) {
      if (r.max && r.serialiseAsFull && (r = I(x({}, r), { serialiseAsFull: false })), r.width && !r.height && e.width && e.height) {
        const g = e.height / e.width;
        r = I(x({}, r), { height: Math.ceil(r.width * g) });
      }
      r = I(x({}, r), { version: 3 });
    }
  }
  return [n, Le(s), Me(r), We(a), `${f}.${o}`].filter(Boolean).join("/");
}
function O(i, e, t) {
  const n = we({ "@context": i.version === 3 ? "http://iiif.io/api/image/3/context.json" : "http://iiif.io/api/image/2/context.json", id: p(h(i)), profile: i.level === null || typeof i.level > "u" ? "level0" : `level${i.level}}`, type: i.version === 3 ? "ImageService3" : "ImageService2" });
  if (n.type !== "image")
    throw new Error("Invalid service");
  return n.size.max = false, n.size.width = e, n.size.height = t, { id: Ce(n), type: "fixed", width: e, height: t || i.height / (i.width || 1) * e, unsafe: i.width > e };
}
function y(i) {
  const e = i.replace(/(https?:\/\/)?(www.)?/i, "");
  return e.indexOf("/") !== -1 ? e.split("/")[0] : e;
}
function Pe(i, e, t) {
  const n = i.width ? i.width : i.maxWidth;
  return t.height <= i.maxHeight && t.width <= i.maxWidth && t.height >= i.minHeight && t.width >= i.minWidth && (!e || Math.abs(t.width - n) < Math.abs(e.width - n));
}
function Be(i, e) {
  const t = [], n = Object.assign({ unsafeImageService: false, atAnyCost: true, fallback: true, minHeight: 64, minWidth: 64, maxHeight: 1 / 0, maxWidth: 1 / 0, returnAllOptions: false, preferFixedSize: false, allowUnsafe: false, explain: false, height: 0, width: 0 }, i), r = (l, d = 0) => n.explain ? t.push(new Array(d).fill(0).map((g) => "    ").join("") + l().trim()) : void 0, s = [], a = [];
  let o = null;
  r(() => `Using configuration: ${JSON.stringify(n, null, 2)}`);
  const f = (l, d) => {
    if (r(() => "Swapping choice", 3), Pe(n, d, l)) {
      if (n.preferFixedSize && l.unsafe) {
        r(() => `We found an image that was marked as unsafe, but it was the best size. (${l.id})`, 4), a.push(l);
        return;
      }
      n.returnAllOptions && d && a.push(d), r(() => `We found a new image that was the best size. (${l.id})`, 4), o = l;
    } else
      n.returnAllOptions && a.push(l);
  };
  r(() => `The input shows we have ${e.length} list(s) of candidates to choose from.`);
  const u = e.length;
  for (let l = 0; l < u; l++) {
    const d = e[l]();
    r(() => `Candidate group ${l}: ${JSON.stringify(d, null, 2)}`, 1);
    const g = d.length;
    r(() => `Checking candidate list number ${l} and found ${g} potential ways of creating image(s)`, 1);
    for (let m = 0; m < g; m++) {
      const c = d[m];
      if (r(() => `-> Checking candidate ${m}`, 1), c.type === "unknown" && n.atAnyCost && (r(() => `We've found an unknown image type, adding this to the "last resort" list`, 2), s.push(c)), c.type === "fixed" && (c.unsafe ? (r(() => `We've found an unsafe fixed image type, adding this to the "last resort" list`, 2), s.push(c)) : (r(() => "We've found a fixed size image, checking if it matches the request", 2), f(c, o))), c.type === "fixed-service")
        if (n.unsafeImageService) {
          r(() => "Checking for an image from the tile source, without calculating the right height and width (unsafeImageService)", 2);
          const S = O(c, n.width, n.height);
          f(S, o);
        } else {
          r(() => "Checking for an image from the tile source 3", 2);
          const S = O(c, c.width, c.height);
          f(S, o);
        }
      if (c.type === "variable" && c.maxWidth) {
        const S = O({ id: c.id, type: "fixed-service", width: c.maxWidth, height: c.maxWidth, level: c.level, version: c.version }, c.maxWidth);
        f(S, o);
      }
    }
    if (o && !n.returnAllOptions) {
      if (o.unsafe || n.allowUnsafe)
        continue;
      r(() => `We found a match in choice list number ${l}, no searching any more`);
      break;
    }
  }
  return n.atAnyCost && a.length === 0 ? (r(() => o ? `We found an image! ${o.id} of type ${o.type}` : 'We found no images, but "atAnyCost" is set, so returning that'), { best: o || s[0], fallback: s.slice(1), log: t }) : n.returnAllOptions ? (r(() => "Returning all options that we have found"), { best: n.atAnyCost ? o || a[0] || s[0] : o || a[0], fallback: [...a, ...s], log: t }) : (r(() => "Returning the best image that we found, and a fallback"), { best: o || a[0] || null, fallback: o ? a : a.slice(1), log: t });
}
var qe = Object.defineProperty, ei = Object.defineProperties, ii = Object.getOwnPropertyDescriptors, Ne = Object.getOwnPropertySymbols, ti = Object.prototype.hasOwnProperty, ni = Object.prototype.propertyIsEnumerable, Re = (i, e, t) => e in i ? qe(i, e, { enumerable: true, configurable: true, writable: true, value: t }) : i[e] = t, ri = (i, e) => {
  for (var t in e || (e = {}))
    ti.call(e, t) && Re(i, t, e[t]);
  if (Ne)
    for (var t of Ne(e))
      ni.call(e, t) && Re(i, t, e[t]);
  return i;
}, si = (i, e) => ei(i, ii(e));
function He(i, e, t) {
  const n = i > e ? i : e, r = t.length, s = [];
  for (let a = 0; a < r; a++) {
    const o = t[a];
    let f = o.scaleFactors[0], u = n / f;
    const l = [f];
    for (; u >= o.width; )
      f = f * 2, l.push(f), u = u / 2;
    s.push(si(ri({}, o), { scaleFactors: l }));
  }
  return s;
}
function Te(i, e) {
  if (i.length !== e.length)
    return false;
  if (i.length === 0 && e.length === 0)
    return true;
  const t = i.length;
  let n = true;
  for (let s = 0; s < t; s++) {
    const a = i[s], o = e[s];
    if (a.width !== o.width || a.height !== o.height) {
      n = false;
      break;
    }
  }
  if (n)
    return true;
  let r = 0;
  for (let s = 0; s < t; s++)
    for (let a = 0; a < t; a++)
      if (i[s].width === e[a].width && i[s].height === e[a].height) {
        r++;
        break;
      }
  return r === t;
}
function Ge(i) {
  return v(0, i);
}
var _ = (i, e, t) => new Promise((n, r) => {
  var s = (f) => {
    try {
      o(t.next(f));
    } catch (u) {
      r(u);
    }
  }, a = (f) => {
    try {
      o(t.throw(f));
    } catch (u) {
      r(u);
    }
  }, o = (f) => f.done ? n(f.value) : Promise.resolve(f.value).then(s, a);
  o((t = t.apply(i, e)).next());
});
class ke {
  constructor() {
    this.config = { verificationsRequired: 1, approximateServices: true, enableFetching: true, disableThrottling: false }, this.fetchingCount = 0, this.imageServices = {}, this.knownImageServers = {};
  }
  setConfig(e) {
    Object.assign(this.config, e);
  }
  sample(e, t, n = true) {
    const r = y(h(e)), s = p(h(e)), a = this.knownImageServers[r];
    return this.imageServices[s] = Object.assign(e, { real: true }), !a && e.tiles && !Ge(e) ? (this.knownImageServers[r] = { verifications: 0, malformed: false, root: r, preLoaded: n, sampledId: h(e), verified: false, server: null, result: { context: e["@context"] || [], sampledProfile: e.profile, resourceServiceRatio: t && e.height ? t.height / e.height : 1, sampledSizes: e.sizes || [], sizeRatios: Se(e.width, e.height, e.sizes || []), sampledTiles: e.tiles || [] } }, true) : this.verify(e);
  }
  preLoad(e, t = true) {
    this.knownImageServers[e.root] = e, t && (this.knownImageServers[e.root].malformed = false, this.knownImageServers[e.root].verifications = this.config.verificationsRequired);
  }
  predict(e, t = false, n = false) {
    const r = e == null ? void 0 : e.source, s = y(h(e)), a = this.knownImageServers[s];
    if (!a || !a.result || !((r == null ? void 0 : r.height) || e.height) || !((r == null ? void 0 : r.width) || e.width) || !n && (a.malformed || a.verifications < this.config.verificationsRequired) || Ge(e.source))
      return null;
    const o = p(h(e));
    return this.imageServices[o] || (this.imageServices[o] = { "@context": a.result.context, "@id": h(e), id: h(e), protocol: "http://iiif.io/api/image", tiles: (r == null ? void 0 : r.tiles) || He(e.width, e.height, a.result.sampledTiles), sizes: (r == null ? void 0 : r.sizes) || ve(Math.round(e.width / a.result.resourceServiceRatio), Math.round(e.height / a.result.resourceServiceRatio), a.result.sizeRatios), profile: (r == null ? void 0 : r.profile) || a.result.sampledProfile, height: (r == null ? void 0 : r.height) || e.height, width: (r == null ? void 0 : r.width) || e.width, real: false }), this.imageServices[o];
  }
  getThumbnailFromResource(e, t) {
    return _(this, arguments, function* (n, r, s = true, a = []) {
      const o = n ? yield this.getImageCandidates(n, s) : [];
      return Be(r, [() => a, () => o]);
    });
  }
  getImageCandidates(e, t = true) {
    return _(this, null, function* () {
      const n = e;
      if (t && n.height && n.width) {
        const r = ee(n);
        for (const s of r) {
          const a = { id: h(s), width: s.width ? s.width : n.width, height: s.height ? s.height : n.height, source: s };
          yield this.loadService(a);
        }
      }
      return be(e, t, this);
    });
  }
  verify(e) {
    return _(this, null, function* () {
      const t = this.predict(e, false, true), n = yield this.fetchService(h(e));
      if (!t)
        return false;
      const r = t.height === n.height && t.width === n.width && t["@context"] === n["@context"] && Te(t.sizes || [], n.sizes || []);
      if (r) {
        const s = y(h(e));
        this.knownImageServers[s].verifications += 1, this.knownImageServers[s].verifications >= this.config.verificationsRequired && (this.knownImageServers[s].verified = true);
      }
      return r;
    });
  }
  canLoadSync(e) {
    const t = typeof e == "string" ? e : h(e), n = p(t);
    if (this.imageServices[n])
      return true;
    const r = this.knownImageServers[y(t)];
    return r && !r.malformed && r.verifications >= this.config.verificationsRequired;
  }
  markAsMalformed(e) {
    return _(this, null, function* () {
      return this.knownImageServers[y(h(e))].malformed = true, this.loadService(e, true);
    });
  }
  fetchService(e, t = false) {
    return _(this, null, function* () {
      const n = p(e);
      if (this.imageServices[n] && (!t || this.imageServices[n].real))
        return this.imageServices[n];
      if (!this.config.enableFetching)
        throw new Error("Fetching is not enabled");
      const r = yield this.fetch(n).then((s) => s.json());
      return !r.id && r["@id"] && (r.id = r["@id"]), r.id !== e && (r.id = e, r["@id"] && (r["@id"] = e)), this.imageServices[n] = Object.assign(r, { real: true }), this.imageServices[n];
    });
  }
  fetch(e, t) {
    return _(this, null, function* () {
      return fetch(e, t);
    });
  }
  loadService(e, t = false) {
    return _(this, null, function* () {
      if (!this.config.disableThrottling) {
        let s = true;
        for (; s; )
          if (this.fetchingCount >= this.config.verificationsRequired)
            yield new Promise((a) => setTimeout(a, 500));
          else {
            s = false;
            break;
          }
      }
      const n = this.knownImageServers[y(h(e))];
      if (n && !n.malformed && !t) {
        yield n.result;
        const s = this.loadServiceSync(e);
        if (s)
          return s;
      }
      this.fetchingCount++;
      const r = yield this.fetchService(h(e), t);
      return this.fetchingCount--, r.real && this.sample(r, e), r;
    });
  }
  loadServiceSync(e) {
    const t = p(h(e));
    return this.imageServices[t] ? this.imageServices[t] : this.predict(e);
  }
}
new ke();
function createThumbnailHelper(vault = compatVault$1, dependencies = {}) {
  const imageServiceLoader = dependencies.imageServiceLoader || new ke();
  async function getBestThumbnailAtSize(input, request, dereference, candidates = [], dimensions) {
    const thumbnailNotFound = () => imageServiceLoader.getThumbnailFromResource(void 0, request, dereference, candidates);
    if (!input) {
      return await imageServiceLoader.getThumbnailFromResource(void 0, request, dereference, candidates);
    }
    if (typeof input === "string") {
      const fixed = Ae(input);
      if (fixed) {
        candidates.push(fixed);
      }
      return await imageServiceLoader.getThumbnailFromResource(void 0, request, dereference, candidates);
    }
    const fullInput = vault.get(input, { skipSelfReturn: false });
    if (typeof fullInput === "string") {
      return { best: Ae(fullInput), fallback: [], log: [] };
    }
    if (!fullInput) {
      return await thumbnailNotFound();
    }
    const parseThumbnail = async (resource) => {
      if (resource && resource.thumbnail && resource.thumbnail.length) {
        const thumbnail = vault.get(resource.thumbnail[0]);
        const potentialThumbnails = await imageServiceLoader.getImageCandidates(thumbnail, dereference);
        if (potentialThumbnails && potentialThumbnails.length) {
          candidates.push(...potentialThumbnails);
        }
      }
    };
    await parseThumbnail(fullInput);
    switch (fullInput.type) {
      case "Annotation": {
        const contentResources = Array.isArray(fullInput.body) ? fullInput.body : [fullInput.body];
        const firstContentResources = vault.get(contentResources[0]);
        if (dimensions && !firstContentResources.width) {
          firstContentResources.width = dimensions.width;
          firstContentResources.height = dimensions.height;
        }
        return await imageServiceLoader.getThumbnailFromResource(
          firstContentResources,
          request,
          dereference,
          candidates
        );
      }
      case "Canvas": {
        const canvas = fullInput;
        return getBestThumbnailAtSize(canvas.items[0], request, dereference, candidates, {
          width: canvas.width,
          height: canvas.height
        });
      }
      case "AnnotationPage": {
        const annotationPage = fullInput;
        return getBestThumbnailAtSize(annotationPage.items[0], request, dereference, candidates, dimensions);
      }
      case "Choice": {
        const choice = fullInput;
        if (!choice.items || choice.items[0]) {
          return await thumbnailNotFound();
        }
        return getBestThumbnailAtSize(choice.items[0], request, dereference, candidates, dimensions);
      }
      case "Collection": {
        const collection = fullInput;
        const firstManifest = collection.items[0];
        if (!firstManifest) {
          return await thumbnailNotFound();
        }
        return getBestThumbnailAtSize(firstManifest, request, dereference, candidates, dimensions);
      }
      case "Manifest": {
        const manifest = fullInput;
        const firstCanvas = manifest.items[0];
        if (!firstCanvas) {
          return await thumbnailNotFound();
        }
        return getBestThumbnailAtSize(firstCanvas, request, dereference, candidates, dimensions);
      }
      case "SpecificResource":
      case "Image":
      case "Dataset":
      case "Sound":
      case "Text":
      case "TextualBody":
      case "Video":
        if (dimensions && !fullInput.width) {
          fullInput.width = dimensions.width;
          fullInput.height = dimensions.height;
        }
        return imageServiceLoader.getThumbnailFromResource(fullInput, request, dereference, candidates);
      case "Service":
      case "Range":
      case "AnnotationCollection":
      case "CanvasReference":
      case "ContentResource":
        return await thumbnailNotFound();
    }
    return await thumbnailNotFound();
  }
  return {
    getBestThumbnailAtSize
  };
}
function getClosestLanguage(i18nLanguage, languages, i18nLanguages = [], strictFallback = false) {
  if (!i18nLanguage || !languages || languages.length === 0) {
    return void 0;
  }
  if (languages.length === 1) {
    return languages[0];
  }
  if (languages.indexOf(i18nLanguage) !== -1) {
    return i18nLanguage;
  }
  const root = i18nLanguage.indexOf("-") !== -1 ? i18nLanguage.slice(0, i18nLanguage.indexOf("-")) : null;
  if (root && languages.indexOf(root) !== -1) {
    return root;
  }
  for (const lang of i18nLanguages) {
    if (languages.indexOf(lang) !== -1) {
      return lang;
    }
  }
  if (!strictFallback) {
    const inverseRoot = languages.map((l) => l.indexOf("-") !== -1 ? l.slice(0, l.indexOf("-")) : null);
    const inverseIdx = inverseRoot.indexOf(i18nLanguage);
    if (inverseIdx !== -1) {
      return languages[inverseIdx];
    }
    for (const lang of i18nLanguages) {
      const root2 = lang.indexOf("-") !== -1 ? lang.slice(0, lang.indexOf("-")) : null;
      const inverseIdx2 = root2 ? languages.indexOf(root2) : -1;
      if (inverseIdx2 !== -1) {
        return languages[inverseIdx2];
      }
    }
  }
  if (languages.indexOf("none") !== -1) {
    return "none";
  }
  if (languages.indexOf("@none") !== -1) {
    return "@none";
  }
  return languages[0];
}
function buildLocaleString(inputText, i18nLanguage, options = {}) {
  const { strictFallback = false, defaultText = "", separator = "\n", fallbackLanguages = [], closest } = options;
  const languages = Object.keys(inputText || {});
  const language = closest ? i18nLanguage : getClosestLanguage(i18nLanguage, languages, fallbackLanguages, strictFallback);
  if (!inputText) {
    return defaultText;
  }
  if (typeof inputText === "string") {
    return inputText;
  }
  const candidateText = language ? inputText[language] : void 0;
  if (candidateText) {
    if (typeof candidateText === "string") {
      return candidateText;
    }
    return candidateText.join(separator);
  }
  return "";
}
function getValue(inputText, options = {}) {
  return buildLocaleString(inputText, typeof navigator !== "undefined" ? navigator.language : void 0, options);
}
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
var index_umd = { exports: {} };
(function(module, exports) {
  var __defProp = Object.defineProperty, __defNormalProp = (e, t, i) => t in e ? __defProp(e, t, { enumerable: true, configurable: true, writable: true, value: i }) : e[t] = i, __publicField = (e, t, i) => (__defNormalProp(e, "symbol" != typeof t ? t + "" : t, i), i);
  !function(e, t) {
    t(exports);
  }(commonjsGlobal, function(e) {
    const t = "http://library.stanford.edu/iiif/image-api/compliance.html#level1", i = "http://library.stanford.edu/iiif/image-api/compliance.html#level2", r = "http://library.stanford.edu/iiif/image-api/conformance.html#level1", n = "http://library.stanford.edu/iiif/image-api/conformance.html#level2", s = "http://library.stanford.edu/iiif/image-api/1.1/compliance.html#level1", a = "http://library.stanford.edu/iiif/image-api/1.1/compliance.html#level2", o = "http://library.stanford.edu/iiif/image-api/1.1/conformance.html#level1", c = "http://library.stanford.edu/iiif/image-api/1.1/conformance.html#level2", l = "http://iiif.io/api/image/1/level1.json", p2 = "http://iiif.io/api/image/1/profiles/level1.json", h2 = "http://iiif.io/api/image/1/level2.json", u = "http://iiif.io/api/image/1/profiles/level2.json", v2 = "http://iiif.io/api/image/2/level1.json", f = "http://iiif.io/api/image/2/profiles/level1.json", m = "http://iiif.io/api/image/2/level2.json", y2 = "http://iiif.io/api/image/2/profiles/level2.json", g = "level1", d = "level2", A2 = "http://iiif.io/api/image/2/level1", b2 = "http://iiif.io/api/image/2/level2", C2 = [A2, b2, t, i, r, n, s, a, o, c, l, p2, h2, u, v2, f, m, y2, g, d], x2 = ["http://iiif.io/api/image/2/level0", A2, b2, "http://library.stanford.edu/iiif/image-api/compliance.html#level0", t, i, "http://library.stanford.edu/iiif/image-api/conformance.html#level0", r, n, "http://library.stanford.edu/iiif/image-api/1.1/compliance.html#level0", s, a, "http://library.stanford.edu/iiif/image-api/1.1/conformance.html#level0", o, c, "http://iiif.io/api/image/1/level0.json", "http://iiif.io/api/image/1/profiles/level0.json", l, p2, h2, u, "http://iiif.io/api/image/2/level0.json", "http://iiif.io/api/image/2/profiles/level0.json", v2, f, m, y2, "level0", g, d], w2 = ["sc:Collection", "sc:Manifest", "sc:Canvas", "sc:AnnotationList", "oa:Annotation", "sc:Range", "sc:Layer", "sc:Sequence", "oa:Choice", "Service", "ContentResource"];
    class L2 {
      constructor(e2, t2 = {}) {
        __publicField(this, "traversals"), __publicField(this, "options"), this.traversals = { collection: [], manifest: [], canvas: [], annotationList: [], sequence: [], annotation: [], contentResource: [], choice: [], range: [], service: [], layer: [], ...e2 }, this.options = { convertPropsToArray: true, mergeMemberProperties: true, allowUndefinedReturn: false, ...t2 };
      }
      static all(e2) {
        return new L2({ collection: [e2], manifest: [e2], canvas: [e2], annotationList: [e2], sequence: [e2], annotation: [e2], contentResource: [e2], choice: [e2], range: [e2], service: [e2], layer: [e2] });
      }
      traverseCollection(e2) {
        return this.traverseType(this.traverseDescriptive(this.traverseLinking(this.traverseCollectionItems(e2))), this.traversals.collection);
      }
      traverseCollectionItems(e2) {
        if (this.options.mergeMemberProperties) {
          const t2 = [...(e2.manifests || []).map((e3) => "string" == typeof e3 ? { "@id": e3, "@type": "sc:Manifest" } : e3), ...(e2.collections || []).map((e3) => "string" == typeof e3 ? { "@id": e3, "@type": "sc:Collection" } : e3), ...e2.members || []];
          delete e2.collections, delete e2.manifests, e2.members = t2;
        }
        return e2.manifests && (e2.manifests = e2.manifests.map((e3) => this.traverseManifest("string" == typeof e3 ? { "@id": e3, "@type": "sc:Manifest" } : e3))), e2.collections && (e2.collections = e2.collections.map((e3) => this.traverseCollection("string" == typeof e3 ? { "@id": e3, "@type": "sc:Collection" } : e3))), e2.members && (e2.members = e2.members.map((e3) => "string" == typeof e3 ? e3 : this.traverseUnknown(e3))), e2;
      }
      traverseManifest(e2) {
        return this.traverseType(this.traverseDescriptive(this.traverseLinking(this.traverseManifestItems(e2))), this.traversals.manifest);
      }
      traverseManifestItems(e2) {
        return e2.sequences && (e2.sequences = e2.sequences.map((e3) => this.traverseSequence(e3))), e2.structures && (e2.structures = e2.structures.map((e3) => this.traverseRange(e3))), e2;
      }
      traverseSequence(e2) {
        return this.traverseType(this.traverseDescriptive(this.traverseLinking(this.traverseSequenceItems(e2))), this.traversals.sequence);
      }
      traverseSequenceItems(e2) {
        return e2.canvases && (e2.canvases = e2.canvases.map((e3) => this.traverseCanvas(e3))), e2;
      }
      traverseCanvas(e2) {
        return this.traverseType(this.traverseDescriptive(this.traverseLinking(this.traverseCanvasItems(e2))), this.traversals.canvas);
      }
      traverseCanvasItems(e2) {
        return e2.images && (e2.images = e2.images.map((e3) => this.traverseAnnotation(e3))), e2.otherContent && (e2.otherContent = e2.otherContent.map((e3) => this.traverseAnnotationList(e3))), e2;
      }
      traverseRange(e2) {
        return this.traverseType(this.traverseDescriptive(this.traverseLinking(this.traverseRangeItems(e2))), this.traversals.range);
      }
      traverseRangeItems(e2) {
        if (this.options.mergeMemberProperties) {
          const t2 = [...(e2.ranges || []).map((e3) => "string" == typeof e3 ? { "@id": e3, "@type": "sc:Range" } : e3), ...(e2.canvases || []).map((e3) => "string" == typeof e3 ? { "@id": e3, "@type": "sc:Canvas" } : e3), ...e2.members || []];
          delete e2.ranges, delete e2.canvases, e2.members = t2.length ? t2.map((e3) => this.traverseUnknown(e3)) : void 0;
        }
        return e2;
      }
      traverseAnnotationList(e2) {
        const t2 = "string" == typeof e2 ? { "@id": e2, "@type": "sc:AnnotationList" } : e2;
        return this.traverseType(this.traverseDescriptive(this.traverseAnnotationListItems(t2)), this.traversals.annotationList);
      }
      traverseAnnotationListItems(e2) {
        return e2.resources && (e2.resources = e2.resources.map((e3) => this.traverseAnnotation(e3))), e2;
      }
      traverseAnnotation(e2) {
        return this.traverseType(this.traverseDescriptive(this.traverseLinking(this.traverseAnnotationItems(e2))), this.traversals.annotation);
      }
      traverseAnnotationItems(e2) {
        return e2.resource && (Array.isArray(e2.resource) ? e2.resource = e2.resource.map((e3) => this.traverseContentResource(e3)) : e2.resource = this.traverseContentResource(e2.resource)), e2.on, e2;
      }
      traverseLayer(e2) {
        return this.traverseType(this.traverseLinking(this.traverseLayerItems(e2)), this.traversals.layer);
      }
      traverseLayerItems(e2) {
        return e2.otherContent && (e2.otherContent = e2.otherContent.map((e3) => this.traverseAnnotationList(e3))), e2;
      }
      traverseChoice(e2) {
        return this.traverseType(this.traverseChoiceItems(e2), this.traversals.choice);
      }
      traverseChoiceItems(e2) {
        return e2.default && "rdf:nil" !== e2.default && (e2.default = this.traverseContentResource(e2.default)), e2.item && "rdf:nil" !== e2.item && (e2.item = e2.item.map((e3) => this.traverseContentResource(e3))), e2;
      }
      traverseService(e2) {
        return this.traverseType(this.traverseLinking(e2), this.traversals.service);
      }
      traverseContentResource(e2) {
        return "oa:Choice" === e2["@type"] ? this.traverseChoice(e2) : this.traverseType(this.traverseDescriptive(this.traverseLinking(e2)), this.traversals.contentResource);
      }
      traverseUnknown(e2) {
        if (!e2["@type"] || "string" == typeof e2)
          return e2;
        switch (function(e3) {
          if (null == e3)
            throw new Error("Null or undefined is not a valid entity.");
          if (Array.isArray(e3))
            throw new Error("Array is not a valid entity");
          if ("object" != typeof e3)
            throw new Error(typeof e3 + " is not a valid entity");
          if ("string" == typeof e3["@type"]) {
            const t2 = w2.indexOf(e3["@type"]);
            if (-1 !== t2)
              return w2[t2];
          }
          if (e3.profile)
            return "Service";
          if (e3.format)
            return "ContentResource";
          if (e3["@type"])
            return "ContentResource";
          throw new Error("Resource type is not known");
        }(e2)) {
          case "sc:Collection":
            return this.traverseCollection(e2);
          case "sc:Manifest":
            return this.traverseManifest(e2);
          case "sc:Canvas":
            return this.traverseCanvas(e2);
          case "sc:Sequence":
            return this.traverseSequence(e2);
          case "sc:Range":
            return this.traverseRange(e2);
          case "oa:Annotation":
            return this.traverseAnnotation(e2);
          case "sc:AnnotationList":
            return this.traverseAnnotationList(e2);
          case "sc:Layer":
            return this.traverseLayer(e2);
          case "Service":
            return this.traverseService(e2);
          case "oa:Choice":
            return this.traverseChoice(e2);
          case "ContentResource":
            return this.traverseContentResource(e2);
        }
        return e2.profile ? this.traverseService(e2) : e2;
      }
      traverseImageResource(e2) {
        const t2 = Array.isArray(e2), i2 = Array.isArray(e2) ? e2 : [e2], r2 = [];
        for (const n2 of i2)
          "string" == typeof n2 ? r2.push(this.traverseContentResource({ "@id": n2, "@type": "dctypes:Image" })) : r2.push(this.traverseContentResource(n2));
        return t2 || this.options.convertPropsToArray ? r2 : r2[0];
      }
      traverseDescriptive(e2) {
        return e2.thumbnail && (e2.thumbnail = this.traverseImageResource(e2.thumbnail)), e2.logo && (e2.logo = this.traverseImageResource(e2.logo)), e2;
      }
      traverseOneOrMoreServices(e2) {
        const t2 = Array.isArray(e2), i2 = Array.isArray(e2) ? e2 : [e2], r2 = [];
        for (const n2 of i2)
          r2.push(this.traverseService(n2));
        return t2 || this.options.convertPropsToArray ? r2 : r2[0];
      }
      traverseLinking(e2) {
        return e2.related && (e2.related = this.traverseOneOrManyType(e2.related, this.traversals.contentResource)), e2.rendering && (e2.rendering = this.traverseOneOrManyType(e2.rendering, this.traversals.contentResource)), e2.service && (e2.service = this.traverseOneOrMoreServices(e2.service)), e2.seeAlso && (e2.seeAlso = this.traverseOneOrManyType(e2.seeAlso, this.traversals.contentResource)), e2.within && ("string" == typeof e2.within || (e2.within = this.traverseOneOrManyType(e2.within, this.traversals.contentResource))), e2.startCanvas && ("string" == typeof e2.startCanvas ? e2.startCanvas = this.traverseType({ "@id": e2.startCanvas, "@type": "sc:Canvas" }, this.traversals.canvas) : e2.startCanvas && this.traverseType(e2.startCanvas, this.traversals.canvas)), e2.contentLayer && ("string" == typeof e2.contentLayer ? e2.contentLayer = this.traverseLayer({ "@id": e2.contentLayer, "@type": "sc:Layer" }) : e2.contentLayer = this.traverseLayer(e2.contentLayer)), e2;
      }
      traverseOneOrManyType(e2, t2) {
        if (!Array.isArray(e2)) {
          if (!this.options.convertPropsToArray)
            return this.traverseType(e2, t2);
          e2 = [e2];
        }
        return e2.map((e3) => this.traverseType(e3, t2));
      }
      traverseType(e2, t2) {
        return t2.reduce((e3, t3) => {
          const i2 = t3(e3);
          return void 0 !== i2 || this.options.allowUndefinedReturn ? i2 : e3;
        }, e2);
      }
    }
    const S = "Attribution", j2 = "http://example.org/provider", R2 = "Unknown";
    function I2(e2, t2 = "none") {
      if (!e2)
        return {};
      const i2 = Array.isArray(e2) ? e2 : [e2], r2 = {};
      for (const n2 of i2) {
        if ("string" == typeof n2) {
          r2[t2] = r2[t2] ? r2[t2] : [], r2[t2].push(n2 || "");
          continue;
        }
        if (!n2["@language"]) {
          r2[t2] = r2[t2] ? r2[t2] : [], r2[t2].push(n2["@value"] || "");
          continue;
        }
        const e3 = n2["@language"];
        r2[e3] = r2[e3] ? r2[e3] : [], r2[e3].push(n2["@value"] || "");
      }
      return r2;
    }
    function T2(e2) {
      return Array.isArray(e2) ? T2(e2.find((e3) => "string" == typeof e3)) : -1 !== x2.indexOf(e2) ? "level2" : -1 !== C2.indexOf(e2) ? "level1" : "string" == typeof e2 ? e2 : void 0;
    }
    function k2(e2) {
      for (const t2 of ["sc", "oa", "dcterms", "dctypes", "iiif"])
        if (e2.startsWith(`${t2}:`))
          return e2.slice(t2.length + 1);
      return e2;
    }
    const O2 = ["Collection", "Manifest", "Annotation", "AnnotationPage", "Range", "Service"];
    function M2(e2) {
      const t2 = e2["@id"] || e2.id;
      let i2 = e2["@type"] || e2.type;
      const r2 = e2.profile || void 0, n2 = e2["@context"] || void 0;
      if (r2) {
        const e3 = function(e4) {
          switch (e4) {
            case "http://iiif.io/api/image/2/level0.json":
            case "http://iiif.io/api/image/2/level1.json":
            case "http://iiif.io/api/image/2/level2.json":
              return "ImageService2";
            case "http://iiif.io/api/auth/1/kiosk":
            case "http://iiif.io/api/auth/1/login":
            case "http://iiif.io/api/auth/1/clickthrough":
            case "http://iiif.io/api/auth/1/external":
            case "http://iiif.io/api/auth/0/kiosk":
            case "http://iiif.io/api/auth/0/login":
            case "http://iiif.io/api/auth/0/clickthrough":
            case "http://iiif.io/api/auth/0/external":
              return "AuthCookieService1";
            case "http://iiif.io/api/auth/1/token":
            case "http://iiif.io/api/auth/0/token":
              return "AuthTokenService1";
            case "http://iiif.io/api/auth/1/logout":
            case "http://iiif.io/api/auth/0/logout":
              return "AuthLogoutService1";
            case "http://iiif.io/api/search/1/search":
            case "http://iiif.io/api/search/0/search":
              return "SearchService1";
            case "http://iiif.io/api/search/1/autocomplete":
            case "http://iiif.io/api/search/0/autocomplete":
              return "AutoCompleteService1";
          }
        }(r2);
        if (e3)
          return e3;
      }
      if (n2) {
        const e3 = function(e4) {
          const t3 = Array.isArray(e4) ? e4 : [e4];
          for (const i3 of t3)
            switch (i3) {
              case "http://iiif.io/api/image/2/context.json":
              case "http://library.stanford.edu/iiif/image-api/1.1/compliance.html#level2":
                return "ImageService2";
              case "http://iiif.io/api/image/1/context.json":
              case "http://library.stanford.edu/iiif/image-api/1.1/context.json":
                return "ImageService1";
              case "http://iiif.io/api/annex/openannotation/context.json":
                return "ImageApiSelector";
            }
        }(n2);
        if (e3)
          return e3;
      }
      if (i2) {
        if (Array.isArray(i2)) {
          if (-1 !== i2.indexOf("oa:CssStylesheet"))
            return "CssStylesheet";
          if (-1 !== i2.indexOf("cnt:ContentAsText"))
            return "TextualBody";
          i2 = i2[0];
        }
        for (const e3 of ["sc", "oa", "dcterms", "dctypes", "iiif"])
          if (i2.startsWith(`${e3}:`)) {
            i2 = i2.slice(e3.length + 1);
            break;
          }
        switch (i2) {
          case "Layer":
            return "AnnotationCollection";
          case "AnnotationList":
            return "AnnotationPage";
          case "cnt:ContentAsText":
            return "TextualBody";
        }
      }
      if (i2 && -1 !== O2.indexOf(i2))
        return i2;
      if (e2.format) {
        if (e2.format.startsWith("image/"))
          return "Image";
        if (e2.format.startsWith("text/"))
          return "Text";
        if ("application/pdf" === e2.format)
          return "Text";
        if (e2.format.startsWith("application/"))
          return "Dataset";
      }
      return t2 && (t2.endsWith(".jpg") || t2.endsWith(".png") || t2.endsWith(".jpeg")) ? "Image" : i2 || "unknown";
    }
    const q2 = /http(s)?:\/\/(creativecommons.org|rightsstatements.org)[^"'\\<\n]+/gm;
    function P2(e2) {
      const t2 = e2.match(q2);
      return t2 ? t2[0] : e2;
    }
    const _2 = ["http://iiif.io/api/presentation/2/context.json", "http://iiif.io/api/image/2/context.json", "http://iiif.io/api/image/1/context.json", "http://library.stanford.edu/iiif/image-api/1.1/context.json", "http://iiif.io/api/search/1/context.json", "http://iiif.io/api/search/0/context.json", "http://iiif.io/api/auth/1/context.json", "http://iiif.io/api/auth/0/context.json", "http://iiif.io/api/annex/openannotation/context.json"];
    function D2(e2) {
      if (e2) {
        const t2 = Array.isArray(e2) ? e2 : [e2], i2 = [];
        for (const e3 of t2)
          "http://iiif.io/api/presentation/2/context.json" === e3 && i2.push("http://iiif.io/api/presentation/3/context.json"), -1 === _2.indexOf(e3) && i2.push(e3);
        if (t2.length)
          return 1 === i2.length ? i2[0] : i2;
      }
    }
    function U2(e2) {
      for (const t2 in e2)
        void 0 !== e2[t2] && null !== e2[t2] || delete e2[t2];
      return e2;
    }
    let $2 = 0;
    function W2(e2, t2) {
      const i2 = encodeURI(e2.id || e2["@id"] || "").trim();
      return i2 && t2 ? `${i2}/${t2}` : i2 || ($2++, `http://example.org/${e2["@type"]}${t2 ? `/${t2}` : ""}/${$2}`);
    }
    function E2(e2) {
      const t2 = [...e2.behavior || []];
      let i2;
      return e2.viewingHint && t2.push(e2.viewingHint), Array.isArray(e2.motivation) ? i2 = e2.motivation.map(k2) : e2.motivation && (i2 = k2(e2.motivation)), { "@context": e2["@context"] ? D2(e2["@context"]) : void 0, id: (e2["@id"] || W2(e2)).trim(), type: M2(e2), behavior: t2.length ? t2 : void 0, height: e2.height ? e2.height : void 0, width: e2.width ? e2.width : void 0, motivation: i2, viewingDirection: e2.viewingDirection, profile: e2.profile, format: e2.format ? e2.format : void 0, duration: void 0, timeMode: void 0 };
    }
    function F2(e2) {
      const [t2, i2] = function(e3, t3 = "Rights/License", i3 = "none") {
        let r3 = null;
        const n3 = [], s2 = Array.isArray(e3) ? e3 : [e3];
        for (const a2 of s2) {
          const e4 = a2 ? P2(a2) : void 0;
          !e4 || -1 === e4.indexOf("creativecommons.org") && -1 === e4.indexOf("rightsstatements.org") ? e4 && n3.push({ label: { [i3]: [t3] }, value: { [i3]: [e4] } }) : r3 = e4.startsWith("https://") ? `http://${e4.slice(8)}` : e4;
        }
        return [r3, n3];
      }(e2.license), r2 = [...e2.metadata ? (n2 = e2.metadata, n2 ? n2.map((e3) => ({ label: I2(e3.label), value: I2(e3.value) })) : []) : [], ...i2];
      var n2;
      return { rights: t2, metadata: r2.length ? r2 : void 0, label: e2.label ? I2(e2.label) : void 0, requiredStatement: e2.attribution ? { label: I2(S), value: I2(e2.attribution) } : void 0, navDate: e2.navDate, summary: e2.description ? I2(e2.description) : void 0, thumbnail: e2.thumbnail };
    }
    function H2(e2) {
      if (!e2.within)
        return;
      const t2 = Array.isArray(e2.within) ? e2.within : [e2.within], i2 = [];
      for (const r2 of t2)
        if ("string" == typeof r2) {
          if (r2 && "sc:Manifest" === e2["@type"])
            i2.push({ id: r2, type: "Collection" });
        } else
          r2["@id"] && i2.push({ id: r2["@id"], type: M2(r2) });
      return i2.length ? i2 : void 0;
    }
    function N2(e2) {
      const t2 = e2.related ? Array.isArray(e2.related) ? e2.related : [e2.related] : [], i2 = e2.contentLayer;
      return { provider: e2.logo || t2.length ? [{ id: j2, type: "Agent", homepage: t2.length ? [t2[0]] : void 0, logo: e2.logo ? Array.isArray(e2.logo) ? e2.logo : [e2.logo] : void 0, label: I2(R2) }] : void 0, partOf: H2(e2), rendering: e2.rendering, seeAlso: e2.seeAlso, start: e2.startCanvas, service: e2.service ? (r2 = e2.service, Array.isArray(r2) ? r2 : [r2]) : void 0, supplementary: i2 ? [i2] : void 0 };
      var r2;
    }
    function B2(e2) {
      const t2 = e2;
      return U2({ ...E2(t2), ...F2(t2), ...N2(t2), ...(i2 = t2, { chars: i2.chars, format: i2.format ? i2.format : void 0, language: i2.language }) });
      var i2;
    }
    const z2 = new L2({ collection: [function(e2) {
      return U2({ ...E2(e2), ...F2(e2), ...N2(e2), items: e2.members });
    }], manifest: [function(e2) {
      const t2 = [], i2 = [];
      for (const n2 of e2.sequences || [])
        n2.canvases.length && t2.push(...n2.canvases), n2.behavior && i2.push(...n2.behavior);
      const r2 = E2(e2);
      return i2.length && (r2.behavior ? r2.behavior.push(...i2) : r2.behavior = i2), U2({ ...r2, ...F2(e2), ...N2(e2), items: t2, structures: e2.structures });
    }], canvas: [function(e2) {
      return U2({ ...E2(e2), ...F2(e2), ...N2(e2), annotations: e2.otherContent && e2.otherContent.length ? e2.otherContent : void 0, items: e2.images && e2.images.length ? [{ id: W2(e2, "annotation-page"), type: "AnnotationPage", items: e2.images }] : void 0 });
    }], annotationList: [function(e2) {
      return U2({ ...E2(e2), ...F2(e2), ...N2(e2), items: e2.resources && e2.resources.length ? e2.resources : void 0 });
    }], sequence: [function(e2) {
      return e2.canvases && 0 !== e2.canvases.length ? { canvases: e2.canvases, behavior: e2.viewingHint ? [e2.viewingHint] : [] } : { canvases: [], behavior: [] };
    }], annotation: [function(e2) {
      return U2({ ...E2(e2), ...F2(e2), ...N2(e2), target: function e3(t2) {
        if (Array.isArray(t2)) {
          if (t2.length > 1)
            return { type: "List", items: t2.map(e3) };
          t2 = t2[0];
        }
        if ("string" == typeof t2)
          return encodeURI(t2).trim();
        if ("@type" in t2) {
          let e4;
          if ("string" == typeof t2.full)
            e4 = t2.full;
          else if ("dctypes:Image" === t2.full["@type"])
            e4 = { id: t2.full["@id"], type: "Image" };
          else {
            if ("sc:Canvas" !== t2.full["@type"])
              throw new Error(`Unsupported source type on annotation: ${t2.full["@type"]}`);
            e4 = { id: t2.full["@id"], type: "Canvas" };
          }
          return { type: "SpecificResource", source: e4, selector: G2(t2.selector) };
        }
        return encodeURI(t2["@id"]).trim();
      }(e2.on), body: Array.isArray(e2.resource) ? e2.resource.map(B2) : B2(e2.resource) });
    }], contentResource: [B2], choice: [function(e2) {
      const t2 = [];
      return e2.default && "rdf:nil" !== e2.default && t2.push(e2.default), e2.item && "rdf:nil" !== e2.item && t2.push(...e2.item), { ...E2(e2), ...F2(e2), items: t2 };
    }], range: [function(e2) {
      return U2({ ...E2(e2), ...F2(e2), ...N2(e2), items: e2.members });
    }], service: [function(e2) {
      const { "@id": t2, "@type": i2, "@context": r2, profile: n2, ...s2 } = e2, a2 = {};
      return t2 && (a2["@id"] = t2), a2["@type"] = M2(e2), "unknown" === a2["@type"] && (r2 && r2.length && (a2["@context"] = r2), a2["@type"] = "Service"), n2 && (a2.profile = T2(n2)), U2({ ...a2, ...s2 });
    }], layer: [function(e2) {
      return U2({ ...E2(e2), ...F2(e2), ...N2(e2) });
    }] });
    function G2(e2) {
      if ((Array.isArray(e2["@type"]) && e2["@type"].includes("oa:SvgSelector") || "oa:SvgSelector" == e2["@type"]) && ("chars" in e2 || "value" in e2))
        return { type: "SvgSelector", value: "chars" in e2 ? e2.chars : e2.value };
      if ("oa:FragmentSelector" === e2["@type"])
        return { type: "FragmentSelector", value: e2.value };
      if ("oa:Choice" === e2["@type"])
        return [G2(e2.default), ...(Array.isArray(e2.item) ? e2.item : [e2.item]).map(G2)];
      if ("iiif:ImageApiSelector" == e2["@type"])
        return { type: "ImageApiSelector", region: "region" in e2 ? e2.region : void 0, rotation: "rotation" in e2 ? e2.rotation : void 0 };
      throw new Error(`Unsupported selector type: ${e2["@type"]}`);
    }
    const J2 = function(e2) {
      return e2 && e2["@context"] && ("http://iiif.io/api/presentation/2/context.json" === e2["@context"] || -1 !== e2["@context"].indexOf("http://iiif.io/api/presentation/2/context.json") || "http://www.shared-canvas.org/ns/context.json" === e2["@context"]) || "http://iiif.io/api/image/2/context.json" === e2["@context"] ? z2.traverseUnknown(e2) : e2;
    };
    e.upgrade = J2, Object.defineProperties(e, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
  });
})(index_umd, index_umd.exports);
function fetchAndUpgrade(input, init) {
  return fetch(input, init).then((resp) => resp.json()).then(index_umd.exports.upgrade);
}
const ReactContext = createContext({
  currentResourceId: void 0,
  error: null,
  isLoaded: false,
  orientation: "vertical",
  resource: void 0
});
function useThumbnailPanelContext() {
  return useContext(ReactContext);
}
function IIIFContentProvider(props) {
  const { currentResourceId, orientation, onLoad, overrides } = props;
  const [resource, setResource] = useState();
  const mergedResource = useMemo(() => {
    if (!overrides || !resource) {
      return resource;
    }
    const values = Object.fromEntries(Object.entries(overrides).filter(([, value2]) => typeof value2 !== "undefined"));
    return Object.assign({}, resource, values || {});
  }, [resource, ...Object.values(overrides || {})]);
  const [error, setError] = useState(false);
  useEffect(() => {
    if (!props.resource) {
      return;
    }
    if (typeof props.resource === "string") {
      const controller = new AbortController();
      fetchAndUpgrade(props.resource, { signal: controller.signal }).then((json) => {
        setResource(json);
        if (onLoad) {
          onLoad(json);
        }
      }).catch((e) => setError(e));
      return () => {
        controller.abort();
      };
    } else {
      setResource(props.resource);
      if (onLoad) {
        onLoad(props.resource);
      }
    }
  }, [props.resource]);
  const value = useMemo(() => {
    return { resource: mergedResource, error, isLoaded: !!resource, orientation, currentResourceId };
  }, [mergedResource, error, orientation, currentResourceId]);
  return /* @__PURE__ */ jsx(ReactContext.Provider, { value, children: props.children });
}
const Thumbnail = ({ item, onClick }) => {
  const helper = createThumbnailHelper();
  const [thumb, setThumb] = useState();
  const { resource } = useThumbnailPanelContext();
  const thumbnailSize = (resource == null ? void 0 : resource.thumbnailSize) || 200;
  useEffect(() => {
    async function getData() {
      const response = await helper.getBestThumbnailAtSize(item, {
        width: thumbnailSize,
        height: thumbnailSize
      });
      setThumb(response.best);
    }
    item && getData();
  }, [item]);
  return /* @__PURE__ */ jsx(
    "button",
    {
      "data-testid": "thumbnail-wrapper",
      onClick: () => {
        if (onClick) {
          onClick(resource == null ? void 0 : resource.id);
        }
      },
      children: /* @__PURE__ */ jsxs("figure", { children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            style: {
              backgroundColor: "#f0f0f0",
              width: `${thumbnailSize}px`,
              height: `${thumbnailSize}px`,
              objectFit: "contain"
            },
            children: thumb ? /* @__PURE__ */ jsx("img", { src: thumb.id, alt: "", style: { maxWidth: "100%", maxHeight: "100%" }, "data-testid": "thumb-image" }) : /* @__PURE__ */ jsx(Fragment, {})
          }
        ),
        /* @__PURE__ */ jsx("figcaption", { children: item.id })
      ] })
    }
  );
};
const style = "";
const metaState = {};
const compatVault = {
  get(nonRef) {
    return nonRef;
  },
  setMetaValue([id, meta, key], value) {
    const oldValue = compatVault.getResourceMeta(id, meta);
    const oldValueItem = oldValue ? oldValue[key] : void 0;
    const newValue = typeof value === "function" ? value(oldValueItem) : value;
    metaState[id] = {
      ...metaState[id] || {},
      [meta]: {
        ...(metaState[id] || {})[meta] || {},
        [key]: newValue
      }
    };
  },
  getResourceMeta: (resource, metaKey) => {
    const resourceMeta = metaState[resource];
    if (!resourceMeta) {
      return void 0;
    }
    if (!metaKey) {
      return resourceMeta;
    }
    return resourceMeta[metaKey];
  }
};
function findAllCanvasesInRange(vault, range) {
  const found = [];
  for (const inner of range.items) {
    if (inner.type === "Canvas") {
      if (inner.id.indexOf("#") !== -1) {
        found.push({ id: inner.id.split("#")[0], type: "Canvas" });
      } else {
        found.push(inner);
      }
    }
    if (inner.type === "Range") {
      found.push(...findAllCanvasesInRange(vault, vault.get(inner)));
    }
    if (inner.type === "SpecificResource") {
      const sourceId = typeof inner.source === "string" ? inner.source : inner.source.id;
      found.push({ id: sourceId, type: "Canvas" });
    }
  }
  return found;
}
function createSequenceHelper(vault = compatVault) {
  return {
    getVisibleCanvasesFromCanvasId: (manifestOrRange, canvasId, preventPaged = false) => getVisibleCanvasesFromCanvasId(vault, manifestOrRange, canvasId, preventPaged),
    getManifestSequence: (manifestOrRange, options = {}) => getManifestSequence(vault, manifestOrRange, options)
  };
}
function getVisibleCanvasesFromCanvasId(vault = compatVault, manifestOrRange, canvasId, preventPaged = false) {
  const behavior = manifestOrRange.behavior || [];
  const fullCanvas = canvasId ? vault.get(canvasId) : null;
  if (!fullCanvas) {
    return [];
  }
  const canvasBehavior = fullCanvas.behavior || [];
  const isPaged = preventPaged ? false : behavior.includes("paged");
  const isContinuous = isPaged ? false : behavior.includes("continuous");
  const isIndividuals = isPaged || isContinuous ? false : behavior.includes("individuals");
  const isCanvasFacingPages = canvasBehavior.includes("facing-pages");
  const isCanvasNonPaged = canvasBehavior.includes("non-paged");
  if (isCanvasFacingPages || isCanvasNonPaged || isIndividuals || preventPaged) {
    return [{ id: fullCanvas.id, type: "Canvas" }];
  }
  const [manifestItems, ordering] = getManifestSequence(vault, manifestOrRange);
  if (isContinuous) {
    return manifestItems;
  }
  const canvasIndex = manifestItems.findIndex((r) => r.id === canvasId);
  if (canvasIndex === -1) {
    return [];
  }
  for (const indexes of ordering) {
    if (indexes.includes(canvasIndex)) {
      return indexes.map((index) => manifestItems[index]);
    }
  }
  return [{ id: fullCanvas.id, type: "Canvas" }];
}
function getManifestSequence(vault = compatVault, manifestOrRange, { disablePaging, skipNonPaged } = {}) {
  const behavior = manifestOrRange.behavior || [];
  const isPaged = behavior.includes("paged");
  const isContinuous = isPaged ? false : behavior.includes("continuous");
  const isIndividuals = isPaged || isContinuous ? false : behavior.includes("individuals");
  const manifestItems = manifestOrRange.type === "Manifest" ? manifestOrRange.items : findAllCanvasesInRange(vault, manifestOrRange);
  if (isContinuous) {
    return [manifestItems, [manifestItems.map((_2, index) => index)]];
  }
  if (isIndividuals || !isPaged || disablePaging) {
    return [manifestItems, manifestItems.map((_2, index) => [index])];
  }
  const ordering = [];
  let currentOrdering = [];
  const flush = () => {
    if (currentOrdering.length) {
      ordering.push([...currentOrdering]);
      currentOrdering = [];
    }
  };
  let offset = 0;
  let flushNextPaged = false;
  for (let i = 0; i < manifestItems.length; i++) {
    const canvas = vault.get(manifestItems[i]);
    const canvasBehavior = canvas.behavior || [];
    if (canvasBehavior.includes("non-paged")) {
      if (i === offset) {
        offset++;
      }
      if (!skipNonPaged) {
        flush();
        ordering.push([i]);
        flush();
      }
      continue;
    }
    if (i === offset || canvasBehavior.includes("facing-pages")) {
      if (currentOrdering.length) {
        flushNextPaged = true;
      }
      flush();
      ordering.push([i]);
      flush();
      continue;
    }
    currentOrdering.push(i);
    if (flushNextPaged) {
      flush();
      flushNextPaged = false;
      continue;
    }
    if (currentOrdering.length > 1) {
      flush();
    }
  }
  if (currentOrdering.length) {
    flush();
  }
  return [manifestItems, ordering];
}
const Items = ({ onResourceChanged }) => {
  const { resource, isLoaded, currentResourceId, orientation } = useThumbnailPanelContext();
  const sequence = createSequenceHelper();
  const [items, seq] = useMemo(() => {
    if (!resource) {
      return [];
    }
    const [items2, seq2] = sequence.getManifestSequence(resource, {
      disablePaging: false
    });
    return [items2, seq2];
  }, [resource]);
  if (!isLoaded || !resource || !seq || !items) {
    return /* @__PURE__ */ jsx(Fragment, {});
  }
  const dir = resource.viewingDirection === "left-to-right" ? "ltr" : "rtl";
  const onKeyDown = (e) => {
    var _a, _b;
    if (e.keyCode === 40) {
      const next = 1 + Number(e.currentTarget.getAttribute("data-index"));
      const nextElement = (_b = (_a = e.currentTarget.parentElement) == null ? void 0 : _a.parentElement) == null ? void 0 : _b.querySelector(
        `div[data-index="${next}"]`
      );
      nextElement.focus();
    }
  };
  const isCurrentGroup = (groupIdx) => {
    const foundIdx = seq.findIndex((group) => {
      const resourceIdx = items.findIndex((resource2) => {
        return resource2.id === currentResourceId;
      });
      return group.includes(resourceIdx);
    });
    return foundIdx === groupIdx;
  };
  return /* @__PURE__ */ jsxs("div", { dir, "thumbnail-panel": "", "data-orientation": orientation, children: [
    /* @__PURE__ */ jsx("h3", { children: getValue(resource.label) }),
    /* @__PURE__ */ jsx("span", { children: orientation }),
    seq.map((group, groupIdx) => {
      return /* @__PURE__ */ jsx("div", { "thumbnail-group": "", "data-selected": isCurrentGroup(groupIdx), children: group.map((idx, itemIdx) => {
        var _a;
        return /* @__PURE__ */ jsx(
          "div",
          {
            "thumbnail-item": "",
            tabIndex: idx === 0 ? 0 : -1,
            "data-index": idx,
            onKeyDown,
            "data-selected": currentResourceId === ((_a = items[idx]) == null ? void 0 : _a.id),
            children: /* @__PURE__ */ jsx(
              Thumbnail,
              {
                item: items[idx],
                onClick: () => {
                  var _a2;
                  if (onResourceChanged) {
                    onResourceChanged((_a2 = items[idx]) == null ? void 0 : _a2.id);
                  }
                }
              },
              idx
            )
          },
          itemIdx
        );
      }) }, groupIdx);
    })
  ] });
};
const ThumbnailPanel = ({
  iiifContent,
  orientation,
  currentResourceId,
  overrides,
  onLoad,
  onResourceChanged
}) => {
  return /* @__PURE__ */ jsx(
    IIIFContentProvider,
    {
      resource: iiifContent,
      overrides,
      orientation,
      currentResourceId,
      onLoad,
      children: /* @__PURE__ */ jsx(Items, { onResourceChanged })
    }
  );
};
export {
  Thumbnail,
  ThumbnailPanel
};
//# sourceMappingURL=index.mjs.map
