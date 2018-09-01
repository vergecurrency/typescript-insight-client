"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var node_fetch_1 = __importDefault(require("node-fetch"));
var socks_proxy_agent_1 = __importDefault(require("socks-proxy-agent"));
var InsightClient /*implements IClient*/ = /** @class */ (function () {
    function InsightClient(url, socksProxyUrl) {
        this.url = url;
        this.proxy = socksProxyUrl;
    }
    InsightClient.prototype.fetchRequest = function (url, options) {
        if (options === void 0) { options = {}; }
        if (this.proxy) {
            return node_fetch_1.default(url, __assign({}, options)).then(function (res) { return res.json(); });
        }
        return node_fetch_1.default(url, __assign({}, options, { agent: new socks_proxy_agent_1.default(this.proxy) })).then(function (res) { return res.json(); });
    };
    /*postTransaction(rawTransaction: number): Promise<number> {
  
    }*/
    InsightClient.prototype.getInfo = function () {
        return this.fetchRequest(this.url + "/status?q=getinfo");
    };
    return InsightClient;
}());
exports.InsightClient = InsightClient;
//# sourceMappingURL=InsightClient.js.map