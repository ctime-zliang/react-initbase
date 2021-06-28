/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "updates/" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		if (null) script.crossOrigin = null;
/******/ 		document.head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "updates/" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "9e0bdb9be6bd563f4522";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_selfInvalidated: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 			invalidate: function() {
/******/ 				this._selfInvalidated = true;
/******/ 				switch (hotStatus) {
/******/ 					case "idle":
/******/ 						hotUpdate = {};
/******/ 						hotUpdate[moduleId] = modules[moduleId];
/******/ 						hotSetStatus("ready");
/******/ 						break;
/******/ 					case "ready":
/******/ 						hotApplyInvalidatedModule(moduleId);
/******/ 						break;
/******/ 					case "prepare":
/******/ 					case "check":
/******/ 					case "dispose":
/******/ 					case "apply":
/******/ 						(hotQueuedInvalidatedModules =
/******/ 							hotQueuedInvalidatedModules || []).push(moduleId);
/******/ 						break;
/******/ 					default:
/******/ 						// ignore requests in error states
/******/ 						break;
/******/ 				}
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash, hotQueuedInvalidatedModules;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus(hotApplyInvalidatedModules() ? "ready" : "idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			for(var chunkId in installedChunks)
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/ 		return hotApplyInternal(options);
/******/ 	}
/******/
/******/ 	function hotApplyInternal(options) {
/******/ 		hotApplyInvalidatedModules();
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (
/******/ 					!module ||
/******/ 					(module.hot._selfAccepted && !module.hot._selfInvalidated)
/******/ 				)
/******/ 					continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted &&
/******/ 				// removed self-accepted modules should not be required
/******/ 				appliedUpdate[moduleId] !== warnUnexpectedRequire &&
/******/ 				// when called invalidate self-accepting is not possible
/******/ 				!installedModules[moduleId].hot._selfInvalidated
/******/ 			) {
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					parents: installedModules[moduleId].parents.slice(),
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		if (hotUpdateNewHash !== undefined) {
/******/ 			hotCurrentHash = hotUpdateNewHash;
/******/ 			hotUpdateNewHash = undefined;
/******/ 		}
/******/ 		hotUpdate = undefined;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = item.parents;
/******/ 			hotCurrentChildModule = moduleId;
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		if (hotQueuedInvalidatedModules) {
/******/ 			return hotApplyInternal(options).then(function(list) {
/******/ 				outdatedModules.forEach(function(moduleId) {
/******/ 					if (list.indexOf(moduleId) < 0) list.push(moduleId);
/******/ 				});
/******/ 				return list;
/******/ 			});
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	function hotApplyInvalidatedModules() {
/******/ 		if (hotQueuedInvalidatedModules) {
/******/ 			if (!hotUpdate) hotUpdate = {};
/******/ 			hotQueuedInvalidatedModules.forEach(hotApplyInvalidatedModule);
/******/ 			hotQueuedInvalidatedModules = undefined;
/******/ 			return true;
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApplyInvalidatedModule(moduleId) {
/******/ 		if (!Object.prototype.hasOwnProperty.call(hotUpdate, moduleId))
/******/ 			hotUpdate[moduleId] = modules[moduleId];
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"bundle": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([0,"vendor"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/index.js?!./node_modules/less-loader/dist/cjs.js!./src/app/asserts/style/reset.less":
/*!***********************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader??ref--4-oneOf-4-2!./node_modules/less-loader/dist/cjs.js!./src/app/asserts/style/reset.less ***!
  \***********************************************************************************************************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin

    if(true) {
      // 1624871785079
      var cssReload = __webpack_require__(/*! ./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js */ "./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js")(module.i, {"locals":false});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);
    }
  

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/index.js?!./node_modules/less-loader/dist/cjs.js!./src/app/modules/Componnet/PageContent/index.less":
/*!***************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader??ref--4-oneOf-4-2!./node_modules/less-loader/dist/cjs.js!./src/app/modules/Componnet/PageContent/index.less ***!
  \***************************************************************************************************************************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin

    if(true) {
      // 1624871791313
      var cssReload = __webpack_require__(/*! ./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js */ "./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js")(module.i, {"locals":false});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);
    }
  

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/index.js?!./node_modules/less-loader/dist/cjs.js!./src/app/modules/Componnet/PageFooter/index.less":
/*!**************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader??ref--4-oneOf-4-2!./node_modules/less-loader/dist/cjs.js!./src/app/modules/Componnet/PageFooter/index.less ***!
  \**************************************************************************************************************************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin

    if(true) {
      // 1624871786920
      var cssReload = __webpack_require__(/*! ./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js */ "./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js")(module.i, {"locals":false});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);
    }
  

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/index.js?!./node_modules/less-loader/dist/cjs.js!./src/app/modules/Componnet/PageHeader/index.less":
/*!**************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader??ref--4-oneOf-4-2!./node_modules/less-loader/dist/cjs.js!./src/app/modules/Componnet/PageHeader/index.less ***!
  \**************************************************************************************************************************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin

    if(true) {
      // 1624871788780
      var cssReload = __webpack_require__(/*! ./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js */ "./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js")(module.i, {"locals":false});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);
    }
  

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/index.js?!./node_modules/less-loader/dist/cjs.js!./src/app/modules/Componnet/SVGLoadingMask/index.less":
/*!******************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader??ref--4-oneOf-4-2!./node_modules/less-loader/dist/cjs.js!./src/app/modules/Componnet/SVGLoadingMask/index.less ***!
  \******************************************************************************************************************************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin

    if(true) {
      // 1624871787916
      var cssReload = __webpack_require__(/*! ./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js */ "./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js")(module.i, {"locals":false});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);
    }
  

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/index.js?!./node_modules/less-loader/dist/cjs.js!./src/app/pages/ErrorPage/index.less":
/*!*************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader??ref--4-oneOf-4-2!./node_modules/less-loader/dist/cjs.js!./src/app/pages/ErrorPage/index.less ***!
  \*************************************************************************************************************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin

    if(true) {
      // 1624871787868
      var cssReload = __webpack_require__(/*! ./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js */ "./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js")(module.i, {"locals":false});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);
    }
  

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/index.js?!./node_modules/less-loader/dist/cjs.js!./src/app/pages/RecordMgr/Detail/index.less":
/*!********************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader??ref--4-oneOf-4-2!./node_modules/less-loader/dist/cjs.js!./src/app/pages/RecordMgr/Detail/index.less ***!
  \********************************************************************************************************************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin

    if(true) {
      // 1624871789424
      var cssReload = __webpack_require__(/*! ./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js */ "./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js")(module.i, {"locals":false});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);
    }
  

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/index.js?!./node_modules/less-loader/dist/cjs.js!./src/app/pages/RecordMgr/List/index.less":
/*!******************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader??ref--4-oneOf-4-2!./node_modules/less-loader/dist/cjs.js!./src/app/pages/RecordMgr/List/index.less ***!
  \******************************************************************************************************************************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin

    if(true) {
      // 1624871789934
      var cssReload = __webpack_require__(/*! ./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js */ "./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js")(module.i, {"locals":false});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);
    }
  

/***/ }),

/***/ "./node_modules/moment/locale sync recursive ^\\.\\/.*$":
/*!**************************************************!*\
  !*** ./node_modules/moment/locale sync ^\.\/.*$ ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": "./node_modules/moment/locale/af.js",
	"./af.js": "./node_modules/moment/locale/af.js",
	"./ar": "./node_modules/moment/locale/ar.js",
	"./ar-dz": "./node_modules/moment/locale/ar-dz.js",
	"./ar-dz.js": "./node_modules/moment/locale/ar-dz.js",
	"./ar-kw": "./node_modules/moment/locale/ar-kw.js",
	"./ar-kw.js": "./node_modules/moment/locale/ar-kw.js",
	"./ar-ly": "./node_modules/moment/locale/ar-ly.js",
	"./ar-ly.js": "./node_modules/moment/locale/ar-ly.js",
	"./ar-ma": "./node_modules/moment/locale/ar-ma.js",
	"./ar-ma.js": "./node_modules/moment/locale/ar-ma.js",
	"./ar-sa": "./node_modules/moment/locale/ar-sa.js",
	"./ar-sa.js": "./node_modules/moment/locale/ar-sa.js",
	"./ar-tn": "./node_modules/moment/locale/ar-tn.js",
	"./ar-tn.js": "./node_modules/moment/locale/ar-tn.js",
	"./ar.js": "./node_modules/moment/locale/ar.js",
	"./az": "./node_modules/moment/locale/az.js",
	"./az.js": "./node_modules/moment/locale/az.js",
	"./be": "./node_modules/moment/locale/be.js",
	"./be.js": "./node_modules/moment/locale/be.js",
	"./bg": "./node_modules/moment/locale/bg.js",
	"./bg.js": "./node_modules/moment/locale/bg.js",
	"./bm": "./node_modules/moment/locale/bm.js",
	"./bm.js": "./node_modules/moment/locale/bm.js",
	"./bn": "./node_modules/moment/locale/bn.js",
	"./bn-bd": "./node_modules/moment/locale/bn-bd.js",
	"./bn-bd.js": "./node_modules/moment/locale/bn-bd.js",
	"./bn.js": "./node_modules/moment/locale/bn.js",
	"./bo": "./node_modules/moment/locale/bo.js",
	"./bo.js": "./node_modules/moment/locale/bo.js",
	"./br": "./node_modules/moment/locale/br.js",
	"./br.js": "./node_modules/moment/locale/br.js",
	"./bs": "./node_modules/moment/locale/bs.js",
	"./bs.js": "./node_modules/moment/locale/bs.js",
	"./ca": "./node_modules/moment/locale/ca.js",
	"./ca.js": "./node_modules/moment/locale/ca.js",
	"./cs": "./node_modules/moment/locale/cs.js",
	"./cs.js": "./node_modules/moment/locale/cs.js",
	"./cv": "./node_modules/moment/locale/cv.js",
	"./cv.js": "./node_modules/moment/locale/cv.js",
	"./cy": "./node_modules/moment/locale/cy.js",
	"./cy.js": "./node_modules/moment/locale/cy.js",
	"./da": "./node_modules/moment/locale/da.js",
	"./da.js": "./node_modules/moment/locale/da.js",
	"./de": "./node_modules/moment/locale/de.js",
	"./de-at": "./node_modules/moment/locale/de-at.js",
	"./de-at.js": "./node_modules/moment/locale/de-at.js",
	"./de-ch": "./node_modules/moment/locale/de-ch.js",
	"./de-ch.js": "./node_modules/moment/locale/de-ch.js",
	"./de.js": "./node_modules/moment/locale/de.js",
	"./dv": "./node_modules/moment/locale/dv.js",
	"./dv.js": "./node_modules/moment/locale/dv.js",
	"./el": "./node_modules/moment/locale/el.js",
	"./el.js": "./node_modules/moment/locale/el.js",
	"./en-au": "./node_modules/moment/locale/en-au.js",
	"./en-au.js": "./node_modules/moment/locale/en-au.js",
	"./en-ca": "./node_modules/moment/locale/en-ca.js",
	"./en-ca.js": "./node_modules/moment/locale/en-ca.js",
	"./en-gb": "./node_modules/moment/locale/en-gb.js",
	"./en-gb.js": "./node_modules/moment/locale/en-gb.js",
	"./en-ie": "./node_modules/moment/locale/en-ie.js",
	"./en-ie.js": "./node_modules/moment/locale/en-ie.js",
	"./en-il": "./node_modules/moment/locale/en-il.js",
	"./en-il.js": "./node_modules/moment/locale/en-il.js",
	"./en-in": "./node_modules/moment/locale/en-in.js",
	"./en-in.js": "./node_modules/moment/locale/en-in.js",
	"./en-nz": "./node_modules/moment/locale/en-nz.js",
	"./en-nz.js": "./node_modules/moment/locale/en-nz.js",
	"./en-sg": "./node_modules/moment/locale/en-sg.js",
	"./en-sg.js": "./node_modules/moment/locale/en-sg.js",
	"./eo": "./node_modules/moment/locale/eo.js",
	"./eo.js": "./node_modules/moment/locale/eo.js",
	"./es": "./node_modules/moment/locale/es.js",
	"./es-do": "./node_modules/moment/locale/es-do.js",
	"./es-do.js": "./node_modules/moment/locale/es-do.js",
	"./es-mx": "./node_modules/moment/locale/es-mx.js",
	"./es-mx.js": "./node_modules/moment/locale/es-mx.js",
	"./es-us": "./node_modules/moment/locale/es-us.js",
	"./es-us.js": "./node_modules/moment/locale/es-us.js",
	"./es.js": "./node_modules/moment/locale/es.js",
	"./et": "./node_modules/moment/locale/et.js",
	"./et.js": "./node_modules/moment/locale/et.js",
	"./eu": "./node_modules/moment/locale/eu.js",
	"./eu.js": "./node_modules/moment/locale/eu.js",
	"./fa": "./node_modules/moment/locale/fa.js",
	"./fa.js": "./node_modules/moment/locale/fa.js",
	"./fi": "./node_modules/moment/locale/fi.js",
	"./fi.js": "./node_modules/moment/locale/fi.js",
	"./fil": "./node_modules/moment/locale/fil.js",
	"./fil.js": "./node_modules/moment/locale/fil.js",
	"./fo": "./node_modules/moment/locale/fo.js",
	"./fo.js": "./node_modules/moment/locale/fo.js",
	"./fr": "./node_modules/moment/locale/fr.js",
	"./fr-ca": "./node_modules/moment/locale/fr-ca.js",
	"./fr-ca.js": "./node_modules/moment/locale/fr-ca.js",
	"./fr-ch": "./node_modules/moment/locale/fr-ch.js",
	"./fr-ch.js": "./node_modules/moment/locale/fr-ch.js",
	"./fr.js": "./node_modules/moment/locale/fr.js",
	"./fy": "./node_modules/moment/locale/fy.js",
	"./fy.js": "./node_modules/moment/locale/fy.js",
	"./ga": "./node_modules/moment/locale/ga.js",
	"./ga.js": "./node_modules/moment/locale/ga.js",
	"./gd": "./node_modules/moment/locale/gd.js",
	"./gd.js": "./node_modules/moment/locale/gd.js",
	"./gl": "./node_modules/moment/locale/gl.js",
	"./gl.js": "./node_modules/moment/locale/gl.js",
	"./gom-deva": "./node_modules/moment/locale/gom-deva.js",
	"./gom-deva.js": "./node_modules/moment/locale/gom-deva.js",
	"./gom-latn": "./node_modules/moment/locale/gom-latn.js",
	"./gom-latn.js": "./node_modules/moment/locale/gom-latn.js",
	"./gu": "./node_modules/moment/locale/gu.js",
	"./gu.js": "./node_modules/moment/locale/gu.js",
	"./he": "./node_modules/moment/locale/he.js",
	"./he.js": "./node_modules/moment/locale/he.js",
	"./hi": "./node_modules/moment/locale/hi.js",
	"./hi.js": "./node_modules/moment/locale/hi.js",
	"./hr": "./node_modules/moment/locale/hr.js",
	"./hr.js": "./node_modules/moment/locale/hr.js",
	"./hu": "./node_modules/moment/locale/hu.js",
	"./hu.js": "./node_modules/moment/locale/hu.js",
	"./hy-am": "./node_modules/moment/locale/hy-am.js",
	"./hy-am.js": "./node_modules/moment/locale/hy-am.js",
	"./id": "./node_modules/moment/locale/id.js",
	"./id.js": "./node_modules/moment/locale/id.js",
	"./is": "./node_modules/moment/locale/is.js",
	"./is.js": "./node_modules/moment/locale/is.js",
	"./it": "./node_modules/moment/locale/it.js",
	"./it-ch": "./node_modules/moment/locale/it-ch.js",
	"./it-ch.js": "./node_modules/moment/locale/it-ch.js",
	"./it.js": "./node_modules/moment/locale/it.js",
	"./ja": "./node_modules/moment/locale/ja.js",
	"./ja.js": "./node_modules/moment/locale/ja.js",
	"./jv": "./node_modules/moment/locale/jv.js",
	"./jv.js": "./node_modules/moment/locale/jv.js",
	"./ka": "./node_modules/moment/locale/ka.js",
	"./ka.js": "./node_modules/moment/locale/ka.js",
	"./kk": "./node_modules/moment/locale/kk.js",
	"./kk.js": "./node_modules/moment/locale/kk.js",
	"./km": "./node_modules/moment/locale/km.js",
	"./km.js": "./node_modules/moment/locale/km.js",
	"./kn": "./node_modules/moment/locale/kn.js",
	"./kn.js": "./node_modules/moment/locale/kn.js",
	"./ko": "./node_modules/moment/locale/ko.js",
	"./ko.js": "./node_modules/moment/locale/ko.js",
	"./ku": "./node_modules/moment/locale/ku.js",
	"./ku.js": "./node_modules/moment/locale/ku.js",
	"./ky": "./node_modules/moment/locale/ky.js",
	"./ky.js": "./node_modules/moment/locale/ky.js",
	"./lb": "./node_modules/moment/locale/lb.js",
	"./lb.js": "./node_modules/moment/locale/lb.js",
	"./lo": "./node_modules/moment/locale/lo.js",
	"./lo.js": "./node_modules/moment/locale/lo.js",
	"./lt": "./node_modules/moment/locale/lt.js",
	"./lt.js": "./node_modules/moment/locale/lt.js",
	"./lv": "./node_modules/moment/locale/lv.js",
	"./lv.js": "./node_modules/moment/locale/lv.js",
	"./me": "./node_modules/moment/locale/me.js",
	"./me.js": "./node_modules/moment/locale/me.js",
	"./mi": "./node_modules/moment/locale/mi.js",
	"./mi.js": "./node_modules/moment/locale/mi.js",
	"./mk": "./node_modules/moment/locale/mk.js",
	"./mk.js": "./node_modules/moment/locale/mk.js",
	"./ml": "./node_modules/moment/locale/ml.js",
	"./ml.js": "./node_modules/moment/locale/ml.js",
	"./mn": "./node_modules/moment/locale/mn.js",
	"./mn.js": "./node_modules/moment/locale/mn.js",
	"./mr": "./node_modules/moment/locale/mr.js",
	"./mr.js": "./node_modules/moment/locale/mr.js",
	"./ms": "./node_modules/moment/locale/ms.js",
	"./ms-my": "./node_modules/moment/locale/ms-my.js",
	"./ms-my.js": "./node_modules/moment/locale/ms-my.js",
	"./ms.js": "./node_modules/moment/locale/ms.js",
	"./mt": "./node_modules/moment/locale/mt.js",
	"./mt.js": "./node_modules/moment/locale/mt.js",
	"./my": "./node_modules/moment/locale/my.js",
	"./my.js": "./node_modules/moment/locale/my.js",
	"./nb": "./node_modules/moment/locale/nb.js",
	"./nb.js": "./node_modules/moment/locale/nb.js",
	"./ne": "./node_modules/moment/locale/ne.js",
	"./ne.js": "./node_modules/moment/locale/ne.js",
	"./nl": "./node_modules/moment/locale/nl.js",
	"./nl-be": "./node_modules/moment/locale/nl-be.js",
	"./nl-be.js": "./node_modules/moment/locale/nl-be.js",
	"./nl.js": "./node_modules/moment/locale/nl.js",
	"./nn": "./node_modules/moment/locale/nn.js",
	"./nn.js": "./node_modules/moment/locale/nn.js",
	"./oc-lnc": "./node_modules/moment/locale/oc-lnc.js",
	"./oc-lnc.js": "./node_modules/moment/locale/oc-lnc.js",
	"./pa-in": "./node_modules/moment/locale/pa-in.js",
	"./pa-in.js": "./node_modules/moment/locale/pa-in.js",
	"./pl": "./node_modules/moment/locale/pl.js",
	"./pl.js": "./node_modules/moment/locale/pl.js",
	"./pt": "./node_modules/moment/locale/pt.js",
	"./pt-br": "./node_modules/moment/locale/pt-br.js",
	"./pt-br.js": "./node_modules/moment/locale/pt-br.js",
	"./pt.js": "./node_modules/moment/locale/pt.js",
	"./ro": "./node_modules/moment/locale/ro.js",
	"./ro.js": "./node_modules/moment/locale/ro.js",
	"./ru": "./node_modules/moment/locale/ru.js",
	"./ru.js": "./node_modules/moment/locale/ru.js",
	"./sd": "./node_modules/moment/locale/sd.js",
	"./sd.js": "./node_modules/moment/locale/sd.js",
	"./se": "./node_modules/moment/locale/se.js",
	"./se.js": "./node_modules/moment/locale/se.js",
	"./si": "./node_modules/moment/locale/si.js",
	"./si.js": "./node_modules/moment/locale/si.js",
	"./sk": "./node_modules/moment/locale/sk.js",
	"./sk.js": "./node_modules/moment/locale/sk.js",
	"./sl": "./node_modules/moment/locale/sl.js",
	"./sl.js": "./node_modules/moment/locale/sl.js",
	"./sq": "./node_modules/moment/locale/sq.js",
	"./sq.js": "./node_modules/moment/locale/sq.js",
	"./sr": "./node_modules/moment/locale/sr.js",
	"./sr-cyrl": "./node_modules/moment/locale/sr-cyrl.js",
	"./sr-cyrl.js": "./node_modules/moment/locale/sr-cyrl.js",
	"./sr.js": "./node_modules/moment/locale/sr.js",
	"./ss": "./node_modules/moment/locale/ss.js",
	"./ss.js": "./node_modules/moment/locale/ss.js",
	"./sv": "./node_modules/moment/locale/sv.js",
	"./sv.js": "./node_modules/moment/locale/sv.js",
	"./sw": "./node_modules/moment/locale/sw.js",
	"./sw.js": "./node_modules/moment/locale/sw.js",
	"./ta": "./node_modules/moment/locale/ta.js",
	"./ta.js": "./node_modules/moment/locale/ta.js",
	"./te": "./node_modules/moment/locale/te.js",
	"./te.js": "./node_modules/moment/locale/te.js",
	"./tet": "./node_modules/moment/locale/tet.js",
	"./tet.js": "./node_modules/moment/locale/tet.js",
	"./tg": "./node_modules/moment/locale/tg.js",
	"./tg.js": "./node_modules/moment/locale/tg.js",
	"./th": "./node_modules/moment/locale/th.js",
	"./th.js": "./node_modules/moment/locale/th.js",
	"./tk": "./node_modules/moment/locale/tk.js",
	"./tk.js": "./node_modules/moment/locale/tk.js",
	"./tl-ph": "./node_modules/moment/locale/tl-ph.js",
	"./tl-ph.js": "./node_modules/moment/locale/tl-ph.js",
	"./tlh": "./node_modules/moment/locale/tlh.js",
	"./tlh.js": "./node_modules/moment/locale/tlh.js",
	"./tr": "./node_modules/moment/locale/tr.js",
	"./tr.js": "./node_modules/moment/locale/tr.js",
	"./tzl": "./node_modules/moment/locale/tzl.js",
	"./tzl.js": "./node_modules/moment/locale/tzl.js",
	"./tzm": "./node_modules/moment/locale/tzm.js",
	"./tzm-latn": "./node_modules/moment/locale/tzm-latn.js",
	"./tzm-latn.js": "./node_modules/moment/locale/tzm-latn.js",
	"./tzm.js": "./node_modules/moment/locale/tzm.js",
	"./ug-cn": "./node_modules/moment/locale/ug-cn.js",
	"./ug-cn.js": "./node_modules/moment/locale/ug-cn.js",
	"./uk": "./node_modules/moment/locale/uk.js",
	"./uk.js": "./node_modules/moment/locale/uk.js",
	"./ur": "./node_modules/moment/locale/ur.js",
	"./ur.js": "./node_modules/moment/locale/ur.js",
	"./uz": "./node_modules/moment/locale/uz.js",
	"./uz-latn": "./node_modules/moment/locale/uz-latn.js",
	"./uz-latn.js": "./node_modules/moment/locale/uz-latn.js",
	"./uz.js": "./node_modules/moment/locale/uz.js",
	"./vi": "./node_modules/moment/locale/vi.js",
	"./vi.js": "./node_modules/moment/locale/vi.js",
	"./x-pseudo": "./node_modules/moment/locale/x-pseudo.js",
	"./x-pseudo.js": "./node_modules/moment/locale/x-pseudo.js",
	"./yo": "./node_modules/moment/locale/yo.js",
	"./yo.js": "./node_modules/moment/locale/yo.js",
	"./zh-cn": "./node_modules/moment/locale/zh-cn.js",
	"./zh-cn.js": "./node_modules/moment/locale/zh-cn.js",
	"./zh-hk": "./node_modules/moment/locale/zh-hk.js",
	"./zh-hk.js": "./node_modules/moment/locale/zh-hk.js",
	"./zh-mo": "./node_modules/moment/locale/zh-mo.js",
	"./zh-mo.js": "./node_modules/moment/locale/zh-mo.js",
	"./zh-tw": "./node_modules/moment/locale/zh-tw.js",
	"./zh-tw.js": "./node_modules/moment/locale/zh-tw.js"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./node_modules/moment/locale sync recursive ^\\.\\/.*$";

/***/ }),

