"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var body_parser_1 = __importDefault(require("body-parser"));
var helmet_1 = __importDefault(require("helmet"));
var userProfileRouter_1 = __importDefault(require("./routers/userProfileRouter"));
var passport_1 = __importDefault(require("passport"));
var auth_1 = __importDefault(require("./auth/auth"));
var app = express_1.default();
var PORT = process.env.PORT || 5000;
app.use(cors_1.default({ credentials: true, origin: 'http://localhost:3000' }));
app.use(helmet_1.default());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
auth_1.default(passport_1.default);
app.use(passport_1.default.initialize());
app.use('/user_profile', userProfileRouter_1.default);
app.use(function (_req, res, _next) {
    res.status(404).send("Page cannot be found.");
});
app.listen(PORT, function () {
    console.log("Server is listening in PORT " + PORT);
});
