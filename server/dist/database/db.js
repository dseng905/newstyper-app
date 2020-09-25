"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbStrings = void 0;
var pg_1 = require("pg");
var db_config_1 = __importDefault(require("./db_config"));
var db = new pg_1.Pool(db_config_1.default);
exports.dbStrings = {
    DB_NAME: "newstyper",
    USER_PROFILES: {
        USER_ID: "user_id",
        USERNAME: "username",
        TABLE_NAME: "user_profiles",
        EMAIL: "email",
        PASSWORD: "password",
        FIRST_NAME: "first_name",
        LAST_NAME: "last_name"
    },
    ARTICLE_TYPING_RESULT: {
        ID: "id",
        USER_ID: "user_id",
        ARTICLE_ID: "article_id",
        WPM: "wpm",
        TIME_COMPLETED: "time_completed"
    },
    SAVED_ARTICLES: {
        ID: "id",
        USER_ID: "user_id",
        ARITCLE_ID: "article_id",
    },
    USER_STATISTICS: {
        ID: "id",
        USER_ID: "user_id",
        AVERAGE_WPM: "average_wpm",
        TOTAL_ARTICLES_COMPLETED: 'total_articles_completed',
        DAILY_GOAL: "daily_goal",
        DAILY_GOAL_ARTICLES_COMPLETED: "daily_goal_articles_completed"
    }
};
exports.default = db;
