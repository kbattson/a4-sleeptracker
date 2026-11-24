import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { SleepService } from '../services/sleep.service';
import { SleepData } from '../data/sleep-data';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';

import { ToastController } from '@ionic/angular/standalone';
import { LogCardComponent } from '../components/log-card/log-card.component';

import { SleepinessCardComponent } from '../components/sleepiness-card/sleepiness-card.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, 
  	LogCardComponent, SleepinessCardComponent],
})
export class HomePage {	
	private bedtime = '';
	private waketime = '';
	private currentSleep?: OvernightSleepData;

  constructor(public sleepService:SleepService, private toastController: ToastController) {

	}

	ngOnInit() {
		console.log(this.allSleepData);
	}

	/* Ionic doesn't allow bindings to static variables, so this getter can be used instead. */
	get allSleepData() {
		return SleepService.AllSleepData;
	}

	onBedtime(time: string) {
		this.bedtime = time;
	}

	onWakeup(time: string) {
		if (!this.bedtime) {
			this.showToast('Log your bedtime first');
			return;
		}

		this.waketime = time;
		this.saveSleep();
	}

	private saveSleep(): boolean {
		const bed = this.toDate(this.bedtime);
		const wake = this.toDate(this.waketime);
		if (bed > wake) bed.setDate(bed.getDate() - 1);

		const updating = !!this.currentSleep;
		if (this.currentSleep) this.sleepService.removeOvernightData(this.currentSleep);

		this.currentSleep = new OvernightSleepData(bed, wake);
		this.sleepService.logOvernightData(this.currentSleep);

		this.showToast(updating ? 'Sleep updated' : 'Sleep logged');
		return true;
	}

	onSleepiness(level: number) {
		this.sleepService.logSleepinessData(new StanfordSleepinessData(level, new Date()));
		this.showToast(`Sleepiness ${level}/7 logged`);
	}

	private currentToast?: HTMLIonToastElement;
	
	private async showToast(message: string) {
		this.currentToast = await this.toastController.create({
			message,
			duration: 1500,
			position: 'top',
		});
		await this.currentToast.present();
	}

	private toDate(time: string): Date {
		const [h, m] = time.split(':').map(Number);
		const d = new Date();
		d.setHours(h, m, 0, 0);
		return d;
	}
		
}
