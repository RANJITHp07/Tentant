import { Router } from "express";
import { signinverify } from "../middleware/authMiddleware";
import { createProperty, deleteProperty, getAllproperties, getSingleUserProperties, updateProperty } from "../controller/propertyController";

const router=Router();

router.post("/api/property",signinverify,createProperty); // to create property

router.put("/api/property/:id",signinverify,updateProperty);//to update the property

router.delete("/api/property/:id",signinverify,deleteProperty); //to delete the property

router.get("/api/property",signinverify,getSingleUserProperties); // to get the property of a single user

router.get("/api/list-properties",getAllproperties); // to get all the properties

export default router