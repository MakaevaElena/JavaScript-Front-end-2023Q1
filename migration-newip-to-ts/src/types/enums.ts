export enum RequestMethod {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PUTCH = 'PUTCH',
    DELETE = 'DELETE',
}

export enum Endpoints {
    Everything = 'everything',
    TopHeadlines = 'top-headlines',
    Sources = 'sources',
}

export enum StatusCode {
    OK = 200,
    BadRequest = 400,
    Unauthorized = 401,
    TooManyRequests = 429,
    ServerError = 500,
    PageNotFound = 404,
}
