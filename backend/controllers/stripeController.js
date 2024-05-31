const asyncHandler = require("express-async-handler");
// const Order = require("../model/orderModel");


const stripe = require("stripe")("sk_test_51NWgMnExICbPENGVoWn49q0OL0WHnEdxarNVdR5ihco6gNCP68vlBr88zXx72YvoknJybThXBqhuBXJI7f4uRJOo00g0OYw8bx")

// Stripe Integration

const stripeIntegration = asyncHandler(async (req, res) => {
    const { products } = req.body;

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

    try {
        // Create a Stripe Checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: "http://localhost:3000/success",
            cancel_url: "http://localhost:3000/cancel",
        });

        // Send the session ID back to the client
        res.json({ sessionId: session.id });
    } catch (error) {
        console.error("Error creating checkout session:", error);
        res.status(500).json({ error: "Failed to create checkout session" });
        return; // Exit early if session creation fails
    }
});


// // Save Order
// const saveOrder = asyncHandler(async (req, res) => {
//     const { email, products } = req.body;

//     try {
//         // Save the order in the database 
//         const newOrder = new Order({
//             email,
//             order_data: products,
//         });
//         await newOrder.save();
//         res.status(201).json({ message: "Order saved successfully" });
//     } catch (error) {
//         console.error("Error saving order:", error);
//         res.status(500).json({ error: "Failed to save order" });
//     }
// });




// const stripeIntegration = asyncHandler(async (req, res) => {
//     const {products, email} = req.body;
//     // console.log(products)

//     // Create line items for Stripe Checkout
//     const lineItems = products.map((product) => ({
//         price_data: {
//             currency: "usd",
//             product_data: {
//                 name: product.name,
//             },
//             unit_amount: product.price * 100,
//         },
//         quantity: product.qty,
//     }));
//     try {
//     // Create a Stripe Checkout session
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ['card'],
//       line_items: lineItems,
//       mode: 'payment',
//       success_url:"http://localhost:3000/success",
//       cancel_url:"http://localhost:3000/cancel",   
//     })

//     // Send the session ID back to the client
//     res.json({ sessionId: session.id });
// } catch (error) {
//     console.error("Error creating checkout session:", error);
//     res.status(500).json({ error: "Failed to create checkout session" });
//     return; // Exit early if session creation fails
// }
//   try{
// // save the order in the database 
//         const newOrder = new Order({
//             email,
//             order_data: products,
//         });
//         await newOrder.save();
//     } catch (error) {
//         console.error("Error saving order:", error);
//         res.status(500).json({ error: "Failed to save order" });
//     }

// });




module.exports = {
    stripeIntegration,
    // saveOrder

};
