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
/**
 * 
 * @export
 * @interface LobbiesSetPlayerConnectedRequest
 */
export interface LobbiesSetPlayerConnectedRequest {
    /**
     * 
     * @type {string}
     * @memberof LobbiesSetPlayerConnectedRequest
     */
    lobbyId?: string;
    /**
     * 
     * @type {string}
     * @memberof LobbiesSetPlayerConnectedRequest
     */
    lobbyToken?: string;
    /**
     * 
     * @type {Array<string>}
     * @memberof LobbiesSetPlayerConnectedRequest
     */
    playerTokens: Array<string>;
}

/**
 * Check if a given object implements the LobbiesSetPlayerConnectedRequest interface.
 */
export function instanceOfLobbiesSetPlayerConnectedRequest(value: object): value is LobbiesSetPlayerConnectedRequest {
    if (!('playerTokens' in value) || value['playerTokens'] === undefined) return false;
    return true;
}

export function LobbiesSetPlayerConnectedRequestFromJSON(json: any): LobbiesSetPlayerConnectedRequest {
    return LobbiesSetPlayerConnectedRequestFromJSONTyped(json, false);
}

export function LobbiesSetPlayerConnectedRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): LobbiesSetPlayerConnectedRequest {
    if (json == null) {
        return json;
    }
    return {
        
        'lobbyId': json['lobbyId'] == null ? undefined : json['lobbyId'],
        'lobbyToken': json['lobbyToken'] == null ? undefined : json['lobbyToken'],
        'playerTokens': json['playerTokens'],
    };
}

export function LobbiesSetPlayerConnectedRequestToJSON(value?: LobbiesSetPlayerConnectedRequest | null): any {
    if (value == null) {
        return value;
    }
    return {
        
        'lobbyId': value['lobbyId'],
        'lobbyToken': value['lobbyToken'],
        'playerTokens': value['playerTokens'],
    };
}
