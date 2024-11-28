import moment from "moment";
import { Buffer } from "buffer";
import * as dbService from "../db/service.js";
import PurchaseInfo from "../core/model/purchaseInfo.model.js";
import Subscription from "../core/model/subscription.model.js";
import { decode } from "jsonwebtoken";
import { logger } from "../core/util/logger/logger.js";

const jwtDecode = function (jwtData) {
  try {
    const decodeData = decode(jwtData);
    return { decodeData };
  } catch (error) {
    logger.error(error);
  } 
};

const checkAndUpdateSubscriptionStatusOfUserForGoogle = async function (
  notificationType,
  transactionReceipt
) {
  const purchaseToken = transactionReceipt.purchaseToken;
  const allRegisterUserWithToken = await dbService.find(
    PurchaseInfo,
    { purchaseToken },
    {},
    { creetedAt: 1 }
  );

  if (!allRegisterUserWithToken?.length) return;

  const purchaseInfo = allRegisterUserWithToken?.pop();
  await updateUserSubscriptionStatus(allRegisterUserWithToken, {
    isSubscribe: false,
    purchaseToken: null,
    planType: "basic",
  });
  if (purchaseInfo) {
    let updateSubscriptionData = {
      isSubscribe: false,
      purchaseToken: null,
      planType: "basic",
    };
    if ([1, 2, 4, 6, 7, 8, 9, 11].includes(notificationType)) {
      updateSubscriptionData = {
        isSubscribe: true,
        planType: purchaseInfo.planType,
        purchaseInfo: purchaseInfo._id,
      };
    }
    await dbService.findByIdAndUpdate(
      User,
      purchaseInfo.userId,
      updateSubscriptionData
    );
  }
};

async function updateUserSubscriptionStatus(registeredUsers, subscriptionData) {
    if(!registeredUsers?.length) return;
    const userIds =[];
    for(const prInfo of registeredUsers){
        userIds.push(prInfo.userId);
    }
    await dbService.updateMany(User,{_id:{$in:userIds}},subscriptionData);
}

export const verifyPurchaseToken = async (req, res, next) => {
    try {
      let reqData = req.body;
      await dbService.create(TestSubscription, { transactionData: reqData });
      if (reqData?.deviceType === 'android') {
        reqData = {
          ...reqData['0'],
          deviceType: reqData.deviceType,
          planType: reqData.planType,
          amount: reqData.amount
        };
      }
      await dbService.create(TestSubscription, { transactionData: reqData });
   
      let {
        transactionDate,
        subscriptionExpireTime,
        planType = 'monthly',
        amount
      } = reqData;
   
      if (!planType) throw new SubscriptionPlanTypeRequiredException();
   
      if (!subscriptionExpireTime && planType === 'monthly') {
        subscriptionExpireTime = moment(transactionDate).add(1, 'months').toDate();
        amount = 6;
      } else if (!subscriptionExpireTime && planType === 'yearly') {
        subscriptionExpireTime = moment(transactionDate).add(1, 'years').toDate();
        amount = 60;
      }
   
      if (reqData?.deviceType === 'ios') {
        reqData.purchaseToken =
          reqData?.originalTransactionIdentifierIOS ||
          reqData?.originalTransactionId ||
          reqData?.transactionId;
      }
   
      const purchaseInfo = await dbService.create(PurchaseInfo, {
        ...reqData,
        userId: req.user._id,
        planType,
        amount,
        subscriptionExpireTime,
        subscriptionPurchaseTime: moment(transactionDate).toDate(),
        transactionData: reqData
      });
      const user = await dbService.findByIdAndUpdate(User, req.user._id, {
        isSubscribe: true,
        purchaseInfo: purchaseInfo._id,
        planType
      });
      createResponse(req, res, responseCodes.SUCCESS, getUserProfile(user));
    } catch (error) {
      next(error);
    }
  };
  export const saveGoogleSubscriptionDetails = async function (req, res) {
    try {
      const purchaseReceipt = req.body;
      console.debug('saveGoogleSubscriptionDetails ~ purchaseReceipt:', purchaseReceipt);
      const newDoc = await dbService.create(Subscription, { purchaseReceipt });
      const purchaseData = JSON.parse(
        Buffer.from(purchaseReceipt.message.data, 'base64').toString()
      );
      console.debug('saveGoogleSubscriptionDetails ~ purchaseData:', purchaseData);
      const { notificationType, purchaseToken } = purchaseData.subscriptionNotification;
      console.debug(
        'saveGoogleSubscriptionDetails ~ notificationType, purchaseToken:',
        notificationType,
        purchaseToken
      );
      await dbService.findByIdAndUpdate(Subscription, newDoc._id, {
        purchaseToken,
        notificationType,
        transactionData: purchaseData
      });
      await checkAndUpdateSubscriptionStatusOfUserForGoogle(
        notificationType,
        purchaseData.subscriptionNotification
      );
      return res.status(200).json({ status: 'success' });
    } catch (error) {
      console.error(error);
      return res.status(200).json({ status: 'error', error });
    }
  };
  export const saveAppleSubscriptionDetails = async function (req, res) {
    try {
      const purchaseReceipt = req.body;
      console.debug('saveAppleSubscriptionDetails ~ purchaseReceipt:', purchaseReceipt);
      const newDoc = await dbService.create(Subscription, { purchaseReceipt });
      if (purchaseReceipt.signedPayload) {
        let data1 = jwtDecode(purchaseReceipt.signedPayload);
        data1 = data1.decodeData;
        console.debug('saveAppleSubscriptionDetails ~ data1:', data1);
        if (data1?.data?.signedTransactionInfo) {
          let data2 = jwtDecode(data1.data.signedTransactionInfo);
          data2 = data2.decodeData;
          console.debug('signedTransactionInfo ~ data2:', data2);
          await dbService.findByIdAndUpdate(Subscription, newDoc._id, {
            purchaseToken: data2.originalTransactionId,
            notificationType: data1.notificationType,
            transactionData: data2
          });
          await checkSubscriptionStatusOfUserForApple(data1.notificationType, data2);
        }
      }
      return res.status(200).json({ status: 'success' });
    } catch (error) {
      console.error(error);
      return res.status(200).json({ status: 'error', error });
    }
  };