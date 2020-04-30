# The main canvas and context.
canvas  = document.getElementById "canvas"
context = canvas.getContext "2d"

# The size and scale of the canvas. The size will get set via setCanvasSize to match the size of
# the window. Change the scale to get a more or less pixel-y effect.
width  = 0.0
height = 0.0
scale  = 1.0

# The frames per second of the simulation. We also keep track of the time the previous frame
# occurred so that we know the duration between each frame.
fps       = 45.0
lastFrame = (new Date).getTime()

# The screen will flash briefly when the flash opacity is set. The opacity will dissipate quickly
# over time.
flashOpacity = 0.0

# When a bolt appears, it will be drawn at full opacity for the flash duration, and then will fade
# out gradually over the fade duration.
boltFlashDuration = 0.25
boltFadeDuration  = 0.5
totalBoltDuration = boltFlashDuration + boltFadeDuration

# The list of bolts. A bolt will get added to this list on creation, and then will be automatically
# removed after it's done fading out.
bolts = []

# Sets the size of the canvas and each bolt canvas.
setCanvasSize = ->
	canvas.setAttribute "width",  window.innerWidth
	canvas.setAttribute "height", window.innerHeight
	
	for bolt in bolts
		bolt.canvas.width  = window.innerWidth
		bolt.canvas.height = window.innerHeight
	
	width  = Math.ceil window.innerWidth  / scale
	height = Math.ceil window.innerHeight / scale

# Launch a bolt!!!
launchBolt = (x, y, length, direction) ->
	# Set the flash opacity.
	flashOpacity = 0.15 + Math.random() * 0.2
	
	# Create the bolt canvas.
	boltCanvas        = document.createElement "canvas"
	boltCanvas.width  = window.innerWidth
	boltCanvas.height = window.innerHeight
	boltContext       = boltCanvas.getContext "2d"
	boltContext.scale scale, scale
	
	# Add the bolt to the list.
	bolts.push { canvas: boltCanvas, duration: 0.0 }
	
	# Launch it!!
	recursiveLaunchBolt x, y, length, direction, boltContext

# Recursive bolt action.
recursiveLaunchBolt = (x, y, length, direction, boltContext) ->
	originalDirection = direction
	
	# We draw the bolt incrementally to get a nice animated effect.
	boltInterval = setInterval (->
		if length <= 0
			clearInterval boltInterval
			return
		
		i = 0
		while i++ < Math.floor(45 / scale) and length > 0
			x1 = Math.floor x
			y1 = Math.floor y
			x += Math.cos direction
			y -= Math.sin direction
			length--
			
			if x1 != Math.floor(x) or y1 != Math.floor(y)
				alpha                 = Math.min 1.0, length / 350.0
				boltContext.fillStyle = "rgba(255, 255, 255, #{alpha})"
				boltContext.fillRect x1, y1, 1.0, 1.0
				
				direction = originalDirection + (-Math.PI / 8.0 + Math.random() * (Math.PI / 4.0))
				
				if Math.random() > 0.98
					recursiveLaunchBolt x1, y1, length * (0.3 + Math.random() * 0.4), originalDirection + (-Math.PI / 6.0 + Math.random() * (Math.PI / 3.0)), boltContext
				else if Math.random() > 0.95
					recursiveLaunchBolt x1, y1, length, originalDirection + (-Math.PI / 6.0 + Math.random() * (Math.PI / 3.0)), boltContext
					length = 0
		
		undefined
	), 10

# This will get fired at a constant framerate.
tick = ->
	# Keep track of the frame time.
	frame     = (new Date).getTime()
	elapsed   = (frame - lastFrame) / 1000.0
	lastFrame = frame
	
	# Clear the canvas.
	context.clearRect 0.0, 0.0, window.innerWidth, window.innerHeight
	
	# Fire a bolt every once in a while.
	if Math.random() > 0.98
		x      = Math.floor -10.0 + Math.random() * (width + 20.0)
		y      = Math.floor 5.0 + Math.random() * (height / 3.0)
		length = Math.floor height / 2.0 + Math.random() * (height / 3.0)
		
		launchBolt x, y, length, Math.PI * 3.0 / 2.0
	
	# Draw the flash.
	if flashOpacity > 0.0
		context.fillStyle = "rgba(255, 255, 255, #{flashOpacity})"
		context.fillRect 0.0, 0.0, window.innerWidth, window.innerHeight
		flashOpacity = Math.max 0.0, flashOpacity - 2.0 * elapsed
	
	# Draw each bolt.
	for bolt, i in bolts
		bolt.duration += elapsed
		
		if bolt.duration >= totalBoltDuration
			bolts.splice i, 1
			i--
			return
		
		context.globalAlpha = Math.max 0.0, Math.min(1.0, (totalBoltDuration - bolt.duration) / boltFadeDuration)
		context.drawImage bolt.canvas, 0.0, 0.0
	
	undefined

# Start it up!!!
window.addEventListener "resize", setCanvasSize
setCanvasSize()
setInterval tick, 1000.0 / fps