/***/ "./src/app/App.Client.tsx":
/*!********************************!*\
  !*** ./src/app/App.Client.tsx ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _reactHelmetAsync = __webpack_require__(/*! react-helmet-async */ "./node_modules/react-helmet-async/lib/index.module.js");

var _Root = _interopRequireDefault(__webpack_require__(/*! ./pages/Root */ "./src/app/pages/Root.tsx"));

var _log = _interopRequireDefault(__webpack_require__(/*! ./asserts/images/log.jpg */ "./src/app/asserts/images/log.jpg"));

__webpack_require__(/*! ./asserts/style/reset.less */ "./src/app/asserts/style/reset.less");

var App = function App() {
  var __root_id__ = Math.random();

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_reactHelmetAsync.Helmet, {
    link: [{
      rel: 'icon',
      type: 'image/jpg',
      href: _log.default
    }]
  }, /*#__PURE__*/_react.default.createElement("title", null, "React Application")), /*#__PURE__*/_react.default.createElement(_Root.default, {
    __RootProps__: {
      __root_id__: __root_id__
    }
  }));
};

var _default = App;
exports.default = _default;

/***/ }),

/***/ "./src/app/App.Server.tsx":
/*!********************************!*\
  !*** ./src/app/App.Server.tsx ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/extends.js"));

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _reactHelmetAsync = __webpack_require__(/*! react-helmet-async */ "./node_modules/react-helmet-async/lib/index.module.js");

var _Root = _interopRequireDefault(__webpack_require__(/*! ./pages/Root */ "./src/app/pages/Root.tsx"));

var _log = _interopRequireDefault(__webpack_require__(/*! ./asserts/images/log.jpg */ "./src/app/asserts/images/log.jpg"));

__webpack_require__(/*! ./asserts/style/reset.less */ "./src/app/asserts/style/reset.less");

var App = function App(props) {
  var __root_id__ = Math.random();

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_reactHelmetAsync.Helmet, {
    link: [{
      rel: 'icon',
      type: 'image/jpg',
      href: _log.default
    }]
  }, /*#__PURE__*/_react.default.createElement("title", null, "React SSR Application")), /*#__PURE__*/_react.default.createElement(_Root.default, (0, _extends2.default)({
    __RootProps__: {
      __root_id__: __root_id__
    }
  }, props)));
};

var _default = App;
exports.default = _default;

/***/ }),

/***/ "./src/app/asserts/images/log.jpg":
/*!****************************************!*\
  !*** ./src/app/asserts/images/log.jpg ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "images/log.3712be9d.jpg";

/***/ }),

/***/ "./src/app/asserts/style/reset.less":
/*!******************************************!*\
  !*** ./src/app/asserts/style/reset.less ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../../node_modules/mini-css-extract-plugin/dist/loader.js!../../../../node_modules/css-loader??ref--4-oneOf-4-2!../../../../node_modules/less-loader/dist/cjs.js!./reset.less */ "./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/index.js?!./node_modules/less-loader/dist/cjs.js!./src/app/asserts/style/reset.less");
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(/*! ../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(true) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept(/*! !../../../../node_modules/mini-css-extract-plugin/dist/loader.js!../../../../node_modules/css-loader??ref--4-oneOf-4-2!../../../../node_modules/less-loader/dist/cjs.js!./reset.less */ "./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/index.js?!./node_modules/less-loader/dist/cjs.js!./src/app/asserts/style/reset.less", function() {
			var newContent = __webpack_require__(/*! !../../../../node_modules/mini-css-extract-plugin/dist/loader.js!../../../../node_modules/css-loader??ref--4-oneOf-4-2!../../../../node_modules/less-loader/dist/cjs.js!./reset.less */ "./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/index.js?!./node_modules/less-loader/dist/cjs.js!./src/app/asserts/style/reset.less");
			if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./src/app/config/config.ts":
/*!**********************************!*\
  !*** ./src/app/config/config.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BaseConfig = void 0;
var BaseConfig = {
  remoteRequestUrlPrefix: function remoteRequestUrlPrefix() {
    if (false) {}

    return "http://127.0.0.1:12101/api";
  }
};
exports.BaseConfig = BaseConfig;

/***/ }),

/***/ "./src/app/model/record.ts":
/*!*********************************!*\
  !*** ./src/app/model/record.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fetchList = fetchList;
exports.addItem = addItem;
exports.delItems = delItems;
exports.fetchItem = fetchItem;
exports.updateItem = updateItem;

var _regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js"));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/asyncToGenerator.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js"));

var _axios = _interopRequireDefault(__webpack_require__(/*! axios */ "./node_modules/axios/index.js"));

var _utils = __webpack_require__(/*! ../utils/utils */ "./src/app/utils/utils.ts");

var _config = __webpack_require__(/*! ../config/config */ "./src/app/config/config.ts");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

_axios.default.defaults.withCredentials = true;
_axios.default.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

var remoteRequestUrlPrefix = _config.BaseConfig.remoteRequestUrlPrefix();

function filterList(list) {
  var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var pageIndex = +params.pageIndex || 1;
  var pageSize = +params.pageSize || 0;
  return list.map(function (item, index) {
    return _objectSpread(_objectSpread({}, item), {}, {
      isChcked: false,
      rowIndex: (pageIndex - 1) * pageSize + index + 1,
      key: item.id,
      isLoading: false
    });
  });
}

function fetchList(_x) {
  return _fetchList.apply(this, arguments);
}

function _fetchList() {
  _fetchList = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(data) {
    var axiosResponse, res, list;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _axios.default.get("".concat(remoteRequestUrlPrefix, "/record/fetchList"), {
              params: _objectSpread({}, data)
            });

          case 3:
            axiosResponse = _context.sent;
            res = axiosResponse.data;

            if (!(res.ret !== 0)) {
              _context.next = 7;
              break;
            }

            return _context.abrupt("return", Promise.reject((0, _utils.createDefaultErrorResponse)(res.ret, res.msg, res.data, res)));

          case 7:
            list = filterList(res.data.list, _objectSpread({}, data));
            return _context.abrupt("return", (0, _utils.createDefaultSuccessResponse)(_objectSpread(_objectSpread({}, res.data), {}, {
              list: list
            })));

          case 11:
            _context.prev = 11;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", Promise.reject((0, _utils.createDefaultErrorResponse)(-1, '[fetchList] Request Remote Error', null, _context.t0)));

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 11]]);
  }));
  return _fetchList.apply(this, arguments);
}

function addItem(_x2) {
  return _addItem.apply(this, arguments);
}

function _addItem() {
  _addItem = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(data) {
    var axiosResponse, res, itemData;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return (0, _utils.sleep)(500);

          case 3:
            _context2.next = 5;
            return _axios.default.post("".concat(remoteRequestUrlPrefix, "/record/addItem"), _objectSpread({}, data));

          case 5:
            axiosResponse = _context2.sent;
            res = axiosResponse.data;

            if (!(res.ret !== 0)) {
              _context2.next = 9;
              break;
            }

            return _context2.abrupt("return", Promise.reject((0, _utils.createDefaultErrorResponse)(res.ret, res.msg, res.data, res)));

          case 9:
            itemData = filterList([_objectSpread({}, res.data)])[0];
            return _context2.abrupt("return", (0, _utils.createDefaultSuccessResponse)(_objectSpread({}, itemData)));

          case 13:
            _context2.prev = 13;
            _context2.t0 = _context2["catch"](0);
            return _context2.abrupt("return", Promise.reject((0, _utils.createDefaultErrorResponse)(-1, '[addItem] Request Remote Error', null, _context2.t0)));

          case 16:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[0, 13]]);
  }));
  return _addItem.apply(this, arguments);
}

function delItems(_x3) {
  return _delItems.apply(this, arguments);
}

function _delItems() {
  _delItems = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3(data) {
    var axiosResponse, res;
    return _regenerator.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return (0, _utils.sleep)(500);

          case 3:
            _context3.next = 5;
            return _axios.default.post("".concat(remoteRequestUrlPrefix, "/record/delItems"), {
              ids: data
            });

          case 5:
            axiosResponse = _context3.sent;
            res = axiosResponse.data;

            if (!(res.ret !== 0)) {
              _context3.next = 9;
              break;
            }

            return _context3.abrupt("return", Promise.reject((0, _utils.createDefaultErrorResponse)(res.ret, res.msg, res.data, res)));

          case 9:
            return _context3.abrupt("return", (0, _utils.createDefaultSuccessResponse)(res.data));

          case 12:
            _context3.prev = 12;
            _context3.t0 = _context3["catch"](0);
            return _context3.abrupt("return", Promise.reject((0, _utils.createDefaultErrorResponse)(-1, '[delItems] Request Remote Error', null, _context3.t0)));

          case 15:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 12]]);
  }));
  return _delItems.apply(this, arguments);
}

function fetchItem(_x4) {
  return _fetchItem.apply(this, arguments);
}

function _fetchItem() {
  _fetchItem = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4(id) {
    var axiosResponse, res;
    return _regenerator.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return (0, _utils.sleep)(500);

          case 3:
            _context4.next = 5;
            return _axios.default.get("".concat(remoteRequestUrlPrefix, "/record/fetchItem"), {
              params: {
                id: id
              }
            });

          case 5:
            axiosResponse = _context4.sent;
            res = axiosResponse.data;

            if (!(res.ret !== 0)) {
              _context4.next = 9;
              break;
            }

            return _context4.abrupt("return", Promise.reject((0, _utils.createDefaultErrorResponse)(res.ret, res.msg, res.data, res)));

          case 9:
            return _context4.abrupt("return", (0, _utils.createDefaultSuccessResponse)(res.data));

          case 12:
            _context4.prev = 12;
            _context4.t0 = _context4["catch"](0);
            return _context4.abrupt("return", Promise.reject((0, _utils.createDefaultErrorResponse)(-1, '[fetchItem] Request Remote Error', null, _context4.t0)));

          case 15:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 12]]);
  }));
  return _fetchItem.apply(this, arguments);
}

function updateItem(_x5, _x6) {
  return _updateItem.apply(this, arguments);
}

function _updateItem() {
  _updateItem = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5(id, data) {
    var axiosResponse, res;
    return _regenerator.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return (0, _utils.sleep)(500);

          case 3:
            _context5.next = 5;
            return _axios.default.post("".concat(remoteRequestUrlPrefix, "/record/updateItem"), _objectSpread({
              id: id
            }, data));

          case 5:
            axiosResponse = _context5.sent;
            res = axiosResponse.data;

            if (!(res.ret !== 0)) {
              _context5.next = 9;
              break;
            }

            return _context5.abrupt("return", Promise.reject((0, _utils.createDefaultErrorResponse)(res.ret, res.msg, res.data, res)));

          case 9:
            return _context5.abrupt("return", (0, _utils.createDefaultSuccessResponse)(res.data));

          case 12:
            _context5.prev = 12;
            _context5.t0 = _context5["catch"](0);
            return _context5.abrupt("return", Promise.reject((0, _utils.createDefaultErrorResponse)(-1, '[updateItem] Request Remote Error', null, _context5.t0)));

          case 15:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 12]]);
  }));
  return _updateItem.apply(this, arguments);
}

/***/ }),

/***/ "./src/app/modules/Componnet/ClockCanvas/index.tsx":
/*!*********************************************************!*\
  !*** ./src/app/modules/Componnet/ClockCanvas/index.tsx ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

var _typeof = __webpack_require__(/*! @babel/runtime/helpers/typeof */ "./node_modules/@babel/runtime/helpers/typeof.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/taggedTemplateLiteral */ "./node_modules/@babel/runtime/helpers/taggedTemplateLiteral.js"));

var _react = _interopRequireWildcard(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _styledComponents = _interopRequireDefault(__webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js"));

var _clock = _interopRequireDefault(__webpack_require__(/*! @/utils/clock.canvas */ "./src/app/utils/clock.canvas.ts"));

var _templateObject;

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var Container = _styledComponents.default.section(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2.default)(["\n\tdisplay: flex;\n\tjustify-content: center;\n\talign-content: center;\n\talign-items: center;\n\tflex-wrap: nowrap;\n"])));

function ClockCanvasRoot() {
  var clockReference = (0, _react.useRef)(null);
  var canvsElementReference = (0, _react.useRef)(null);
  var canvasWidth = 400;
  var canvasHeight = 400;

  var renderClock = function renderClock() {
    clockReference.current = new _clock.default(canvsElementReference.current, {
      canvasWidth: canvasWidth,
      canvasHeight: canvasHeight,
      clockRadius: 165
    });
    clockReference.current.render();
  };

  (0, _react.useEffect)(function () {
    renderClock();
    return function () {
      clockReference.current && clockReference.current.cancel();
    };
  }, []);
  return /*#__PURE__*/_react.default.createElement(Container, null, /*#__PURE__*/_react.default.createElement("canvas", {
    ref: canvsElementReference,
    width: canvasWidth,
    height: canvasHeight
  }));
}

