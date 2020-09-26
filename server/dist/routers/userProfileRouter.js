"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var UserProfile = __importStar(require("../controllers/user_profile"));
var articleRouter_1 = __importDefault(require("./articleRouter"));
var passport_1 = __importDefault(require("passport"));
require("../auth/auth");
var userProfileRouter = express_1.default.Router();
userProfileRouter.route('/')
    .get(passport_1.default.authenticate('jwt', { session: false }), UserProfile.getUserProfile);
userProfileRouter.get('/statistics', passport_1.default.authenticate('jwt', { session: false }), UserProfile.getUserProfileStatistics);
userProfileRouter.post('/create', UserProfile.createUserProfile);
userProfileRouter.post('/signin', UserProfile.signInToUserProfile);
userProfileRouter.post('/signout', UserProfile.signOutOfUserProfile);
userProfileRouter.use('/article', articleRouter_1.default);
exports.default = userProfileRouter;
