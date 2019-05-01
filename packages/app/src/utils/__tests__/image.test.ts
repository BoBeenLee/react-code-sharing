import {
  getCropDimensions,
  getResizeDimension,
  IMAGE_MAX_DIMENSION,
  IMAGE_MAX_RATIOS
} from "../image";

const WIDE = {
  height: 9,
  width: 18
};

const TALL = {
  height: 8,
  width: 3
};

const NORMAL = {
  height: 10,
  width: 12
};

/*tslint:disable*/
describe("ImageUtils", () => {
  it("getCropDimensions", () => {
    expect(getCropDimensions(WIDE.width, WIDE.height)).toEqual({
      cropWidth: WIDE.height * IMAGE_MAX_RATIOS.wide,
      cropHeight: WIDE.height
    });

    expect(getCropDimensions(TALL.width, TALL.height)).toEqual({
      cropWidth: TALL.width,
      cropHeight: TALL.width * IMAGE_MAX_RATIOS.tall
    });

    expect(getCropDimensions(NORMAL.width, NORMAL.height)).toEqual({
      cropWidth: NORMAL.width,
      cropHeight: NORMAL.height
    });
  });

  it("getResizeDimensions", () => {
    expect(getResizeDimension(10000, 1)).toEqual({
      resizeWidth: IMAGE_MAX_DIMENSION,
      resizeHeight: (1 * IMAGE_MAX_DIMENSION) / 10000
    });

    expect(getResizeDimension(1, 10000)).toEqual({
      resizeWidth: (1 * IMAGE_MAX_DIMENSION) / 10000,
      resizeHeight: IMAGE_MAX_DIMENSION
    });

    // Width overflow
    expect(getResizeDimension(3310, 1334)).toEqual({
      resizeWidth: IMAGE_MAX_DIMENSION,
      resizeHeight: (1334 * IMAGE_MAX_DIMENSION) / 3310
    });

    //Height overflow
    expect(getResizeDimension(1200, 6000)).toEqual({
      resizeWidth: (1200 * IMAGE_MAX_DIMENSION) / 6000,
      resizeHeight: IMAGE_MAX_DIMENSION
    });

    // Both overflow and Width > Height
    expect(getResizeDimension(1500, 1480)).toEqual({
      resizeWidth: IMAGE_MAX_DIMENSION,
      resizeHeight: (1480 * IMAGE_MAX_DIMENSION) / 1500
    });
    // Both overflow and Height > Width
    expect(getResizeDimension(2880, 4320)).toEqual({
      resizeWidth: 2880 / 3,
      resizeHeight: 1440
    });
  });
});
