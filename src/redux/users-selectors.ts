import {AppRootStateType} from "./redux-store";
import {UserType} from "./users-reducer";

export const getUsersSelector = (state: AppRootStateType): UserType[] => state.usersPage.users;

export const getPageSizeSelector = (state: AppRootStateType): number => state.usersPage.pageSize;

export const getTotalUsersCountSelector = (state: AppRootStateType): number => state.usersPage.totalUsersCount;

export const getCurrentPageSelector = (state: AppRootStateType): number => state.usersPage.currentPage;

export const getIsFetchingSelector = (state: AppRootStateType): boolean => state.usersPage.isFetching;

export const getFollowingInProgressSelector = (state: AppRootStateType): number[] => state.usersPage.followingInProgress;