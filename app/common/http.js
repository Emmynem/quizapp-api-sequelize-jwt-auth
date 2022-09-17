import { AuthenticationErrorResCode, InvalidAuthenticationErrorResCode, CreateSuccessResCode, NoContentSuccessResCode, NotFoundResCode, ServerErrorResCode, SuccessResCode, TooManyRequestsResCode, UserErrorResCode, UserValidationErrorResCode, ConflictResCode } from "../config/http.config.js";
import logger from "./logger.js";

export const SuccessResponse = (res, message, data) => {
    logger.info(message);
    return res.status(SuccessResCode).send({
        success: true,
        message: message,
        data: !data ? null : data
    });
};

export const CreationSuccessResponse = (res, message, data) => {
    logger.info(message);
    return res.status(CreateSuccessResCode).send({
        success: true,
        message: message,
        data: !data ? null : data
    });
};

export const OtherSuccessResponse = (res, message, data) => {
    logger.info(message);
    return res.status(NoContentSuccessResCode).send({
        success: true,
        message: message,
        data: !data ? null : data
    });
};

export const NotFoundError = (res, message, data) => {
    logger.error(message);
    return res.status(NotFoundResCode).send({
        success: false,
        message: message,
        data: !data ? null : data
    });
};

export const BadRequestError = (res, message, data) => {
    logger.warn(message);
    return res.status(UserErrorResCode).send({
        success: false,
        message: message,
        data: !data ? null : data
    });
};

export const ValidationError = (res, message, data) => {
    logger.warn(message);
    return res.status(UserValidationErrorResCode).send({
        success: false,
        message: message,
        data: !data ? null : data
    });
};

export const UnauthorizedError = (res, message, data) => {
    logger.warn(message);
    return res.status(InvalidAuthenticationErrorResCode).send({
        success: false,
        message: message,
        data: !data ? null : data
    });
};

export const ForbiddenError = (res, message, data) => {
    logger.error(message);
    return res.status(AuthenticationErrorResCode).send({
        success: false,
        message: message,
        data: !data ? null : data
    });
};

export const ConflictError = (res, message, data) => {
    logger.warn(message);
    return res.status(ConflictResCode).send({
        success: false,
        message: message,
        data: !data ? null : data
    });
};

export const TooManyRequestError = (res, message, data) => {
    logger.warn(message);
    return res.status(TooManyRequestsResCode).send({
        success: false,
        message: message,
        data: !data ? null : data
    });
};

export const ServerError = (res, message, data) => {
    logger.error(message);
    return res.status(ServerErrorResCode).send({
        success: false,
        message: message,
        data: !data ? null : data
    });
};