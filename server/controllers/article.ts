import { Request, Response } from 'express'
import { PrismaClient, Prisma__SaveArticleClient, Prisma__ArticleTypingResultClient, ArticleTypingResult } from '@prisma/client'

const prisma = new PrismaClient()

interface ArticleTypingResultsBody {
    articleId? : string
    timeCompleted? : number
    wpm : number
}

export async function saveArticleTypingResults(req : Request, res : Response) {
    try {
        if(!req.user) {
            return res.send({error : "Failed to authenticate."})
        }

        const { userId : id } = req.user as { userId : number }
        const { articleId, timeCompleted, wpm } = req.body as ArticleTypingResultsBody
        const savedResults = await prisma.articleTypingResult.create({
            data: { 
                articleId, 
                timeCompleted, 
                wpm, 
                userProfile : {connect : { id } }
            }
        })

        res.send({
            ...savedResults,
            success : "Article typing results successfully saved"
        })

    } 
    catch(e) {
        const error = e as Error
        res.send({error : error.message})
    }
}

export async function getArticleTypingResults(req : Request, res : Response) {
    try {
        if(!req.user) {
            return res.send({ error: "Failed to authenticate"})
        }

        const { userId : id } = req.body as { userId : number }
        const articleTypingResults = await prisma.articleTypingResult.findMany({where : { id }})
        res.send({
            articleTypingResults,
            success : articleTypingResults.length === 0
                ? "No results were found for this user."
                : "Article results has been successfully retrieved."
        })
    }
    catch(e) {
        const error = e as Error
        res.send({ error : error.message})
    }
}

export async function saveArticleToFavorites(req : Request, res : Response) {
    // TODO: implement code to save article to user's favorites
}

export async function getFavoriteArticles(req : Request, res : Response) {
    // TODO: implement code to retrieve favorite articles from the database
}