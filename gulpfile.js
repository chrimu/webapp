/**
 * Created with gulpfile.js
 * @Description: gulp
 * @Author: itYang
 * @Date: 2015-05-15 3:04 下午
 * To change this template use File | Settings | File Templates.
 */

var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')({
        pattern: ['gulp-*', 'gulp.*'], // the glob(s) to search for
        replaceString: /^gulp(-|\.)/, // what to remove from the name of the module when adding it to the context
        camelize: true // if true, transforms hyphenated plugins names to camel case
    });


//app路径配置
var config = {
    app: 'src',//开发环境地址配置
    dist: 'dist'//发布环境地址配置
};


/**
 * connect 服务任务
 */
gulp.task('connect', function () {
    plugins.connect.server({
        root      : './',
        port      : 8888,
        host      : '0.0.0.0',
        livereload: true
    });
    var options={
        url:'http://localhost:8888/app',
        app:'chrome'
    };
    gulp.src(config.app + '/index.html').pipe(plugins.open('', options));
    gulp.start('watch');
});



/**
 * html 修改更新视图
 */
gulp.task('html', function () {
    gulp.src(config.app + '/**/*.html')
        .pipe(plugins.connect.reload());
});

/**
 * 监听任务
 */
gulp.task('watch', function () {
    gulp.watch([config.app + '/**/*.html'], ['html']);
});


/**
 * 默认执行此任务：并且gulp 会依次执行一下这些任务
 * 执行命令为：gulp
 */
gulp.task('default', ['connect', 'watch']);
