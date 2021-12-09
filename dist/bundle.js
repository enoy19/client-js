(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function (global){(function (){
const openRpcClientJs = require('../build/index.js');

global.window.openRpcClientJs = openRpcClientJs;
}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../build/index.js":6}],2:[function(require,module,exports){
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * OpenRPC Client JS is a browser-compatible JSON-RPC client with multiple transports and
 * multiple request managers to enable features like round-robin or fallback-by-position.
 *
 * @example
 * ```typescript
 * import { RequestManager, HTTPTransport, Client } from '@open-rpc/client-js';
 * const transport = new HTTPTransport('http://localhost:3333');
 * const client = new Client(new RequestManager([transport]));
 * const result = await client.request({method: 'addition', params: [2, 2]});
 * // => { jsonrpc: '2.0', id: 1, result: 4 }
 * ```
 *
 */
var Client = /** @class */ (function () {
    function Client(requestManager) {
        this.requestManager = requestManager;
    }
    /**
     * Initiates [[RequestManager.startBatch]] in order to build a batch call.
     *
     * Subsequent calls to [[Client.request]] will be added to the batch. Once [[Client.stopBatch]] is called, the
     * promises for the [[Client.request]] will then be resolved.  If the [[RequestManager]] already has a batch in
     * progress, this method is a noop.
     *
     * @example
     * myClient.startBatch();
     * myClient.request({method: "foo", params: ["bar"]}).then(() => console.log('foobar'));
     * myClient.request({method: "foo", params: ["baz"]}).then(() => console.log('foobaz'));
     * myClient.stopBatch();
     */
    Client.prototype.startBatch = function () {
        return this.requestManager.startBatch();
    };
    /**
     * Initiates [[RequestManager.stopBatch]] in order to finalize and send the batch to the underlying transport.
     *
     * [[Client.stopBatch]] will send the [[Client.request]] calls made since the last [[Client.startBatch]] call. For
     * that reason, [[Client.startBatch]] MUST be called before [[Client.stopBatch]].
     *
     * @example
     * myClient.startBatch();
     * myClient.request({method: "foo", params: ["bar"]}).then(() => console.log('foobar'));
     * myClient.request({method: "foo", params: ["baz"]}).then(() => console.log('foobaz'));
     * myClient.stopBatch();
     */
    Client.prototype.stopBatch = function () {
        return this.requestManager.stopBatch();
    };
    /**
     * A JSON-RPC call is represented by sending a Request object to a Server.
     *
     * @param requestObject.method A String containing the name of the method to be invoked. Method names that begin with the word rpc
     * followed by a period character (U+002E or ASCII 46) are reserved for rpc-internal methods and extensions and
     * MUST NOT be used for anything else.
     * @param requestObject.params A Structured value that holds the parameter values to be used during the invocation of the method.
     *
     * @example
     * myClient.request({method: "foo", params: ["bar"]}).then(() => console.log('foobar'));
     */
    Client.prototype.request = function (requestObject, timeout) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.requestManager.connectPromise) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.requestManager.connectPromise];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/, this.requestManager.request(requestObject, false, timeout)];
                }
            });
        });
    };
    Client.prototype.notify = function (requestObject) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.requestManager.connectPromise) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.requestManager.connectPromise];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/, this.requestManager.request(requestObject, true, null)];
                }
            });
        });
    };
    Client.prototype.onNotification = function (callback) {
        this.requestManager.requestChannel.addListener("notification", callback);
    };
    Client.prototype.onError = function (callback) {
        this.requestManager.requestChannel.addListener("error", callback);
    };
    /**
     * Close connection
     */
    Client.prototype.close = function () {
        this.requestManager.close();
    };
    return Client;
}());
exports.default = Client;

},{}],3:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertJSONToRPCError = exports.JSONRPCError = exports.ERR_UNKNOWN = exports.ERR_MISSIING_ID = exports.ERR_TIMEOUT = void 0;
exports.ERR_TIMEOUT = 7777;
exports.ERR_MISSIING_ID = 7878;
exports.ERR_UNKNOWN = 7979;
var JSONRPCError = /** @class */ (function (_super) {
    __extends(JSONRPCError, _super);
    function JSONRPCError(message, code, data) {
        var _newTarget = this.constructor;
        var _this = _super.call(this, message) || this;
        _this.message = message;
        _this.code = code;
        _this.data = data;
        Object.setPrototypeOf(_this, _newTarget.prototype); // restore prototype chain: see https://github.com/open-rpc/client-js/issues/209
        return _this;
    }
    return JSONRPCError;
}(Error));
exports.JSONRPCError = JSONRPCError;
exports.convertJSONToRPCError = function (payload) {
    if (payload.error) {
        var _a = payload.error, message = _a.message, code = _a.code, data = _a.data;
        return new JSONRPCError(message, code, data);
    }
    return new JSONRPCError("Unknown error", exports.ERR_UNKNOWN, payload);
};

},{}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNotifications = exports.getBatchRequests = exports.isNotification = void 0;
exports.isNotification = function (data) {
    return (data.request.id === undefined || data.request.id === null);
};
exports.getBatchRequests = function (data) {
    if (data instanceof Array) {
        return data.filter(function (datum) {
            var id = datum.request.request.id;
            return id !== null && id !== undefined;
        }).map(function (batchRequest) {
            return batchRequest.request;
        });
    }
    return [];
};
exports.getNotifications = function (data) {
    if (data instanceof Array) {
        return data.filter(function (datum) {
            return exports.isNotification(datum.request);
        }).map(function (batchRequest) {
            return batchRequest.request;
        });
    }
    if (exports.isNotification(data)) {
        return [data];
    }
    return [];
};

},{}],5:[function(require,module,exports){
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultNextRequest = void 0;
var events_1 = require("events");
exports.defaultNextRequest = function () {
    var lastId = -1;
    return function () { return ++lastId; };
};
/*
** Naive Request Manager, only use 1st transport.
 * A more complex request manager could try each transport.
 * If a transport fails, or times out, move on to the next.
 */
var RequestManager = /** @class */ (function () {
    function RequestManager(transports, nextID) {
        if (nextID === void 0) { nextID = exports.defaultNextRequest(); }
        this.batch = [];
        this.batchStarted = false;
        this.lastId = -1;
        this.transports = transports;
        this.requests = {};
        this.connectPromise = this.connect();
        this.requestChannel = new events_1.EventEmitter();
        this.nextID = nextID;
    }
    RequestManager.prototype.connect = function () {
        var _this = this;
        return Promise.all(this.transports.map(function (transport) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        transport.subscribe("error", this.handleError.bind(this));
                        transport.subscribe("notification", this.handleNotification.bind(this));
                        return [4 /*yield*/, transport.connect()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); }));
    };
    RequestManager.prototype.getPrimaryTransport = function () {
        return this.transports[0];
    };
    RequestManager.prototype.request = function (requestObject, notification, timeout) {
        if (notification === void 0) { notification = false; }
        return __awaiter(this, void 0, void 0, function () {
            var internalID, id, payload, result;
            var _this = this;
            return __generator(this, function (_a) {
                internalID = this.nextID().toString();
                id = notification ? null : internalID;
                payload = { request: this.makeRequest(requestObject.method, requestObject.params || [], id), internalID: internalID };
                if (this.batchStarted) {
                    result = new Promise(function (resolve, reject) {
                        _this.batch.push({ resolve: resolve, reject: reject, request: payload });
                    });
                    return [2 /*return*/, result];
                }
                return [2 /*return*/, this.getPrimaryTransport().sendData(payload, timeout)];
            });
        });
    };
    RequestManager.prototype.close = function () {
        this.requestChannel.removeAllListeners();
        this.transports.forEach(function (transport) {
            transport.unsubscribe();
            transport.close();
        });
    };
    /**
     * Begins a batch call by setting the [[RequestManager.batchStarted]] flag to `true`.
     *
     * [[RequestManager.batch]] is a singleton - only one batch can exist at a given time, per [[RequestManager]].
     *
     */
    RequestManager.prototype.startBatch = function () {
        this.batchStarted = true;
    };
    RequestManager.prototype.stopBatch = function () {
        if (this.batchStarted === false) {
            throw new Error("cannot end that which has never started");
        }
        if (this.batch.length === 0) {
            this.batchStarted = false;
            return;
        }
        this.getPrimaryTransport().sendData(this.batch);
        this.batch = [];
        this.batchStarted = false;
    };
    RequestManager.prototype.makeRequest = function (method, params, id) {
        if (id) {
            return { jsonrpc: "2.0", id: id, method: method, params: params };
        }
        return { jsonrpc: "2.0", method: method, params: params };
    };
    RequestManager.prototype.handleError = function (data) {
        this.requestChannel.emit("error", data);
    };
    RequestManager.prototype.handleNotification = function (data) {
        this.requestChannel.emit("notification", data);
    };
    return RequestManager;
}());
exports.default = RequestManager;

},{"events":14}],6:[function(require,module,exports){
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostMessageIframeTransport = exports.PostMessageWindowTransport = exports.JSONRPCError = exports.WebSocketTransport = exports.EventEmitterTransport = exports.HTTPTransport = exports.RequestManager = exports.Client = void 0;
var RequestManager_1 = __importDefault(require("./RequestManager"));
exports.RequestManager = RequestManager_1.default;
var EventEmitterTransport_1 = __importDefault(require("./transports/EventEmitterTransport"));
exports.EventEmitterTransport = EventEmitterTransport_1.default;
var HTTPTransport_1 = __importDefault(require("./transports/HTTPTransport"));
exports.HTTPTransport = HTTPTransport_1.default;
var WebSocketTransport_1 = __importDefault(require("./transports/WebSocketTransport"));
exports.WebSocketTransport = WebSocketTransport_1.default;
var PostMessageWindowTransport_1 = __importDefault(require("./transports/PostMessageWindowTransport"));
exports.PostMessageWindowTransport = PostMessageWindowTransport_1.default;
var PostMessageIframeTransport_1 = __importDefault(require("./transports/PostMessageIframeTransport"));
exports.PostMessageIframeTransport = PostMessageIframeTransport_1.default;
var Error_1 = require("./Error");
Object.defineProperty(exports, "JSONRPCError", { enumerable: true, get: function () { return Error_1.JSONRPCError; } });
var Client_1 = __importDefault(require("./Client"));
exports.Client = Client_1.default;
exports.default = Client_1.default;

},{"./Client":2,"./Error":3,"./RequestManager":5,"./transports/EventEmitterTransport":7,"./transports/HTTPTransport":8,"./transports/PostMessageIframeTransport":9,"./transports/PostMessageWindowTransport":10,"./transports/WebSocketTransport":13}],7:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Transport_1 = require("./Transport");
var Request_1 = require("../Request");
var Error_1 = require("../Error");
var EventEmitterTransport = /** @class */ (function (_super) {
    __extends(EventEmitterTransport, _super);
    function EventEmitterTransport(destEmitter, reqUri, resUri) {
        var _this = _super.call(this) || this;
        _this.connection = destEmitter;
        _this.reqUri = reqUri;
        _this.resUri = resUri;
        return _this;
    }
    EventEmitterTransport.prototype.connect = function () {
        var _this = this;
        this.connection.on(this.resUri, function (data) {
            _this.transportRequestManager.resolveResponse(data);
        });
        return Promise.resolve();
    };
    EventEmitterTransport.prototype.sendData = function (data, timeout) {
        if (timeout === void 0) { timeout = null; }
        var prom = this.transportRequestManager.addRequest(data, timeout);
        var notifications = Request_1.getNotifications(data);
        var parsedData = this.parseData(data);
        try {
            this.connection.emit(this.reqUri, parsedData);
            this.transportRequestManager.settlePendingRequest(notifications);
            return prom;
        }
        catch (e) {
            var responseErr = new Error_1.JSONRPCError(e.message, Error_1.ERR_UNKNOWN, e);
            this.transportRequestManager.settlePendingRequest(notifications, responseErr);
            return Promise.reject(responseErr);
        }
    };
    EventEmitterTransport.prototype.close = function () {
        this.connection.removeAllListeners();
    };
    return EventEmitterTransport;
}(Transport_1.Transport));
exports.default = EventEmitterTransport;

},{"../Error":3,"../Request":4,"./Transport":11}],8:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTTPTransport = void 0;
var isomorphic_fetch_1 = __importDefault(require("isomorphic-fetch"));
var Transport_1 = require("./Transport");
var Request_1 = require("../Request");
var Error_1 = require("../Error");
var HTTPTransport = /** @class */ (function (_super) {
    __extends(HTTPTransport, _super);
    function HTTPTransport(uri, options) {
        var _this = _super.call(this) || this;
        _this.onlyNotifications = function (data) {
            if (data instanceof Array) {
                return data.every(function (datum) { return datum.request.request.id === null || datum.request.request.id === undefined; });
            }
            return (data.request.id === null || data.request.id === undefined);
        };
        _this.uri = uri;
        _this.credentials = options && options.credentials;
        _this.headers = HTTPTransport.setupHeaders(options && options.headers);
        _this.fetchFunction = options === null || options === void 0 ? void 0 : options.fetchFunction;
        return _this;
    }
    HTTPTransport.prototype.connect = function () {
        return Promise.resolve();
    };
    HTTPTransport.prototype.sendData = function (data, timeout) {
        if (timeout === void 0) { timeout = null; }
        return __awaiter(this, void 0, void 0, function () {
            var prom, notifications, batch, effectiveFetch, result, body, responseErr, e_1, responseErr;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        prom = this.transportRequestManager.addRequest(data, timeout);
                        notifications = Request_1.getNotifications(data);
                        batch = Request_1.getBatchRequests(data);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        effectiveFetch = this.fetchFunction || isomorphic_fetch_1.default;
                        return [4 /*yield*/, effectiveFetch(this.uri, {
                                method: "POST",
                                headers: this.headers,
                                body: JSON.stringify(this.parseData(data)),
                                credentials: this.credentials,
                            })];
                    case 2:
                        result = _a.sent();
                        // requirements are that notifications are successfully sent
                        this.transportRequestManager.settlePendingRequest(notifications);
                        if (this.onlyNotifications(data)) {
                            return [2 /*return*/, Promise.resolve()];
                        }
                        return [4 /*yield*/, result.text()];
                    case 3:
                        body = _a.sent();
                        responseErr = this.transportRequestManager.resolveResponse(body);
                        if (responseErr) {
                            // requirements are that batch requuests are successfully resolved
                            // this ensures that individual requests within the batch request are settled
                            this.transportRequestManager.settlePendingRequest(batch, responseErr);
                            return [2 /*return*/, Promise.reject(responseErr)];
                        }
                        return [3 /*break*/, 5];
                    case 4:
                        e_1 = _a.sent();
                        responseErr = new Error_1.JSONRPCError(e_1.message, Error_1.ERR_UNKNOWN, e_1);
                        this.transportRequestManager.settlePendingRequest(notifications, responseErr);
                        this.transportRequestManager.settlePendingRequest(Request_1.getBatchRequests(data), responseErr);
                        return [2 /*return*/, Promise.reject(responseErr)];
                    case 5: return [2 /*return*/, prom];
                }
            });
        });
    };
    // tslint:disable-next-line:no-empty
    HTTPTransport.prototype.close = function () { };
    HTTPTransport.setupHeaders = function (headerOptions) {
        var headers = new Headers(headerOptions);
        // Overwrite header options to ensure correct content type.
        headers.set("Content-Type", "application/json");
        return headers;
    };
    return HTTPTransport;
}(Transport_1.Transport));
exports.HTTPTransport = HTTPTransport;
exports.default = HTTPTransport;

},{"../Error":3,"../Request":4,"./Transport":11,"isomorphic-fetch":15}],9:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var Transport_1 = require("./Transport");
var Request_1 = require("../Request");
var PostMessageIframeTransport = /** @class */ (function (_super) {
    __extends(PostMessageIframeTransport, _super);
    function PostMessageIframeTransport(uri) {
        var _this = _super.call(this) || this;
        _this.messageHandler = function (ev) {
            _this.transportRequestManager.resolveResponse(JSON.stringify(ev.data));
        };
        _this.uri = uri;
        _this.postMessageID = "post-message-transport-" + Math.random();
        return _this;
    }
    PostMessageIframeTransport.prototype.createWindow = function (uri) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var frame;
            var iframe = document.createElement("iframe");
            iframe.setAttribute("id", _this.postMessageID);
            iframe.setAttribute("width", "0px");
            iframe.setAttribute("height", "0px");
            iframe.setAttribute("style", "visiblity:hidden;border:none;outline:none;");
            iframe.addEventListener("load", function () {
                resolve(frame);
            });
            iframe.setAttribute("src", uri);
            window.document.body.appendChild(iframe);
            frame = iframe.contentWindow;
        });
    };
    PostMessageIframeTransport.prototype.connect = function () {
        var _this = this;
        var urlRegex = /^(http|https):\/\/.*$/;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!urlRegex.test(this.uri)) {
                            reject(new Error("Bad URI"));
                        }
                        _a = this;
                        return [4 /*yield*/, this.createWindow(this.uri)];
                    case 1:
                        _a.frame = _b.sent();
                        window.addEventListener("message", this.messageHandler);
                        resolve();
                        return [2 /*return*/];
                }
            });
        }); });
    };
    PostMessageIframeTransport.prototype.sendData = function (data, timeout) {
        if (timeout === void 0) { timeout = 5000; }
        return __awaiter(this, void 0, void 0, function () {
            var prom, notifications;
            return __generator(this, function (_a) {
                prom = this.transportRequestManager.addRequest(data, null);
                notifications = Request_1.getNotifications(data);
                if (this.frame) {
                    this.frame.postMessage(data.request, "*");
                    this.transportRequestManager.settlePendingRequest(notifications);
                }
                return [2 /*return*/, prom];
            });
        });
    };
    PostMessageIframeTransport.prototype.close = function () {
        var el = document.getElementById(this.postMessageID);
        el === null || el === void 0 ? void 0 : el.remove();
        window.removeEventListener("message", this.messageHandler);
    };
    return PostMessageIframeTransport;
}(Transport_1.Transport));
exports.default = PostMessageIframeTransport;

},{"../Request":4,"./Transport":11}],10:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var Transport_1 = require("./Transport");
var Request_1 = require("../Request");
var openPopup = function (url) {
    var width = 400;
    var height = window.screen.height;
    var left = 0;
    var top = 0;
    return window.open(url, "inspector:popup", "left=" + left + ",top=" + top + ",width=" + width + ",height=" + height + ",resizable,scrollbars=yes,status=1");
};
var PostMessageTransport = /** @class */ (function (_super) {
    __extends(PostMessageTransport, _super);
    function PostMessageTransport(uri) {
        var _this = _super.call(this) || this;
        _this.messageHandler = function (ev) {
            _this.transportRequestManager.resolveResponse(JSON.stringify(ev.data));
        };
        _this.uri = uri;
        _this.postMessageID = "post-message-transport-" + Math.random();
        return _this;
    }
    PostMessageTransport.prototype.createWindow = function (uri) {
        return new Promise(function (resolve, reject) {
            var frame;
            frame = openPopup(uri);
            setTimeout(function () {
                resolve(frame);
            }, 3000);
        });
    };
    PostMessageTransport.prototype.connect = function () {
        var _this = this;
        var urlRegex = /^(http|https):\/\/.*$/;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!urlRegex.test(this.uri)) {
                            reject(new Error("Bad URI"));
                        }
                        _a = this;
                        return [4 /*yield*/, this.createWindow(this.uri)];
                    case 1:
                        _a.frame = _b.sent();
                        window.addEventListener("message", this.messageHandler);
                        resolve();
                        return [2 /*return*/];
                }
            });
        }); });
    };
    PostMessageTransport.prototype.sendData = function (data, timeout) {
        if (timeout === void 0) { timeout = 5000; }
        return __awaiter(this, void 0, void 0, function () {
            var prom, notifications;
            return __generator(this, function (_a) {
                prom = this.transportRequestManager.addRequest(data, null);
                notifications = Request_1.getNotifications(data);
                if (this.frame) {
                    this.frame.postMessage(data.request, this.uri);
                    this.transportRequestManager.settlePendingRequest(notifications);
                }
                return [2 /*return*/, prom];
            });
        });
    };
    PostMessageTransport.prototype.close = function () {
        if (this.frame) {
            window.removeEventListener("message", this.messageHandler);
            this.frame.close();
        }
    };
    return PostMessageTransport;
}(Transport_1.Transport));
exports.default = PostMessageTransport;

},{"../Request":4,"./Transport":11}],11:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transport = void 0;
var TransportRequestManager_1 = require("./TransportRequestManager");
var Transport = /** @class */ (function () {
    function Transport() {
        this.transportRequestManager = new TransportRequestManager_1.TransportRequestManager();
        // add a noop for the error event to not require handling the error event
        // tslint:disable-next-line:no-empty
        this.transportRequestManager.transportEventChannel.on("error", function () { });
    }
    Transport.prototype.subscribe = function (event, handler) {
        this.transportRequestManager.transportEventChannel.addListener(event, handler);
    };
    Transport.prototype.unsubscribe = function (event, handler) {
        if (!event) {
            return this.transportRequestManager.transportEventChannel.removeAllListeners();
        }
        if (event && handler) {
            this.transportRequestManager.transportEventChannel.removeListener(event, handler);
        }
    };
    Transport.prototype.parseData = function (data) {
        if (data instanceof Array) {
            return data.map(function (batch) { return batch.request.request; });
        }
        return data.request;
    };
    return Transport;
}());
exports.Transport = Transport;

},{"./TransportRequestManager":12}],12:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransportRequestManager = void 0;
var events_1 = require("events");
var Error_1 = require("../Error");
var TransportRequestManager = /** @class */ (function () {
    function TransportRequestManager() {
        this.pendingRequest = {};
        this.pendingBatchRequest = {};
        this.transportEventChannel = new events_1.EventEmitter();
    }
    TransportRequestManager.prototype.addRequest = function (data, timeout) {
        this.transportEventChannel.emit("pending", data);
        if (data instanceof Array) {
            this.addBatchReq(data, timeout);
            return Promise.resolve();
        }
        return this.addReq(data.internalID, timeout);
    };
    TransportRequestManager.prototype.settlePendingRequest = function (request, error) {
        var _this = this;
        request.forEach(function (req) {
            var resolver = _this.pendingRequest[req.internalID];
            delete _this.pendingBatchRequest[req.internalID];
            if (resolver === undefined) {
                return;
            }
            if (error) {
                resolver.reject(error);
                return;
            }
            resolver.resolve();
            // Notifications have no response and should clear their own pending requests
            if (req.request.id === null || req.request.id === undefined) {
                delete _this.pendingRequest[req.internalID];
            }
        });
    };
    TransportRequestManager.prototype.isPendingRequest = function (id) {
        return this.pendingRequest.hasOwnProperty(id);
    };
    TransportRequestManager.prototype.resolveResponse = function (payload, emitError) {
        if (emitError === void 0) { emitError = true; }
        var data = payload;
        try {
            data = JSON.parse(payload);
            if (this.checkJSONRPC(data) === false) {
                return; // ignore messages that are not conforming to JSON-RPC
            }
            if (data instanceof Array) {
                return this.resolveBatch(data, emitError);
            }
            return this.resolveRes(data, emitError);
        }
        catch (e) {
            var err = new Error_1.JSONRPCError("Bad response format", Error_1.ERR_UNKNOWN, payload);
            if (emitError) {
                this.transportEventChannel.emit("error", err);
            }
            return err;
        }
    };
    TransportRequestManager.prototype.addBatchReq = function (batches, timeout) {
        var _this = this;
        batches.forEach(function (batch) {
            var resolve = batch.resolve, reject = batch.reject;
            var internalID = batch.request.internalID;
            _this.pendingBatchRequest[internalID] = true;
            _this.pendingRequest[internalID] = { resolve: resolve, reject: reject };
        });
        return Promise.resolve();
    };
    TransportRequestManager.prototype.addReq = function (id, timeout) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            if (timeout !== null && timeout) {
                _this.setRequestTimeout(id, timeout, reject);
            }
            _this.pendingRequest[id] = { resolve: resolve, reject: reject };
        });
    };
    TransportRequestManager.prototype.checkJSONRPC = function (data) {
        var payload = [data];
        if (data instanceof Array) {
            payload = data;
        }
        return payload.every(function (datum) { return (datum.result !== undefined || datum.error !== undefined || datum.method !== undefined); });
    };
    TransportRequestManager.prototype.processResult = function (payload, prom) {
        if (payload.error) {
            var err = Error_1.convertJSONToRPCError(payload);
            prom.reject(err);
            return;
        }
        prom.resolve(payload.result);
    };
    TransportRequestManager.prototype.resolveBatch = function (payload, emitError) {
        var _this = this;
        var results = payload.map(function (datum) {
            return _this.resolveRes(datum, emitError);
        });
        var errors = results.filter(function (result) { return result; });
        if (errors.length > 0) {
            return errors[0];
        }
        return undefined;
    };
    TransportRequestManager.prototype.resolveRes = function (data, emitError) {
        var id = data.id, error = data.error;
        var status = this.pendingRequest[id];
        if (status) {
            delete this.pendingRequest[id];
            this.processResult(data, status);
            this.transportEventChannel.emit("response", data);
            return;
        }
        if (id === undefined && error === undefined) {
            this.transportEventChannel.emit("notification", data);
            return;
        }
        var err;
        if (error) {
            err = Error_1.convertJSONToRPCError(data);
        }
        if (emitError && error && err) {
            this.transportEventChannel.emit("error", err);
        }
        return err;
    };
    TransportRequestManager.prototype.setRequestTimeout = function (id, timeout, reject) {
        var _this = this;
        setTimeout(function () {
            delete _this.pendingRequest[id];
            reject(new Error_1.JSONRPCError("Request timeout request took longer than " + timeout + " ms to resolve", Error_1.ERR_TIMEOUT));
        }, timeout);
    };
    return TransportRequestManager;
}());
exports.TransportRequestManager = TransportRequestManager;

},{"../Error":3,"events":14}],13:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var isomorphic_ws_1 = __importDefault(require("isomorphic-ws"));
var Transport_1 = require("./Transport");
var Request_1 = require("../Request");
var Error_1 = require("../Error");
var WebSocketTransport = /** @class */ (function (_super) {
    __extends(WebSocketTransport, _super);
    function WebSocketTransport(uri) {
        var _this = _super.call(this) || this;
        _this.uri = uri;
        _this.connection = new isomorphic_ws_1.default(uri);
        return _this;
    }
    WebSocketTransport.prototype.connect = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var cb = function () {
                _this.connection.removeEventListener("open", cb);
                resolve();
            };
            _this.connection.addEventListener("open", cb);
            _this.connection.addEventListener("message", function (message) {
                var data = message.data;
                _this.transportRequestManager.resolveResponse(data);
            });
        });
    };
    WebSocketTransport.prototype.sendData = function (data, timeout) {
        if (timeout === void 0) { timeout = 5000; }
        return __awaiter(this, void 0, void 0, function () {
            var prom, notifications;
            var _this = this;
            return __generator(this, function (_a) {
                prom = this.transportRequestManager.addRequest(data, timeout);
                notifications = Request_1.getNotifications(data);
                this.connection.send(JSON.stringify(this.parseData(data)), function (err) {
                    if (err) {
                        var jsonError = new Error_1.JSONRPCError(err.message, Error_1.ERR_UNKNOWN, err);
                        _this.transportRequestManager.settlePendingRequest(notifications, jsonError);
                        _this.transportRequestManager.settlePendingRequest(Request_1.getBatchRequests(data), jsonError);
                        prom = Promise.reject(jsonError);
                    }
                    _this.transportRequestManager.settlePendingRequest(notifications);
                });
                return [2 /*return*/, prom];
            });
        });
    };
    WebSocketTransport.prototype.close = function () {
        this.connection.close();
    };
    return WebSocketTransport;
}(Transport_1.Transport));
exports.default = WebSocketTransport;

},{"../Error":3,"../Request":4,"./Transport":11,"isomorphic-ws":16}],14:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

