CREATE DATABASE newstyper;

CREATE TABLE user_profiles(
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255),
    first_name VARCHAR(255),
    last_name VARCHAR(255)
);

CREATE TABLE article_typing_results(
    id SERIAL PRIMARY KEY,
    user_id SERIAL REFERENCES user_profiles(id),
    article_id TEXT,
    wpm INT,
    time_completed INT,
    completed_at DATE NOT NULL DEFAULT CURRENT_DATE
);

CREATE TABLE saved_articles(
    id SERIAL PRIMARY KEY,
    user_id SERIAL REFERENCES user_profiles(id),
    article_id TEXT
);

CREATE TABLE user_statistics(
    id SERIAL PRIMARY KEY,
    user_id SERIAL REFERENCES user_profiles(id) UNIQUE,
    average_wpm INT,
    total_articles_completed INT,
    daily_goal INT,
    daily_goal_articles_completed INT
);

CREATE TABLE user_settings(
    id SERIAL PRIMARY KEY,
    user_id SERIAL REFERENCES user_profiles(id) UNIQUE,
    daily_goal INT DEFAULT 3,
);