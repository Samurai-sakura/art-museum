import { Config } from "../interfaces/config.interface";
import { PictureInterface } from "../interfaces/data.interface";
import { DEDAULT_IMAGE_PASS } from "../shared/constants/default-image-pass";

export function onePictureCardMapper(
  picture: PictureInterface,
  config: Config
): PictureInterface {
  if (picture.image_id) {
    picture.image_url =
      config.iiif_url + "/" + picture.image_id + DEDAULT_IMAGE_PASS;
  } else {
    picture.image_url = "icons/image 2.png";
  }

  return picture;
}
