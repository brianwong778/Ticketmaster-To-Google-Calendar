import axios from 'axios';
const baseUrl = "/api/data";

const postEventName = async (eventName) => {
  try {
    const request = await axios.post(baseUrl + "/eventName", { name: eventName }, {
      headers: { "Content-Type": "application/json" },
    });
    return request.data.reduce((acc, eventData) => {
      acc.newEvents.push(eventData.name);
      acc.newDates.push(eventData.dates.start.localDate);
      acc.newTimes.push(eventData.dates.start.localTime);
      return acc;
    }, { newEvents: [], newDates: [], newTimes: [] });
  } catch (error) {
    console.error("Error:", error);
  }
}
export default {postEventName}