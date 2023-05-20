import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class SpeakerService {
  constructor() {}

  public speak(text: string): void {
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    //console.log(voices)

    // Фільтруємо голоси за мовою та додатковими параметрами
   /* const filteredVoices = voices.filter((voice) => {
      console.log(voice)
      return (
        voice.lang.includes('en') &&
        voice.localService &&
        !voice.name.includes('Google')
      );
    });*/

    // Встановлюємо голос зі списку доступних голосів
   /* if (filteredVoices.length > 0) {
      utterance.voice = filteredVoices[0];
    }*/
   // utterance.rate=1
    utterance.voice = voices[1]
    // Встановлюємо швидкість мовлення та робимо озвучення тексту

    window.speechSynthesis.speak(utterance);
  }
}
