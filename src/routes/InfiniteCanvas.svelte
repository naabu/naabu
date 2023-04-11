<script>
  import { Canvas, Layer, t } from "svelte-canvas";

  let offsetX = 0;
  let offsetY = 0;
  let zoom = 1;
  let maxZoom = 5;
  let minZoom = 0.0;
  let zoomStep = 0.05;
  const gridSize = 5;
  let isDragging = false;
  let dragStartX, dragStartY;
  let imageURI;
  let svelteCanvas;
  $: draw = ({ context, width, height }) => {
    context.clearRect(0, 0, width, height);

    context.save();
    context.translate(offsetX, offsetY);
    context.scale(zoom, zoom);

    const gridSpace = gridSize;
    let radius = (gridSpace / 16) * zoom/2;
    const numCols = Math.ceil(width / gridSpace / zoom);
    const numRows = Math.ceil(height / gridSpace / zoom);
    const numColsOffset = Math.ceil(offsetX / (gridSpace * zoom));
    const numRowsOffset = Math.ceil(offsetY / (gridSpace * zoom));
    if (radius > 0.5) {
      radius = 0.5;
    }
    else if (radius > 0.1 && radius < 0.5) {
      radius = 0.4;
    }
    else if (radius < 0.1) {
      radius = 0.1;
    }

    // Only show grid if zoom is not too far out
    if (zoom > 0.5) {
      context.beginPath();
      for (let x = -numColsOffset - 1; x < numCols - numColsOffset + 1; x++) {
        for (let y = -numRowsOffset - 1; y < numRows - numRowsOffset + 1; y++) {
          const centerX = x * gridSpace + gridSpace / 2;
          const centerY = y * gridSpace + gridSpace / 2;
          context.fillStyle = "#C7C7C7";
          context.moveTo(centerX + radius, centerY);
          context.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        }
      }
      context.fill();
    }
    context.beginPath();
    context.fillStyle = "#00FF00"
    context.arc(15, 15, 100, 0, 100 * Math.PI);
    context.fill();
    context.restore();

  };

  function handleMouseDown(e) {
    isDragging = true;
    dragStartX = e.clientX;
    dragStartY = e.clientY;
  }

  function handleMouseUp() {
    isDragging = false;
  }

  function handleMouseMove(e) {
    if (!isDragging) return;

    offsetX += e.clientX - dragStartX;
    offsetY += e.clientY - dragStartY;

    dragStartX = e.clientX;
    dragStartY = e.clientY;
  }

  function handleMouseWheel(e) {
    e.preventDefault();
    const wheelDelta = e.deltaY < 0 ? 1 + zoomStep : 1 - zoomStep;
    const newZoom = zoom * wheelDelta;
    if (newZoom > maxZoom || newZoom < minZoom) return;

    const mouseX = (e.clientX - offsetX) / zoom;
    const mouseY = (e.clientY - offsetY) / zoom;

    offsetX = e.clientX - mouseX * newZoom;
    offsetY = e.clientY - mouseY * newZoom;

    zoom = newZoom;
  }

  let width = "800";
  let height = "400";

  async function downloadCanvas(el) {
    
    svelteCanvas.getCanvas().toBlob(function (blob) {
      console.log(blob)
      saveAs(blob, "example.png");
    });
  };

</script>

<svelte:window bind:innerWidth={width} bind:innerHeight={height} />

<Canvas
  {width}
  {height}
  bind:this={svelteCanvas}
  on:mousedown={handleMouseDown}
  on:mouseup={handleMouseUp}
  on:mousemove={handleMouseMove}
  on:wheel={handleMouseWheel}
>
  <Layer render={draw} />
</Canvas>

<div class="grid">

</div>
<div class="absolute top-1/4 left-4 w-4 bg-gray-800 border-slate-700 rounded-xl">
  Side bar
</div>

<a download="example.jpg" href="" on:click={downloadCanvas}>Download example.jpg</a>

<style>
  .grid{
    display: grid;
    grid-template-areas: "top top top"
                         "left . right"
                         "bottom bottom bottom";
    grid-template-columns: 64px 1fr 330px;
  }
</style>