var _default = /*#__PURE__*/_react.default.memo(ClockCanvasRoot);

exports.default = _default;

/***/ }),

/***/ "./src/app/modules/Componnet/PageContent/index.less":
/*!**********************************************************!*\
  !*** ./src/app/modules/Componnet/PageContent/index.less ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../../../node_modules/mini-css-extract-plugin/dist/loader.js!../../../../../node_modules/css-loader??ref--4-oneOf-4-2!../../../../../node_modules/less-loader/dist/cjs.js!./index.less */ "./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/index.js?!./node_modules/less-loader/dist/cjs.js!./src/app/modules/Componnet/PageContent/index.less");
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(/*! ../../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(true) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept(/*! !../../../../../node_modules/mini-css-extract-plugin/dist/loader.js!../../../../../node_modules/css-loader??ref--4-oneOf-4-2!../../../../../node_modules/less-loader/dist/cjs.js!./index.less */ "./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/index.js?!./node_modules/less-loader/dist/cjs.js!./src/app/modules/Componnet/PageContent/index.less", function() {
			var newContent = __webpack_require__(/*! !../../../../../node_modules/mini-css-extract-plugin/dist/loader.js!../../../../../node_modules/css-loader??ref--4-oneOf-4-2!../../../../../node_modules/less-loader/dist/cjs.js!./index.less */ "./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/index.js?!./node_modules/less-loader/dist/cjs.js!./src/app/modules/Componnet/PageContent/index.less");
			if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./src/app/modules/Componnet/PageContent/index.tsx":
/*!*********************************************************!*\
  !*** ./src/app/modules/Componnet/PageContent/index.tsx ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

__webpack_require__(/*! ./index.less */ "./src/app/modules/Componnet/PageContent/index.less");

function PageContentRoot(props) {
  return /*#__PURE__*/_react.default.createElement("main", {
    className: "app-page-content",
    style: {
      height: "calc(100% - 95px)",
      minHeight: "calc(100vh - 95px)"
    }
  }, props.children);
}

var _default = /*#__PURE__*/_react.default.memo(PageContentRoot);

exports.default = _default;

/***/ }),

/***/ "./src/app/modules/Componnet/PageFooter/index.less":
/*!*********************************************************!*\
  !*** ./src/app/modules/Componnet/PageFooter/index.less ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../../../node_modules/mini-css-extract-plugin/dist/loader.js!../../../../../node_modules/css-loader??ref--4-oneOf-4-2!../../../../../node_modules/less-loader/dist/cjs.js!./index.less */ "./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/index.js?!./node_modules/less-loader/dist/cjs.js!./src/app/modules/Componnet/PageFooter/index.less");
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(/*! ../../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(true) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept(/*! !../../../../../node_modules/mini-css-extract-plugin/dist/loader.js!../../../../../node_modules/css-loader??ref--4-oneOf-4-2!../../../../../node_modules/less-loader/dist/cjs.js!./index.less */ "./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/index.js?!./node_modules/less-loader/dist/cjs.js!./src/app/modules/Componnet/PageFooter/index.less", function() {
			var newContent = __webpack_require__(/*! !../../../../../node_modules/mini-css-extract-plugin/dist/loader.js!../../../../../node_modules/css-loader??ref--4-oneOf-4-2!../../../../../node_modules/less-loader/dist/cjs.js!./index.less */ "./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/index.js?!./node_modules/less-loader/dist/cjs.js!./src/app/modules/Componnet/PageFooter/index.less");
			if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./src/app/modules/Componnet/PageFooter/index.tsx":
/*!********************************************************!*\
  !*** ./src/app/modules/Componnet/PageFooter/index.tsx ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

__webpack_require__(/*! antd/lib/layout/style */ "./node_modules/antd/lib/layout/style/index.js");

var _layout = _interopRequireDefault(__webpack_require__(/*! antd/lib/layout */ "./node_modules/antd/lib/layout/index.js"));

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _antd = __webpack_require__(/*! antd */ "./node_modules/antd/es/index.js");

__webpack_require__(/*! ./index.less */ "./src/app/modules/Componnet/PageFooter/index.less");

var Footer = _layout.default.Footer;

function PageFooterRoot() {
  return /*#__PURE__*/_react.default.createElement("footer", {
    className: "app-page-footer"
  }, /*#__PURE__*/_react.default.createElement(_layout.default, null, /*#__PURE__*/_react.default.createElement(Footer, null, "Copyright Admin \xA92010 - 2020")));
}

var _default = /*#__PURE__*/_react.default.memo(PageFooterRoot);

exports.default = _default;

/***/ }),

/***/ "./src/app/modules/Componnet/PageHeader/index.less":
/*!*********************************************************!*\
  !*** ./src/app/modules/Componnet/PageHeader/index.less ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../../../node_modules/mini-css-extract-plugin/dist/loader.js!../../../../../node_modules/css-loader??ref--4-oneOf-4-2!../../../../../node_modules/less-loader/dist/cjs.js!./index.less */ "./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/index.js?!./node_modules/less-loader/dist/cjs.js!./src/app/modules/Componnet/PageHeader/index.less");
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(/*! ../../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(true) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept(/*! !../../../../../node_modules/mini-css-extract-plugin/dist/loader.js!../../../../../node_modules/css-loader??ref--4-oneOf-4-2!../../../../../node_modules/less-loader/dist/cjs.js!./index.less */ "./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/index.js?!./node_modules/less-loader/dist/cjs.js!./src/app/modules/Componnet/PageHeader/index.less", function() {
			var newContent = __webpack_require__(/*! !../../../../../node_modules/mini-css-extract-plugin/dist/loader.js!../../../../../node_modules/css-loader??ref--4-oneOf-4-2!../../../../../node_modules/less-loader/dist/cjs.js!./index.less */ "./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/index.js?!./node_modules/less-loader/dist/cjs.js!./src/app/modules/Componnet/PageHeader/index.less");
			if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./src/app/modules/Componnet/PageHeader/index.tsx":
/*!********************************************************!*\
  !*** ./src/app/modules/Componnet/PageHeader/index.tsx ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

__webpack_require__(/*! antd/lib/layout/style */ "./node_modules/antd/lib/layout/style/index.js");

var _layout = _interopRequireDefault(__webpack_require__(/*! antd/lib/layout */ "./node_modules/antd/lib/layout/index.js"));

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _antd = __webpack_require__(/*! antd */ "./node_modules/antd/es/index.js");

__webpack_require__(/*! ./index.less */ "./src/app/modules/Componnet/PageHeader/index.less");

var _log = _interopRequireDefault(__webpack_require__(/*! @/asserts/images/log.jpg */ "./src/app/asserts/images/log.jpg"));

var Header = _layout.default.Header;

function PageHeaderRoot(props) {
  var userId = props.userId;
  return /*#__PURE__*/_react.default.createElement("header", {
    className: "app-page-header"
  }, /*#__PURE__*/_react.default.createElement(_layout.default, null, /*#__PURE__*/_react.default.createElement(Header, null, /*#__PURE__*/_react.default.createElement("a", {
    className: "log-link",
    href: "/",
    target: "_blank",
    title: "React App"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "protail-wrapper protail-wrapper-bgimg"
  }, /*#__PURE__*/_react.default.createElement("img", {
    className: "log-img",
    src: _log.default,
    title: "Logo Image"
  }), /*#__PURE__*/_react.default.createElement("span", {
    title: userId
  }, "React App"))))));
}

var _default = /*#__PURE__*/_react.default.memo(PageHeaderRoot);

exports.default = _default;

/***/ }),

/***/ "./src/app/modules/Componnet/SVGLoadingMask/index.less":
/*!*************************************************************!*\
  !*** ./src/app/modules/Componnet/SVGLoadingMask/index.less ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../../../node_modules/mini-css-extract-plugin/dist/loader.js!../../../../../node_modules/css-loader??ref--4-oneOf-4-2!../../../../../node_modules/less-loader/dist/cjs.js!./index.less */ "./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/index.js?!./node_modules/less-loader/dist/cjs.js!./src/app/modules/Componnet/SVGLoadingMask/index.less");
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(/*! ../../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(true) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept(/*! !../../../../../node_modules/mini-css-extract-plugin/dist/loader.js!../../../../../node_modules/css-loader??ref--4-oneOf-4-2!../../../../../node_modules/less-loader/dist/cjs.js!./index.less */ "./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/index.js?!./node_modules/less-loader/dist/cjs.js!./src/app/modules/Componnet/SVGLoadingMask/index.less", function() {
			var newContent = __webpack_require__(/*! !../../../../../node_modules/mini-css-extract-plugin/dist/loader.js!../../../../../node_modules/css-loader??ref--4-oneOf-4-2!../../../../../node_modules/less-loader/dist/cjs.js!./index.less */ "./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/index.js?!./node_modules/less-loader/dist/cjs.js!./src/app/modules/Componnet/SVGLoadingMask/index.less");
			if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./src/app/modules/Componnet/SVGLoadingMask/index.tsx":
/*!************************************************************!*\
  !*** ./src/app/modules/Componnet/SVGLoadingMask/index.tsx ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

var _typeof = __webpack_require__(/*! @babel/runtime/helpers/typeof */ "./node_modules/@babel/runtime/helpers/typeof.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/taggedTemplateLiteral */ "./node_modules/@babel/runtime/helpers/taggedTemplateLiteral.js"));

var _react = _interopRequireWildcard(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _styledComponents = _interopRequireDefault(__webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js"));

__webpack_require__(/*! ./index.less */ "./src/app/modules/Componnet/SVGLoadingMask/index.less");

var _templateObject, _templateObject2;

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var MaskContainer = _styledComponents.default.section(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2.default)(["\n\tposition: absolute;\n\tleft: 0;\n\ttop: 0;\n\tbottom: 0;\n\tright: 0;\n\tz-index: 99999;\n\tbackground-color: #ffffff;\n\topacity: 1;\n"])));

var MaskContent = _styledComponents.default.div(_templateObject2 || (_templateObject2 = (0, _taggedTemplateLiteral2.default)(["\n\twidth: 100%;\n\theight: 100%;\n\tdisplay: flex;\n\tjustify-content: center;\n\talign-items: center;\n\talign-content: center;\n"])));

function SVGLoadingMaskRoot(props) {
  var isHide = props.isHide,
      onHideEnd = props.onHideEnd;
  var contentElementReference = (0, _react.useRef)(null);
  (0, _react.useEffect)(function () {
    contentElementReference.current.addEventListener('animationend', function () {
      onHideEnd && onHideEnd();
    }, false);
  }, []);
  return /*#__PURE__*/_react.default.createElement(MaskContainer, {
    ref: contentElementReference,
    className: isHide ? 'loading-hidden-animate' : ''
  }, /*#__PURE__*/_react.default.createElement(MaskContent, null, /*#__PURE__*/_react.default.createElement("svg", {
    version: "1.1",
    xmlns: "http://www.w3.org/2000/svg",
    xmlnsXlink: "http://www.w3.org/1999/xlink",
    x: "0px",
    y: "0px",
    width: "24px",
    height: "30px",
    viewBox: "0 0 24 30",
    xmlSpace: "preserve"
  }, /*#__PURE__*/_react.default.createElement("rect", {
    x: "0",
    y: "10",
    width: "4",
    height: "10",
    fill: "#333",
    opacity: "0.2"
  }, /*#__PURE__*/_react.default.createElement("animate", {
    attributeName: "opacity",
    attributeType: "XML",
    values: "0.2; 1; .2",
    begin: "0s",
    dur: "0.6s",
    repeatCount: "indefinite"
  }), /*#__PURE__*/_react.default.createElement("animate", {
    attributeName: "height",
    attributeType: "XML",
    values: "10; 20; 10",
    begin: "0s",
    dur: "0.6s",
    repeatCount: "indefinite"
  }), /*#__PURE__*/_react.default.createElement("animate", {
    attributeName: "y",
    attributeType: "XML",
    values: "10; 5; 10",
    begin: "0s",
    dur: "0.6s",
    repeatCount: "indefinite"
  })), /*#__PURE__*/_react.default.createElement("rect", {
    x: "8",
    y: "10",
    width: "4",
    height: "10",
    fill: "#333",
    opacity: "0.2"
  }, /*#__PURE__*/_react.default.createElement("animate", {
    attributeName: "opacity",
    attributeType: "XML",
    values: "0.2; 1; .2",
    begin: "0.15s",
    dur: "0.6s",
    repeatCount: "indefinite"
  }), /*#__PURE__*/_react.default.createElement("animate", {
    attributeName: "height",
    attributeType: "XML",
    values: "10; 20; 10",
    begin: "0.15s",
    dur: "0.6s",
    repeatCount: "indefinite"
  }), /*#__PURE__*/_react.default.createElement("animate", {
    attributeName: "y",
    attributeType: "XML",
    values: "10; 5; 10",
    begin: "0.15s",
    dur: "0.6s",
    repeatCount: "indefinite"
  })), /*#__PURE__*/_react.default.createElement("rect", {
    x: "16",
    y: "10",
    width: "4",
    height: "10",
    fill: "#333",
    opacity: "0.2"
  }, /*#__PURE__*/_react.default.createElement("animate", {
    attributeName: "opacity",
    attributeType: "XML",
    values: "0.2; 1; .2",
    begin: "0.3s",
    dur: "0.6s",
    repeatCount: "indefinite"
  }), /*#__PURE__*/_react.default.createElement("animate", {
    attributeName: "height",
    attributeType: "XML",
    values: "10; 20; 10",
    begin: "0.3s",
    dur: "0.6s",
    repeatCount: "indefinite"
  }), /*#__PURE__*/_react.default.createElement("animate", {
    attributeName: "y",
    attributeType: "XML",
    values: "10; 5; 10",
    begin: "0.3s",
    dur: "0.6s",
    repeatCount: "indefinite"
  })))));
}

SVGLoadingMaskRoot.defaultProps = {
  isHide: false
};

var _default = /*#__PURE__*/_react.default.memo(SVGLoadingMaskRoot);

exports.default = _default;

/***/ }),

/***/ "./src/app/pages/ErrorPage/404.tsx":
/*!*****************************************!*\
  !*** ./src/app/pages/ErrorPage/404.tsx ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _reactRouterDom = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");

__webpack_require__(/*! ./index.less */ "./src/app/pages/ErrorPage/index.less");

function Error404PageRoot() {
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
    className: "error-404-content"
  }, "404 Not Found"), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      textAlign: 'center'
    }
  }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: "/"
  }, "Link to Home Page")));
}

var _default = /*#__PURE__*/_react.default.memo(Error404PageRoot);

exports.default = _default;

/***/ }),

/***/ "./src/app/pages/ErrorPage/index.less":
/*!********************************************!*\
  !*** ./src/app/pages/ErrorPage/index.less ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../../node_modules/mini-css-extract-plugin/dist/loader.js!../../../../node_modules/css-loader??ref--4-oneOf-4-2!../../../../node_modules/less-loader/dist/cjs.js!./index.less */ "./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/index.js?!./node_modules/less-loader/dist/cjs.js!./src/app/pages/ErrorPage/index.less");
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(/*! ../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(true) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept(/*! !../../../../node_modules/mini-css-extract-plugin/dist/loader.js!../../../../node_modules/css-loader??ref--4-oneOf-4-2!../../../../node_modules/less-loader/dist/cjs.js!./index.less */ "./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/index.js?!./node_modules/less-loader/dist/cjs.js!./src/app/pages/ErrorPage/index.less", function() {
			var newContent = __webpack_require__(/*! !../../../../node_modules/mini-css-extract-plugin/dist/loader.js!../../../../node_modules/css-loader??ref--4-oneOf-4-2!../../../../node_modules/less-loader/dist/cjs.js!./index.less */ "./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/index.js?!./node_modules/less-loader/dist/cjs.js!./src/app/pages/ErrorPage/index.less");
			if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./src/app/pages/Home/abstract.tsx":
/*!*****************************************!*\
  !*** ./src/app/pages/Home/abstract.tsx ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/taggedTemplateLiteral */ "./node_modules/@babel/runtime/helpers/taggedTemplateLiteral.js"));

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _styledComponents = _interopRequireDefault(__webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js"));

var _templateObject;

var Container = _styledComponents.default.section(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2.default)(["\n\tpadding: 5px 0 0 0;\n\ttext-align: center;\n"])));

function AbstractRoot() {
  return /*#__PURE__*/_react.default.createElement(Container, null, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      fontSize: '22px',
      color: '#666666'
    }
  }, /*#__PURE__*/_react.default.createElement("span", null, /*#__PURE__*/_react.default.createElement("em", null, "React-Initbase"), "\uFF0C\u4E00\u4E2A\u4F7F\u7528", ' ', /*#__PURE__*/_react.default.createElement("a", {
    href: "https://zh-hans.reactjs.org/",
    target: "_blank",
    title: "\u70B9\u51FB\u6B64\u5904\u8BBF\u95EE React \u4E2D\u6587\u5B98\u7F51"
  }, "React"), ' ', "\u7F16\u5199\u7684\u5E94\u7528")));
}

var _default = /*#__PURE__*/_react.default.memo(AbstractRoot);

exports.default = _default;

/***/ }),

/***/ "./src/app/pages/Home/index.tsx":
/*!**************************************!*\
  !*** ./src/app/pages/Home/index.tsx ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

var _typeof = __webpack_require__(/*! @babel/runtime/helpers/typeof */ "./node_modules/@babel/runtime/helpers/typeof.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/slicedToArray.js"));

var _taggedTemplateLiteral2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/taggedTemplateLiteral */ "./node_modules/@babel/runtime/helpers/taggedTemplateLiteral.js"));

var _react = _interopRequireWildcard(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _styledComponents = _interopRequireDefault(__webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js"));

var _withLoading = __webpack_require__(/*! @/utils/hoc/with-loading */ "./src/app/utils/hoc/with-loading.tsx");

var _PageHeader = _interopRequireDefault(__webpack_require__(/*! @/modules/Componnet/PageHeader */ "./src/app/modules/Componnet/PageHeader/index.tsx"));

var _PageFooter = _interopRequireDefault(__webpack_require__(/*! @/modules/Componnet/PageFooter */ "./src/app/modules/Componnet/PageFooter/index.tsx"));

var _ClockCanvas = _interopRequireDefault(__webpack_require__(/*! @/modules/Componnet/ClockCanvas */ "./src/app/modules/Componnet/ClockCanvas/index.tsx"));

var _SVGLoadingMask = _interopRequireDefault(__webpack_require__(/*! @/modules/Componnet/SVGLoadingMask */ "./src/app/modules/Componnet/SVGLoadingMask/index.tsx"));

var _link = _interopRequireDefault(__webpack_require__(/*! ./link */ "./src/app/pages/Home/link.tsx"));

var _abstract = _interopRequireDefault(__webpack_require__(/*! ./abstract */ "./src/app/pages/Home/abstract.tsx"));

var _templateObject, _templateObject2, _templateObject3;

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var HomeContainer = _styledComponents.default.section(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2.default)(["\n\twidth: 100%;\n\theight: 100%;\n\tdisplay: flex;\n\tflex-direction: column;\n\tflex-wrap: nowrap;\n\talign-content: space-between;\n\theight: 100%;\n\toverflow: hidden;\n\topacity: 0;\n"])));

