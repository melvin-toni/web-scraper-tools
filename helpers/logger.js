const chalk = require('chalk');

exports.traceLog = (TAG) => {
    console.log(chalk.blue(TAG));
}

exports.successLog = (req, res, obj) => {
    console.log(chalk.green("success"), req.method, req.originalUrl);

    res.status((obj.code ? obj.code : 200 )).json({
        success: (obj.status ? obj.status : true),
        message: (obj.message ? obj.message : 'Operation successful'),
        result: (obj.result ? obj.result : '')
    });
}

exports.failedLog = (req, res, obj) => {
    console.log(chalk.red("failed"), req.method, req.originalUrl);
    console.log(chalk.red(obj.debug));
    let showError = {
        success: (obj.status ? obj.status : false),
        message: (obj.message ? obj.message : 'Operation failed')
    };
    if (obj.result) {
        showError['result'] = (obj.result ? obj.result : '');
    }
    
    res.status((obj.code ? obj.code : 400 )).json(showError);
}