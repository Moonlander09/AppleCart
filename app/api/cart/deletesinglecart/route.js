import { NextResponse } from "next/server";
import connectDB from "@/lib/dbConnect";
import Cart from "@/model/cartSchema";
import { getUser } from "@/helper/getUser";

export async function DELETE(req) {

  try {
   
    await connectDB();
    const userId = getUser(req);
    
    if (!userId) {
      return NextResponse.json(
        { success: "fail", message: "User not authenticated" },
        { status: 401 }
      );
    }

    const {cartId} = await req.json();
 
    const deletedCart = await Cart.findOneAndDelete({ _id: cartId, userId });

    if(!deletedCart){
      return NextResponse.json({status:'fail',message:'Item not found'

      },{status:404})
    }
   
    const updatedCart = await Cart.find({ userId });
   
    return NextResponse.json(
      { status: "success", message: "Item is deleted from Cart", updatedCart },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: "fail", message: error.message },
      { status: 500 }
    );
  }
}
