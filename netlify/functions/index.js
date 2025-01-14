"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const serverless_http_1 = __importDefault(require("serverless-http"));
const db_1 = __importDefault(require("./config/db"));
const actorRoutes_1 = __importDefault(require("./routes/actorRoutes"));
const producerRoutes_1 = __importDefault(require("./routes/producerRoutes"));
const movieRoutes_1 = __importDefault(require("./routes/movieRoutes"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
// Database Connection
(0, db_1.default)();
// Serve React frontend
const frontendPath = path_1.default.join(__dirname, "../../frontend/build");
console.log("frontendPath", frontendPath);
app.use(express_1.default.static(frontendPath));
// Routes
app.get("/test", (req, res) => {
    res.send("IMDB Clone Backend is Running!!");
});
app.use("/api/actors", actorRoutes_1.default);
app.use("/api/producers", producerRoutes_1.default);
app.use("/api/movies", movieRoutes_1.default);
// Catch-all route for React frontend
app.get("/*", (req, res) => {
    res.sendFile(path_1.default.join(frontendPath, "index.html"));
});
// Handle process termination gracefully
process.on("SIGINT", () => {
    console.log("Shutting down server...");
    process.exit(0);
});
// Export the serverless handler
exports.handler = (0, serverless_http_1.default)(app);