'use strict';

var R = typeof Reflect === 'object' ? Reflect : null
var ReflectApply = R && typeof R.apply === 'function'
  ? R.apply
  : function ReflectApply(target, receiver, args) {
    return Function.prototype.apply.call(target, receiver, args);
  }

var ReflectOwnKeys
if (R && typeof R.ownKeys === 'function') {
  ReflectOwnKeys = R.ownKeys
} else if (Object.getOwnPropertySymbols) {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target)
      .concat(Object.getOwnPropertySymbols(target));
  };
} else {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target);
  };
}

function ProcessEmitWarning(warning) {
  if (console && console.warn) console.warn(warning);
}

var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
  return value !== value;
}

function EventEmitter() {
  EventEmitter.init.call(this);
}
module.exports = EventEmitter;
module.exports.once = once;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;

function checkListener(listener) {
  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }
}

Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
  enumerable: true,
  get: function() {
    return defaultMaxListeners;
  },
  set: function(arg) {
    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
    }
    defaultMaxListeners = arg;
  }
});

EventEmitter.init = function() {

  if (this._events === undefined ||
      this._events === Object.getPrototypeOf(this)._events) {
    this._events = Object.create(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
};

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
  }
  this._maxListeners = n;
  return this;
};

function _getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return _getMaxListeners(this);
};

