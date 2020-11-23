const Fontmin = require("fontmin");
const { default: kyoka } = require("kyouka");

class FontGenerator {
  constructor({ text, src, dest, isOtf = false }) {
    this.text = kyoka.uniq(text).join("");
    this.src = src;
    this.dest = dest;
    this.isOtf = isOtf;
    const fontmin = new Fontmin();
    fontmin
      .src(src)
      .use(isOtf ? Fontmin.otf2ttf() : {})
      .use(
        Fontmin.glyph({
          text,
          hinting: false,
        })
      )
      .use(Fontmin.ttf2eot())
      .use(Fontmin.ttf2woff({ deflate: true }))
      .use(Fontmin.ttf2svg())
      .use(Fontmin.css())
      .dest(dest);
    this.fontmin = fontmin;
  }
  generate() {
    this.fontmin.run((err, files) => {
      console.log(files);
      if (err) {
        console.log(err);
      }
    });
  }
}

const text = "测测试文字";
const src = "fonts/造字工房力黑体.otf";
const dest = "build";
const isOtf = true;
const generator = new FontGenerator({ text, src, dest, isOtf });
generator.generate();
