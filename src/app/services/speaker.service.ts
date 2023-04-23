import { Injectable } from '@angular/core';




@Injectable({
  providedIn: 'root'
})
export class SpeakerService {

  constructor() {

  }

  public speak(text: string,rate=1): void {
    const speechSynthesis = window.speechSynthesis;



    if (speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.voice=speechSynthesis.getVoices()[1]
      utterance.rate=rate
      speechSynthesis.speak(utterance);
    } else {
      console.error('Speech synthesis is not supported in this browser.');
    }
  }
}
