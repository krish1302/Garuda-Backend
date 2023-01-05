const model = require('../model/model')

const readAccounts = (req,res)=>{
    var acc_ptr_id = req.params.id;

    var query="SELECT `ACC_ID`, `ACC_NAME`, `ACC_ADDRESS`, `ACC_PAN`, `ACC_GST`, `ACC_CIN`, `ACC_CONTACT_NAME`, `ACC_CONTACT_NO`, `ACC_CONTACT_EMAIL`, `ACC_START_DATE`, `ACC_START_TIME` FROM `ga_account` WHERE `ACC_IS_ACTIVE`=1 AND `ACC_PTR_ID` = '"+acc_ptr_id+"'";

    model.connection.query(query,(err,result)=>{
        if(err){
            res.send("ERROR:"+err);
        }
        else{
            res.json(result);
        }
    });
}

const readAccount = (req,res)=>{
    var acc_ptr_id = req.params.ptr_id;
    var acc_id = req.params.acc_id;
    var query="SELECT `ACC_ID`, `ACC_NAME`, `ACC_ADDRESS`, `ACC_PAN`, `ACC_GST`, `ACC_CIN`, `ACC_CONTACT_NAME`, `ACC_CONTACT_NO`, `ACC_CONTACT_EMAIL`, `ACC_START_DATE`, `ACC_START_TIME` FROM `ga_account` WHERE `ACC_IS_ACTIVE`=1 AND `ACC_PTR_ID` = '"+acc_ptr_id+"' AND `ACC_ID` = '"+acc_id+"' ";

    model.connection.query(query,(err,result)=>{
        if(err){
            res.send("ERROR:"+err);
        }
        else{
            res.json(result);
        }
    });
}

const createAccount = (req,res)=>{
    console.log('fine')
   var acc_ptr_id = req.body.acc_ptr_id; 
   var acc_name=req.body.acc_name;
   var acc_address=req.body.acc_address;
   var acc_pan =req.body.acc_pan;
   var acc_gst=req.body.acc_gst;
   var acc_cin=req.body.acc_cin;
   var acc_contact_name=req.body.acc_contact_name;
   var acc_contact_no=req.body.acc_contact_no;
   var acc_contact_email=req.body.acc_contact_email;
   var acc_start_date=req.body.acc_start_date;
   var acc_start_time=req.body.acc_start_time;
    console.log(acc_gst)
   //console.log(acc_name,acc_address,acc_pan,acc_gst,acc_cin,acc_contact_name,acc_contact_no,acc_contact_email,acc_start_date,acc_start_time)

   var query="INSERT INTO `ga_account`(`ACC_PTR_ID`, `ACC_NAME`, `ACC_ADDRESS`,`ACC_PAN`, `ACC_GST`, `ACC_CIN`, `ACC_CONTACT_NAME`, `ACC_CONTACT_NO`, `ACC_CONTACT_EMAIL`, `ACC_START_DATE`, `ACC_START_TIME`) VALUES ('"+acc_ptr_id+"','"+acc_name+"','"+acc_address+"','"+acc_pan+"','"+acc_gst+"','"+acc_cin+"','"+acc_contact_name+"',"+acc_contact_no+",'"+acc_contact_email+"','"+acc_start_date+"','"+acc_start_time+"') ";

   model.connection.query(query,(err,result)=>{
    if(err){
        res.send({error:true,text:""+err});        
    }
    else{
        res.send({error:false,text:"User Created Successfully..."});
    }
});
}
const updateAccount = (req,res)=>{
    var acc_id=req.body.acc_id;
   var acc_name=req.body.acc_name;
   var acc_address=req.body.acc_address;
   var acc_pan =req.body.acc_pan;
   var acc_gst=req.body.acc_gst;
   var acc_cin=req.body.acc_cin;
   var acc_contact_name=req.body.acc_contact_name;
   var acc_contact_no=req.body.acc_contact_no;
   var acc_contact_email=req.body.acc_contact_email;
   console.log(acc_gst);
   var query="UPDATE `ga_account` SET `ACC_NAME`='"+acc_name+"' ,`ACC_ADDRESS`='"+acc_address+"',`ACC_PAN`='"+acc_pan+"' ,`ACC_GST`='"+acc_gst+"' ,`ACC_CIN`='"+acc_cin+"' ,`ACC_CONTACT_NAME`='"+acc_contact_name+"' ,`ACC_CONTACT_NO`="+acc_contact_no+"  ,`ACC_CONTACT_EMAIL`='"+acc_contact_email+"'  WHERE acc_id='"+acc_id+"'";
   model.connection.query(query,(err,result)=>{
    if(err){
        res.send({error:true,text:""+err})        }
    else{
        res.send({error:false,text:"User updated Successfully..."})

    }
});

}
const deleteAccount =(req,res)=>{
   var acc_id=req.body.acc_id;
   var acc_stop_time=req.body.acc_stop_time;
   var acc_stop_date=req.body.acc_stop_date;
   var query="UPDATE `ga_account` SET `ACC_IS_ACTIVE`=0, `ACC_STOP_DATE`='"+acc_stop_date+"',`ACC_STOP_TIME`='"+acc_stop_time+"' WHERE `ACC_ID`='"+acc_id+"'";

   model.connection.query(query,(err,result)=>{
    if(err){
        res.send({error:true,text:""+err})        }
    else{
        res.send({error:false,text:"User deleted Successfully..."})

    }
});
}
module.exports = function(app){

    app.get('/accounts/read/:id',(req,res)=>{
        readAccounts(req,res);
    });
    app.get('/account/read/:ptr_id/:acc_id',(req,res)=>{
        readAccount(req,res);
    });
    app.post('/account/create',(req,res)=>{
        createAccount(req,res);
    });
    app.put('/account/update',(req,res)=>{
        updateAccount(req,res);
    });
    app.put('/account/delete',(req,res)=>{
        deleteAccount(req,res);
    });

}