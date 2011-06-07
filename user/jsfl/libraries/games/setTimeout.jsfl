function Animator()
{
	
	// --------------------------------------------------------------------------------
	// main animation function
	
		function onEnterFrame()
		{
			var elements = fl.getDocumentDOM().getTimeline().layers[0].frames[0].elements;
			for (var i = elements.length - 1; i >= 0; i--)
			{
				if( ! this.check(elements[i]))
				{
					this.move(elements[i]);
				}
			}
		}
		
	// --------------------------------------------------------------------------------
	// process functions
	
		function check(element)
		{
			if(element instanceof Shape)
			{
				document.selection = [element];
				var fill = '#' + (Math.floor(Math.random() * 255 * 255 * 255)).toString(16);
				document.setFillColor(fill);
				document.selection = [element];
				document.convertToSymbol('graphic', '', 'center')
				document.selection = [];
				return true;
			}
			return false
		}
		
		function move(obj)
		{
			var vx		= obj.getPersistentData('vx') != 0 ? obj.getPersistentData('vx') : (Math.random() * 20) - 10;
			var vy		= obj.getPersistentData('vy') || 0;
			
			vx			+= vx > 0 ? ax : -ax;
			vy			+= ay;
			
			obj.x		+= vx;
			obj.y		+= vy;
		
			if(obj.y > height)
			{
				vy		= -vy;
				obj.y	-= ay;
			}
			if(obj.x < 0 || obj.x > width)
			{
				vx		= -vx;
				obj.x	-= ax;
			}
		
			obj.setPersistentData('vx', 'double', vx)
			obj.setPersistentData('vy', 'double', vy)
			
			obj.rotation += ar;
		}
		
	// --------------------------------------------------------------------------------
	// code
	
		/** @type {Element} */
		var dom			= fl.getDocumentDOM();
		
		var height		= dom.height;
		var width		= dom.width;
		
		var ax			= 0;
		var ay			= 1;
		var ar			= Math.random() * 10;
		
		dom.selectAll();
		var sel = dom.selection;
		

	
}

FLBridge.animator = new Animator();