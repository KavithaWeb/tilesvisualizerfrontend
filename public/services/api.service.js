

const backendHost = "http://localhost:8080";


export const request = async (endpoint = "/", requestContent = {}) => {
    const requestHeaders = {
        ...requestContent?.headers,
        'Accept': 'application/json',
    }
    requestContent.headers = requestHeaders;
    return await fetch(`${backendHost}${endpoint}`, requestContent);
}