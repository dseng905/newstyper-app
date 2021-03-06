"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signOutOfUserProfile = exports.getUserProfile = exports.getUserProfileStatistics = exports.signInToUserProfile = exports.createUserProfile = void 0;
var client_1 = require("@prisma/client");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var validator_1 = __importDefault(require("validator"));
var passport_config_1 = __importDefault(require("../auth/passport_config"));
var prisma = new client_1.PrismaClient();
function getSignedJwtToken(userId) {
    return jsonwebtoken_1.default.sign({ userId: userId }, passport_config_1.default.SECRET_KEY, {
        expiresIn: passport_config_1.default.EXPIRES_IN,
    });
}
function createUserProfile(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, email, password, firstName, lastName, emailExists, passwordLessThan10Char, hashedPassword, user, token, e_1, error;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 4, , 5]);
                    _a = req.body, email = _a.email, password = _a.password, firstName = _a.first_name, lastName = _a.last_name;
                    //Validate email and password by checking if the account exists
                    //the email is valid, and the password is longer than 10 char
                    if (!validator_1.default.isEmail(email)) {
                        res.status(403).send({ error: "Email address is not valid." });
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, prisma.userProfile.findOne({ where: { email: email } })];
                case 1:
                    emailExists = _b.sent();
                    if (emailExists) {
                        res.status(403).send({ error: "Email address is already registered." });
                        return [2 /*return*/];
                    }
                    passwordLessThan10Char = !validator_1.default.isLength(password, { min: 10 });
                    if (passwordLessThan10Char) {
                        res.status(403).send({ error: "Password must be at least 10 characters." });
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, bcrypt_1.default.hash(password, 10)];
                case 2:
                    hashedPassword = _b.sent();
                    return [4 /*yield*/, prisma.userProfile.create({
                            data: { email: email, firstName: firstName, lastName: lastName, password: hashedPassword }
                        })
                        //Use new user profile info to create JWT token
                    ];
                case 3:
                    user = _b.sent();
                    token = getSignedJwtToken(user.id);
                    //Send token to the client
                    res.status(200).json({
                        success: "User profile has been successfully created.",
                        token: token,
                        expiresIn: passport_config_1.default.EXPIRES_IN,
                        userId: user.id,
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                    });
                    return [3 /*break*/, 5];
                case 4:
                    e_1 = _b.sent();
                    error = e_1;
                    res.status(500).json({ error: error.message });
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.createUserProfile = createUserProfile;
function signInToUserProfile(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, email, password, user, passwordCorrect, token, userId, firstName, lastName, e_2, error;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    _a = req.body, email = _a.email, password = _a.password;
                    return [4 /*yield*/, prisma.userProfile.findOne({ where: { email: email } })];
                case 1:
                    user = _b.sent();
                    if (!user) {
                        res.send({ error: "User does not exist." });
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, bcrypt_1.default.compare(password, user.password)];
                case 2:
                    passwordCorrect = _b.sent();
                    if (!passwordCorrect) {
                        res.send({ error: "Password is incorrect." });
                        return [2 /*return*/];
                    }
                    token = getSignedJwtToken(user.id);
                    userId = user.id, firstName = user.firstName, lastName = user.lastName;
                    res.status(200).json({
                        success: "User has been successfully signed in.",
                        token: token,
                        expiresIn: passport_config_1.default.EXPIRES_IN,
                        userId: userId,
                        firstName: firstName,
                        lastName: lastName,
                        email: email
                    });
                    return [3 /*break*/, 4];
                case 3:
                    e_2 = _b.sent();
                    error = e_2;
                    res.status(500).send({ error: error.message });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.signInToUserProfile = signInToUserProfile;
function getUserProfileStatistics(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var userId, user, dailyGoal, totalArticlesCompleted, averageWpm, timezone, timezoneOffset_1, dailyGoalArticlesCompleted, e_3, error;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    if (!req.user) {
                        return [2 /*return*/, res.send({ error: "Failed to authenticate." })];
                    }
                    userId = req.user.userId;
                    return [4 /*yield*/, prisma.userProfile.findOne({
                            where: { id: userId },
                            include: {
                                userSettings: true,
                                articleTypingResults: true,
                            }
                        })];
                case 1:
                    user = _a.sent();
                    if (!user) {
                        return [2 /*return*/, res.send({ error: "User does not exists." })];
                    }
                    dailyGoal = 0;
                    if (!user.userSettings) return [3 /*break*/, 2];
                    dailyGoal = user.userSettings.dailyGoal;
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, prisma.userSettings.create({
                        data: { userProfile: { connect: { id: userId } } }
                    })];
                case 3:
                    dailyGoal = (_a.sent()).dailyGoal;
                    _a.label = 4;
                case 4:
                    totalArticlesCompleted = user.articleTypingResults.length;
                    averageWpm = user.articleTypingResults
                        .reduce(function (sum, result) { var _a; return sum + ((_a = result.wpm) !== null && _a !== void 0 ? _a : 0); }, 0) / totalArticlesCompleted;
                    timezone = Number(req.query.timezone);
                    timezoneOffset_1 = (isNaN(timezone) ? 0 : timezone) * 60000;
                    dailyGoalArticlesCompleted = user.articleTypingResults
                        .filter(function (result) {
                        var completedAt = new Date(result.completedAt.getTime() - timezoneOffset_1);
                        var today = new Date(Date.now() - timezoneOffset_1);
                        return today.getDate() === completedAt.getDate()
                            && today.getMonth() === completedAt.getMonth()
                            && today.getFullYear() === completedAt.getFullYear();
                    }).length;
                    res.send({
                        userId: userId,
                        totalArticlesCompleted: totalArticlesCompleted,
                        averageWpm: averageWpm,
                        dailyGoal: dailyGoal,
                        dailyGoalArticlesCompleted: dailyGoalArticlesCompleted
                    });
                    return [3 /*break*/, 6];
                case 5:
                    e_3 = _a.sent();
                    error = e_3;
                    res.send({ error: error.message });
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.getUserProfileStatistics = getUserProfileStatistics;
function getUserProfile(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var id, user, e_4, error;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    if (!req.user) {
                        return [2 /*return*/, res.send({ error: "Failed to authenticate." })];
                    }
                    id = req.user.userId;
                    return [4 /*yield*/, prisma.userProfile.findOne({
                            where: { id: id },
                            select: {
                                id: true,
                                email: true,
                                firstName: true,
                                lastName: true,
                                userSettings: true,
                            }
                        })];
                case 1:
                    user = _a.sent();
                    if (!user) {
                        return [2 /*return*/, res.send({ error: "User does not exist." })];
                    }
                    else {
                        return [2 /*return*/, res.send(user)];
                    }
                    return [3 /*break*/, 3];
                case 2:
                    e_4 = _a.sent();
                    error = e_4;
                    res.send({ error: error.message });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getUserProfile = getUserProfile;
function signOutOfUserProfile(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/];
        });
    });
}
exports.signOutOfUserProfile = signOutOfUserProfile;
