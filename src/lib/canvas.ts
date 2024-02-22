export const createCanvas = () => {
  return document.createElement("canvas");
};

export const getCanvasData = async (canvas: HTMLCanvasElement | null) => {
  return new Promise((resolve, reject) => {
    canvas?.toBlob(resolve);
  });
};

export const drawImage = (canvas: HTMLCanvasElement | null, src: string) => {
  const context = canvas?.getContext("2d");

  if (!canvas || !context) return;

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";

    img.onload = () => {
      const width = img.width;
      const height = img.height;

      canvas.width = width;
      canvas.height = height;

      context.drawImage(img, 0, 0, width, height);

      resolve(context);
    };

    img.src = src;
  });
};

export const drawMask = (
  canvas: HTMLCanvasElement | null,
  selectionRect: { top: number; left: number; width: number; height: number }
) => {
  const context = canvas?.getContext("2d");

  if (!context) return;

  context.globalCompositeOperation = "destination-out";
  context.fillRect(
    selectionRect.left,
    selectionRect.top,
    selectionRect.width,
    selectionRect.height
  );
};
