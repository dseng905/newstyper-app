import express from 'express'
import * as Article from '../controllers/article'
import passport from 'passport'

const articleRouter = express.Router()

articleRouter.route('/results')
    .get(passport.authenticate('jwt', {session: false}), Article.getArticleTypingResults)
    .post(passport.authenticate('jwt', {session: false}), Article.saveArticleTypingResults)

articleRouter.route('/favorites')
    .get(passport.authenticate('jwt', {session: false}), Article.getFavoriteArticles)
    .post(passport.authenticate('jwt', {session: false}), Article.saveArticleToFavorites)
    .delete(passport.authenticate('jwt', {session : false}), Article.deleteArticleFromFavorites)

export default articleRouter

