import React, { Suspense } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EditingLayout, { ButtonCordinates } from "./Editing_layout";
import HomeScreen from "./HomePage";
import { ActivityIndicator } from "react-native";
import { openDatabaseSync, SQLiteProvider } from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import migration from "@/drizzle/migrations";
import { MainController } from "./components/MainController";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SettingsScreen from "./components/Setting";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

export type RootStackParamList = {
	Home: undefined;
	MainController: { layoutCor: ButtonCordinates };
	EditingLayout: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
export const DATABASE_NAME = "controller";

declare global {
	namespace ReactNavigation {
		interface RootParamList extends RootStackParamList {}
	}
}

export const expoDb = openDatabaseSync(DATABASE_NAME, {
	enableChangeListener: true,
});
export const db = drizzle(expoDb);

export function ProjectStack() {
	const { success, error } = useMigrations(db, migration);
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<Suspense fallback={<ActivityIndicator size={"large"} />}>
				<SQLiteProvider
					databaseName={DATABASE_NAME}
					options={{ enableChangeListener: true }}
					useSuspense
				>
					<Stack.Navigator
						initialRouteName="Home"
						screenOptions={{ headerShown: false }}
					>
						<Stack.Screen name="Home" component={HomeScreen} />
						<Stack.Screen
							name="MainController"
							component={MainController}
							initialParams={{ layoutCor: { def: { px: 0, py: 0 } } }}
						/>
						<Stack.Screen name="EditingLayout" component={EditingLayout} />
					</Stack.Navigator>
				</SQLiteProvider>
			</Suspense>
		</GestureHandlerRootView>
	);
}

const Tab = createBottomTabNavigator();

function getTabBarStyle(route): ViewStyle | undefined {
	const routeName = getFocusedRouteNameFromRoute(route) ?? "Home";
	if (routeName === "MainController" || routeName === "EditingLayout") {
		return { display: "none" } as ViewStyle;
	}
	return undefined;
}

export default function App() {
	return (
		<NavigationContainer>
			<Tab.Navigator screenOptions={{ headerShown: false }}>
				<Tab.Screen
					name="mainHome"
					component={ProjectStack}
					options={({ route }) => ({
						tabBarLabel: "Home",
						tabBarStyle: getTabBarStyle(route),
					})}
				></Tab.Screen>
				<Tab.Screen
					name="Setting"
					component={SettingsScreen}
					options={{ tabBarLabel: "Setting" }}
				></Tab.Screen>
			</Tab.Navigator>
		</NavigationContainer>
	);
}
