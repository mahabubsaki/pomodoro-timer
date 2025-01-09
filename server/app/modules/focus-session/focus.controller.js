const db = require("../../configs/db.config");
const catchAsync = require("../../errors/catch-async.error");
const { DateTime } = require('luxon');


const focusCreateController = catchAsync(async (req, res) => {

    const { completed, paused, duration, userId } = req.body;

    const x = await db.focusSession.create({
        data: {
            completed, paused, duration, userId, timestamp: DateTime.now().plus({ hours: 6 }).toJSDate()
        }
    });
    // console.log(x);
    res.send({ status: true, message: 'focus create controller' });
});


const convert = (data) => {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 6);
    const chartData = [];

    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
        const formattedDate = d.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
        const dataForDay = data.filter(item => new Date(item.timestamp).toLocaleDateString('en-US') === d.toLocaleDateString('en-US'));
        const totalDuration = dataForDay.reduce((sum, item) => sum + parseFloat(item.duration / 60), 0);
        chartData.push({ date: formattedDate, focusMinutes: +totalDuration.toFixed(2) });
    }
    return chartData;
};

const getSpecificFocusSession = catchAsync(async (req, res) => {
    const { id } = req.params;
    console.log(id, 'id');
    const all = await db.focusSession.findMany({
        where: {
            userId: id
        }
    });
    res.send({ status: true, data: convert(all) });
});

const countStreak = (sessions) => {


    if (sessions.length === 0) {
        console.log('No completed sessions found.');
        return {
            streakCount: 0
        };
    }
    const dates = [...new Set(sessions.map(session =>
        new Date(session.timestamp).toISOString().split('T')[0]
    ))].sort((a, b) => new Date(b) - new Date(a));
    let streakCount = 0;
    let currentDate = DateTime.now().plus({ hours: 6 }).toJSDate();
    // console.log(currentDate, 'currentDate');


    for (let i = 0; i < dates.length; i++) {
        const date = DateTime.fromISO(dates[i]).plus({ hours: 6 }).toJSDate();

        date.setHours(0, 0, 0, 0);
        currentDate.setHours(0, 0, 0, 0);
        if (date.getTime() === currentDate.getTime()) {
            streakCount++;
            currentDate.setDate(currentDate.getDate() - 1);
        }
    }

    return { streakCount };
};

const countLongestStreak = (sessions) => {

    if (sessions.length === 0) return { longestStreak: 0 };

    const dates = [...new Set(sessions.map(session =>
        new Date(session.timestamp).toISOString().split('T')[0]
    ))].sort((a, b) => new Date(a) - new Date(b));

    console.log(dates, 'dates');

    let longestStreak = 1;
    let currentStreak = 1;
    let tempStreak = 1;

    for (let i = 0; i < dates.length; i++) {
        const prevDate = new Date(dates[i]);
        const currentDate = new Date(dates[i + 1]);

        prevDate.setHours(0, 0, 0, 0);
        currentDate.setHours(0, 0, 0, 0);

        if ((currentDate.getTime() - prevDate.getTime()) === 24 * 60 * 60 * 1000) {
            tempStreak++;
            currentStreak = tempStreak;
            longestStreak = Math.max(longestStreak, currentStreak);
        } else {
            tempStreak = 1;
        }
    }
    console.log(longestStreak, 'longestStreak');
    return { longestStreak };
};

const getStreakController = catchAsync(async (req, res) => {
    const { id: userId } = req.params;
    console.log(userId, 'id');

    const sessions = await db.focusSession.findMany({
        where: {
            userId: userId,
        },
        orderBy: {
            timestamp: 'asc'
        }
    });

    const completedSessions = await db.focusSession.findMany({
        where: {
            userId: userId,
        }
    });
    console.log(completedSessions, 'completedSessions');
    const result = countStreak(sessions);
    const longestStreak = countLongestStreak(completedSessions);
    result.sessionNo = completedSessions.length + 1;
    result.longestStreak = longestStreak.longestStreak;

    // console.log(result, 'result');
    res.send({ status: true, data: result });
});

function countCompletedSessions(data) {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 6);

    const completedSessionsData = [];

    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
        const formattedDate = d.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
        const completedSessions = data.filter(
            item => new Date(item.timestamp).toLocaleDateString('en-US') === d.toLocaleDateString('en-US') && item.completed
        ).length;
        completedSessionsData.push({ date: formattedDate, completedSessions: completedSessions });
    }

    return completedSessionsData;
}

const getCompletedSessionController = catchAsync(async (req, res) => {
    const { id: userId } = req.params;
    console.log(userId, 'id');

    const completedSession = await db.focusSession.findMany({
        where: {
            userId: userId,
            completed: true
        },

    });
    const result = countCompletedSessions(completedSession);
    // console.log(result, 'result');
    res.send({ status: true, data: result });


});

function getHourlyData(data) {
    const hourlyData = Array(24).fill(0);

    data.forEach(entry => {
        const hour = new Date(entry.timestamp).getUTCHours();
        hourlyData[hour] += entry.duration;
    });
    hourlyData.forEach((entry, index) => {
        hourlyData[index] = +parseFloat(entry / 60).toFixed(2);
    });
    const result = hourlyData.map((value, index) => {
        const startHour = index % 24;
        const endHour = (startHour + 1) % 24;
        const periodStart = startHour < 12 ? "AM" : "PM";
        const periodEnd = endHour < 12 ? "AM" : "PM";


        const formattedStart = startHour % 12 === 0 ? 12 : startHour % 12;
        const formattedEnd = endHour % 12 === 0 ? 12 : endHour % 12;

        return {
            timeRange: `${formattedStart}-${formattedEnd} ${periodStart}`,
            value: value
        };
    });

    return result;
}

const getDailyFocusSession = catchAsync(async (req, res) => {
    const { id: userId } = req.params;
    const time = DateTime.fromISO(req.query.time || new Date().toJSON()).plus({ hours: 6 }).toJSDate();
    // const start = new Date(time);
    // start.setHours(0, 0, 0, 0);

    // console.log(DateTime.fromJSDate(time).startOf('day').minus({ day: 1 }).plus({ hours: 6 }).toJSDate(), 'starttime');
    // console.log(DateTime.fromJSDate(time).endOf('day').minus({ day: 1 }).plus({ hours: 6 }).toJSDate(), 'endtime');
    console.log(time, 'time', DateTime.fromJSDate(time).startOf('day').toJSDate());
    const completedSession = await db.focusSession.findMany({
        where: {
            userId: userId,
            timestamp: {
                gte: DateTime.fromJSDate(time).startOf('day').plus({ hours: 6 }).toJSDate(),
                lte: DateTime.fromJSDate(time).endOf('day').plus({ hours: 6 }).toJSDate()
            }
        },

    });
    console.log(completedSession, 'completedSession');
    const result = getHourlyData(completedSession);
    console.log(result, 'result');
    res.send({ status: true, data: result });

});


module.exports = {
    focusCreateController,
    getSpecificFocusSession,
    getStreakController,
    getCompletedSessionController,
    getDailyFocusSession
};