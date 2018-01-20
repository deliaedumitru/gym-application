export const SERVER = 'http://localhost:63288/api/';
export const LOGIN = 'users/login';
export const SIGNUP = 'users';
export const USERS = 'users';
export const TRAINERS = 'trainers';
export const FEEDBACK = 'feedbacks';
export const CLASSES = 'Class';
export const SCHEDULE = 'ClassSchedules';
export const SCHEDULE_DETAILS = 'classSchedules/details';
export const SCHEDULE_TRAINERS = 'PersonalSchedules';
export const SUBSCRIPTIONS = 'Subscriptions';
export const SCHEDULE_PERSONALS = 'PersonalSchedules';
export const PURCHASE_SUBSCRIPTION = 'Subscription/purchase';
export const SUBSCRIPTION = 'Subscription';
const USER_STORAGE_KEY = 'user';

/**
 * Wrapper for the normal fetch function, but
 * takes the token from local storage and adds it to the authorization header
 * @param url
 * @param params
 */
const fetchWithToken = (url, params) => {
    const user = getUser();
    const token = (user !== null && user !== undefined ? user.token : null);

    // build the fetch with an authorization
    return fetch(url, {
        ...params,
        headers: {
            ...params.headers,
            // add the header if necessary
            ...(token !== null ? {'Authorization': 'Bearer ' + token}  : {})
        }
    });
};

/**
 * Login the user and persist the effect in local storage
 * @param username the username
 * @param password the password
 * @param onSuccess success callback
 * @param onFail fail callback
 */
export const login = (username, password, onSuccess = () => {}, onFail = (err) => {}) => {
    fetch(`${SERVER}${LOGIN}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username,
            password: password,
        })
    }).then((response) => response.json()
    ).then((responseJson) => {
        console.log(responseJson);
        let user = {id: responseJson.Id,
            username: username,
            name: responseJson.Name,
            role: responseJson.Role,
            token: responseJson.Token  //  persist it
        };
        localStorage.setItem('user', JSON.stringify(user));
        console.log(user);
        console.log(JSON.parse(localStorage.getItem(USER_STORAGE_KEY)));
        //alternatively, a function can be called that does the local storage and redirect to some other layout
        //it can be accessed by 'localStorage.getItem('user');
        //it can be remover by localStorage.removeItem('user');
        //objects = JSON.parse(localStorage.getItem('user'));

        onSuccess();
    }).catch((error) => {
            console.error(error);
            onFail(error);
    });
};

/**
 * Logs the user out, basically deleting the persisted object
 */
export const logout = () => {
    localStorage.removeItem(USER_STORAGE_KEY);
    console.log('User logged out');
};


/**
 * Returns the currently logged user
 */
export const  getUser = () => JSON.parse(localStorage.getItem(USER_STORAGE_KEY));

/**
 * Calls the signup method
 * @param username the username to register with
 * @param name the name to register with
 * @param email the email to register with
 * @param password the password to sign up with
 * @param onSuccess success callback
 * @param onFail failure callback
 */
export const signUp = (username, name, email, password, onSuccess = () => {}, onFail = (err) => {}) => {
    fetchWithToken(`${SERVER}${SIGNUP}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            Username: username,
            Name: name,
            Role: '2',
            Email: email,
            Password: password
        })
    }).then(
        (resp) => {
            if(resp.status < 300) onSuccess();
            else onFail("INVALID DATA");
        } // call on success
    ).catch((err) => {
        onFail(err); // call back on fail
        console.log(err + 'fuck you very muuuuuuuuuuch');
    })
};

/**
 * Makes a call to add a class on the backend
 * @param id the id of the class
 * @param name the name of the class
 * @param onSuccess success callback
 * @param onFail fail callback
 */
