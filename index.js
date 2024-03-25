;(() => {
	const cnv = document.querySelector('canvas')
	const ctx = cnv.getContext('2d')
	function init() {
		cnv.width = innerWidth
		cnv.height = innerHeight
	}
	init()
	const namberOfRings = 10
	const ringRadiusOffset = 35
	const RingRadius = 100
	const waveOffset = 15
	const colors = ['#771122', '#bb1122', '#ff1122']
	let startAngle = 0
	function updateRings() {
		for (let i = 0; i < namberOfRings; i++) {
			let radius = i * ringRadiusOffset + RingRadius
			let offsetAngles = (i * waveOffset * Math.PI) / 180
			drawRing(radius, colors[i], offsetAngles)
		}
		startAngle >= 360 ? (startAngle = 0) : startAngle++
	}
	centerX = cnv.width / 2
	centerY = cnv.height / 2
	const MaxWaveAmplitude = 17
	const NamberOfWaves = 7
	function drawRing(radius, colors, offsetangles) {
		ctx.strokeStyle = colors
		ctx.lineWidth = 9
		ctx.beginPath()
		for (let j = -180; j < 180; j++) {
			let currentAngle = ((j + startAngle) * Math.PI) / 180
			let displacment = 0
			let now = Math.abs(j)
			if (now > 70) {
				displacment = (now - 70) / 70
			}
			if (displacment >= 1) {
				displacment = 1
			}
			let waveAmplitude =
				radius +
				displacment *
					Math.sin((currentAngle + offsetangles) * NamberOfWaves) *
					MaxWaveAmplitude
			let x = centerX + Math.cos(currentAngle) * waveAmplitude
			let y = centerY + Math.sin(currentAngle) * waveAmplitude
			j > -180 ? ctx.lineTo(x, y) : ctx.moveTo(x, y)
			ctx.lineTo(x, y)
		}
		ctx.closePath()
		ctx.stroke()
	}
	function loop() {
		ctx.clearRect(0, 0, cnv.width, cnv.height)
		updateRings()
		requestAnimationFrame(loop)
	}
	loop()
	window.addEventListener('resize', init)
})()
