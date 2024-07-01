import { Router } from "express";
import { aa, allPayments, buySubscription, cancelSubscription, getRazorpatApiKey, verifySubscription } from "../controllers/payment.controller.js";
import { authorizedRoles, isLoggedIn } from "../middleware/auth.middleware.js";

const router = Router();

router.route('/razorpay-key')
    .get(
        isLoggedIn,
        getRazorpatApiKey
    );

router.route('/subscribe')
    .post(
        isLoggedIn,
        buySubscription
    );


router.route('/verify')
    .post(
        isLoggedIn,
        verifySubscription
    );

router.route('/unsubscribe')
    .post(
        isLoggedIn,
        cancelSubscription
    );

router.route('/')
    .post(
        isLoggedIn,
        authorizedRoles('ADMIN'),
        allPayments)


export default router;