export const addClass = (id, name, onSuccess = () => {
}, onFail = (err) => {
}) => {
    fetchWithToken(`${SERVER}${CLASSES}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: id,
            name: name,
        })
    }).then((response) => response.json()).then((responseJson) => {
        console.log(responseJson);
        onSuccess();
    }).catch((error) => {
        console.error(error);
        onFail(error);
    });
};

/**
 * Modifies the class with the given id
 * @param id the id of the class
 * @param name the new name
 * @param onSuccess success callback
 * @param onFail fail callback
 */
export const editClass = (id, name, onSuccess = () => {}, onFail = (err) => {}) => {
    fetchWithToken(`${SERVER}${CLASSES}` + '/' + encodeURIComponent(id), {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: id,
            name: name,
        })
    }).then((response) => response.json()).then((responseJson) => {
        console.log(responseJson);
        onSuccess();
    }).catch((error) => {
        console.error(error);
        onFail(error);
    });
};

/**
 * Deletes the class with the given id
 * @param id the id of the class
 * @param onSuccess success callback
 * @param onFail fail callback
 */
export const deleteClass = (id, onSuccess = () => {}, onFail = () => {}) => {
    fetchWithToken(`${SERVER}${CLASSES}` + '/' + encodeURIComponent(id), {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    }).then((response) => response.json()).then((responseJson) => {
        console.log(responseJson);
        onSuccess();
    }).catch((error) => {
        console.error(error);
        onFail()
    });
};

/**
 * Gets the classes
 * @param onSuccess success callback. receives the list returned
 * @param onFail fail callback
 */
export const getClasses = (onSuccess = (resp) => {}, onFail = (err) => {}) => {
    fetchWithToken(`${SERVER}${CLASSES}`, {
        method: 'GET',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    }).then((response) => response.json()).then((responseJson) => {
        console.log(responseJson);
        onSuccess(responseJson);  // call back with json resp
    }).catch((error) => {
        console.error(error);
        onFail(error);
    });
};

/**
 * Gets the trainers
 * @param onSuccess success callback, receives the response object
 * @param onFail fail callback, receives the error
 */
export const getTrainers = (onSuccess = (resp) => {}, onFail = (err) => {}) => {
    fetchWithToken(`${SERVER}${TRAINERS}/`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => response.json()
    ).then(responseData => {
        onSuccess(responseData);
    }).catch((error) => {
        console.error(error);
        onFail(error);
    });
};

/**
 * Enrolls the user with userID to the schedule with scheduleId
 * @param userId
 * @param scheduleId
 * @param onSuccess success callback, receives the response
 * @param onFail fail callback, receives the error
 */
export const enrollUser = (userId, scheduleId, onSuccess = (resp) => {}, onFail = (err) => {}) => {
    let enrollUserUrl = SERVER + 'ClassSchedules/' + scheduleId + '/participants/' + userId;
    fetchWithToken(enrollUserUrl, {
        method: 'POST',
        headers: {
            'Accept': 'application/json'
        }
    }).then().then(responseData => {
        onSuccess(responseData);
    }).catch((error) => {
        console.error(error);
        onFail(error);
    });
};

/**
 * Unenrolls the user with userId from scheduleId
 * @param userId
 * @param scheduleId
 * @param onSuccess success callback recieves the response
 * @param onFail fail callback, receives the error
 */
export const unenrollUser = (userId, scheduleId, onSuccess = (resp) => {}, onFail = (err) => {}) => {
    let unEnrollUserUrl = SERVER + 'ClassSchedules/' + scheduleId + '/participants/' + userId;
    fetchWithToken(unEnrollUserUrl, {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    }).then().then(responseData => {
        onSuccess(responseData);
    }).catch((error) => {
        console.error(error);
        onFail(error);
    });
};

/**
 * Return all the enrollments of the user with userId
 * @param userId
 * @param onSuccess success callback, receives the list of enrollments
 * @param onFail fail callback, receives the error
 */
export const getEnrollments = (userId, onSuccess = (resp) => {}, onFail = (err) => {}) => {
    let userEnrolledUrl = SERVER + 'users/' + userId + '/enrolledClasses';
    fetchWithToken(userEnrolledUrl, {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => response.json()).then(responseData => {
        onSuccess(responseData);
    }).catch((error) => {
        console.error(error);
        onFail(error);
    });
};

/**
 * Gets the schedule between the given dates
 * @param startDate
 * @param endDate
 * @param onSuccess succes callback, receives the response
 * @param onFail fail callback, receives the error
 */
export const getSchedule = (startDate, endDate, onSuccess = (resp) => {}, onFail = () => {}) => {
    fetchWithToken(`${SERVER}${SCHEDULE_DETAILS}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            startDate: startDate,
            endDate: endDate,
        })
    }).then(response => response.json()).then(responseData => {
        onSuccess(responseData);
    }).catch((error) => {
        console.error(error);
        onFail(error);
    });
};

/**
 * Adds a class schedule with the given data
 * @param id
 * @param classId
 * @param date
 * @param capacity
 * @param room
 * @param difficulty
 * @param trainerId
 * @param onSuccess success callback
 * @param onFail fail callback
 */