var HomeContent = _styledComponents.default.div(_templateObject2 || (_templateObject2 = (0, _taggedTemplateLiteral2.default)(["\n\twidth: 100%;\n\theight: 100%;\n\toverflow: auto;\n\tdisplay: flex;\n\tflex-direction: column;\n\tjustify-content: flex-start;\n\talign-content: center;\n\talign-items: center;\n\tflex-wrap: nowrap;\n"])));

var ClockcanvasWrapper = _styledComponents.default.div(_templateObject3 || (_templateObject3 = (0, _taggedTemplateLiteral2.default)(["\n\tpadding: 80px 0 0 0;\n"])));

var loadingSVGLoadingMask = (0, _withLoading.withLoading)(_SVGLoadingMask.default);

function HomeRoot() {
  var _useState = (0, _react.useState)(false),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      isShow = _useState2[0],
      setIsShow = _useState2[1];

  (0, _react.useEffect)(function () {
    loadingSVGLoadingMask.show();
    window.setTimeout(function () {
      setIsShow(true);
      loadingSVGLoadingMask.hide();
    }, 500);
  }, []);
  return /*#__PURE__*/_react.default.createElement(HomeContainer, {
    style: {
      opacity: isShow ? 1 : 0,
      height: 'calc(100vh)'
    }
  }, /*#__PURE__*/_react.default.createElement(_PageHeader.default, null), /*#__PURE__*/_react.default.createElement(HomeContent, null, /*#__PURE__*/_react.default.createElement(ClockcanvasWrapper, null, /*#__PURE__*/_react.default.createElement(_ClockCanvas.default, null)), /*#__PURE__*/_react.default.createElement(_abstract.default, null), /*#__PURE__*/_react.default.createElement(_link.default, null)), /*#__PURE__*/_react.default.createElement(_PageFooter.default, null));
}

var _default = /*#__PURE__*/_react.default.memo(HomeRoot);

exports.default = _default;

/***/ }),

/***/ "./src/app/pages/Home/link.tsx":
/*!*************************************!*\
  !*** ./src/app/pages/Home/link.tsx ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/taggedTemplateLiteral */ "./node_modules/@babel/runtime/helpers/taggedTemplateLiteral.js"));

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _styledComponents = _interopRequireDefault(__webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js"));

var _reactRouterDom = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");

var _templateObject;

var Container = _styledComponents.default.section(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2.default)(["\n\tpadding: 0 0 35px 0;\n"])));

function AbstractRoot() {
  return /*#__PURE__*/_react.default.createElement(Container, null, /*#__PURE__*/_react.default.createElement("div", {
    style: {
      fontSize: '12px',
      paddingTop: '5px'
    }
  }, /*#__PURE__*/_react.default.createElement("span", null, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: "/record"
  }, "[\u70B9\u51FB\u6B64\u5904\u8FDB\u5165 Record List \u9875\u9762]"))));
}

var _default = /*#__PURE__*/_react.default.memo(AbstractRoot);

exports.default = _default;

/***/ }),

/***/ "./src/app/pages/RecordMgr/Detail/detail.tsx":
/*!***************************************************!*\
  !*** ./src/app/pages/RecordMgr/Detail/detail.tsx ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

var _typeof = __webpack_require__(/*! @babel/runtime/helpers/typeof */ "./node_modules/@babel/runtime/helpers/typeof.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js"));

__webpack_require__(/*! antd/lib/button/style */ "./node_modules/antd/lib/button/style/index.js");

var _button = _interopRequireDefault(__webpack_require__(/*! antd/lib/button */ "./node_modules/antd/lib/button/index.js"));

__webpack_require__(/*! antd/lib/spin/style */ "./node_modules/antd/lib/spin/style/index.js");

var _spin = _interopRequireDefault(__webpack_require__(/*! antd/lib/spin */ "./node_modules/antd/lib/spin/index.js"));

__webpack_require__(/*! antd/lib/alert/style */ "./node_modules/antd/lib/alert/style/index.js");

var _alert = _interopRequireDefault(__webpack_require__(/*! antd/lib/alert */ "./node_modules/antd/lib/alert/index.js"));

__webpack_require__(/*! antd/lib/message/style */ "./node_modules/antd/lib/message/style/index.js");

var _message2 = _interopRequireDefault(__webpack_require__(/*! antd/lib/message */ "./node_modules/antd/lib/message/index.js"));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/asyncToGenerator.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js"));

var _slicedToArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/slicedToArray.js"));

var _react = _interopRequireWildcard(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _reactRedux = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");

var _antd = __webpack_require__(/*! antd */ "./node_modules/antd/es/index.js");

var _config = __webpack_require__(/*! @/store/record/config */ "./src/app/store/record/config.ts");

var action = _interopRequireWildcard(__webpack_require__(/*! @/store/record/action */ "./src/app/store/record/action.ts"));

var _EditForm = _interopRequireDefault(__webpack_require__(/*! @/pages/RecordMgr/EditForm */ "./src/app/pages/RecordMgr/EditForm/index.tsx"));

var _config2 = __webpack_require__(/*! ../EditForm/config */ "./src/app/pages/RecordMgr/EditForm/config.ts");

__webpack_require__(/*! ./index.less */ "./src/app/pages/RecordMgr/Detail/index.less");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var filterFormData = function filterFormData(paramsFormData) {
  var copyFormData = JSON.parse(JSON.stringify(paramsFormData));
  Object.keys(_config2.baseEditFormDataConfig).forEach(function (item, index) {
    copyFormData[item] = paramsFormData[item];
  });
  return copyFormData;
};

function RecordDetailRoot(props) {
  var match = props.match,
      history = props.history,
      fetchItemRequestAction = props.fetchItemRequestAction,
      updateItemRequestAction = props.updateItemRequestAction;

  var _useState = (0, _react.useState)(_config2.baseEditFormDataConfig),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      formData = _useState2[0],
      setFormData = _useState2[1];

  var _useState3 = (0, _react.useState)(true),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      isExists = _useState4[0],
      setIsExists = _useState4[1];

  var _useState5 = (0, _react.useState)(true),
      _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
      isSpinShow = _useState6[0],
      setIsSpanShow = _useState6[1];

  var _useState7 = (0, _react.useState)(true),
      _useState8 = (0, _slicedToArray2.default)(_useState7, 2),
      isSubmitBtnDisabled = _useState8[0],
      setIsSubmitBtnDisabled = _useState8[1];

  var _useState9 = (0, _react.useState)(false),
      _useState10 = (0, _slicedToArray2.default)(_useState9, 2),
      isSubmitBtnLoading = _useState10[0],
      setIsSubmitBtnLoading = _useState10[1];

  var _useState11 = (0, _react.useState)(""),
      _useState12 = (0, _slicedToArray2.default)(_useState11, 2),
      errMessage = _useState12[0],
      setErrMessage = _useState12[1];

  var _useState13 = (0, _react.useState)(null),
      _useState14 = (0, _slicedToArray2.default)(_useState13, 2),
      itemId = _useState14[0],
      setItemId = _useState14[1];

  var handleUpdateFormData = function handleUpdateFormData(paramsFormData) {
    setFormData(_objectSpread({}, filterFormData(paramsFormData)));
  };

  var updateFormData = function updateFormData(paramsFormData) {
    setFormData(filterFormData(paramsFormData));
  };

  var fetchItemData = /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(id) {
      var res;
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              setIsExists(true);
              setIsSpanShow(true);
              _context.next = 5;
              return fetchItemRequestAction(id);

            case 5:
              res = _context.sent;
              handleUpdateFormData(res.data);
              setIsSpanShow(false);
              setIsSubmitBtnDisabled(false);
              _context.next = 17;
              break;

            case 11:
              _context.prev = 11;
              _context.t0 = _context["catch"](0);
              setIsExists(false);
              setIsSpanShow(false);

              _message2.default.error(_context.t0.msg);

              setErrMessage(_context.t0.msg);

            case 17:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 11]]);
    }));

    return function fetchItemData(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  var submitItemData = /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
      var res;
      return _regenerator.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              setIsSubmitBtnLoading(true);
              _context2.next = 4;
              return updateItemRequestAction(itemId, formData);

            case 4:
              res = _context2.sent;
              setIsSubmitBtnLoading(false);

              _message2.default.success("Updated Success");

              window.setTimeout(function () {
                history.push({
                  pathname: '/record'
                });
              });
              _context2.next = 14;
              break;

            case 10:
              _context2.prev = 10;
              _context2.t0 = _context2["catch"](0);

              _message2.default.error(_context2.t0.msg);

              setIsSubmitBtnLoading(false);

            case 14:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 10]]);
    }));

    return function submitItemData() {
      return _ref2.apply(this, arguments);
    };
  }();

  (0, _react.useEffect)(function () {
    var urlParams = match.params;

    if (urlParams && urlParams.id) {
      setItemId(urlParams.id);
      fetchItemData(urlParams.id);
      return;
    }

    setIsSubmitBtnDisabled(false);
  }, []);
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
    className: "detail-container"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: ['error-wrapper', !isExists ? 'error-wrapper-show' : ''].join(' ')
  }, /*#__PURE__*/_react.default.createElement(_alert.default, {
    message: errMessage,
    type: "error"
  })), /*#__PURE__*/_react.default.createElement(_EditForm.default, {
    formData: formData,
    updateFormData: updateFormData
  }), /*#__PURE__*/_react.default.createElement(_spin.default, {
    className: ['detail-spin', isSpinShow ? 'detail-spin-show' : ''].join(' ')
  }), /*#__PURE__*/_react.default.createElement("div", {
    className: "submit-wrapper"
  }, /*#__PURE__*/_react.default.createElement(_button.default, {
    type: "primary",
    disabled: isSubmitBtnDisabled,
    loading: isSubmitBtnLoading,
    onClick: submitItemData
  }, "Submit"))));
}

RecordDetailRoot.defaultProps = {};

var _default = (0, _reactRedux.connect)(function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var ownProps = arguments.length > 1 ? arguments[1] : undefined;
  return _objectSpread(_objectSpread({}, ownProps), state[_config.REDUCER_RECORD_REDUCER]);
}, _objectSpread({}, action))(RecordDetailRoot);

exports.default = _default;

/***/ }),

/***/ "./src/app/pages/RecordMgr/Detail/extra.tsx":
/*!**************************************************!*\
  !*** ./src/app/pages/RecordMgr/Detail/extra.tsx ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

__webpack_require__(/*! antd/lib/button/style */ "./node_modules/antd/lib/button/style/index.js");

var _button = _interopRequireDefault(__webpack_require__(/*! antd/lib/button */ "./node_modules/antd/lib/button/index.js"));

__webpack_require__(/*! antd/lib/alert/style */ "./node_modules/antd/lib/alert/style/index.js");

var _alert = _interopRequireDefault(__webpack_require__(/*! antd/lib/alert */ "./node_modules/antd/lib/alert/index.js"));

var _taggedTemplateLiteral2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/taggedTemplateLiteral */ "./node_modules/@babel/runtime/helpers/taggedTemplateLiteral.js"));

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _styledComponents = _interopRequireDefault(__webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js"));

var _antd = __webpack_require__(/*! antd */ "./node_modules/antd/es/index.js");

var _mobxReact = __webpack_require__(/*! mobx-react */ "./node_modules/mobx-react/dist/mobxreact.esm.js");

var _templateObject;

var Container = _styledComponents.default.div(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2.default)(["\n\tpadding: 25px 65px;\n\tdisplay: flex;\n"])));

function Extra(props) {
  var testMobxStore = props.testMobxStore;

  var changeStamp = function changeStamp() {
    testMobxStore.modifyStamp(new Date().getTime());
  };

  return /*#__PURE__*/_react.default.createElement(Container, null, /*#__PURE__*/_react.default.createElement(_alert.default, {
    message: "The Stamp is: ".concat(testMobxStore.getStamp),
    type: "info",
    showIcon: true,
    style: {
      width: '100%'
    }
  }), /*#__PURE__*/_react.default.createElement(_button.default, {
    onClick: changeStamp,
    style: {
      height: 'inherit',
      marginLeft: '15px'
    }
  }, "Change Stamp"));
}

var _default = (0, _mobxReact.inject)('testMobxStore')((0, _mobxReact.observer)(Extra));

exports.default = _default;

/***/ }),

/***/ "./src/app/pages/RecordMgr/Detail/index.less":
/*!***************************************************!*\
  !*** ./src/app/pages/RecordMgr/Detail/index.less ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../../../node_modules/mini-css-extract-plugin/dist/loader.js!../../../../../node_modules/css-loader??ref--4-oneOf-4-2!../../../../../node_modules/less-loader/dist/cjs.js!./index.less */ "./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/index.js?!./node_modules/less-loader/dist/cjs.js!./src/app/pages/RecordMgr/Detail/index.less");
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(/*! ../../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(true) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept(/*! !../../../../../node_modules/mini-css-extract-plugin/dist/loader.js!../../../../../node_modules/css-loader??ref--4-oneOf-4-2!../../../../../node_modules/less-loader/dist/cjs.js!./index.less */ "./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/index.js?!./node_modules/less-loader/dist/cjs.js!./src/app/pages/RecordMgr/Detail/index.less", function() {
			var newContent = __webpack_require__(/*! !../../../../../node_modules/mini-css-extract-plugin/dist/loader.js!../../../../../node_modules/css-loader??ref--4-oneOf-4-2!../../../../../node_modules/less-loader/dist/cjs.js!./index.less */ "./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/index.js?!./node_modules/less-loader/dist/cjs.js!./src/app/pages/RecordMgr/Detail/index.less");
			if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./src/app/pages/RecordMgr/Detail/index.tsx":
/*!**************************************************!*\
  !*** ./src/app/pages/RecordMgr/Detail/index.tsx ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _mobxReact = __webpack_require__(/*! mobx-react */ "./node_modules/mobx-react/dist/mobxreact.esm.js");

var _reactHelmetAsync = __webpack_require__(/*! react-helmet-async */ "./node_modules/react-helmet-async/lib/index.module.js");

var _mobx = __webpack_require__(/*! mobx */ "./node_modules/mobx/dist/mobx.esm.js");

var _testStore = __webpack_require__(/*! @/store/__mobx/testStore */ "./src/app/store/__mobx/testStore.ts");

var _detail = _interopRequireDefault(__webpack_require__(/*! ./detail */ "./src/app/pages/RecordMgr/Detail/detail.tsx"));

var _extra = _interopRequireDefault(__webpack_require__(/*! ./extra */ "./src/app/pages/RecordMgr/Detail/extra.tsx"));

var _PageContent = _interopRequireDefault(__webpack_require__(/*! @/modules/Componnet/PageContent */ "./src/app/modules/Componnet/PageContent/index.tsx"));

var _PageHeader = _interopRequireDefault(__webpack_require__(/*! @/modules/Componnet/PageHeader */ "./src/app/modules/Componnet/PageHeader/index.tsx"));

var _PageFooter = _interopRequireDefault(__webpack_require__(/*! @/modules/Componnet/PageFooter */ "./src/app/modules/Componnet/PageFooter/index.tsx"));

(0, _mobx.configure)({
  enforceActions: 'always'
});

function RecordDetailRoot(props) {
  var match = props.match;
  var params = match.params;
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_reactHelmetAsync.Helmet, null, /*#__PURE__*/_react.default.createElement("title", null, params.id || '', " - Record Detail")), /*#__PURE__*/_react.default.createElement(_PageHeader.default, null), /*#__PURE__*/_react.default.createElement(_PageContent.default, null, /*#__PURE__*/_react.default.createElement(_detail.default, props), /*#__PURE__*/_react.default.createElement(_mobxReact.Provider, {
    testMobxStore: _testStore.testMobxStore
  }, /*#__PURE__*/_react.default.createElement(_extra.default, props))), /*#__PURE__*/_react.default.createElement(_PageFooter.default, null));
}

var _default = /*#__PURE__*/_react.default.memo(RecordDetailRoot);

exports.default = _default;

/***/ }),

/***/ "./src/app/pages/RecordMgr/EditForm/config.ts":
/*!****************************************************!*\
  !*** ./src/app/pages/RecordMgr/EditForm/config.ts ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.baseConfig = exports.baseEditFormDataConfig = void 0;
var baseEditFormDataConfig = {
  title: "",
  content: "",
  extra: ""
};
exports.baseEditFormDataConfig = baseEditFormDataConfig;
var baseConfig = {
  contentInputElementHeight: 350
};
exports.baseConfig = baseConfig;

/***/ }),

/***/ "./src/app/pages/RecordMgr/EditForm/index.tsx":
/*!****************************************************!*\
  !*** ./src/app/pages/RecordMgr/EditForm/index.tsx ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

var _typeof = __webpack_require__(/*! @babel/runtime/helpers/typeof */ "./node_modules/@babel/runtime/helpers/typeof.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/extends.js"));

__webpack_require__(/*! antd/lib/input/style */ "./node_modules/antd/lib/input/style/index.js");

var _input = _interopRequireDefault(__webpack_require__(/*! antd/lib/input */ "./node_modules/antd/lib/input/index.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js"));

__webpack_require__(/*! antd/lib/form/style */ "./node_modules/antd/lib/form/style/index.js");

var _form = _interopRequireDefault(__webpack_require__(/*! antd/lib/form */ "./node_modules/antd/lib/form/index.js"));

var _slicedToArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/slicedToArray.js"));

var _react = _interopRequireWildcard(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _antd = __webpack_require__(/*! antd */ "./node_modules/antd/es/index.js");

var _config = __webpack_require__(/*! ./config */ "./src/app/pages/RecordMgr/EditForm/config.ts");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function EditFormRoot(props) {
  var formData = props.formData,
      updateFormData = props.updateFormData,
      handleSubmitRequest = props.handleSubmitRequest;

  var _Form$useForm = _form.default.useForm(),
      _Form$useForm2 = (0, _slicedToArray2.default)(_Form$useForm, 1),
      addItemForm = _Form$useForm2[0];

  var _useState = (0, _react.useState)(_objectSpread(_objectSpread({}, _config.baseConfig), props)),
      _useState2 = (0, _slicedToArray2.default)(_useState, 1),
      config = _useState2[0];

  var layout = {
    labelCol: {
      style: {
        width: '100px'
      }
    },
    wrapperCol: {
      style: {
        width: 'calc(100% - 100px)'
      }
    }
  };

  var onValuesChange = function onValuesChange(changedValues, allValues) {
    updateFormData && updateFormData(_objectSpread({}, allValues));
  };

  (0, _react.useEffect)(function () {
    addItemForm.setFieldsValue(_objectSpread({}, formData));
  }, [formData]);
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_form.default, (0, _extends2.default)({}, layout, {
    name: "basic",
    form: addItemForm,
    initialValues: formData,
    onValuesChange: onValuesChange,
    style: {
      paddingRight: '50px'
    }
  }), /*#__PURE__*/_react.default.createElement(_form.default.Item, {
    label: "Title",
    name: "title"
  }, /*#__PURE__*/_react.default.createElement(_input.default, {
    onPressEnter: handleSubmitRequest
  })), /*#__PURE__*/_react.default.createElement(_form.default.Item, {
    label: "Content",
    name: "content"
  }, /*#__PURE__*/_react.default.createElement(_input.default.TextArea, {
    style: {
      height: config.contentInputElementHeight
    }
  })), /*#__PURE__*/_react.default.createElement(_form.default.Item, {
    label: "Extra",
    name: "extra"
  }, /*#__PURE__*/_react.default.createElement(_input.default.TextArea, null))));
}

