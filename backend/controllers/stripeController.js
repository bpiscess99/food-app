const asyncHandler = require("express-async-handler");

const stripe = require("stripe")("sk_test_51NWgMnExICbPENGVoWn49q0OL0WHnEdxarNVdR5ihco6gNCP68vlBr88zXx72YvoknJybThXBqhuBXJI7f4uRJOo00g0OYw8bx")

// Stripe Integration
const stripeIntegration = asyncHandler(async (req, res) => {
    const {products} = req.body;
    // console.log(products)
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
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
    //   success_url: `${req.headers.origin}/success`,
    //   cancel_url: `${req.headers.origin}/cancel`,
      success_url:"http://localhost:3000/success",
      cancel_url:"http://localhost:3000/cancel",   
    })
    res.json({"sessionId": session.id}) // sessionId w
});




module.exports = {
    stripeIntegration,

};
