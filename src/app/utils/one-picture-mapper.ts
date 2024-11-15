import { Config } from "../interfaces/config.interface";
import { PictureInterface } from "../interfaces/data.interface";
import { DEFAULT_IMAGE_PASS } from "../shared/constants/default-image-pass";

export function onePictureCardMapper(
  picture: PictureInterface,
  config: Config
): PictureInterface {
    if (picture.image_id) {
      picture.image_url = config.iiif_url + "/" + picture.image_id + DEFAULT_IMAGE_PASS;
    }else {
      picture.image_url = "icons/image 2.png";
    }

  return picture;
}

// if (picture.image_id && picture.thumbnail.width !== 0 && picture.thumbnail.width < 1000) {
//   picture.image_url =`${config.iiif_url}/${picture.image_id}/full/${picture.thumbnail.width},/0/default.jpg`;        
// }else if (picture.id){
//   picture.image_url = config.iiif_url + "/" + picture.image_id + DEFAULT_IMAGE_PASS;
// }else {
//   picture.image_url = "icons/image 2.png";
// }