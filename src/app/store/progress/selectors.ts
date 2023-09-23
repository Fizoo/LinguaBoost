import {createFeatureSelector, createSelector} from "@ngrx/store";
import {DetailProgress, Progress} from "../../models/progress";
import {getCurrentDate} from "../../helper/fn";
import {StatisticData} from "../../models/statictic";

export namespace ProgressSelectors {
  export const getProgressState=createFeatureSelector<Progress>('progress')

  export const getAllProgress=createSelector(
    getProgressState,
    state=>state
  )

  export const getProgressByThisDay=createSelector(
    getAllProgress,
    progress=>{
      const day=progress.timeOfDay.find(el=>el.date===getCurrentDate())
      return day || null
    }
  )

  export const getCountAllDayOfProgress=createSelector(
    getProgressState,
    progress=>progress.timeOfDay.length || 0
  )
//прогрес за поточний тиждень
  export const getActiveWeekProgress=createSelector(
    getProgressState,
    progress => {
      const currentDate = getCurrentDate();
      const firstDayOfWeek = new Date(currentDate);
      firstDayOfWeek.setDate(firstDayOfWeek.getDate() - firstDayOfWeek.getDay() + 1);

      const weekTimeDays: StatisticData[] = [];
      const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']; // Скорочені назви днів тижня
      const detailProgress: DetailProgress = { countLow: 0, countMiddle: 0, countHigh: 0 };

      for (let i = 0; i < 7; i++) {
        const day = new Date(firstDayOfWeek)
        day.setDate(day.getDate() + i);

        const timeDayFromProgress = progress.timeOfDay.find(timeDay =>
          timeDay.date === day.toISOString().split('T')[0]
        );

        const timeDay: StatisticData = {
          id: day.toISOString().split('T')[0], // Отримуємо дату у форматі "yyyy-MM-dd"
          dayName: daysOfWeek[i], // Додаємо скорочену назву дня
          counterScore: timeDayFromProgress ? timeDayFromProgress.counterScore : 0,
          countUpWordsInThisDay: timeDayFromProgress ? timeDayFromProgress.countUpWordsInThisDay : 0,
          countMin: timeDayFromProgress ? timeDayFromProgress.countMin : 0,
          countHigh: timeDayFromProgress ? timeDayFromProgress.detailForWordsProgress.countHigh : detailProgress.countHigh,
          countMiddle: timeDayFromProgress ? timeDayFromProgress.detailForWordsProgress.countMiddle : detailProgress.countMiddle,
          countLow: timeDayFromProgress ? timeDayFromProgress.detailForWordsProgress.countLow : detailProgress.countLow,
        };

        weekTimeDays.push(timeDay);
      }

      return weekTimeDays;
    }
  )
  //прогрес за поточний місяць
  export const getMonthTimeDays = createSelector(
    getProgressState,
    progress => {
      const currentDate = getCurrentDate();
      const firstDayOfMonth = new Date(currentDate);
      firstDayOfMonth.setDate(1); // Встановлюємо перший день місяця

      const lastDayOfMonth = new Date(firstDayOfMonth);
      lastDayOfMonth.setMonth(lastDayOfMonth.getMonth() + 1); // Отримуємо перший день наступного місяця, щоб отримати останній день поточного

      const daysInMonth = new Date(firstDayOfMonth.getFullYear(), firstDayOfMonth.getMonth() + 1, 0).getDate();

      const monthTimeDays: StatisticData[] = [];
      const detailProgress:DetailProgress={countLow:0,countMiddle:0,countHigh:0}

      for (let i = 1; i <= daysInMonth; i++) {
        const day = new Date(firstDayOfMonth);
        day.setDate(i);

        const timeDayFromProgress = progress.timeOfDay.find(
          timeDay => timeDay.date === day.toISOString().split('T')[0]
        );


        const timeDay: StatisticData = {
          id: day.toISOString().split('T')[0], // Отримуємо дату у форматі "yyyy-MM-dd"
          dayName: '', //
          counterScore: timeDayFromProgress ? timeDayFromProgress.counterScore : 0,
          countUpWordsInThisDay: timeDayFromProgress ? timeDayFromProgress.countUpWordsInThisDay : 0,
          countMin: timeDayFromProgress ? timeDayFromProgress.countMin : 0,
          countHigh: timeDayFromProgress ? timeDayFromProgress.detailForWordsProgress.countHigh : detailProgress.countHigh,
          countMiddle: timeDayFromProgress ? timeDayFromProgress.detailForWordsProgress.countMiddle : detailProgress.countMiddle,
          countLow: timeDayFromProgress ? timeDayFromProgress.detailForWordsProgress.countLow : detailProgress.countLow,
        };

        monthTimeDays.push(timeDay);
      }

      return monthTimeDays;
    }
  )
    //весь прогрес розбитиий по тиждням
  export const selectTotalProgressByWeek = createSelector(
    getProgressState,
    state => {
      const weeklyData: { [weekNumber: string]: StatisticData } = {};

      state.timeOfDay.forEach((day) => {
        const date = new Date(day.date);
        const weekNumber = getWeekNumber(date);
        if (!weeklyData[weekNumber]) {
          weeklyData[weekNumber] = {
            id: weekNumber, // Індекс тиждня в році
            counterScore: 0,
            countUpWordsInThisDay: 0,
            countMin: 0,
            countHigh: 0,
            countMiddle: 0,
            countLow: 0,
          };
        }

        weeklyData[weekNumber].counterScore += day.counterScore;
        weeklyData[weekNumber].countUpWordsInThisDay += day.countUpWordsInThisDay;
        weeklyData[weekNumber].countMin += day.countMin;
        weeklyData[weekNumber].countHigh += day.detailForWordsProgress.countHigh;
        weeklyData[weekNumber].countMiddle += day.detailForWordsProgress.countMiddle;
        weeklyData[weekNumber].countLow += day.detailForWordsProgress.countLow;
      });

      return Object.values(weeklyData);
    }
  )
//весь прогрес розбитиий по місяцям
  export const selectMonthlyData = createSelector(
    getProgressState,
    (state: Progress) => {
      const monthlyData: { [monthNumber: string]: StatisticData } = {};

      state.timeOfDay.forEach((day) => {
        const date = new Date(day.date);
        const monthNumber = getMonthNumber(date);

        if (!monthlyData[monthNumber]) {
          monthlyData[monthNumber] = {
            id: monthNumber,
            counterScore: 0,
            countUpWordsInThisDay: 0,
            countMin: 0,
            countHigh: 0,
            countMiddle: 0,
            countLow: 0,
          };
        }

        monthlyData[monthNumber].counterScore += day.counterScore;
        monthlyData[monthNumber].countUpWordsInThisDay += day.countUpWordsInThisDay;
        monthlyData[monthNumber].countMin += day.countMin;
        monthlyData[monthNumber].countHigh += day.detailForWordsProgress.countHigh;
        monthlyData[monthNumber].countMiddle += day.detailForWordsProgress.countMiddle;
        monthlyData[monthNumber].countLow += day.detailForWordsProgress.countLow;
      });

      return Object.values(monthlyData).map(month=>({...month,id:getMonthNameByIndex(+month.id-1)}))
    }
  );

}

function getWeekNumber(date: Date): string {
  const oneJan = new Date(date.getFullYear(), 0, 1);
  const millisecondsInDay = 24 * 60 * 60 * 1000;
  return Math.ceil(((date.getTime() - oneJan.getTime()) / millisecondsInDay + oneJan.getDay() + 1) / 7).toString();
}


function getMonthNumber(date: Date): string {
  return (date.getMonth() + 1).toString();
}

function getMonthNameByIndex(index: number): string {
  const months = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
  ];
  return months[index];
}
