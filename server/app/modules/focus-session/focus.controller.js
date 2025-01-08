const db = require("../../configs/db.config");
const catchAsync = require("../../errors/catch-async.error");



const focusCreateController = catchAsync(async (req, res) => {

    const { completed, paused, duration, userId } = req.body;
    const x = await db.focusSession.create({
        data: {
            completed, paused, duration, userId
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


module.exports = {
    focusCreateController,
    getSpecificFocusSession
};