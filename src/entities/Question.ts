import Answer from "./Answer";

export default class Question {
  constructor(
    public question: string,
    public answers: Answer[]
  ) {}

  public static from(question: string, answers: Answer[]) {
    return new Question(question, answers);
  }

  public get correctAnswer() {
    return this.answers.find((answer) => answer.isCorrect);
  }

  public get incorrectAnswers() {
    return this.answers.filter((answer) => !answer.isCorrect);
  }
}
