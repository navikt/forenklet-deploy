import { apiBaseUri } from '../utils/config';

export interface Feature {
    name: string;
    enabled: boolean;
}

function throwIfNotSuccess(response: Response): Response {
    if (!response.ok) {
        throw new Error();
    }
    return response;
}

function fetchAsJson<T>(url: string): Promise<T> {
    return fetch(url)
        .then(throwIfNotSuccess)
        .then((response) => response.json());
}

const featureCache: { [name: string]: Feature } = {};
export function getFeature(featureName: string): Promise<Feature> {
    if (featureCache.hasOwnProperty(featureName)) {
        return Promise.resolve(featureCache[featureName]);
    }

    return fetchAsJson(`${apiBaseUri}/featuretoggles/${featureName}`)
        .then((feature: Feature) => {
            featureCache[featureName] = feature;
            return feature;
        });
}
