import { NextFunction, Request, Response } from "express";
import PropertyModel,{IProperty}  from "../model/propertyModel";


// to create the property
export const createProperty=async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const images = req.files as Express.Multer.File[];
  const fileNames = images?.map((file) => file.originalname);
 
        const propertyDetails:IProperty={...req.body,images:fileNames}
       await PropertyModel.create(propertyDetails)
       res.status(200).json({success:true,message:"Propery details created"})
    }catch(err){
        new Error(`Property err:${err}`);
       next(err)
    }
}


//to update the property
export const updateProperty=async(req:Request,res:Response,next:NextFunction)=>{
    try{
       const {update}=req.body
       await PropertyModel.findByIdAndUpdate(req.params.id,{$set:{update}})

       res.status(200).json({success:true,message:"Propery details updated"})
    }catch(err){
        new Error(`Property err:${err}`);
        next(err)
    }
}

//to delete the property details
export const deleteProperty=async(req:Request,res:Response,next:NextFunction)=>{
    try{
        await PropertyModel.findByIdAndDelete(req.params.id)
        res.status(200).json({success:true,message:"Propery details deleted"})
    }catch(err){
        new Error(`Property err:${err}`);
        next(err)
    }
}

// to fetch all the properties
export const getAllproperties=async(req:Request,res:Response,next:NextFunction)=>{
   try{
       const getAllproperty=await PropertyModel.find().populate("userId").sort({createdAt:-1});
       res.status(200).json({success:true,message:"Got all properties",data:getAllproperty})
   }catch(err){
        new Error(`Property err:${err}`);
        next(err)
    }
}

//to fetch properties of a particular user

export const getSingleUserProperties=async(req:Request,res:Response,next:NextFunction)=>{
   try{
       const getAllproperties=await PropertyModel.findById(req.params.id)
       res.status(200).json({success:true,message:"Got all properties",data:getAllproperties})
   }catch(err){
        new Error(`Property err:${err}`);
        next(err)
    }
}   


export const filterProperties = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { city, date, price, type } = req.query;
    
    
    const filter: any[] = [];
    console.log(type)
    if (city) {
      
      filter.push({ property_address: { $regex: city, $options: 'i' } });
    }
     if (date && typeof date === 'string') {
        const [year, month, day] = date.split('-');
         const d=`${day}-${month}-${year}`;
         console.log([d])
        filter.push({ availableDates: {$in:[ d ]} });
    }
    if (price) {
      filter.push({ price: { $lt: Number(price)*1000 } });
    } 
    if (type) {
      console.log(type)
      filter.push({ property_type: type }); 
    }

    const properties = await PropertyModel.find({
      $and: filter.length > 0 ? filter : [{}],
    })
      .populate('userId')
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, message: 'Filtered properties', data: properties });
  } catch (err) {
    
    next(err);
  }
};
