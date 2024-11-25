/**
 * check if user profile is completed
 * @param {Object} user
 */
export const checkIfUserProfileCompleted = (user) =>{
    return !!user?.name;
};

/**
 * @param {Object} user 
 * @return {Object} user profile 
 */
export const getUserProfile = (user) =>{
    return {
        email:user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        profilePicture: user.profilePicture,
        isProfileCompleted: checkIfUserProfileCompleted(user),
    };
};

export const getProjectionForUser =() =>{
    return {
        email:1,
        firstName:1,
        lastName:1,
        profilePicture:1,
        phone:1,
        fcmToken:1
    };
};