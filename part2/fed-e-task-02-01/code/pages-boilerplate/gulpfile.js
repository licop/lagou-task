// 实现这个项目的构建任务
const {src, dest, parallel, series, watch} = require('gulp')

const del = require('del')
const browserSync = require('browser-sync')
const loadPlugins = require('gulp-load-plugins')
const plugins = loadPlugins()
const bs = browserSync.create()

const clean = () => {
    return del(['dist', 'temp'])
  }
  const data = {
    menus: [
      {
        name: 'Home',
        icon: 'aperture',
        link: 'index.html'
      },
      {
        name: 'Features',
        link: 'features.html'
      },
      {
        name: 'About',
        link: 'about.html'
      },
      {
        name: 'Contact',
        link: '#',
        children: [
          {
            name: 'Twitter',
            link: 'https://twitter.com/w_zce'
          },
          {
            name: 'About',
            link: 'https://weibo.com/zceme'
          },
          {
            name: 'divider'
          },
          {
            name: 'About',
            link: 'https://github.com/zce'
          }
        ]
      }
    ],
    pkg: require('./package.json'),
    date: new Date()
  }
// 样式文件转化，scss转化为css
const style = () => {
    return src('src/assets/styles/*.scss', { base: 'src' })
      .pipe(plugins.sass({ outputStyle: 'expanded' }))
      .pipe(dest('temp'))
      .pipe(bs.reload({ stream: true }))
}

// 使用babel编译js文件
const script = () => {
    return src('src/assets/scripts/*.js', { base: 'src' })
      .pipe(plugins.babel({ presets: ['@babel/preset-env'] }))
      .pipe(dest('temp'))
      .pipe(bs.reload({ stream: true }))
}

const page = () => {
    return src('src/*.html', { base: 'src' })
        .pipe(plugins.swig({data, defaults: { cache: false } })) // 防止模板缓存导致页面不能及时更新
        .pipe(dest('temp'))
        .pipe(bs.reload({ stream: true }))
}

const image = () => {
    return src('src/assets/images/**', { base: 'src' })
        .pipe(plugins.imagemin())
        .pipe(dest('dist'))
}

const font = () => {
    return src('src/assets/fonts/**', { base: 'src' })
        .pipe(plugins.imagemin())
        .pipe(dest('dist'))
}

const extra = () => {
    return src('public/**', { base: 'public' })
        .pipe(dest('dist'))
}


const serve = () => {
    watch('src/assets/styles/*.scss', style)
    watch('src/assets/scripts/*.js', script)
    watch('src/*.html', page)

    watch([
      'src/assets/images/**',
      'src/assets/fonts/**',
      'public/**'
    ], bs.reload)
  
    bs.init({
      notify: false,
      port: 2080,
      // open: false,
      // files: 'dist/**',
      server: {
        baseDir: ['temp', 'src', 'public'],
        routes: {
          '/node_modules': 'node_modules'
        }
      }
    })
}

const useref = () => {
    return src('temp/*.html', { base: 'temp' })
    .pipe(plugins.useref({ searchPath: ['temp', '.'] }))
    // html js css
    .pipe(plugins.if(/\.js$/, plugins.uglify()))
    .pipe(plugins.if(/\.css$/, plugins.cleanCss()))
    .pipe(plugins.if(/\.html$/, plugins.htmlmin({
        collapseWhitespace: true,
        minifyCSS: true,
        minifyJS: true
    })))
    .pipe(dest('dist'))
}

const jsLint = () => {
    return src('src/assets/scripts/*.js', { base: 'src' })
        .pipe(plugins.eslint())
        // eslint.format() outputs the lint results to the console.
        // Alternatively use eslint.formatEach() (see Docs).
        .pipe(plugins.eslint.format())
        // To have the process exit with an error code (1) on
        // lint error, return the stream and pipe to failAfterError last.
        .pipe(plugins.eslint.failAfterError());
}

const cssLint = () => {
    return src('src/assets/styles/*.scss',  { base: 'src' })
    .pipe(plugins.sassLint())
    .pipe(plugins.sassLint.format())
    .pipe(plugins.sassLint.failOnError())
}

const compile = parallel(style, script, page)

const lint = parallel(jsLint, cssLint)

// 上线之前执行的任务
const build =  series(
  clean,
  lint,
  parallel(
    series(compile, useref),
    image,
    font,
    extra
  )
)

const start = series(compile, serve)

module.exports = {
    lint,
    clean,
    build,
    serve,
    start
}
  