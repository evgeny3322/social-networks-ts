import {AppRootStateType} from "./redux-store";
import {UserType} from "./users-reducer";
import {createSelector} from "reselect";

//Selectors
export const getUsers = (state: AppRootStateType): UserType[] => state.usersPage.users;
export const getUsersSelector = createSelector(getUsers, (users: UserType[]) => users);

export const getPageSize = (state: AppRootStateType): number => state.usersPage.pageSize;
export const getPageSizeSelector = createSelector(getPageSize, (pageSize: number) => pageSize);

export const getTotalUsersCount = (state: AppRootStateType): number => state.usersPage.totalUsersCount;
export const getTotalUsersCountSelector = createSelector(getTotalUsersCount, (totalUsersCount: number) => totalUsersCount);

export const getCurrentPage = (state: AppRootStateType): number => state.usersPage.currentPage;
export const getCurrentPageSelector = createSelector(getCurrentPage, (currentPage: number) => currentPage);

export const getIsFetching = (state: AppRootStateType): boolean => state.usersPage.isFetching;
export const getIsFetchingSelector = createSelector(getIsFetching, (isFetching: boolean) => isFetching);

export const getFollowingInProgress = (state: AppRootStateType): number[] => state.usersPage.followingInProgress;
export const getFollowingInProgressSelector = createSelector(getFollowingInProgress, (followingInProgress: number[]) => followingInProgress);