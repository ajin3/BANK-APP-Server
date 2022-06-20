//import jsonwebtoken
const jwt = require('jsonwebtoken')
//Database
db = {
    1000: { "accno": 1000, "username": "Ajin", "password": 1000, "balance": 5000, transaction: [] },
    1001: { "accno": 1001, "username": "Akhil", "password": 1001, "balance": 4000, transaction: [] },
    1002: { "accno": 1002, "username": "Anandhu", "password": 1002, "balance": 3000, transaction: [] }
  }

  //Register
  var register=(username, acno, password)=> {

    if (acno in db) {
      return {
        status:false,
        message:"Already registered..Please Log in",
        statusCode:401

      }
    }
    else {
      db[acno] = {
        acno, username,
        password,
        "balance": 0,
        transaction: []
      }
      console.log(db);
      return {
        status:true,
        message:"Registered successfully",
        statusCode:200
      }
    }
  }

  //login

const login = (acno, pswd)=> {


    if (acno in db) {
      if (pswd == db[acno]["password"]) {
        currentUser = db[acno]["username"]
        currentAcno = acno

  //token generation
        token = jwt.sign({
          //store account number inside token
          currentAcno:acno
        },'supersecretkey12345')

        return {
          status:true,
          message:"Login successfully",
          statusCode:200,
          currentUser,
          currentAcno,
          token

        }
      }
      else {
        
        return {
          status:false,
          message:"Incorrect password",
          statusCode:401
        }
      }
    }
    else {
      
      return {
        status:false,
        message:"User does not exist",
        statusCode:401
      }
    }
  }

    //deposit

const deposit = (acno, password, amt)=> {
      var amount = parseInt(amt)
      if (acno in db) {
        if (password == db[acno]["password"]) {
          db[acno]["balance"] += amount
          db[acno].transaction.push({
            type: "CREDIT",
            amount: amount
          })
          console.log(db);
          return {
            status:true,
            message:"Deposited successfully..New balance is "+db[acno]["balance"],
            statusCode:200
  
          }
        }
        else {
          return {
            status:false,
            message:"Incorrect password",
            statusCode:401
    
          }
        }
      }
      else {
        return {
          status:false,
          message:"User does not exist",
          statusCode:401
  
        }
  
      }
    }

      //withdraw

const withdraw = (acno, password, amt)=> {
    var amount = parseInt(amt)
    if (acno in db) {
      if (password == db[acno]["password"]) {

        if (db[acno]["balance"] > amount) {

          db[acno]["balance"] -= amount
          db[acno].transaction.push({
            type: "DEBIT",
            amount: amount
          })
          console.log(db);
          return {
            status:true,
            message:"Withdrawn successfully..New balance is "+db[acno]["balance"],
            statusCode:200

          }

        }
        else {
          return {
            status:false,
            message:"Insufficient balance",
            statusCode:422
  
          }
        }

      }
      else {
        return {
          status:false,
          message:"Incorrect password",
          statusCode:401

        }
      }
    }
    else {
      return {
        status:false,
        message:"User does not exist",
        statusCode:401

      }
    }
  }

  //transaction

const getTransaction = (acno)=> {

  if(acno in db){
    return{
      status:true,
      statusCode:200,
      transaction:db[acno].transaction


    }
  }
  else{
    return{
      status:false,
      message:"User does not exist",
      statusCode:401

    }
  }

    
}

  //exports
  module.exports={
    register,
    login,
    deposit,
    withdraw,
    getTransaction
  }