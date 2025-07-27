import { StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Joystick } from "./Joystick";
import { ABXYButton } from "./ABXYButton";
import { DpadsButton } from "./DpadsButton";
import {
	ChevronLeft,
	ChevronUp,
	ChevronRight,
	ChevronDown,
} from "lucide-react-native";
import { RestButton } from "./RestButton";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../App";
import React from "react";
import * as ScreenOrientation from "expo-screen-orientation";

type Props = NativeStackScreenProps<RootStackParamList, "MainController">;

export function MainController({ route }: Props) {
	React.useEffect(() => {
		const lock = async () => {
			await ScreenOrientation.lockAsync(
				ScreenOrientation.OrientationLock.LANDSCAPE,
			);
		};

		lock().catch(console.error);
	}, []);
	const { layoutCor } = route.params;

	const buttonNames = Object.keys(layoutCor);
	return (
		<SafeAreaProvider>
			<SafeAreaView style={styles.container}>
				{buttonNames.map((name) => {
					if (name) {
						if (name === "L_Joystick" || name === "R_Joystick") {
							return (
								<Joystick
									key={name}
									x={layoutCor[name].px}
									y={layoutCor[name].py}
								></Joystick>
							);
						}
						if (name === "A" || name === "B" || name === "Y" || name === "X") {
							return (
								<ABXYButton
									key={name}
									name={name}
									x={layoutCor[name].px}
									y={layoutCor[name].py}
								></ABXYButton>
							);
						}
						if (name === "D_LEFT") {
							return (
								<DpadsButton
									key={name}
									x={layoutCor[name].px}
									y={layoutCor[name].py}
									name={name}
								>
									<ChevronLeft />
								</DpadsButton>
							);
						}
						if (name === "D_RIGHT") {
							return (
								<DpadsButton
									key={name}
									x={layoutCor[name].px}
									y={layoutCor[name].py}
									name={name}
								>
									<ChevronRight />
								</DpadsButton>
							);
						}
						if (name === "D_UP") {
							return (
								<DpadsButton
									key={name}
									x={layoutCor[name].px}
									y={layoutCor[name].py}
									name={name}
								>
									<ChevronUp />
								</DpadsButton>
							);
						}
						if (name === "D_DOWN") {
							return (
								<DpadsButton
									key={name}
									x={layoutCor[name].px}
									y={layoutCor[name].py}
									name={name}
								>
									<ChevronDown />
								</DpadsButton>
							);
						}
						return (
							<RestButton
								key={name}
								name={name}
								x={layoutCor[name].px}
								y={layoutCor[name].py}
							></RestButton>
						);
					}
				})}
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
});
