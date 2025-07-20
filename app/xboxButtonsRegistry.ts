import { A_button } from "./components/A_button";
import { B_button } from "./components/B_button";
import { BACK_button } from "./components/BACK_button";
import { L_Joystick } from "./components/L_Joystick";
import { LB_button } from "./components/LB_button";
import { LT_button } from "./components/LT_button";
import { RB_button } from "./components/RB_button";
import { RT_button } from "./components/RT_button";
import { START_button } from "./components/START_button";
import { X_button } from "./components/X_button";
import { Y_button } from "./components/Y_button";

export const xboxButtons = {
    L_Joystick: L_Joystick,
	A: A_button,
	B: B_button,
	X: X_button,
	Y: Y_button,
	LB: LB_button,
	LT: LT_button,
	RB: RB_button,
	RT: RT_button,
	START: START_button,
	BACK: BACK_button,
};

export const xboxButtonsNames = Object.keys(xboxButtons);
