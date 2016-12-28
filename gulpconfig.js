'use strict';

module.exports = {
    mobile: true,
    app: 'assets',
    dist: 'public',
    banner: '/**\n' +
        ' * @version <%= new Date().toISOString().split("T")[0] %>\n' +
        ' * @author bot\n' +
        ' * @link none\n' +
        ' *\n' +
        ' * Built with gulp\n' +
        ' *\n' +
        '**/\n'
};
