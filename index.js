/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
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
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
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
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/Models/ClassEntry.ts":
/*!**********************************!*\
  !*** ./src/Models/ClassEntry.ts ***!
  \**********************************/
/*! exports provided: ClassEntry */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ClassEntry", function() { return ClassEntry; });
var ClassEntry = /** @class */ (function () {
    function ClassEntry(professors, schedule) {
        this.professors = professors;
        this.schedule = schedule;
    }
    return ClassEntry;
}());



/***/ }),

/***/ "./src/Models/ClassScheduleEntry.ts":
/*!******************************************!*\
  !*** ./src/Models/ClassScheduleEntry.ts ***!
  \******************************************/
/*! exports provided: ClassScheduleEntry */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ClassScheduleEntry", function() { return ClassScheduleEntry; });
var ClassScheduleEntry = /** @class */ (function () {
    function ClassScheduleEntry(weekDay, beginTime, endTime, classRoom) {
        this.weekDay = weekDay;
        this.beginTime = beginTime;
        this.endTime = endTime;
        this.classRoom = classRoom;
    }
    return ClassScheduleEntry;
}());



/***/ }),

/***/ "./src/Models/DayTime.ts":
/*!*******************************!*\
  !*** ./src/Models/DayTime.ts ***!
  \*******************************/
/*! exports provided: DayTime */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DayTime", function() { return DayTime; });
var DayTime = /** @class */ (function () {
    function DayTime(hour, minute) {
        if (!(0 <= hour && hour <= 23)) {
            throw new Error("Hour must be within 0 and 23, but \"" + hour + "\" was received!");
        }
        if (!(0 <= minute && minute <= 59)) {
            throw new Error("Minute must be within 0 and 59, but \"" + minute + " was received!");
        }
        this.hour = hour;
        this.minute = minute;
    }
    DayTime.fromString = function (string) {
        if (!/^\d\d:\d\d$/.test(string)) {
            throw new Error("Invalid DayTime string format!");
        }
        var _a = string.split(":"), hourString = _a[0], minuteString = _a[1];
        return new DayTime(parseInt(hourString), parseInt(minuteString));
    };
    DayTime.prototype.getHour = function () {
        return this.hour;
    };
    DayTime.prototype.getMinute = function () {
        return this.minute;
    };
    DayTime.prototype.compare = function (other) {
        if (this.hour < other.hour) {
            return -1;
        }
        else if (this.hour > other.hour) {
            return 1;
        }
        else {
            if (this.minute < other.minute) {
                return -1;
            }
            else if (this.minute > other.minute) {
                return 1;
            }
            else {
                return 0;
            }
        }
    };
    return DayTime;
}());



/***/ }),

/***/ "./src/Models/InstituteEntry.ts":
/*!**************************************!*\
  !*** ./src/Models/InstituteEntry.ts ***!
  \**************************************/
/*! exports provided: InstituteEntry */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InstituteEntry", function() { return InstituteEntry; });
var InstituteEntry = /** @class */ (function () {
    function InstituteEntry(acronym, name, link) {
        this.acronym = acronym;
        this.name = name;
        this.link = link;
        this.subjectEntries = [];
    }
    InstituteEntry.deserialize = function (object) {
        var _a = object, acronym = _a.acronym, name = _a.name, link = _a.link, subjectEntries = _a.subjectEntries;
        var entry = new InstituteEntry(acronym, name, link);
        entry.subjectEntries = subjectEntries;
        return entry;
    };
    return InstituteEntry;
}());



/***/ }),

/***/ "./src/Models/ProfessorProfile.ts":
/*!****************************************!*\
  !*** ./src/Models/ProfessorProfile.ts ***!
  \****************************************/
/*! exports provided: ProfessorProfile */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProfessorProfile", function() { return ProfessorProfile; });
var ProfessorProfile = /** @class */ (function () {
    function ProfessorProfile(name) {
        this.name = name;
        this.institutes = [];
        this.subjects = [];
        this.classes = [];
    }
    return ProfessorProfile;
}());



