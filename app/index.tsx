import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import * as ScreenOrientation from "expo-screen-orientation";
import SelectList from "./components/SelectView";
import { xboxButtons } from "./xboxButtonsRegistry";

const App = () => {
	React.useEffect(() => {
		const lock = async () => {
			await ScreenOrientation.lockAsync(
				ScreenOrientation.OrientationLock.LANDSCAPE,
			);
		};

		lock().catch(console.error);

		// (Optional) return a cleanup function if needed:
		// return () => { /* cleanup resources here */ };
	}, []);
	const [visibleModal, setVisibleModal] = React.useState(false);
	const [visibleButtons, setVisibleButtons] = React.useState<string[]>([]);
	const addButton = (name: string) => {
		if (!visibleButtons.includes(name)) {
			setVisibleButtons([...visibleButtons, name]);
		}
		setVisibleModal(false);
	};

	return (
		<SafeAreaProvider>
			<SafeAreaView style={styles.container}>
				{visibleButtons.map((name) => {
                    //@ts-expect-error
					const ComponentToRender = xboxButtons[name];
					if (ComponentToRender) {
						// Pass props to your dynamically rendered components if needed
						return <ComponentToRender key={name} />;
					}
				})}
				<TouchableOpacity
					style={styles.button}
					onPress={() => setVisibleModal(true)}
				></TouchableOpacity>
				<SelectList
					modalVisible={visibleModal}
					setModalVisible={setVisibleModal}
                    addButtons={addButton}
				/>
			</SafeAreaView>
		</SafeAreaProvider>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
        backgroundColor: "#171C1F"
	},
	titleText: {
		fontSize: 14,
		lineHeight: 24,
		fontWeight: "bold",
	},
	box: {
		height: 150,
		width: 150,
		borderColor: "red",
		borderRadius: 100,
		borderWidth: 2,
	},
	button: {
		position: "absolute",
		bottom: 20,
		right: 20,
		width: 60,
		height: 60,
		backgroundColor: "blue",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 30,
	},
});

export default App;
