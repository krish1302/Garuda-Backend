const model = require('../model/model')

const readCameras = (req,res)=>{
    var cam_acc_id=req.params.acc_id;
    console.log(cam_acc_id)
    var query="SELECT * FROM `ga_camera` WHERE `CAM_ACC_ID`="+cam_acc_id+" ";

    model.connection.query(query,(err,result)=>{
        if(err){
            res.send("ERROR:"+err);
        }
        else{
            res.json(result)
        }
    });
}  
const readCamera = (req,res)=>{
    var cam_id=req.params.cam_id
    var query="SELECT * FROM `ga_camera` WHERE `CAM_ID`="+cam_id+" ";

    model.connection.query(query,(err,result)=>{
        if(err){
            res.send("ERROR:"+err);
        }
        else{
            res.json(result)
        }
    });
}  

const createCamera = (req,res)=>{
    var cam_id=req.body.cam_id;
    var cam_acc_id=req.body.cam_acc_id;
    var cam_username=req.body.cam_username;
    var cam_password=req.body.cam_password;
    var cam_port=req.body.cam_port;
    var cam_dvr_ip=req.body.cam_dvr_ip;
    var cam_channel=req.body.cam_channel;
    var cam_poc=req.body.cam_poc;
    var cam_location=req.body.cam_location;
    var cam_alarm_code=req.body.cam_alarm_code;
    var cam_fps=req.body.cam_fps;
    var cam_start_date=req.body.cam_start_date;
    var cam_start_time=req.body.cam_start_time;

    console.log(cam_acc_id,cam_username,cam_password,cam_port,cam_dvr_ip,cam_channel,cam_poc,cam_location,cam_alarm_code,cam_fps)
    var query="INSERT INTO `ga_camera`(`CAM_ID`, `CAM_ACC_ID`, `CAM_USERNAME`, `CAM_PASSWORD`, `CAM_PORT`, `CAM_DVR_IP`, `CAM_CHANNEL`, `CAM_POC`, `CAM_LOCATION`, `CAM_ALARM_CODE`, `CAM_FPS`, `CAM_START_TIME`, `CAM_START_DATE`) VALUES ('"+cam_id+"','"+cam_acc_id+"','"+cam_username+"','"+cam_password+"',"+cam_port+", '"+cam_dvr_ip+"','"+cam_channel+"','"+cam_poc+"','"+cam_location+"','"+cam_alarm_code+"','"+cam_fps+"','"+cam_start_date+"','"+cam_start_time+"')";
    // var query="INSERT INTO `ga_camera`(`CAM_ACC_ID`,`CAM_USERNAME`,`CAM_PASSWORD`,`CAM_PORT` `CAM_DVR_IP`, `CAM_CHANNEL`, `CAM_POC`, `CAM_LOCATION`, `CAM_ALARM_CODE`, `CAM_FPS`,`CAM_START_DATE`,`CAM_START_TIME`) VALUES ('"+cam_acc_id+"','"+cam_username+"','"+cam_password+"','"+cam_port+"', '"+cam_dvr_ip+"','"+cam_channel+"','"+cam_poc+"','"+cam_location+"','"+cam_alarm_code+"','"+cam_fps+"','"+cam_start_date+"','"+cam_start_time+"')";

    model.connection.query(query,(err,result)=>{
        if(err){
            res.send({error:true,text:""+err})        }
        else{
            res.send({error:false,text:"User Created Successfully..."})
    
        }
    });
}
const updateCamera = (req,res)=>{
    var cam_id=req.body.cam_id;
    // var cam_acc_id=req.body.cam_acc_id;
    var cam_username=req.body.cam_username;
    var cam_password=req.body.cam_password;
    var cam_port=req.body.cam_port;
    var cam_dvr_ip=req.body.cam_dvr_ip;
    var cam_channel=req.body.cam_channel;
    var cam_poc=req.body.cam_poc;
    var cam_location=req.body.cam_location;
    var cam_alarm_code=req.body.cam_alarm_code;
    var cam_fps=req.body.cam_fps;

    //console.log(cam_id)

    var query="UPDATE `ga_camera` SET `CAM_USERNAME`='"+cam_username+"',`CAM_PASSWORD`='"+cam_password+"',`CAM_PORT`='"+cam_port+"', `CAM_DVR_IP`='"+cam_dvr_ip+"' ,`CAM_CHANNEL`='"+cam_channel+"' ,`CAM_POC`='"+cam_poc+"' ,`CAM_LOCATION`='"+cam_location+"' ,`CAM_ALARM_CODE`='"+cam_alarm_code+"' ,`CAM_FPS`='"+cam_fps+"' WHERE `CAM_ID`='"+cam_id+"';";

    model.connection.query(query,(err,result)=>{
        if(err){
            res.send({error:true,text:""+err})        }
        else{
            res.send({error:false,text:"User updated Successfully..."})
    
        }
    });

}
module.exports = function(app){

    app.get('/cameras/read/acc_id/:acc_id',(req,res)=>{
        readCameras(req,res);
    });
    app.get('/camera/read/cam_id/:cam_id',(req,res)=>{
        readCamera(req,res);
    });
    app.post('/camera/create',(req,res)=>{
        //  console.log('welcome')
        createCamera(req,res);
    });
    app.put('/camera/update',(req,res)=>{
        // console.log('welcome')
        updateCamera(req,res);
    });
}