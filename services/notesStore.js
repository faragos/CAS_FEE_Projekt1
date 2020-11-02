'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Datastore from 'nedb-promises';
export class NotesStore {
    constructor() {
        this.db = new Datastore({ filename: './data/notes.db', autoload: true });
    }
    getAllNotes(orderBy, orderDirection) {
        return __awaiter(this, void 0, void 0, function* () {
            if (orderBy) {
                return this.db.find({}).sort({ [orderBy]: orderDirection }).exec();
            }
            else {
                return this.db.find({});
            }
        });
    }
    getOpenNotes(orderBy, orderDirection) {
        return __awaiter(this, void 0, void 0, function* () {
            if (orderBy) {
                return this.db.find({ finished: false }).sort({ [orderBy]: orderDirection }).exec();
            }
            else {
                return this.db.find({ finished: false });
            }
        });
    }
    addNote(note) {
        return __awaiter(this, void 0, void 0, function* () {
            note['createDate'] = new Date();
            return this.db.insert(note);
        });
    }
    updateNote(note) {
        return __awaiter(this, void 0, void 0, function* () {
            let doc = yield notesStore.getNote(note._id);
            this.db.update(doc, note, {});
        });
    }
    getNote(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db.findOne({ _id: id });
        });
    }
}
export const notesStore = new NotesStore();
