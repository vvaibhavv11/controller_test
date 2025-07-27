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

export default function App() {
	const expoDb = openDatabaseSync(DATABASE_NAME);
	const db = drizzle(expoDb);
	const { success, error } = useMigrations(db, migration);
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<Suspense fallback={<ActivityIndicator size={"large"} />}>
				<SQLiteProvider
					databaseName={DATABASE_NAME}
					options={{ enableChangeListener: true }}
					useSuspense
				>
					<NavigationContainer>
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
					</NavigationContainer>
				</SQLiteProvider>
			</Suspense>
		</GestureHandlerRootView>
	);
}
