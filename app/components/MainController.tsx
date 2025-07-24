import { View, StyleSheet } from "react-native";
import { ButtonCordinates } from "../Editing_layout";
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

type Props = NativeStackScreenProps<RootStackParamList, "MainController">;

export function MainController({ route }: Props) {
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
									x={layoutCor[name].px}
									y={layoutCor[name].py}
								></Joystick>
							);
						}
						if (name === "A" || name === "B" || name === "Y" || name === "X") {
							return (
								<ABXYButton
									name={name}
									x={layoutCor[name].px}
									y={layoutCor[name].py}
								></ABXYButton>
							);
						}
						if (name === "D_LEFT") {
							return (
								<DpadsButton x={layoutCor[name].px} y={layoutCor[name].py}>
									<ChevronLeft />
								</DpadsButton>
							);
						}
						if (name === "D_RIGHT") {
							return (
								<DpadsButton x={layoutCor[name].px} y={layoutCor[name].py}>
									<ChevronRight />
								</DpadsButton>
							);
						}
						if (name === "D_UP") {
							return (
								<DpadsButton x={layoutCor[name].px} y={layoutCor[name].py}>
									<ChevronUp />
								</DpadsButton>
							);
						}
						if (name === "D_DOWN") {
							return (
								<DpadsButton x={layoutCor[name].px} y={layoutCor[name].py}>
									<ChevronDown />
								</DpadsButton>
							);
						}
						return (
							<RestButton
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
