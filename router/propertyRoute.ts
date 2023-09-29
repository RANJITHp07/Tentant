import { Router } from "express";
import { signinverify } from "../middleware/authMiddleware";
import { createProperty, deleteProperty, filterProperties, getAllproperties, getSingleUserProperties, updateProperty } from "../controller/propertyController";
import { upload } from "../middleware/multerMiddleware";

const router=Router();

router.post("/api/property",signinverify,upload.array("file"),createProperty); // to create property

router.put("/api/property/:id",signinverify,updateProperty);//to update the property

router.delete("/api/property/:id",signinverify,deleteProperty); //to delete the property

router.get("/api/property",signinverify,getSingleUserProperties); // to get the property of a single user

router.get("/api/list-properties",getAllproperties); // to get all the properties

router.get("/api/properties-filter",filterProperties)

export default router