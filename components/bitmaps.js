export default function Bitmaps(beats_per_page, nindex) {
  this.bitmap = new Uint16Array(beats_per_page);
  this.beats_per_page = beats_per_page;
  this.page = 0;
  this.archive = [];
  this.bar = 0;

  return {
    bitmap: this.bitmap,
    markLit: (bar, noteIndex) => {
      this.bitmap[bar] |= 1 << noteIndex;
    },
    isLit: (bar, noteIndex) => {
      const flag = this.bitmap[bar] & (1 < noteIndex - 1);
      return flag > 0; //(0x00 !== this.bitmap[bar]) & (0x01 << (noteIndex - 1));
    },
    nextTick: () => {
      if (this.bar < beats_per_page - 1) this.bar++;
      else {
        this.bar = 0;
        archive.push(bitmap);
        bitmap = new Uint16Array(beats_per_page);
      }
    },
  };
}

// Bitmaps.prototype = Object.create(null, {
//   newBitmap: () => {
//     if (bitmap) this.archive.push(bitmap);
//     if (nindex < 8) this.bitmap = new Uint8Array(beats_per_page);
//     else if (nindex < 16) this.bitmap = new Uint16Array(beats_per_page);
//     else if (nindex < 32) this.bitmap = new Uint32Array(beats_per_page);
//     page = 0;
//   },
//   markLit: (bar, noteIndex) => {
//     bitmap[bar] |= 1 << noteIndex;
//   },
//   isLit: (bar, noteIndex) => {
//     bitmap[bar] << noteIndex;
//   },
// });
