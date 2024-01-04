import Answer from "@/entities/Answer";
import Question from "@/entities/Question";

export const questions: Question[] = [
  Question.from("聖誕老人最喜歡的顏色是/\n聖誕老人帽子的顏色是？", [
    Answer.from("紅色，他的外套就是紅色的！", 10, false),
    Answer.from("綠色，綠油油一片多好看！", 20, false),
    Answer.from("白色，他喜歡雪花的顏色。", 30, false),
    Answer.from("藍色，他喜歡海洋的顏色。", 40, false),
  ]),
  Question.from("在聖誕節晚餐上，\n你最想吃的是？", [
    Answer.from("火雞，傳統的聖誕大餐。", 0, false),
    Answer.from("香腸捲，好吃又好玩。", 0, false),
    Answer.from("蛋糕，我最愛甜點！", 0, false),
    Answer.from("燒烤，聖誕節也可以烤肉！", 0, false),
  ]),
  Question.from("你最喜歡的聖誕歌曲是？", [
    Answer.from("Jingle Bells，經典中的經典！", 0, false),
    Answer.from("Last Christmas，讓人感到\n溫馨的歌曲。", 0, false),
    Answer.from(
      "Santa Claus is Coming to Town，聽到就知道聖誕節快到了！",
      0,
      false,
    ),
    Answer.from(
      "All I Want for Christmas is You，讓人感到愛的歌曲。",
      0,
      false,
    ),
  ]),
  Question.from("你最期待甚麼禮物？", [
    Answer.from("我想要 「粉啵啵」！", 0, false),
    Answer.from("我想要 「聖誕帽」！", 0, false),
    Answer.from("我想要 「生可樂」！", 0, false),
    Answer.from("我想要 「Travel Buddy」！", 0, false),
    Answer.from("我想要睇 「腦細跳舞」！", 0, false),
  ]),
  Question.from("如果你是聖誕老人，\n你會選擇哪種交通工具送禮物？", [
    Answer.from("馴鹿，傳統又可愛。", 0, false),
    Answer.from("輕軌，坐了再走一會就到了，\n既環保又夠快。", 0, false),
    Answer.from("直升機，可以飛行又可以\n降落在屋頂上。", 0, false),
    Answer.from("超級跑車，為了更酷更快地\n送禮物！", 0, false),
  ]),
];

export default questions;
