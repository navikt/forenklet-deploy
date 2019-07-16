export function fetchToJson(url: RequestInfo, options?: RequestInit): any {
    return fetch(url, options).then((response) => {
        const status = response.status;
        if (status === 200) {
            return response.json();
        } else {
            return response.json().then((json) => {
                return Promise.reject(json.message);
            });
        }
    });
}
