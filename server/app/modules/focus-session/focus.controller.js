const db = require("../../configs/db.config");
const redisClient = require("../../configs/redis.config");
const catchAsync = require("../../errors/catch-async.error");
const { DateTime } = require('luxon');




const focusCreateController = catchAsync(async (req, res) => {

    const { completed, paused, duration, userId } = req.body;

    await db.focusSession.create({
        data: {
            completed, paused, duration, userId, timestamp: DateTime.now().plus({ hours: 6 }).toJSDate()
        }
    });

    await redisClient.multi().DEL('getSpecificFocusSession' + userId).DEL('getStreakController' + userId).DEL('getCompletedSessionController' + userId).DEL('getAchivementsController' + userId).DEL('getDailyFocusSession' + userId + DateTime.now().plus({ hours: 6 }).toJSDate().toISOString().split('T')[0]).exec();
    // console.log('cleard cache');

    // console.log(x);
    res.send({ status: true, message: 'focus create controller' });
});


const convert = (data) => {
    // const currentDate = new Date();

    // currentDate.setHours(currentDate.getHours() + 6);
    // console.log(currentDate, 'currentDate');
    // // Create an array with the current day and previous 6 days
    // const dates = Array.from({ length: 7 }, (_, index) => {
    //     const date = new Date(currentDate);
    //     date.setDate(currentDate.getDate() - (6 - index)); // Subtract the index to get the previous days

    //     return {
    //         date: date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    //     };
    // });
    // console.log(dates, 'dates');
    // const groupByDate = data.reduce((acc, curr) => {
    //     const date = new Date(curr.timestamp);
    //     date.setHours(date.getHours() - 6);
    //     const formattedDate = date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    //     if (!acc[formattedDate]) {
    //         acc[formattedDate] = [];
    //     }
    //     acc[formattedDate].push(curr);
    //     return acc;
    // }, {});

    // const result = Object.keys(groupByDate).map(date => {
    //     const totalDuration = groupByDate[date].reduce((sum, item) => sum + parseFloat(item.duration / 60), 0);
    //     return { date, focusMinutes: +totalDuration.toFixed(2) };
    // });
    // console.log(result, 'result');

    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 6);

    startDate.setHours(0, 0, 0, 0);
    startDate.setHours(startDate.getHours() + 6);
    endDate.setHours(23, 59, 59, 999);
    endDate.setHours(endDate.getHours() + 6);
    // console.log(startDate, endDate, 'start end');
    const chartData = [];

    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
        // console.log(d, 'd');
        const formattedDate = d.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
        const dataForDay = data.filter(item => {

            const x = new Date(item.timestamp);
            x.setHours(x.getHours() - 6);
            return x.toLocaleDateString('en-US') === d.toLocaleDateString('en-US');
        });
        // console.log(dataForDay, 'dataForDay');
        const totalDuration = dataForDay.reduce((sum, item) => sum + parseFloat(item.duration / 60), 0);
        chartData.push({ date: formattedDate, focusMinutes: +totalDuration.toFixed(2) });
    }
    return chartData;
};

const getSpecificFocusSession = catchAsync(async (req, res) => {

    const { id } = req.params;
    // console.log(id, 'id');
    const cache = await redisClient.get('getSpecificFocusSession' + id);
    let result;
    if (cache) {
        // console.log('from cache, getSpecificFocusSession');
        result = JSON.parse(cache);
    } else {
        const all = await db.focusSession.findMany({
            where: {
                userId: id
            }
        });
        result = convert(all);
        // console.log(all, 'result');
    }
    ;

    await redisClient.set('getSpecificFocusSession' + id, JSON.stringify(result), {
        EX: 3600
    });
    res.send({ status: true, data: result });
});

