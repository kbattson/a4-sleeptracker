import { Injectable } from '@angular/core';
import { get, set } from 'idb-keyval';
import { SleepData } from '../data/sleep-data';
import { OvernightSleepData } from '../data/overnight-sleep-data';
import { StanfordSleepinessData } from '../data/stanford-sleepiness-data';

const STORAGE_KEY = 'sleep_data';

@Injectable({
  providedIn: 'root'
})
export class SleepService {
	private static LoadDefaultData:boolean = false;
	public static AllSleepData:SleepData[] = [];
	public static AllOvernightData:OvernightSleepData[] = [];
	public static AllSleepinessData:StanfordSleepinessData[] = [];

	constructor() {
		if(SleepService.LoadDefaultData) {
			this.addDefaultData();
		SleepService.LoadDefaultData = false;
		}	
		this.load();
	}

	private async load() {
		const saved = await get(STORAGE_KEY);

		if (!saved) {
			this.addDefaultData();
			return;
		}

		for (const o of saved.overnight) {
			const entry = new OvernightSleepData(o.start, o.end);
			SleepService.AllSleepData.push(entry);
			SleepService.AllOvernightData.push(entry);
		}

		for (const s of saved.sleepiness) {
			const entry = new StanfordSleepinessData(s.value, s.at);
			SleepService.AllSleepData.push(entry);
			SleepService.AllSleepinessData.push(entry);
		}
	}
	
	private save() {
		set(STORAGE_KEY, {
			overnight: SleepService.AllOvernightData.map(e => ({start: e.sleepStart, end: e.sleepEnd})),
			sleepiness: SleepService.AllSleepinessData.map(s => ({value: s.loggedValue, at: s.loggedAt})),
		});
	}

		
	private addDefaultData() {
		var goToBed = new Date();
		goToBed.setDate(goToBed.getDate() - 1); //set to yesterday
		goToBed.setHours(1, 3, 0); //1:03am
		var wakeUp = new Date();
		wakeUp.setTime(goToBed.getTime() + 8 * 60 * 60 * 1000); //Sleep for exactly eight hours, waking up at 9:03am
		this.logOvernightData(new OvernightSleepData(goToBed, wakeUp)); // add that person was asleep 1am-9am yesterday
		var sleepinessDate = new Date();
		sleepinessDate.setDate(sleepinessDate.getDate() - 1); //set to yesterday
		sleepinessDate.setHours(14, 38, 0); //2:38pm
		this.logSleepinessData(new StanfordSleepinessData(4, sleepinessDate)); // add sleepiness at 2pm
	}

	public logOvernightData(sleepData:OvernightSleepData) {
		SleepService.AllSleepData.push(sleepData);
		SleepService.AllOvernightData.push(sleepData);
		this.save();
	}

	public logSleepinessData(sleepData:StanfordSleepinessData) {
		SleepService.AllSleepData.push(sleepData);
		SleepService.AllSleepinessData.push(sleepData);
		this.save();
	}

	public removeOvernightData(sleepData: OvernightSleepData) {
		for (const list of [SleepService.AllSleepData, SleepService.AllOvernightData]) {
			const i = list.indexOf(sleepData);
			if (i >= 0) list.splice(i, 1);
		}
		this.save();
	}

	public removeSleepinessOn(day: Date) {
		const key = day.toDateString();
		for (const list of [SleepService.AllSleepData, SleepService.AllSleepinessData]) {
			for (let i = list.length - 1; i >= 0; i--) {
				const item = list[i];
				if (item instanceof StanfordSleepinessData && item.loggedAt.toDateString() === key) {
					list.splice(i, 1);
				}
			}
		}
		this.save();
	}
}
