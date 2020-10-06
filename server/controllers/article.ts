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
    try {
        const { articleId } = req.body as {articleId? : string}
        const { userId } = req.user as { userId? : number }

        if(!articleId || !userId) {
            return res.send({error : "Article id not found"})
        } 
        else {
            await prisma.saveArticle.create({
                data : { 
                    articleId,
                    userProfile : {
                        connect : {id : userId}
                    }
                },   
            })

            return res.send({
                success : "Article has been successfully saved to user profile",
                articleId
            })
        }
    }
    catch(e) {
        const error = e as Error
        res.send({error: error.message})
    }
}

export async function deleteArticleFromFavorites(req : Request, res : Response) {
    try {
        const { articleId } = req.body as {articleId? : string}
        const { userId } = req.user as {userId? : number}

        if(!articleId || !userId) {
            return res.send({error: "Article id or userId could not be found in request body."})
        }

        await prisma.saveArticle.deleteMany({
            where: { articleId, userId }
        })

        res.send({
            success : "Article has been successfully deleted."
        })
    }
    catch(e) {
        const error = e as Error
        res.send({error : error.message})
    }
}

export async function getFavoriteArticles(req : Request, res : Response) {
    try {
        const { userId }  = req.user as { userId? : number}

        if(!userId) {
            return res.send({error : "User Id not found in request body."})
        }

        const savedArticles = await prisma.saveArticle.findMany({
            where: { userId } 
        })

        res.send({
            savedArticles,
            success : "All user's saved articles have retrieved."
        })
    }
    catch(e) {
        const error = e as Error
        res.send({error : error.message})
    }
}