const countStreak = (sessions) => {


    if (sessions.length === 0) {
        // console.log('No completed sessions found.');
        return {
            streakCount: 0
        };
    }
    const dates = [...new Set(sessions.map(session =>
        new Date(session.timestamp).toISOString().split('T')[0]
    ))].sort((a, b) => new Date(b) - new Date(a));
    let streakCount = 1;
    let currentDate = DateTime.now().plus({ hours: 6 }).toJSDate();



    for (let i = 0; i < dates.length; i++) {
        const date = DateTime.fromISO(dates[i]).plus({ hours: 6 }).toJSDate();
        const prev = DateTime.fromISO(dates[i + 1]).plus({ hours: 6 }).toJSDate();


        date.setHours(0, 0, 0, 0);
        prev.setHours(0, 0, 0, 0);

        if (date.getTime() - prev.getTime() === 24 * 60 * 60 * 1000) {
            streakCount++;
            currentDate.setDate(currentDate.getDate() - 1);
            prev.setDate(prev.getDate() - 1);
        } else {
            break;
        }
    }

    return { streakCount };
};

const countLongestStreak = (sessions) => {

    if (sessions.length === 0) return { longestStreak: 0 };

    const dates = [...new Set(sessions.map(session =>
        new Date(session.timestamp).toISOString().split('T')[0]
    ))].sort((a, b) => new Date(a) - new Date(b));

    // console.log(dates, 'dates');

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
    // console.log(longestStreak, 'longestStreak');
    return { longestStreak };
};

const getStreakController = catchAsync(async (req, res) => {
    const { id: userId } = req.params;
    const cache = await redisClient.get('getStreakController' + userId);
    // console.log({ cache }, 'cache in getStreakController');
    let result;
    if (cache) {
        // console.log('from cache, getStreakController');
        result = JSON.parse(cache);
    } else {

        const sessions = await db.focusSession.findMany({
            where: {
                userId: userId,
            },
            orderBy: {
                timestamp: 'asc'
            }
        });
        // console.log(DateTime.now().startOf('day').plus({ hours: 6 }).toJSDate(), 's');
        const completedSessions = await db.focusSession.findMany({
            where: {
                userId: userId
            }
        });
        // console.log(completedSessions, 'completedSessions');
        result = countStreak(sessions);
        const longestStreak = countLongestStreak(completedSessions);
        result.sessionNo = completedSessions.length + 1;
        result.longestStreak = longestStreak.longestStreak;
    }

    await redisClient.set('getStreakController' + userId, JSON.stringify(result), {
        EX: 3600
    });
    // console.log(result, 'result');
    res.send({ status: true, data: result });
});

function countCompletedSessions(data) {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 6);

    startDate.setHours(0, 0, 0, 0);
    startDate.setHours(startDate.getHours() + 6);
    endDate.setHours(23, 59, 59, 999);
    endDate.setHours(endDate.getHours() + 6);

    const completedSessionsData = [];

    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
        const formattedDate = d.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
        const completedSessions = data.filter(
            item => {
                const x = new Date(item.timestamp);
                x.setHours(x.getHours() - 6);
                return x.toLocaleDateString('en-US') === d.toLocaleDateString('en-US') && item.completed;
            }
        ).length;
        completedSessionsData.push({ date: formattedDate, completedSessions: completedSessions });
    }

    return completedSessionsData;
}

