package net.evrem.webapp.enums;

import java.util.Random;

public enum Color {

	GREEN_FOREST("00857a"), RED_SIMPLE("e6212d"), BLUE_NAVY("185287"), RED_ABRIT("cf1332"), BLUE_NAVY2("192b44"), BLUE_NAVYL("2e4868"), YELLOW_SUN("f6bf23"), RED_ORANGEE(
			"ec2c20"), BLUE_TOGREEN("0e596b"), GREEN_LIGHTEEN("379986"), RED_LIGHTORANGE("e85543"), YELLOW_SHARPORANGE("ff9111"), BLUE_SKY("0494b9"), PURPLE_MAGENTA(
			"43022a"), PURPLE_BASIC("442c66"), RED_BRICK("871616"), BROWN_DARK("170606"), ORANGE_DAWN("c93800"), PURPLE_DREAM("c02942"), PURPLE_PASTEL("542437"), GREEN_LIGHT(
			"4fc413"), GREEN_LIME("88C425"), GREEN_GREEN("519548"), RED_BLOOD("ca0700"), BLUE_LIGHT("2274A5");

	private String hexColor;

	private Color(String hexColor) {
		this.hexColor = hexColor;
	}

	public String getHexColor() {
		return hexColor;
	}

	public String getColorWithHash() {
		return "#" + hexColor;
	}

	public static Color getRandomColor() {
		Random rand = new Random();
		int randomNum = rand.nextInt(Color.values().length);
		return Color.values()[randomNum];
	}

}
