"use strict";

const gulp = require("gulp");
const webpack = require("webpack-stream");
const browsersync = require("browser-sync");

const dist = "./dist/"; // путь куда мы все компилируем
// const dist = "/MAMP/htdocs/ArtPicture"; // путь куда мы все компилируем

gulp.task("copy-html", () => { // отслеживает изменения в html  и запускает browsersync
    return gulp.src("./src/index.html")
                .pipe(gulp.dest(dist))
                .pipe(browsersync.stream());
});

gulp.task("build-js", () => {  // собирает наши модули js и запускает сборщик webpack
    return gulp.src("./src/js/main.js") // экспортируем с main.js
                .pipe(webpack({
                    mode: 'development',
                    output: {
                        filename: 'script.js' // импортируем в script.js
                    },
                    watch: false,
                    devtool: "source-map", 
                    module: {
                        rules: [
                          {
                            test: /\.m?js$/,
                            exclude: /(node_modules|bower_components)/,
                            use: {
                              loader: 'babel-loader', // запускаем babel (для поддержки старых браузеров)
                              options: {
                                presets: [['@babel/preset-env', { // подключаем пресеты (самый популярный на данный момент)
                                    debug: true, // выводит ошибку в случае ее возникновения
                                    corejs: 3, // библиотека, которая отслеживает наш проект и подключает только те поллифилы, которые используются  в нашем проекте
                                    useBuiltIns: "usage"
                                }]]
                              }
                            }
                          }
                        ]
                      }
                }))
                .pipe(gulp.dest(dist)) // собираем все в папку дист
                .on("end", browsersync.reload); // перезагружаем страничку
});

gulp.task("copy-assets", () => {
    return gulp.src("./src/assets/**/*.*")
                .pipe(gulp.dest(dist + "/assets"))
                .on("end", browsersync.reload);
});

gulp.task("watch", () => { // запускает сервер, то, что лежит в папке dist
    browsersync.init({
		server: "./dist/",
		port: 4000,
		notify: true
    });
    
    gulp.watch("./src/index.html", gulp.parallel("copy-html")); 
    gulp.watch("./src/assets/**/*.*", gulp.parallel("copy-assets"));
    gulp.watch("./src/js/**/*.js", gulp.parallel("build-js"));
});

gulp.task("build", gulp.parallel("copy-html", "copy-assets", "build-js"));

gulp.task("build-prod-js", () => {
    return gulp.src("./src/js/main.js")
                .pipe(webpack({
                    mode: 'production',
                    output: {
                        filename: 'script.js'
                    },
                    module: {
                        rules: [
                          {
                            test: /\.m?js$/,
                            exclude: /(node_modules|bower_components)/,
                            use: {
                              loader: 'babel-loader',
                              options: {
                                presets: [['@babel/preset-env', {
                                    corejs: 3,
                                    useBuiltIns: "usage"
                                }]]
                              }
                            }
                          }
                        ]
                      }
                }))
                .pipe(gulp.dest(dist));
});

gulp.task("default", gulp.parallel("watch", "build"));