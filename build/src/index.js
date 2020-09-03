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
class ProfessorProfile {
    constructor(name) {
        this.name = name;
        this.instituteEntries = new Set();
        this.subjectEntries = new Set();
        this.classSchedules = [];
    }
}
function fetchProfessorsSchedules() {
    return __awaiter(this, void 0, void 0, function* () {
        //Dabatase and deserialziation
        const mongoURI = process.env.DB_URI;
        const mongoClient = new mongodb_1.default.MongoClient(mongoURI, { useUnifiedTopology: true });
        yield mongoClient.connect();
        const database = mongoClient.db("unicamp-docentes");
        const collection = database.collection("model");
        const instituteEntries = (yield collection.find({}).toArray()).map(entry => scraping_1.InstituteEntry.deserialize(entry));
        yield mongoClient.close();
        //Professors Profiles
        const professorsProfiles = new Map();
        for (const instituteEntry of instituteEntries) {
            const subjectEntries = instituteEntry.subjectEntries;
            for (const subjectEntry of subjectEntries) {
                const classEntries = subjectEntry.classEntries;
                for (const classEntry of classEntries) {
                    const professors = classEntry.professors;
                    for (const professor of professors) {
                        if (!professorsProfiles.has(professor)) {
                            professorsProfiles.set(professor, new ProfessorProfile(professor));
                        }
                        const professorProfile = professorsProfiles.get(professor);
                        professorProfile.instituteEntries.add(instituteEntry);
                        professorProfile.subjectEntries.add(subjectEntry);
                        professorProfile.classSchedules.push(...classEntry.schedule);
                    }
                }
            }
        }
        for (const professorProfile of professorsProfiles.values()) {
            if (professorProfile.instituteEntries.size > 1) {
                console.log(professorProfile.name, Array.from(professorProfile.instituteEntries).map(entry => entry.acronym));
            }
        }
        return professorsProfiles;
    });
}
fetchProfessorsSchedules();
//# sourceMappingURL=index.js.map