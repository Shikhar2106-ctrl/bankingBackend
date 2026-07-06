const transactionModel= require('../models/transaction.model')
const ledgerModel= require('../models/ledger.model')
const accountModel= require('../models/account.model')
const emailService= require('../services/email.service')

/**
* Create a new transaction
* The 10-step transaction process is as follows:
  * 1. Validate request
  * 2. Validate Idempotency key
  * 3. Check account status
  * 4. Derive sender balance from ledger
  * 5. Create transaction with PENDING status
  * 6. Create Debit ledger entry for sender
  * 7. Create Credit ledger entry for receiver
  * 8. Update transaction status to COMPLETED
  * 9. Commit MongoDB session
  * 10. Send email notification
*/

async function createTransaction(req, res){
    /*
    * 1. Validate request
    */
    const {fromAccount, toAccount, amount, idempotencyKey}= req.body
    if(!fromAccount || !toAccount || !amount || !idempotencyKey){
        return res.status(400).json({message: 'From account, to account, amount and idempotency key are required'})
    }
    const fromUserAccount= await accountModel.findOne({
        _id: fromAccount
    })
    const toUserAccount= await accountModel.findOne({
        _id: toAccount
    })
    if(!fromUserAccount || !toUserAccount){
        return res.status(400).json({message: 'From account or to account are Invalid'})
    }
    /*
    * 2. Validate Idempotency key
    */
    const isExistingTransaction= await transactionModel.findOne({
        idempotencyKey: idempotencyKey
    })
    if(isExistingTransaction){
        if(isExistingTransaction.status === 'COMPLETED'){
            return res.status(200).json({
                message: 'Transaction already completed', 
                transaction: isExistingTransaction
            })
        }
        if(isExistingTransaction.status === 'PENDING'){
            return res.status(500).json({
                message: 'Transaction is pending'
            })
        }
        if(isExistingTransaction.status === 'FAILED'){
            return res.status(500).json({
                message: 'Transaction already failed'
            })
        }
        if(isExistingTransaction.status === 'REVERSED'){
            return res.status(500).json({
                message: 'Transaction already reversed'
            })
        }
    }    

    /*
    * 3. Check account status
    */
    if(fromUserAccount.status !== 'ACTIVE' || toUserAccount.status !== 'ACTIVE'){
        return res.status(400).json({
            message: 'From account or to account are not active'
        })
    }

    /*
    * 4. Derive sender balance from ledger
    */
    const fromAccountLedgerEntries= await ledgerModel.find({
        account: fromAccount
    })
}    
