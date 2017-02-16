var util = require("util");

function UsernameOrPasswordInvalidError(settings) {
    settings.message = 'username or password invalid!';
    settings.status = 403;
    return new AppError(settings, UsernameOrPasswordInvalidError);
}

function UserAlreadyExistError(settings) {
    settings.message = 'user already exist!';
    settings.status = 403;
    return new AppError(settings, UserAlreadyExistError);
}

function AppError(settings) {
    settings = ( settings || {} );

    this.name = "AppError";

    this.type = ( settings.type || "Application" );
    this.message = ( settings.message || "error occurred." );
    this.detail = ( settings.detail || "" );
    this.extendedInfo = ( settings.extendedInfo || "" );
    this.errorCode = ( settings.errorCode || "" );
    this.status = (settings.status || 500);
    this.isAppError = true;

    Error.captureStackTrace(this, ( implementationContext || AppError ));
}

module.exports = UsernameOrPasswordInvalidError;
module.exports = UserAlreadyExistError;
module.exports = AppError;

