import { DEFAULT_IMAGE_PASS } from "@app/shared/constants/default-image-pass";
import { Config } from "../interfaces/config.interface";
import { PictureInterface } from "../interfaces/data.interface";

export function pictureCardMapper(data: PictureInterface[], config: Config): PictureInterface[] {
  data.map((picture) => {
    if (picture.image_id) {
      picture.image_url = config.iiif_url + "/" + picture.image_id + DEFAULT_IMAGE_PASS;
    } else {
      picture.image_url = "icons/image 2.png";
    }
  });

  return data;
}

// if (picture.image_id && picture.thumbnail.width !== 0) {
//   picture.image_url =`${config.iiif_url}/${picture.image_id}/full/${picture.thumbnail.width},/0/default.jpg`;
// }else if (picture.id) {
//   picture.image_url = config.iiif_url + "/" + picture.image_id + DEFAULT_IMAGE_PASS;
// } else {
//   picture.image_url = "icons/image 2.png";
// }
