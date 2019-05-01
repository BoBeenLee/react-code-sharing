interface IParams {
  albumName?: string;
  limit: number;
  startFrom: number;
  type: string;
}

declare module "react-native-gallery-manager" {
  function getAssets(params: IParams): Promise<any>;
  function getAlbums(): Promise<any>;
  export default { getAlbums, getAssets };
}
