{
	let active;
	let events = {
		keyboard: [],
		mouse: []
	};
	let canvas = document.getElementById('canvas');
	const keys = {
		'space': 32,
		'w': 87,
		'a': 65,
		's': 83,
		'd': 68,
		'e': 69,
		'f': 70,
		'c': 67,
		'0': 48,
		'1': 49,
		'2': 50,
		'3': 51,
		'4': 52,
		'5': 53,
		'6': 54,
		'7': 55,
		'8': 56,
		'9': 57,
	};
	
	document.addEventListener('keyup', (event) => {
		if(active){
			events.keyboard.push({
				type: event.type,
				key: event.key,
				keyCode: event.keyCode,
				metaKey: event.metaKey,
				code: event.code,
				which: event.which,
				target: event.target,
				shiftKey: event.shiftKey,
			});
		}
	});
	document.addEventListener('keydown', (event) => {
		if(active){
			events.keyboard.push({
				type: event.type,
				key: event.key,
				keyCode: event.keyCode,
				metaKey: event.metaKey,
				code: event.code,
				which: event.which,
				target: event.target,
				shiftKey: event.shiftKey,
			});
		}
	});

	document.addEventListener('mouseup', (event) => {
		if(active){
			events.mouse.push({
				type: event.type,
				clientX: event.clientX,
				clientY: event.clientY,
				button: event.button,
				target: event.target,
				mozPressure: event.mozPressure,
			});
		}
	});
	document.addEventListener('mousedown', (event) => {
		if(active){
			events.mouse.push({
				type: event.type,
				clientX: event.clientX,
				clientY: event.clientY,
				button: event.button,
				target: event.target,
				mozPressure: event.mozPressure,
			});
		}
	});
	document.addEventListener('mousemove', (event) => {
		if(active){
			events.mouse.push({
				type: event.type,
				clientX: event.clientX,
				clientY: event.clientY,
				button: event.button,
				target: event.target,
				mozPressure: event.mozPressure,
			});
		}
	});

	const update = () => {
		active = document.hasFocus();
		
		if(active) {
			localStorage.setItem('events', JSON.stringify(events));
			events = {
				keyboard: [],
				mouse: []
			};
		}
		else {
			events = JSON.parse(localStorage.getItem('events'));
			
			for(let event of events.keyboard){
				if(event.shiftKey){
					setTimeout(update, 10);
					return;
				}
				
				//event = new KeyboardEvent(event.type, event);
				e = document.createEvent("Event");
				e.initEvent(event.type, true, true);
				e.keyCode = event.keyCode;
				canvas.dispatchEvent(e);
			}
			
			for(let event of events.mouse){
				event = new MouseEvent(event.type, event);
				canvas.dispatchEvent(event);
			}
		}
		
		setTimeout(update, 10);
	};
	
	setTimeout(update, 10);
	console.log('Running repeater!');
}
