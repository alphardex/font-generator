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

const text = "评选详情活动规则购买记录填写信息报名信息修改投票成功";
const src = "fonts/字魂111号-金榜招牌体.ttf";
const dest = "build";
const isOtf = true;
const generator = new FontGenerator({ text, src, dest, isOtf });
generator.generate();
