export default class UtilService {
	static getRandomColor(colors){
		var color = 'BLUE_NAVY';
		
		if(typeof colors != 'undefined'){
			var randomIndex = this.randomIntFromInterval(0, colors.length - 1);
			color = colors[randomIndex].name;
		}
		return color;
	}

	static getRandomIcon(icons){
		var icon = 'SMILE';

		if(typeof icons != 'undefined'){
			var randomIndex = this.randomIntFromInterval(0, icons.length - 1);
			icon = icons[randomIndex].name;
		}
		return icon;
	}
	
	static randomIntFromInterval(min,max){
	    return Math.floor(Math.random()*(max-min+1)+min);
	}
}