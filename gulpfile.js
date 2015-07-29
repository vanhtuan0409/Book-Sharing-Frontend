var gulp = require('gulp');
var concat = require('gulp-concat');
var watch = require('gulp-watch');
var livereload = require('gulp-livereload');

gulp.task('default', ['compileController', 'watch'], function(){});

gulp.task('watch', function(){
	livereload.listen();
	watch('app/views/**/*.js', function() {
		gulp.start('compileController');
	});
	// watch('app/views/**/*.css', function() {
	// 	gulp.start('compileCSS');
	// })
	watch('app/app.css', function() {
		gulp.src("app/app.css").pipe(livereload());
	});

	watch('app/app.js', function() {
		gulp.src("app/app.js").pipe(livereload());
	});

	watch('app/**/*.html', function() {
		gulp.src("app/**/*.html").pipe(livereload());
	});
});

gulp.task('compileController', function(){
	return gulp.src("app/views/**/*.js")
		.pipe(concat('controllers.js'))
		.pipe(gulp.dest('app'))
		.pipe(livereload());
});

gulp.task('compileCSS', function(){
	return gulp.src("app/views/**/*.css")
		.pipe(concat('app.css'))
		.pipe(gulp.dest('app'))
		.pipe(livereload());
});