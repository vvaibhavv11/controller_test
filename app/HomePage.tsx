import React from "react";
import {
	FlatList,
	Text,
	TouchableOpacity,
	View,
	StyleSheet,
} from "react-native";
import * as ScreenOrientation from "expo-screen-orientation";
import { useNavigation } from "@react-navigation/native";
import { drizzle, useLiveQuery } from "drizzle-orm/expo-sqlite";
import { useSQLiteContext } from "expo-sqlite";
import * as schema from "@/db/schema";
import { db, expoDb } from "./App";

export default function HomeScreen() {
	// const db = drizzle(useSQLiteContext(), { schema });
	// const db = drizzle(expoDb);
	const { data: listState } = useLiveQuery(db.select().from(schema.layouts));
	const navigation = useNavigation();
	const lock = async () => {
		await ScreenOrientation.lockAsync(
			ScreenOrientation.OrientationLock.PORTRAIT,
		);
	};
	lock().catch(console.error);
	return (
		<View style={styles.container}>
			<FlatList
				data={listState}
				keyExtractor={(item) => String(item.id)}
				renderItem={({ item }) => (
					<TouchableOpacity
						style={styles.item}
						onPress={() =>
							navigation.navigate("MainController", {
								layoutCor: JSON.parse(item.layoutSchema),
							})
						}
					>
						<Text style={styles.text}>{item.name}</Text>
					</TouchableOpacity>
				)}
			/>
			<TouchableOpacity
				style={styles.addButton}
				onPress={() => navigation.navigate("EditingLayout")}
			>
				<Text style={styles.addButtonText}>+</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1, paddingTop: 40 },
	item: {
		padding: 20,
		borderBottomWidth: 1,
		borderColor: "#ccc",
	},
	text: {
		fontSize: 18,
	},
	addButton: {
		position: "absolute",
		bottom: 20,
		right: 20,
		width: 56,
		height: 56,
		borderRadius: 28,
		backgroundColor: "#007AFF",
		justifyContent: "center",
		alignItems: "center",
		elevation: 5, // Android shadow
		shadowColor: "#000", // iOS shadow
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
	},
	addButtonText: {
		color: "white",
		fontSize: 24,
		fontWeight: "bold",
	},
});