/***/ }),

/***/ "./src/Models/SubjectEntry.ts":
/*!************************************!*\
  !*** ./src/Models/SubjectEntry.ts ***!
  \************************************/
/*! exports provided: SubjectEntry */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SubjectEntry", function() { return SubjectEntry; });
var SubjectEntry = /** @class */ (function () {
    function SubjectEntry(code, name, link) {
        this.code = code;
        this.name = name;
        this.link = link;
        this.classEntries = [];
    }
    return SubjectEntry;
}());



/***/ }),

/***/ "./src/database.ts":
/*!*************************!*\
  !*** ./src/database.ts ***!
  \*************************/
/*! exports provided: Database */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Database", function() { return Database; });
/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongodb */ "mongodb");
/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongodb__WEBPACK_IMPORTED_MODULE_0__);
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
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

var Database = /** @class */ (function () {
    function Database() {
    }
    Database.storeProfessorsProfiles = function (profiles) {
        return __awaiter(this, void 0, void 0, function () {
            var mongoURI, mongoClient, database, collection;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mongoURI = process.env.DB_URI;
                        mongoClient = new mongodb__WEBPACK_IMPORTED_MODULE_0___default.a.MongoClient(mongoURI, { useUnifiedTopology: true });
                        return [4 /*yield*/, mongoClient.connect()];
                    case 1:
                        _a.sent();
                        database = mongoClient.db();
                        collection = database.collection("professors");
                        return [4 /*yield*/, collection.deleteMany({})];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, collection.insertMany(profiles)];
                    case 3:
                        _a.sent();
                        //Close Connection
                        return [4 /*yield*/, mongoClient.close()];
                    case 4:
                        //Close Connection
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Database.storeCrudeData = function (entries) {
        return __awaiter(this, void 0, void 0, function () {
            var mongoURI, mongoClient, database, collection;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mongoURI = process.env.DB_URI;
                        mongoClient = new mongodb__WEBPACK_IMPORTED_MODULE_0___default.a.MongoClient(mongoURI, { useUnifiedTopology: true });
                        return [4 /*yield*/, mongoClient.connect()];
                    case 1:
                        _a.sent();
                        database = mongoClient.db();
                        collection = database.collection("crudeData");
                        return [4 /*yield*/, collection.deleteMany({})];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, collection.insertMany(entries)];
                    case 3:
                        _a.sent();
                        //Close Connection
                        return [4 /*yield*/, mongoClient.close()];
                    case 4:
                        //Close Connection
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Database.fetchProfessorsInitialData = function () {
        return __awaiter(this, void 0, void 0, function () {
            var mongoURI, mongoClient, database, collection, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mongoURI = process.env.DB_URI;
                        mongoClient = new mongodb__WEBPACK_IMPORTED_MODULE_0___default.a.MongoClient(mongoURI, { useUnifiedTopology: true });
                        return [4 /*yield*/, mongoClient.connect()];
                    case 1:
                        _a.sent();
                        database = mongoClient.db();
                        collection = database.collection(process.env.DB_COLLECTION);
                        return [4 /*yield*/, collection.find({}).project({ name: 1 }).toArray()];
                    case 2:
                        data = _a.sent();
                        //Close Connection
                        return [4 /*yield*/, mongoClient.close()];
                    case 3:
                        //Close Connection
                        _a.sent();
                        return [2 /*return*/, data];
                }
            });
        });
    };
    return Database;
}());



/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var dotenv__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dotenv */ "dotenv");
/* harmony import */ var dotenv__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(dotenv__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _scraping__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./scraping */ "./src/scraping.ts");


//Initalization
dotenv__WEBPACK_IMPORTED_MODULE_0___default.a.config();
Object(_scraping__WEBPACK_IMPORTED_MODULE_1__["scrapeData"])();
// const app = express();
// app.use(express.json());
// app.use(express.static("public"));
// app.get("/professors", async (req, res) =>
// {
//   res.send(await Database.fetchProfessorsInitialData());
// });
// app.listen(process.env.PORT || 8080, () =>
// {
//   console.log("Server up!");
// });


