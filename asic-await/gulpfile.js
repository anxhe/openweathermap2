const BABELIFY = require("babelify");

const BROWSERIFY = require("browserify");

const GULP = require("gulp");

const RENAME = require("gulp-rename");//permite renomprar un paquete

const SOURCE = require("vinyl-source-stream");

GULP.task("build-js", () => {
    BROWSERIFY("./index.js")
        .transform(BABELIFY,  {presets:["env"], plugins:['syntax-async-functions', 'transform-regenerator']})
        .bundle()
        .pipe(SOURCE("index.js"))
        .pipe(RENAME("index-build.js"))
        .pipe(GULP.dest("./"));
});

GULP.task("default", ["build-js"]);
