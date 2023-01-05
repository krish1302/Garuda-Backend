const model = require('../model/model')
const encab = require('../service/encapsulation')

//read all the user in the user table
const readUsers = (req,res)=>{
    var usr_ptr_id = req.params.usr_ptr_id
    var query="SELECT `USR_ID`, `USR_NAME`, `USR_PASSWORD`, `USR_MOBILE`, `USR_EMAIL`, `USR_DESIGNATION`, `USR_PTR_ID`, `USR_ACC_ID`, `USR_ROLE_ID`, `USR_START_DATE`, `USR_START_TIME` FROM `ga_user` WHERE `USR_IS_ACTIVE`=1 AND `USR_PTR_ID` = "+usr_ptr_id+"";

    model.connection.query(query,(err,result)=>{
        if(err){
            res.send("ERROR:"+err);
        }
        else{
            result.forEach((re)=>{
                re.USR_PASSWORD = encab.decrypt(re.USR_PASSWORD)
            })
            res.json(result)
        }
    });
}
//read particular user only
const readUser = (req,res)=>{
    var usr_id = req.params.usr_id;
    var query="SELECT  `USR_ID`, `USR_NAME`, `USR_PASSWORD`, `USR_MOBILE`, `USR_EMAIL`, `USR_DESIGNATION`, `USR_PTR_ID`, `USR_ACC_ID`, `USR_ROLE_ID`, `USR_START_DATE`, `USR_START_TIME` FROM `ga_user` WHERE `USR_IS_ACTIVE`=1 AND `USR_ID` = '"+usr_id+"'";

    model.connection.query(query,(err,result)=>{
        if(err){
            res.send("ERROR:"+err);
        }
        else{
            result[0].USR_PASSWORD = encab.decrypt(result[0].USR_PASSWORD)
            res.json(result)
        }
    });
}
//read partner users only
const readPartnerUser=(req,res)=>{
    var usr_ptr_id=req.params.usr_ptr_id;
    var query="SELECT `USR_ID`, `USR_NAME`, `USR_PASSWORD`, `USR_MOBILE`, `USR_EMAIL`, `USR_DESIGNATION` FROM `ga_user` WHERE `USR_IS_ACTIVE` =1 AND `USR_ROLE_ID` = 'PA' AND `USR_PTR_ID` = '"+usr_ptr_id+"' AND `USR_ACC_ID` IS NULL";
     
    model.connection.query(query,(err,result)=>{
        if(err){
            res.send("ERROR:"+err);
        }
        else{
            result.forEach(re =>{
                re.USR_PASSWORD = encab.decrypt(re.USR_PASSWORD)
            })
            res.json(result)
        }
    });

}
//read account users only
const readAccountUser = (req,res) =>{
    var usr_ptr_id=req.params.usr_ptr_id;
    var usr_acc_id=req.params.usr_acc_id;
    var query="SELECT  `USR_ID` ,`USR_NAME`, `USR_PASSWORD`, `USR_MOBILE`, `USR_EMAIL`, `USR_DESIGNATION`, `USR_PTR_ID`, `USR_ROLE_ID`FROM `ga_user` WHERE  `USR_IS_ACTIVE`=1 AND `USR_ACC_ID`='"+usr_acc_id+"' AND `USR_ROLE_ID`= 'AA' AND `USR_PTR_ID`='"+usr_ptr_id+"'";

    model.connection.query(query,(err,result)=>{
        if(err){
            res.send("ERROR:"+err);
        }
        else{
            result.forEach(re =>{
                re.USR_PASSWORD = encab.decrypt(re.USR_PASSWORD)
            })
            res.json(result)
        }
    });

}
//read the normal user from the user table
const readUserAccount = (req,res) =>{
    var usr_ptr_id=req.params.usr_ptr_id;
    var usr_acc_id=req.params.usr_acc_id;
    var query="SELECT  `USR_ID` ,`USR_NAME`, `USR_PASSWORD`, `USR_MOBILE`, `USR_EMAIL`, `USR_DESIGNATION`, `USR_PTR_ID`, `USR_ROLE_ID`FROM `ga_user` WHERE  `USR_IS_ACTIVE`=1 AND `USR_ACC_ID`='"+usr_acc_id+"' AND `USR_ROLE_ID`= 'UA' AND `USR_PTR_ID`='"+usr_ptr_id+"'";

    model.connection.query(query,(err,result)=>{
        if(err){
            res.send("ERROR:"+err);
        }
        else{
            result.forEach(re =>{
                re.USR_PASSWORD = encab.decrypt(re.USR_PASSWORD)
            })
            res.json(result)
        }
    });

}
//create user with configurable
const createUser = (req,res)=>{
    var usr_id=req.body.usr_id;
    var usr_name=req.body.usr_name;
    var usr_password=encab.encrypt(req.body.usr_password);
    var usr_mobile=req.body.usr_mobile;
    var usr_email=req.body.usr_email;
    var usr_designation=req.body.usr_designation;
    var usr_ptr_id=req.body.usr_ptr_id;
    var usr_acc_id=req.body.usr_acc_id;
    var usr_role_id=req.body.usr_role_id;
    var usr_start_date=req.body.usr_start_date;
    var usr_start_time=req.body.usr_start_time;
    // console.log(usr_acc_id,usr_ptr_id)
    
    if(req.body.usr_role_id == 'SA'){
        var query="INSERT INTO `ga_user`(`USR_ID`, `USR_NAME`, `USR_PASSWORD`, `USR_MOBILE`, `USR_EMAIL`, `USR_DESIGNATION`, `USR_ROLE_ID`, `USR_START_DATE`, `USR_START_TIME`) VALUES('"+usr_id+"','"+usr_name+"','"+usr_password+"',"+usr_mobile+",'"+usr_email+"','"+usr_designation+"','"+usr_role_id+"','"+usr_start_date+"','"+usr_start_time+"')";
    }
    else if(req.body.usr_role_id == 'PA'){
        var query="INSERT INTO `ga_user`(`USR_ID`, `USR_NAME`, `USR_PASSWORD`, `USR_MOBILE`, `USR_EMAIL`, `USR_DESIGNATION`, `USR_PTR_ID`, `USR_ROLE_ID`, `USR_START_DATE`, `USR_START_TIME`) VALUES('"+usr_id+"','"+usr_name+"','"+usr_password+"',"+usr_mobile+",'"+usr_email+"','"+usr_designation+"','"+usr_ptr_id+"','"+usr_role_id+"','"+usr_start_date+"','"+usr_start_time+"')";
    }
    else{
        var query="INSERT INTO `ga_user`(`USR_ID`, `USR_NAME`, `USR_PASSWORD`, `USR_MOBILE`, `USR_EMAIL`, `USR_DESIGNATION`, `USR_PTR_ID`, `USR_ACC_ID`, `USR_ROLE_ID`, `USR_START_DATE`, `USR_START_TIME`) VALUES('"+usr_id+"','"+usr_name+"','"+usr_password+"',"+usr_mobile+",'"+usr_email+"','"+usr_designation+"','"+usr_ptr_id+"','"+usr_acc_id+"','"+usr_role_id+"','"+usr_start_date+"','"+usr_start_time+"')";
    }
    
    
    
    model.connection.query(query,(err,result)=>{
        if(err){
            res.send({error:true,text:""+err})        }
        else{
            res.send({error:false,text:"User Created Successfully..."})

        }
    });
}
//update user with configurable things on selected user
const updateUser = (req,res)=>{
    var usr_id=req.body.usr_id;
    var usr_name=req.body.usr_name;
    var usr_password=encab.encrypt(req.body.usr_password);
    var usr_mobile=req.body.usr_mobile;
    var usr_email=req.body.usr_email;
    var usr_designation=req.body.usr_designation;
    var usr_role_id=req.body.usr_role_id;
    // console.log(req.body)
    // console.log(usr_id,usr_name,usr_password,usr_mobile,usr_email,usr_designation,usr_role_id)
   
    var query="UPDATE `ga_user` SET `USR_NAME`='"+usr_name+"' ,`USR_PASSWORD`='"+usr_password+"' ,`USR_MOBILE`="+usr_mobile+" ,`USR_EMAIL`='"+usr_email+"',`USR_DESIGNATION`='"+usr_designation+"'  WHERE `USR_ID` ='"+usr_id+"' AND `USR_ROLE_ID`='"+usr_role_id+"' ";
    
    model.connection.query(query,(err,result)=>{
        if(err){
            res.send({error:true,text:""+err})        }
        else{
            res.send({error:false,text:"User Updated Successfully..."})

        }
    }); 
}