/***/ }),

/***/ "./src/scraping.ts":
/*!*************************!*\
  !*** ./src/scraping.ts ***!
  \*************************/
/*! exports provided: scrapeData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "scrapeData", function() { return scrapeData; });
/* harmony import */ var puppeteer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! puppeteer */ "puppeteer");
/* harmony import */ var puppeteer__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(puppeteer__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _database__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./database */ "./src/database.ts");
/* harmony import */ var _Models_InstituteEntry__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Models/InstituteEntry */ "./src/Models/InstituteEntry.ts");
/* harmony import */ var _Models_SubjectEntry__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Models/SubjectEntry */ "./src/Models/SubjectEntry.ts");
/* harmony import */ var _Models_ClassEntry__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Models/ClassEntry */ "./src/Models/ClassEntry.ts");
/* harmony import */ var _Models_ClassScheduleEntry__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Models/ClassScheduleEntry */ "./src/Models/ClassScheduleEntry.ts");
/* harmony import */ var _Models_DayTime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Models/DayTime */ "./src/Models/DayTime.ts");
/* harmony import */ var _Models_ProfessorProfile__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Models/ProfessorProfile */ "./src/Models/ProfessorProfile.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./utils */ "./src/utils.ts");
/* harmony import */ var chalk__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! chalk */ "chalk");
/* harmony import */ var chalk__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(chalk__WEBPACK_IMPORTED_MODULE_9__);
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (undefined && undefined.__generator) || function (thisArg, body) {
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










function scrapInstituteEntries(page) {
    return __awaiter(this, void 0, void 0, function () {
        var timer, instituteEntries, instituteNodes, instituteCounter, _i, instituteNodes_1, node, text, whitespaceStrippedText, _a, acronym, name_1, link;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    console.log(chalk__WEBPACK_IMPORTED_MODULE_9___default.a.yellow("Scrapping Institute Entries:"));
                    timer = Object(_utils__WEBPACK_IMPORTED_MODULE_8__["startTimer"])();
                    return [4 /*yield*/, page.goto("https://www.dac.unicamp.br/portal/caderno-de-horarios/2020/1/S/G")];
                case 1:
                    _b.sent();
                    instituteEntries = [];
                    return [4 /*yield*/, page.$$(".lista-oferecimento a")];
                case 2:
                    instituteNodes = _b.sent();
                    instituteCounter = 1;
                    _i = 0, instituteNodes_1 = instituteNodes;
                    _b.label = 3;
                case 3:
                    if (!(_i < instituteNodes_1.length)) return [3 /*break*/, 7];
                    node = instituteNodes_1[_i];
                    return [4 /*yield*/, node.evaluate(function (element) { return element.textContent; })];
                case 4:
                    text = _b.sent();
                    whitespaceStrippedText = text === null || text === void 0 ? void 0 : text.replace(/ {2,}/g, "");
                    _a = whitespaceStrippedText.split("\n").filter(function (str) { return str !== ""; }), acronym = _a[0], name_1 = _a[1];
                    return [4 /*yield*/, node.evaluate(function (element) { return element.getAttribute("href"); })];
                case 5:
                    link = _b.sent();
                    instituteEntries.push(new _Models_InstituteEntry__WEBPACK_IMPORTED_MODULE_2__["InstituteEntry"](acronym, name_1, link));
                    //Feedback
                    process.stdout.clearLine(1);
                    process.stdout.write("\rInstitute " + instituteCounter + " of " + instituteNodes.length + " ");
                    Object(_utils__WEBPACK_IMPORTED_MODULE_8__["printProgressBar"])(instituteCounter, instituteNodes.length);
                    instituteCounter++;
                    _b.label = 6;
                case 6:
                    _i++;
                    return [3 /*break*/, 3];
                case 7:
                    process.stdout.write("\n");
                    Object(_utils__WEBPACK_IMPORTED_MODULE_8__["endTimer"])(timer, "Scrapping institutes elasped time:");
                    process.stdout.write("\n");
                    return [2 /*return*/, instituteEntries];
            }
        });
    });
}
function scrapSubjectEntries(instituteEntries, page) {
    return __awaiter(this, void 0, void 0, function () {
        var timer, instituteCounter, _i, instituteEntries_1, instituteEntry, subjectEntries, link, subjectNodes, subjectCounter, _a, subjectNodes_1, node, text, whitespaceStrippedText, _b, code, name_2, link_1;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    console.log(chalk__WEBPACK_IMPORTED_MODULE_9___default.a.yellow("Scrapping Subject Entries:"));
                    timer = Object(_utils__WEBPACK_IMPORTED_MODULE_8__["startTimer"])();
                    instituteCounter = 1;
                    _i = 0, instituteEntries_1 = instituteEntries;
                    _c.label = 1;
                case 1:
                    if (!(_i < instituteEntries_1.length)) return [3 /*break*/, 10];
                    instituteEntry = instituteEntries_1[_i];
                    subjectEntries = [];
                    link = instituteEntry.link;
                    return [4 /*yield*/, page.goto(link)];
                case 2:
                    _c.sent();
                    return [4 /*yield*/, page.$$(".disciplinas-horario a")];
                case 3:
                    subjectNodes = _c.sent();
                    subjectCounter = 1;
                    _a = 0, subjectNodes_1 = subjectNodes;
                    _c.label = 4;
                case 4:
                    if (!(_a < subjectNodes_1.length)) return [3 /*break*/, 8];
                    node = subjectNodes_1[_a];
                    return [4 /*yield*/, node.evaluate(function (element) { return element.textContent; })];
                case 5:
                    text = _c.sent();
                    whitespaceStrippedText = text === null || text === void 0 ? void 0 : text.replace(/ {2,}/g, "");
                    _b = whitespaceStrippedText.split("\n").filter(function (str) { return str !== ""; }), code = _b[0], name_2 = _b[1];
                    return [4 /*yield*/, node.evaluate(function (element) { return element.getAttribute("href"); })];
                case 6:
                    link_1 = _c.sent();
                    subjectEntries.push(new _Models_SubjectEntry__WEBPACK_IMPORTED_MODULE_3__["SubjectEntry"](code, name_2, link_1));
                    //Feedback
                    process.stdout.clearLine(1);
                    process.stdout.write("\rInstitute " + instituteCounter + " of " + instituteEntries.length + " ");
                    process.stdout.write("Subject " + subjectCounter + " of " + subjectNodes.length + " ");
                    Object(_utils__WEBPACK_IMPORTED_MODULE_8__["printProgressBar"])(instituteCounter, instituteEntries.length);
                    subjectCounter++;
                    _c.label = 7;
                case 7:
                    _a++;
                    return [3 /*break*/, 4];
                case 8:
                    instituteEntry.subjectEntries = subjectEntries;
                    instituteCounter++;
                    _c.label = 9;
                case 9:
                    _i++;
                    return [3 /*break*/, 1];
                case 10:
                    process.stdout.write("\n");
                    Object(_utils__WEBPACK_IMPORTED_MODULE_8__["endTimer"])(timer, "Scrapping subjects elapsed time:");
                    process.stdout.write("\n");
                    return [2 /*return*/];
            }
        });
    });
}
function scrapClassEntries(instituteEntries, page) {
    return __awaiter(this, void 0, void 0, function () {
        var timer, instituteCounter, _i, instituteEntries_2, instituteEntry, subjectCounter, subjectEntries, _a, subjectEntries_1, subjectEntry, classEntries, classNodes, _b, classNodes_1, node, professors, serializedSchedule, schedule;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    timer = Object(_utils__WEBPACK_IMPORTED_MODULE_8__["startTimer"])();
                    console.log(chalk__WEBPACK_IMPORTED_MODULE_9___default.a.yellow("Scraping Class Entries:"));
                    instituteCounter = 1;
                    _i = 0, instituteEntries_2 = instituteEntries;
                    _c.label = 1;
                case 1:
                    if (!(_i < instituteEntries_2.length)) return [3 /*break*/, 13];
                    instituteEntry = instituteEntries_2[_i];
                    subjectCounter = 1;
                    subjectEntries = instituteEntry.subjectEntries;
                    _a = 0, subjectEntries_1 = subjectEntries;
                    _c.label = 2;
                case 2:
                    if (!(_a < subjectEntries_1.length)) return [3 /*break*/, 11];
                    subjectEntry = subjectEntries_1[_a];
                    classEntries = [];
                    return [4 /*yield*/, page.goto(subjectEntry.link)];
                case 3:
                    _c.sent();
                    return [4 /*yield*/, page.$$(".panel-body")];
                case 4:
                    classNodes = _c.sent();
                    _b = 0, classNodes_1 = classNodes;
                    _c.label = 5;
                case 5:
                    if (!(_b < classNodes_1.length)) return [3 /*break*/, 9];
                    node = classNodes_1[_b];
                    return [4 /*yield*/, node.$$eval(".docentes>li", function (array) { return array.map(function (element) { var _a; return (_a = element.textContent) === null || _a === void 0 ? void 0 : _a.replace(/\s+$/, ""); }); })];
                case 6:
                    professors = _c.sent();
                    return [4 /*yield*/, node.$$eval(".horariosFormatado>li", function (array) { return array.map(function (list) {
                            var _a, _b, _c, _d, _e;
                            var weekDay = (_a = list.querySelector(".diaSemana")) === null || _a === void 0 ? void 0 : _a.textContent;
                            var _f = (_c = (_b = list.querySelector(".horarios")) === null || _b === void 0 ? void 0 : _b.textContent) === null || _c === void 0 ? void 0 : _c.split(" - "), beginTime = _f[0], endTime = _f[1];
                            var classRoom = (_e = (_d = list.querySelector(".salaAula")) === null || _d === void 0 ? void 0 : _d.textContent) === null || _e === void 0 ? void 0 : _e.trim();
                            return { weekDay: weekDay, beginTime: beginTime, endTime: endTime, classRoom: classRoom };
                        }); })];
                case 7:
                    serializedSchedule = _c.sent();
                    schedule = serializedSchedule.map(function (item) { return new _Models_ClassScheduleEntry__WEBPACK_IMPORTED_MODULE_5__["ClassScheduleEntry"](item.weekDay, _Models_DayTime__WEBPACK_IMPORTED_MODULE_6__["DayTime"].fromString(item.beginTime), _Models_DayTime__WEBPACK_IMPORTED_MODULE_6__["DayTime"].fromString(item.endTime), item.classRoom); });
                    classEntries.push(new _Models_ClassEntry__WEBPACK_IMPORTED_MODULE_4__["ClassEntry"](professors, schedule));
                    //Feedback
                    process.stdout.clearLine(1);
                    process.stdout.write("\rInstitute " + instituteCounter + " of " + instituteEntries.length + " ");
                    process.stdout.write("Subject " + subjectCounter + " of " + subjectEntries.length + " ");
                    Object(_utils__WEBPACK_IMPORTED_MODULE_8__["printProgressBar"])(instituteCounter, instituteEntries.length);
                    _c.label = 8;
                case 8:
                    _b++;
                    return [3 /*break*/, 5];
                case 9:
                    subjectEntry.classEntries = classEntries;
                    subjectCounter++;
                    _c.label = 10;
                case 10:
                    _a++;
                    return [3 /*break*/, 2];
                case 11:
                    instituteCounter++;
                    _c.label = 12;
                case 12:
                    _i++;
                    return [3 /*break*/, 1];
                case 13:
                    process.stdout.write("\n");
                    Object(_utils__WEBPACK_IMPORTED_MODULE_8__["endTimer"])(timer, "Scraping class entries elasped time: ");
                    process.stdout.write("\n");
                    return [2 /*return*/];
            }
        });
    });
}
function weekDayToNumber(weekDay) {
    if (weekDay === "Segunda") {
        return 0;
    }
    else if (weekDay === "Terça") {
        return 1;
    }
    else if (weekDay === "Quarta") {
        return 2;
    }
    else if (weekDay === "Quinta") {
        return 3;
    }
    else if (weekDay === "Sexta") {
        return 4;
    }
    else if (weekDay === "Sábado") {
        return 5;
    }
    else if (weekDay === "Domingo") {
        return 6;
    }
    else {
        throw new Error("Invalid weekDay (\"" + weekDay + "\")!");
    }
}
function generateProfessorsProfiles(instituteEntries) {
    var professorsProfiles = new Map();
    var _loop_1 = function (instituteEntry) {
        var subjectEntries = instituteEntry.subjectEntries;
        var _loop_2 = function (subjectEntry) {
            var classEntries = subjectEntry.classEntries;
            for (var _i = 0, classEntries_1 = classEntries; _i < classEntries_1.length; _i++) {
                var classEntry = classEntries_1[_i];
                var professors = classEntry.professors;
                for (var _a = 0, professors_1 = professors; _a < professors_1.length; _a++) {
                    var professor = professors_1[_a];
                    if (!professorsProfiles.has(professor)) {
                        professorsProfiles.set(professor, new _Models_ProfessorProfile__WEBPACK_IMPORTED_MODULE_7__["ProfessorProfile"](professor));
                    }
                    var professorProfile = professorsProfiles.get(professor);
                    var institutes = professorProfile.institutes;
                    var subjects = professorProfile.subjects;
                    var classes = professorProfile.classes;
                    if (institutes.every(function (institute) { return institute.acronym !== instituteEntry.acronym; })) {
                        var name_3 = instituteEntry.name, acronym = instituteEntry.acronym;
                        institutes.push({ name: name_3, acronym: acronym });
                    }
                    if (subjects.every(function (subject) { return subject.code !== subjectEntry.code; })) {
                        var name_4 = subjectEntry.name, code = subjectEntry.code;
                        subjects.push({ name: name_4, code: code });
                    }
                    classes.push.apply(classes, classEntry.schedule.map(function (entry) {
                        return {
                            weekDay: entry.weekDay,
                            beginTime: entry.beginTime,
                            endTime: entry.endTime,
                            classRoom: entry.classRoom,
                            subjectCode: subjectEntry.code
                        };
                    }));
                }
            }
        };
        for (var _i = 0, subjectEntries_2 = subjectEntries; _i < subjectEntries_2.length; _i++) {
            var subjectEntry = subjectEntries_2[_i];
            _loop_2(subjectEntry);
        }
    };
    for (var _i = 0, instituteEntries_3 = instituteEntries; _i < instituteEntries_3.length; _i++) {
        var instituteEntry = instituteEntries_3[_i];
        _loop_1(instituteEntry);
    }
    var professorsProfilesAsArray = Array.from(professorsProfiles.values());
    //Sort Schedule Entries
    for (var _a = 0, professorsProfilesAsArray_1 = professorsProfilesAsArray; _a < professorsProfilesAsArray_1.length; _a++) {
        var profile = professorsProfilesAsArray_1[_a];
        profile.classes.sort(function (class1, class2) {
            if (weekDayToNumber(class1.weekDay) < weekDayToNumber(class2.weekDay)) {
                return -1;
            }
            else if (weekDayToNumber(class1.weekDay) > weekDayToNumber(class2.weekDay)) {
                return 1;
            }
            else {
                return class1.beginTime.compare(class2.beginTime);
            }
        });
    }
    return professorsProfilesAsArray;
}
function scrapeData() {
    return __awaiter(this, void 0, void 0, function () {
        var browser, page, instituteEntries, professorsProfiles;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, puppeteer__WEBPACK_IMPORTED_MODULE_0___default.a.launch({ headless: true })];
                case 1:
                    browser = _a.sent();
                    return [4 /*yield*/, browser.newPage()];
                case 2:
                    page = _a.sent();
                    return [4 /*yield*/, page.setRequestInterception(true)];
                case 3:
                    _a.sent();
                    //Avoid loading unecessary resources
                    page.on("request", function (req) {
                        if (req.resourceType() === "stylesheet" || req.resourceType() === "font" || req.resourceType() === "image") {
                            req.abort();
                        }
                        else {
                            req.continue();
                        }
                    });
                    return [4 /*yield*/, scrapInstituteEntries(page)];
                case 4:
                    instituteEntries = _a.sent();
                    return [4 /*yield*/, scrapSubjectEntries(instituteEntries, page)];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, scrapClassEntries(instituteEntries, page)];
                case 6:
                    _a.sent();
                    professorsProfiles = generateProfessorsProfiles(instituteEntries);
                    return [4 /*yield*/, _database__WEBPACK_IMPORTED_MODULE_1__["Database"].storeCrudeData(instituteEntries)];
                case 7:
                    _a.sent();
                    return [4 /*yield*/, _database__WEBPACK_IMPORTED_MODULE_1__["Database"].storeProfessorsProfiles(professorsProfiles)];
                case 8:
                    _a.sent();
                    return [4 /*yield*/, browser.close()];
                case 9:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}


