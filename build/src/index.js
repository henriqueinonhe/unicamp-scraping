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
const dotenv_1 = __importDefault(require("dotenv"));
const scraping_1 = require("./scraping");
const mongodb_1 = __importDefault(require("mongodb"));
//Initalization
dotenv_1.default.config();
//Rest
class ProfessorSchedule {
    constructor(name, classSchedules) {
        this.name = name;
        this.classSchedules = classSchedules;
    }
    getName() {
        return this.name;
    }
    getClassSchedules() {
        return this.classSchedules.slice();
    }
}
function fetchProfessorsSchedules() {
    return __awaiter(this, void 0, void 0, function* () {
        //Dabatase and deserialziation
        const mongoURI = process.env.DB_URI;
        const mongoClient = new mongodb_1.default.MongoClient(mongoURI, { useUnifiedTopology: true });
        yield mongoClient.connect();
        const database = mongoClient.db("unicamp-docentes");
        const collection = database.collection("classEntries");
        const serializedClassEntries = yield collection.find({}).toArray();
        const classEntries = serializedClassEntries.map(entry => new scraping_1.ClassEntry(entry.subjectEntry, entry.professors, entry.schedule));
        console.log(classEntries);
        yield mongoClient.close();
        return [];
    });
}
fetchProfessorsSchedules();
//# sourceMappingURL=index.js.map