EventEmitter.prototype.emit = function emit(type) {
  var args = [];
  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
  var doError = (type === 'error');

  var events = this._events;
  if (events !== undefined)
    doError = (doError && events.error === undefined);
  else if (!doError)
    return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    var er;
    if (args.length > 0)
      er = args[0];
    if (er instanceof Error) {
      // Note: The comments on the `throw` lines are intentional, they show
      // up in Node's output if this results in an unhandled exception.
      throw er; // Unhandled 'error' event
    }
    // At least give some kind of context to the user
    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
    err.context = er;
    throw err; // Unhandled 'error' event
  }

  var handler = events[type];

  if (handler === undefined)
    return false;

  if (typeof handler === 'function') {
    ReflectApply(handler, this, args);
  } else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      ReflectApply(listeners[i], this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  checkListener(listener);

  events = target._events;
  if (events === undefined) {
    events = target._events = Object.create(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener !== undefined) {
      target.emit('newListener', type,
                  listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (existing === undefined) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] =
        prepend ? [listener, existing] : [existing, listener];
      // If we've already got an array, just append.
    } else if (prepend) {
      existing.unshift(listener);
    } else {
      existing.push(listener);
    }

    // Check for listener leak
    m = _getMaxListeners(target);
    if (m > 0 && existing.length > m && !existing.warned) {
      existing.warned = true;
      // No error code for this since it is a Warning
      // eslint-disable-next-line no-restricted-syntax
      var w = new Error('Possible EventEmitter memory leak detected. ' +
                          existing.length + ' ' + String(type) + ' listeners ' +
                          'added. Use emitter.setMaxListeners() to ' +
                          'increase limit');
      w.name = 'MaxListenersExceededWarning';
      w.emitter = target;
      w.type = type;
      w.count = existing.length;
      ProcessEmitWarning(w);
    }
  }

  return target;
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener =
    function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };

