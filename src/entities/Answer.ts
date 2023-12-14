export default class Answer {
  constructor(
    public answer: string,
    public score: number,
    public isCorrect: boolean
  ) {}

  public static from(answer: string, score: number = 0, isCorrect: boolean) {
    return new Answer(answer, score, isCorrect);
  }
}
