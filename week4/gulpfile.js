var gulp=require('gulp');
var gulpSass=require('gulp-sass');
var gulpWebServer=require('gulp-webserver');
gulp.task('startServer',function(){
	return gulp.src('src')
			.pipe(gulpWebServer({
				port:8080,
				proxies:[
					{
						source:"/getIndexData",
						target:"http://localhost:3000/getIndexData"
					},
					{
						source:"/getAddData",
						target:"http://localhost:3000/getAddData"
					},
					{
						source:"/deleteData",
						target:"http://localhost:3000/deleteData"
					},
					{
						source:"/getupData",
						target:"http://localhost:3000/getupData"
					},
					{
						source:"/upDatas",
						target:"http://localhost:3000/upDatas"
					}
				]
			}))
})

gulp.task('sass',function(){
	return gulp.src('./src/scss/**/*.scss')
			.pipe(gulpSass())
			.pipe(gulp.dest('./src/css'))
})


gulp.task('watching',function(){
	return gulp.watch('./src/scss/**/*.scss',gulp.series('sass'))
})

gulp.task('dev',gulp.parallel('sass','startServer','watching'));