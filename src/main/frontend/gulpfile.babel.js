//GULP TOOLS
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import gulpConcat from 'gulp-concat';
import yargs from 'yargs';
import del from 'del';
import path from 'path';

import webpack from 'webpack';
import browserSync from 'browser-sync';
//import sass from 'gulp-sass';
//import compass from'gulp-compass';

import autoprefixer from 'autoprefixer-core';
import postcssNested from 'postcss-nested';
import postcssMixins from 'postcss-mixins';
import postcssSimpleVars from 'postcss-simple-vars';
import postcssImport from 'postcss-import';
import postcssColor from 'postcss-color-function';

const args = yargs.alias('p', 'production').argv;
const DEBUG = !args.release;

let plugins = gulpLoadPlugins();

let distDir = path.join(__dirname, '../webapp/resources/dist');
if (args.tomcat) {
    distDir = path.normalize('/Users/zdenekvecek/CODE/work/Apps/apache-tomcat-8.0.23/webapps/evrem/resources/dist');
}

let config = {
    paths: {
        frontendDir: '/frontend',
        jsDir: '/js',
        cssDir: '/css',
        fonts: '/fonts',
        srcDir: './src',
        distDir: distDir,

        portlets: [
            {
                entry: './src/js/new-note-portlet/app.jsx',
                name: 'new-note'
            },
            {
                entry: './src/js/saved-note-portlet/app.jsx',
                name: 'saved-note'
            },
            {
                entry: './src/js/calendar-portlet/app.jsx',
                name: 'calendar'
            },
            {
                entry: './src/js/upcoming-portlet/app.jsx',
                name: 'upcoming'
            },
            {
                entry: './src/js/login-portlet/app.jsx',
                name: 'login'
            },
            {
                entry: './src/js/filter-portlet/app.jsx',
                name: 'filter'
            },
            {
                entry: './src/js/profile-portlet/app.jsx',
                name: 'profile'
            },
            {
                entry: './src/js/page/app.jsx',
                name: 'page'
            }
        ],
        jsDirs: [
            'bower_components/fullcalendar/dist/fullcalendar.js',
            'bower_components/bootstrap/dist/bootstrap.js',
            'bower_components/gridster.js/dist/jquery.gridster.js',
            'bower_components/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min.js',
            'src/js/lib/timezones.js',
            'src/js/lib/timezone-data.js',
            'src/js/lib/spinner.js'
        ],
        vendorCssDirs: [
            'bower_components/fontawesome/css/font-awesome.css',
            'bower_components/gridster.js/dist/jquery.gridster.css',
            'bower_components/fullcalendar/dist/fullcalendar.css',
            'bower_components/bootstrap/dist/css/bootstrap.css',
            'bower_components/bootswatch/flatly/bootstrap.css',
            'bower_components/eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.css',
            'node_modules/react-grid-layout/css/styles.css'
        ],
        fontDirs: [
            'bower_components/fontawesome/fonts',
            'bower_components/bootstrap/fonts',
            'src/fonts'
        ]
    },
    externals: {
        'react': 'React',
        'jquery': 'jQuery',
        'moment': 'moment',
        'flux': 'Flux',
        'eventemitter3': 'EventEmitter',
        'object-assign': 'assign',
        'react/lib/keyMirror': 'keyMirror',
        'react-bootstrap': 'ReactBootstrap',
        'react-router': 'ReactRouter',
        'react-fontawesome': 'FontAwesome',
        'react-grid-layout': 'ReactGridLayout',
        'classnames': 'cx',
        'superagent': 'SuperAgent',
        'fastclick': 'FastClick',
        'amplify-store': 'Amplify',
        'q': 'Q',
        'babel/polyfill': 'BabelPolyfill',
        './js/global-constants': 'GlobalConstants'
    }
};


