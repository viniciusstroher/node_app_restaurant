const debugable = true

export default class Logger{

	static log(msg){
		if(debugable){
			const now = new Date();
			console.log(`[${now.toLocaleDateString()} ${now.toLocaleTimeString()}] `+msg)
		}
	}
	
};