EditFormRoot.defaultProps = {
  contentInputElementHeight: _config.baseConfig.contentInputElementHeight,
  formData: {}
};

var _default = /*#__PURE__*/_react.default.memo(EditFormRoot);

exports.default = _default;

/***/ }),

/***/ "./src/app/pages/RecordMgr/Error/index.tsx":
/*!*************************************************!*\
  !*** ./src/app/pages/RecordMgr/Error/index.tsx ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/taggedTemplateLiteral */ "./node_modules/@babel/runtime/helpers/taggedTemplateLiteral.js"));

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _reactRouterDom = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");

var _styledComponents = _interopRequireDefault(__webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js"));

var _templateObject;

var Container = _styledComponents.default.section(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2.default)(["\n\tdisplay: block;\n"])));

function RecordErrorRoot() {
  return /*#__PURE__*/_react.default.createElement(Container, null, /*#__PURE__*/_react.default.createElement("div", {
    className: "error-404-content"
  }, "Record Manager, 404 Not Found"), /*#__PURE__*/_react.default.createElement("div", {
    style: {
      textAlign: 'center'
    }
  }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: "/record"
  }, "Link to Record List Page")));
}

var _default = /*#__PURE__*/_react.default.memo(RecordErrorRoot);

exports.default = _default;

/***/ }),

/***/ "./src/app/pages/RecordMgr/List/config.ts":
/*!************************************************!*\
  !*** ./src/app/pages/RecordMgr/List/config.ts ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.baseFormConfig = exports.basePageConfig = void 0;
var basePageConfig = {
  pageIndex: 1,
  pageSize: 5,
  countTotal: 0
};
exports.basePageConfig = basePageConfig;
var baseFormConfig = {
  keywords: ""
};
exports.baseFormConfig = baseFormConfig;

/***/ }),

/***/ "./src/app/pages/RecordMgr/List/index.less":
/*!*************************************************!*\
  !*** ./src/app/pages/RecordMgr/List/index.less ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../../../node_modules/mini-css-extract-plugin/dist/loader.js!../../../../../node_modules/css-loader??ref--4-oneOf-4-2!../../../../../node_modules/less-loader/dist/cjs.js!./index.less */ "./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/index.js?!./node_modules/less-loader/dist/cjs.js!./src/app/pages/RecordMgr/List/index.less");
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(/*! ../../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(true) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept(/*! !../../../../../node_modules/mini-css-extract-plugin/dist/loader.js!../../../../../node_modules/css-loader??ref--4-oneOf-4-2!../../../../../node_modules/less-loader/dist/cjs.js!./index.less */ "./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/index.js?!./node_modules/less-loader/dist/cjs.js!./src/app/pages/RecordMgr/List/index.less", function() {
			var newContent = __webpack_require__(/*! !../../../../../node_modules/mini-css-extract-plugin/dist/loader.js!../../../../../node_modules/css-loader??ref--4-oneOf-4-2!../../../../../node_modules/less-loader/dist/cjs.js!./index.less */ "./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/index.js?!./node_modules/less-loader/dist/cjs.js!./src/app/pages/RecordMgr/List/index.less");
			if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./src/app/pages/RecordMgr/List/index.tsx":
/*!************************************************!*\
  !*** ./src/app/pages/RecordMgr/List/index.tsx ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

var _typeof = __webpack_require__(/*! @babel/runtime/helpers/typeof */ "./node_modules/@babel/runtime/helpers/typeof.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js"));

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _reactRedux = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");

var _reactHelmetAsync = __webpack_require__(/*! react-helmet-async */ "./node_modules/react-helmet-async/lib/index.module.js");

var _PageContent = _interopRequireDefault(__webpack_require__(/*! @/modules/Componnet/PageContent */ "./src/app/modules/Componnet/PageContent/index.tsx"));

var _PageHeader = _interopRequireDefault(__webpack_require__(/*! @/modules/Componnet/PageHeader */ "./src/app/modules/Componnet/PageHeader/index.tsx"));

var _PageFooter = _interopRequireDefault(__webpack_require__(/*! @/modules/Componnet/PageFooter */ "./src/app/modules/Componnet/PageFooter/index.tsx"));

var _config = __webpack_require__(/*! @/store/gProfile/config */ "./src/app/store/gProfile/config.ts");

var gProfileActions = _interopRequireWildcard(__webpack_require__(/*! @/store/gProfile/action */ "./src/app/store/gProfile/action.ts"));

var recordActions = _interopRequireWildcard(__webpack_require__(/*! @/store/record/action */ "./src/app/store/record/action.ts"));

var _list = _interopRequireDefault(__webpack_require__(/*! ./list */ "./src/app/pages/RecordMgr/List/list.tsx"));

var _mode = _interopRequireDefault(__webpack_require__(/*! ./mode */ "./src/app/pages/RecordMgr/List/mode.tsx"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function RecordListRoot(props) {
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_reactHelmetAsync.Helmet, null, /*#__PURE__*/_react.default.createElement("title", null, "Record List")), /*#__PURE__*/_react.default.createElement(_PageHeader.default, {
    userId: props.g_globalId
  }), /*#__PURE__*/_react.default.createElement(_PageContent.default, null, /*#__PURE__*/_react.default.createElement(_list.default, props), /*#__PURE__*/_react.default.createElement(_mode.default, {
    renderWay: props.g_RENDER_WAY
  })), /*#__PURE__*/_react.default.createElement(_PageFooter.default, null));
}

var exportRecordListRoot = (0, _reactRedux.connect)(function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var ownProps = arguments.length > 1 ? arguments[1] : undefined;
  return _objectSpread(_objectSpread({}, ownProps), state[_config.REDUCER_G_PROFILE]);
}, _objectSpread({}, gProfileActions))(RecordListRoot);

exportRecordListRoot.getInitialProps = function (store, request) {
  var query = request.query || {};
  return store.dispatch(recordActions.fetchListRequestAction({
    keywords: query.keywords || '',
    pageIndex: query.pageIndex,
    pageSize: query.pageSize
  }));
};

var _default = exportRecordListRoot;
exports.default = _default;

/***/ }),

/***/ "./src/app/pages/RecordMgr/List/list.tsx":
/*!***********************************************!*\
  !*** ./src/app/pages/RecordMgr/List/list.tsx ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

var _typeof = __webpack_require__(/*! @babel/runtime/helpers/typeof */ "./node_modules/@babel/runtime/helpers/typeof.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js"));

__webpack_require__(/*! antd/lib/modal/style */ "./node_modules/antd/lib/modal/style/index.js");

var _modal = _interopRequireDefault(__webpack_require__(/*! antd/lib/modal */ "./node_modules/antd/lib/modal/index.js"));

__webpack_require__(/*! antd/lib/row/style */ "./node_modules/antd/lib/row/style/index.js");

var _row = _interopRequireDefault(__webpack_require__(/*! antd/lib/row */ "./node_modules/antd/lib/row/index.js"));

__webpack_require__(/*! antd/lib/pagination/style */ "./node_modules/antd/lib/pagination/style/index.js");

var _pagination = _interopRequireDefault(__webpack_require__(/*! antd/lib/pagination */ "./node_modules/antd/lib/pagination/index.js"));

__webpack_require__(/*! antd/lib/message/style */ "./node_modules/antd/lib/message/style/index.js");

var _message2 = _interopRequireDefault(__webpack_require__(/*! antd/lib/message */ "./node_modules/antd/lib/message/index.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js"));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/asyncToGenerator.js"));

var _slicedToArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/slicedToArray.js"));

__webpack_require__(/*! antd/lib/layout/style */ "./node_modules/antd/lib/layout/style/index.js");

var _layout = _interopRequireDefault(__webpack_require__(/*! antd/lib/layout */ "./node_modules/antd/lib/layout/index.js"));

var _react = _interopRequireWildcard(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _reactRedux = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");

var _antd = __webpack_require__(/*! antd */ "./node_modules/antd/es/index.js");

var _ListTable = _interopRequireDefault(__webpack_require__(/*! ../ListTable */ "./src/app/pages/RecordMgr/ListTable/index.tsx"));

var _ListFilterForm = _interopRequireDefault(__webpack_require__(/*! ../ListFilterForm */ "./src/app/pages/RecordMgr/ListFilterForm/index.tsx"));

var _config = __webpack_require__(/*! ./config */ "./src/app/pages/RecordMgr/List/config.ts");

var actions = _interopRequireWildcard(__webpack_require__(/*! @/store/record/action */ "./src/app/store/record/action.ts"));

var _utils = __webpack_require__(/*! ./utils */ "./src/app/pages/RecordMgr/List/utils.ts");

__webpack_require__(/*! ./index.less */ "./src/app/pages/RecordMgr/List/index.less");

var _utils2 = __webpack_require__(/*! @/utils/utils */ "./src/app/utils/utils.ts");

var _config2 = __webpack_require__(/*! @/store/record/config */ "./src/app/store/record/config.ts");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var Content = _layout.default.Content;

function RecordList(props) {
  console.log("RecordList.props \u2764\u2764\u2764", props);
  var g_RENDER_WAY = props.g_RENDER_WAY,
      list = props.list,
      countTotal = props.countTotal,
      location = props.location,
      history = props.history,
      deleteItemsRequestAction = props.deleteItemsRequestAction,
      handleToggleRowSelectAction = props.handleToggleRowSelectAction,
      fetchListRequestAction = props.fetchListRequestAction,
      addItemRequestAction = props.addItemRequestAction;

  var _useState = (0, _react.useState)(_config.basePageConfig),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      pageConfig = _useState2[0],
      setPageConfig = _useState2[1];

  var _useState3 = (0, _react.useState)(_config.baseFormConfig),
      _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
      formConfig = _useState4[0],
      setFormConfig = _useState4[1];

  var _useState5 = (0, _react.useState)(false),
      _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
      tableLoading = _useState6[0],
      setTableLoading = _useState6[1];

  var _useState7 = (0, _react.useState)(false),
      _useState8 = (0, _slicedToArray2.default)(_useState7, 2),
      isDeleteModalVisible = _useState8[0],
      setIsDeleteModelVisible = _useState8[1];

  var _useState9 = (0, _react.useState)(''),
      _useState10 = (0, _slicedToArray2.default)(_useState9, 2),
      deleteModalTargetTitle = _useState10[0],
      setDeleteModalTargetTitle = _useState10[1];
  /* ... */


  var pageConfigReference = (0, _react.useRef)(null);
  pageConfigReference.current = pageConfig;
  var formConfigReference = (0, _react.useRef)(null);
  formConfigReference.current = formConfig;
  var propsListReference = (0, _react.useRef)(null);
  propsListReference.current = list;
  var handleSearch = (0, _react.useCallback)( /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            history.push({
              pathname: location.pathname,
              search: (0, _utils.createSearchString)(1, +pageConfigReference.current.pageSize, formConfigReference.current.keywords)
            });

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })), []);
  var handleFresh = (0, _react.useCallback)( /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2() {
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            history.push({
              pathname: location.pathname,
              search: (0, _utils.createSearchString)(+pageConfigReference.current.pageIndex, +pageConfigReference.current.pageSize, formConfigReference.current.keywords)
            });

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  })), []);
  var handleModifyFormInput = (0, _react.useCallback)(function ($evte) {
    var value = $evte.target.value;
    setFormConfig(function (formConfig) {
      return _objectSpread(_objectSpread({}, formConfig), {}, {
        keywords: value
      });
    });
  }, []);
  var onDialogEditFormClosed = (0, _react.useCallback)(function (hasSubmitedItem) {
    if (hasSubmitedItem) {
      fetchTableData(_objectSpread(_objectSpread({}, pageConfigReference.current), formConfigReference.current));
    }
  }, []);
  var onPaginationChange = (0, _react.useCallback)(function (pageIndex, pageSize) {
    history.push({
      pathname: location.pathname,
      search: (0, _utils.createSearchString)(pageIndex, +(pageSize || _config.basePageConfig.pageSize), formConfigReference.current.keywords)
    });
  }, []);
  var fetchTableData = (0, _react.useCallback)( /*#__PURE__*/function () {
    var _ref3 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3(params) {
      var res, _countTotal;

      return _regenerator.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              setTableLoading(true);
              _context3.prev = 1;
              _context3.next = 4;
              return fetchListRequestAction(params);

            case 4:
              res = _context3.sent;
              _countTotal = typeof res.data.countTotal !== 'undefined' ? res.data.countTotal : pageConfig.countTotal;
              setPageConfig(function (pageConfig) {
                return _objectSpread(_objectSpread({}, pageConfig), {}, {
                  countTotal: _countTotal
                });
              });
              setTableLoading(false);
              _context3.next = 14;
              break;

            case 10:
              _context3.prev = 10;
              _context3.t0 = _context3["catch"](1);

              _message2.default.error(_context3.t0.msg);

              setTableLoading(false);

            case 14:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[1, 10]]);
    }));

    return function (_x) {
      return _ref3.apply(this, arguments);
    };
  }(), []);
  var deleteRowData = (0, _react.useCallback)( /*#__PURE__*/(0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4() {
    var selectedIdList, res;
    return _regenerator.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            selectedIdList = propsListReference.current.filter(function (item, index) {
              return item.isChcked;
            }).map(function (item, index) {
              return item.id;
            });
            _context4.prev = 1;
            _context4.next = 4;
            return deleteItemsRequestAction(selectedIdList);

          case 4:
            res = _context4.sent;

            _message2.default.success("Deleted Success");

            setIsDeleteModelVisible(false);
            _context4.next = 12;
            break;

          case 9:
            _context4.prev = 9;
            _context4.t0 = _context4["catch"](1);

            _message2.default.error(_context4.t0.msg);

          case 12:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[1, 9]]);
  })), []);
  var handleDeleteItem = (0, _react.useCallback)(function (itemData) {
    handleToggleRowSelectAction([itemData.key]);
    setIsDeleteModelVisible(true);
  }, []);
  (0, _react.useEffect)(function () {
    console.log("RecordList.location @@@", props);
    var pageIndex = +(0, _utils2.getQueryValueOfUrl)('pageIndex') || pageConfig.pageIndex;
    var pageSize = +(0, _utils2.getQueryValueOfUrl)('pageSize') || pageConfig.pageSize;
    var keywords = decodeURI((0, _utils2.getQueryValueOfUrl)('keywords') || '');
    setPageConfig(_objectSpread(_objectSpread({}, pageConfig), {}, {
      pageSize: pageSize,
      pageIndex: pageIndex,
      countTotal: countTotal
    }));
    setFormConfig(_objectSpread(_objectSpread({}, formConfig), {}, {
      keywords: keywords
    }));
    fetchTableData({
      pageIndex: pageIndex,
      pageSize: pageSize,
      keywords: keywords
    });
  }, [location]);
  (0, _react.useEffect)(function () {
    if (!isDeleteModalVisible) {
      return;
    }

    var selectedList = list.filter(function (item, index) {
      return item.isChcked;
    });
    setDeleteModalTargetTitle(selectedList.length ? selectedList[0].title : '');
  }, [isDeleteModalVisible]);
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("section", {
    className: "list-container"
  }, /*#__PURE__*/_react.default.createElement("section", {
    className: "list-wrapper"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "list-header"
  }, /*#__PURE__*/_react.default.createElement(_ListFilterForm.default, {
    onDialogEditFormClosed: onDialogEditFormClosed,
    handleAddItem: addItemRequestAction,
    keywordsValue: formConfig.keywords,
    handleKeywordsEnterAction: handleSearch,
    handleKeywordsChangeAction: handleModifyFormInput,
    handleRefreshAction: handleFresh
  })), /*#__PURE__*/_react.default.createElement(Content, null, /*#__PURE__*/_react.default.createElement(_ListTable.default, {
    handleDeleteItem: handleDeleteItem,
    handleToggleRowSelect: handleToggleRowSelectAction,
    loading: tableLoading,
    list: list
  })), /*#__PURE__*/_react.default.createElement(_row.default, {
    className: "pagination-wrapper"
  }, /*#__PURE__*/_react.default.createElement(_pagination.default, {
    size: "small",
    total: pageConfig.countTotal,
    current: pageConfig.pageIndex,
    pageSize: pageConfig.pageSize,
    showSizeChanger: true,
    showQuickJumper: true,
    onChange: onPaginationChange
  })), /*#__PURE__*/_react.default.createElement(_row.default, {
    className: "total-count-wrapper"
  }, /*#__PURE__*/_react.default.createElement("div", null, "Total Count: ", countTotal)))), /*#__PURE__*/_react.default.createElement(_modal.default, {
    title: "Modal",
    visible: isDeleteModalVisible,
    onOk: deleteRowData,
    onCancel: function onCancel() {
      setIsDeleteModelVisible(false);
    }
  }, /*#__PURE__*/_react.default.createElement("p", null, "Are you sure you want to delete ", /*#__PURE__*/_react.default.createElement("span", {
    style: {
      color: '#ff0000'
    }
  }, deleteModalTargetTitle), " ?")));
}

var _default = (0, _reactRedux.connect)(function () {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var ownProps = arguments.length > 1 ? arguments[1] : undefined;
  return _objectSpread(_objectSpread({}, ownProps), state[_config2.REDUCER_RECORD_REDUCER]);
}, _objectSpread({}, actions))(RecordList);

exports.default = _default;

/***/ }),

/***/ "./src/app/pages/RecordMgr/List/mode.tsx":
/*!***********************************************!*\
  !*** ./src/app/pages/RecordMgr/List/mode.tsx ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _taggedTemplateLiteral2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/taggedTemplateLiteral */ "./node_modules/@babel/runtime/helpers/taggedTemplateLiteral.js"));

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _styledComponents = _interopRequireDefault(__webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js"));

var _templateObject, _templateObject2;

var Container = _styledComponents.default.section(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2.default)(["\n    padding: 25px 65px;\n"])));

var Wrapper = _styledComponents.default.div(_templateObject2 || (_templateObject2 = (0, _taggedTemplateLiteral2.default)(["\n    padding: 0 5px;\n    font-size: 12px;\n"])));

function ModeRoot(props) {
  var renderWay = props.renderWay;
  return /*#__PURE__*/_react.default.createElement(Container, null, /*#__PURE__*/_react.default.createElement(Wrapper, null, "Render Mode: ", renderWay));
}

ModeRoot.defaultProps = {
  renderWay: '-'
};

