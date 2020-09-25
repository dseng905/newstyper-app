import { Pool } from 'pg'
import DATABASE_CONFIG from './db_config'

const db = new Pool(DATABASE_CONFIG)


export const dbStrings = {
    DB_NAME : "newstyper",
    USER_PROFILES : {
        USER_ID : "user_id",
        USERNAME: "username",
        TABLE_NAME : "user_profiles",
        EMAIL : "email",
        PASSWORD : "password",
        FIRST_NAME : "first_name",
        LAST_NAME : "last_name"
    },
    ARTICLE_TYPING_RESULT : {
        ID : "id",
        USER_ID : "user_id",
        ARTICLE_ID : "article_id",
        WPM : "wpm",
        TIME_COMPLETED : "time_completed"
    },
    SAVED_ARTICLES : {
        ID : "id",
        USER_ID : "user_id",
        ARITCLE_ID : "article_id",
    },
    USER_STATISTICS : {
        ID : "id",
        USER_ID : "user_id",
        AVERAGE_WPM : "average_wpm",
        TOTAL_ARTICLES_COMPLETED : 'total_articles_completed',
        DAILY_GOAL : "daily_goal",
        DAILY_GOAL_ARTICLES_COMPLETED : "daily_goal_articles_completed"
    }
}

export default db