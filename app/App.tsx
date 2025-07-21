import React, { Suspense } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EditingLayout from "./Editing_layout";
import HomeScreen from "./HomePage";
import { ActivityIndicator } from "react-native";
import { openDatabaseSync, SQLiteProvider } from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import migration from "@/drizzle/migrations";

export type RootStackParamList = {
	Home: undefined;
	EditingLayout: undefined;
};

const Stack = createNativeStackNavigator();
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
						<Stack.Screen name="EditingLayout" component={EditingLayout} />
					</Stack.Navigator>
				</NavigationContainer>
			</SQLiteProvider>
		</Suspense>
	);
}
