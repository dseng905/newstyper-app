import Cookies from 'js-cookie'

export interface CreateProfileInfo {
    email : string
    password : string
    firstName : string
    lastName : string
}

export interface SignInInfo {
    email : string
    password : string
}

export interface UserProfileResponse {
    token? : string
    userId? : string
    expiresIn? : number
    error? : string
    success? : string
}

export interface UserStatisticsResponse {
    userId? : number
    averageWpm? : number
    dailyGoal? : number
    dailyGoalArticlesCompleted? : number,
    totalArticlesCompleted? : number
}

export interface UserProfileResponse {
    id? : number
    email? : string
    firstName? : string
    lastName? : string
    userProfile : UserStatisticsResponse
}
  

const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
}

const URI = "http://localhost:5000/user_profile"

abstract class NewsTyperApi {
    static async createUserProfile(user : CreateProfileInfo) : Promise<UserProfileResponse> {
        const body = JSON.stringify({
            first_name : user.firstName,
            last_name : user.lastName,
            email : user.email,
            password : user.password
        })

        return await fetch(URI + '/create', {
            method: "POST",
            credentials: 'include',
            body,
            headers,
        }).then(res => res.json()) as UserProfileResponse
    }

    static async signInToUserProfile(user : SignInInfo) : Promise<UserProfileResponse> {
        const { email, password } = user
        const body = JSON.stringify({ email, password })

        return await fetch(URI + '/signin', {
            method: "POST",
            credentials: 'include',
            body,
            headers
        }).then(res => res.json()) as UserProfileResponse
    }

    static async getUserStatistics() : Promise<UserStatisticsResponse>{
        const token = Cookies.get('token')
        return await fetch(URI + '/statistics', {
            method: "GET",
            credentials: 'include',
            headers: {
                'Authorization' : 'Bearer ' + token ?? '',
                'Content-Type' : 'application/json'
            }
        }).then(res => res.json()) as UserStatisticsResponse
    }

    static async getUserProfile() : Promise<UserProfileResponse> {
        const token = Cookies.get('token')
        return await fetch(URI + '/', {
            method: "GET",
            credentials: 'include',
            headers: {
                'Authorization' : 'Bearer ' + token ?? '',
                'Content-Type' : 'application/json'
            }
        }).then(res => res.json()) as UserProfileResponse
    }
}

export default NewsTyperApi