const getCompletedSessionController = catchAsync(async (req, res) => {
    const { id: userId } = req.params;
    // console.log(userId, 'id');
    const cache = await redisClient.get('getCompletedSessionController' + userId);
    let result;
    if (cache) {
        // console.log('from cache, getCompletedSessionController');
        result = JSON.parse(cache);
    }
    else {
        const completedSession = await db.focusSession.findMany({
            where: {
                userId: userId,
                completed: true
            },

        });
        result = countCompletedSessions(completedSession);
    }

    await redisClient.set('getCompletedSessionController' + userId, JSON.stringify(result), {
        EX: 3600
    });
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
    const cache = await redisClient.get('getDailyFocusSession' + userId + req.query.time.split('T')[0]);
    let result;
    if (cache) {
        // console.log('from cache, getDailyFocusSession');
        result = JSON.parse(cache);
    }
    else {
        const start = new Date(req.query.time);
        start.setHours(0, 0, 0, 0);

        start.setHours(start.getHours() + 6);

        const end = new Date(req.query.time);
        end.setHours(23, 59, 59, 999);

        end.setHours(end.getHours() + 6);

        // console.log(start, end, 'start end');




        const completedSession = await db.focusSession.findMany({
            where: {
                userId: userId,
                timestamp: {
                    gte: start,
                    lte: end
                }
            },

        });
        // console.log(DateTime.fromJSDate(time).setZone('Asia/Dhaka').toJSDate());


        // console.log(completedSession, 'completedSession');
        result = getHourlyData(completedSession);
    }
    await redisClient.set('getDailyFocusSession' + userId + req.query.time.split('T')[0], JSON.stringify(result), {
        EX: 3600
    });
    res.send({ status: true, data: result });

});
const achievements = [
    {
        title: 'Complete 10 Focused Session',
        description: 'Successfully completed 10 focused work sessions with minimal distractions.',
        target: 10,
    },
    {
        title: '100 Minutes of Focused Work',
        description: 'Achieved 100 minutes of focused work time',
        target: 100
    },
    {
        title: '50 Focus Session',
        description: 'Do 50 Session with at least 2 minutes of focus time.',
        target: 50
    },
    {
        title: 'Consistent 7-Day Streak',
        description: 'Completed focus sessions consistently for 7 days.',
        target: 7
    },
    {
        title: '30 Seamless Sessions',
        description: 'Completed 30 focus sessions without any pause.',
        target: 30
    }

];
const getAchivementsController = catchAsync(async (req, res) => {
    const { id: userId } = req.params;

    const cache = await redisClient.get('getAchivementsController' + userId);
    let result;
    if (cache) {
        // console.log('from cache, getAchivementsController');
        result = JSON.parse(cache);
    } else {

        const completedSession = await db.focusSession.findMany({
            where: {
                userId: userId,
                completed: true
            }
        });

        achievements[0].completed = completedSession.length;
        achievements[0].percentage = +((completedSession.length / achievements[0].target) * 100).toFixed(2);

        const totalMinutes = await db.focusSession.aggregate({
            _sum: {
                duration: true
            },

            where: {
                userId: userId
            }
        });
        const duration = +(totalMinutes._sum.duration / 60).toFixed(2);
        achievements[1].completed = duration;
        achievements[1].percentage = +((duration / 100) * 100).toFixed(2);

        const sessionWithAtLeast2Minutes = await db.focusSession.findMany({
            where: {
                userId: userId,
                duration: {
                    gte: 2 * 60
                }
            }
        });

        achievements[2].completed = sessionWithAtLeast2Minutes.length;
        achievements[2].percentage = +((sessionWithAtLeast2Minutes.length / achievements[2].target) * 100).toFixed(2);

        const completedSessions = await db.focusSession.findMany({
            where: {
                userId: userId,
            }
        });
        const streak = countLongestStreak(completedSessions);

        achievements[3].completed = streak.longestStreak;
        achievements[3].percentage = +((streak.longestStreak / achievements[3].target) * 100).toFixed(2);

        const sessionWithNoPause = await db.focusSession.findMany({
            where: {
                userId: userId,
                paused: false,
                completed: true
            }
        });

        achievements[4].completed = sessionWithNoPause.length;
        achievements[4].percentage = +((sessionWithNoPause.length / achievements[4].target) * 100).toFixed(2);
        result = achievements;
    }


    await redisClient.set('getAchivementsController' + userId, JSON.stringify(result), {
        EX: 3600
    });




    res.send({ status: true, data: result });


});


module.exports = {
    focusCreateController,
    getSpecificFocusSession,
    getStreakController,
    getCompletedSessionController,
    getDailyFocusSession,
    getAchivementsController
};