var _default = /*#__PURE__*/_react.default.memo(ModeRoot);

exports.default = _default;

/***/ }),

/***/ "./src/app/pages/RecordMgr/List/utils.ts":
/*!***********************************************!*\
  !*** ./src/app/pages/RecordMgr/List/utils.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createSearchString = void 0;

var createSearchString = function createSearchString(pageIndex, pageSize, keywords) {
  var search = "?pageIndex=".concat(pageIndex, "&pageSize=").concat(pageSize);

  if (keywords && keywords.trim()) {
    search += "&keywords=".concat(encodeURI(encodeURI(keywords)));
  }

  return search;
};

exports.createSearchString = createSearchString;

/***/ }),

/***/ "./src/app/pages/RecordMgr/ListFilterForm/index.css":
/*!**********************************************************!*\
  !*** ./src/app/pages/RecordMgr/ListFilterForm/index.css ***!
  \**********************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin

    if(true) {
      // 1624871819373
      var cssReload = __webpack_require__(/*! ./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js */ "./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js")(module.i, {"locals":false});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);
    }
  
    if(true) {
      // 1624871819373
      var cssReload = __webpack_require__(/*! ../../../../../node_modules/css-hot-loader/hotModuleReplacement.js */ "./node_modules/css-hot-loader/hotModuleReplacement.js")(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ "./src/app/pages/RecordMgr/ListFilterForm/index.module.css":
/*!*****************************************************************!*\
  !*** ./src/app/pages/RecordMgr/ListFilterForm/index.module.css ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin
/* harmony default export */ __webpack_exports__["default"] = ({"search-btn-container":"index-module_search-btn-container-302ML","search-btn-item":"index-module_search-btn-item-2bwOs"});
    if(true) {
      // 1624871819461
      var cssReload = __webpack_require__(/*! ./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js */ "./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js")(module.i, {"locals":true});
      module.hot.dispose(cssReload);
      
    }
  
    if(true) {
      // 1624871819462
      var cssReload = __webpack_require__(/*! ../../../../../node_modules/css-hot-loader/hotModuleReplacement.js */ "./node_modules/css-hot-loader/hotModuleReplacement.js")(module.i, {"fileMap":"{fileName}"});
      module.hot.dispose(cssReload);
      module.hot.accept(undefined, cssReload);;
    }
  

/***/ }),

/***/ "./src/app/pages/RecordMgr/ListFilterForm/index.tsx":
/*!**********************************************************!*\
  !*** ./src/app/pages/RecordMgr/ListFilterForm/index.tsx ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js"));

__webpack_require__(/*! antd/lib/row/style */ "./node_modules/antd/lib/row/style/index.js");

var _row = _interopRequireDefault(__webpack_require__(/*! antd/lib/row */ "./node_modules/antd/lib/row/index.js"));

__webpack_require__(/*! antd/lib/button/style */ "./node_modules/antd/lib/button/style/index.js");

var _button = _interopRequireDefault(__webpack_require__(/*! antd/lib/button */ "./node_modules/antd/lib/button/index.js"));

__webpack_require__(/*! antd/lib/col/style */ "./node_modules/antd/lib/col/style/index.js");

var _col = _interopRequireDefault(__webpack_require__(/*! antd/lib/col */ "./node_modules/antd/lib/col/index.js"));

__webpack_require__(/*! antd/lib/input/style */ "./node_modules/antd/lib/input/style/index.js");

var _input = _interopRequireDefault(__webpack_require__(/*! antd/lib/input */ "./node_modules/antd/lib/input/index.js"));

__webpack_require__(/*! antd/lib/message/style */ "./node_modules/antd/lib/message/style/index.js");

var _message2 = _interopRequireDefault(__webpack_require__(/*! antd/lib/message */ "./node_modules/antd/lib/message/index.js"));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/asyncToGenerator.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js"));

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _antd = __webpack_require__(/*! antd */ "./node_modules/antd/es/index.js");

var _EditForm = _interopRequireDefault(__webpack_require__(/*! ../EditForm */ "./src/app/pages/RecordMgr/EditForm/index.tsx"));

var _withDialog = __webpack_require__(/*! @/utils/hoc/with-dialog */ "./src/app/utils/hoc/with-dialog.tsx");

var _config = __webpack_require__(/*! ../EditForm/config */ "./src/app/pages/RecordMgr/EditForm/config.ts");

var _config2 = __webpack_require__(/*! ../List/config */ "./src/app/pages/RecordMgr/List/config.ts");

var _indexModule = _interopRequireDefault(__webpack_require__(/*! ./index.module.css */ "./src/app/pages/RecordMgr/ListFilterForm/index.module.css"));

__webpack_require__(/*! ./index.css */ "./src/app/pages/RecordMgr/ListFilterForm/index.css");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var dialogEditForm = (0, _withDialog.withDialog)(_EditForm.default);

function ListFilterFormRoot(props) {
  var keywordsValue = props.keywordsValue,
      handleKeywordsEnterAction = props.handleKeywordsEnterAction,
      handleKeywordsChangeAction = props.handleKeywordsChangeAction,
      handleRefreshAction = props.handleRefreshAction,
      handleAddItem = props.handleAddItem,
      onDialogEditFormClosed = props.onDialogEditFormClosed;
  var hasSubmitedItem = false;

  var handleSearch = function handleSearch($evte) {
    handleKeywordsEnterAction($evte);
  };

  var showDialogEditForm = function showDialogEditForm() {
    dialogEditForm.open({
      title: 'Add Item',
      width: '55%',
      confirmLoading: false,
      onOk: function onOk() {
        var _dialogEditForm$getDa = dialogEditForm.getData(),
            formData = _dialogEditForm$getDa.formData;

        submitItemData(formData);
      },
      onCancel: function onCancel() {
        onDialogEditFormClosed(hasSubmitedItem);
      },
      data: {
        contentInputElementHeight: 100,
        formData: JSON.parse(JSON.stringify(_config.baseEditFormDataConfig))
      },
      methods: {
        updateFormData: function updateFormData(data) {
          dialogEditForm.setData({
            formData: _objectSpread({}, data)
          });
        },
        handleSubmitRequest: function handleSubmitRequest() {
          return (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
            var _dialogEditForm$getDa2, formData;

            return _regenerator.default.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _dialogEditForm$getDa2 = dialogEditForm.getData(), formData = _dialogEditForm$getDa2.formData;
                    submitItemData(formData);

                  case 2:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee);
          }))();
        }
      }
    });
  };

  var submitItemData = /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(formData) {
      return _regenerator.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;

              if (formData.title.trim()) {
                _context2.next = 4;
                break;
              }

              _message2.default.error("Title Empty");

              return _context2.abrupt("return", false);

            case 4:
              hasSubmitedItem = true;
              dialogEditForm.setProps(function (preProps) {
                return _objectSpread(_objectSpread({}, preProps), {}, {
                  confirmLoading: true
                });
              });
              _context2.next = 8;
              return handleAddItem(formData);

            case 8:
              Object.keys(formData).forEach(function (item, index) {
                formData[item] = '';
              });
              dialogEditForm.setData({
                formData: formData
              });
              dialogEditForm.setProps(function (preProps) {
                return _objectSpread(_objectSpread({}, preProps), {}, {
                  confirmLoading: false
                });
              });

              _message2.default.success("Added Success!");

              _context2.next = 18;
              break;

            case 14:
              _context2.prev = 14;
              _context2.t0 = _context2["catch"](0);
              dialogEditForm.setProps(function (preProps) {
                return _objectSpread(_objectSpread({}, preProps), {}, {
                  confirmLoading: false
                });
              });

              _message2.default.error(_context2.t0.msg);

            case 18:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 14]]);
    }));

    return function submitItemData(_x) {
      return _ref.apply(this, arguments);
    };
  }();

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_row.default, {
    style: {
      width: '100%'
    }
  }, /*#__PURE__*/_react.default.createElement(_col.default, {
    span: 12,
    style: {
      paddingRight: '10px'
    }
  }, /*#__PURE__*/_react.default.createElement(_input.default, {
    allowClear: true,
    placeholder: "Input Something...",
    onPressEnter: handleSearch,
    onChange: handleKeywordsChangeAction,
    value: keywordsValue,
    onFocus: function onFocus($evte) {
      $evte.target.select();
    }
  })), /*#__PURE__*/_react.default.createElement(_col.default, {
    span: 12,
    className: _indexModule.default['search-btn-container']
  }, /*#__PURE__*/_react.default.createElement(_button.default, {
    onClick: handleSearch,
    className: [_indexModule.default['search-btn-item']].join(' ')
  }, "Search"), /*#__PURE__*/_react.default.createElement(_button.default, {
    onClick: handleRefreshAction,
    className: _indexModule.default['search-btn-item']
  }, "Refresh"))), /*#__PURE__*/_react.default.createElement(_row.default, null, /*#__PURE__*/_react.default.createElement(_button.default, {
    onClick: showDialogEditForm,
    className: "search-btn-item-extra",
    style: {
      marginLeft: '5px'
    }
  }, "Add Item")));
}

ListFilterFormRoot.defaultProps = {
  keywordsValue: _config2.baseFormConfig.keywords
};

var _default = /*#__PURE__*/_react.default.memo(ListFilterFormRoot);

exports.default = _default;

/***/ }),

/***/ "./src/app/pages/RecordMgr/ListTable/config.tsx":
/*!******************************************************!*\
  !*** ./src/app/pages/RecordMgr/ListTable/config.tsx ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.listTableConfig = void 0;

__webpack_require__(/*! antd/lib/button/style */ "./node_modules/antd/lib/button/style/index.js");

var _button = _interopRequireDefault(__webpack_require__(/*! antd/lib/button */ "./node_modules/antd/lib/button/index.js"));

var _taggedTemplateLiteral2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/taggedTemplateLiteral */ "./node_modules/@babel/runtime/helpers/taggedTemplateLiteral.js"));

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _antd = __webpack_require__(/*! antd */ "./node_modules/antd/es/index.js");

var _styledComponents = _interopRequireDefault(__webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js"));

var _reactRouterDom = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");

var _templateObject, _templateObject2;

var Container = _styledComponents.default.div(_templateObject || (_templateObject = (0, _taggedTemplateLiteral2.default)(["\n\twidth: 100%;\n"])));

var TextOverflowEllipsis = _styledComponents.default.div(_templateObject2 || (_templateObject2 = (0, _taggedTemplateLiteral2.default)(["\n\toverflow: hidden;\n\ttext-overflow: ellipsis;\n\tdisplay: -webkit-box;\n\t-webkit-line-clamp: 2;\n\t-webkit-box-orient: vertical;\n\tword-break: break-all;\n"])));

var ContentTdView = function ContentTdView(props) {
  var value = props.value;
  return /*#__PURE__*/_react.default.createElement(Container, null, /*#__PURE__*/_react.default.createElement(TextOverflowEllipsis, null, value));
};

var listTableConfig = {
  table: function table(profile) {
    return {
      pagination: false
    };
  },
  columns: function columns(profile) {
    return [{
      title: 'No.',
      dataIndex: 'rowIndex',
      width: '5%',
      render: function render(value) {
        return /*#__PURE__*/_react.default.createElement("div", null, value || 0);
      }
    }, {
      title: 'ID',
      dataIndex: 'id',
      width: '5%',
      render: function render(value) {
        return /*#__PURE__*/_react.default.createElement("div", null, value);
      }
    }, {
      title: 'Title',
      dataIndex: 'title',
      width: '40%',
      render: function render(value) {
        return /*#__PURE__*/_react.default.createElement("div", null, value);
      }
    }, {
      title: 'Content',
      dataIndex: 'content',
      width: '30%',
      render: function render(value) {
        return /*#__PURE__*/_react.default.createElement(ContentTdView, {
          value: value
        });
      }
    }, {
      title: 'Action',
      dataIndex: 'key',
      width: '20%',
      render: function render(value, itemData, index) {
        return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_button.default, {
          type: "link",
          className: "table-op-btn",
          loading: itemData.isLoading,
          style: {
            paddingLeft: 0,
            paddingRight: 0
          },
          onClick: function onClick() {
            profile.handleDeleteItem(itemData);
          }
        }, "[delete]"), /*#__PURE__*/_react.default.createElement("span", {
          style: {
            padding: '0 5px'
          }
        }, "/"), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
          to: {
            pathname: "/record/detail/".concat(itemData.id)
          },
          target: "_blank"
        }, "[detail]"));
      }
    }];
  }
};
exports.listTableConfig = listTableConfig;

/***/ }),

/***/ "./src/app/pages/RecordMgr/ListTable/index.tsx":
/*!*****************************************************!*\
  !*** ./src/app/pages/RecordMgr/ListTable/index.tsx ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

var _typeof = __webpack_require__(/*! @babel/runtime/helpers/typeof */ "./node_modules/@babel/runtime/helpers/typeof.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

__webpack_require__(/*! antd/lib/table/style */ "./node_modules/antd/lib/table/style/index.js");

var _table = _interopRequireDefault(__webpack_require__(/*! antd/lib/table */ "./node_modules/antd/lib/table/index.js"));

var _extends2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/extends.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js"));

var _slicedToArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/slicedToArray.js"));

var _react = _interopRequireWildcard(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _antd = __webpack_require__(/*! antd */ "./node_modules/antd/es/index.js");

var _config = __webpack_require__(/*! ./config */ "./src/app/pages/RecordMgr/ListTable/config.tsx");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var LocalConfig = {
  isSettedConfig: false,
  listTableConfig: {}
};

function ListTableRoot(props) {
  var list = props.list,
      loading = props.loading,
      handleToggleRowSelect = props.handleToggleRowSelect;

  var _useState = (0, _react.useState)([]),
      _useState2 = (0, _slicedToArray2.default)(_useState, 2),
      selectedRowKeysList = _useState2[0],
      setSelectedRowKeysList = _useState2[1];

  if (!LocalConfig.isSettedConfig) {
    LocalConfig.isSettedConfig = true;
    LocalConfig.listTableConfig.columns = _config.listTableConfig.columns(_objectSpread({}, props));
    LocalConfig.listTableConfig.table = _config.listTableConfig.table({});
  }

  (0, _react.useEffect)(function () {
    var selectedList = list.filter(function (item, index) {
      return item.isChcked && typeof item.key != 'undefined' && item.key != '';
    }).map(function (item, index) {
      return item.key || '';
    });
    setSelectedRowKeysList(selectedList);
  }, [list]);
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_table.default, (0, _extends2.default)({
    columns: LocalConfig.listTableConfig.columns,
    dataSource: list,
    size: "small",
    loading: loading
  }, LocalConfig.listTableConfig.table, {
    rowSelection: {
      selectedRowKeys: selectedRowKeysList,
      onChange: handleToggleRowSelect
    }
  })));
}

ListTableRoot.defaultProps = {
  list: [],
  loading: true
};

var _default = /*#__PURE__*/_react.default.memo(ListTableRoot);

exports.default = _default;

/***/ }),

/***/ "./src/app/pages/Root.tsx":
/*!********************************!*\
  !*** ./src/app/pages/Root.tsx ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js"));

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _renderRoutes = __webpack_require__(/*! ../utils/hoc/render-routes */ "./src/app/utils/hoc/render-routes.tsx");

var _router = __webpack_require__(/*! ../router */ "./src/app/router/index.ts");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function Root(props) {
  var authPath = '/';
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, (0, _renderRoutes.renderRoutes)(_router.routes, {
    authPath: authPath,
    noMatch: _router.noMatchComponent
  }, _objectSpread({}, props)));
}

var _default = Root;
exports.default = _default;

/***/ }),

/***/ "./src/app/router/index.ts":
/*!*********************************!*\
  !*** ./src/app/router/index.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.noMatchComponent = exports.routes = void 0;

var _Home = _interopRequireDefault(__webpack_require__(/*! @/pages/Home */ "./src/app/pages/Home/index.tsx"));

var _ = _interopRequireDefault(__webpack_require__(/*! @/pages/ErrorPage/404 */ "./src/app/pages/ErrorPage/404.tsx"));

var _List = _interopRequireDefault(__webpack_require__(/*! @/pages/RecordMgr/List */ "./src/app/pages/RecordMgr/List/index.tsx"));

var _Detail = _interopRequireDefault(__webpack_require__(/*! @/pages/RecordMgr/Detail */ "./src/app/pages/RecordMgr/Detail/index.tsx"));

var _Error = _interopRequireDefault(__webpack_require__(/*! @/pages/RecordMgr/Error */ "./src/app/pages/RecordMgr/Error/index.tsx"));

var routes = [{
  path: '/',
  exact: true,
  component: _Home.default
}, {
  path: '/record',
  component: _List.default,
  routes: [{
    path: '/record/detail/:id',
    component: _Detail.default
  }, {
    path: '/record/*',
    component: _Error.default
  }]
}, {
  path: '*',
  component: _.default
}];
exports.routes = routes;
var noMatchComponent = _.default;
exports.noMatchComponent = noMatchComponent;

/***/ }),

/***/ "./src/app/store/__mobx/testStore.ts":
/*!*******************************************!*\
  !*** ./src/app/store/__mobx/testStore.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.testMobxStore = void 0;

var _initializerDefineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/initializerDefineProperty */ "./node_modules/@babel/runtime/helpers/initializerDefineProperty.js"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js"));

var _applyDecoratedDescriptor2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/applyDecoratedDescriptor */ "./node_modules/@babel/runtime/helpers/applyDecoratedDescriptor.js"));

var _initializerWarningHelper2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/initializerWarningHelper */ "./node_modules/@babel/runtime/helpers/initializerWarningHelper.js"));

var _mobx = __webpack_require__(/*! mobx */ "./node_modules/mobx/dist/mobx.esm.js");

var _class, _descriptor;

var TestMobxStoreClass = (_class = /*#__PURE__*/function () {
  function TestMobxStoreClass() {
    (0, _classCallCheck2.default)(this, TestMobxStoreClass);
    (0, _initializerDefineProperty2.default)(this, "baseData", _descriptor, this);
    (0, _mobx.makeObservable)(this);
  }

  (0, _createClass2.default)(TestMobxStoreClass, [{
    key: "getStamp",
    get: function get() {
      return this.baseData.stamp;
    }
  }, {
    key: "modifyStamp",
    value: function modifyStamp(value) {
      this.baseData.stamp = value;
    }
  }]);
  return TestMobxStoreClass;
}(), (_descriptor = (0, _applyDecoratedDescriptor2.default)(_class.prototype, "baseData", [_mobx.observable], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return {
      index: 0,
      stamp: new Date().getTime()
    };
  }
}), (0, _applyDecoratedDescriptor2.default)(_class.prototype, "getStamp", [_mobx.computed], Object.getOwnPropertyDescriptor(_class.prototype, "getStamp"), _class.prototype), (0, _applyDecoratedDescriptor2.default)(_class.prototype, "modifyStamp", [_mobx.action], Object.getOwnPropertyDescriptor(_class.prototype, "modifyStamp"), _class.prototype)), _class);
var testMobxStore = new TestMobxStoreClass();
exports.testMobxStore = testMobxStore;

/***/ }),

