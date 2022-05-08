import axios, {AxiosResponse} from "axios";
import { UserType } from "../redux/users-reducer";


export type UsersDataResponseType = {
    error: boolean | null,
    totalCount: number,
    items: Array<UserType>
}

export type ProfileDataResponseType = {
    aboutMe: string | null,
    contacts: {
        facebook: string | null,
        website: string | null,
        vk: string | null,
        twitter: string | null,
        github: string | null,
        instagram: string | null,
        mainLink: string | null,
        youtube: string | null
    },
    fullName: string,
    lookingForAJob: boolean,
    lookingForAJobDescription: string | null,
    photos: {
        small: string | null,
        large: string | null
    },
    userId: number
}

export type UpdateStatusResponseType = {
    resultCode: number,
    messages: Array<string>,
    data: {}
}

export type LogOutResponseType = {
    resultCode: number
    messages: []
    data: {}
}

export type AuthResponseType = {
    resultCode: number,
    messages: Array<string>,
    data: {
        id: number,
        email: string,
        login: string
    }
}

export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "ca3b6a70-ed79-49e0-8cfe-9aa02ff94fb2"
    }
});

export const usersAPI = {
    getUsers (currentPage: number = 1, pageSize: number = 10) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then((response: AxiosResponse<UsersDataResponseType>) => {
                return response.data;
            });
    },
    unFollow (userId: number) {
        return instance.delete(`follow/${userId}`)
    },
    follow (userId: number) {
        return instance.post(`follow/${userId}`)
    }
}


export const profileAPI = {
    getProfile (userId: number | undefined) {
        return instance.get(`profile/${userId}`)
            .then((response: AxiosResponse<ProfileDataResponseType>) => {
                return response.data;
            });
    },
    getStatus(userId: number | undefined) {
        return instance.get(`profile/status/${userId}`)
    },
    updateStatus(status: string) {
        return instance.put('profile/status', {status: status})
    }
}


export const authAPI = {
    getAuth () {
        return instance.get(`auth/me`)
            .then((response: AxiosResponse<AuthResponseType>) => {
                return response.data;
            });
    },
}
