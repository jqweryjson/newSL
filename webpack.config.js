'use strict';

const gulpConfig = require('./gulpconfig'),
    webpack = require('webpack');

let entryValue = {              //обькет с префиксами пути по которому берем джски
    desktop: './common',        //десктоп версия
    mobile: './common-mobile'   //мобильная версия
}

if (!gulpConfig.mobile) {       //если если это только для десктопа
    entryValue = {
        desktop: './common'
    }
}

module.exports = function(env) {//сдесь необходимо экспортировать обьект конфига
    const config = {
        context: __dirname + '/assets', // исходная директория
        entry: entryValue,      //говорит какой модуль надо собирать
        output: {
            path: __dirname + '/public',//куда собирать
            filename: '[name].bundle.js',//имя файла
            library: '[name]'//после сборки экспорт будет помещен в эту переменную
        },
        devtool: env === 'development' ? 'cheap-inline-module-source-map' : null,//выводит соурсмэпы
        module: {
            loaders: [{
                test: /\.js$/,//проверка лоудера на js
                include: __dirname + '/assets',//проврка на диреторию обраьатывем файлы только внутри нее
                loader: 'babel'//лоадер-бабель
            }],
            noParse: [
                /owl.carousel\/dist\/owl.carousel/  //можно передавать строку или массив строк и этот файл не будет обрабатываться бабелем
            ]
        },
        resolve: {
            modulesDirectories: [ //сообщаем вебпеку где будем искать модули
                __dirname + '/public/node_modules',//стандартные модули
                __dirname + '/assets/blocks',//и модули в боках
                'node_modules'//хз на всякий случай чтоле
            ],
            extensions: ['', '.js'] //расширение файла
        },
        plugins: []
    };

    if (env === 'production') {
        const banner = gulpConfig.banner.replace(
            '<%= new Date().toISOString().split("T")[0] %>', new Date().toISOString().split('T')[0]);

        config.plugins.push(
            new webpack.optimize.UglifyJsPlugin(),
            new webpack.BannerPlugin(banner, {
                raw: true
            })
        );
    }

    return config;//возвращаем сам обьект конфига
};
