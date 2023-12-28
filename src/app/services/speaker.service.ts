import { Injectable } from '@angular/core';

import Speak from 'speak-tts';


@Injectable({
  providedIn: 'root'
})
export class SpeakerService {
  private speaker: any;
  private availableVoices: SpeechSynthesisVoice[] = [];

  constructor() {
    this.speaker = new Speak();
    this.initializeSpeaker();
  }

  private initializeSpeaker(): void {
    this.availableVoices = window.speechSynthesis.getVoices();
    this.speaker.init({
      volume: 1,
      lang: 'en-GB',
      rate: 1
    });
  }

  public play(text: string): void {
    this.speaker.cancel();

    this.speaker.speak({text})
  }

  public stop(): void {
    this.speaker.cancel();
  }

  public pause(): void {
    this.speaker.pause();
  }

  public resume(): void {
    this.speaker.resume();
  }
  //ng serve --host 192.168.3.2 --port 4200
  //http://192.168.3.2:4200

/*  private speaker: any;

  constructor() {
    this.speaker = new Speak();
    this.initializeSpeaker();
  }

  private initializeSpeaker(): void {
    // Просто ініціалізуємо голосовий двигун без подій
  }

  public play(text: string, voiceIndex: number = 0): void {
    const voice = this.availableVoices[voiceIndex];
    if (voice) {
      this.speaker.speak({
        text: '', // Пустий текст, щоб призупинити попереднє озвучення
        listeners: {
          onend: () => {
            this.speaker.speak({
              text: text,
              voice: voice,
              listeners: {
                onend: () => {
                  console.log('Speech synthesis ended');
                },
                onerror: (error: any) => {
                  console.error('Error during speech synthesis:', error);
                }
              }
            });
          }
        }
      });
    }
  }*/
}
