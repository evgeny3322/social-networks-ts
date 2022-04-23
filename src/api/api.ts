import axios, {AxiosResponse} from "axios";
import { UserType } from "../redux/users-reducer";

export type UsersDataResponseType = {
    error: boolean | null,
    totalCount: number,
    items: Array<UserType>
}

export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY": "262e2c2b-b3e7-4ca9-aebd-afd6b759e25e"
    }
});

export const getUsers = (currentPage: number = 1, pageSize: number = 10) => {
    return instance
        .get(`users?page=${currentPage}&count=${pageSize}`)
        .then((response: AxiosResponse<UsersDataResponseType>) => {
            return response.data;
        });
}