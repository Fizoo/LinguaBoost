import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class Speaker2Service {
  private utterance: SpeechSynthesisUtterance | null = null;
  //private availableVoices: SpeechSynthesisVoice[] = [];

  constructor() {
    // Ініціалізуємо об'єкт SpeechSynthesisUtterance
    this.utterance = new SpeechSynthesisUtterance();
    this.utterance.rate = 1;
     // this.availableVoices = window.speechSynthesis.getVoices();
  }


  public speak(text: string): void {
    if (this.utterance) {
      //const voices = window.speechSynthesis.getVoices();
      //this.utterance.voice=voices[1]
      // Встановлюємо текст для озвучування
      this.utterance.text = text;
      // Запускаємо озвучування
      window.speechSynthesis.speak(this.utterance);
    }
  }

  public setVoice(value:number){
    if (this.utterance){
      const voices = window.speechSynthesis.getVoices()
      this.utterance.voice=voices[value]
    }
  }

  public getVoice(){
    return this.utterance?window.speechSynthesis.getVoices() :[]
  }

// Призупиняємо озвучування, якщо воно триває
  public pause(): void {
    if (this.utterance) {
      window.speechSynthesis.pause();
    }
  }

  // Продовжуємо озвучування, якщо воно було призупинено
  public resume(): void {
    if (this.utterance) {
      window.speechSynthesis.resume();
    }
  }
// Скасовуємо озвучування
  public stop(): void {
    if (this.utterance) {
      window.speechSynthesis.cancel();
    }
  }






}