gulp.task('js', () => {
    const verbose = !!args.verbose;
    let bundlerRunCount = 0;

    //let entries = {};
    //config.paths.portlets.map((portlet) => {
    //    entries[portlet.name] = portlet.entry;
    //});

    const bundler = webpack({
        entry: {
            privatebundle: './src/js/private-page/app.js',
            publicbundle: './src/js/public-page/app.js'
        },
        module: {
            loaders: [
                {test: /\.(gif|png|woff|woff2|eot|ttf|svg)$/,loader: 'url-loader?limit=100000'},
                {test: /\.jpg$/, loader: "file-loader"},
                {test: /\.css$/, loader: 'style!css!postcss'},
                {test: /\.jsx?$/, exclude: /(node_modules|bower_components)/, loader: 'babel'}
            ]
        },
        output: {
            path: config.paths.distDir + config.paths.jsDir,
            publicPath: '/evrem/resources/dist/js/',
            filename: '[name].js'
        },
        postcss: {
            defaults: [postcssImport, postcssMixins, postcssSimpleVars, postcssColor, postcssNested, autoprefixer]
        },
        plugins:[
            new webpack.optimize.DedupePlugin()
        ],
        externals: config.externals,
        cache: DEBUG,
        debug: DEBUG,
        devtool: DEBUG ? 'source-map' : false,
        stats: {
            colors: true,
            reasons: DEBUG
        }
    });

    function bundle(err, stats) {
        if (err) {
            throw new plugins.util.PluginError('webpack', err);
        }

        console.log(stats.toString({
            colors: plugins.util.colors.supportsColor,
            hash: verbose,
            version: verbose,
            timings: verbose,
            chunks: verbose,
            chunkModules: verbose,
            cached: verbose,
            cachedAssets: verbose
        }));

        if (++bundlerRunCount === config.length) {
            return cb();
        }
    }

    if (args.watch) {
        bundler.watch(200, bundle);
    } else {
        bundler.run(bundle);
    }
});

// Launch BrowserSync development server
gulp.task('sync', ['js'], cb => {
    browserSync({
        logPrefix: 'EVREM',
        notify: false,
        https: false,
        proxy: 'localhost:8080/evrem'
    }, cb);

    process.on('exit', () => browserSync.exit());

    gulp.watch([config.paths.distDir + '/**/*.*'], (file) => {
        browserSync.reload(path.relative(__dirname, file.path));
    });
});


gulp.task('fonts', function () {
    let fonts = config.paths.fontDirs.map(function (item) {
        return item + '/**/*.*';
    });
    return gulp.src(fonts)
        .pipe(gulp.dest(config.paths.distDir + config.paths.fonts));
});


gulp.task('global-css', () => {
    return gulp.src(config.paths.vendorCssDirs)
        .pipe(gulpConcat('global-styles.css'))
        .pipe(plugins.if(args.production, plugins.minifyCss()))
        .pipe(gulp.dest(config.paths.distDir + config.paths.cssDir));
});

gulp.task('global-js', () => {
    /**This will be accessible globally*/
    let sources = config.paths.jsDirs;
    sources.push(config.paths.srcDir + config.paths.jsDir + '/global-libs.js');
    return gulp.src(sources)
        .pipe(plugins.webpack())
        .pipe(plugins.rename('global-libs.js'))
        .pipe(plugins.if(args.production, plugins.uglify()))
        .pipe(gulp.dest(config.paths.distDir + config.paths.jsDir));
});

gulp.task('clean-js', () => {
    config.paths.portlets.map((portlet) => {
        return del([
            portlet.output + config.paths.jsPath + '/' + config.paths.bundleFileName
        ], {
            force: true
        },  (err) => {
            console.log('Files deletion error: ' + err);
        });
    });
});

gulp.task('clean-build', ['clean-js', 'js']);
gulp.task('default', ['js']);
gulp.task('global', ['global-js', 'global-css', 'fonts']);
gulp.task('all', ['global-js', 'js', 'global-css', 'fonts']);

