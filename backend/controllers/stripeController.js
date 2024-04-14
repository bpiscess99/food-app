const asyncHandler = require("express-async-handler");
const Order = require("../model/orderModel");


const stripe = require("stripe")("sk_test_51NWgMnExICbPENGVoWn49q0OL0WHnEdxarNVdR5ihco6gNCP68vlBr88zXx72YvoknJybThXBqhuBXJI7f4uRJOo00g0OYw8bx")

// Stripe Integration
const stripeIntegration = asyncHandler(async (req, res) => {
    const {products, email} = req.body;
    // console.log(products)

    // Create line items for Stripe Checkout
    const lineItems = products.map((product) => ({
        price_data: {
            currency: "usd",
            product_data: {
                name: product.name,
            },
            unit_amount: product.price * 100,
        },
        quantity: product.qty,
    }));
    
    // Create a Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
    //   success_url: `${req.headers.origin}/success`,
    //   cancel_url: `${req.headers.origin}/cancel`,
      success_url:"http://localhost:3000/success",
      cancel_url:"http://localhost:3000/cancel",   
    })

    // save the order in the database 
    try {
        const newOrder = new Order({
            email,
            order_data: products,
        });
        await newOrder.save();
        res.json({ sessionId: session.id });
    } catch (error) {
        console.error("Error saving order:", error);
        res.status(500).json({ error: "Failed to save order" });
    }

});




module.exports = {
    stripeIntegration,

};
