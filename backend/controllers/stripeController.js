const stripe = require("stripe")("sk_test_51NWgMnExICbPENGVoWn49q0OL0WHnEdxarNVdR5ihco6gNCP68vlBr88zXx72YvoknJybThXBqhuBXJI7f4uRJOo00g0OYw8bx")
const asyncHandler = require("express-async-handler");
const Order = require("../model/orderModel");



// Stripe Integration
const stripeIntegration = asyncHandler(async (req, res) => {
    const { email, products } = req.body;

    if (!products || !email) {
        return res.status(400).json({ message: "Please mention all credential" });
    }
    // Create line items for Stripe Checkout
    const lineItems = products.map((product) => ({
        price_data: {
            currency: "usd",
            product_data: {
                name: product.name,
            },
            unit_amount: product.price * 100, // amount in cents
        },
        quantity: product.qty,
    }));
    const totalAmount = products.reduce((total, product) => total + product.price * product.qty, 0)


    try {
        // Create a Stripe Checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: "http://localhost:3000/success",
            cancel_url: "http://localhost:3000/cancel",
        });

         // Save the order in the database only if the checkout session is created successfully
         const orderItems = products.map((product) => ({
                item: product.name,
                quantity: product.qty,
                price: product.price,
                size: product.size
         }));

         const newOrder = new Order({
            email,
            order_data: orderItems,
            total_amount: totalAmount,
            order_date: new Date(),
            // paymentStatus: "pending", // initial status
        });
        await newOrder.save();

        // Send the session ID back to the client
        res.json({ sessionId: session.id });

    } catch (error) {
        console.error("Error creating checkout session:", error);
        res.status(500).json({ error: "Failed to create checkout session" });
        return; // Exit early if session creation fails
    }
});


// Stripe Webhook for Payment Confirmation
const handleStripeWebhook = asyncHandler(async (req, res) => {
    const event = req.body;
    
    // Ensure you verify the event is from Stripe
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        
        try {
            // Update order with payment success
            await Order.findOneAndUpdate(
                { email: session.customer_email },
                { payment_status: "completed", payment_transaction_id: session.id },
                { new: true }
            );
        } catch (error) {
            console.error("Failed to update order:", error);
            return res.status(500).json({ error: "Failed to update order status" });
        }
    }
    res.json({ received: true });
});


module.exports = {
    stripeIntegration,
    handleStripeWebhook

};
