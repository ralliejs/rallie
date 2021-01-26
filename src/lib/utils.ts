const isObject = (object: any) => {
    return Object.prototype.toString.call(object) === '[object Object]';
};

export const Errors = {
    // ================= EventEmitter.broadcast  =================
    removeNonExistedBroadcast: (eventName: string) => {
        return `[obvious] you are trying to remove a listener of the broadcast event ${eventName}, but ${eventName} hasn't been registed as a broadcast event`;
    },
    wrongBroadcastCallback: (eventName: string) => {
        return `[obvious] you are trying to remove a listener of the broadcast event ${eventName}, but the listener hasn't been registed`;
    },
    broadcastCallbackError: (eventName: string) => {
        return `[obvious] one of the callbacks of the broadcast event ${eventName} throws an uncaught error`;
    },
    // ================= EventEmitter.unicast ====================
    removeNonExistedUnicast: (eventName: string) => {
        return `[obvious] you are trying to remove a listener of the unicast event ${eventName}, but ${eventName} hasn't been registed as a unicast event`;
    },
    wrongUnicastCallback: (eventName: string) => {
        return `[obvious] you are trying to remove a listener of the unicast event ${eventName}, but the listener hasn't been registed`;
    },
    registedExistedUnicast: (eventName: string) => {
        return `[obvious] you are trying to regist a unicast event ${eventName}, but it has been registed before`;
    },
    // ================= App ===================
    createExistingApp: (appName: string) => {
        return `[obvious] ${appName} is existing, you are not allowed to create it again`;
    },
    resourceNotDeclared: (appName: string, busName: string) => {
        return `[obvious] can not find any assets of the app ${appName} on the bus ${busName}`;
    },
    appNotCreated: (appName: string) => {
        return `[obvious] you are trying to activate app ${appName}, but it was not created`;
    },
    // ================= Socket ===============
    modifyPrivateState: (stateName: string) => {
        return `[obvious] state ${stateName} is private, you are not allowed to set it`;
    },
    accessUninitializedState: (stateName: string) => {
        return `[obvious] it's not allowed to set, watch or unwatch state ${stateName} before it is initialized`;
    },
    waitStateTimeout: (states: string[]) => {
        return `[obvious] wait for states ${JSON.stringify(states)} timeout`;
    },
    duplicatedInitial: (stateName: string) => {
        return `[obvious] duplicated initialized state ${stateName}`;
    },
    initialStateAsUndefined: (stateName: string) => {
        return `[obvious] state ${stateName} can't be initialized to undefined, please initial it to null instead`;
    },
    // ================= Bus ==================
    stateIsReadOnly: () => {
        return '[obvious] bus.state is readonly';
    },
    invalidResource: (asset: string) => {
        return `[obvious] ${asset} is not a valid asset`;
    },
    bootstrapNumberOverflow: () => {
        return '[obvious] the number of apps bootstraped at a time is greater than the maximum value of 100, ' + 
               'it means that there may be circular dependencies, please check the app dependencies declaration ' +
               'or reset the bus\'s maxDependencyDepth';
    },
    // ================= State ==================
    regardArrayAsObject: (subStateName: string, subscript: string) => {
        return `[obvious] state.${subStateName} is an Array, but the subscript you set("${subscript}") is not a number, therefore, the state will not be changed`;
    },
    regardBasicTypeAsObject: (subStateName: string, type: string) => {
        return `[obvious] state.${subStateName} is a ${type}, buy you regard it as a object and try to traverse it while setting state, therefore, the state will not be changed`;
    }
};

export const Warnings = {
    emptyBroadcastEvents: (eventName: string) => {
        return `[obvious] you have emitted ${eventName} event, but there is no listener of this event`;
    }
};

export const getMappedState = (state: object) => {
    const mappedState = {}; 
    Object.keys(state).forEach((key) => {
        mappedState[key] = state[key].value;
    });
    return JSON.parse(JSON.stringify(mappedState));
};

export const getStateName = (stateNameLink: Array<string | number>): string => {
    let result = ''
    stateNameLink.forEach((item, index) => {
        const nextStateName = stateNameLink[index + 1]
        const isNextObject = (typeof nextStateName) === 'string'
        if (typeof item === 'number') {
            result += (isNextObject ? `[${item}].` : `[${item}]`)
        } else {
            result += (isNextObject ? `${item}.` : item)
        }
    })
    return result
}

export const getStateNameLink = (stateName: string): Array<string | number> => {
    const tempLink = stateName.split('.')
    const resultLink = []
    tempLink.forEach((item: string) => {
        const arrayPattern = /(.+)\[(\d+)\]$/
        const matchedResult = arrayPattern.exec(item)
        if (matchedResult !== null) {
            const arrayName = matchedResult[1]
            const arrayIndex = matchedResult[2]
            getStateNameLink(arrayName).forEach((item) => {
                resultLink.push(item)
            })
            resultLink.push(Number(arrayIndex))
        } else {
            resultLink.push(item)
        }
    })
    return resultLink
};

export const get = (rootState: object | Array<any>, stateLink: Array<string | number>) => {
    let current = rootState;
    for (const key of stateLink) {
        if (Array.isArray(current)) {
            if (typeof key !== 'number') {
                return undefined;
            }
            current = current[key];
        } else if (isObject(current)) {
            current = current[key];
        } else {
            return undefined;
        }
    }
    return current;
};

export const set = (rootStateName: string, rootState: object, subStateLink: Array<string | number>, value: any) => {
    let current = rootState;
    for (let i = 0; i < subStateLink.length; i++) {
        const key = subStateLink[i];
        if (i === subStateLink.length - 1) { // traverse to the last
            if (Array.isArray(current)) {
                if (typeof key !== 'number') {
                    const stateName = getStateName([rootStateName, ...subStateLink.slice(0, i)]);
                    console.error(Errors.regardArrayAsObject(stateName, key));
                    return false;
                } else {
                    current[key] = value;
                }
            } else {
                current[key] = value;
            }
        } else {
            let next = null;
            if (Array.isArray(current)) {
                if (typeof key !== 'number') {
                    const stateName = getStateName([rootStateName, ...subStateLink.slice(0, i)]);
                    console.error(Errors.regardArrayAsObject(stateName, key));
                    return false;
                } else {
                    next = key;
                }
            } else {
                next = key;
            }
            if (current[next] === undefined || current[next] === null) {
                const nextNext = subStateLink[i + 1]
                current[next] = (typeof nextNext === 'number') ? [] : {};
            } else if (!(Array.isArray(current[next]) || isObject(current[next]))) {
                const stateName = getStateName([rootStateName, ...subStateLink.slice(0, i + 1)])
                const type = typeof current[next];
                console.error(Errors.regardBasicTypeAsObject(stateName, type));
                return false;
            }
            current = current[next];
        }
    }
    return true;
};

export const getResolvedStates = (stateName: string, events: Array<string>) => {
    const regex = /^\$state-(.+)-change$/;
    const result = [];
    events.forEach((eventName: string) => {
        const regexMatchedResult = regex.exec(eventName);
        if (regexMatchedResult) {
            const matchedState = regexMatchedResult[1];
            if (matchedState.startsWith(stateName)) {
                result.push(matchedState);
            }
            if (stateName.startsWith(matchedState) && !result.includes(matchedState)) {
                result.push(matchedState);
            }
        }
    });
    return result;
};