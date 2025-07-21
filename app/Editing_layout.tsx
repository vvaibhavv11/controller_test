import React from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import * as ScreenOrientation from "expo-screen-orientation";
import SelectList from "./components/SelectView";
import { xboxButtons } from "./xboxButtonsRegistry";
import Draggable from "./components/Draggable";

type ButtonCordinates = {
	[name: string]: {
		px: number;
		py: number;
	};
};

export default function EditingLayout() {
	const itemRefs = React.useRef<{ [key: string]: View | null }>({});
	const [buttonCor, setButtonCor] = React.useState<ButtonCordinates>();
    React.useEffect(() => {
        const lock = async () => {
            await ScreenOrientation.lockAsync(
                ScreenOrientation.OrientationLock.LANDSCAPE,
            );
        };

        lock().catch(console.error);
        console.log("Updated buttonCor:", buttonCor);

        // (Optional) return a cleanup function if needed:
        // return () => { /* cleanup resources here */ };
    }, [buttonCor]);
	const [visibleModal, setVisibleModal] = React.useState(false);
	const [visibleButtons, setVisibleButtons] = React.useState<string[]>([]);
	const addButton = (name: string) => {
		if (!visibleButtons.includes(name)) {
			setVisibleButtons([...visibleButtons, name]);
		}
		setVisibleModal(false);
	};
	const measurePosition = (name: string) => {
		const view = itemRefs.current[name];
		if (view?.measure) {
			view.measure((x, y, width, height, px, py) => {
				console.log(name, { px, py });

				// Always set or update the coordinate
				setButtonCor((prev) => ({
					...prev,
					[name]: { px, py },
				}));
			});
		}
	};
	return (
		<SafeAreaProvider>
			<SafeAreaView style={styles.container}>
				{visibleButtons.map((name) => {
					if (name) {
						if (name === "L_Joystick" || name === "R_Joystick") {
							return (
								<Draggable key={name} onChange={() => measurePosition(name)}>
									<View
										style={styles.buttonOuterJoystick}
										ref={(r) => {
											itemRefs.current[name] = r;
										}}
									>
										<View style={styles.buttonInnerJoystick}></View>
									</View>
								</Draggable>
							);
						} else {
							return (
								<Draggable key={name} onChange={() => measurePosition(name)}>
									<View
										style={styles.draggable_button}
										ref={(r) => {
											itemRefs.current[name] = r;
										}}
									>
										<Text style={styles.draggable_text}>{name}</Text>
									</View>
								</Draggable>
							);
						}
					}
				})}
				<TouchableOpacity
					style={styles.addButton}
					onPress={() => setVisibleModal(true)}
				>
					<Text style={styles.addButtonText}>+</Text>
				</TouchableOpacity>
				<SelectList
					modalVisible={visibleModal}
					setModalVisible={setVisibleModal}
					addButtons={addButton}
				/>
			</SafeAreaView>
		</SafeAreaProvider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#171C1F",
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
	draggable_button: {
		height: 70,
		width: 75,
		backgroundColor: "#014442",
		borderRadius: 100,
		borderWidth: 4,
		borderColor: "#2C3A1C",
		justifyContent: "center",
		alignItems: "center",
	},
	draggable_text: {
		color: "#ffffff",
	},
	buttonOuterJoystick: {
		height: 100,
		width: 100,
		opacity: 100,
		borderRadius: 100,
		borderWidth: 4,
		borderColor: "#2C3A1C",
		justifyContent: "center",
		alignItems: "center",
	},
	buttonInnerJoystick: {
		height: 50,
		width: 50,
		backgroundColor: "#014442",
		borderRadius: 100,
		borderWidth: 4,
		borderColor: "#2C3A1C",
		justifyContent: "center",
		alignItems: "center",
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
