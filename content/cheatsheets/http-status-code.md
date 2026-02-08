# HTTP Status Code

> The HTTP status codes cheat sheet. A quick reference to every HTTP status code.

Category: Other

## HTTP Status code

### Means

- 1xx: Informational{data-tooltip="It means the request has been received and the process is continuing."}
- 2xx: Success{data-tooltip="It means the action was successfully received, understood, and accepted."}
- 3xx: Redirection{data-tooltip="It means further action must be taken in order to complete the request."}
- 4xx: Client Error{data-tooltip="It means the request contains incorrect syntax or cannot be fulfilled."}
- 5xx: Server Error{data-tooltip="It means the server failed to fulfill an apparently valid request."}

### 2xx. Successful

- 200: OK{data-tooltip="The request is OK."}
- 201: Created{data-tooltip="The request is complete, and a new resource is created."}
- 202: Accepted{data-tooltip="The request is accepted for processing, but the processing is not complete."}
- 203: Non-Authoritative Information{data-tooltip="The information in the entity header is from a local or third-party copy, not from the original server."}
- 204: No Content{data-tooltip="A status code and a header are given in the response, but there is no entity-body in the reply."}
- 205: Reset Content{data-tooltip="The browser should clear the form used for this transaction for additional input."}
- 206: Partial Content{data-tooltip="The server is returning partial data of the size requested. Used in response to a request specifying a Range header. The server must specify the range included in the response with the Content-Range header."}
- 207: Multi-Status{data-tooltip="Provides status for multiple independent operations."}
- 208: Already Reported{data-tooltip="Used inside a DAV: propstat response element to avoid enumerating the internal members of multiple bindings to the same collection repeatedly."}
- 226: IM Used{data-tooltip="The server has fulfilled a request for the resource, and the response is a representation of the result of one or more instance-manipulations applied to the current instance."}

### 4xx. Client Error

- 400: Bad Request{data-tooltip="The server did not understand the request."}
- 401: Unauthorized{data-tooltip="The requested page needs a username and a password."}
- 402: Payment Required{data-tooltip="You can not use this code yet."}
- 403: Forbidden{data-tooltip="Access is forbidden to the requested page."}
- 404: Not Found{data-tooltip="The server can not find the requested page."}
- 405: Method Not Allowed{data-tooltip="The method specified in the request is not allowed."}
- 406: Not Acceptable{data-tooltip="The server can only generate a response that is not accepted by the client."}
- 407: Proxy Authentication Required{data-tooltip="You must authenticate with a proxy server before this request can be served."}
- 408: Request Timeout{data-tooltip="The request took longer than the server was prepared to wait."}
- 409: Conflict{data-tooltip="The request could not be completed because of a conflict."}
- 410: Gone{data-tooltip="The requested page is no longer available."}
- 411: Length Required{data-tooltip="The "Content-Length" is not defined. The server will not accept the request without it."}
- 412: Precondition Failed{data-tooltip="The pre condition given in the request evaluated to false by the server."}
- 413: Payload Too Large{data-tooltip="The server will not accept the request, because the request entity is too large."}
- 414: URI Too Long{data-tooltip="The server will not accept the request, because the URL is too long. Occurs when you convert a "post" request to a "get" request with a long query information."}
- 415: Unsupported Media Type{data-tooltip="The server will not accept the request, because the media type is not supported."}
- 416: Range Not Satisfiable{data-tooltip="The requested byte range is not available and is out of bounds."}
- 417: Expectation Failed{data-tooltip="The expectation given in an Expect request-header field could not be met by this server."}
- 421: Misdirected Request{data-tooltip="The request was directed at a server that is not able to produce a response."}
- 426: Upgrade Required{data-tooltip="The server refuses to perform the request using the current protocol but might be willing to do so after the client upgrades to a different protocol."}
- 428: Precondition Required{data-tooltip="The origin server requires the request to be conditional."}
- 429: Too Many Requests{data-tooltip="The user has sent too many requests in a given amount of time."}
- 431: Request Header Fields Too Large{data-tooltip="The server is unwilling to process the request because its header fields are too large."}
- 451: Unavailable For Legal Reasons{data-tooltip="This status code indicates that the server is denying access to the resource as a consequence of a legal demand."}

### 1xx. Information

- 100: Continue{data-tooltip="Only a part of the request has been received by the server, but as long as it has not been rejected, the client should continue with the request."}
- 101: Switching Protocols{data-tooltip="The server switches protocol."}
- 102: Processing{data-tooltip="An interim response used to inform the client that the server has accepted the complete request, but has not yet completed it."}
- 103: Early Hints{data-tooltip="Indicates to the client that the server is likely to send a final response with the header fields included in the informational response."}

### 3xx. Redirection

- 300: Multiple Choices{data-tooltip="A link list. The user can select a link and go to that location. Maximum five addresses."}
- 301: Moved Permanently{data-tooltip="The requested page has moved to a new URL."}
- 302: Found{data-tooltip="The requested page has moved temporarily to a new URL."}
- 303: See Other{data-tooltip="The requested page can be found under a different URL."}
- 304: Not Modified{data-tooltip="This is the response code to an If-Modified-Since or If-None-Match header, where the URL has not been modified since the specified date."}
- 305: Use Proxy{data-tooltip="The requested URL must be accessed through the proxy mentioned in the Location header."}
- 306: Unused{data-tooltip="This code was used in a previous version. It is no longer used, but the code is reserved."}
- 307: Temporary Redirect{data-tooltip="The requested page has moved temporarily to a new URL."}
- 308: Permanent Redirect{data-tooltip="The request and all future requests should be repeated using another URI."}

### 5xx. Server Error

- 500: Internal Server Error{data-tooltip="The request was not completed. The server met an unexpected condition."}
- 501: Not Implemented{data-tooltip="The request was not completed. The server did not support the functionality required."}
- 502: Bad Gateway{data-tooltip="The request was not completed. The server received an invalid response from the upstream server."}
- 503: Service Unavailable{data-tooltip="The request was not completed. The server is temporarily overloading or down."}
- 504: Gateway Timeout{data-tooltip="The gateway has timed out."}
- 505: HTTP Version Not Supported{data-tooltip="The server does not support the "http protocol" version."}
- 506: Variant Also Negotiates{data-tooltip="Transparent content negotiation for the request results in a circular reference."}
- 507: Insufficient Storage{data-tooltip="The server is unable to store the representation needed to complete the request."}
- 508: Loop Detected{data-tooltip="The server detected an infinite loop while processing the request."}
- 510: Not Extended{data-tooltip="Further extensions to the request are required for the server to fulfill it."}
- 511: Network Authentication Required{data-tooltip="The client needs to authenticate to gain network access."}

