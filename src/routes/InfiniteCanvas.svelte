<script>
  import { Canvas, Layer, t } from "svelte-canvas";

  let offsetX = 0;
  let offsetY = 0;
  let zoom = 1;
  let maxZoom = 1.3;
  let minZoom = 0.1;
  let zoomStep = 0.05;
  const gridSize = 20;
  let isDragging = false;
  let dragStartX, dragStartY;

  $: draw = ({ context, width, height }) => {
    context.clearRect(0, 0, width, height);

    context.save();
    context.translate(offsetX, offsetY);
    context.scale(zoom, zoom);

    const gridSpace = gridSize;
    const radius = (gridSpace / 16) * zoom;
    const numCols = Math.ceil(width / gridSpace / zoom);
    const numRows = Math.ceil(height / gridSpace / zoom);
    const numColsOffset = Math.ceil(offsetX / (gridSpace * zoom));
    const numRowsOffset = Math.ceil(offsetY / (gridSpace * zoom));

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
</script>

<svelte:window bind:innerWidth={width} bind:innerHeight={height} />

<Canvas
  {width}
  {height}
  on:mousedown={handleMouseDown}
  on:mouseup={handleMouseUp}
  on:mousemove={handleMouseMove}
  on:wheel={handleMouseWheel}
>
  <Layer render={draw} />
</Canvas>

<style>
</style>
