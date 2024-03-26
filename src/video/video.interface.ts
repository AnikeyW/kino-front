export type IRes = "1080" | "720" | "480" | "360";

export interface IQuality {
  res: IRes;
  src: string;
  type: string;
}

export interface IVideo {
  title: string;
  defaultRes: IRes;
  qualities: IQuality[];
  captions: {
    srcLang: string;
    src: string;
    title: string;
  }[];
}
