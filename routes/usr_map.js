const model = require('../model/model')

//read user camera map table
const readUsrMap = (req,res)=>{
       var query="SELECT * FROM `ga_cam_usr_map` WHERE `CUM_STOP_DATE` IS NULL AND `CUM_STOP_TIME` IS NULL";

       model.connection.query(query,(err,result)=>{
        if(err){
            res.send("ERROR:"+err);
        }
        else{
            res.json(result);
        }
    });

}

//create uesr camera map new one 
const createUsrMap = (req,res)=>{
      var cum_usr_id=req.body.cum_usr_id;
      var cum_cam_id=req.body.cum_cam_id;
      var cum_start_date=req.body.cum_start_date;
      var cum_start_time=req.body.cum_start_time;
      var query="INSERT INTO `ga_cam_usr_map`(`CUM_USR_ID`, `CUM_CAM_ID`, `CUM_CAM_START_DATE`, `CUM_CAM_START_TIME`) VALUES ("+cum_usr_id+","+cum_cam_id+",'"+cum_start_date+"','"+cum_start_time+"')";
      var check = "select * from `ga_cam_usr_map` where `CUM_USR_ID` = "+cum_usr_id+" AND `CUM_CAM_ID` = "+cum_cam_id+"";
      
      
      model.connection.query(check,(err,result)=>{
        if(!result[0]){

            //checking user camera mapping already did or not
            model.connection.query(query,(err1,result1)=>{
                if(err1){
                    res.send({error:true,text:""+err1}); 
                }
                else{
                    res.send({error:false,text:"User camera map Created Successfully..."});
            
                }
            });           
        }
        else{
            res.send({error:false,text:"User camera map Created already..."});
        }
      });
}


//delete user camera map on table
const deleteUsrMap = (req,res)=>{
    var cum_stop_date=req.body.cum_stop_date;
    var cum_stop_time=req.body.cum_stop_time;
    var cum_usr_id=req.body.cum_usr_id;
    var cum_cam_id=req.body.cum_cam_id;

    var query="UPDATE `ga_cam_usr_map` SET `CUM_STOP_DATE`='"+cum_stop_date+"',`CUM_STOP_TIME`='"+cum_stop_time+"' WHERE `CUM_USR_ID` = '"+cum_usr_id+"' AND `CUM_CAM_ID`='"+cum_cam_id+"'";

    model.connection.query(query,(err,result)=>{
        if(err){
            res.send({error:true,text:""+err});
        }
        else{
            res.send({error:false,text:"User camera map deleted Successfully..."});
        }
    });
}



module.exports = function(app){
    app.get('/user_map/read',(req,res)=>{
        readUsrMap(req,res);
    });
    app.post('/user_map/create',(req,res)=>{
        createUsrMap(req,res);
    });
    app.put('/user_map/delete',(req,res)=>{
        deleteUsrMap(req,res);
    });
}