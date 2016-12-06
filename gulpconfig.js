'use strict';

module.exports = {
    mobile: true,
    app: 'assets',
    dist: 'public',
    banner: '/**\n' +
        ' * @version <%= new Date().toISOString().split("T")[0] %>\n' +
        ' * @author Alexander Sofin <avlasof@mail.ru>\n' +
        ' * @link https://github.com/avlasof\n' +
        ' *\n' +
        ' * Built with https://github.com/avlasof/starter-kit\n' +
        ' *\n' +
        '**/\n'
};
