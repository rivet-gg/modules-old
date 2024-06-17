/* tslint:disable */
/* eslint-disable */
/**
 * Open Game Backend
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { mapValues } from '../runtime';
import type { LobbiesCreateResponseLobbyBackendLocalDevelopment } from './LobbiesCreateResponseLobbyBackendLocalDevelopment';
import {
    LobbiesCreateResponseLobbyBackendLocalDevelopmentFromJSON,
    LobbiesCreateResponseLobbyBackendLocalDevelopmentFromJSONTyped,
    LobbiesCreateResponseLobbyBackendLocalDevelopmentToJSON,
} from './LobbiesCreateResponseLobbyBackendLocalDevelopment';
import type { LobbiesCreateResponseLobbyBackendServer } from './LobbiesCreateResponseLobbyBackendServer';
import {
    LobbiesCreateResponseLobbyBackendServerFromJSON,
    LobbiesCreateResponseLobbyBackendServerFromJSONTyped,
    LobbiesCreateResponseLobbyBackendServerToJSON,
} from './LobbiesCreateResponseLobbyBackendServer';

/**
 * 
 * @export
 * @interface LobbiesCreateResponseLobbyBackend
 */
export interface LobbiesCreateResponseLobbyBackend {
    /**
     * 
     * @type {object}
     * @memberof LobbiesCreateResponseLobbyBackend
     */
    test?: object;
    /**
     * 
     * @type {LobbiesCreateResponseLobbyBackendLocalDevelopment}
     * @memberof LobbiesCreateResponseLobbyBackend
     */
    localDevelopment?: LobbiesCreateResponseLobbyBackendLocalDevelopment;
    /**
     * 
     * @type {LobbiesCreateResponseLobbyBackendServer}
     * @memberof LobbiesCreateResponseLobbyBackend
     */
    server?: LobbiesCreateResponseLobbyBackendServer;
}

/**
 * Check if a given object implements the LobbiesCreateResponseLobbyBackend interface.
 */
export function instanceOfLobbiesCreateResponseLobbyBackend(value: object): value is LobbiesCreateResponseLobbyBackend {
    return true;
}

export function LobbiesCreateResponseLobbyBackendFromJSON(json: any): LobbiesCreateResponseLobbyBackend {
    return LobbiesCreateResponseLobbyBackendFromJSONTyped(json, false);
}

export function LobbiesCreateResponseLobbyBackendFromJSONTyped(json: any, ignoreDiscriminator: boolean): LobbiesCreateResponseLobbyBackend {
    if (json == null) {
        return json;
    }
    return {
        
        'test': json['test'] == null ? undefined : json['test'],
        'localDevelopment': json['localDevelopment'] == null ? undefined : LobbiesCreateResponseLobbyBackendLocalDevelopmentFromJSON(json['localDevelopment']),
        'server': json['server'] == null ? undefined : LobbiesCreateResponseLobbyBackendServerFromJSON(json['server']),
    };
}

export function LobbiesCreateResponseLobbyBackendToJSON(value?: LobbiesCreateResponseLobbyBackend | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'test': value['test'],
        'localDevelopment': LobbiesCreateResponseLobbyBackendLocalDevelopmentToJSON(value['localDevelopment']),
        'server': LobbiesCreateResponseLobbyBackendServerToJSON(value['server']),
    };
}
