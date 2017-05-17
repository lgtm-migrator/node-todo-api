var env = process.env.NODE_ENV || "development";

if (env === "development") {
  process.env.PORT = 3000;
  // Actual database
  process.env.MONGODB_URI = "mongodb://localhost:27017/TodoApp";
} else if (env = "test") {
  process.env.PORT = 3000;
  // We connect to the testing database (so the existing db will not be wiped out)
  process.env.MONGODB_URI = "mongodb://localhost:27017/TodoAppTest";
}