export const addClassSchedule = (id, classId, date, capacity, room, difficulty, trainerId, onSuccess = (resp) => {}, onFail = (err) => {}) => {
    fetchWithToken(`${SERVER}${SCHEDULE}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            Id: id,
            ClassId: classId,
            Date: date,
            Capacity: capacity,
            Room: room,
            Difficulty: difficulty,
            TrainerId: trainerId,
        })
    }).then((response) => response.json()).then((responseJson) => {
        console.log("Success:", responseJson);
        onSuccess(responseJson);
        alert("Class added");
    }).catch((error) => {
        console.error(error);
        onFail(error);
    });
};

/**
 * Removes the class schedule with the given id
 * @param id
 * @param onSuccess success callback
 * @param onFail fail callback
 */
export const deleteClassSchedule = (id, onSuccess = (resp) => {}, onFail = (err) => {}) => {
    fetchWithToken(`${SERVER}ClassSchedules/${id}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json'
        },
    }).then(responseData => {
        console.log("success ", responseData);
        onSuccess(responseData);
        alert("class deleted");
    }).catch((error) => {
        console.error(error);
        onFail(error);
    });
};


/**
 * Gets the schedules for the trainer with the given id between the given dates.
 * @param startDate
 * @param endDate
 * @param userId
 * @param onSuccess
 * @param onFail
 */
export const getPersonalTrainerSchedule = (startDate, endDate, userId, onSuccess = (resp) => {}, onFail = (err) => {}) => {
    let trainerUrl = SERVER + SCHEDULE_TRAINERS + '/' + userId + '/details';
    fetchWithToken(trainerUrl, {
        method: 'POST',
        headers: {
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            startDate: startDate,
            endDate: endDate,
        })
    }).then(response => response.json()).then(responseData => {
        onSuccess(responseData);
    }).catch((error) => {
        console.error(error);
        onFail(error);
    });
};

/** Get all of the subsctiptions
 * @param onSuccess
 * @param onFail
 */
export const getSubscriptions = (onSuccess = (resp) => {}, onFail = (err) => {}) => {
    fetchWithToken(`${SERVER}${SUBSCRIPTIONS}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        },
    }).then(response => response.json()).then(responseData => {
        onSuccess(responseData);
    }).catch((error) => {
        console.error(error);
        onFail(error);
    });
};

/**
 * Purchase the specified type of subscription for the given user id netween the
 * given dates.
 * @param subscription
 * @param userId
 * @param startDate
 * @param endDate
 * @param onSuccess
 * @param onFail
 */
export const purchaseSubscription = (subscription, userId, startDate, endDate, onSuccess = (resp) => {}, onFail = (err) => {}) => {
    fetchWithToken(`${SERVER}${PURCHASE_SUBSCRIPTION}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json'
        }, body: JSON.stringify({
            TypeId: subscription,
            UserId: userId,
            StartDate: startDate,
            EndDate: endDate,
        })
    }).then(response => {
        onSuccess(response);
    }).catch((error) => {
        console.error(error);
        onFail(error);
    });
};

/**
 * Edit the subscription with the given id with the new data
 * @param id
 * @param name
 * @param price
 * @param onSuccess
 * @param onFail
 */
export const editSubscription = (id, name, price, onSuccess = (resp) => {}, onFail = (err) => {}) => {
    fetchWithToken(`${SERVER}${SUBSCRIPTION}/${id}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json'
        }, body: JSON.stringify({
            Id: id,
            Name: name,
            Price: price,
        })
    }).then(response => {
        onSuccess(response);
    }).catch((error) => {
        console.error(error);
        onFail(error);
    });
};


/**
 * Add a subscription
 * @param id
 * @param name
 * @param price
 * @param onSuccess
 * @param onFail
 */
export const addSubscription = (id, name, price, onSuccess = (resp) => {}, onFail = (err) => {}) => {
    fetchWithToken(`${SERVER}${SUBSCRIPTION}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json'
        }, body: JSON.stringify({
            Id: id,
            Name: name,
            Price: price,
        })
    }).then(response => {
        onSuccess(response);
    }).catch((error) => {
        console.error(error);
        onFail(error);
    });
};

/**
 * Retrieve the trainer with the id
 * @param trainerId
 * @param onSuccess
 * @param onFail
 */
