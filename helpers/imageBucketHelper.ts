export enum ImageSizes {
  THUMBNAIL = "thumbnail",
  MEDIUM = "medium",
  FULL_VIEW = "fullView",
}

export function getSizedImageUrl(url: string, size = "thumbnail") {
  if (!url) return;
  let resultUrl;
  const fileName = url.substring(url.lastIndexOf("/") + 1);

  if (url.indexOf("storage.googleapis.com") > -1) {
    switch (size) {
      case ImageSizes.THUMBNAIL:
        resultUrl = process.env.NEXT_PUBLIC_BUCKET_THUMBMAIL + fileName;
        break;
      case ImageSizes.MEDIUM:
        resultUrl = process.env.NEXT_PUBLIC_BUCKET_MEDIUM + fileName;
        break;
      case ImageSizes.FULL_VIEW:
        resultUrl = process.env.NEXT_PUBLIC_BUCKET_FULL_VIEW + fileName;
        break;
    }
    return resultUrl;
  } else {
    return url;
  }
}
