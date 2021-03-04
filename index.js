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

const text =
  "雷锋语录我愿做高山岩石之松，不做湖岸河旁之柳。我愿在暴风雨中艰苦的斗争中锻炼自己，不愿在平平静静的日子里度过自己的一生。一滴水只有放进大海里才能永远不会干涸，一个人只有当他把自己和集体事业融合在一起的时候才能最有力量。一朵鲜花打扮不出美丽的春天，一个人先进总是单枪匹马，众人先进才能移山填海。我们是国家的主人,应该处处为国家着想。但愿每次回忆,对生活都不感到负疚。谁要是游戏人生，他就一事无成；谁不能主宰自己，永远是一个奴隶。吃饭是为了活着，但活着不是为了吃饭。一枝独秀不是春，百花齐放春满园。学习不止孜孜不倦服务人民助人为乐请选择勤俭节约艰苦朴素是雷锋精神的重要组成更是新时代文明的日常实践挺身而出无私奉献锐意进取自强不息在常熟高新区（东南街道）有这么一群人他们一往无前践行着新时代雷锋精神在各自岗位上发光发热";
const src = "fonts/杨任东竹石体-Bold.ttf";
const dest = "build";
const isOtf = true;
const generator = new FontGenerator({ text, src, dest, isOtf });
generator.generate();
