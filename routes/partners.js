const model = require('../model/model')

//reading method from mysql
const readPartners = (req,res)=>{
    
    var query="SELECT `PTR_ID`, `PTR_NAME`, `PTR_ADDRESS`, `PTR_PAN_NO`, `PTR_GST`, `PTR_CIN`, `PTR_CONTACT_NAME`, `PTR_CONTACT_NO`, `PTR_CONTACT_EMAIL`, `PTR_START_DATE`, `PTR_START_TIME` FROM `ga_partner` WHERE `PTR_IS_ACTIVE` = 1";

    model.connection.query(query,(err,result)=>{
        if(err){
            res.send("ERROR:"+err);
        }
        else{
            res.json(result)
        }
    });
}

const readPartner = (req,res)=>{
    var ptr_id = req.params.id; 
    var query="SELECT * FROM `ga_partner` WHERE `PTR_IS_ACTIVE` = 1 AND `PTR_ID` = "+ptr_id+" ";

    model.connection.query(query,(err,result)=>{
        if(err){
            res.send("ERROR:"+err);
        }
        else{
            res.json(result)
        }
    });
}

const createPartner = (req,res)=>{
    var ptr_name =req.body.ptr_name;
    var ptr_address=req.body.ptr_address;
    var ptr_pan_no =req.body.ptr_pan_no;
    var ptr_gst=req.body.ptr_gst;
    var ptr_cin =req.body.ptr_cin;
    var ptr_contact_name=req.body.ptr_contact_name;
    var ptr_contact_no=req.body.ptr_contact_no;
    var ptr_contact_email=req.body.ptr_contact_email;
    var ptr_state_date= req.body.ptr_start_date;
    var ptr_state_time= req.body.ptr_start_time;

   //console.log(ptr_name,ptr_address,ptr_pan_no,ptr_gst,ptr_cin,ptr_contact_name,ptr_contact_no,ptr_contact_email,ptr_state_date,ptr_state_time)

    var query="INSERT INTO `ga_partner`(`PTR_NAME`, `PTR_ADDRESS`, `PTR_PAN_NO`, `PTR_GST`, `PTR_CIN`, `PTR_CONTACT_NAME`, `PTR_CONTACT_NO`, `PTR_CONTACT_EMAIL`, `PTR_START_DATE`, `PTR_START_TIME`) VALUES ('"+ptr_name+"','"+ptr_address+"','"+ptr_pan_no+"','"+ptr_gst+"','"+ptr_cin+"','"+ptr_contact_name+"',"+ptr_contact_no+",'"+ptr_contact_email+"','"+ptr_state_date+"','"+ptr_state_time+"')";

    model.connection.query(query,(err,result)=>{
        if(err){
            res.send({error:true,text:""+err})
		}
        else{
            res.send({error:false,text:"User Created Successfully..."})

        }
    });

}


const updatePartner = (req,res)=>{
    var ptr_name =req.body.ptr_name;
    var ptr_address=req.body.ptr_address;
    var ptr_pan_no =req.body.ptr_pan_no;
    var ptr_gst=req.body.ptr_gst;
    var ptr_cin =req.body.ptr_cin;
    var ptr_contact_name=req.body.ptr_contact_name;
    var ptr_contact_no=req.body.ptr_contact_no;
    var ptr_contact_email=req.body.ptr_contact_email;
    var ptr_id=req.body.ptr_id;
    var query="UPDATE `ga_partner` SET `PTR_NAME`='"+ptr_name+"',`PTR_ADDRESS`='"+ptr_address+"',`PTR_PAN_NO`='"+ptr_pan_no+"',`PTR_GST`='"+ptr_gst+"',`PTR_CIN`='"+ptr_cin+"',`PTR_CONTACT_NAME`='"+ptr_contact_name+"',`PTR_CONTACT_NO`="+ptr_contact_no+",`PTR_CONTACT_EMAIL`='"+ ptr_contact_email+"' WHERE `PTR_ID`="+ptr_id+" ";
    
    model.connection.query(query,(err,result)=>{
        if(err){
            res.send({error:true,text:""+err})        }
        else{
            res.send({error:false,text:"User Updated Successfully..."})

        }
    });

} 


const deletePartner = (req,res)=>{

    var ptr_id=req.body.ptr_id;
    var ptr_stop_date = req.body.ptr_stop_date;
    var ptr_stop_time = req.body.ptr_stop_time;
    var query="UPDATE `ga_partner` SET `PTR_IS_ACTIVE` = 0 , `PTR_STOP_DATE` = '"+ptr_stop_date+"', `PTR_STOP_TIME` = '"+ptr_stop_time+"' WHERE `PTR_ID` ='"+ptr_id+"'";


    model.connection.query(query,(err,result)=>{
        if(err){
            res.send({error:true,text:""+err})        }
        else{
            res.send({error:false,text:"User delete Successfully..."})

        }
    });

}



module.exports = function(app){

    app.get('/partners/read',(req,res)=>{
        readPartners(req,res)
    });

    app.get('/partner/read/:id',(req,res)=>{
        readPartner(req,res)
    });

    app.post('/partner/create',(req,res)=>{
        createPartner(req,res)
    });
    app.put('/partner/update',(req,res)=>{
        updatePartner(req,res)
    });
    app.put('/partner/delete',(req,res)=>{
        deletePartner(req,res)
    });

}