//delete the particular user on user table update stop date and stop time.
const deleteUser = (req,res)=>{
    var usr_id=req.body.usr_id;
    var usr_stop_date = req.body.usr_stop_date;
    var usr_stop_time = req.body.usr_stop_time;
    var query="update `ga_user` SET `USR_IS_ACTIVE`=0, `USR_STOP_DATE` = '"+usr_stop_date+"', `USR_STOP_TIME` = '"+usr_stop_time+"' where usr_id='"+usr_id+"'";

    model.connection.query(query,(err,result)=>{
        if(err){
            res.send({error:true,text:""+err})        }
        else{
            res.send({error:false,text:"User deleted Successfully..."})

        }
    });
}

const checkUser = (req,res) =>{
    var usr_id = req.params.usr_id;
    var usr_password = req.params.usr_password

    var query = "SELECT * FROM `ga_user` WHERE `USR_ID` = '"+usr_id+"'";
    
    model.connection.query(query,(err,result)=>{
        if(err){
            res.send({error:true,text:""+err});       
        }
        else{
            try{    
                if(usr_password != encab.decrypt(result[0].USR_PASSWORD)){
                    res.send({error:true,text:"user id or passwoed not match"});
                }
                else{
                    res.send({error:false,text:"Welcome to Garuda"});
                }
            }
            catch(error){
                res.send({error:true,text:"user id or passwoed not match"});
            }
        }
    });

}

module.exports = function(app){

    app.get('/users/read',(req,res)=>{
        readUsers(req,res);
    });
    app.get('/user/read/:usr_id',(req,res)=>{
        readUser(req,res);
    });
    app.get('/users/read/:usr_ptr_id',(req,res)=>{
        readPartnerUser(req,res);
    });
    app.get('/users/read/:usr_ptr_id/:usr_acc_id',(req,res)=>{
        readAccountUser(req,res);
    });
    app.post('/user/create',(req,res)=>{
        createUser(req,res);
    });
    app.put('/user/update',(req,res)=>{
        updateUser(req,res);
    });
    app.put('/user/delete',(req,res)=>{
        deleteUser(req,res);
    });

    app.get('/user/check/:usr_id/:usr_password',(req,res)=>{
        checkUser(req,res);
    });

    app.get('/read/user/:usr_ptr_id/:usr_acc_id',(req,res)=>{
        readUserAccount(req,res);
    });
}
