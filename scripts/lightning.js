var canvas = $('canvas')[0];

if (canvas.getContext) {
    var ctx = canvas.getContext('2d'),
        w = canvas.width,
        h = canvas.height
        x1 = 70,  // x-coordinate of first circle
        y1 = 75,  // y-coordinate of first circle
        x2 = 145, // x-coordinate of second circle
        y2 = y1;  // y-coordinate of second circle

    function init () {
        setInterval(draw, 100);
    }

    function frameBuffer () {
        var buffer = document.createElement('canvas');

        buffer.width = canvas.width;
        buffer.height = canvas.height;

        var bufferContext = buffer.getContext('2d');

        var radgrad = bufferContext.createRadialGradient(x1, y1, 50, x1, y1, 40);
        var radgrad2 = bufferContext.createRadialGradient(x2, y2, 145, 50, y2, 40);

        bufferContext.fillStyle = "rgba(0,0,0,1)";
        bufferContext.fillRect(0, 0, w, h);
        bufferContext.save();
        bufferContext.globalCompositeOperation = "destination-out";

        // add ellipses
        bufferContext.beginPath();
        bufferContext.arc(x1, y1, 50, 0, Math.PI * 2, true);
        bufferContext.arc(x2, y2, 50, 0, Math.PI * 2, true);
        bufferContext.shadowBlur = 20;
        bufferContext.shadowColor = "black";

        radgrad.addColorStop(0, "rgba(0,0,0,0.1)");
        radgrad.addColorStop(0.2, "rgba(0, 0, 0, " + (Math.random() + 0.2) + ")");
        radgrad.addColorStop(0.8, "rgba(0,0,0," + (Math.random() + 0.8) + ")");
        radgrad.addColorStop(1, "rgba(0,0,0,1)");
         
        radgrad2.addColorStop(0, "rgba(0,0,0,0.1)");
        radgrad2.addColorStop(0.2, "rgba(0, 0, 0, " + (Math.random() + 0.2) + ")");
        radgrad2.addColorStop(0.8, "rgba(0,0,0," + (Math.random() + 0.8) + ")");
        radgrad2.addColorStop(1, "rgba(0,0,0,1)");

        bufferContext.fillStyle = radgrad;
        bufferContext.fill();
        bufferContext.fillStyle = radgrad2;
        bufferContext.fill();
        bufferContext.restore();

        return buffer;
    }

    function draw () {
        var buffer = frameBuffer();

        ctx.clearRect(0, 0, w, h);
        ctx.drawImage(buffer, 0, 0);
    }

    init();
}