/***/ "./src/app/store/gProfile/action.ts":
/*!******************************************!*\
  !*** ./src/app/store/gProfile/action.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateGlobalRunId = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js"));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/asyncToGenerator.js"));

var _utils = __webpack_require__(/*! @/utils/utils */ "./src/app/utils/utils.ts");

var _config = __webpack_require__(/*! ./config */ "./src/app/store/gProfile/config.ts");

var updateGlobalRunId = function updateGlobalRunId() {
  return /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(dispatch) {
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return (0, _utils.sleep)();

            case 2:
              dispatch({
                type: _config.ACTION_TYPE.MODIFY_GLOBAL_RUNID,
                data: Math.random()
              });

            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }();
};

exports.updateGlobalRunId = updateGlobalRunId;

/***/ }),

/***/ "./src/app/store/gProfile/config.ts":
/*!******************************************!*\
  !*** ./src/app/store/gProfile/config.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SERVER_RENDER = exports.CLIENT_RENDER = exports.REDUCER_G_PROFILE = exports.ACTION_TYPE = void 0;
var ACTION_TYPE;
exports.ACTION_TYPE = ACTION_TYPE;

(function (ACTION_TYPE) {
  ACTION_TYPE["MODIFY_GLOBAL_RUNID"] = "MODIFY_GLOBAL_RUNID";
})(ACTION_TYPE || (exports.ACTION_TYPE = ACTION_TYPE = {}));

var REDUCER_G_PROFILE = 'G_PROFILE_REDUCER';
/********************************* *********************************/

/********************************* *********************************/

exports.REDUCER_G_PROFILE = REDUCER_G_PROFILE;
var CLIENT_RENDER = "CLIENT_RENDER";
exports.CLIENT_RENDER = CLIENT_RENDER;
var SERVER_RENDER = "SERVER_RENDER";
exports.SERVER_RENDER = SERVER_RENDER;

/***/ }),

/***/ "./src/app/store/gProfile/reducer.ts":
/*!*******************************************!*\
  !*** ./src/app/store/gProfile/reducer.ts ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js"));

var _config = __webpack_require__(/*! ./config */ "./src/app/store/gProfile/config.ts");

var _store = __webpack_require__(/*! ./store */ "./src/app/store/gProfile/store.ts");

var actionTypeReducers = (0, _defineProperty2.default)({}, _config.ACTION_TYPE.MODIFY_GLOBAL_RUNID, function (state, actionData) {
  var newState = JSON.parse(JSON.stringify(state));
  newState.g_globalId = actionData.g_globalId;
  return newState;
});

var _default = function _default() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _store.createDefaultState)();
  var action = arguments.length > 1 ? arguments[1] : undefined;

  if (action.data && actionTypeReducers[action.type]) {
    return actionTypeReducers[action.type](state, action.data);
  }

  return state;
};

exports.default = _default;

/***/ }),

/***/ "./src/app/store/gProfile/store.ts":
/*!*****************************************!*\
  !*** ./src/app/store/gProfile/store.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createInitialState = createInitialState;
exports.createDefaultState = createDefaultState;

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js"));

var _config = __webpack_require__(/*! ./config */ "./src/app/store/gProfile/config.ts");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function createInitialState() {
  var g_RENDER_WAY = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _config.CLIENT_RENDER;
  return {
    g_RENDER_WAY: g_RENDER_WAY,
    g_globalId: String(new Date().getTime())
  };
}

function createDefaultState() {
  if (typeof window !== 'undefined' && window.__PRELOADED_STATE__) {
    return _objectSpread({}, window.__PRELOADED_STATE__[_config.REDUCER_G_PROFILE]);
  }

  return createInitialState();
}

/***/ }),

/***/ "./src/app/store/index.ts":
/*!********************************!*\
  !*** ./src/app/store/index.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configureStore = configureStore;

var _toConsumableArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "./node_modules/@babel/runtime/helpers/toConsumableArray.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js"));

var _redux = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");

var _reduxThunk = _interopRequireDefault(__webpack_require__(/*! redux-thunk */ "./node_modules/redux-thunk/es/index.js"));

var _reducer = _interopRequireDefault(__webpack_require__(/*! ./gProfile/reducer */ "./src/app/store/gProfile/reducer.ts"));

var _reducer2 = _interopRequireDefault(__webpack_require__(/*! ./record/reducer */ "./src/app/store/record/reducer.ts"));

var _config = __webpack_require__(/*! ./gProfile/config */ "./src/app/store/gProfile/config.ts");

var _config2 = __webpack_require__(/*! ./record/config */ "./src/app/store/record/config.ts");

function createCombineReducers() {
  var _combineReducers;

  return (0, _redux.combineReducers)((_combineReducers = {}, (0, _defineProperty2.default)(_combineReducers, _config.REDUCER_G_PROFILE, _reducer.default), (0, _defineProperty2.default)(_combineReducers, _config2.REDUCER_RECORD_REDUCER, _reducer2.default), _combineReducers));
}

function configureStore() {
  var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var initialState = params.initialState,
      middleware = params.middleware;

  var devtools = typeof window !== 'undefined' && typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'function' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    actionsBlacklist: []
  });

  var composeEnhancers = devtools || _redux.compose;
  var store = null;

  if (typeof initialState == 'undefined') {
    var _ref;

    store = (0, _redux.createStore)(createCombineReducers(), composeEnhancers(_redux.applyMiddleware.apply(void 0, (0, _toConsumableArray2.default)((_ref = [_reduxThunk.default]).concat.apply(_ref, (0, _toConsumableArray2.default)(middleware || []))))));
  } else {
    var _ref2;

    store = (0, _redux.createStore)(createCombineReducers(), initialState, composeEnhancers(_redux.applyMiddleware.apply(void 0, (0, _toConsumableArray2.default)((_ref2 = [_reduxThunk.default]).concat.apply(_ref2, (0, _toConsumableArray2.default)(middleware || []))))));
  } // store.subscribe(() => {
  // 	console.log(`==> store.subscribe: `, store.getState())
  // })


  return store;
}

/***/ }),

/***/ "./src/app/store/record/action.ts":
/*!****************************************!*\
  !*** ./src/app/store/record/action.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleToggleRowSelectAction = exports.updateItemRequestAction = exports.fetchItemRequestAction = exports.deleteItemsRequestAction = exports.addItemRequestAction = exports.fetchListRequestAction = exports.testAsyncTask = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js"));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/asyncToGenerator.js"));

var _record = __webpack_require__(/*! ../../model/record */ "./src/app/model/record.ts");

var _config = __webpack_require__(/*! ./config */ "./src/app/store/record/config.ts");

var testAsyncTask = function testAsyncTask() {
  return /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(dispatch) {
      return _regenerator.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              window.setTimeout(function () {
                /* ... */
              }, 750);

            case 1:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }();
};

exports.testAsyncTask = testAsyncTask;

var fetchListRequestAction = function fetchListRequestAction(params) {
  return /*#__PURE__*/function () {
    var _ref2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(dispatch) {
      var res;
      return _regenerator.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return (0, _record.fetchList)(params);

            case 3:
              res = _context2.sent;
              dispatch({
                type: _config.ACTION_TYPE.MODIFY_RECORD_LIST,
                data: {
                  list: res.data.list
                }
              });
              dispatch({
                type: _config.ACTION_TYPE.MODIFY_COUNTTOTAL,
                data: {
                  countTotal: res.data.countTotal || 0
                }
              });
              return _context2.abrupt("return", res);

            case 9:
              _context2.prev = 9;
              _context2.t0 = _context2["catch"](0);
              return _context2.abrupt("return", Promise.reject(_context2.t0));

            case 12:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, null, [[0, 9]]);
    }));

    return function (_x2) {
      return _ref2.apply(this, arguments);
    };
  }();
};

exports.fetchListRequestAction = fetchListRequestAction;

var addItemRequestAction = function addItemRequestAction(params) {
  return /*#__PURE__*/function () {
    var _ref3 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3(dispatch) {
      var res;
      return _regenerator.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return (0, _record.addItem)(params);

            case 3:
              res = _context3.sent;
              return _context3.abrupt("return", res);

            case 7:
              _context3.prev = 7;
              _context3.t0 = _context3["catch"](0);
              return _context3.abrupt("return", Promise.reject(_context3.t0));

            case 10:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, null, [[0, 7]]);
    }));

    return function (_x3) {
      return _ref3.apply(this, arguments);
    };
  }();
};

exports.addItemRequestAction = addItemRequestAction;

var deleteItemsRequestAction = function deleteItemsRequestAction(ids) {
  return /*#__PURE__*/function () {
    var _ref4 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4(dispatch) {
      var res;
      return _regenerator.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              dispatch({
                type: _config.ACTION_TYPE.SET_ROW_LOADING_STATUS,
                data: {
                  ids: ids,
                  loading: true
                }
              });
              _context4.next = 4;
              return (0, _record.delItems)(ids);

            case 4:
              res = _context4.sent;
              dispatch({
                type: _config.ACTION_TYPE.REMOVE_RECORD_ITEM,
                data: {
                  ids: ids
                }
              });
              return _context4.abrupt("return", res);

            case 9:
              _context4.prev = 9;
              _context4.t0 = _context4["catch"](0);
              dispatch({
                type: _config.ACTION_TYPE.SET_ROW_LOADING_STATUS,
                data: {
                  ids: ids,
                  loading: false
                }
              });
              return _context4.abrupt("return", Promise.reject(_context4.t0));

            case 13:
            case "end":
              return _context4.stop();
          }
        }
      }, _callee4, null, [[0, 9]]);
    }));

    return function (_x4) {
      return _ref4.apply(this, arguments);
    };
  }();
};

exports.deleteItemsRequestAction = deleteItemsRequestAction;

var fetchItemRequestAction = function fetchItemRequestAction(id) {
  return /*#__PURE__*/function () {
    var _ref5 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee5(dispatch) {
      var res;
      return _regenerator.default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              _context5.next = 3;
              return (0, _record.fetchItem)(id);

            case 3:
              res = _context5.sent;
              return _context5.abrupt("return", res);

            case 7:
              _context5.prev = 7;
              _context5.t0 = _context5["catch"](0);
              return _context5.abrupt("return", Promise.reject(_context5.t0));

            case 10:
            case "end":
              return _context5.stop();
          }
        }
      }, _callee5, null, [[0, 7]]);
    }));

    return function (_x5) {
      return _ref5.apply(this, arguments);
    };
  }();
};

exports.fetchItemRequestAction = fetchItemRequestAction;

var updateItemRequestAction = function updateItemRequestAction(id, params) {
  return /*#__PURE__*/function () {
    var _ref6 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee6(dispatch) {
      var res;
      return _regenerator.default.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.prev = 0;
              _context6.next = 3;
              return (0, _record.updateItem)(id, params);

            case 3:
              res = _context6.sent;
              return _context6.abrupt("return", res);

            case 7:
              _context6.prev = 7;
              _context6.t0 = _context6["catch"](0);
              return _context6.abrupt("return", Promise.reject(_context6.t0));

            case 10:
            case "end":
              return _context6.stop();
          }
        }
      }, _callee6, null, [[0, 7]]);
    }));

    return function (_x6) {
      return _ref6.apply(this, arguments);
    };
  }();
};

exports.updateItemRequestAction = updateItemRequestAction;

var handleToggleRowSelectAction = function handleToggleRowSelectAction(selectedKeys) {
  return {
    type: _config.ACTION_TYPE.TOGGLE_SELECT_KEYS,
    data: {
      selectedKeys: selectedKeys
    }
  };
};

exports.handleToggleRowSelectAction = handleToggleRowSelectAction;

/***/ }),

/***/ "./src/app/store/record/config.ts":
/*!****************************************!*\
  !*** ./src/app/store/record/config.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.REDUCER_RECORD_REDUCER = exports.ACTION_TYPE = void 0;
var ACTION_TYPE;
exports.ACTION_TYPE = ACTION_TYPE;

(function (ACTION_TYPE) {
  ACTION_TYPE["MODIFY_RECORD_LIST"] = "MODIFY_RECORD_LIST";
  ACTION_TYPE["SET_ROW_LOADING_STATUS"] = "SET_ROW_LOADING_STATUS";
  ACTION_TYPE["REMOVE_RECORD_ITEM"] = "REMOVE_RECORD_ITEM";
  ACTION_TYPE["TOGGLE_SELECT_KEYS"] = "TOGGLE_SELECT_KEYS";
  ACTION_TYPE["MODIFY_COUNTTOTAL"] = "MODIFY_COUNTTOTAL";
})(ACTION_TYPE || (exports.ACTION_TYPE = ACTION_TYPE = {}));

var REDUCER_RECORD_REDUCER = 'RECORD_REDUCER';
/********************************* *********************************/

/********************************* *********************************/

exports.REDUCER_RECORD_REDUCER = REDUCER_RECORD_REDUCER;

/***/ }),

/***/ "./src/app/store/record/reducer.ts":
/*!*****************************************!*\
  !*** ./src/app/store/record/reducer.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js"));

var _config = __webpack_require__(/*! ./config */ "./src/app/store/record/config.ts");

var _utils = __webpack_require__(/*! ../../utils/utils */ "./src/app/utils/utils.ts");

var _store = __webpack_require__(/*! ./store */ "./src/app/store/record/store.ts");

var _actionTypeReducers;

var actionTypeReducers = (_actionTypeReducers = {}, (0, _defineProperty2.default)(_actionTypeReducers, _config.ACTION_TYPE.MODIFY_RECORD_LIST, function (state, actionData) {
  var newState = JSON.parse(JSON.stringify(state));
  newState.list = [].concat(actionData.list);
  return newState;
}), (0, _defineProperty2.default)(_actionTypeReducers, _config.ACTION_TYPE.SET_ROW_LOADING_STATUS, function (state, actionData) {
  var newState = JSON.parse(JSON.stringify(state));
  var ids = actionData.ids || [];
  newState.list.forEach(function (item, index) {
    if (ids.includes(item.id)) {
      item.isLoading = !!actionData.loading;
    }
  });
  return newState;
}), (0, _defineProperty2.default)(_actionTypeReducers, _config.ACTION_TYPE.REMOVE_RECORD_ITEM, function (state, actionData) {
  var newState = JSON.parse(JSON.stringify(state));
  var ids = actionData.ids || [];
  ids.forEach(function (item, index) {
    var findRes = (0, _utils.findResults)(newState.list, 'id', item);

    if (findRes.index <= -1) {
      return;
    }

    newState.list.splice(findRes.index, 1);
  });
  return newState;
}), (0, _defineProperty2.default)(_actionTypeReducers, _config.ACTION_TYPE.TOGGLE_SELECT_KEYS, function (state, acionData) {
  var newState = JSON.parse(JSON.stringify(state));
  var selectedKeys = acionData.selectedKeys;
  newState.list.forEach(function (item, index) {
    if (item.key) {
      item.isChcked = !!selectedKeys.includes(+item.key);
    }
  });
  return newState;
}), (0, _defineProperty2.default)(_actionTypeReducers, _config.ACTION_TYPE.MODIFY_COUNTTOTAL, function (state, acionData) {
  var newState = JSON.parse(JSON.stringify(state));
  newState.countTotal = acionData.countTotal;
  return newState;
}), _actionTypeReducers);

var _default = function _default() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _store.createDefaultState)();
  var action = arguments.length > 1 ? arguments[1] : undefined;
  var func = actionTypeReducers[action.type] || null;

  if (action.data && func) {
    return func(state, action.data);
  }

  return state;
};

exports.default = _default;

/***/ }),

/***/ "./src/app/store/record/store.ts":
/*!***************************************!*\
  !*** ./src/app/store/record/store.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createInitialState = createInitialState;
exports.createDefaultState = createDefaultState;

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js"));

var _config = __webpack_require__(/*! ./config */ "./src/app/store/record/config.ts");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function createInitialState() {
  return {
    list: [],
    countTotal: 0
  };
}

function createDefaultState() {
  if (typeof window !== 'undefined' && window.__PRELOADED_STATE__) {
    return _objectSpread({}, window.__PRELOADED_STATE__[_config.REDUCER_RECORD_REDUCER]);
  }

  return createInitialState();
}

/***/ }),

/***/ "./src/app/utils/clock.canvas.ts":
/*!***************************************!*\
  !*** ./src/app/utils/clock.canvas.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/createClass.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var BASE_DEGREE = Math.PI / 180;
var gClockProfile = {
  /* 画布尺寸 */
  canvasWidth: 200,
  canvasHeight: 200,

  /* 表盘半径 */
  clockRadius: 0,
  innerClockRadius: 0,

  /* 表盘标记 */
  distOfMark2Outline: 10,
  hourMarkStrokeColor: '#ffffff',
  hourMarkWidth: 3,
  hourMarkLength: 20,
  minMarkStrokeColor: '#536b7a',
  minMarkWidth: 2,
  minMarkLength: 10,

  /* 文本标记 */
  distOfTextMark2Outline: 50,
  timeTextMarkFillColor: '#58717e',
  timeTextMarkFont: '32px Microsoft yahei',

  /* 指针 */
  hourHandFillColor: '#ffffff',
  hourHandStrokeColor: '#ffffff',
  hourHandWidth: 10,
  hourHandLength: 0,
  minHandFillColor: '#ffffff',
  minHandStrokeColor: '#ffffff',
  minHandWidth: 6,
  minHandLength: 0,
  secHandFillColor: '#ffffff',
  secHandStrokeColor: '#ffffff',
  secHandWidth: 4,
  secHandLength: 0,
  secHandOverflowLength: 38,

  /* 中心圆/环 */
  centerCircleRadius: 15,
  centerCircleFillColor: '#ffffff',
  centerRingInnerRadius: 8,
  centerRingWidth: 1,
  centerRingFillColor: '#cdd2d5',

  /* 边框 */
  clockOutlineWidth: 8
};

function initialProfile() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var o = JSON.parse(JSON.stringify(gClockProfile));

  var profile = _objectSpread(_objectSpread({}, o), options);

  var baseSize = Math.min(profile.canvasWidth, profile.canvasHeight);

  if (!profile.clockRadius) {
    profile.clockRadius = baseSize * 0.5;
  }

  profile.innerClockRadius = profile.clockRadius - profile.clockOutlineWidth;

  if (!profile.hourHandLength) {
    profile.hourHandLength = profile.innerClockRadius - 45;
  }

  if (!profile.minHandLength) {
    profile.minHandLength = profile.innerClockRadius - 15;
  }

  if (!profile.secHandLength) {
    profile.secHandLength = profile.innerClockRadius - 10;
  }

  return profile;
}

