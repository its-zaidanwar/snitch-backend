import cartModel from "../models/cart.model.js";
import productModel from "../models/product.model.js";

export async function addToCart(req, res) {

    // check product exist or not 
  const { productId, quantity, size } = req.body;

  const product = await productModel.findById(productId);

  if (!product) {
    return res.status(404).json({
      message: "Product not found",
    });
  }
  
  // check the size of the product 
  const selectedSize = product.sizes.find((s) => s.size === size);

  if (!selectedSize) {
    return res.status(400).json({
      message: "Invalid size",
    });
  }
  
  // check the quantity 
  if (selectedSize.stock < quantity) {
    return res.status(400).json({
      message: "Insufficient stock",
    });
  }

  //edge case - ek hi cart bana ga with same user id
  // let cart = await cartModel.findOne({ user: req.user.userId })

  // if (!cart) {
  //     cart = await cartModel.create({ user: req.user.userId })
  // }
  const cart =
    (await cartModel.findOne({ user: req.user.userId })) ??
    (await cartModel.create({ user: req.user.userId }));

  // purpose ya hai ki agar same product hai with same id and same size then alag sa ek product nahi bana ga wahi us product ko increment kar paya ga and quantity check ka liya in the next code
  const productInCart = cart.products.find(
    (p) => p.product.toString() === productId && p.size === size,
  );

  // video duration - 1:3:15
  // if product ki quantity 40 hai database mai and user 45 product add kar de to woh nahi ho ga us ka hi edge case hai
  if (productInCart) {
    if (productInCart.quantity + quantity > selectedSize.stock) {
      return res.status(400).json({
        message: "Insufficient stock",
      });
    }

    // vid duration - 1:5:00
    // agar cart mai multiple products hai and kisi ek product ka quantity change kar na hai then us ka edge case
    await cartModel.updateOne(
      {
        user: req.user.userId,
        "products.product": productId,
        "products.size": size,
      },
      {
        $inc: {
          "products.$.quantity": quantity,
        },
      },
    );

    return res.status(200).json({
      message: "Product quantity updated in cart",
    });
  }

  // push the code 
//   products: [
//     {
//         product: "ABC123",
//         quantity: 2,
//         size: "M"
//     },
//     {
//         product: "XYZ456",
//         quantity: 1,
//         size: "L"
//     }
// ] like this if another product is added 
  await cartModel.findOneAndUpdate(
    { user: req.user.userId },
    {
      $push: {
        products: {
          product: productId,
          quantity: quantity,
          size: size,
        },
      },
    },
  );

  return res.status(200).json({
    message: "Product added to cart",
  });
}

//get cart items 
export async function getCart(req, res) {
  const cart =
    (await cartModel.findOne({ user: req.user.userId })) ??
    (await cartModel.create({ user: req.user.userId }));

  return res.status(200).json({
    message: "Cart retrieved successfully",
    data: {
      cart: cart,
    },
  });
}
