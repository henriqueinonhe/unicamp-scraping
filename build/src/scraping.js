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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scrapData = exports.ClassEntry = exports.ClassScheduleEntry = exports.SubjectEntry = exports.InstituteEntry = void 0;
const puppeteer_1 = __importDefault(require("puppeteer"));
const mongodb_1 = __importDefault(require("mongodb"));
class InstituteEntry {
    constructor(acronym, name, link) {
        this.acronym = acronym;
        this.name = name;
        this.link = link;
        this.subjectEntries = [];
    }
    static deserialize(object) {
        const { acronym, name, link, subjectEntries } = object;
        const entry = new InstituteEntry(acronym, name, link);
        entry.subjectEntries = subjectEntries;
        return entry;
    }
}
exports.InstituteEntry = InstituteEntry;
class SubjectEntry {
    constructor(code, name, link) {
        this.code = code;
        this.name = name;
        this.link = link;
        this.classEntries = [];
    }
}
exports.SubjectEntry = SubjectEntry;
class ClassScheduleEntry {
    constructor(weekDay, beginTime, endTime, classRoom) {
        this.weekDay = weekDay;
        this.beginTime = beginTime;
        this.endTime = endTime;
        this.classRoom = classRoom;
    }
}
exports.ClassScheduleEntry = ClassScheduleEntry;
class ClassEntry {
    constructor(professors, schedule) {
        this.professors = professors;
        this.schedule = schedule;
    }
}
exports.ClassEntry = ClassEntry;
function scrapInstituteEntries(page) {
    return __awaiter(this, void 0, void 0, function* () {
        console.time("Institute entries scraping elapsed time");
        yield page.goto("https://www.dac.unicamp.br/portal/caderno-de-horarios/2020/1/S/G");
        const instituteEntries = [];
        const instituteNodes = yield page.$$(".lista-oferecimento a");
        for (const node of instituteNodes) {
            const text = yield node.evaluate(element => element.textContent);
            const whitespaceStrippedText = text === null || text === void 0 ? void 0 : text.replace(/ {2,}/g, "");
            const [acronym, name] = whitespaceStrippedText.split("\n").filter(str => str !== "");
            const link = yield node.evaluate(element => element.getAttribute("href"));
            instituteEntries.push(new InstituteEntry(acronym, name, link));
        }
        console.timeEnd("Institute entries scraping elapsed time");
        return instituteEntries;
    });
}
function scrapSubjectEntries(instituteEntries, page) {
    return __awaiter(this, void 0, void 0, function* () {
        console.time("Subject entries scraping elapsed time");
        let instituteCounter = 1;
        for (const instituteEntry of instituteEntries) {
            const subjectEntries = [];
            const { link } = instituteEntry;
            yield page.goto(link);
            const subjectNodes = yield page.$$(".disciplinas-horario a");
            for (const node of subjectNodes) {
                const text = yield node.evaluate(element => element.textContent);
                const whitespaceStrippedText = text === null || text === void 0 ? void 0 : text.replace(/ {2,}/g, "");
                const [code, name] = whitespaceStrippedText.split("\n").filter(str => str !== "");
                const link = yield node.evaluate(element => element.getAttribute("href"));
                subjectEntries.push(new SubjectEntry(code, name, link));
            }
            instituteEntry.subjectEntries = subjectEntries;
            console.log(`Institute ${instituteCounter} of ${instituteEntries.length}`);
            instituteCounter++;
        }
        console.timeEnd("Subject entries scraping elapsed time");
    });
}
function scrapClassEntries(instituteEntries, page) {
    return __awaiter(this, void 0, void 0, function* () {
        console.time("Class entries scraping elpased time");
        for (const instituteEntry of instituteEntries) {
            let subjectCounter = 1;
            const subjectEntries = instituteEntry.subjectEntries;
            for (const subjectEntry of subjectEntries) {
                const classEntries = [];
                yield page.goto(subjectEntry.link);
                const classNodes = yield page.$$(".panel-body");
                for (const node of classNodes) {
                    const professors = yield node.$$eval(".docentes>li", array => array.map(element => { var _a; return (_a = element.textContent) === null || _a === void 0 ? void 0 : _a.replace(/\s+$/, ""); }));
                    const schedule = yield node.$$eval(".horariosFormatado>li", array => array.map(list => {
                        var _a, _b, _c, _d, _e;
                        const weekDay = (_a = list.querySelector(".diaSemana")) === null || _a === void 0 ? void 0 : _a.textContent;
                        const [beginTime, endTime] = (_c = (_b = list.querySelector(".horarios")) === null || _b === void 0 ? void 0 : _b.textContent) === null || _c === void 0 ? void 0 : _c.split(" - ");
                        const classRoom = (_e = (_d = list.querySelector(".salaAula")) === null || _d === void 0 ? void 0 : _d.textContent) === null || _e === void 0 ? void 0 : _e.trim();
                        return { weekDay, beginTime, endTime, classRoom };
                    }));
                    classEntries.push(new ClassEntry(professors, schedule));
                }
                subjectEntry.classEntries = classEntries;
                console.log(`Subject ${subjectCounter} of ${subjectEntries.length}`);
                subjectCounter++;
            }
        }
        console.timeEnd("Class entries scraping elpased time");
    });
}
function scrapData() {
    return __awaiter(this, void 0, void 0, function* () {
        //Database Connect
        const mongoURI = process.env.DB_URI;
        const mongoClient = new mongodb_1.default.MongoClient(mongoURI, { useUnifiedTopology: true });
        try {
            yield mongoClient.connect();
        }
        catch (error) {
            console.log(error);
        }
        //Scraping
        const browser = yield puppeteer_1.default.launch({ headless: true });
        const page = yield browser.newPage();
        const instituteEntries = yield scrapInstituteEntries(page);
        yield scrapSubjectEntries(instituteEntries, page);
        yield scrapClassEntries(instituteEntries, page);
        //Save data in database
        const database = mongoClient.db();
        const collection = database.collection("model");
        yield collection.deleteMany({});
        yield collection.insertMany(instituteEntries);
        yield mongoClient.close();
        yield browser.close();
    });
}
exports.scrapData = scrapData;
//# sourceMappingURL=scraping.js.map