function drawCanvas(canvasElement, profile) {
  if (!canvasElement || canvasElement.nodeName.toUpperCase() != 'CANVAS') {
    return;
  }

  var ctx = canvasElement.getContext('2d');
  var now = new Date();
  var sec = now.getSeconds();
  var min = now.getMinutes();
  var hour = now.getHours();
  var msec = now.getMilliseconds();
  /* 保存一份初始 ctx 状态 */

  ctx.save();
  /* 
         绘制表盘底色 
     */

  ctx.clearRect(0, 0, profile.canvasWidth, profile.canvasHeight);
  var lingrad = ctx.createLinearGradient(0, 0, profile.canvasWidth, profile.canvasHeight);
  lingrad.addColorStop(0, '#242f37');
  lingrad.addColorStop(1, '#48585c');
  ctx.fillStyle = lingrad;
  ctx.arc(profile.canvasWidth * 0.5, profile.canvasHeight * 0.5, profile.innerClockRadius, 0, Math.PI * 2, true);
  ctx.fill();
  ctx.restore();
  ctx.save();
  /* 
         小时刻度 
     */

  ctx.translate(profile.canvasWidth * 0.5, profile.canvasHeight * 0.5);
  var hourMarkStartX = profile.innerClockRadius - profile.distOfMark2Outline;

  for (var i = 0; i < 12; i++) {
    ctx.beginPath();
    ctx.strokeStyle = profile.hourMarkStrokeColor;
    ctx.lineWidth = profile.hourMarkWidth;
    ctx.rotate(30 * BASE_DEGREE);
    ctx.moveTo(hourMarkStartX, 0);
    ctx.lineTo(hourMarkStartX - profile.hourMarkLength, 0);
    ctx.stroke();
  }

  ctx.restore();
  ctx.save();
  /* 
         分钟刻度 
     */

  ctx.translate(profile.canvasWidth * 0.5, profile.canvasHeight * 0.5);
  var minMarkStartX = profile.innerClockRadius - profile.distOfMark2Outline;

  for (var _i = 1; _i <= 60; _i++) {
    if (_i % 5 !== 0) {
      ctx.beginPath();
      ctx.strokeStyle = profile.minMarkStrokeColor;
      ctx.lineWidth = profile.minMarkWidth;
      ctx.rotate(6 * BASE_DEGREE);
      ctx.moveTo(minMarkStartX, 0);
      ctx.lineTo(minMarkStartX - profile.minMarkLength, 0);
      ctx.stroke();
      continue;
    }

    ctx.rotate(6 * BASE_DEGREE);
  }

  ctx.restore();
  ctx.save();
  /* 
         文本标记 
     */

  ctx.translate(profile.canvasWidth * 0.5, profile.canvasHeight * 0.5);
  var textMarkStatRelativeX = profile.innerClockRadius - profile.distOfTextMark2Outline;
  ctx.fillStyle = profile.timeTextMarkFillColor;
  ctx.font = profile.timeTextMarkFont;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('3', textMarkStatRelativeX, 4);
  ctx.fillText('6', 0, textMarkStatRelativeX);
  ctx.fillText('9', -textMarkStatRelativeX, 4);
  ctx.fillText('12', 0, -textMarkStatRelativeX);
  ctx.restore();
  ctx.save();
  /* 
         秒针 
     */

  ctx.translate(profile.canvasWidth * 0.5, profile.canvasHeight * 0.5);
  ctx.rotate(-90 * BASE_DEGREE);
  ctx.lineWidth = profile.secHandWidth;
  ctx.strokeStyle = profile.secHandStrokeColor;
  ctx.rotate(360 * (sec * 1000 + msec) / 60000 * BASE_DEGREE);
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(profile.secHandLength, 0);
  ctx.stroke();
  ctx.closePath();
  ctx.restore();
  ctx.save();
  /* 
         分针 
     */

  ctx.translate(profile.canvasWidth * 0.5, profile.canvasHeight * 0.5);
  ctx.rotate(-90 * BASE_DEGREE);
  ctx.lineWidth = profile.minHandWidth;
  ctx.strokeStyle = profile.minHandStrokeColor;
  ctx.rotate(6 * min * BASE_DEGREE + 6 * sec / 60 * BASE_DEGREE);
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(profile.minHandLength, 0);
  ctx.stroke();
  ctx.closePath();
  ctx.restore();
  ctx.save();
  /* 
         时针 
     */

  ctx.translate(profile.canvasWidth * 0.5, profile.canvasHeight * 0.5);
  ctx.rotate(-90 * BASE_DEGREE);
  ctx.lineWidth = profile.hourHandWidth;
  ctx.strokeStyle = profile.hourHandStrokeColor;
  ctx.rotate(30 * (hour % 12) * BASE_DEGREE + 30 * min / 60 * BASE_DEGREE);
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(profile.hourHandLength, 0);
  ctx.stroke();
  ctx.closePath();
  ctx.restore();
  ctx.save();
  /* 
         针中心环 
     */

  ctx.translate(profile.canvasWidth * 0.5, profile.canvasHeight * 0.5);
  ctx.beginPath();
  ctx.fillStyle = profile.centerCircleFillColor;
  ctx.arc(0, 0, profile.centerCircleRadius, 0, Math.PI * 2, true);
  ctx.fill();
  ctx.closePath();
  /* 针中心圆 */

  ctx.beginPath();
  ctx.strokeStyle = profile.centerRingFillColor;
  ctx.lineWidth = profile.centerRingWidth;
  ctx.arc(0, 0, profile.centerRingInnerRadius, 0, Math.PI * 2, true);
  ctx.stroke();
  ctx.closePath();
  ctx.restore();
  ctx.save();
  /* 
         秒针针尾 
     */

  ctx.translate(profile.canvasWidth * 0.5, profile.canvasHeight * 0.5);
  ctx.rotate(-90 * BASE_DEGREE);
  ctx.beginPath();
  ctx.lineWidth = profile.secHandWidth;
  ctx.strokeStyle = profile.secHandStrokeColor;
  ctx.rotate(360 * (sec * 1000 + msec) / 60000 * BASE_DEGREE);
  ctx.moveTo(0, 0);
  ctx.lineTo(-profile.secHandOverflowLength, 0);
  ctx.stroke();
  ctx.closePath();
  ctx.restore();
  ctx.save();
  /* 
         表面边框 
     */

  ctx.translate(profile.canvasWidth * 0.5, profile.canvasHeight * 0.5);
  var lingradOutline = ctx.createLinearGradient(profile.innerClockRadius, 0, -profile.innerClockRadius, 0);
  ctx.beginPath();
  ctx.lineWidth = profile.clockOutlineWidth;
  lingradOutline.addColorStop(0, '#adb9c5');
  lingradOutline.addColorStop(1, '#e9eced');
  ctx.strokeStyle = lingradOutline;
  ctx.arc(0, 0, profile.innerClockRadius, 0, Math.PI * 2, true);
  ctx.stroke();
  ctx.closePath();
  ctx.restore();
}

var Clock = /*#__PURE__*/function () {
  function Clock(canvasElement, profile) {
    (0, _classCallCheck2.default)(this, Clock);
    (0, _defineProperty2.default)(this, "rAFHandle", void 0);
    (0, _defineProperty2.default)(this, "canvasElement", void 0);
    (0, _defineProperty2.default)(this, "profile", void 0);
    this.canvasElement = canvasElement;
    this.profile = initialProfile(profile);
  }

  (0, _createClass2.default)(Clock, [{
    key: "render",
    value: function render() {
      var _this = this;

      var r = function r() {
        drawCanvas(_this.canvasElement, _this.profile);
        _this.rAFHandle = window.requestAnimationFrame(r);
      };

      r();
    }
  }, {
    key: "cancel",
    value: function cancel() {
      window.cancelAnimationFrame(this.rAFHandle);
    }
  }]);
  return Clock;
}();

exports.default = Clock;

/***/ }),

/***/ "./src/app/utils/hoc/render-routes.tsx":
/*!*********************************************!*\
  !*** ./src/app/utils/hoc/render-routes.tsx ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderRoutes = renderRoutes;

var _extends2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/extends.js"));

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _reactRouterDom = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");

function createSpecRoute(route, profile, outerProps) {
  var SpecComponent = null;

  if (route.noMatch) {
    SpecComponent = route.noMatch;
  }

  if (profile.noMatch) {
    SpecComponent = profile.noMatch;
  }

  if (SpecComponent) {
    return /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
      path: route.path,
      render: function render(props) {
        return /*#__PURE__*/_react.default.createElement(SpecComponent, (0, _extends2.default)({
          path: route.path
        }, props, outerProps));
      }
    });
  }

  return null;
}

function createRouteComponentList(routes, profile, outerProps) {
  return routes.map(function (route, index) {
    return /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
      key: route.path,
      path: route.path,
      exact: route.exact,
      strict: route.strict,
      render: function render(props) {
        if (!route.requiresAuth || route.path === profile.authPath) {
          return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Switch, null, createRouteComponentList(route.routes || route.children || [], profile, outerProps), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
            exact: true,
            path: route.path,
            render: function render(props) {
              return /*#__PURE__*/_react.default.createElement(route.component, (0, _extends2.default)({
                exact: true,
                path: route.path
              }, props, outerProps));
            }
          }), createSpecRoute(route, profile, outerProps)));
        }

        return /*#__PURE__*/_react.default.createElement(_reactRouterDom.Redirect, (0, _extends2.default)({
          to: {
            pathname: profile.authPath
          }
        }, props));
      }
    });
  });
}

function renderRoutes(routes, profile, outerProps) {
  return /*#__PURE__*/_react.default.createElement(_reactRouterDom.Switch, null, createRouteComponentList(routes, profile, outerProps));
}

/***/ }),

/***/ "./src/app/utils/hoc/with-dialog.tsx":
/*!*******************************************!*\
  !*** ./src/app/utils/hoc/with-dialog.tsx ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

var _typeof3 = __webpack_require__(/*! @babel/runtime/helpers/typeof */ "./node_modules/@babel/runtime/helpers/typeof.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withDialog = void 0;

__webpack_require__(/*! antd/lib/modal/style */ "./node_modules/antd/lib/modal/style/index.js");

var _modal = _interopRequireDefault(__webpack_require__(/*! antd/lib/modal */ "./node_modules/antd/lib/modal/index.js"));

var _extends2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/extends.js"));

var _typeof2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/typeof */ "./node_modules/@babel/runtime/helpers/typeof.js"));

var _slicedToArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/slicedToArray.js"));

var _react = _interopRequireWildcard(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _reactDom = _interopRequireDefault(__webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js"));

var _antd = __webpack_require__(/*! antd */ "./node_modules/antd/es/index.js");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof3(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var withDialog = function withDialog(WrappedComponent) {
  var container = null;

  var EnhancedComponent = function EnhancedComponent(props) {
    var methods = props.methods,
        data = props.data;

    var _useState = (0, _react.useState)(data),
        _useState2 = (0, _slicedToArray2.default)(_useState, 2),
        iData = _useState2[0],
        setIData = _useState2[1];

    var _useState3 = (0, _react.useState)(props),
        _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
        iProps = _useState4[0],
        setProps = _useState4[1];

    EnhancedComponent.setData = setIData;

    EnhancedComponent.getData = function () {
      return (0, _typeof2.default)(iData) == 'object' ? JSON.parse(JSON.stringify(iData)) : iData;
    };

    EnhancedComponent.setProps = setProps;

    EnhancedComponent.getProps = function () {
      return iProps;
    };

    (0, _react.useEffect)(function () {
      props.onMounted && props.onMounted();
      props.onUpdate && props.onUpdate(iData);
      return function () {
        props.onUnmounted && props.onUnmounted();
      };
    }, []);
    return /*#__PURE__*/_react.default.createElement(_modal.default, (0, _extends2.default)({
      maskClosable: false
    }, iProps, {
      visible: true
    }), /*#__PURE__*/_react.default.createElement(WrappedComponent, (0, _extends2.default)({}, iData || {}, methods || {}, {
      __isInModal: true
    })));
  };

  EnhancedComponent.open = function (params) {
    container = document.createElement('section');
    document.body.appendChild(container);

    var handleClose = function handleClose() {
      var onCancel = params.onCancel;

      if (typeof onCancel === 'function' && onCancel() === false) {
        return;
      }

      EnhancedComponent.close();
    };

    _reactDom.default.render( /*#__PURE__*/_react.default.createElement(EnhancedComponent, (0, _extends2.default)({}, params, {
      onCancel: handleClose
    })), container);
  };

  EnhancedComponent.close = function () {
    if (!container) {
      return;
    }

    _reactDom.default.unmountComponentAtNode(container);

    document.body.removeChild(container);
    EnhancedComponent.setData = new Function();
    EnhancedComponent.getData = new Function();
  };

  EnhancedComponent.setData = new Function();
  EnhancedComponent.getData = new Function();
  EnhancedComponent.setProps = new Function();
  EnhancedComponent.getProps = new Function();
  return EnhancedComponent;
};

exports.withDialog = withDialog;

/***/ }),

/***/ "./src/app/utils/hoc/with-loading.tsx":
/*!********************************************!*\
  !*** ./src/app/utils/hoc/with-loading.tsx ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

var _typeof = __webpack_require__(/*! @babel/runtime/helpers/typeof */ "./node_modules/@babel/runtime/helpers/typeof.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withLoading = void 0;

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js"));

var _extends2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/extends.js"));

var _slicedToArray2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/slicedToArray.js"));

var _react = _interopRequireWildcard(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _reactDom = _interopRequireDefault(__webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var withLoading = function withLoading(WrappedComponent) {
  var container = null;

  var EnhancedComponent = function EnhancedComponent(props) {
    var _useState = (0, _react.useState)({
      isHide: false
    }),
        _useState2 = (0, _slicedToArray2.default)(_useState, 2),
        loadState = _useState2[0],
        setLoadState = _useState2[1];

    EnhancedComponent.loadState = loadState;
    EnhancedComponent.setLoadState = setLoadState;
    return /*#__PURE__*/_react.default.createElement("main", null, /*#__PURE__*/_react.default.createElement(WrappedComponent, (0, _extends2.default)({}, loadState, props, {
      __isInLoading: true,
      onHideEnd: EnhancedComponent._onHideEnd
    })));
  };

  EnhancedComponent.setLoadState = new Function();

  EnhancedComponent._onHideEnd = function () {
    if (!container) {
      return;
    }

    _reactDom.default.unmountComponentAtNode(container);

    document.body.removeChild(container);
  };

  EnhancedComponent.show = function () {
    container = document.createElement('section');
    document.body.appendChild(container);

    _reactDom.default.render( /*#__PURE__*/_react.default.createElement(EnhancedComponent, null), container);
  };

  EnhancedComponent.hide = function () {
    if (!container) {
      return;
    }

    window.setTimeout(function () {
      EnhancedComponent.setLoadState(_objectSpread(_objectSpread({}, EnhancedComponent.loadState), {}, {
        isHide: true
      }));
      EnhancedComponent.loadState = null;
      EnhancedComponent.setLoadState = new Function();
    });
  };

  return EnhancedComponent;
};

exports.withLoading = withLoading;

/***/ }),

/***/ "./src/app/utils/utils.ts":
/*!********************************!*\
  !*** ./src/app/utils/utils.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createDefaultErrorResponse = createDefaultErrorResponse;
exports.createDefaultSuccessResponse = createDefaultSuccessResponse;
exports.sleep = sleep;
exports.getQueryValueOfUrl = getQueryValueOfUrl;
exports.formatDates = formatDates;
exports.findResults = findResults;

var _regenerator = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js"));

var _asyncToGenerator2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/asyncToGenerator.js"));

function createDefaultErrorResponse() {
  var ret = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : -1;
  var msg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

  var __remote = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

  return {
    ret: ret,
    msg: msg,
    data: data,
    __remote: __remote
  };
}

function createDefaultSuccessResponse() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var ret = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var msg = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

  var __remote = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;

  return {
    ret: ret,
    msg: msg,
    data: data,
    __remote: __remote
  };
}

function sleep() {
  return _sleep.apply(this, arguments);
}

function _sleep() {
  _sleep = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee() {
    var delay,
        _args = arguments;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            delay = _args.length > 0 && _args[0] !== undefined ? _args[0] : 1000;
            return _context.abrupt("return", new Promise(function (_, reject) {
              window.setTimeout(_, delay);
            }));

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _sleep.apply(this, arguments);
}

function getQueryValueOfUrl(name) {
  var r = window.location.search.substr(1).match(new RegExp('(^|&)' + name + '=([^&]*)(&|$)'));
  return r != null ? unescape(r[2]) : '';
}

function formatDates() {
  var date = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Date();
  var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'yyyy-MM-dd HH:ii:ss';
  var o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'H+': date.getHours(),
    'h+': date.getHours(),
    'i+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    S: date.getMilliseconds()
  };

  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }

  for (var k in o) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
    }
  }

  return format;
}

function findResults(list, key, value) {
  var res = {
    index: -1,
    data: {}
  };
  var len = list.length;

  if (len <= 0) {
    return res;
  }

  for (var i = len - 1; i >= 0; i--) {
    if (list[i][key] === value) {
      res.index = i;
      res.data = list[i];
      return res;
    }
  }

  return res;
}

/***/ }),

/***/ "./src/client/index.tsx":
/*!******************************!*\
  !*** ./src/client/index.tsx ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/@babel/runtime/helpers/interopRequireDefault.js");

var _typeof = __webpack_require__(/*! @babel/runtime/helpers/typeof */ "./node_modules/@babel/runtime/helpers/typeof.js");

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/defineProperty.js"));

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _reactDom = _interopRequireWildcard(__webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js"));

var _reactRouterDom = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");

var _reactHelmetAsync = __webpack_require__(/*! react-helmet-async */ "./node_modules/react-helmet-async/lib/index.module.js");

var _reactRedux = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");

var _store = __webpack_require__(/*! ../app/store */ "./src/app/store/index.ts");

var _App = _interopRequireDefault(__webpack_require__(/*! ../app/App.Server */ "./src/app/App.Server.tsx"));

var _App2 = _interopRequireDefault(__webpack_require__(/*! ../app/App.Client */ "./src/app/App.Client.tsx"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var store = null;

if (false) {} else {
  store = window.store || (0, _store.configureStore)(_objectSpread({}, window.__PRELOADED_STATE__ || {}));
  (0, _reactDom.hydrate)( /*#__PURE__*/_react.default.createElement(_reactRedux.Provider, {
    store: store
  }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.BrowserRouter, null, /*#__PURE__*/_react.default.createElement(_reactHelmetAsync.HelmetProvider, null, /*#__PURE__*/_react.default.createElement(_App.default, null)))), document.getElementById('app'));
}

Object.defineProperty(window, 'store', {
  value: store
});
Object.defineProperty(window, 'env', {
  value: "development"
});

/***/ }),

/***/ 0:
/*!***********************************************************************************************************!*\
  !*** multi webpack-hot-middleware/client?path=http://127.0.0.1:3101/__webpack_hmr ./src/client/index.tsx ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! webpack-hot-middleware/client?path=http://127.0.0.1:3101/__webpack_hmr */"./node_modules/webpack-hot-middleware/client.js?path=http://127.0.0.1:3101/__webpack_hmr");
module.exports = __webpack_require__(/*! D:\Users\Administrator\Desktop\WebDev Document\local-project\react-initbase\src\client\index.tsx */"./src/client/index.tsx");


/***/ })

/******/ });
//# sourceMappingURL=srcipt.9e0bdb9b.js.map