function onceWrapper() {
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    if (arguments.length === 0)
      return this.listener.call(this.target);
    return this.listener.apply(this.target, arguments);
  }
}

function _onceWrap(target, type, listener) {
  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
  var wrapped = onceWrapper.bind(state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  checkListener(listener);
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      checkListener(listener);
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      checkListener(listener);

      events = this._events;
      if (events === undefined)
        return this;

      list = events[type];
      if (list === undefined)
        return this;

      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = Object.create(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        position = -1;

        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }

        if (position < 0)
          return this;

        if (position === 0)
          list.shift();
        else {
          spliceOne(list, position);
        }

        if (list.length === 1)
          events[type] = list[0];

        if (events.removeListener !== undefined)
          this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };

EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
      var listeners, events, i;

      events = this._events;
      if (events === undefined)
        return this;

      // not listening for removeListener, no need to emit
      if (events.removeListener === undefined) {
        if (arguments.length === 0) {
          this._events = Object.create(null);
          this._eventsCount = 0;
        } else if (events[type] !== undefined) {
          if (--this._eventsCount === 0)
            this._events = Object.create(null);
          else
            delete events[type];
        }
        return this;
      }

      // emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        var keys = Object.keys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = Object.create(null);
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners !== undefined) {
        // LIFO order
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }

      return this;
    };