/***/ }),

/***/ "./src/utils.ts":
/*!**********************!*\
  !*** ./src/utils.ts ***!
  \**********************/
/*! exports provided: formatTimeInterval, startTimer, endTimer, printProgressBar */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatTimeInterval", function() { return formatTimeInterval; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "startTimer", function() { return startTimer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "endTimer", function() { return endTimer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "printProgressBar", function() { return printProgressBar; });
/* harmony import */ var chalk__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! chalk */ "chalk");
/* harmony import */ var chalk__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(chalk__WEBPACK_IMPORTED_MODULE_0__);
var __makeTemplateObject = (undefined && undefined.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

function formatTimeInterval(seconds, nanoseconds) {
    var nanosecondsInMiliseconds = 1e6;
    var secondsInMinute = 60;
    var formattedMinutes = Math.floor(seconds / secondsInMinute);
    var formattedSeconds = seconds % secondsInMinute;
    var formattedMilliseconds = Math.floor(nanoseconds / nanosecondsInMiliseconds);
    return chalk__WEBPACK_IMPORTED_MODULE_0___default.a.greenBright(templateObject_1 || (templateObject_1 = __makeTemplateObject(["", " minutes, ", " seconds, ", " milliseconds"], ["", " minutes, ", " seconds, ", " milliseconds"])), formattedMinutes, formattedSeconds, formattedMilliseconds);
}
function startTimer() {
    return process.hrtime();
}
function endTimer(timer, message) {
    var timeInterval = process.hrtime(timer);
    console.log(message + " " + formatTimeInterval(timeInterval[0], timeInterval[1]));
}
function printProgressBar(current, total) {
    var percentage = Math.floor(100 * current / total);
    var barLength = 20;
    var barFillLength = Math.floor(percentage / (100 / barLength));
    process.stdout.write(chalk__WEBPACK_IMPORTED_MODULE_0___default.a.blueBright(templateObject_2 || (templateObject_2 = __makeTemplateObject(["[", "", "] ", "%"], ["[", "", "] ", "%"])), "=".repeat(barFillLength), " ".repeat(barLength - barFillLength), percentage));
}
var templateObject_1, templateObject_2;


/***/ }),

/***/ "chalk":
/*!************************!*\
  !*** external "chalk" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("chalk");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("dotenv");

/***/ }),

/***/ "mongodb":
/*!**************************!*\
  !*** external "mongodb" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("mongodb");

/***/ }),

/***/ "puppeteer":
/*!****************************!*\
  !*** external "puppeteer" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("puppeteer");

/***/ })

/******/ });
//# sourceMappingURL=index.js.map