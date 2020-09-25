import express from 'express'
import * as Article from '../controllers/article'

const articleRouter = express.Router()

articleRouter.route('/results')
    .get(Article.getArticleTypingResults)
    .post(Article.saveArticleTypingResults)

articleRouter.route('/favorites')
    .get(Article.getFavoriteArticles)
    .post(Article.saveArticleToFavorites)

export default articleRouter

