import { Request, Response } from 'express'

export async function saveArticleTypingResults(req : Request, res : Response) {
    //TODO: store typing results after end of article 
}

export async function getArticleTypingResults(req : Request, res : Response) {
    // TODO: get typing results if the article has been completed before
}

export async function saveArticleToFavorites(req : Request, res : Response) {
    // TODO: implement code to save article to user's favorites
}

export async function getFavoriteArticles(req : Request, res : Response) {
    // TODO: implement code to retrieve favorite articles from the database
}