export const getTrainer = (trainerId, onSuccess = (resp) => {}, onFail = (err) => {}) => {
    fetchWithToken(`${SERVER}${TRAINERS}/` + trainerId, {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (!response.ok) {
            //TODO: REDIRECT TO NOT FOUND
            throw Error(response.statusText);
        }
        return response.json()
    }).then(responseData => {
        onSuccess(responseData);
    }).catch((error) => {
        console.error(error);
        onFail(error);
    });
};


/**
 * Get feedback for the given trainer
 * @param trainerId
 * @param onSuccess
 * @param onFail
 */
export const getFeedbacks = (trainerId, onSuccess = (resp) => {}, onFail = (err) => {}) => {
    fetchWithToken(`${SERVER}${FEEDBACK}/` + trainerId, {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (!response.ok) {
            //TODO: REDIRECT TO NOT FOUND
            throw Error(response.statusText);
        }
        return response.json()
    }).then(responseData => {
        console.log(responseData);
        onSuccess(responseData);
    }).catch((error) => {
        console.error(error);
        onFail(error);
    });
};


/**
 * get the feebdacks for the trainer and user
 * @param trainerId
 * @param userId
 * @param onSuccess
 * @param onFail
 */
export const getFeebacksForUser = (trainerId, userId, onSuccess = (resp) => {}, onFail = (err) => {}) => {
    fetchWithToken(`${SERVER}${FEEDBACK}/trainer/` + trainerId + `/user/` + userId, {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (!response.ok) {
            throw Error(response.statusText);
        }
        return response.json()
    }).then(responseData => {
        onSuccess(responseData);
    }).catch((error) => {
        console.error(error);
        onFail(error);
    });
};

/**
 * edit a feedback
 * @param trainerId
 * @param userId
 * @param id
 * @param comment
 * @param rating
 * @param onSuccess
 * @param onFail
 */
export const editFeedback = (trainerId, userId, id, comment, rating, onSuccess = (resp) => {}, onFail = (err) => {}) => {
    let bodyJson = JSON.stringify({
        TrainerId: trainerId,
        UserId: userId,
        Text: comment,
        Rating: rating
    });
    fetchWithToken(`${SERVER}${FEEDBACK}/` + id, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: bodyJson
    }).then(response => response.json()
    ).then(responseData => {
        onSuccess(responseData);
    }).catch((error) => {
        console.error(error);
        onFail(error);
    });
};



/**
 * add feedback fo  a trainer
 * @param trainerId
 * @param userId
 * @param comment
 * @param rating
 * @param onSuccess
 * @param onFail
 */
export const addFeedback = (trainerId, userId, comment, rating, onSuccess = (resp) => {}, onFail = (err) => {}) => {
    let bodyJson = JSON.stringify({
        TrainerId: trainerId,
        UserId: userId,
        Text: comment,
        Rating: rating
    });
    fetchWithToken(`${SERVER}${FEEDBACK}/`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: bodyJson
    }).then(response => response.json()
    ).then(responseData => {
        onSuccess(responseData);
    }).catch((error) => {
        console.error(error);
        onFail(error);
    });
};
export const getPersonalUserSchedule = (userId, startDate, endDate, onSuccess = () => {}, onFail = () => {}) => {
    let personalUrl = SERVER + SCHEDULE_PERSONALS + '/' + userId + '/details';
    fetchWithToken(personalUrl, {
        method: 'POST',
        headers: {
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            id: userId,
            startDate: startDate,
            endDate: endDate,
        })
    }).then(response => response.json()).then(responseData => {
        onSuccess(responseData);
    }).catch((error) => {
        console.error(error);
        onFail(error);
    });
};

export const makeTrainer = (userId, onSuccess = (resp) => {}, onFail = (err) => {}) => {
    fetchWithToken(`${SERVER}${TRAINERS}/` + userId, {
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            }
        }).then(response =>{
             if (!response.ok) {
                throw Error(response.statusText);
            }
            return response
        }).then(response => {
            onSuccess(response);
        }).catch((error) => {
            console.error(error);
            onFail(error);
        });
};


export const makeUser = (userId, onSuccess = (resp) => {}, onFail = (err) => {}) => {
    fetchWithToken(`${SERVER}${TRAINERS}/` + userId, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json'
            }
        }).then(response =>{
             if (!response.ok) {
                throw Error(response.statusText);
            }
            return response
        }).then(response => {
            onSuccess(response);
        }).catch((error) => {
            console.error(error);
            onFail(error);
        });
};
