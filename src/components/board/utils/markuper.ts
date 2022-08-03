import { onMounted, ref, computed } from "vue";

export const markuper = () => {
  const pointsData = ref({});
  const polygon = ref();
  let canvas: any = null;
  let ctx: any = null;
  const img = new Image();
  const differenceInterval = 10;

  const undo = () => {
    polygon.value.points.splice(-1);
  };

  const isOutside = (event: any) => {
    return !(canvas == event.target || canvas.contains(event.target));
  };

  const setImage = (imgSource: any) => {
    if (!imgSource) return;
    //const ctx2 = canvas.getContext("2d");
    //let img = new Image();
    img.crossOrigin = "";
    img.onload = () => {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
    img.src = imgSource;
  };

  const closePath = () => {
    ctx.beginPath();
    ctx.closePath();
  };

  const setMarks = () => {
    requestAnimationFrame(update);
    const mouse: any = {
      x: 0,
      y: 0,
      button: 0,
      lx: 0,
      ly: 0,
      update: true,
      outside: null,
    };
    function mouseEvents(e: any) {
      const bounds = canvas.getBoundingClientRect();
      mouse.x = e.pageX - bounds.left - scrollX;
      mouse.y = e.pageY - bounds.top - scrollY;
      mouse.button =
        e.type === "mousedown"
          ? true
          : e.type === "mouseup"
          ? false
          : mouse.button;
      mouse.update = true;
      mouse.outside = isOutside(e);
    }
    ["mousedown", "mouseup", "mousemove"].forEach((name) =>
      document.addEventListener(name, mouseEvents)
    );
    ctx.lineWidth = 2;
    ctx.strokeStyle = "blue";
    const point = (x: any, y: any) => ({ x, y });
    const poly: any = () => ({
      points: [] as any,
      addPoint(p: any) {
        !mouse.outside ? this.points.push(point(p.x, p.y)) : null;
      },
      draw() {
        ctx.lineWidth = 2;
        ctx.strokeStyle = "blue";
        ctx.beginPath();

        for (const p of this.points) {
          ctx.lineTo(p.x, p.y);
        }

        if (this.points.length > 1) {
          const firstPointX = Math.round(this.points[0].x);
          const firstPointY = Math.round(this.points[0].y);
          const lastPointX = Math.round(this.points[this.points.length - 1].x);
          const lastPointY = Math.round(this.points[this.points.length - 1].y);
          const differenceX = firstPointX - lastPointX;
          const differenceY = firstPointY - lastPointY;

          if (
            differenceX >= -differenceInterval &&
            differenceX <= differenceInterval &&
            differenceY >= -differenceInterval &&
            differenceY <= differenceInterval
          ) {
            ctx.closePath();
            this.points[this.points.length - 1] = this.points[0];
          }
        }
        for (const p of this.points) {
          ctx.moveTo(p.x + 4, p.y);
          ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
        }
        ctx.stroke();
      },
      closest(pos: any, dist = 8) {
        var i = 0,
          index = -1;
        dist *= dist;
        for (const p of this.points) {
          var x = pos.x - p.x;
          var y = pos.y - p.y;
          var d2 = x * x + y * y;
          if (d2 < dist) {
            dist = d2;
            index = i;
          }
          i++;
        }
        if (index > -1) {
          return this.points[index];
        }
      },
    });
    function drawCircle(pos: any, color = "red", size = 8) {
      ctx.strokeStyle = color;
      ctx.beginPath();
      ctx.arc(pos.x, pos.y, size, 0, Math.PI * 2);
      ctx.stroke();
    }
    polygon.value = poly();
    var activePoint: any, cursor;
    var dragging = false;
    function update() {
      if (mouse.update) {
        cursor = "crosshair";
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        if (!dragging) {
          activePoint = polygon.value.closest(mouse);
        }
        if (activePoint === undefined && mouse.button) {
          polygon.value.addPoint(mouse);
          mouse.button = false;
        } else if (activePoint) {
          if (mouse.button) {
            if (dragging) {
              activePoint.x += mouse.x - mouse.lx;
              activePoint.y += mouse.y - mouse.ly;
            } else {
              dragging = true;
            }
          } else {
            dragging = false;
          }
        }
        polygon.value.draw();
        if (activePoint) {
          drawCircle(activePoint);
          cursor = "move";
        }

        mouse.lx = mouse.x;
        mouse.ly = mouse.y;
        canvas.style.cursor = cursor;
        mouse.update = false;
        pointsData.value = [...polygon.value.points];
      }
      requestAnimationFrame(update);
    }
  };

  onMounted(() => {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    //setMarks(canvas, ctx)
  });

  return {
    undo,
    pointsData,
    setMarks,
    setImage,
    closePath,
  };
};
