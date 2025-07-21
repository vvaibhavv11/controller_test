export const xboxButtons = {
    L_Joystick: "L_Joystick",
    R_Joystick: "R_Joystick",
	A: "A",
	B: "B",
	X: "X",
	Y: "Y",
	LB: "LB",
	LT: "LT",
	RB: "RB",
	RT: "RT",
	START: "START",
	BACK: "BACK",
} as const;

export const xboxButtonsNames = Object.keys(xboxButtons);
