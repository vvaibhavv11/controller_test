import React from "react";
import {
	View,
	Text,
	TouchableOpacity,
	Modal,
	FlatList,
	StyleSheet,
} from "react-native";
import { xboxButtonsNames } from "../xboxButtonsRegistry";

type SelectListProp = {
	modalVisible: boolean;
	setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
	addButtons: (name: string) => void;
};

export default function SelectList(prop: SelectListProp) {
	// const [selected, setSelected] = useState<string | null>(null);

	const onSelect = (item: string) => {
		prop.addButtons(item);
		// setSelected(item.label);
		prop.setModalVisible(false);
	};

	return (
		<Modal
			visible={prop.modalVisible}
			animationType="slide"
			transparent
			onRequestClose={() => prop.setModalVisible(false)}
		>
			<View style={styles.overlay}>
				<View style={styles.modalContent}>
					<FlatList
						data={xboxButtonsNames}
						keyExtractor={item => item}
						renderItem={({ item }) => (
							<TouchableOpacity
								style={styles.item}
								onPress={() => onSelect(item)}
							>
								<Text style={styles.itemText}>{item}</Text>
							</TouchableOpacity>
						)}
					/>
					<TouchableOpacity
						onPress={() => prop.setModalVisible(false)}
						style={styles.closeBtn}
					>
						<Text style={styles.closeText}>Cancel</Text>
					</TouchableOpacity>
				</View>
			</View>
		</Modal>
	);
}

const styles = StyleSheet.create({
	// container: { flex: 1, padding: 20, justifyContent: "center" },
	// button: { backgroundColor: "#007AFF", padding: 15, borderRadius: 8 },
	buttonText: { color: "white", fontSize: 16, textAlign: "center" },
	overlay: {
		flex: 1,
		backgroundColor: "rgba(0,0,0,0.5)",
		justifyContent: "center",
	},
	modalContent: {
		backgroundColor: "white",
		margin: 20,
		borderRadius: 8,
		maxHeight: "60%",
	},
	item: { padding: 15, borderBottomColor: "#eee", borderBottomWidth: 1 },
	itemText: { fontSize: 16 },
	closeBtn: { padding: 15, alignItems: "center" },
	closeText: { color: "#007AFF", fontSize: 16 },
	selected: { marginTop: 20, fontSize: 16, color: "#333" },
});
