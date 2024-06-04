// const express = require('express');
// const { authMiddleware } = require('../middleware');
// const { Account } = require('../database/model');
// const { default: mongoose } = require('mongoose');
// const router = express.Router();

// router.get("/balance", authMiddleware, async (req, res) => {
//     console.log("Balance endpoint hit");
//     const account = await Account.findOne({
//         userId: req.userId
//     });

//     if (!account) {
//         return res.status(404).json({ message: "Account not found" });
//     }

//     res.json({
//         balance: account.balance
//     });
// });

// router.post("/transfer", authMiddleware, async (req, res) => {
//     console.log("Transfer endpoint hit");
//     const session = await mongoose.startSession();
//     session.startTransaction();
//     const { amount, to } = req.body;

//     try {
//         const account = await Account.findOne({ userId: req.userId }).session(session);
//         if (!account || account.balance < amount) {
//             await session.abortTransaction();
//             return res.status(400).json({ message: "Insufficient balance" });
//         }

//         const toAccount = await Account.findOne({ userId: to }).session(session);
//         if (!toAccount) {
//             await session.abortTransaction();
//             return res.status(400).json({ message: "Invalid account" });
//         }

//         await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
//         await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

//         await session.commitTransaction();
//         res.json({ message: "Transfer successful" });
//     } catch (error) {
//         await session.abortTransaction();
//         res.status(500).json({ message: "Transaction Failed", error });
//     } finally {
//         session.endSession();
//     }
// });

// module.exports = router;



const express = require('express');
const { authMiddleware } = require('../middleware');
const { Account } = require('../database/model');
const { default: mongoose } = require('mongoose');
const router = express.Router();

router.get("/balance", authMiddleware, async (req, res) => {
    console.log("Balance endpoint hit");
    const account = await Account.findOne({
        userId: req.userId
    });

    if (!account) {
        return res.status(404).json({ message: "Account not found" });
    }

    res.json({
        balance: account.balance
    });
});

router.post("/transfer", authMiddleware, async (req, res) => {
    console.log("Transfer endpoint hit");
    const session = await mongoose.startSession();
    session.startTransaction();
    const { amount, to } = req.body;

    try {
        const account = await Account.findOne({ userId: req.userId }).session(session);
        if (!account || account.balance < amount) {
            await session.abortTransaction();
            return res.status(400).json({ message: "Insufficient balance" });
        }

        const toAccount = await Account.findOne({ userId: to }).session(session);
        if (!toAccount) {
            await session.abortTransaction();
            return res.status(400).json({ message: "Invalid account" });
        }

        await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
        await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

        await session.commitTransaction();
        res.json({ message: "Transfer successful" });
    } catch (error) {
        await session.abortTransaction();
        res.status(500).json({ message: "Transaction Failed", error });
    } finally {
        session.endSession();
    }
});

module.exports = router;
