const db = require("../../configs/db.config");
const catchAsync = require("../../errors/catch-async.error");
const { DateTime } = require('luxon');


const focusCreateController = catchAsync(async (req, res) => {

    const { completed, paused, duration, userId } = req.body;

    const x = await db.focusSession.create({
        data: {
            completed, paused, duration, userId, timestamp: DateTime.fromISO('2025-01-12T00:00:00.000Z').plus({ hours: 6 }).toJSDate()
        }
    });
    console.log(x);
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
        const totalDuration = dataForDay.reduce((sum, item) => sum + Math.round(item.duration / 60), 0);
        chartData.push({ date: formattedDate, focusMinutes: totalDuration });
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
    let currentDate = DateTime.fromISO('2025-01-12T00:00:00.000Z').plus({ hours: 6 }).toJSDate();
    console.log(currentDate, 'currentDate');


    for (let i = 0; i < dates.length; i++) {
        const date = DateTime.fromISO(dates[i]).plus({ hours: 6 }).toJSDate();
        console.log(date, 'each-date');
        date.setHours(0, 0, 0, 0);
        currentDate.setHours(0, 0, 0, 0);
        if (date.getTime() === currentDate.getTime()) {
            streakCount++;
            currentDate.setDate(currentDate.getDate() - 1);
        }
    }

    return { streakCount };
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
    const result = countStreak(sessions);

    console.log(result, 'result');
    res.send({ status: true, data: result });
});


module.exports = {
    focusCreateController,
    getSpecificFocusSession,
    getStreakController
};