function _listeners(target, type, unwrap) {
  var events = target._events;

  if (events === undefined)
    return [];

  var evlistener = events[type];
  if (evlistener === undefined)
    return [];

  if (typeof evlistener === 'function')
    return unwrap ? [evlistener.listener || evlistener] : [evlistener];

  return unwrap ?
    unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}

EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};

EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};

EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;

  if (events !== undefined) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener !== undefined) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};

function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i)
    copy[i] = arr[i];
  return copy;
}

function spliceOne(list, index) {
  for (; index + 1 < list.length; index++)
    list[index] = list[index + 1];
  list.pop();
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}

function once(emitter, name) {
  return new Promise(function (resolve, reject) {
    function errorListener(err) {
      emitter.removeListener(name, resolver);
      reject(err);
    }

    function resolver() {
      if (typeof emitter.removeListener === 'function') {
        emitter.removeListener('error', errorListener);
      }
      resolve([].slice.call(arguments));
    };

    eventTargetAgnosticAddListener(emitter, name, resolver, { once: true });
    if (name !== 'error') {
      addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });
    }
  });
}

function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
  if (typeof emitter.on === 'function') {
    eventTargetAgnosticAddListener(emitter, 'error', handler, flags);
  }
}

function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
  if (typeof emitter.on === 'function') {
    if (flags.once) {
      emitter.once(name, listener);
    } else {
      emitter.on(name, listener);
    }
  } else if (typeof emitter.addEventListener === 'function') {
    // EventTarget does not have `error` event semantics like Node
    // EventEmitters, we do not listen for `error` events here.
    emitter.addEventListener(name, function wrapListener(arg) {
      // IE does not have builtin `{ once: true }` support so we
      // have to do it manually.
      if (flags.once) {
        emitter.removeEventListener(name, wrapListener);
      }
      listener(arg);
    });
  } else {
    throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
  }
}

},{}],15:[function(require,module,exports){
// the whatwg-fetch polyfill installs the fetch() function
// on the global object (window or self)
//
// Return that as the export for use in Webpack, Browserify etc.
require('whatwg-fetch');
module.exports = self.fetch.bind(self);

},{"whatwg-fetch":17}],16:[function(require,module,exports){
(function (global){(function (){
// https://github.com/maxogden/websocket-stream/blob/48dc3ddf943e5ada668c31ccd94e9186f02fafbd/ws-fallback.js

var ws = null

if (typeof WebSocket !== 'undefined') {
  ws = WebSocket
} else if (typeof MozWebSocket !== 'undefined') {
  ws = MozWebSocket
} else if (typeof global !== 'undefined') {
  ws = global.WebSocket || global.MozWebSocket
} else if (typeof window !== 'undefined') {
  ws = window.WebSocket || window.MozWebSocket
} else if (typeof self !== 'undefined') {
  ws = self.WebSocket || self.MozWebSocket
}

module.exports = ws

}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],17:[function(require,module,exports){
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (factory((global.WHATWGFetch = {})));
}(this, (function (exports) { 'use strict';

  var global =
    (typeof globalThis !== 'undefined' && globalThis) ||
    (typeof self !== 'undefined' && self) ||
    (typeof global !== 'undefined' && global);

  var support = {
    searchParams: 'URLSearchParams' in global,
    iterable: 'Symbol' in global && 'iterator' in Symbol,
    blob:
      'FileReader' in global &&
      'Blob' in global &&
      (function() {
        try {
          new Blob();
          return true
        } catch (e) {
          return false
        }
      })(),
    formData: 'FormData' in global,
    arrayBuffer: 'ArrayBuffer' in global
  };

  function isDataView(obj) {
    return obj && DataView.prototype.isPrototypeOf(obj)
  }

  if (support.arrayBuffer) {
    var viewClasses = [
      '[object Int8Array]',
      '[object Uint8Array]',
      '[object Uint8ClampedArray]',
      '[object Int16Array]',
      '[object Uint16Array]',
      '[object Int32Array]',
      '[object Uint32Array]',
      '[object Float32Array]',
      '[object Float64Array]'
    ];

    var isArrayBufferView =
      ArrayBuffer.isView ||
      function(obj) {
        return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1
      };
  }

  function normalizeName(name) {
    if (typeof name !== 'string') {
      name = String(name);
    }
    if (/[^a-z0-9\-#$%&'*+.^_`|~!]/i.test(name) || name === '') {
      throw new TypeError('Invalid character in header field name')
    }
    return name.toLowerCase()
  }

  function normalizeValue(value) {
    if (typeof value !== 'string') {
      value = String(value);
    }
    return value
  }

  // Build a destructive iterator for the value list
  function iteratorFor(items) {
    var iterator = {
      next: function() {
        var value = items.shift();
        return {done: value === undefined, value: value}
      }
    };

    if (support.iterable) {
      iterator[Symbol.iterator] = function() {
        return iterator
      };
    }

    return iterator
  }

  function Headers(headers) {
    this.map = {};

    if (headers instanceof Headers) {
      headers.forEach(function(value, name) {
        this.append(name, value);
      }, this);
    } else if (Array.isArray(headers)) {
      headers.forEach(function(header) {
        this.append(header[0], header[1]);
      }, this);
    } else if (headers) {
      Object.getOwnPropertyNames(headers).forEach(function(name) {
        this.append(name, headers[name]);
      }, this);
    }
  }

  Headers.prototype.append = function(name, value) {
    name = normalizeName(name);
    value = normalizeValue(value);
    var oldValue = this.map[name];
    this.map[name] = oldValue ? oldValue + ', ' + value : value;
  };

  Headers.prototype['delete'] = function(name) {
    delete this.map[normalizeName(name)];
  };

  Headers.prototype.get = function(name) {
    name = normalizeName(name);
    return this.has(name) ? this.map[name] : null
  };

  Headers.prototype.has = function(name) {
    return this.map.hasOwnProperty(normalizeName(name))
  };

  Headers.prototype.set = function(name, value) {
    this.map[normalizeName(name)] = normalizeValue(value);
  };

  Headers.prototype.forEach = function(callback, thisArg) {
    for (var name in this.map) {
      if (this.map.hasOwnProperty(name)) {
        callback.call(thisArg, this.map[name], name, this);
      }
    }
  };

  Headers.prototype.keys = function() {
    var items = [];
    this.forEach(function(value, name) {
      items.push(name);
    });
    return iteratorFor(items)
  };

  Headers.prototype.values = function() {
    var items = [];
    this.forEach(function(value) {
      items.push(value);
    });
    return iteratorFor(items)
  };

  Headers.prototype.entries = function() {
    var items = [];
    this.forEach(function(value, name) {
      items.push([name, value]);
    });
    return iteratorFor(items)
  };

  if (support.iterable) {
    Headers.prototype[Symbol.iterator] = Headers.prototype.entries;
  }

  function consumed(body) {
    if (body.bodyUsed) {
      return Promise.reject(new TypeError('Already read'))
    }
    body.bodyUsed = true;
  }

  function fileReaderReady(reader) {
    return new Promise(function(resolve, reject) {
      reader.onload = function() {
        resolve(reader.result);
      };
      reader.onerror = function() {
        reject(reader.error);
      };
    })
  }

  function readBlobAsArrayBuffer(blob) {
    var reader = new FileReader();
    var promise = fileReaderReady(reader);
    reader.readAsArrayBuffer(blob);
    return promise
  }

  function readBlobAsText(blob) {
    var reader = new FileReader();
    var promise = fileReaderReady(reader);
    reader.readAsText(blob);
    return promise
  }

  function readArrayBufferAsText(buf) {
    var view = new Uint8Array(buf);
    var chars = new Array(view.length);

    for (var i = 0; i < view.length; i++) {
      chars[i] = String.fromCharCode(view[i]);
    }
    return chars.join('')
  }

  function bufferClone(buf) {
    if (buf.slice) {
      return buf.slice(0)
    } else {
      var view = new Uint8Array(buf.byteLength);
      view.set(new Uint8Array(buf));
      return view.buffer
    }
  }

  function Body() {
    this.bodyUsed = false;

    this._initBody = function(body) {
      /*
        fetch-mock wraps the Response object in an ES6 Proxy to
        provide useful test harness features such as flush. However, on
        ES5 browsers without fetch or Proxy support pollyfills must be used;
        the proxy-pollyfill is unable to proxy an attribute unless it exists
        on the object before the Proxy is created. This change ensures
        Response.bodyUsed exists on the instance, while maintaining the
        semantic of setting Request.bodyUsed in the constructor before
        _initBody is called.
      */
      this.bodyUsed = this.bodyUsed;
      this._bodyInit = body;
      if (!body) {
        this._bodyText = '';
      } else if (typeof body === 'string') {
        this._bodyText = body;
      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
        this._bodyBlob = body;
      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
        this._bodyFormData = body;
      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
        this._bodyText = body.toString();
      } else if (support.arrayBuffer && support.blob && isDataView(body)) {
        this._bodyArrayBuffer = bufferClone(body.buffer);
        // IE 10-11 can't handle a DataView body.
        this._bodyInit = new Blob([this._bodyArrayBuffer]);
      } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
        this._bodyArrayBuffer = bufferClone(body);
      } else {
        this._bodyText = body = Object.prototype.toString.call(body);
      }

      if (!this.headers.get('content-type')) {
        if (typeof body === 'string') {
          this.headers.set('content-type', 'text/plain;charset=UTF-8');
        } else if (this._bodyBlob && this._bodyBlob.type) {
          this.headers.set('content-type', this._bodyBlob.type);
        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
        }
      }
    };

    if (support.blob) {
      this.blob = function() {
        var rejected = consumed(this);
        if (rejected) {
          return rejected
        }

        if (this._bodyBlob) {
          return Promise.resolve(this._bodyBlob)
        } else if (this._bodyArrayBuffer) {
          return Promise.resolve(new Blob([this._bodyArrayBuffer]))
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as blob')
        } else {
          return Promise.resolve(new Blob([this._bodyText]))
        }
      };

      this.arrayBuffer = function() {
        if (this._bodyArrayBuffer) {
          var isConsumed = consumed(this);
          if (isConsumed) {
            return isConsumed
          }
          if (ArrayBuffer.isView(this._bodyArrayBuffer)) {
            return Promise.resolve(
              this._bodyArrayBuffer.buffer.slice(
                this._bodyArrayBuffer.byteOffset,
                this._bodyArrayBuffer.byteOffset + this._bodyArrayBuffer.byteLength
              )
            )
          } else {
            return Promise.resolve(this._bodyArrayBuffer)
          }
        } else {
          return this.blob().then(readBlobAsArrayBuffer)
        }
      };
    }

    this.text = function() {
      var rejected = consumed(this);
      if (rejected) {
        return rejected
      }

      if (this._bodyBlob) {
        return readBlobAsText(this._bodyBlob)
      } else if (this._bodyArrayBuffer) {
        return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer))
      } else if (this._bodyFormData) {
        throw new Error('could not read FormData body as text')
      } else {
        return Promise.resolve(this._bodyText)
      }
    };

    if (support.formData) {
      this.formData = function() {
        return this.text().then(decode)
      };
    }

    this.json = function() {
      return this.text().then(JSON.parse)
    };

    return this
  }

  // HTTP methods whose capitalization should be normalized
  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT'];

  function normalizeMethod(method) {
    var upcased = method.toUpperCase();
    return methods.indexOf(upcased) > -1 ? upcased : method
  }

  function Request(input, options) {
    if (!(this instanceof Request)) {
      throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.')
    }

    options = options || {};
    var body = options.body;

    if (input instanceof Request) {
      if (input.bodyUsed) {
        throw new TypeError('Already read')
      }
      this.url = input.url;
      this.credentials = input.credentials;
      if (!options.headers) {
        this.headers = new Headers(input.headers);
      }
      this.method = input.method;
      this.mode = input.mode;
      this.signal = input.signal;
      if (!body && input._bodyInit != null) {
        body = input._bodyInit;
        input.bodyUsed = true;
      }
    } else {
      this.url = String(input);
    }

    this.credentials = options.credentials || this.credentials || 'same-origin';
    if (options.headers || !this.headers) {
      this.headers = new Headers(options.headers);
    }
    this.method = normalizeMethod(options.method || this.method || 'GET');
    this.mode = options.mode || this.mode || null;
    this.signal = options.signal || this.signal;
    this.referrer = null;

    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
      throw new TypeError('Body not allowed for GET or HEAD requests')
    }
    this._initBody(body);

    if (this.method === 'GET' || this.method === 'HEAD') {
      if (options.cache === 'no-store' || options.cache === 'no-cache') {
        // Search for a '_' parameter in the query string
        var reParamSearch = /([?&])_=[^&]*/;
        if (reParamSearch.test(this.url)) {
          // If it already exists then set the value with the current time
          this.url = this.url.replace(reParamSearch, '$1_=' + new Date().getTime());
        } else {
          // Otherwise add a new '_' parameter to the end with the current time
          var reQueryString = /\?/;
          this.url += (reQueryString.test(this.url) ? '&' : '?') + '_=' + new Date().getTime();
        }
      }
    }
  }

  Request.prototype.clone = function() {
    return new Request(this, {body: this._bodyInit})
  };

  function decode(body) {
    var form = new FormData();
    body
      .trim()
      .split('&')
      .forEach(function(bytes) {
        if (bytes) {
          var split = bytes.split('=');
          var name = split.shift().replace(/\+/g, ' ');
          var value = split.join('=').replace(/\+/g, ' ');
          form.append(decodeURIComponent(name), decodeURIComponent(value));
        }
      });
    return form
  }

  function parseHeaders(rawHeaders) {
    var headers = new Headers();
    // Replace instances of \r\n and \n followed by at least one space or horizontal tab with a space
    // https://tools.ietf.org/html/rfc7230#section-3.2
    var preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, ' ');
    preProcessedHeaders.split(/\r?\n/).forEach(function(line) {
      var parts = line.split(':');
      var key = parts.shift().trim();
      if (key) {
        var value = parts.join(':').trim();
        headers.append(key, value);
      }
    });
    return headers
  }

  Body.call(Request.prototype);

  function Response(bodyInit, options) {
    if (!(this instanceof Response)) {
      throw new TypeError('Please use the "new" operator, this DOM object constructor cannot be called as a function.')
    }
    if (!options) {
      options = {};
    }

    this.type = 'default';
    this.status = options.status === undefined ? 200 : options.status;
    this.ok = this.status >= 200 && this.status < 300;
    this.statusText = 'statusText' in options ? options.statusText : '';
    this.headers = new Headers(options.headers);
    this.url = options.url || '';
    this._initBody(bodyInit);
  }

  Body.call(Response.prototype);

  Response.prototype.clone = function() {
    return new Response(this._bodyInit, {
      status: this.status,
      statusText: this.statusText,
      headers: new Headers(this.headers),
      url: this.url
    })
  };

  Response.error = function() {
    var response = new Response(null, {status: 0, statusText: ''});
    response.type = 'error';
    return response
  };

  var redirectStatuses = [301, 302, 303, 307, 308];

  Response.redirect = function(url, status) {
    if (redirectStatuses.indexOf(status) === -1) {
      throw new RangeError('Invalid status code')
    }

    return new Response(null, {status: status, headers: {location: url}})
  };

  exports.DOMException = global.DOMException;
  try {
    new exports.DOMException();
  } catch (err) {
    exports.DOMException = function(message, name) {
      this.message = message;
      this.name = name;
      var error = Error(message);
      this.stack = error.stack;
    };
    exports.DOMException.prototype = Object.create(Error.prototype);
    exports.DOMException.prototype.constructor = exports.DOMException;
  }

  function fetch(input, init) {
    return new Promise(function(resolve, reject) {
      var request = new Request(input, init);

      if (request.signal && request.signal.aborted) {
        return reject(new exports.DOMException('Aborted', 'AbortError'))
      }

      var xhr = new XMLHttpRequest();

      function abortXhr() {
        xhr.abort();
      }

      xhr.onload = function() {
        var options = {
          status: xhr.status,
          statusText: xhr.statusText,
          headers: parseHeaders(xhr.getAllResponseHeaders() || '')
        };
        options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL');
        var body = 'response' in xhr ? xhr.response : xhr.responseText;
        setTimeout(function() {
          resolve(new Response(body, options));
        }, 0);
      };

      xhr.onerror = function() {
        setTimeout(function() {
          reject(new TypeError('Network request failed'));
        }, 0);
      };

      xhr.ontimeout = function() {
        setTimeout(function() {
          reject(new TypeError('Network request failed'));
        }, 0);
      };

      xhr.onabort = function() {
        setTimeout(function() {
          reject(new exports.DOMException('Aborted', 'AbortError'));
        }, 0);
      };

      function fixUrl(url) {
        try {
          return url === '' && global.location.href ? global.location.href : url
        } catch (e) {
          return url
        }
      }

      xhr.open(request.method, fixUrl(request.url), true);

      if (request.credentials === 'include') {
        xhr.withCredentials = true;
      } else if (request.credentials === 'omit') {
        xhr.withCredentials = false;
      }

      if ('responseType' in xhr) {
        if (support.blob) {
          xhr.responseType = 'blob';
        } else if (
          support.arrayBuffer &&
          request.headers.get('Content-Type') &&
          request.headers.get('Content-Type').indexOf('application/octet-stream') !== -1
        ) {
          xhr.responseType = 'arraybuffer';
        }
      }

      if (init && typeof init.headers === 'object' && !(init.headers instanceof Headers)) {
        Object.getOwnPropertyNames(init.headers).forEach(function(name) {
          xhr.setRequestHeader(name, normalizeValue(init.headers[name]));
        });
      } else {
        request.headers.forEach(function(value, name) {
          xhr.setRequestHeader(name, value);
        });
      }

      if (request.signal) {
        request.signal.addEventListener('abort', abortXhr);

        xhr.onreadystatechange = function() {
          // DONE (success or failure)
          if (xhr.readyState === 4) {
            request.signal.removeEventListener('abort', abortXhr);
          }
        };
      }

      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit);
    })
  }

  fetch.polyfill = true;

  if (!global.fetch) {
    global.fetch = fetch;
    global.Headers = Headers;
    global.Request = Request;
    global.Response = Response;
  }

  exports.Headers = Headers;
  exports.Request = Request;
  exports.Response = Response;
  exports.fetch = fetch;

  Object.defineProperty(exports, '__esModule', { value: true });

})));

},{}]},{},[1]);
