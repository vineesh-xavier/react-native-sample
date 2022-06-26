import { RouteProp } from "@react-navigation/native";
import { DASHBOARD_SCREENS, DRAWER_STACK_SCREENS, ROOT_STACK_SCREENS } from "./screens";

export type RootStackParamList = {
    [ROOT_STACK_SCREENS.LOGIN]: undefined,
    [ROOT_STACK_SCREENS.SIGNUP]: undefined,
    [ROOT_STACK_SCREENS.DASHBOARD_STACK]: { name: string, userName: string } | undefined
};

export type RootStackRouteProps<RouteName extends keyof RootStackParamList> = RouteProp<
    RootStackParamList,
    RouteName
>;

export type RootDrawerParamList = {
    [DRAWER_STACK_SCREENS.DASHBOARD]: { name: string, userName: string } | undefined,
};

export type RootDrawerProps<RouteName extends keyof RootDrawerParamList> = RouteProp<
    RootDrawerParamList,
    RouteName
>;


export type DashBoardStackParamList = {
    [DASHBOARD_SCREENS.HOME]: { name: string, userName: string } | undefined,
    [DASHBOARD_SCREENS.USER_DETAILS]: { name: string, userName: string } | undefined,
}