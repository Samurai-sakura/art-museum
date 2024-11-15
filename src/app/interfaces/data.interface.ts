export interface PictureInterface {
  id: number;
  title: string;
  thumbnail: {
    lqip: string;
    alt_text: string;
    width: number;
  };
  date_start: string;
  date_end: string;
  date_display: string;
  place_of_origin: string;
  credit_line: string;
  artist_display: string;
  artist_title: string;
  dimensions: string;
  image_id: string;
  image_url: string;
  main_reference_number: string;
}
